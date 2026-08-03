// libraries
import { Metadata } from 'next'
import Image from 'next/image'

// components
import ServiceBlock from '@/components/ServiceBlock'
import Scale from '@/components/Utils/Animations/Scale'

// image
import lemons from '@/assets/img/lemons.png'
import service_01 from '@/assets/img/service-01.jpg'
import service_02 from '@/assets/img/service-02.jpg'
import service_03 from '@/assets/img/service-03.jpg'
import service_04 from '@/assets/img/service-04.jpg'

// utils
import { pages } from '@/utils/routes'

// metadata
export const metadata: Metadata = {
	title: 'O Que Resolvemos',
	description: 'O Que Resolvemos',
}

export default function OQueResolvemos() {
	return (
		<main>

            <section className='menu-space bg-green-dark rounded-bottom-corners'>

                <div className='base-container py-12 md:py-[10vw]'>

                    <h1 className='title-96 text-white md:text-center'>
                        O que resolvemos
                    </h1>

                    <h2 className='md:text-lg text-white md:text-center md:max-w-180 md:mx-auto mt-4 md:mt-6 max-lg:pb-[15vw] max-sm:pb-[12vw]'>
                        Explore o caminho para o seu desafio
                    </h2>

                </div>

                <Image
                    src={lemons}
                    alt='Lemons'
                    width={845}
                    height={517}
                    priority
                    className='absolute z-2 lg:top-1/2 lg:-translate-y-1/4 w-[50vw] lg:w-auto h-auto lg:h-[45%] xl:h-1/2 2xl:left-[65%] xl:left-[70%] lg:left-[75%] md:left-1/2 md:-translate-x-1/2 max-lg:-bottom-[10vw] lg:translate-x-0 right-0 md:right-auto'
                />

            </section>

            <section className='section-space'>
                <div className='base-container'>
                    <div className='flex flex-col gap-6'>
                        {[
                            {
                                image: service_01,
                                title: 'Liderança',
                                description: 'Desenvolva líderes capazes de sustentar direção, tomar decisões com clareza e garantir que a execução avance.',
                                href: pages.o_que_resolvemos.lideranca
                            },
                            {
                                image: service_02,
                                title: 'Soft Skills',
                                description: 'Desenvolva habilidades que fortalecem como as pessoas se comunicam, decidem e colaboram.',
                                href: pages.o_que_resolvemos.soft_skills
                            },
                            {
                                image: service_03,
                                title: 'Inovação',
                                description: 'Prepare equipe e liderança para priorizar, testar e sustentar iniciativas que impactam o negócio.',
                                href: pages.o_que_resolvemos.inovacao
                            },
                            {
                                image: service_04,
                                title: 'Estratégia',
                                description: 'Estruture escolhas estratégicas a partir do contexto do negócio e sustente sua execução com clareza, foco e consistência.',
                                href: pages.o_que_resolvemos.estrategia
                            }
                        ].map((item, i) => (
                            <Scale key={i}>
                                <ServiceBlock {...item} />
                            </Scale>
                        ))}
                    </div>
                </div>
            </section>

        </main>
	)
}