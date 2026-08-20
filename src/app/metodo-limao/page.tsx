// libraries
import { Metadata } from 'next'

// components
import BannerTop from './BannerTop'
import Tabs from './Tabs'
import PinLemon from './PinLemon'
import ClientsCases from '@/components/ClientsCases'
import ContactBlock from '@/components/ContactBlock'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'

// images
import banner from '@/assets/img/lemons-bg-2.jpg'

// db
import { cases as allCases } from '@/db/clientes'

const featuredCases = [
	'limonada-com-stone',
	'limonada-com-sakura',
    'limonada-com-neoenergia'
]
	.map((slug) => allCases.find((item) => item.slug === slug))
	.filter((item) => item !== undefined)

// metadata
export const metadata: Metadata = {
	title: 'Método Limão | Limonada',
	description: 'Sabemos que conduzir a transformação pode ser azedo e desafiador.',
	alternates: {
		canonical: '/metodo-limao'
	}
}

export default function MetodoLimao() {
    return (
        <main>
            
            <BannerTop
                image={banner.src}
                title='Sabemos que conduzir a transformação pode ser azedo e desafiador.'
                description='E não existe receita pronta. Quando começamos pelas perguntas certas, desenhamos um caminho único para transformar desafios em decisões e ações que geram resultado. É isso que o Método Limão faz.'
            />

            <section className='section-space-half'>
                <div className='base-container'>
                    <div className='flex flex-col gap-4 md:items-center md:justify-center md:text-center'>

                        <h2 className='text-2xl lg:text-3xl xl:text-4xl font-semibold'>
                            <AnimatedText text='As 5 etapas do Método Limão:' />
                        </h2>

                        <p className='md:max-w-md md:mx-auto pb-14 lg:text-lg'>
                            Da primeira conversa à análise de impacto, é assim que cocriamos jornadas de aprendizagem.
                        </p>

                    </div>
                </div>
            </section>

            <Tabs />

            <PinLemon />

            <ClientsCases
                cases={featuredCases}
                howMany={3}
            />

            <ContactBlock text='Transforme seus limões em limonada' />

        </main>
    )
}