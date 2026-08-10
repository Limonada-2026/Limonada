// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import ServiceBlock from '@/components/ServiceBlock'
import Scale from '@/components/Utils/Animations/Scale'
import LemonLine from '@/components/LemonLine'

// images
import service_01 from '@/assets/img/service-01.jpg'
import service_02 from '@/assets/img/service-02.jpg'
import service_03 from '@/assets/img/service-03.jpg'
import service_04 from '@/assets/img/service-04.jpg'

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

            <LemonLine />

        </>
	)
}