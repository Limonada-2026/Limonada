'use client'

// libraries
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// interface
interface Props {
	video: string
	className?: string
	loopRewind?: boolean
}

export default function Video({
	video,
	className,
	loopRewind = false
}: Props) {

	const videoWrapperRef = useRef<HTMLDivElement>(null)
	const videoRef = useRef<HTMLVideoElement>(null)
	const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

	useGSAP(() => {
		if (!videoWrapperRef.current || !videoRef.current) return

		const videoElement = videoRef.current
		let rafId = 0
		let rewinding = false
		let lastTimestamp = 0

		const stopRewind = () => {
			cancelAnimationFrame(rafId)
			rafId = 0
			rewinding = false
			lastTimestamp = 0
		}

		const startRewind = () => {
			if (rewinding) return
			rewinding = true
			videoElement.pause()
			lastTimestamp = 0

			const step = (timestamp: number) => {
				if (!rewinding) return

				if (!lastTimestamp) lastTimestamp = timestamp
				const delta = (timestamp - lastTimestamp) / 1000
				lastTimestamp = timestamp

				const nextTime = Math.max(0, videoElement.currentTime - delta)
				videoElement.currentTime = nextTime

				if (nextTime <= 0) {
					stopRewind()
					safePlay(videoElement)
					return
				}

				rafId = requestAnimationFrame(step)
			}

			rafId = requestAnimationFrame(step)
		}

		const safePlay = async (element: HTMLVideoElement) => {
			stopRewind()
			try {
				await element.play()
			} catch (error) {
				if (error instanceof Error && error.name !== 'AbortError') {
					console.warn('Video play error:', error)
				}
			}
		}

		const pause = () => {
			stopRewind()
			videoElement.pause()
		}

		const onEnded = () => {
			if (loopRewind) startRewind()
		}

		if (loopRewind) {
			videoElement.addEventListener('ended', onEnded)
		}

		scrollTriggerRef.current = ScrollTrigger.create({
			scroller: document.getElementById('viewport'),
			trigger: videoWrapperRef.current,
			start: '0% 120%',
			end: '100% -20%',
			onEnter: () => safePlay(videoElement),
			onEnterBack: () => safePlay(videoElement),
			onLeave: pause,
			onLeaveBack: pause
		})

		return () => {
			stopRewind()
			videoElement.removeEventListener('ended', onEnded)
			if (scrollTriggerRef.current) {
				scrollTriggerRef.current.kill()
				scrollTriggerRef.current = null
			}
			videoElement.pause()
		}
	}, {
		scope: videoWrapperRef,
		dependencies: [loopRewind]
	})

	return (
		<div ref={videoWrapperRef} className={className}>
			<video
				ref={videoRef}
				loop={!loopRewind}
				muted
				playsInline
				className='w-full h-full object-cover'
			>
				<source
					src={video}
					type='video/mp4'
				/>
			</video>
		</div>
	)
}
