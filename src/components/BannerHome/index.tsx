'use client'

// libraries
import { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Link } from 'next-transition-router'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import LemonFall, { type LemonFallHandle } from '@/components/Utils/Animations/LemonFall'

// utils
import { pages } from '@/utils/routes'

// the 1st section takes `1` of the pin to scroll out; the extra `FALL_HOLD` keeps
// the banner pinned just long enough for the lemons to drop onto the 2nd section
const FALL_HOLD = 0.25
const PIN_LENGTH = 1 + FALL_HOLD
const EXIT_AT = 1 / PIN_LENGTH

export default function BannerHome() {

    const container = useRef<HTMLDivElement>(null)
    const firstSection = useRef<HTMLDivElement>(null)
    const secondSection = useRef<HTMLDivElement>(null)

    const lemons = useRef<LemonFallHandle>(null)
    const clip = useRef<HTMLDivElement>(null)
    const released = useRef(false)
    const ride = useRef(0)

    const [landed, setLanded] = useState(false)

    const pathname = usePathname()

    useGSAP(() => {
        if (!container.current || !firstSection.current) return

        // full reset so a fresh route starts from the top of the animation
        released.current = false
        ride.current = 0
        setLanded(false)
        if (clip.current) {
            clip.current.style.transform = ''
            gsap.set(clip.current, { autoAlpha: 1 })
        }

        const scroller = document.getElementById('viewport')

        gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                scroller: scroller ?? undefined,
                start: 'top top',
                end: () => `+=${(firstSection.current?.offsetHeight ?? 0) * PIN_LENGTH}`,
                pin: container.current,
                pinType: 'fixed',
                anticipatePin: 1,
                pinSpacing: true,
                scrub: true,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    if (released.current) return

                    if (self.progress >= EXIT_AT) {
                        released.current = true
                        setLanded(true)
                        if (clip.current) clip.current.style.transform = ''
                        lemons.current?.release(ride.current)
                    } else {
                        const rideProgress = self.progress / EXIT_AT
                        ride.current = rideProgress * (firstSection.current?.offsetHeight ?? 0)
                        if (clip.current) clip.current.style.transform = `translate3d(0, ${-ride.current}px, 0)`
                    }
                },
                onLeaveBack: () => {
                    released.current = false
                    ride.current = 0
                    setLanded(false)
                    if (clip.current) clip.current.style.transform = ''
                },
            }
        })
            .to(firstSection.current, {
                yPercent: -100,
                ease: 'none',
                duration: 1,
            })
            .to({}, { duration: FALL_HOLD })

        // once the footer (which has its own lemons) comes into view, fade the
        // top lemons out so the two effects don't overlap; restore on the way back
        const footer = document.querySelector<HTMLElement>('[data-main-footer]')
        if (footer && clip.current) {
            ScrollTrigger.create({
                trigger: footer,
                scroller: scroller ?? undefined,
                start: 'top bottom+=80%',
                invalidateOnRefresh: true,
                once: true,
                onEnter: () => gsap.to(clip.current, {
                    autoAlpha: 0,
                    duration: 0.3,
                    overwrite: 'auto',
                    pointerEvents: 'none',
                    onComplete: () => lemons.current?.destroy(),
                })
            })
        }
        ScrollTrigger.refresh()
    }, {
        scope: container,
        dependencies: [pathname]
    })

	return (
        <div
            ref={container}
            className='relative'
        >

            <div
                ref={clip}
                className={`absolute inset-0 overflow-hidden rounded-bottom-corners pointer-events-none will-change-transform ${landed ? 'z-20' : 'z-40'}`}
            >
                <LemonFall
                    ref={lemons}
                    spawn
                    count={6}
                    ceiling={false}
                    className='h-full w-full'
                />
            </div>

            <section
                className='bg-green-dark relative z-30 overflow-hidden rounded-bottom-corners pointer-events-auto'
                ref={firstSection}
            >
                <div className='base-container'>
                    <div className='flex flex-col gap-6 sm:gap-8 items-center justify-center min-h-svh text-center pt-14 sm:pt-20 xl:pt-26'>

                        <h1 className='text-white uppercase font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9rem] leading-[.875] sm:leading-[.825] font-bold'>
                            Boutique de <br />
                            desenvolvimento <br />
                            para pessoas <br />
                            e negócios
                        </h1>

                        <p className='text-white mx-auto max-w-lg md:text-lg'>
                            Trabalhamos a partir do contexto de cada empresa para transformar desafios em decisões e ações que movem pessoas, culturas e negócios.
                        </p>

                    </div>
                </div>
            </section>

            <section
                className='bg-green-medium absolute top-0 left-0 w-full z-10 overflow-hidden rounded-bottom-corners pointer-events-auto'
                ref={secondSection}
            >
                <div className='base-container'>
                    <div className='flex flex-col gap-6 sm:gap-8 items-center justify-center min-h-svh text-center'>

                        <h2 className='text-green-dark uppercase font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9rem] leading-[.875] sm:leading-[.825] font-bold'>
                            Transformamos <br />
                            limões em limonada
                        </h2>

                        <p className='text-white mx-auto max-w-3xl md:text-lg'>
                            Como uma boutique, partimos do contexto de cada desafio para construir jornadas de desenvolvimento que apoiam decisões e desdobram em ação, preparando times e lideranças para fazer o negócio avançar e sustentar o resultado. <span className='sm:hidden'>Toda transformação começa por um desafio.</span>
                        </p>

                        <MagneticButton>
                            <Link
                                href={pages.metodo_limao}
                                className='button button--green-neon whitespace-nowrap'
                            >
                                <span className='max-sm:hidden'>Toda transformação começa por um desafio. Qual o seu?</span>
                                <span className='sm:hidden'>Qual o seu?</span>
                            </Link>
                        </MagneticButton>

                    </div>
                </div>
            </section>

        </div>
	)
}
