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
