// libraries
import { cache } from 'react'
import { gql } from 'graphql-request'

// client
import { client } from './client'

// utils
import { decodeEntities, toPlainText, toDateOnly } from './utils'

// types
export type Post = {
	id: number
	slug: string
	title: string
	seoTitle: string
	description: string
	intro: string
	image: string
	date: string
	readingTime: string
	author: string
	tags: string[]
	content: string
}

type PontoDeVistaNode = {
	databaseId: number
	slug: string
	title: string
	date: string
	excerpt: string | null
	content: string | null
	author: {
		node: {
			name: string | null
		} | null
	} | null
	featuredImage: {
		node: {
			mediaItemUrl: string | null
			altText: string | null
		} | null
	} | null
	tags: {
		nodes: {
			name: string | null
		}[]
	} | null
	pontoDeVistaFields: {
		subtitle: string | null
		readingTime: number | null
		seoTitle: string | null
	} | null
}

// every field the site needs from a Ponto de Vista entry
const postFields = gql`
	fragment PostFields on PontoDeVista {
		databaseId
		slug
		title
		date
		excerpt
		content
		author {
			node {
				name
			}
		}
		featuredImage {
			node {
				mediaItemUrl
				altText
			}
		}
		tags {
			nodes {
				name
			}
		}
		pontoDeVistaFields {
			subtitle
			readingTime
			seoTitle
		}
	}
`

// graphql queries
const listQuery = gql`
	${postFields}

	query GetPontoDeVista($limit: Int!) {
		pontosDeVista(
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
				...PostFields
			}
		}
	}
`

const singleQuery = gql`
	${postFields}

	query GetPontoDeVistaBySlug($slug: ID!) {
		pontoDeVista(id: $slug, idType: SLUG) {
			...PostFields
		}
	}
`

// maps a WordPress node onto the shape the pages render
function mapPost(node: PontoDeVistaNode): Post {
	return {
		id: node.databaseId,
		slug: node.slug,
		title: decodeEntities(node.title ?? ''),
		seoTitle: node.pontoDeVistaFields?.seoTitle ?? '',
		description: toPlainText(node.excerpt),
		intro: node.pontoDeVistaFields?.subtitle ?? '',
		image: node.featuredImage?.node?.mediaItemUrl ?? '',
		date: toDateOnly(node.date),
		readingTime: node.pontoDeVistaFields?.readingTime != null ? String(node.pontoDeVistaFields.readingTime) : '',
		author: decodeEntities(node.author?.node?.name ?? ''),
		tags: (node.tags?.nodes ?? []).map((tag) => decodeEntities(tag.name ?? '')).filter(Boolean),
		content: node.content ?? ''
	}
}

// WPGraphQL caps a single connection at 100 nodes. Past that the listing
// needs cursor pagination instead of one request.
const maxPosts = 100

// fetch functions
// cache() keeps a single request per render pass, so a page and its
// generateMetadata do not hit WordPress twice
export const getPosts = cache(async (limit: number = maxPosts): Promise<Post[]> => {
	const data = await client.request<{ pontosDeVista: { nodes: PontoDeVistaNode[] } | null }>(listQuery, { limit })
	return (data.pontosDeVista?.nodes ?? []).map(mapPost)
})

export const getPost = cache(async (slug: string): Promise<Post | null> => {
	const data = await client.request<{ pontoDeVista: PontoDeVistaNode | null }>(singleQuery, { slug })
	return data.pontoDeVista ? mapPost(data.pontoDeVista) : null
})
