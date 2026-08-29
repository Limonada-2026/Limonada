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
	// tear the whole simulation down: stop the runner and remove the lemon nodes
	// from the DOM (so nothing keeps ticking / painting once they're not needed)
	destroy: () => void
}

interface PhysicsResult {
	teardown: () => void
	controls: LemonFallHandle
}

function initPhysics(container: HTMLDivElement, layer: HTMLDivElement, contentEl: HTMLDivElement | null, avoidEl: HTMLElement | null, count: number, ceilingEnabled: boolean, onLemonDragStart: () => void, onLemonDragEnd: () => void): PhysicsResult {
	const noop = () => undefined
	const engine = Matter.Engine.create({ gravity: { x: 0, y: 1, scale: 0.0025 } })
	const { world } = engine
	let w = container.clientWidth
	let h = container.clientHeight

	if (w < 1 || h < 1) return { teardown: noop, controls: { release: noop, destroy: noop } }

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

	// an invisible static body over `avoidEl` (e.g. a logo) so lemons can never
	// come to rest on top of it — they're kept clear, spawning on its open side
	let obstacle: Matter.Body | null = null
	let obstacleRight: number | null = null
	const obstaclePadding = 24
	const syncObstacle = () => {
		if (obstacle) {
			Matter.Composite.remove(world, obstacle)
			obstacle = null
		}
		if (!avoidEl) {
			obstacleRight = null
			return
		}
		const containerRect = container.getBoundingClientRect()
		const r = avoidEl.getBoundingClientRect()
		const left = r.left - containerRect.left - obstaclePadding
		const top = r.top - containerRect.top - obstaclePadding
		const right = r.right - containerRect.left + obstaclePadding
		const bottom = r.bottom - containerRect.top + obstaclePadding

		// when the element spans (nearly) the whole width — the full-width logo on
		// mobile, say — blocking it would leave nowhere for the lemons to go, so drop
		// the obstacle and let them fall past it into the space underneath
		if (right + getLemonSizePx() * 1.2 > w) {
			obstacleRight = null
			return
		}

		obstacleRight = right
		obstacle = Matter.Bodies.rectangle((left + right) / 2, (top + bottom) / 2, right - left, bottom - top, wall_physics)
		Matter.Composite.add(world, obstacle)
	}
	syncObstacle()

	const entries: LemonEntry[] = []
	for (let i = 0; i < count; i++) {
		const size = getLemonSizePx()
		const r = size / 2
		// keep spawns clear of the obstacle horizontally so lemons always land on its open side
		const clearLeft = obstacleRight !== null && obstacleRight + r * 2 < w ? obstacleRight : 0
		const x = clearLeft + r + Math.random() * (w - clearLeft - r * 2)
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

	// while a lemon is being dragged, drop pointer-events on the content above it
	// (and anything the consumer flagged via onLemonDragStart/onLemonDragEnd) so the drag
	// keeps tracking the cursor even as it passes over links/text
	const handleStartDrag = () => {
		contentEl?.classList.add('lemon-dragging')
		onLemonDragStart()
	}
	const handleEndDrag = () => {
		contentEl?.classList.remove('lemon-dragging')
		onLemonDragEnd()
	}
	Matter.Events.on(mouseConstraint, 'startdrag', handleStartDrag)
	Matter.Events.on(mouseConstraint, 'enddrag', handleEndDrag)

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
		destroy: noop,
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

		syncObstacle()

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

	let torn = false
	const teardown = () => {
		if (torn) return
		torn = true
		if (ceilingFallback !== undefined) window.clearTimeout(ceilingFallback)
		resizeObserver.disconnect()
		window.removeEventListener('resize', handleResize)
		container.style.overflow = ''
		layer.style.overflow = ''
		Matter.Events.off(engine, 'afterUpdate', syncDom)
		Matter.Events.off(mouseConstraint, 'startdrag', handleStartDrag)
		Matter.Events.off(mouseConstraint, 'enddrag', handleEndDrag)
		contentEl?.classList.remove('lemon-dragging')
		onLemonDragEnd()
		Matter.Runner.stop(runner)
		Matter.Composite.remove(world, mouseConstraint)
		Matter.Engine.clear(engine)
		Matter.Mouse.clearSourceEvents(m)
		for (const { el } of entries) el.remove()
	}

	// destroying the simulation is exactly the same as tearing it down
	controls.destroy = teardown

	return { teardown, controls }
}

interface LemonFallProps extends React.HTMLAttributes<HTMLDivElement> {
	count?: number
	scrollThreshold?: number
	ceiling?: boolean
	spawn?: boolean
	// element to keep clear of — lemons never rest on it and spawn on its open side
	avoidRef?: React.RefObject<HTMLElement | null>
	// fired while any lemon is grabbed / released — use this to drop pointer-events
	// on content that lives outside LemonFall's own children (e.g. sibling sections)
	// so dragging keeps tracking the cursor as it passes over links/text there too
	onLemonDragStart?: () => void
	onLemonDragEnd?: () => void
}

function useLemonFall(
	containerRef: React.RefObject<HTMLDivElement | null>,
	layerRef: React.RefObject<HTMLDivElement | null>,
	contentRef: React.RefObject<HTMLDivElement | null>,
	avoidRef: React.RefObject<HTMLElement | null> | undefined,
	controlsRef: React.MutableRefObject<LemonFallHandle | null>,
	count: number,
	scrollThreshold: number,
	ceilingEnabled: boolean,
	spawn: boolean | undefined,
	onLemonDragStart: (() => void) | undefined,
	onLemonDragEnd: (() => void) | undefined,
) {
	const pathname = usePathname()

	// keep the latest callbacks without tearing the physics sim down whenever
	// the consumer passes a fresh function identity on re-render
	const onLemonDragStartRef = useRef(onLemonDragStart)
	const onLemonDragEndRef = useRef(onLemonDragEnd)
	onLemonDragStartRef.current = onLemonDragStart
	onLemonDragEndRef.current = onLemonDragEnd

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
				const result = initPhysics(
					container,
					layer,
					contentRef.current,
					avoidRef?.current ?? null,
					count,
					ceilingEnabled,
					() => onLemonDragStartRef.current?.(),
					() => onLemonDragEndRef.current?.(),
				)
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
	}, [containerRef, layerRef, contentRef, avoidRef, controlsRef, count, scrollThreshold, ceilingEnabled, spawn, pathname])
}

