'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
	number: number
	decimals?: number
	// held back this many seconds after the trigger, so a row of counters can
	// start one after another instead of all at once
	delay?: number
	className?: string
}

export default function Counter({
	number,
	decimals = 0,
	delay = 0,
	className
}: Props) {

	const item = useRef<HTMLSpanElement>(null)

	useGSAP(() => {
		if (item.current) {

			// format the number in Brazilian standard (e.g., 1.000, 10.000, 9,74)
			function formatBrazilianNumber(value: number | string) {
				if (decimals === 0) {
					return Math.floor(+value).toLocaleString('pt-BR')
				}

				return (+value).toLocaleString('pt-BR', {
					minimumFractionDigits: decimals,
					maximumFractionDigits: decimals
				})
			}

			gsap.set(item.current, {
				textContent: 0
			})

			gsap.to(item.current, {
				textContent: number,
				duration: 3,
				delay,
				ease: 'power2.inOut',
				modifiers: {
					textContent: (value) => formatBrazilianNumber(value)
				},
				scrollTrigger: {
					scroller: document.getElementById('viewport') as HTMLElement,
					trigger: item.current,
					start: 'top 90%',
					toggleActions: 'play none none reverse'
				}
			})
		}
	}, { dependencies: [number, decimals, delay] })

	return (
		<span
			ref={item}
			className={className}
		>
			{number.toLocaleString('pt-BR', {
				minimumFractionDigits: decimals,
				maximumFractionDigits: decimals
			})}
		</span>
	)
}
