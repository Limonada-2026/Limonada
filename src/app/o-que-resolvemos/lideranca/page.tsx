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
import banner from '@/assets/img/service-01.jpg'

// db
import { cases as allCases } from '@/db/clientes'

const featuredCases = [
	'limonada-com-stone',
	'limonada-com-boticario'
]
	.map((slug) => allCases.find((item) => item.slug === slug))
	.filter((item) => item !== undefined)

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

            <section className='menu-space bg-black rounded-bottom-corners relative overflow-hidden'>

                <div className='base-container relative z-2'>

                    <div className='flex flex-col lg:flex-row lg:items-end justify-end lg:justify-between gap-1 sm:gap-4 text-white min-h-100 h-[90svh] sm:h-[87svh] pb-12 lg:pb-16'>

                        <h1 className='text-2xl md:text-3xl xl:text-4xl font-semibold max-lg:mb-4 max-w-md text-balance'>
                            <AnimatedText text='Liderança que sustenta direção, desenvolvimento, decisão e resultado' />
                        </h1>

                        <h2 className='lg:text-lg lg:text-right max-w-md text-balance'>
                            Não existe transformação consistente sem líderes capazes de inspirar, traduzir estratégia em prática, mobilizar pessoas e sustentar a evolução do negócio.
                        </h2>

                    </div>

                </div>

                <ScrollingImage big>
                    <Image
                        src={banner}
                        alt='Liderança'
                        width={1539}
                        height={1190}
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
                            'Liderança não está alinhada com a estratégia.',
                            'Mudanças são definidas, mas não refletem ação.',
                            'Cultura, execução e direção não caminham juntas.',
                            'O time entrega, mas não encontra segurança para performar melhor.'
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