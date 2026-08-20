type GtmEventPayload = Record<string, unknown>

export const pushGtmEvent = (event?: string, payload?: GtmEventPayload) => {
	if (!event || typeof window === 'undefined') return

	const win = window as typeof window & { dataLayer?: Record<string, unknown>[] }
	win.dataLayer = win.dataLayer || []
	win.dataLayer.push({ event, ...payload })
}

export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

const readUtmsFromParams = (params: URLSearchParams): Record<string, string> => {
	const utms: Record<string, string> = {}

	UTM_KEYS.forEach((key) => {
		const value = params.get(key)
		if (value) utms[key] = value
	})

	return utms
}

/**
 * Prefers UTMs on the current URL (a fresh campaign click), falls back to whatever
 * was captured earlier this session, since internal navigation doesn't carry them.
 */
export const getUtms = (): Record<string, string> => {
	if (typeof window === 'undefined') return {}

	const fromUrl = readUtmsFromParams(new URLSearchParams(window.location.search))
	if (Object.keys(fromUrl).length > 0) return fromUrl

	const fromStorage: Record<string, string> = {}
	UTM_KEYS.forEach((key) => {
		const value = sessionStorage.getItem(key)
		if (value) fromStorage[key] = value
	})

	return fromStorage
}
