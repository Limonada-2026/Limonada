'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

// utils
import { pushGtmEvent } from '@/utils/gtm'

const THRESHOLDS = [25, 50, 75, 90, 100]

/**
 * The site scrolls inside a custom #viewport element (see SmoothScroller), with html/body
 * hard-locked to overflow: hidden. GTM's built-in Scroll Depth trigger reads native window
 * scroll, so it never fires here. This tracks the real #viewport element instead and pushes
 * our own threshold events for GTM to listen to via a Custom Event trigger.
 */
export default function GtmScrollDepth() {
	const pathname = usePathname()
	const firedRef = useRef<Set<number>>(new Set())

	useEffect(() => {
		firedRef.current = new Set()

		const viewport = document.getElementById('viewport')
		if (!viewport) return

		const handleScroll = () => {
			const scrollable = viewport.scrollHeight - viewport.clientHeight
			if (scrollable <= 0) return

			const percent = (viewport.scrollTop / scrollable) * 100

			THRESHOLDS.forEach((threshold) => {
				if (percent >= threshold && !firedRef.current.has(threshold)) {
					firedRef.current.add(threshold)
					pushGtmEvent('scroll_depth', { percent: threshold, page_path: pathname })
				}
			})
		}

		viewport.addEventListener('scroll', handleScroll, { passive: true })

		return () => {
			viewport.removeEventListener('scroll', handleScroll)
		}
	}, [pathname])

	return null
}
