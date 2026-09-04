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

// utils
import { pageMetadata } from '@/utils/seo'

// images
import banner from '@/assets/img/service-04.jpg'

// metadata
export const metadata: Metadata = pageMetadata({
	title: 'O que resolvemos: Estratégia | Limonada',
	description: 'Não existe avanço consistente sem clareza sobre prioridades, critérios de decisão e capacidade de sustentar escolhas ao longo do tempo.',
	path: '/o-que-resolvemos/estrategia',
	image: banner.src,
	imageWidth: banner.width,
	imageHeight: banner.height
})

export default function Estrategia() {
	return (
		<main>

            <Banner
                title='Estratégia com clareza para escolher e consistência para avançar'
                subtitle='Não existe avanço consistente sem clareza sobre prioridades, critérios de decisão e capacidade de sustentar escolhas ao longo do tempo.'
                image={banner}
                imageAlt='Estratégia'
                imageWidth={1885}
                imageHeight={1167}
            />

            <MakesSense
                items={[
                    'A estratégia é definida, mas não executada.',
                    'As decisões estão desalinhadas dos objetivos.',
                    'Liderança e time operam em ritmos diferentes.',
                    'Resultados são cobrados, mas não há rotina de acompanhamento.'
                ]}
            />

            <LemonsTexts
                items={[
                    {
                        image: 'lighthouse',
                        title: 'Clareza estratégica e direcionamento',
                        text: 'Construímos direcionamento claro para orientar decisões, alinhar lideranças e dar foco ao que realmente importa.'
                    },
                    {
                        image: 'target',
                        title: 'Foco estratégico e prioridades',
                        text: 'Ajudamos a transformar intenção em prioridade real, estruturando critérios para escolha e alocação de energia no que gera impacto.'
                    },
                    {
                        image: 'binocular',
                        title: 'Horizontes estratégicos e ambidestria',
                        text: 'Trabalhamos o equilíbrio entre curto e longo prazo, conectando decisões do presente com oportunidades futuras.'
                    },
                    {
                        image: 'map',
                        title: 'Construção do mapa estratégico',
                        text: 'Traduzimos a estratégia em objetivos, iniciativas e responsabilidades claras para garantir coerência na execução.'
                    },
                    {
                        image: 'traffic-light',
                        title: 'Tomada de decisão e alinhamento da liderança',
                        text: 'Fortalecemos a capacidade de decidir com clareza, assumir renúncias e alinhar lideranças que sustentam escolhas ao longo do tempo.'
                    },
                    {
                        image: 'pin',
                        title: 'Execução acompanhada e disciplina estratégica',
                        text: 'Estruturamos rituais e acompanhamentos que mantêm a estratégia ativa e garantem avanço consistente, mesmo diante das mudanças.'
                    }
                ]}
            />

            <LemonLine className='mb-0!' />

            <LemonVideo />

            <RelatedCases slugs={['limonada-com-sakura', 'limonada-com-oxford']} />

            <ContactBlock text='O que mais desafia seu negócio hoje? Vamos desenhar a sua jornada com a Limonada.'/>

		</main>
	)
}
