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
import banner from '@/assets/img/service-04.jpg'

// db
import { cases as allCases } from '@/db/clientes'

const featuredCases = [
	'limonada-com-sakura',
	'limonada-com-oxford'
]
	.map((slug) => allCases.find((item) => item.slug === slug))
	.filter((item) => item !== undefined)

// metadata
export const metadata: Metadata = {
	title: 'O que resolvemos: Estratégia | Limonada',
	description: 'Não existe avanço consistente sem clareza sobre prioridades, critérios de decisão e capacidade de sustentar escolhas ao longo do tempo.',
	alternates: {
		canonical: '/o-que-resolvemos/estrategia'
	}
}

export default function Inovacao() {
	return (
		<main>

            <section className='menu-space bg-black rounded-bottom-corners relative overflow-hidden'>

                <div className='base-container relative z-2'>

                    <div className='flex flex-col lg:flex-row lg:items-end justify-end lg:justify-between gap-1 sm:gap-4 text-white min-h-100 h-[90svh] sm:h-[87svh] pb-12 lg:pb-16'>

                        <h1 className='text-2xl md:text-3xl xl:text-4xl font-semibold max-lg:mb-4 max-w-md text-balance'>
                            <AnimatedText text='Estratégia com clareza para escolher e consistência para avançar' />
                        </h1>

                        <h2 className='lg:text-lg lg:text-right max-w-md text-balance'>
                            Não existe avanço consistente sem clareza sobre prioridades, critérios de decisão e capacidade de sustentar escolhas ao longo do tempo.
                        </h2>

                    </div>

                </div>

                <ScrollingImage big>
                    <Image
                        src={banner}
                        alt='Estratégia'
                        width={1885}
                        height={1167}
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
                            'A estratégia é definida, mas não executada.',
                            'As decisões estão desalinhadas dos objetivos.',
                            'Liderança e time operam em ritmos diferentes.',
                            'Resultados são cobrados, mas não há rotina de acompanhamento.'
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