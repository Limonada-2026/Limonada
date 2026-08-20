import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
	throw new Error('RESEND_API_KEY is not defined')
}

if (!process.env.RESEND_NEWSLETTER_SEGMENT_ID) {
	throw new Error('RESEND_NEWSLETTER_SEGMENT_ID is not defined')
}

const resend = new Resend(process.env.RESEND_API_KEY)
const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID

export async function POST(req: Request) {
	try {
		const body = await req.json()

		if (!body.email) {
			return new Response(
				JSON.stringify({
					status: 'error',
					error: 'Email é obrigatório',
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				}
			)
		}

		const { error } = await resend.contacts.create({
			email: body.email,
			unsubscribed: false,
			segments: [{ id: segmentId }],
		})

		if (error) {
			// contact already exists: re-subscribe and make sure it's in the segment, instead of failing
			const alreadyExists = error.message?.toLowerCase().includes('already exists')

			if (!alreadyExists) {
				console.error('Error creating contact:', error)
				return new Response(
					JSON.stringify({
						status: 'error',
						error: 'Erro ao inscrever email',
					}),
					{
						status: 500,
						headers: { 'Content-Type': 'application/json' },
					}
				)
			}

			await resend.contacts.update({
				email: body.email,
				unsubscribed: false,
			})

			await resend.contacts.segments.add({
				email: body.email,
				segmentId,
			})
		}

		return new Response(
			JSON.stringify({ status: 'success' }),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		)
	} catch (error) {
		console.error('Unexpected error:', error)

		return new Response(
			JSON.stringify({
				status: 'error',
				error: 'Erro inesperado ao processar a solicitação',
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		)
	}
}
