'use client'

// libraries
import { useRef } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// images
import image01 from '@/assets/img/letter-l.png'
import image02 from '@/assets/img/letter-i.png'
import image03 from '@/assets/img/letter-m.png'
import image04 from '@/assets/img/letter-a.png'
import image05 from '@/assets/img/letter-o.png'

const tabs = [
	{
		bgColor: '#CFEABE',
		textColor: '#0F2D1E',
		light: false,
		letter: <span className='text-[#AAC39B]'><span className='text-[#1E1E1E]'>L</span>IMÃO</span>,
		singleLetter: 'L',
		title: 'Learn',
		text: (
			<>
				Todo projeto começa com escuta. <br /><br />
				Aprendemos sobre cultura e contexto da empresa, e o que desafia times e líderes no dia a dia.
			</>
		),
		image: image01
	},
	{
		bgColor: '#AAFF32',
		textColor: '#007846',
		light: false,
		letter: <span className='text-[#83C722]'>L<span className='text-green-medium'>I</span>MÃO</span>,
		singleLetter: 'I',
		title: 'Imagine',
		text: (
			<>
				Dentro de cada jornada, conectamos o que há de mais relevante no mercado. <br /><br />
				Referências, tendências e práticas - para ampliar perspectivas sobre o próprio contexto da empresa.
			</>
		),
		image: image02
	},
	{
		bgColor: '#00C855',
		textColor: '#fff',
		light: true,
		letter: <span className='text-[#04A548]'>LI<span className='text-white'>M</span>ÃO</span>,
		singleLetter: 'M',
		title: 'Match',
		text: (
			<>
				A mudança começa quando a empresa coloca seu contexto em contraste com o que acontece fora. <br /><br />
				É nesse encontro que surgem novas perguntas e ficam claros os pontos de decisão e o que precisa mudar.
			</>
		),
		image: image03
	},
	{
		bgColor: '#007846',
		textColor: '#C8EBB9',
		light: true,
		letter: <span className='text-[#005532]'>LIM<span className='text-green-light'>Ã</span>O</span>,
		singleLetter: 'A',
		title: 'Act',
		text: (
			<>
				O que é construído precisa sair do papel. <br /><br />
				Cada etapa da jornada se desdobra em aplicações reais, com iniciativas que são testadas, refinadas e conectadas ao negócio.
			</>
		),
		image: image04
	},
	{
		bgColor: '#0F2D1E',
		textColor: '#AAFF32',
		light: true,
		letter: <span className='text-[#545454]'>LIMÃ<span className='text-white'>O</span></span>,
		singleLetter: 'O',
		title: 'Organize',
		text: (
			<>
				Transformação é um processo. <br /><br />
				Estruturamos mecanismos que mantêm o que foi construído ativo no dia a dia da empresa.
			</>
		),
		image: image05
	}
]

export default function Tabs() {

	const container = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		if (!container.current) return

		const scroller = document.getElementById('viewport')
		const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', container.current)
		const last = panels[panels.length - 1]

		if (!last || panels.length < 2) return

		const rem = () => parseFloat(getComputedStyle(document.documentElement).fontSize) || 16

		const tabOverhang = (panel: HTMLElement) => {
			const tab = panel.querySelector<HTMLElement>('[data-tab]')
			if (!tab) return 0
			return Math.max(0, panel.getBoundingClientRect().top - tab.getBoundingClientRect().top)
		}

		// pin offset: tab overhang for the 1st, then +0.5rem per step
		const pinOffset = (panel: HTMLElement, i: number) => tabOverhang(panel) + i * rem() * 0.5

		// [data-tab] uses -translate-y-14, so it sits above the panel box —
		// pin the panel below the viewport top by that overhang so the tab
		// stays on screen. cascade +0.5rem per step. unpin when the last panel
		// reaches its own cascade slot (earlier than waiting for its bottom).
		panels.forEach((panel, i) => {
			if (i === panels.length - 1) return

			ScrollTrigger.create({
				trigger: panel,
				scroller: scroller ?? undefined,
				start: () => `top top+=${pinOffset(panel, i)}px`,
				endTrigger: last,
				end: () => `top top+=${pinOffset(last, panels.length - 1)}px`,
				pin: true,
				pinType: 'fixed',
				anticipatePin: 1,
				pinSpacing: false,
				invalidateOnRefresh: true,
			})
		})

		ScrollTrigger.refresh()
	}, {
		scope: container
	})

	return (
		<section ref={container}>
			{tabs.map((item, i) => (
				<div
					key={i}
					data-panel
					style={{
						backgroundColor: item.bgColor,
						zIndex: i + 1
					}}
					className='relative'
				>
					<div className='base-container'>

						<div
							style={{
								backgroundColor: item.bgColor
							}}
							data-tab
							className='flex items-center justify-center text-center pr-14 py-4 w-fit rounded-tr-4xl -translate-y-14 relative'
						>

							<span className='relative z-2 tracking-[.5rem] font-medium'>
								{item.letter}
							</span>

							<span
								className='absolute z-0 top-0 right-1/2 w-svw h-full'
								style={{
									backgroundColor: item.bgColor
								}}
							/>

						</div>

						<div className='flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center sm:gap-4 max-sm:min-h-[calc(100svh-7rem)] max-sm:justify-end'>

							<div className='lg:flex lg:justify-center lg:items-center relative z-2 lg:min-h-[calc(100svh-8rem)] lg:pb-20'>
								<div className='lg:flex lg:gap-4'>

									<p
										className='font-heading leading-none text-8xl lg:text-[12rem] xl:text-[14rem] uppercase font-bold min-w-30 xl:min-w-50 max-lg:hidden'
										style={{
											color: item.textColor
										}}
									>
										{item.singleLetter}
									</p>

									<div className='flex flex-col gap-4 max-sm:-mt-4'>

										<h2
											className='font-heading leading-none text-8xl lg:text-[12rem] xl:text-[14rem] uppercase font-bold'
											style={{
												color: item.textColor
											}}
										>
											{item.title}
										</h2>

										<p className={clsx(
											'sm:max-w-lg md:text-lg lg:pl-2 max-lg:pb-30',
											item.light && 'text-white'
										)}>
											{item.text}
										</p>

									</div>

								</div>
							</div>

							<Image
								src={item.image}
								alt={item.title}
								width={1400}
								height={1200}
								className='h-auto lg:absolute lg:z-1 lg:top-1/2 lg:-translate-y-1/2 lg:-right-20 min-w-[90vw] sm:min-w-[60vw] lg:min-w-[50vw] w-[90vw] sm:w-[60vw] lg:w-[50vw] xl:-right-[5vw] max-lg:-mr-30 max-sm:mr-auto max-sm:ml-auto'
							/>

						</div>

					</div>
				</div>
			))}
		</section>
	)
}
