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
import banner from '@/assets/img/service-02.jpg'

// db
import { cases as allCases } from '@/db/clientes'

const featuredCases = [
	'limonada-com-john-deere',
	'limonada-com-neoenergia'
]
	.map((slug) => allCases.find((item) => item.slug === slug))
	.filter((item) => item !== undefined)

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

            <section className='menu-space bg-black rounded-bottom-corners relative overflow-hidden'>

                <div className='base-container relative z-2'>

                    <div className='flex flex-col lg:flex-row lg:items-end justify-end lg:justify-between gap-1 sm:gap-4 text-white min-h-100 h-[90svh] sm:h-[87svh] pb-12 lg:pb-16'>

                        <h1 className='text-2xl md:text-3xl xl:text-4xl font-semibold max-lg:mb-4 max-w-md text-balance'>
                            <AnimatedText text='Soft skills para equipes e líderes' />
                        </h1>

                        <h2 className='lg:text-lg lg:text-right max-w-md text-balance'>
                            Não há forma mais consistente de transformar organizações senão começar pelas pessoas - desenvolvendo como elas pensam, decidem e agem no dia a dia.
                        </h2>

                    </div>

                </div>

                <ScrollingImage>
                    <Image
                        src={banner}
                        alt='Soft Skills'
                        width={1733}
                        height={967}
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
                            'As pessoas entregam individualmente, mas não há conexão e colaboração.',
                            'Conversas difíceis não acontecem.',
                            'As equipes não acompanham a velocidade que o negócio pede.',
                            'As decisões avançam, mas nem sempre na mesma direção.'
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