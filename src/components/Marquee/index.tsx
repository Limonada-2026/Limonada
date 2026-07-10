'use client'

// libraries
import { useRef } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

// utils
import { horizontalLoop } from '@/utils/horizontalLoop'

// interface
interface Props {
    logos: {
        src: string
        alt: string
    }[]
    className?: string
    reverse?: boolean
}

export default function Marquee({
    logos,
    className,
    reverse = false
}: Props) {
    
    const logosContainer = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const logos = gsap.utils.toArray('.logo' ) as HTMLElement[]
        const loop = horizontalLoop(logos, { repeat: -1, reversed: reverse })

    },{
        scope: logosContainer,
        dependencies: [reverse]
    })

    return (
        <div
            className={clsx('relative overflow-hidden flex items-center w-full', className)}
            ref={logosContainer}
        >
            {logos.map((item, i) => (
                <div
                    key={i}
                    className='logo flex items-center justify-center px-4 md:px-10 xl:px-15 shrink-0'
                >
                    <Image
                        src={item.src}
                        alt={item.alt}
                        width={100}
                        height={100}
                        className='block w-[35vw] md:w-[20vw] xl:w-[12vw] max-h-10 sm:max-h-10 md:max-h-12 xl:max-h-[3vw] h-auto object-contain brightness-0'
                    />
                </div>
            ))}
        </div>
    )
}