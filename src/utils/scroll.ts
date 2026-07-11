import { gsap } from 'gsap'

export const SCROLL_TO_TOP_START = 'viewport:scroll-to-top-start'
export const SCROLL_TO_TOP_END = 'viewport:scroll-to-top-end'

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
