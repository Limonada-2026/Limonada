/** @type {import('next').NextConfig} */

const nextConfig = {
	turbopack: {},
	reactStrictMode: false,
	webpack(config) {
		const fileLoaderRule = config.module.rules.find((rule) =>
		  	rule.test?.test?.('.svg')
		)

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
				use: [{
					loader: '@svgr/webpack',
					options: {
						svgoConfig: {
							plugins: [{
								name: 'preset-default',
								params: {
									overrides: {
										removeViewBox: false
									}
								}
							}]
						}
					}
				}]
			}
		)

		fileLoaderRule.exclude = /\.svg$/i
	
		return config
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'wp.alimonada.com.br'
			},
			{
				protocol: 'http',
				hostname: 'limonada.local'
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '10008'
			}
		],
		// client logos are SVG files served from WordPress
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		qualities: [75, 90, 100]
	},
	async redirects() {
		return [
			// old WP page slugs -> new site equivalents
			{ source: '/a-limonada', destination: '/quem-somos', permanent: true },
			{ source: '/metodologia', destination: '/metodo-limao', permanent: true },
			{ source: '/consultoria', destination: '/metodo-limao', permanent: true },
			{ source: '/lideranca', destination: '/o-que-resolvemos/lideranca', permanent: true },
			{ source: '/lideranca-limonada', destination: '/o-que-resolvemos/lideranca', permanent: true },
			{ source: '/inovacao', destination: '/o-que-resolvemos/inovacao', permanent: true },
			{ source: '/soft-skills-limonada', destination: '/o-que-resolvemos/soft-skills', permanent: true },
			{ source: '/soft-skills-comunicacao-e-oratoria', destination: '/o-que-resolvemos/soft-skills', permanent: true },
			{ source: '/soft-skills-inteligencia-emocional', destination: '/o-que-resolvemos/soft-skills', permanent: true },
			{ source: '/soft-skills-produtividade', destination: '/o-que-resolvemos/soft-skills', permanent: true },
			{ source: '/soft-skills-vendas-e-negociacao', destination: '/o-que-resolvemos/soft-skills', permanent: true },

			// old blog index
			{ source: '/blog', destination: '/ponto-de-vista', permanent: true },

			// old posts that have a matching article in the new static ponto-de-vista db
			// (matched by title/content, since WP slugs don't line up 1:1)
			{ source: '/lideres-orientados-ao-proposito', destination: '/ponto-de-vista/lideres-orientados-ao-proposito', permanent: true },
			{ source: '/seguranca-psicologica', destination: '/ponto-de-vista/seguranca-psicologica', permanent: true },
			{ source: '/a-forte-relacao-entre-o-indice-de-turn-over-e-a-cultura-de-inovacao', destination: '/ponto-de-vista/turn-over-e-cultura-de-inovacao', permanent: true },
			{ source: '/o-sistema-imunologico-dos-lideres-sem-proposito', destination: '/ponto-de-vista/sistema-imunologico-dos-lideres-sem-proposito', permanent: true },
			{ source: '/ambidestra', destination: '/ponto-de-vista/ambidestria', permanent: true },

			// old posts with no equivalent in the new site yet -> section index
			{ source: '/os-pilares-de-uma-lideranca-estrategica-humanizada-e-potente', destination: '/ponto-de-vista', permanent: true },
			{ source: '/o-silencio-da-lideranca', destination: '/ponto-de-vista', permanent: true },
			{ source: '/a-limonada-chega-como-um-hub-de-solucoes-corporativa', destination: '/ponto-de-vista', permanent: true },
			{ source: '/a-organizacao-camaleao-criando-empresas-adaptaveis', destination: '/ponto-de-vista', permanent: true },

			// retired WP archive/system paths -> nearest equivalent
			{ source: '/category/:slug*', destination: '/ponto-de-vista', permanent: true },
			{ source: '/tag/:slug*', destination: '/ponto-de-vista', permanent: true },
			{ source: '/author/:slug*', destination: '/ponto-de-vista', permanent: true },

			// retired content, no longer carried over (lim_educadores CPT, permalinked under /jobs/)
			{ source: '/jobs/:slug*', destination: '/', permanent: true },
			{ source: '/pagina-exemplo', destination: '/', permanent: true },
			{ source: '/home-velha', destination: '/', permanent: true }
		]
	}
}

export default nextConfig