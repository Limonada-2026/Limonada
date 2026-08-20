// libraries
import type { Metadata } from 'next'
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'
import clsx from 'clsx'
import type { Viewport } from 'next'

// components
import Menu from '@/components/Menu'
import SmoothScroller from '@/components/Utils/SmoothScroller'
import Guidelines from '@/components/Utils/Guidelines'
import Footer from '@/components/Footer'
import PreloadLemonImages from '@/components/Utils/Animations/PreloadLemonImages'
import ViewportHeight from '@/components/Utils/ViewportHeight'

// css
import '@/assets/css/global.css'

// metadata
export const metadata: Metadata = {
	metadataBase: new URL(`https://alimonada.com.br`),
	alternates: {
        canonical: './',
    },
	title: 'Limonada',
	description: 'Boutique de desenvolvimento para pessoas e negócios. Trabalhamos a partir do contexto de cada empresa para transformar desafios em decisões e ações que movem pessoas, culturas e negócios.',
	icons: {
		icon: [
			{ url: '/icon.svg', type: 'image/svg+xml' },
			{ url: '/icon.png', type: 'image/png', sizes: '32x32' },
			{ url: '/icon.png', type: 'image/png', sizes: '96x96' },
			{ url: '/favicon.ico', sizes: 'any' }
		],
		apple: [
			{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
		]
	},
	manifest: '/manifest.json',
	openGraph: {
		title: 'Limonada',
		description: 'Boutique de desenvolvimento para pessoas e negócios. Trabalhamos a partir do contexto de cada empresa para transformar desafios em decisões e ações que movem pessoas, culturas e negócios.',
		url: 'https://alimonada.com.br',
		siteName: 'Limonada',
		images: [
			{
				url: 'https://alimonada.com.br/img/og-image.png',
				width: 1280,
				height: 630,
				alt: 'Limonada'
			}
		],
		locale: 'pt_BR',
		type: 'website'
	}
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: '#0F2D1E'
}

import localFont from 'next/font/local'

const networkFree = localFont({
	src: '../assets/fonts/NetworkFreeVersion.woff2',
	variable: '--font-network-free',
	display: 'swap'
})

const publicSans = localFont({
	src: [
		{
			path: '../assets/fonts/PublicSans-Regular.woff2',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../assets/fonts/PublicSans-SemiBold.woff2',
			weight: '600',
			style: 'normal'
		},
		{
			path: '../assets/fonts/PublicSans-Bold.woff2',
			weight: '700',
			style: 'normal'
		}
	],
	variable: '--font-public-sans',
	display: 'swap'
})

interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({
	children
}:RootLayoutProps ) {

	// schema
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "Limonada",
		"legalName": "Limonada",
		"url": "https://alimonada.com.br",
		"logo": "https://alimonada.com.br/img/og-image.jpg",
		"description": "Boutique de desenvolvimento para pessoas e negócios. Trabalhamos a partir do contexto de cada empresa para transformar desafios em decisões e ações que movem pessoas, culturas e negócios.",
		"address": {
			"@type": "PostalAddress",
			"streetAddress": "Rua José Casemiro Stenzowski, 21D",
			"addressLocality": "Novo Mundo, Curitiba",
			"addressRegion": "PR",
			"postalCode": "81010-370",
			"addressCountry": "BR"
		},
		"contactPoint": [
			{
				"@type": "ContactPoint",
				"email": "contato@alimonada.com.br",
				"contactType": "customer support"
			}
		],
		"email": "contato@alimonada.com.br",
		"sameAs": [
			"https://instagram.com/limonadahub/",
			"https://linkedin.com/company/limonadahub/",
			"https://www.youtube.com/@limonadahub"
		],
		"keywords": [
			"Consultoria",
			"Desenvolvimento",
			"Liderança",
			"Equipes",
			"Negócios"
		]
	}

	return (
		<html
			lang='pt-BR'
			className={clsx(publicSans.variable, networkFree.variable)}
			data-scroll-behavior='smooth'
		>

			<head>

				<meta
					name='apple-mobile-web-app-title'
					content='Limonada'
				/>

				<link rel='preconnect' href='https://use.typekit.net' />
				<link rel='stylesheet' href='https://use.typekit.net/dnh8ags.css' />

				<link
					rel='icon'
					type='image/svg+xml'
					href='/icon.svg'
				/>

				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/icon.png'
				/>

				<link
					rel='icon'
					type='image/png'
					sizes='96x96'
					href='/icon.png'
				/>

				<link
					rel='shortcut icon'
					href='/favicon.ico'
				/>

				<link
					rel='apple-touch-icon'
					href='/apple-icon.png'
					sizes='180x180'
				/>

				<link
					rel='manifest'
					href='/manifest.json'
				/>

				<Script
					id='jsonld'
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>

				<GoogleTagManager gtmId='GTM-5576XMPR' />

			</head>

			<body id='start'>

				<noscript>
					<iframe
						src='https://www.googletagmanager.com/ns.html?id=GTM-5576XMPR'
						height='0'
						width='0'
						style={{ display: 'none', visibility: 'hidden' }}
					/>
				</noscript>

				<div id='portal'></div>

				<ViewportHeight />
				<PreloadLemonImages />

				<Menu />

				<SmoothScroller>

					{children}

					<Footer />

				</SmoothScroller>

				{ process.env.NODE_ENV === 'development' && <Guidelines /> }

			</body>

		</html>
	)
}

