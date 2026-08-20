import { sendRdStationConversion } from '@/lib/rdstation'

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

		await sendRdStationConversion({
			identificador: 'site-newsletter',
			email: body.email,
		})

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
