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
import banner from '@/assets/img/service-03.jpg'

// metadata
export const metadata: Metadata = {
	title: 'O que resolvemos: Inovação | Limonada',
	description: 'O grande desafio da inovação está na capacidade de executar. Priorizar, testar e sustentar decisões sobre o que funciona é o que transforma inovação em resultado.',
	alternates: {
		canonical: '/o-que-resolvemos/inovacao'
	}
}

export default function Inovacao() {
	return (
		<main>

            <Banner
                title='Inovação com foco em execução e resultado'
                subtitle='O grande desafio da inovação está na capacidade de executar. Priorizar, testar e sustentar decisões sobre o que funciona é o que transforma inovação em resultado.'
                image={banner}
                imageAlt='Inovação'
                imageWidth={1655}
                imageHeight={1030}
            />

            <MakesSense
                items={[
                    'Ideias surgem, mas não saem do papel.',
                    'A inovação acontece isoladamente e não faz parte da cultura.',
                    'O erro trava a experimentação.',
                    'Existe intenção de inovar, mas não há espaço na rotina para isso acontecer.'
                ]}
            />

            <LemonsTexts
                items={[
                    {
                        image: 'compass',
                        title: 'Estratégia, cultura e direção para inovação',
                        text: 'Conectamos estratégia, cultura e ambição de crescimento para definir onde inovar e orientar decisões com clareza.'
                    },
                    {
                        image: 'brain',
                        title: 'Pensamento sistêmico',
                        text: 'Desenvolvemos a capacidade de ler o contexto, interpretar sinais e tomar decisões considerando impactos no todo.'
                    },
                    {
                        image: 'magnifier',
                        title: 'Exploração de problemas e oportunidades',
                        text: 'Aprofundamos o entendimento do problema antes da solução, estruturando diagnósticos e hipóteses para garantir que a inovação resolva o que realmente importa.'
                    },
                    {
                        image: 'puzzle',
                        title: 'Criação e validação de soluções',
                        text: 'Utilizamos abordagens como Design Thinking e experimentação para construir, testar e evoluir soluções com foco em gerar valor real para o negócio.'
                    },
                    {
                        image: 'timer',
                        title: 'Agilidade e execução de projetos',
                        text: 'Transformar inovação em entrega exige método. Trabalhamos gestão ágil, priorização e acompanhamento para garantir ritmo, foco e avanço consistente.'
                    },
                    {
                        image: 'stocks',
                        title: 'Decisão orientada por dados',
                        text: 'Estruturamos indicadores e critérios de sucesso para apoiar decisões mais claras e sustentáveis, garantindo que a inovação seja mensurável.'
                    }
                ]}
            />

            <LemonLine className='mb-0!' />

            <LemonVideo />

            <RelatedCases slugs={['limonada-com-rodobens', 'limonada-com-sicredi']} />

            <ContactBlock text='O que mais desafia seu negócio hoje? Vamos desenhar a sua jornada com a Limonada.'/>

		</main>
	)
}
