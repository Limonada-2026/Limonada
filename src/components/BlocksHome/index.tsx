// libraries
import Image from 'next/image'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import ServiceBlock from '@/components/ServiceBlock'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import Scale from '@/components/Utils/Animations/Scale'

// images
import service_01 from '@/assets/img/service-01.jpg'
import service_02 from '@/assets/img/service-02.jpg'
import service_03 from '@/assets/img/service-03.jpg'
import service_04 from '@/assets/img/service-04.jpg'
import lemon_line from '@/assets/img/lemon-line.jpg'

// svg
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'

// utils
import { pages } from '@/utils/routes'

export default function BlocksHome() {
	return (
        <>

            <section className='section-space'>
                <div className='base-container'>

                    <h2 className='text-2xl md:text-3xl xl:text-4xl font-semibold block mb-4 lg:mb-8'>
						<AnimatedText text='Explore o caminho para o seu desafio' />
					</h2>

                    <div className='flex flex-col gap-6'>
                        {[
                            {
                                image: service_01,
                                title: 'Liderança',
                                description: 'Desenvolva líderes capazes de sustentar direção, tomar decisões com clareza e garantir que a execução avance.',
                                href: pages.oque_resolvemos.lideranca
                            },
                            {
                                image: service_02,
                                title: 'Soft Skills',
                                description: 'Desenvolva habilidades que fortalecem como as pessoas se comunicam, decidem e colaboram.',
                                href: pages.oque_resolvemos.soft_skills
                            },
                            {
                                image: service_03,
                                title: 'Inovação',
                                description: 'Prepare equipe e liderança para priorizar, testar e sustentar iniciativas que impactam o negócio.',
                                href: pages.oque_resolvemos.inovacao
                            },
                            {
                                image: service_04,
                                title: 'Estratégia',
                                description: 'Estruture escolhas estratégicas a partir do contexto do negócio e sustente sua execução com clareza, foco e consistência.',
                                href: pages.oque_resolvemos.estrategia
                            }
                        ].map((item, i) => (
                            <Scale key={i}>
                                <ServiceBlock {...item} />
                            </Scale>
                        ))}
                    </div>

                </div>
            </section>

            <section className='section-space'>
                <div className='base-container'>

                    <h2 className='text-2xl md:text-3xl xl:text-4xl font-semibold block mb-2 md:mb-4'>
						<AnimatedText text='No formato que a rotina e o negócio pedem' />
					</h2>

                    <Scale>
                        <div className='relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl bg-[#888886] md:bg-black'>

                            <ScrollingImage className='max-md:h-[80vw]! max-md:relative!'>

                                <div className='absolute z-2 bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-[#888886] to-transparent' />

                                <Image
                                    src={lemon_line}
                                    alt='Limão / linha'
                                    className='w-full h-full object-cover opacity-80 max-md:object-[99%_50%]'
                                    fill
                                />
                            </ScrollingImage>

                            <div className='flex flex-col justify-between gap-6 relative z-3 w-full md:min-h-120 sm:min-h-100 lg:min-h-[40vw] xl:min-h-[33vw] p-6 md:p-10'>

                                <h3 className='text-2xl md:text-3xl xl:text-4xl text-white max-w-2xl max-md:-mt-10'>
                                    Desenhamos jornadas que combinam formatos para conectar aprendizado, decisão e execução no dia a dia do negócio.
                                </h3>

                                <ul className='text-white lg:text-lg max-w-2xl'>
                                    {[
                                        'Encontros presenciais ou online ao vivo que direcionam aprendizado',
                                        'Mentorias que aprofundam e individualizam o desenvolvimento',
                                        'Projetos estratégicos com aplicação real',
                                        'Comitês que qualificam decisões',
                                        'Acompanhamento de projetos para sustentar a execução',
                                    ].map((item, i) => (
                                        <li
                                            className='flex items-center gap-2 my-3 md:my-1 leading-tight'
                                            key={i}
                                        >
                                            <UxArrowRight className='w-3 h-3 max-md:hidden' />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                            
                        </div>
                    </Scale>

                </div>
            </section>

        </>
	)
}