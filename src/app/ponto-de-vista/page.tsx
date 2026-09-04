// libraries
import { Metadata } from 'next'
import Image from 'next/image'

// image
import lemonTree from '@/assets/img/lemon-tree.png'

// utils
import { pageMetadata } from '@/utils/seo'

// temp db
import { posts } from '@/db/ponto-de-vista'

// components
import Posts from './Posts'

// how many posts per page
const howMany = 12

// types
type SearchParams = Promise<{ page?: string }>

// metadata
export const metadata: Metadata = pageMetadata({
	title: 'Ponto de Vista | Limonada',
	description: 'Nossa perspectiva sobre desenvolvimento de times e lideranças, as transformações no mundo dos negócios e o futuro do trabalho.',
	path: '/ponto-de-vista'
})

export default async function PontoDeVista({ searchParams }: { searchParams: SearchParams }) {

	const { page } = await searchParams

	const initialPage = Number(page) || 1

	return (
		<main>

            <section className='menu-space bg-green-dark rounded-bottom-corners'>

				<div className='base-container py-12 md:py-[10vw]'>

					<h1 className='title-96 text-white md:text-center'>
						Ponto de Vista
					</h1>

					<h2 className='md:text-lg xl:text-xl text-white md:text-center md:max-w-180 md:mx-auto mt-4 md:mt-6'>
                        Aqui, reunimos nossa perspectiva sobre desenvolvimento de times e lideranças, as transformações no mundo dos negócios e o futuro do trabalho.
					</h2>

				</div>

				<Image
					src={lemonTree}
					alt='Lemon Tree'
					width={1079}
					height={1092}
					priority
					className='absolute z-2 -bottom-14 2xl:-right-16 w-auto h-[calc(100%-3rem)] 2xl:left-auto left-[75%] max-xl:hidden'
				/>

			</section>

            <section className='mb-20 md:mb-[10vw] mt-12 md:mt-[6vw]'>
                <div className='base-container'>
                    <Posts
                        posts={posts}
                        perPage={howMany}
                        initialPage={initialPage}
                    />
                </div>
            </section>

        </main>
	)
}