const LemonFall = forwardRef<LemonFallHandle, LemonFallProps>(function LemonFall({
	count = 10,
	scrollThreshold = 0.9,
	ceiling = true,
	spawn,
	avoidRef,
	onLemonDragStart,
	onLemonDragEnd,
	className,
	children,
	...props
}, ref) {
	const containerRef = useRef<HTMLDivElement>(null)
	const layerRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const controlsRef = useRef<LemonFallHandle | null>(null)

	useLemonFall(containerRef, layerRef, contentRef, avoidRef, controlsRef, count, scrollThreshold, ceiling, spawn, onLemonDragStart, onLemonDragEnd)

	useImperativeHandle(ref, () => ({
		release: (offset: number) => controlsRef.current?.release(offset),
		destroy: () => {
			controlsRef.current?.destroy()
			controlsRef.current = null
		},
	}), [])

	return (
		<div
			ref={containerRef}
			className={clsx('relative overflow-hidden pointer-events-none min-h-[50vh]', className)}
			{...props}
		>
			{children && (
				<div ref={contentRef} className='relative z-20 pointer-events-none'>{children}</div>
			)}
			<div
				ref={layerRef}
				className='absolute inset-0 z-0 touch-none pointer-events-none overflow-hidden'
				aria-hidden='true'
			/>
		</div>
	)
})

export default LemonFall
