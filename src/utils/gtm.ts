type GtmEventPayload = Record<string, unknown>

export const pushGtmEvent = (event?: string, payload?: GtmEventPayload) => {
	if (!event || typeof window === 'undefined') return

	const win = window as typeof window & { dataLayer?: Record<string, unknown>[] }
	win.dataLayer = win.dataLayer || []
	win.dataLayer.push({ event, ...payload })
}
