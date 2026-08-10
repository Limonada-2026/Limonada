'use client'

// libraries
import clsx from 'clsx'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// interface
interface Props {
	children: React.ReactNode
	className?: string
    big?: boolean
}

export default function ScrollingImage({
	children,
	className,
    big = false
}: Props) {

	const item = useRef<HTMLDivElement>(null)

    const height = big ? '10rem' : '3rem'

	useGSAP(() => {
		const trigger = item.current
		if (!trigger) return

		const targets = trigger.children
		if (!targets.length) return

		const scroller = document.getElementById('viewport')
		if (!scroller) return

		Array.from(targets).forEach((child) => {
			child.classList.add('cover')
		})

		gsap.set(targets, {
			height: `calc(100% + ${height})`,
			display: 'block'
		})

		gsap.fromTo(targets, {
			y: `-${height}`
		}, {
			y: 0,
			ease: 'none',
			scrollTrigger: {
				scroller,
				trigger,
				scrub: true,
				end: 'bottom top',
				invalidateOnRefresh: true
			}
		})
	}, { scope: item })

	return (
		<div
			ref={item}
			className={clsx('absolute overflow-hidden top-0 left-0 w-full h-full', className)}
		>
			{children}
		</div>
	)
}
