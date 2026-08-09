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
	logo: string
    tags: string[]
}

export default function BannerTop({
    title,
    description,
    image,
    logo,
    tags
}: BannerTopProps) {

    const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (sectionRef.current) {
            gsap.to('[data-bg]', {
                opacity: 0.1,
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
                    className='opacity-50'
                    data-bg
                />
            </ScrollingImage>

            <div className='base-container relative z-2 min-h-svh flex flex-col sm:items-center justify-center sm:text-center gap-8'>

                <Image
                    src={logo}
                    alt={title}
                    width={200}
                    height={150}
                    priority
                    className='w-60 sm:w-80 h-auto flex brightness-200 invert'
                />

                <div className='flex flex-col gap-4 items-center justify-center max-w-2xl'>

                    <h1 className='text-white text-3xl font-semibold'>
                        <AnimatedText text={title} />
                    </h1>

                    <h2 className='text-white md:text-lg'>
                        {description}
                    </h2>

                </div>

                <div className='flex items-center sm:justify-center gap-2 flex-wrap text-center sm:mt-4 lg:mt-10'>
                    {tags.map((tag) => (
                        <span key={tag} className='text-white border rounded-sm px-4 sm:px-6 py-1 sm:py-2'>
                            {tag}
                        </span>
                    ))}
                </div>

            </div>

        </section>
	)
}