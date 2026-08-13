'use client'

// libraries
import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'

// images
import lemon from '@/assets/img/lemon-splash.png'

export default function PinLemon() {

	const section = useRef<HTMLDivElement>(null)
	const image = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		if (!section.current || !image.current) return

		const mm = gsap.matchMedia()

		// pin only from lg / 992px up (62rem)
		mm.add('(min-width: 62rem)', () => {
			const scroller = document.getElementById('viewport')

			ScrollTrigger.create({
				trigger: image.current,
				scroller: scroller ?? undefined,
				// pin once the lemon is vertically centered in the viewport
				start: 'center center',
				endTrigger: section.current,
				// unpin when the section bottom meets the pinned lemon bottom
				end: () => {
					const vh = scroller?.clientHeight ?? window.innerHeight
					const imageH = image.current?.offsetHeight ?? 0
					return `bottom ${(vh + imageH) / 2}px`
				},
				pin: true,
				pinType: 'fixed',
				anticipatePin: 1,
				pinSpacing: false,
				invalidateOnRefresh: true,
			})

			ScrollTrigger.refresh()
		})

		return () => mm.revert()
	}, {
		scope: section
	})

	return (
		<section className='section-space'>
			<div className='base-container'>

				<h2 className='text-2xl lg:text-3xl font-semibold lg:text-center lg:mx-auto'>
					<AnimatedText text='Receita Limonada' />
				</h2>

				<div
					ref={section}
					className='relative min-h-svh mt-8 sm:mt-14'
				>

					<div
						ref={image}
						className='absolute -z-1 top-0 left-0 right-0 w-full flex justify-center pointer-events-none'
					>
						<Image
							src={lemon.src}
							alt='Receita Limonada'
							width={1993}
							height={2034}
							className='w-[50vw] xl:w-[60vw] h-auto object-fit max-lg:hidden'
						/>
					</div>

					<StaggerUp className='flex flex-col gap-8 sm:gap-14 xl:gap-20'>
						{[
							{
								title: 'Um sócio em cada projeto',
								text: 'Não delegamos a entrega. Um dos sócios lidera cada projeto de perto, co-criando junto com o cliente, acompanhando os desdobramentos e ajustando o caminho sempre que o contexto muda.'
							},
							{
								title: 'Educadores parceiros',
								text: 'Conectamos profissionais com experiência relevante no desafio de cada projeto.'
							},
							{
								title: 'Curadoria de conteúdo',
								text: 'Selecionamos referências atuais e aplicáveis, e cases reais, conectadas ao contexto do negócio.'
							},
							{
								title: 'Ação e experimentação',
								text: 'A jornada é pensada para engajar antes, durante e depois de cada encontro, com ações pensadas para cada momento.'
							},
							{
								title: 'Repertório compartilhado',
								text: 'O que se constrói em cada encontro não fica só na sala: vira ferramentas e aprendizados que os participantes levam para o dia a dia, e uma leitura de conjunto que ajuda o RH a decidir os próximos passos.'
							}
						].map((item, i) => (
							<div
								key={i}
								className='lg:max-w-1/3 xl:max-w-1/4 lg:even:text-right lg:even:ml-auto lg:even:**:data-line:-ml-[10vw] xl:even:**:data-line:-ml-[20vw]'
							>

								<h2 className='text-green-vivid font-bold text-xl'>
                                    <AnimatedText text={`${i+1}. ${item.title}`} />
								</h2>

								<div
									className='my-3 sm:my-4 lg:w-[calc(100%+10vw)] xl:w-[calc(100%+20vw)] h-px bg-gray-300'
									data-line
								/>

								<p className='md:text-lg'>
                                    <AnimatedText text={item.text} />
								</p>

							</div>
						))}
					</StaggerUp>

				</div>

			</div>
		</section>
	)
}
