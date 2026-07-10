'use client'

// linraries
import { TransitionRouter, useTransitionState } from 'next-transition-router'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
    children: React.ReactNode
}

// refresh scrolltrigger when page is ready
function ScrollTriggerRefresher() {
    const { isReady, stage } = useTransitionState()
    const hasRefreshedRef = useRef(false)

    useEffect(() => {
        // only refresh once when page transition is complete and page is ready
        if (isReady && stage === 'none' && !hasRefreshedRef.current) {
            hasRefreshedRef.current = true
            
            // wait one frame to ensure all components have mounted
            requestAnimationFrame(() => {

                // force refresh all instances once
                ScrollTrigger.refresh(true)
            })
        }
        
        // reset flag when entering a new page
        if (stage === 'entering') {
            hasRefreshedRef.current = false
        }
    }, [isReady, stage])

    return null
}

export default function PageTransition({
    children
}: Props) {

    const leaveAnimation = async () => {
        return new Promise((resolve) => {
            
            const allScrollTriggers = ScrollTrigger.getAll()

            const tl = gsap.timeline({
                onComplete: resolve
            })

            tl.to('[data-shutter]', {
                scaleY: 1.1,
                duration: .75,
                stagger: {
                    amount: 0.3,
                    from: 'end'
                },
                ease: 'power2.inOut',
                onComplete: () => {
                    // kill all ScrollTrigger instances from the current page before leaving
                    //console.log('Killing ScrollTrigger instances on leave:', allScrollTriggers.length)
                    allScrollTriggers.forEach((st) => {
                        st.kill()
                    })

                    gsap.set('[data-shutter]', {
                        transformOrigin: 'top'
                    })
                }
            })

            tl.to('#main-content', {
                yPercent: -3,
                duration: 1,
                ease: 'power2.inOut'
            }, '-=.9')

            tl.to('[data-overlay]', {
                opacity: 1,
                duration: 1,
                ease: 'power2.inOut'
            }, '-=1.1')

            tl.to('#main-content', {
                clearProps: true
            })
        })
    }

    const enterAnimation = async () => {
        return new Promise((resolve) => {
            const tl = gsap.timeline({
                onComplete: resolve
            })

            tl.to('[data-shutter]', {
                scaleY: 0,
                duration: .5,
                stagger: {
                    amount: 0.3,
                    from: 'end'
                },
                ease: 'power2.inOut',
                onComplete: () => {
                    gsap.set('[data-page-transition]', { clearProps: true })
                    gsap.set('[data-shutter]', { clearProps: true })
                }
            })

            tl.to('[data-overlay]', {
                opacity: 0,
                duration: 1,
                ease: 'power2.inOut'
            }, '-=.9')

        })
    }

    return (
        <TransitionRouter
            leave={async (next) => {
                await leaveAnimation()
                next()
            }}
            enter={async (next) => {
                await enterAnimation()
                next()
            }}
        >

            {children}

            <ScrollTriggerRefresher />

            <aside
                className='fixed z-999999 inset-0 pointer-events-none flex flex-col'
                data-page-transition
            >
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className='relative z-2 block w-full h-full bg-green-vivid scale-y-0 origin-bottom'
                        data-shutter
                    />
                ))}

                <div
                    className='absolute -z-1 inset-0 bg-black/75 opacity-0'
                    data-overlay
                />

            </aside>

        </TransitionRouter>
    )
}