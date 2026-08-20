'use client'

import { useEffect } from 'react'

// utils
import { UTM_KEYS, pushGtmEvent } from '@/utils/gtm'

/**
 * Internal navigation doesn't carry UTM params (next/link hrefs don't include them), so
 * they'd otherwise be lost as soon as someone clicks anywhere on the site. This captures
 * them once, on the landing hit, into sessionStorage so they stay readable for the rest
 * of the session, and pushes them to the dataLayer so GTM can grab them immediately too.
 */
export default function GtmUtmCapture() {
	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const utms: Record<string, string> = {}

		UTM_KEYS.forEach((key) => {
			const value = params.get(key)
			if (value) utms[key] = value
		})

		if (Object.keys(utms).length === 0) return

		Object.entries(utms).forEach(([key, value]) => {
			sessionStorage.setItem(key, value)
		})

		pushGtmEvent('utm_capture', utms)
	}, [])

	return null
}
