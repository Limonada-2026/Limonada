// libraries
import { Metadata } from 'next'

// components
import Banner from '@/components/WhatWeSolve/Banner'
import MakesSense from '@/components/WhatWeSolve/MakesSense'
import LemonsTexts from '@/components/WhatWeSolve/LemonsTexts'
import LemonLine from '@/components/LemonLine'
import LemonVideo from '@/components/LemonVideo'
import RelatedCases from '@/components/WhatWeSolve/RelatedCases'
import ContactBlock from '@/components/ContactBlock'

// images
import banner from '@/assets/img/service-02.jpg'

// metadata
export const metadata: Metadata = {
	title: 'O que resolvemos: Soft Skills | Limonada',
	description: 'Não há forma mais consistente de transformar organizações senão começar pelas pessoas - desenvolvendo como elas pensam, decidem e agem no dia a dia.',
	alternates: {
		canonical: '/o-que-resolvemos/soft-skills'
	}
}

export default function SoftSkills() {
	return (
		<main>

            <Banner
                title='Soft skills para equipes e líderes'
                subtitle='Não há forma mais consistente de transformar organizações senão começar pelas pessoas - desenvolvendo como elas pensam, decidem e agem no dia a dia.'
                image={banner}
                imageAlt='Soft Skills'
                imageWidth={1733}
                imageHeight={967}
            />

            <MakesSense
                items={[
                    'As pessoas entregam individualmente, mas não há conexão e colaboração.',
                    'Conversas difíceis não acontecem.',
                    'As equipes não acompanham a velocidade que o negócio pede.',
                    'As decisões avançam, mas nem sempre na mesma direção.'
                ]}
            />

            <LemonsTexts
                items={[
                    {
                        image: 'message',
                        title: 'Comunicação e Influência',
                        text: 'Trabalhamos comunicação com empatia, assertividade e conversas difíceis.'
                    },
                    {
                        image: 'brain',
                        title: 'Inteligência Emocional',
                        text: 'Desenvolvemos a capacidade de reconhecer e lidar com emoções no momento em que elas impactam decisões, relações e desempenho.'
                    },
                    {
                        image: 'scale',
                        title: 'Produtividade e Autogestão',
                        text: 'Como gerir entregáveis com priorização, planejamento e consistência.'
                    },
                    {
                        image: 'direction',
                        title: 'Pensamento crítico e Tomada de decisão',
                        text: 'Fortalecemos o pensamento crítico para melhorar a qualidade das decisões.'
                    },
                    {
                        image: 'flag',
                        title: 'Protagonismo e Responsabilidade',
                        text: 'Desenvolvemos a capacidade de assumir responsabilidade real sobre decisões, entregas e evolução.'
                    },
                    {
                        image: 'rope',
                        title: 'Adaptabilidade e Resiliência',
                        text: 'Preparamos profissionais para lidar com pressão, mudança e incerteza sem perder consistência.'
                    },
                    {
                        image: 'handshake',
                        title: 'Influência e Negociação',
                        text: 'Fortalecemos a capacidade de negociar e influenciar sem impor, construindo acordos que sustentam relações e resultados.'
                    },
                    {
                        image: 'eye',
                        title: 'Visão Sistêmica',
                        text: 'Ampliamos a capacidade de enxergar como decisões em uma área afetam o todo, conectando pessoas, processos e negócio.'
                    }
                ]}
            />

            <LemonLine className='mb-0!' />

            <LemonVideo />

            <RelatedCases slugs={['limonada-com-boticario', 'limonada-com-semantix']} />

            <ContactBlock text='O que mais desafia seu negócio hoje? Vamos desenhar a sua jornada com a Limonada.'/>

		</main>
	)
}
