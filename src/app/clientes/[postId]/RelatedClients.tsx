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

// utils
import { pages } from '@/utils/routes'

// types
import type { Case } from '@/db/clientes'

interface RelatedClientsProps {
    cases: Case[]
}

export default function RelatedClients({ cases }: RelatedClientsProps) {

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

    if (cases.length === 0) return null

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
                {cases.map((item) => (
                    <SwiperSlide
                        key={item.id}
                        className='h-auto!'
                    >
                        <CaseBlock
                            className='group'
                            link={{
                                href: `${pages.clientes}/${item.slug}`
                            }}
                            image={item.image}
                            imageSize='horizontal'
                            logo={item.logo}
                            title={item.client}
                            description={item.subtitle}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
