// libraries
import { Metadata } from 'next'
import Image from 'next/image'

// components
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import LemonLine from '@/components/LemonLine'
import LemonVideo from '@/components/LemonVideo'
import ClientsCases from '@/components/ClientsCases'
import ContactBlock from '@/components/ContactBlock'

// svg
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'

// images
import banner from '@/assets/img/service-03.jpg'

// db
import { cases as allCases } from '@/db/clientes'

const featuredCases = [
	'limonada-com-sicredi',
	'limonada-com-rodobens'
]
	.map((slug) => allCases.find((item) => item.slug === slug))
	.filter((item) => item !== undefined)

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

            <section className='menu-space bg-black rounded-bottom-corners relative overflow-hidden'>

                <div className='base-container relative z-2'>

                    <div className='flex flex-col lg:flex-row lg:items-end justify-end lg:justify-between gap-1 sm:gap-4 text-white min-h-100 h-[90svh] sm:h-[87svh] pb-12 lg:pb-16'>

                        <h1 className='text-2xl md:text-3xl xl:text-4xl font-semibold max-lg:mb-4 max-w-md text-balance'>
                            <AnimatedText text='Inovação com foco em execução e resultado' />
                        </h1>

                        <h2 className='lg:text-lg lg:text-right max-w-md text-balance'>
                            O grande desafio da inovação está na capacidade de executar. Priorizar, testar e sustentar decisões sobre o que funciona é o que transforma inovação em resultado.
                        </h2>

                    </div>

                </div>

                <ScrollingImage>
                    <Image
                        src={banner}
                        alt='Inovação'
                        width={1655}
                        height={1030}
                        priority
                        className='absolute z-0 inset-0 opacity-75'
                    />
                </ScrollingImage>

            </section>

            <section className='section-space-half'>
                <div className='base-container'>

                    <h2 className='text-2xl lg:text-3xl font-semibold text-green-medium mb-6 sm:mb-14'>
						<AnimatedText text='Esse caminho faz sentido quando:' />
					</h2>
                    
                    <StaggerUp className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 text-green-medium'>
                        {[
                            'Ideias surgem, mas não saem do papel.',
                            'A inovação acontece isoladamente e não faz parte da cultura.',
                            'O erro trava a experimentação.',
                            'Existe intenção de inovar, mas não há espaço na rotina para isso acontecer.'
                        ].map((item, i) => (
                            <div
                                className='inline-flex gap-2 sm:text-balance'
                                key={i}
                            >
                                <UxArrowRight className='min-w-3 h-3 translate-y-2' />
                                <span className='text-lg'>{item}</span>
                            </div>
                        ))}
                    </StaggerUp>

                </div>
            </section>

            <section>
                <div className='base-container'>

                    <div className='w-full block h-px bg-gray-300' />

                    <div className='section-space-half'>

                        <h2 className='text-2xl lg:text-3xl font-semibold mb-2'>
                            <AnimatedText text='O que precisa evoluir na liderança para conduzir a transformação?' />
                        </h2>

                        <p>
                            <AnimatedText text='As temáticas mais frequentes:' />
                        </p>

                        <StaggerUp className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 mt-8 lg:mt-14'>
                            {[
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
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className='flex flex-col gap-1 sm:gap-4'
                                >

                                    <Image
                                        src={`/img/svg/lemon-${item.image}.svg`}
                                        alt={item.title}
                                        width={125}
                                        height={90}
                                        className='w-24 sm:w-28 h-auto max-sm:mb-2'
                                    />

                                    <h3 className='font-semibold text-green-medium text-lg sm:text-balance'>
                                        {item.title}
                                    </h3>

                                    <p className='sm:text-balance'>
                                        {item.text}
                                    </p>

                                </div>
                            ))}
                        </StaggerUp>

                    </div>

                </div>
            </section>

            <LemonLine className='mb-0!' />

            <LemonVideo />

            <ClientsCases cases={featuredCases} />

            <ContactBlock text='O que mais desafia seu negócio hoje? Vamos desenhar a sua jornada com a Limonada.'/>
			
		</main>
	)
}