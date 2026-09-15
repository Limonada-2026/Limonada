// libraries
import { Metadata } from 'next'
import Image from 'next/image'

// components
import ContactBlock from '@/components/ContactBlock'
import Cases from './Cases'

// image
import lemonade from '@/assets/img/lemonade.png'

// wordpress
import { getCases } from '@/lib/wordpress/getCases'

// utils
import { pageMetadata } from '@/utils/seo'

// how many cases per page
const howMany = 12

// types
type SearchParams = Promise<{ page?: string }>

// metadata
export const metadata: Metadata = pageMetadata({
	title: 'Clientes | Limonada',
	description: 'Descubra como empresas parceiras estão transformando comportamento e resultados com a Limonada.',
	path: '/clientes'
})

export default async function Clientes({ searchParams }: { searchParams: SearchParams }) {

	const { page } = await searchParams

	const initialPage = Number(page) || 1

	const cases = await getCases()

	return (
		<main>

            <section className='menu-space bg-green-dark rounded-bottom-corners'>

				<div className='base-container py-12 md:py-[10vw]'>

					<h1 className='title-96 text-white md:text-center max-w-300 mx-auto'>
						Os melhores profissionais do mercado sabem fazer Limonada.
					</h1>

					<h2 className='md:text-lg text-white md:text-center md:max-w-180 md:mx-auto mt-4 md:mt-6'>
						Descubra como empresas parceiras estão transformando comportamento e resultados com a Limonada.
					</h2>

				</div>

				<Image
					src={lemonade}
					alt='Lemonade'
					width={901}
					height={788}
					priority
					className='absolute z-2 -bottom-8 2xl:-right-30 w-auto h-[calc(100%-8rem)] 2xl:left-auto left-[75%] max-xl:hidden'
				/>

			</section>

            <section className='mb-20 md:mb-[10vw] mt-12 md:mt-[6vw]'>
                <div className='base-container'>

                    <Cases
                        cases={cases}
                        perPage={howMany}
                        initialPage={initialPage}
                    />

                </div>
            </section>

			<ContactBlock />

        </main>
	)
}
