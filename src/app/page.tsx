// libraries
import { Metadata } from 'next'

// pages
import Home from '@/app/_home/page'

// utils
import { pageMetadata } from '@/utils/seo'

// isr
export const revalidate = 3600

// metadata
export const metadata: Metadata = pageMetadata({
	title: 'Limonada: boutique de desenvolvimento para pessoas e negócios',
	description: 'Transformamos desafios em decisões e ações que movem pessoas, culturas e negócios. Conheça a boutique de desenvolvimento que faz limonada.',
	path: '/'
})

export default function HomeDefault() {
	return (
		<Home />
	)
}
