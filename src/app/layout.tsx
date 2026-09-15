// libraries
import type { Metadata } from 'next'
import { GoogleTagManager } from '@next/third-parties/google'
import clsx from 'clsx'
import type { Viewport } from 'next'

// components
import Menu from '@/components/Menu'
import SmoothScroller from '@/components/Utils/SmoothScroller'
import Guidelines from '@/components/Utils/Guidelines'
import Footer from '@/components/Footer'
import PreloadLemonImages from '@/components/Utils/Animations/PreloadLemonImages'
import ViewportHeight from '@/components/Utils/ViewportHeight'
import GtmPageView from '@/components/Utils/GtmPageView'
import GtmScrollDepth from '@/components/Utils/GtmScrollDepth'
import GtmUtmCapture from '@/components/Utils/GtmUtmCapture'
import JsonLd from '@/components/Utils/JsonLd'

// utils
import { siteUrl, siteName, siteDescription, defaultOgImage, organizationSchema, websiteSchema } from '@/utils/seo'
import { social } from '@/utils/routes'

// css
import '@/assets/css/global.css'

// metadata
export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	alternates: {
		canonical: './',
	},
	title: siteName,
	description: siteDescription,
	applicationName: siteName,
	publisher: siteName,
	// favicon.ico, icon0.svg, icon1.png, apple-icon.png and manifest.json in src/app
	// are picked up by Next's file conventions, which write the <link> tags. the
	// icons are numbered because two files both named "icon" only emit one tag
	other: {
		'apple-mobile-web-app-title': siteName
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1
		}
	},
	openGraph: {
		title: siteName,
		description: siteDescription,
		url: siteUrl,
		siteName,
		images: [
			{
				url: defaultOgImage.url,
				width: defaultOgImage.width,
				height: defaultOgImage.height,
				alt: siteName
			}
		],
		locale: 'pt_BR',
		type: 'website'
	},
	twitter: {
		card: 'summary_large_image',
		title: siteName,
		description: siteDescription,
		images: [defaultOgImage.url]
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
		'@context': 'https://schema.org',
		'@graph': [
			organizationSchema({ sameAs: Object.values(social) }),
			websiteSchema()
		]
	}

	return (
		<html
			lang='pt-BR'
			className={clsx(publicSans.variable, networkFree.variable)}
			data-scroll-behavior='smooth'
		>

			<head>

				<link rel='preconnect' href='https://use.typekit.net' />
				<link rel='stylesheet' href='https://use.typekit.net/dnh8ags.css' />

				<JsonLd data={jsonLd} />

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
				<GtmPageView />
				<GtmScrollDepth />
				<GtmUtmCapture />

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

