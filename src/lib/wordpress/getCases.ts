// libraries
import { cache } from 'react'
import { gql } from 'graphql-request'

// client
import { client } from './client'

// utils
import { decodeEntities, toPlainText, toParagraphs } from './utils'

// types
export type CaseBlock = {
	image: string
	title: string
	text: string
}

export type CaseNumber = {
	number: number
	text: string
	hasPlus?: boolean
	decimals?: number
	suffix?: string
	// shown verbatim instead of the animated counter, for figures that are not
	// a plain number (a year range, for instance)
	display?: string
	// second half of a range, counted up alongside the first
	rangeEnd?: number
}

export type CaseTestimonial = {
	testimonial: string
	position: string
	company: string
}

// headings above each section of a case page. every case uses the defaults
// below today, but the naming comes from the client's copy and varies, so a
// case can override any of them in WordPress.
export type CaseSectionTitles = {
	limao?: string
	corte?: string
	espremendo?: string
	numbers?: string
	testimonials?: string
}

export const defaultSectionTitles = {
	limao: 'O Limão',
	corte: 'O método Limão',
	espremendo: 'Transformamos limão em Limonada',
	numbers: 'O impacto Limonada',
	testimonials: 'Depoimentos'
}

export type Case = {
	id: number
	slug: string
	client: string
	title: string
	subtitle: string
	seoTitle: string
	description: string
	tags: string[]
	image: string
	logo: string
	// internal page content
	limao: string[]
	corte: string[]
	espremendo: string[]
	blocks: CaseBlock[]
	numbers: CaseNumber[]
	testimonials: CaseTestimonial[]
	cta: string
	sectionTitles?: CaseSectionTitles
}

type MediaEdge = {
	node: {
		mediaItemUrl: string | null
	} | null
} | null

type ClienteNode = {
	databaseId: number
	slug: string
	title: string
	excerpt: string | null
	featuredImage: MediaEdge
	tags: {
		nodes: {
			name: string | null
		}[]
	} | null
	clienteFields: {
		clientName: string | null
		subtitle: string | null
		seoTitle: string | null
		limao: string | null
		corte: string | null
		espremendo: string | null
		cta: string | null
		logo: MediaEdge
		blocks: {
			image: MediaEdge
			title: string | null
			text: string | null
		}[] | null
		numbers: {
			number: number | null
			text: string | null
			hasPlus: boolean | null
			decimals: number | null
			suffix: string | null
			display: string | null
			rangeEnd: number | null
		}[] | null
		testimonials: {
			testimonial: string | null
			position: string | null
			company: string | null
		}[] | null
		sectionTitles: {
			limao: string | null
			corte: string | null
			espremendo: string | null
			numbers: string | null
			testimonials: string | null
		} | null
	} | null
}

// every field the site needs from a client case
const caseFields = gql`
	fragment CaseFields on Cliente {
		databaseId
		slug
		title
		excerpt
		featuredImage {
			node {
				mediaItemUrl
			}
		}
		tags {
			nodes {
				name
			}
		}
		clienteFields {
			clientName
			subtitle
			seoTitle
			limao
			corte
			espremendo
			cta
			logo {
				node {
					mediaItemUrl
				}
			}
			blocks {
				image {
					node {
						mediaItemUrl
					}
				}
				title
				text
			}
			numbers {
				number
				text
				hasPlus
				decimals
				suffix
				display
				rangeEnd
			}
			testimonials {
				testimonial
				position
				company
			}
			sectionTitles {
				limao
				corte
				espremendo
				numbers
				testimonials
			}
		}
	}
`

// graphql queries
// cases are ordered by publish date, newest first, same as Ponto de Vista
const listQuery = gql`
	${caseFields}

	query GetClientes($limit: Int!) {
		clientes(
			first: $limit
			where: {
				status: PUBLISH
				orderby: {
					field: DATE
					order: DESC
				}
			}
		) {
			nodes {
				...CaseFields
			}
		}
	}
`

const singleQuery = gql`
	${caseFields}

	query GetClienteBySlug($slug: ID!) {
		cliente(id: $slug, idType: SLUG) {
			...CaseFields
		}
	}
`

// picks the media URL out of an ACF image or featured image edge
function mediaUrl(edge: MediaEdge) {
	return edge?.node?.mediaItemUrl ?? ''
}

// maps a WordPress node onto the shape the pages render
function mapCase(node: ClienteNode): Case {
	const fields = node.clienteFields

	return {
		id: node.databaseId,
		slug: node.slug,
		client: fields?.clientName ?? '',
		title: decodeEntities(node.title ?? ''),
		subtitle: fields?.subtitle ?? '',
		seoTitle: fields?.seoTitle ?? '',
		description: toPlainText(node.excerpt),
		tags: (node.tags?.nodes ?? []).map((tag) => decodeEntities(tag.name ?? '')).filter(Boolean),
		image: mediaUrl(node.featuredImage),
		logo: mediaUrl(fields?.logo ?? null),
		limao: toParagraphs(fields?.limao),
		corte: toParagraphs(fields?.corte),
		espremendo: toParagraphs(fields?.espremendo),
		blocks: (fields?.blocks ?? []).map((block) => ({
			image: mediaUrl(block.image),
			title: block.title ?? '',
			text: block.text ?? ''
		})),
		numbers: (fields?.numbers ?? []).map((item) => ({
			number: item.number ?? 0,
			text: item.text ?? '',
			hasPlus: item.hasPlus ?? false,
			decimals: item.decimals ?? undefined,
			suffix: item.suffix || undefined,
			display: item.display || undefined,
			rangeEnd: item.rangeEnd ?? undefined
		})),
		testimonials: (fields?.testimonials ?? []).map((item) => ({
			testimonial: item.testimonial ?? '',
			position: item.position ?? '',
			company: item.company ?? ''
		})),
		cta: fields?.cta ?? '',
		// ACF returns every subfield, empty ones included, so drop the blanks
		// and let the defaults fill in
		sectionTitles: Object.fromEntries(
			Object.entries(fields?.sectionTitles ?? {}).filter(([, value]) => value)
		) as CaseSectionTitles
	}
}

// WPGraphQL caps a single connection at 100 nodes. Past that the listing
// needs cursor pagination instead of one request.
const maxCases = 100

// fetch functions
// cache() keeps a single request per render pass, so a page and its
// generateMetadata do not hit WordPress twice
export const getCases = cache(async (limit: number = maxCases): Promise<Case[]> => {
	const data = await client.request<{ clientes: { nodes: ClienteNode[] } | null }>(listQuery, { limit })
	return (data.clientes?.nodes ?? []).map(mapCase)
})

export const getCase = cache(async (slug: string): Promise<Case | null> => {
	const data = await client.request<{ cliente: ClienteNode | null }>(singleQuery, { slug })
	return data.cliente ? mapCase(data.cliente) : null
})

// picks specific cases by slug, keeping the order they were asked for
export const getCasesBySlugs = cache(async (slugs: string[]): Promise<Case[]> => {
	const cases = await getCases()

	return slugs
		.map((slug) => cases.find((item) => item.slug === slug))
		.filter((item) => item !== undefined)
})
