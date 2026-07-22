'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Matter from 'matter-js'
import clsx from 'clsx'

import { lemonImageSources } from '@/utils/lemonImages'

const lemon_images = [...lemonImageSources]
const lemon_class = 'absolute top-0 left-0 z-20 h-auto w-[20vw] md:w-[12vw] aspect-square max-w-none object-contain select-none will-change-transform cursor-grab pointer-events-auto active:cursor-grabbing'
const wall_size = 60

const LEMON_PHYSICS: Matter.IBodyDefinition = {
	restitution: 0.35,
	friction: 0.65,
	frictionStatic: 0.85,
	frictionAir: 0.012,
	density: 20,
}

const wall_physics: Matter.IChamferableBodyDefinition = {
	isStatic: true,
	friction: 0.9,
	frictionStatic: 1,
	restitution: 0.35,
}

function getLemonSizePx() {
	const vw = window.matchMedia('(min-width: 768px)').matches ? 11.5 : 19.5
	return (vw / 100) * window.innerWidth
}

function makeWalls(w: number, h: number, topExtra = 0) {
	const wallH = h + topExtra + wall_size * 2
	const wallCenterY = (h - topExtra) / 2

	return [
		Matter.Bodies.rectangle(w / 2, h + wall_size / 2, w + wall_size * 2, wall_size, wall_physics),    // floor
		Matter.Bodies.rectangle(-wall_size / 2, wallCenterY, wall_size, wallH, wall_physics),             // left
		Matter.Bodies.rectangle(w + wall_size / 2, wallCenterY, wall_size, wallH, wall_physics),          // right
	]
}

function makeCeiling(w: number) {
	return Matter.Bodies.rectangle(w / 2, -wall_size / 2, w + wall_size * 2, wall_size, wall_physics)
}

interface LemonEntry {
	body: Matter.Body
	el: HTMLImageElement
	size: number
}

export interface LemonFallHandle {
	// hand the lemons back to the physics engine so they drop. `offset` is how far
	// (px) they were ridden up from their resting spot, so the bodies can be moved
	// there first and the release stays seamless.
	release: (offset: number) => void
}

interface PhysicsResult {
	teardown: () => void
	controls: LemonFallHandle
}

