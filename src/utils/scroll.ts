import { gsap } from 'gsap'

export const SCROLL_TO_TOP_START = 'viewport:scroll-to-top-start'
export const SCROLL_TO_TOP_END = 'viewport:scroll-to-top-end'
export const SCROLL_LOCK = 'viewport:scroll-lock'
export const SCROLL_UNLOCK = 'viewport:scroll-unlock'

export function scrollViewportToTop(duration = 1.5) {
	const viewport = document.getElementById('viewport')
	if (!viewport) return

	window.dispatchEvent(new CustomEvent(SCROLL_TO_TOP_START))

	gsap.to(viewport, {
		scrollTop: 0,
		duration,
		ease: 'power1.inOut',
		overwrite: true,
		onComplete: () => {
			window.dispatchEvent(new CustomEvent(SCROLL_TO_TOP_END))
		},
		onInterrupt: () => {
			window.dispatchEvent(new CustomEvent(SCROLL_TO_TOP_END))
		}
	})
}

export function scrollViewportToElement(
	element: HTMLElement | null,
	offset = 120,
	duration = .8,
	onComplete?: () => void
) {
	const viewport = document.getElementById('viewport')

	if (!viewport || !element) {
		onComplete?.()
		return
	}

	const target = Math.max(0, viewport.scrollTop + element.getBoundingClientRect().top - offset)

	// already there, skip the tween
	if (Math.abs(target - viewport.scrollTop) < 2) {
		onComplete?.()
		return
	}

	let done = false
	const finish = () => {
		if (done) return
		done = true
		onComplete?.()
	}

	return gsap.to(viewport, {
		scrollTop: target,
		duration,
		ease: 'power2.inOut',
		overwrite: true,
		onComplete: finish,
		onInterrupt: finish
	})
}

export function lockViewportScroll() {
	const viewport = document.getElementById('viewport')
	if (viewport) {
		viewport.style.overflowY = 'hidden'
	}
	window.dispatchEvent(new CustomEvent(SCROLL_LOCK))
}

export function unlockViewportScroll() {
	const viewport = document.getElementById('viewport')
	if (viewport) {
		viewport.style.overflowY = ''
	}
	window.dispatchEvent(new CustomEvent(SCROLL_UNLOCK))
}
