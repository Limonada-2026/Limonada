// libraries
import { Metadata } from 'next'

// pages
import Error404 from '@/app/_404/page'

// utils
import { pageMetadata } from '@/utils/seo'

// metadata
export const metadata: Metadata = pageMetadata({
	title: 'Erro 404: Página não encontrada | Limonada',
	description: 'Parece que o link que você seguiu não está mais disponível.',
	path: '/404',
	noIndex: true
})

export default function NotFound() {
	return (
		<Error404 />
	)
}
