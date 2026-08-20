// components
import ObrigadoContent from './ObrigadoContent'

export const metadata = {
	title: 'Mensagem enviada com sucesso: Limonada',
	description: 'Obrigado por entrar em contato com a Limonada.',
	canonical: '/contato/obrigado',
	robots: {
		index: false,
		follow: false
	}
}

export default function Obrigado() {
	return (
		<ObrigadoContent />
	)
}
