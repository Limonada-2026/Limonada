// libraries
import { Metadata } from 'next'

// components
import ObrigadoContent from './ObrigadoContent'

// utils
import { pageMetadata } from '@/utils/seo'

// metadata
export const metadata: Metadata = pageMetadata({
	title: 'Mensagem enviada com sucesso: Limonada',
	description: 'Obrigado por entrar em contato com a Limonada.',
	path: '/contato/obrigado',
	noIndex: true
})

export default function Obrigado() {
	return (
		<ObrigadoContent />
	)
}
