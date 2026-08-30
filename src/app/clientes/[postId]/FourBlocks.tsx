'use client'

// libraries
import Image from 'next/image'
import { useRef, useEffect, type CSSProperties } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation, Scrollbar, FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'

// interface
interface FourBlocksProps {
    items: {
        image: string
        title: string
        text: string
    }[]
}

export default function FourBlocks({ items }: FourBlocksProps) {

    const scrollbarRef = useRef<HTMLDivElement>(null)
    const swiperRef = useRef<SwiperType | null>(null)

    // never spread the items across more slots than there are items, otherwise
    // a case with three blocks leaves an empty column on desktop
    const slidesFor = (slots: number) => Math.min(slots, items.length)

    // the slides then grow to fill the row, but the illustrations should stay
    // the size they are on a full row. inside a slide 100% is the grown width,
    // so solve for the width the slide would have had with every slot filled.
    const imageCap = (slots: number, gap: number) => {
        const shown = slidesFor(slots)
        if (shown >= slots) return 'none'
        const offset = (shown - slots) * gap
        return `calc((100% * ${shown} - ${Math.abs(offset)}px) / ${slots})`
    }

    const imageCaps = {
        '--cap-sm': imageCap(2, 15),
        '--cap-lg': imageCap(3, 30),
        '--cap-xl': imageCap(4, 30)
    } as CSSProperties

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

	return (
		<section className='relative z-2 -mt-[30vw] sm:-mt-[20vw] lg:-mt-[15vw] xl:-mt-[10vw]'>
            <div className='base-container'>
                <Swiper
                    modules={[Navigation, Scrollbar, FreeMode, Mousewheel]}
                    allowTouchMove={true}
                    slidesPerView={slidesFor(1.5)}
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
                        576: {
                            slidesPerView: slidesFor(2)
                        },
                        992: {
                            slidesPerView: slidesFor(3),
                            spaceBetween: 30
                        },
                        1200: {
                            slidesPerView: slidesFor(4),
                            spaceBetween: 30
                        }
                    }}
                    className='overflow-visible!'
                >
                    {items.map((item, i) => (
                        <SwiperSlide
                            key={i}
                            className='h-auto!'
                        >
                            <div className='flex flex-col sm:gap-2 items-center justify-center text-center'>

                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={926}
                                    height={925}
                                    style={imageCaps}
                                    className='w-full h-auto sm:max-w-[var(--cap-sm)] lg:max-w-[var(--cap-lg)] xl:max-w-[var(--cap-xl)]'
                                />

                                <h2 className='text-xl lg:text-2xl font-semibold text-green-vivid'>
                                    {item.title}
                                </h2>

                                <p>
                                    {item.text}
                                </p>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
	)
}