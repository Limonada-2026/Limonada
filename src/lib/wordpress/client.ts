// libraries
import { GraphQLClient } from 'graphql-request'

// constants
const endpoint = process.env.WP_GRAPHQL

if (!endpoint) {
	throw new Error('WP_GRAPHQL environment variable is not defined. Please add it to your .env.local file.')
}

// how long (in seconds) a WordPress response stays cached before Next revalidates it
export const revalidate = 60

// shared client for every WordPress query
export const client = new GraphQLClient(endpoint, {
	next: {
		revalidate
	}
})
