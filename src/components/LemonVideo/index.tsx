// libraries
import Link from 'next/link'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import Video from '@/components/Video'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'

// utils
import { pages } from '@/utils/routes'

const method_items = [
	{ cursive: 'Aprenda', text: 'Learn' },
	{ cursive: 'Imagine', text: 'Imagine' },
	{ cursive: 'Conecte', text: 'Match' },
	{ cursive: 'Aja', text: 'Act' },
	{ cursive: 'Organize', text: 'Organize' }
] as const

export default function LemonVideo() {
	return (
		<section className='relative overflow-hidden py-4'>

			<div className='absolute z-0 inset-0 w-full h-full max-lg:hidden'>
				<Video
					video='/videos/lemon-loop.mp4'
					className='absolute z-0 top-1/2 left-1/2 -translate-1/2 h-[75%] 2xl:h-[90%] aspect-[1072/1920]'
					loopRewind
					speed={1.5}
				/>
			</div>

			<div className='base-container relative z-2'>
				<div className='lg:flex lg:items-center lg:justify-between lg:min-h-svh lg:py-20 pointer-events-auto'>

					<div className='lg:max-w-1/3'>

						<AnimatedTitle
							style='gray-green-medium'
							className='text-6xl sm:text-7xl 2xl:text-8xl leading-[.9] font-bold font-heading uppercase'
						>
							O Método <br className='max-lg:hidden' />
							L.I.M.Ã.O.
						</AnimatedTitle>

						<p className='block my-8 lg:text-lg'>
							Desenvolvemos uma abordagem própria que faz do desenvolvimento de pessoas um catalisador de mudanças reais. Quando combinamos todos os elementos do Método, transformamos os desafios em oportunidades. E geramos impacto positivo para pessoas e negócios.<br /><br />

							Afinal, é assim que transformamos limões em Limonada.
						</p>

						<MagneticButton className='max-lg:hidden'>
							<Link
								href={pages.metodo_limao}
								className='button button--green-neon whitespace-nowrap'
							>
								Conheça o Método Limão
							</Link>
						</MagneticButton>

					</div>

					<div className='max-lg:hidden' />

					<div className='lg:max-w-1/3 max-lg:relative max-lg:my-10 max-sm:mt-4 max-sm:mb-8'>

                        <StaggerUp className='flex flex-col gap-1 sm:gap-4 lg:gap-2 relative z-2'>
                            {method_items.map((item, i) => (
                                <div
                                    data-lemon-item
                                    className='relative lg:text-right w-fit lg:ml-auto will-change-transform'
                                    key={i}
                                >

                                    <h3 className='text-6xl sm:text-7xl 2xl:text-8xl leading-[.9] font-bold font-heading uppercase text-gray-200'>
                                        {item.text}
                                    </h3>

									<p className='text-green-medium font-cursive lowercase text-4xl lg:text-5xl font-normal md:absolute md:top-1/2 md:left-[calc(100%-2rem)] lg:-left-10 md:-translate-y-1/2 max-md:-mt-4'>
                                        {item.cursive}
                                    </p>

                                </div>
                            ))}
                        </StaggerUp>

                        <Video
                            video='/videos/lemon-loop.mp4'
                            className='absolute -z-1 top-0 -right-2 h-[95%] sm:h-full lg:hidden aspect-2/4'
                            loopRewind
							speed={1.5}
                        />
                        
                    </div>

                    <MagneticButton className='lg:hidden'>
                        <Link
                            href={pages.metodo_limao}
                            className='button button--green-neon whitespace-nowrap'
                        >
                            Conheça o Método Limão
                        </Link>
                    </MagneticButton>

				</div>
			</div>

		</section>
	)
}
