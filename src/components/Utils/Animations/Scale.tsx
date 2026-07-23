'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
	className?: string
	children: React.ReactNode
}

export default function Scale({
	className,
	children
}: Props) {
	
	const item = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		if (item.current) {
		
			gsap.set(item.current, {
				scale: .75
			})

			gsap.to(item.current, {
				scale: 1,
				scrollTrigger: {
					trigger: item.current,
					scroller: document.getElementById('viewport') as HTMLElement,
					start: '-50% 100%',
					end: 'bottom 75%',
					scrub: true,
					//markers: true
				}
			})
		}
	})

	return (
		<div ref={item} className={className}>
			{children}
		</div>
	)
}