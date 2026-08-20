'use client'

// libraries
import Image from 'next/image'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(ScrollTrigger)

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'

// interface
interface BannerTopProps {
	title: string
	description: string
	image: string
}

export default function BannerTop({
    title,
    description,
    image
}: BannerTopProps) {

    const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (sectionRef.current) {
            gsap.to('[data-bg]', {
                opacity: 0.1,
                scale: 1.2,
                scrollTrigger: {
                    scroller: document.getElementById('viewport') as HTMLElement,
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            })
        }
    }, {
        scope: sectionRef
    })

	return (
		<section
            className='menu-space bg-black rounded-bottom-corners relative z-3 overflow-hidden'
            ref={sectionRef}
        >
				
            <ScrollingImage>
                <Image
                    src={image}
                    alt={title}
                    priority
                    fill
                    sizes='100vw'
                    className='opacity-75'
                    data-bg
                />
            </ScrollingImage>

            <div className='base-container relative z-2'>
                <div className='flex flex-col gap-4 md:items-center max-w-4xl md:mx-auto section-space-half'>

                    <h1 className='title-96 text-white md:text-center'>
                        <AnimatedText text={title} />
                    </h1>

                    <h2 className='text-white md:text-lg xl:text-xl max-w-2xl md:text-center'>
                        {description}
                    </h2>

                </div>
            </div>

        </section>
	)
}