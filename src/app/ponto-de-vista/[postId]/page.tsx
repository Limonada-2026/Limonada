// libraries
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Link } from 'next-transition-router'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import RelatedPosts from './RelatedPosts'

// icons
import { Clock, Facebook, X, Linkedin, Whatsapp } from '@/components/Svg/Icons'

// utils
import { pages } from '@/utils/routes'
import { formatDateLongPtBR, getShareLinks } from '@/utils/functions'

// db
import { posts, getPost } from '@/db/ponto-de-vista'

const shareIcons = {
	facebook: Facebook,
	x: X,
	linkedin: Linkedin,
	whatsapp: Whatsapp
} as const

// types
type Params = Promise<{ postId: string }>

// static routes
export function generateStaticParams() {
	return posts.map((post) => ({ postId: post.slug }))
}

// metadata
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {

	const { postId } = await params
	const post = getPost(postId)

	if (!post) return {}

	return {
		title: post.seoTitle || post.title,
		description: post.description,
		alternates: {
			canonical: `/ponto-de-vista/${post.slug}`
		},
		openGraph: {
			type: 'article',
			title: post.seoTitle || post.title,
			description: post.description,
			url: `/ponto-de-vista/${post.slug}`,
			images: [post.image]
		}
	}
}

export default async function PontoDeVistaPost({ params }: { params: Params }) {

	const { postId } = await params
	const post = getPost(postId)

	if (!post) notFound()

	const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3)
	const shareUrl = `https://alimonada.com.br/ponto-de-vista/${post.slug}`
	const shareLinks = getShareLinks(shareUrl, post.title)

	return (
		<main>

			<section className='menu-space bg-green-dark rounded-bottom-corners relative overflow-hidden'>
				<div className='h-[40vh] md:h-[50vh] lg:h-[60vh]'>
					<ScrollingImage>
						<Image
							src={post.image}
							alt={post.title}
							priority
							fill
							sizes='100vw'
							className='object-cover'
						/>
					</ScrollingImage>
				</div>
			</section>

			<section className='my-10 lg:my-[5vw]'>
				<div className='base-container'>
					<div className='row'>
						<div className='col-lg-10 col-xl-8 col-xl-push-1'>

							<span className='inline-block border border-green-medium/70 text-green-medium text-xs py-2 px-4 rounded-sm mb-4'>
								{formatDateLongPtBR(post.date)}
							</span>

							<h1 className='block mb-4 text-green-medium text-6xl sm:text-7xl lg:text-8xl leading-[.9] font-bold font-heading uppercase'>
								<AnimatedText text={post.title} />
							</h1>

							<h2 className='lg:text-lg italic block mb-4 lg:mb-8'>
								{post.intro}
							</h2>

							<div className='flex flex-wrap gap-x-4 gap-y-1 items-center text-sm mb-10 lg:mb-18 pb-6 lg:pb-10 border-b border-b-gray-300'>

								<div className='flex flex-wrap items-center gap-x-6'>

									<span className='flex gap-2 items-center bg-green-medium p-2 rounded-md text-white text-xs'>
										<Clock className='w-3 h-3' />
										{post.readingTime} min de leitura
									</span>

									<span>
										Por {post.author}
									</span>

								</div>

							</div>

							<div
								className='rich-text first-of-type:first-letter:text-red-500!'
								dangerouslySetInnerHTML={{ __html: post.content }}
							/>

							<div className='flex flex-wrap gap-x-6 gap-y-4 items-center justify-between text-sm mt-6 lg:mt-10 pt-6 lg:pt-10 border-t border-t-gray-300'>

								<Link
									href={pages.ponto_de_vista}
									className='hover-underline text-green-medium font-bold'
								>
									Ver todos os posts
								</Link>

								<div className='flex items-center gap-4'>

									<span className='text-gray-medium'>
										Compartilhar
									</span>

									<ul className='flex items-center gap-3'>
										{shareLinks.map((item) => {
											const Icon = shareIcons[item.platform]

											return (
												<li key={item.label}>
													<a
														href={item.href}
														target='_blank'
														rel='noopener noreferrer'
														aria-label={`Compartilhar no ${item.label}`}
														className='flex size-5 items-center justify-center text-green-medium hover:text-green-dark transition-colors'
													>
														<Icon className='block size-full' />
													</a>
												</li>
											)
										})}
									</ul>

								</div>

							</div>

						</div>
					</div>
				</div>
			</section>

			<section className='section-space'>
				<div className='base-container'>

					<h2 className='text-xl md:text-2xl font-semibold block mb-4 lg:mb-8'>
						<AnimatedText text='Veja outros pontos de vista:' />
					</h2>

					<RelatedPosts posts={related} />

				</div>
			</section>

		</main>
	)
}
