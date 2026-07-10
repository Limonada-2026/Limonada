// libraries
import { Metadata } from 'next'

// temp db
import { posts } from '@/temp-db/ponto-de-vista'

// components
import Posts from './Posts'

// metadata
export const metadata: Metadata = {
	title: 'Ponto de Vista',
	description: 'Ponto de Vista',
}

export default function PontoDeVista() {
	return (
		<main>

            <div className='bg-green-dark w-full block h-40 -mt-40' />

            <section className='py-12 md:py-[10vw] bg-green-dark rounded-bottom-corners'>
				<div className='base-container'>

					<h1 className='title-96 text-white md:text-center'>
						Ponto de Vista
					</h1>

					<h2 className='md:text-lg text-white md:text-center md:max-w-180 md:mx-auto mt-4 md:mt-6'>
                        Aqui, reunimos nossa perspecitiva sobre desenvolvimento de times e lideranças, as transformações no mundo dos negócios e o futuro do trabalho.
					</h2>

				</div>
			</section>

            <section className='mb-20 md:mb-[10vw] mt-12 md:mt-[6vw]'>
                <div className='base-container'>
                    <Posts posts={posts} />
                </div>
            </section>

        </main>
	)
}