// libraries
import { Fragment } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import BannerTop from './BannerTop'
import FourBlocks from './FourBlocks'
import Numbers from './Numbers'
import Testimonials from './Testimonials'
import RelatedClients from './RelatedClients'
import ContactBlock from '@/components/ContactBlock'

// images
import image1 from '@/assets/img/clients-01.png'
import image2 from '@/assets/img/clients-02.png'
import image3 from '@/assets/img/clients-03.png'
import image4 from '@/assets/img/clients-04.png'

// temp db
import { cases, getCase, defaultSectionTitles } from '@/db/clientes'

// utils
import { pages } from '@/utils/routes'

// block illustrations, cycled in order
const blockImages = [image1, image2, image3, image4]

// types
type Params = Promise<{ postId: string }>

// renders each paragraph separated by a line break, keeping a single block of copy
function Paragraphs({ items }: { items: string[] }) {
	return (
		<>
			{items.map((text, i) => (
				<Fragment key={i}>
					{i > 0 && <><br /><br /></>}
					{text}
				</Fragment>
			))}
		</>
	)
}

// static routes
export function generateStaticParams() {
	return cases.map((item) => ({ postId: item.slug }))
}

// metadata
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {

	const { postId } = await params
	const item = getCase(postId)

	if (!item) return {}

	return {
		title: item.seoTitle || item.title,
		description: item.description,
		alternates: {
			canonical: `${pages.clientes}/${item.slug}`
		},
		openGraph: {
			type: 'article',
			title: item.seoTitle || item.title,
			description: item.description,
			url: `${pages.clientes}/${item.slug}`,
			images: [item.image]
		}
	}
}

export default async function ClientePost({ params }: { params: Params }) {

	const { postId } = await params
	const item = getCase(postId)

	if (!item) notFound()

	const titles = { ...defaultSectionTitles, ...item.sectionTitles }

	const related = cases
		.filter((c) => c.slug !== item.slug)
		.sort(() => Math.random() - 0.5)
		.slice(0, 3)

	return (
		<main>

			<BannerTop
				image={item.image}
				logo={item.logo}
				title={item.title}
				description={item.subtitle}
				tags={[item.tema, item.formato]}
			/>

			{item.limao.length > 0 && (
				<section className='relative z-2 bg-green-vivid section-padding rounded-bottom-corners -mt-4 sm:-mt-8 md:-mt-12'>
					<div className='base-container pt-4 sm:pt-8 md:pt-12'>
						<div className='row'>

							<div className='col-lg-6'>
								<AnimatedTitle
									style='green-black'
									className='title-96 mb-6'
								>
									{titles.limao}
								</AnimatedTitle>
							</div>

							<div className='col-lg-6 pt-1'>
								<p className='lg:text-lg'>
									<Paragraphs items={item.limao} />
								</p>
							</div>

						</div>
					</div>
				</section>
			)}

			{item.corte.length > 0 && (
				<section className='relative z-1 bg-green-dark section-padding rounded-bottom-corners -mt-4 sm:-mt-8 md:-mt-12'>
					<div className='base-container pt-4 sm:pt-8 md:pt-12'>
						<div className='row'>

							<div className='col-lg-6'>
								<AnimatedTitle
									style='green-green-vivid'
									className='title-96 mb-6'
								>
									{titles.corte}
								</AnimatedTitle>
							</div>

							<div className='col-lg-6 pt-1'>
								<p className='lg:text-lg text-green-vivid'>
									<Paragraphs items={item.corte} />
								</p>
							</div>

						</div>
					</div>
				</section>
			)}

			{item.espremendo.length > 0 && (
				<section className='relative z-0 bg-green-neon section-padding rounded-bottom-corners -mt-4 sm:-mt-8 md:-mt-12'>
					<div className='base-container pt-4 sm:pt-8 md:pt-12 pb-[18vw] sm:pb-[12vw] lg:pb-[8vw] xl:pb-[5vw]'>
						<div className='row'>

							<div className='col-lg-6'>
								<AnimatedTitle
									style='green-black'
									className='title-96 mb-6 xl:pr-10 text-balance hyphens-auto'
								>
									{titles.espremendo}
								</AnimatedTitle>
							</div>

							<div className='col-lg-6 pt-1'>
								<p className='lg:text-lg'>
									<Paragraphs items={item.espremendo} />
								</p>
							</div>

						</div>
					</div>
				</section>
			)}

			{item.blocks.length > 0 && (
				<FourBlocks
					items={item.blocks.map((block, i) => ({
						image: blockImages[i % blockImages.length].src,
						title: block.title,
						text: block.text
					}))}
				/>
			)}

			{item.numbers.length > 0 && (
				<Numbers title={titles.numbers} items={item.numbers} />
			)}

			{item.testimonials.length > 0 && (
				<Testimonials title={titles.testimonials} items={item.testimonials} />
			)}

			{related.length > 0 && (
				<section className='section-space'>
					<div className='base-container'>

						<h2 className='text-xl md:text-2xl font-semibold block mb-4 lg:mb-8'>
							<AnimatedText text='Descubra outros clientes' />
						</h2>

						<RelatedClients cases={related} />

					</div>
				</section>
			)}

			<ContactBlock text={item.cta} />

		</main>
	)
}
