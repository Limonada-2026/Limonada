'use client'

// libraries
import { useRef } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// components
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'

// images
import aline from '@/assets/img/team-aline.jpg'
import eduardo from '@/assets/img/team-eduardo.jpg'
import marcela from '@/assets/img/team-marcela.jpg'

const team = [
	{
		image: aline,
		name: 'Aline <br />Gomes',
		text: 'Com mais de 25 anos de experiência, Aline ocupou posições executivas de RH em empresas como Ambev, Philip Morris, Accenture e Bridgestone, liderando gestão de talentos, desenvolvimento organizacional e transformação cultural no Brasil e na América Latina. <br /><br />Foi também sócia da Escola Conquer e CEO da Conquer In Company, à frente da expansão de soluções de desenvolvimento para empresas. É psicóloga, pós-graduada em Administração de Empresas e tem MBA em Gestão, Liderança e Inovação. <br /><br />Com a Limonada, Aline busca, a cada projeto, garantir que o desenvolvimento de talentos sustente decisões e mudanças que movem o negócio.',
		invert: false
	},
	{
		image: eduardo,
		name: 'Eduardo <br />Albuquerque',
		text: 'Há mais de 20 anos, Eduardo apoia organizações na construção de estratégias de crescimento, inovação e geração de valor, com passagens por empresas como Natura, Philips, Sanofi, Arcor e Conquer. <br /><br />Atua também como conselheiro de empresas e, há mais de oito anos, como professor e consultor de estratégia da Fundação Dom Cabral. É mestre em Administração pela Fundação Dom Cabral, especialista em Design Thinking pelo Instituto Europeu de Design e graduado em Administração de Empresas pela PUC-SP. <br /><br />Na Limonada, Edu é o guardião do Método Limão, criado para resolver a equação: conectar profundidade, referência externa e ação.',
		invert: true
	},
	{
		image: marcela,
		name: 'Marcela <br />Cuenca',
		text: `Com mais de 20 anos de carreira na interseção entre marketing, experiência do cliente e desenvolvimento de novos negócios, Marcela atuou em empresas como L'Oréal, Havaianas e H.Stern, liderando crescimento, inovação e lançamento de produtos. <br /><br />Hoje dedica sua atuação à consultoria e facilitação de processos de transformação organizacional, desenhando experiências de aprendizagem para líderes e equipes. É mestre em Marketing pela PUC-Rio, especialista em Design Thinking pelo MIT e graduada em Administração de Empresas pela UFRJ. <br /><br />Na Limonada, Marcela garante garante que cada jornada una conteúdo, conexão e hospitalidade para transformar aprendizagem em experiência.`,
		invert: false
	}
]

export default function TeamBlocks() {

	const container = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		if (!container.current) return

		const mm = gsap.matchMedia()

		// pin only from lg / 992px up (62rem)
		mm.add('(min-width: 62rem)', () => {
			const scroller = document.getElementById('viewport')
			const blocks = gsap.utils.toArray<HTMLElement>('[data-block]', container.current)
			const last = blocks[blocks.length - 1]

			if (!last || blocks.length < 2) return

			// pin 1st & 2nd at viewport center; scale while the next
			// block scrolls in. all pins release when the last hits center.
			blocks.forEach((block, i) => {
				if (i === blocks.length - 1) return

				const scaleTarget = block.querySelector<HTMLElement>('[data-scale]')
				const next = blocks[i + 1]
				if (!scaleTarget || !next) return

				ScrollTrigger.create({
					trigger: block,
					scroller: scroller ?? undefined,
					start: 'center center',
					endTrigger: last,
					end: 'center center',
					pin: true,
					pinType: 'fixed',
					anticipatePin: 1,
					pinSpacing: false,
					invalidateOnRefresh: true,
				})

				gsap.fromTo(scaleTarget, {
					scale: 1,
					filter: 'blur(0px)',
				}, {
					scale: 0.9,
					filter: 'blur(5px)',
					ease: 'none',
					transformOrigin: 'center center',
					scrollTrigger: {
						trigger: block,
						scroller: scroller ?? undefined,
						start: 'center center',
						endTrigger: next,
						end: 'center center',
						scrub: true,
						invalidateOnRefresh: true,
					}
				})
			})

			ScrollTrigger.refresh()
		})

		return () => mm.revert()
	}, {
		scope: container
	})

	return (
		<section className='section-space'>
			<div className='base-container'>
				<div
					ref={container}
					className='flex flex-col gap-4 sm:gap-8 lg:gap-10'
				>
					{team.map((item, i) => (
						<div
							key={i}
							data-block
							style={{ zIndex: i + 1 }}
							className='relative'
						>
							<div
								data-scale
								className='relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#333032] p-6 xs:p-8 sm:p-12 lg:p-14 2xl:p-20 lg:min-h-[90svh] flex items-center will-change-transform max-md:pt-[100vw]!'
							>

                                <div className='absolute z-0 -top-[25vw] sm:top-0 left-0 w-full md:h-full h-[80%]'>

                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={2500}
                                        height={1700}
                                        className={clsx(
                                            'w-full h-full object-cover',
                                            item === team[0] && 'max-md:object-[80%_0%]',
                                            item === team[1] && 'max-md:object-[25%_0%]',
                                            item === team[2] && 'max-md:object-[75%_0%]'
                                        )}
                                    />

                                    <div className='absolute bottom-0 left-0 w-full h-3/4 bg-linear-to-t from-[#333032] to-transparent md:hidden' />

                                </div>

								<div className={clsx(
									'relative z-2 flex flex-col gap-6 lg:gap-8 md:max-w-[55%] lg:max-w-[48%]',
									item.invert && 'ml-auto'
								)}>

									<h3
										className='title-96 text-green-vivid max-2xl:[&_br]:hidden'
										dangerouslySetInnerHTML={{ __html: item.name }}
									/>

									<p
										className='text-white'
										dangerouslySetInnerHTML={{ __html: item.text }}
									/>

								</div>

							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
