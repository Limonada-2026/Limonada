'use client'

// libraries
import { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation, Scrollbar, FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'

// components
import CaseBlock from '@/components/CaseBlock'

// types
import type { Post } from '@/lib/wordpress/getPosts'

interface RelatedPostsProps {
    posts: Post[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {

    const scrollbarRef = useRef<HTMLDivElement>(null)
    const swiperRef = useRef<SwiperType | null>(null)

    const handleSwiper = (swiper: SwiperType) => {
        swiperRef.current = swiper
    }

    // set scrollbar element and initialize
    useEffect(() => {
        if (swiperRef.current && scrollbarRef.current) {
            if (swiperRef.current.scrollbar) {
                swiperRef.current.scrollbar.el = scrollbarRef.current
                swiperRef.current.scrollbar.init()
                swiperRef.current.scrollbar.updateSize()
                swiperRef.current.update()
            }
        }
    }, [])

    if (posts.length === 0) return null

    return (
        <div className='relative w-full'>
            <Swiper
                modules={[Navigation, Scrollbar, FreeMode, Mousewheel]}
                allowTouchMove={true}
                slidesPerView={1.1}
                spaceBetween={15}
                freeMode={true}
                mousewheel={{
                    forceToAxis: true
                }}
                scrollbar={{
                    draggable: true
                }}
                simulateTouch
                onSwiper={handleSwiper}
                breakpoints={{
                    768: {
                        slidesPerView: 2
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    }
                }}
                className='overflow-visible!'
            >
                {posts.map((post) => (
                    <SwiperSlide
                        key={post.id}
                        className='h-auto!'
                    >
                        <CaseBlock
                            link={{
                                href: `/ponto-de-vista/${post.slug}`
                            }}
                            image={post.image}
                            imageSize='horizontal'
                            title={post.title}
                            description={post.description}
                            readingTime={post.readingTime}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
