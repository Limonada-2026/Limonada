/** @type {import('next-sitemap').IConfig} */

// asset routes that Next generates from src/app but that are not pages
const assets = ['/icon.svg', '/icon.png', '/apple-icon.png', '/favicon.ico', '/manifest.json']

const notIndexed = ['/404', '/500', '/contato/obrigado']

// listing pages read searchParams for pagination, so Next renders them on
// demand and next-sitemap never sees them in the build manifest
const onDemand = ['/clientes', '/ponto-de-vista']

export default {
	siteUrl: process.env.SITE_URL || 'https://alimonada.com.br',
	generateRobotsTxt: true,
	exclude: [...notIndexed, ...assets],
	additionalPaths: async (config) =>
		Promise.all(onDemand.map((path) => config.transform(config, path))),
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/',
				disallow: notIndexed
			}
		]
	}
}
