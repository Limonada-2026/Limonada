interface RdStationConversionPayload {
	identificador: string
	email: string
	nome?: string
	telefone?: string
	empresa?: string
	cargo?: string
	traffic_source?: string
	traffic_medium?: string
	traffic_campaign?: string
	traffic_value?: string
}

/**
 * Registers a lead conversion in RD Station. Never throws: a failure here (missing
 * token, RD Station outage, etc.) is logged but must not break the caller's own
 * flow (sending an email, signing up a newsletter contact), since that's the
 * primary action and RD Station tracking is secondary to it.
 */
export async function sendRdStationConversion(payload: RdStationConversionPayload) {
	if (!process.env.RD_STATION_PUBLIC_TOKEN) {
		console.error('RD_STATION_PUBLIC_TOKEN is not defined, skipping RD Station conversion')
		return
	}

	try {
		const response = await fetch('https://www.rdstation.com.br/api/1.3/conversions', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				token_rdstation: process.env.RD_STATION_PUBLIC_TOKEN,
				...payload
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
