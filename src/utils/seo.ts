// libraries
import type { Metadata } from 'next'

// canonical origin, kept in sync with next-sitemap.config.js
export const siteUrl = process.env.SITE_URL || 'https://alimonada.com.br'

export const siteName = 'Limonada'

export const siteDescription = 'Boutique de desenvolvimento para pessoas e negócios. Trabalhamos a partir do contexto de cada empresa para transformar desafios em decisões e ações que movem pessoas, culturas e negócios.'

// fallback share image, used whenever a page has no image of its own
export const defaultOgImage = {
	url: '/img/og-image.png',
	width: 1200,
	height: 630
}

type PageMetadata = {
	// full title, exactly as it should appear in the tab and in shares
	title: string
	description: string
	// path relative to the site root, used for both the canonical and og:url
	path: string
	// share image. a bare path falls back to no declared dimensions, which is
	// fine for every crawler but slower to render on the first Facebook scrape
	image?: string
	imageWidth?: number
	imageHeight?: number
	type?: 'website' | 'article'
	noIndex?: boolean
	// article only
	publishedTime?: string
	authors?: string[]
	tags?: string[]
}

// builds the full metadata set for a page: title, description, canonical,
// Open Graph and Twitter. without this, pages that only declare a title end up
// inheriting the root layout's Open Graph block and every share looks identical.
export function pageMetadata({
	title,
	description,
	path,
	image,
	imageWidth,
	imageHeight,
	type = 'website',
	noIndex = false,
	publishedTime,
	authors,
	tags
}: PageMetadata): Metadata {

	const ogImage = image
		? { url: image, ...(imageWidth && imageHeight ? { width: imageWidth, height: imageHeight } : {}), alt: title }
		: { ...defaultOgImage, alt: title }

	return {
		title,
		description,
		alternates: {
			canonical: path
		},
		openGraph: {
			type,
			title,
			description,
			url: path,
			siteName,
			locale: 'pt_BR',
			images: [ogImage],
			...(type === 'article' && publishedTime ? { publishedTime } : {}),
			...(type === 'article' && authors ? { authors } : {}),
			...(type === 'article' && tags ? { tags } : {})
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage.url]
		},
		...(noIndex && {
			robots: {
				index: false,
				follow: false
			}
		})
	}
}

// absolute URL for a path, for schema.org blocks that don't get metadataBase
export function absoluteUrl(path: string) {
	return new URL(path, siteUrl).toString()
}

// schema.org
// the organization is declared once, in the root layout. page-level blocks point
// back at it through this id instead of repeating every field
export const organizationId = absoluteUrl('/#organization')
export const websiteId = absoluteUrl('/#website')

// square logo, Google renders it on a white background and wants at least 112px
const schemaLogo = {
	'@type': 'ImageObject',
	url: absoluteUrl('/web-app-manifest-512x512.png'),
	width: 512,
	height: 512
}

export const organizationRef = {
	'@type': 'Organization',
	'@id': organizationId,
	name: siteName,
	url: siteUrl,
	logo: schemaLogo
}

export function organizationSchema({ sameAs }: { sameAs: string[] }) {
	return {
		...organizationRef,
		description: siteDescription,
		image: absoluteUrl(defaultOgImage.url),
		email: 'contato@alimonada.com.br',
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Rua José Casemiro Stenzowski, 21D - Novo Mundo',
			addressLocality: 'Curitiba',
			addressRegion: 'PR',
			postalCode: '81010-370',
			addressCountry: 'BR'
		},
		contactPoint: {
			'@type': 'ContactPoint',
			email: 'contato@alimonada.com.br',
			contactType: 'customer service',
			availableLanguage: 'Portuguese'
		},
		sameAs,
		knowsAbout: ['Liderança', 'Soft skills', 'Inovação', 'Estratégia']
	}
}

export function websiteSchema() {
	return {
		'@type': 'WebSite',
		'@id': websiteId,
		url: siteUrl,
		name: siteName,
		inLanguage: 'pt-BR',
		publisher: { '@id': organizationId }
	}
}

type ArticleSchema = {
	title: string
	description: string
	path: string
	image: string
	datePublished?: string
	dateModified?: string
	// a person's name, or the organization itself when nobody signs the piece
	author?: string
	tags?: string[]
	// the company a case is about
	about?: string
}

export function articleSchema({
	title,
	description,
	path,
	image,
	datePublished,
	dateModified,
	author,
	tags,
	about
}: ArticleSchema) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: title,
		description,
		image: [absoluteUrl(image)],
		...(datePublished ? { datePublished, dateModified: dateModified || datePublished } : {}),
		inLanguage: 'pt-BR',
		...(tags?.length ? { keywords: tags } : {}),
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': absoluteUrl(path)
		},
		author: author ? { '@type': 'Person', name: author } : organizationRef,
		publisher: organizationRef,
		...(about ? { about: { '@type': 'Organization', name: about } } : {})
	}
}

// trail from the home page down to the current page, home is added here
export function breadcrumbSchema(items: { name: string, path: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [{ name: 'Início', path: '/' }, ...items].map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: absoluteUrl(item.path)
		}))
	}
}
