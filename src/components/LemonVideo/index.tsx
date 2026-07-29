'use client'

// libraries
import { useRef } from 'react'
import { Link } from 'next-transition-router'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import Video from '@/components/Video'

// utils
import { pages } from '@/utils/routes'

const method_items = [
	{ cursive: 'Aprenda', text: 'Learn' },
	{ cursive: 'Imagine', text: 'Imagine' },
	{ cursive: 'Conecte', text: 'Match' },
	{ cursive: 'Planeje', text: 'Act' },
	{ cursive: 'Organize', text: 'Organize' }
] as const

export default function LemonVideo() {

	const sectionRef = useRef<HTMLElement>(null)
	const videoRef = useRef<HTMLVideoElement>(null)

	useGSAP(() => {
		const section = sectionRef.current
		const video = videoRef.current
		if (!section || !video) return

		// pin + scrub only above lg (62rem / 992px)
		const mm = gsap.matchMedia()

		mm.add('(min-width: 62rem)', () => {
			const scroller = document.getElementById('viewport')
			const items = gsap.utils.toArray<HTMLElement>('[data-lemon-item]', section)

			gsap.set(items, { autoAlpha: 0, x: -40 })

			let tl: gsap.core.Timeline | null = null
			let rafId = 0

			const setup = () => {
				const duration = video.duration
				if (!duration || !Number.isFinite(duration)) return

				tl?.scrollTrigger?.kill()
				tl?.kill()

				// ensure iOS can seek (must "activate" the video first)
				video.pause()
				video.currentTime = 0

				const videoProxy = { time: 0 }

				tl = gsap.timeline({
					scrollTrigger: {
						trigger: section,
						scroller: scroller ?? undefined,
						start: 'top top',
						end: () => `+=${Math.max(window.innerHeight, duration * 400)}`,
						pin: true,
						pinType: 'fixed',
						anticipatePin: 1,
						pinSpacing: true,
						scrub: true,
						invalidateOnRefresh: true
					}
				})

				// scrub video across the full pin
				tl.to(videoProxy, {
					time: duration,
					ease: 'none',
					duration: 1,
					onUpdate: () => {
						cancelAnimationFrame(rafId)
						rafId = requestAnimationFrame(() => {
							if (Math.abs(video.currentTime - videoProxy.time) > 0.01) {
								video.currentTime = videoProxy.time
							}
						})
					}
				}, 0)

				// reveal each method item in sequence as the video plays
				items.forEach((item, i) => {
					const start = (i / items.length) * 0.85
					tl!.fromTo(
						item,
						{ autoAlpha: 0, x: -40 },
						{ autoAlpha: 1, x: 0, duration: 0.12, ease: 'power2.out' },
						start
					)
				})

				ScrollTrigger.refresh()
			}

			if (video.readyState >= 1) {
				setup()
			} else {
				video.addEventListener('loadedmetadata', setup, { once: true })
			}

			return () => {
				cancelAnimationFrame(rafId)
				video.removeEventListener('loadedmetadata', setup)
				tl?.scrollTrigger?.kill()
				tl?.kill()
				tl = null
				gsap.set(items, { clearProps: 'all' })
			}
		})

		return () => mm.revert()
	}, {
		scope: sectionRef
	})

	return (
		<section
			ref={sectionRef}
			className='relative overflow-hidden py-4'
		>

			<video
				ref={videoRef}
				muted
				playsInline
				preload='auto'
				className='absolute z-0 top-1/2 left-1/2 -translate-1/2 w-auto h-[75%] 2xl:h-[90%] object-contain max-lg:hidden'
			>
				<source
					src='/videos/lemon-loop.mp4'
					type='video/mp4'
				/>
			</video>

			<div className='base-container relative z-2'>
				<div className='lg:flex lg:items-center lg:justify-between lg:min-h-svh lg:py-20 pointer-events-auto'>

					<div className='lg:max-w-1/3'>

						<h2 className='text-6xl sm:text-7xl 2xl:text-8xl leading-[.9] font-bold font-heading uppercase text-green-medium'>
							O Método <br className='max-lg:hidden' />
							L.I.M.Ã.O.
						</h2>

						<p className='block my-8'>
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

                        <div className='flex flex-col gap-4 lg:gap-2 relative z-2'>
                            {method_items.map((item, i) => (
                                <div
                                    data-lemon-item
                                    className='relative lg:text-right w-fit lg:ml-auto will-change-transform'
                                    key={i}
                                >

                                    <p className='text-green-medium font-cursive lowercase text-3xl sm:text-4xl lg:text-5xl font-normal absolute top-1/2 left-[calc(100%-3rem)] sm:left-[calc(100%-2rem)] lg:-left-20 -translate-y-1/2'>
                                        {item.cursive}
                                    </p>

                                    <h3 className='text-6xl sm:text-7xl 2xl:text-8xl leading-[.9] font-bold font-heading uppercase text-gray-200'>
                                        {item.text}
                                    </h3>

                                </div>
                            ))}
                        </div>

                        <Video
                            video='/videos/lemon-loop.mp4'
                            className='absolute -z-1 top-0 -right-6 w-auto h-[95%] sm:h-full object-contain lg:hidden'
                            loopRewind
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
