'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// utils
import { pushGtmEvent } from '@/utils/gtm'

/**
 * Routes here are client-side navigations (next/link, no full page reload), so GTM's
 * built-in Page View trigger only ever fires once, on the very first load. This pushes
 * a custom event on every route change (including the first one) so GTM has a single,
 * reliable signal to build page-based triggers and audiences on.
 */
export default function GtmPageView() {
	const pathname = usePathname()

	useEffect(() => {
		pushGtmEvent('virtual_page_view', { page_path: pathname })
	}, [pathname])

	return null
}
