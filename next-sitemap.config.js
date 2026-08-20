/** @type {import('next-sitemap').IConfig} */

export default {
	siteUrl: process.env.SITE_URL || 'https://alimonada.com.br',
	generateRobotsTxt: true,
	exclude: ['/404', '/500', '/contato/obrigado'],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/404', '/500', '/contato/obrigado']
			}
		]
	}
}