function initPhysics(container: HTMLDivElement, layer: HTMLDivElement, count: number, ceilingEnabled: boolean): PhysicsResult {
	const noop = () => undefined
	const engine = Matter.Engine.create({ gravity: { x: 0, y: 1, scale: 0.0025 } })
	const { world } = engine
	let w = container.clientWidth
	let h = container.clientHeight

	if (w < 1 || h < 1) return { teardown: noop, controls: { release: noop } }

	// spawn above the visible viewport so lemons fall in from offscreen
	const viewportTopInContainer = -container.getBoundingClientRect().top
	const sizeHint = getLemonSizePx()
	const spawnPadding = Math.max(window.innerHeight * 0.2, sizeHint)
	const topExtra = Math.max(
		0,
		-viewportTopInContainer + spawnPadding * 2 + count * sizeHint,
	)

	let walls = makeWalls(w, h, topExtra)
	let ceiling: Matter.Body | null = null
	const topExtraCurrent = topExtra

	Matter.Composite.add(world, walls)
	container.style.overflow = 'visible'
	layer.style.overflow = 'visible'

	const entries: LemonEntry[] = []
	for (let i = 0; i < count; i++) {
		const size = getLemonSizePx()
		const r = size / 2
		const x = r + Math.random() * (w - r * 2)
		const y = viewportTopInContainer - r - spawnPadding - Math.random() * spawnPadding - i * (size * 0.9)

		const body = Matter.Bodies.circle(x, y, r, { ...LEMON_PHYSICS, angle: (Math.random() - 0.5) * Math.PI })
		const el = document.createElement('img')
		el.src = lemon_images[Math.floor(Math.random() * lemon_images.length)]
		el.alt = ''
		el.draggable = false
		el.className = lemon_class
		layer.appendChild(el)

		Matter.Composite.add(world, body)
		entries.push({ body, el, size })
	}

	// Matter.js steals scroll events — remove them so the page still scrolls
	const mouse = Matter.Mouse.create(layer)
	const m = mouse as Matter.Mouse & { mousewheel: (e: Event) => void }
	m.element.removeEventListener('mousewheel', m.mousewheel)
	m.element.removeEventListener('DOMMouseScroll', m.mousewheel)
	const mouseConstraint = Matter.MouseConstraint.create(engine, {
		mouse,
		constraint: { stiffness: 0.65, damping: 0.08, render: { visible: false } },
	})
	Matter.Composite.add(world, mouseConstraint)

	const runner = Matter.Runner.create()
	Matter.Runner.run(runner, engine)

	const enableCeiling = () => {
		if (!ceilingEnabled || ceiling) return
		ceiling = makeCeiling(w)
		Matter.Composite.add(world, ceiling)
		container.style.overflow = 'hidden'
		layer.style.overflow = 'hidden'
	}

	const ceilingFallback = ceilingEnabled
		? window.setTimeout(enableCeiling, 5000)
		: undefined

	const syncDom = () => {
		for (const { body, el, size } of entries) {
			const x = body.position.x - size / 2
			const y = body.position.y - size / 2
			el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${body.angle}rad)`
			el.style.visibility =
				x + size < 0 || x > w || (ceiling && (y + size < 0 || y > h)) ? 'hidden' : 'visible'
		}

		if (ceilingEnabled && !ceiling && entries.every(({ body, size }) => body.position.y >= size / 2)) {
			enableCeiling()
		}
	}

	const controls: LemonFallHandle = {
		release: (offset) => {
			// move the bodies up to exactly where the ride was showing them and
			// redraw on this same frame so nothing jumps when the wrapper's ride
			// transform is cleared — then gravity (plus a kick) drops them
			const drop = h * 0.02
			for (const { body } of entries) {
				Matter.Body.translate(body, { x: 0, y: -offset })
				Matter.Body.setVelocity(body, { x: 0, y: drop })
				Matter.Body.setAngularVelocity(body, 0)
			}
			syncDom()
		},
	}

	Matter.Events.on(engine, 'afterUpdate', syncDom)
	syncDom()

	const handleResize = () => {
		const nextW = container.clientWidth
		const nextH = container.clientHeight
		if (nextW < 1 || nextH < 1) return

		if (nextW !== w || nextH !== h) {
			Matter.Composite.remove(world, ceiling ? [...walls, ceiling] : walls)
			walls = makeWalls(nextW, nextH, topExtraCurrent)
			if (ceiling) ceiling = makeCeiling(nextW)
			Matter.Composite.add(world, ceiling ? [...walls, ceiling] : walls)
			w = nextW
			h = nextH
		}

		for (const entry of entries) {
			const nextSize = getLemonSizePx()
			const scale = nextSize / entry.size
			if (Math.abs(scale - 1) > 0.001) {
				Matter.Body.scale(entry.body, scale, scale)
				entry.size = nextSize
			}
		}
	}

	const resizeObserver = new ResizeObserver(handleResize)
	resizeObserver.observe(container)
	window.addEventListener('resize', handleResize)

	const teardown = () => {
		if (ceilingFallback !== undefined) window.clearTimeout(ceilingFallback)
		resizeObserver.disconnect()
		window.removeEventListener('resize', handleResize)
		container.style.overflow = ''
		layer.style.overflow = ''
		Matter.Events.off(engine, 'afterUpdate', syncDom)
		Matter.Runner.stop(runner)
		Matter.Composite.remove(world, mouseConstraint)
		Matter.Engine.clear(engine)
		Matter.Mouse.clearSourceEvents(m)
		for (const { el } of entries) el.remove()
	}

	return { teardown, controls }
}

interface LemonFallProps extends React.HTMLAttributes<HTMLDivElement> {
	count?: number
	scrollThreshold?: number
	ceiling?: boolean
	spawn?: boolean
}

function useLemonFall(
	containerRef: React.RefObject<HTMLDivElement | null>,
	layerRef: React.RefObject<HTMLDivElement | null>,
	controlsRef: React.MutableRefObject<LemonFallHandle | null>,
	count: number,
	scrollThreshold: number,
	ceilingEnabled: boolean,
	spawn: boolean | undefined,
) {
	const pathname = usePathname()

	useEffect(() => {
		const container = containerRef.current
		const layer = layerRef.current
		const viewport = document.getElementById('viewport')
		if (!container || !layer || !viewport) return

		let teardown: (() => void) | undefined
		let spawned = false

		const runSpawn = () => {
			if (spawned) return
			spawned = true
			requestAnimationFrame(() => requestAnimationFrame(() => {
				const result = initPhysics(container, layer, count, ceilingEnabled)
				teardown = result.teardown
				controlsRef.current = result.controls
			}))
		}

		// controlled mode: the parent decides when the lemons drop
		if (spawn !== undefined) {
			if (spawn) runSpawn()
			return () => {
				teardown?.()
				controlsRef.current = null
			}
		}

		// uncontrolled mode: drop once the page is scrolled past the threshold
		const trySpawn = () => {
			if (spawned) return

			const maxScroll = viewport.scrollHeight - viewport.clientHeight
			if (maxScroll <= 0 || viewport.scrollTop / maxScroll < scrollThreshold) return

			viewport.removeEventListener('scroll', trySpawn)
			runSpawn()
		}

		viewport.addEventListener('scroll', trySpawn, { passive: true })
		trySpawn()

		return () => {
			viewport.removeEventListener('scroll', trySpawn)
			teardown?.()
			controlsRef.current = null
		}
	}, [containerRef, layerRef, controlsRef, count, scrollThreshold, ceilingEnabled, spawn, pathname])
}

const LemonFall = forwardRef<LemonFallHandle, LemonFallProps>(function LemonFall({
	count = 10,
	scrollThreshold = 0.9,
	ceiling = true,
	spawn,
	className,
	children,
	...props
}, ref) {
	const containerRef = useRef<HTMLDivElement>(null)
	const layerRef = useRef<HTMLDivElement>(null)
	const controlsRef = useRef<LemonFallHandle | null>(null)

	useLemonFall(containerRef, layerRef, controlsRef, count, scrollThreshold, ceiling, spawn)

	useImperativeHandle(ref, () => ({
		release: (offset: number) => controlsRef.current?.release(offset),
	}), [])

	return (
		<div
			ref={containerRef}
			className={clsx('relative overflow-hidden pointer-events-none min-h-[50vh]', className)}
			{...props}
		>
			{children && (
				<div className='relative z-0 pointer-events-auto'>{children}</div>
			)}
			<div
				ref={layerRef}
				className='absolute inset-0 z-10 touch-none pointer-events-none overflow-hidden'
				aria-hidden='true'
			/>
		</div>
	)
})

export default LemonFall
