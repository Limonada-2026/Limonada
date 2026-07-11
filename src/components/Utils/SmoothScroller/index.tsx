'use client'

// libraries
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// utils
import { SCROLL_LOCK, SCROLL_UNLOCK } from '@/utils/scroll'

// interface
interface Props {
	children: React.ReactNode
}

export default function SmoothScroller({
	children
}: Props) {
	const viewportRef = useRef<HTMLDivElement>(null)
	const smoothScrollStateRef = useRef<{
		currentScroll: number
		targetScroll: number
		isScrolling: boolean
		rafId: number | null
		paused: boolean
	} | null>(null)
	const pathname = usePathname()

	// scroll to top on route change
	useEffect(() => {
		const viewport = viewportRef.current
		if (!viewport) return

		// reset smooth scroll state if it exists
		if (smoothScrollStateRef.current) {
			smoothScrollStateRef.current.currentScroll = 0
			smoothScrollStateRef.current.targetScroll = 0
			smoothScrollStateRef.current.isScrolling = false
			if (smoothScrollStateRef.current.rafId !== null) {
				cancelAnimationFrame(smoothScrollStateRef.current.rafId)
				smoothScrollStateRef.current.rafId = null
			}
		}

		// scroll to top immediately when route changes
		viewport.scrollTop = 0

	}, [pathname])

	useEffect(() => {
		const viewport = viewportRef.current
		if (!viewport) return

		// only enable smooth scroll on desktop (not mobile for better performance)
		const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

		ScrollTrigger.config({ ignoreMobileResize: true })

		if (isMobile) {
			const timer = setTimeout(() => {
				ScrollTrigger.refresh(true)
			}, 1000)

			return () => {
				clearTimeout(timer)
			}
		}

		// desktop smooth scroll using requestAnimationFrame with lerp
		const state = {
			currentScroll: viewport.scrollTop,
			targetScroll: viewport.scrollTop,
			isScrolling: false,
			rafId: null as number | null,
			paused: false
		}
		smoothScrollStateRef.current = state

		// lerp function for smooth interpolation
		const lerp = (start: number, end: number, factor: number) => {
			return start + (end - start) * factor
		}

		const smoothScroll = () => {
			if (state.paused) {
				state.isScrolling = false
				state.rafId = null
				return
			}

			// calculate difference
			const diff = state.targetScroll - state.currentScroll

			// if difference is very small, snap to target
			if (Math.abs(diff) < 0.5) {
				state.currentScroll = state.targetScroll
				viewport.scrollTop = state.currentScroll
				ScrollTrigger.update()
				state.isScrolling = false
				state.rafId = null
				return
			}

			// lerp towards target (0.1 = faster, 0.05 = slower but smoother)
			state.currentScroll = lerp(state.currentScroll, state.targetScroll, 0.075)
			viewport.scrollTop = state.currentScroll
			ScrollTrigger.update()

			state.rafId = requestAnimationFrame(smoothScroll)
		}

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault()

			if (state.paused) return

			// update target scroll position
			state.targetScroll += e.deltaY
			state.targetScroll = Math.max(0, Math.min(state.targetScroll, viewport.scrollHeight - viewport.clientHeight))

			// start smooth scroll animation if not already running
			if (!state.isScrolling) {
				state.isScrolling = true
				smoothScroll()
			}
		}

		// yield to programmatic scrolling (gsap scrollToTop, anchors, etc.)
		const handleScroll = () => {
			const externalDelta = Math.abs(viewport.scrollTop - state.currentScroll)

			// something else moved scrollTop — cancel our lerp and sync
			if (state.isScrolling && externalDelta > 1) {
				if (state.rafId !== null) {
					cancelAnimationFrame(state.rafId)
					state.rafId = null
				}
				state.isScrolling = false
			}

			if (!state.isScrolling) {
				state.currentScroll = viewport.scrollTop
				state.targetScroll = viewport.scrollTop
			}
		}

		const handleLock = () => {
			state.paused = true
			state.targetScroll = viewport.scrollTop
			state.currentScroll = viewport.scrollTop
			if (state.rafId !== null) {
				cancelAnimationFrame(state.rafId)
				state.rafId = null
			}
			state.isScrolling = false
		}

		const handleUnlock = () => {
			state.paused = false
			state.currentScroll = viewport.scrollTop
			state.targetScroll = viewport.scrollTop
		}

		viewport.addEventListener('wheel', handleWheel, { passive: false })
		viewport.addEventListener('scroll', handleScroll, { passive: true })
		window.addEventListener(SCROLL_LOCK, handleLock)
		window.addEventListener(SCROLL_UNLOCK, handleUnlock)

		// refresh scrollTrigger after setup
		const timer = setTimeout(() => {
			ScrollTrigger.refresh(true)
		}, 1000)

		return () => {
			viewport.removeEventListener('wheel', handleWheel)
			viewport.removeEventListener('scroll', handleScroll)
			window.removeEventListener(SCROLL_LOCK, handleLock)
			window.removeEventListener(SCROLL_UNLOCK, handleUnlock)
			clearTimeout(timer)
			if (state.rafId !== null) {
				cancelAnimationFrame(state.rafId)
			}
			smoothScrollStateRef.current = null
		}
	}, [])

	return (
		<div id='viewport' ref={viewportRef}>
			<div id='main-content' className='overflow-hidden'>
				{children}
			</div>
		</div>
	)
}
