// libraries
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import RelatedPosts from './RelatedPosts'

// icons
import { Clock } from '@/components/Svg/Icons'

// db
import { posts, getPost } from '@/db/ponto-de-vista'

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
						<div className='col-lg-10 col-xl-8'>

							<h1 className='text-2xl md:text-3xl xl:text-4xl font-semibold block mb-4 text-green-medium'>
								<AnimatedText text={post.title} />
							</h1>

							<div className='flex flex-wrap gap-x-4 gap-y-1 items-center text-sm mb-6 lg:mb-10'>

								<span>
									Por {post.author}
								</span>

								<span className='flex gap-2 items-center'>
									<Clock className='w-4 h-4' />
									{post.readingTime} min de leitura
								</span>

							</div>

							<div
								className='rich-text'
								dangerouslySetInnerHTML={{ __html: post.content }}
							/>

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
