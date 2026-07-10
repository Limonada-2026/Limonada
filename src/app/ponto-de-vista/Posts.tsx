'use client'

// libraries
import { useEffect, useRef, useState } from 'react'
import { Masonry }  from 'grid-rows-masonry/react'
import { useTransitionState } from 'next-transition-router'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// components
import CaseBlock from '@/components/CaseBlock'

gsap.registerPlugin(ScrollTrigger)

// types
type Post = {
    id: number
    slug: string
    title: string
    description: string
    image: string
    logo: string
}

interface PostsProps {
    posts: Post[]
}

const imageSizes = ['square', 'vertical', 'horizontal'] as const
type ImageSize = typeof imageSizes[number]

function randomImageSizes(posts: Post[]) {
	return Object.fromEntries(
		posts.map((post) => [
			post.id,
			imageSizes[Math.floor(Math.random() * imageSizes.length)],
		])
	) as Record<number, ImageSize>
}

export default function Posts({ posts }: PostsProps) {

    const container = useRef<HTMLDivElement>(null)
    const { stage } = useTransitionState()
    const [imageSizeByPost, setImageSizeByPost] = useState<Record<number, ImageSize>>({})

    useEffect(() => {
        setImageSizeByPost(randomImageSizes(posts))
    }, [posts])

    useEffect(() => {
        if (Object.keys(imageSizeByPost).length === 0) return

        const timer = setTimeout(() => {
            ScrollTrigger.refresh(true)
        }, 100)

        return () => clearTimeout(timer)
    }, [imageSizeByPost])

    useGSAP(() => {
        if (!container.current) return

        const viewport = document.getElementById('viewport')
        if (!viewport) return

        const blocks = gsap.utils.toArray<HTMLElement>('.js-fade-up', container.current)

        if (blocks.length === 0) return
        if (stage === 'leaving') return

        blocks.forEach(block => {
            gsap.set(block.children, {
                opacity: 0,
                y: '3rem'
            })
        })

        if (stage !== 'none') return

        const triggers = ScrollTrigger.batch(blocks, {
            start: '0% 80%',
            scroller: viewport,
            onEnter: batch => {
                batch.forEach((block, i) => {
                    gsap.to(block.children, {
                        opacity: 1,
                        y: 0,
                        duration: .6,
                        ease: 'power2.out',
                        delay: i * 0.125
                    })
                })
            }
        })

        return () => {
            triggers.forEach(trigger => trigger.kill())
        }
    }, {
        scope: container,
        dependencies: [stage]
    })

    return (
        <div ref={container}>
            <Masonry
                className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-x-6 gap-y-10 md:gap-y-20 xl:gap-y-32 xl:[&>*:nth-child(2)]:mt-80 xl:[&>*:nth-child(3)]:mt-40'
                style={{ gridTemplateRows: 'masonry' }}
            >
                {posts.map((post) => (
                    <CaseBlock
                        key={post.id}
                        className='js-fade-up'
                        link={{
                            href: `/ponto-de-vista/${post.slug}`
                        }}
                        logo={post.logo}
                        image={post.image}
                        imageSize={imageSizeByPost[post.id] ?? 'square'}
                        title={post.title}
                        description={post.description}
                    />
                ))}

            </Masonry>
        </div>
    )
}
