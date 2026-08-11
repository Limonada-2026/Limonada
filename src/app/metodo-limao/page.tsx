// libraries
import { Metadata } from 'next'

// components
import BannerTop from './BannerTop'
import ClientsCases from '@/components/ClientsCases'
import ContactBlock from '@/components/ContactBlock'

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

            <ClientsCases
                cases={featuredCases}
                howMany={3}
            />

            <ContactBlock text='Transforme seus limões em limonada' />

        </main>
    )
}