interface RdStationConversionPayload {
	conversion_identifier: string
	email: string
	name?: string
	personal_phone?: string
	company_name?: string
	job_title?: string
	traffic_source?: string
	traffic_medium?: string
	traffic_campaign?: string
	traffic_value?: string
}

/** Maps the UTM fields a form submitted (see UtmHiddenFields) onto RD Station's traffic fields. */
export const utmsToRdTraffic = (body: Record<string, unknown>) => ({
	traffic_source: body.utm_source as string | undefined,
	traffic_medium: body.utm_medium as string | undefined,
	traffic_campaign: body.utm_campaign as string | undefined,
	traffic_value: body.utm_term as string | undefined,
})

/**
 * Registers a lead conversion in RD Station. Never throws: a failure here (missing
 * token, RD Station outage, etc.) is logged but must not break the caller's own
 * flow (sending an email, signing up a newsletter contact), since that's the
 * primary action and RD Station tracking is secondary to it.
 *
 * Uses the v2 conversions endpoint. The legacy 1.3 one only reads traffic_source as
 * RD's own __trf.src cookie and has no traffic_medium/campaign/value fields, so raw
 * UTMs sent there never showed up on the lead.
 */
export async function sendRdStationConversion(payload: RdStationConversionPayload) {
	if (!process.env.RD_STATION_PUBLIC_TOKEN) {
		console.error('RD_STATION_PUBLIC_TOKEN is not defined, skipping RD Station conversion')
		return
	}

	// RD rejects empty strings on some fields, so leave out whatever the form didn't fill
	const cleanPayload = Object.fromEntries(
		Object.entries(payload).filter(([, value]) => typeof value === 'string' && value.trim() !== '')
	)

	try {
		const url = `https://api.rd.services/platform/conversions?api_key=${encodeURIComponent(process.env.RD_STATION_PUBLIC_TOKEN)}`
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				event_type: 'CONVERSION',
				event_family: 'CDP',
				payload: cleanPayload
			})
		})

		if (!response.ok) {
			const errBody = await response.text().catch(() => '')
			console.error('RD Station conversion failed:', response.status, errBody)
		}
	} catch (error) {
		console.error('RD Station conversion request failed:', error)
	}
}
