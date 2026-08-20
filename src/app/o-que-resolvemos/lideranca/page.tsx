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
import banner from '@/assets/img/service-01.jpg'

// metadata
export const metadata: Metadata = {
	title: 'O que resolvemos: Liderança | Limonada',
	description: 'Não existe transformação consistente sem líderes capazes de inspirar, traduzir estratégia em prática, mobilizar pessoas e sustentar a evolução do negócio.',
	alternates: {
		canonical: '/o-que-resolvemos/lideranca'
	}
}

export default function Lideranca() {
	return (
		<main>

            <Banner
                title='Liderança que sustenta direção, desenvolvimento, decisão e resultado'
                subtitle='Não existe transformação consistente sem líderes capazes de inspirar, traduzir estratégia em prática, mobilizar pessoas e sustentar a evolução do negócio.'
                image={banner}
                imageAlt='Liderança'
                imageWidth={1539}
                imageHeight={1190}
            />

            <MakesSense
                items={[
                    'Liderança não está alinhada com a estratégia.',
                    'Mudanças são definidas, mas não refletem ação.',
                    'Cultura, execução e direção não caminham juntas.',
                    'O time entrega, mas não encontra segurança para performar melhor.'
                ]}
            />

            <LemonsTexts
                items={[
                    {
                        image: 'people',
                        title: 'Gestão e desenvolvimento de pessoas',
                        text: 'Desenvolvemos líderes que dão clareza, acompanham de perto e elevam o nível de entrega dos times.'
                    },
                    {
                        image: 'scale',
                        title: 'Autogestão e consistência de liderança',
                        text: 'Trabalhamos rituais, priorização e autodesenvolvimento para sustentar uma liderança humanizada e empática.'
                    },
                    {
                        image: 'message',
                        title: 'Comunicação estratégica e influência',
                        text: 'Fortalecemos a capacidade de mobilizar pessoas, sustentar posicionamentos e conduzir conversas que destravam decisões.'
                    },
                    {
                        image: 'compass',
                        title: 'Direcionamento estratégico e tomada de decisão',
                        text: 'Desenvolvemos líderes que estruturam melhor problemas, definem critérios claros e tomam decisões com impacto real no negócio.'
                    },
                    {
                        image: 'refresh',
                        title: 'Gestão de Mudança',
                        text: 'Preparamos líderes para conduzir transformações na prática, reduzindo resistências, engajando o time e sustentando novas formas de operar.'
                    },
                    {
                        image: 'eye',
                        title: 'Visão sistêmica e impacto organizacional',
                        text: 'Fortalecemos a capacidade de mobilizar pessoas, sustentar posicionamentos e conduzir conversas que destravam decisões.'
                    }
                ]}
            />

            <LemonLine className='mb-0!' />

            <LemonVideo />

            <RelatedCases slugs={['limonada-com-john-deere', 'limonada-com-stone']} />

            <ContactBlock text='O que mais desafia seu negócio hoje? Vamos desenhar a sua jornada com a Limonada.'/>

		</main>
	)
}
