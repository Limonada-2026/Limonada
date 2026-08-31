'use client'

// libraries
import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation, FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import Counter from '@/components/Utils/Animations/Counter'

// icons
import { ChevronLeft, ChevronRight } from '@/components/Svg/Icons'

// interface
interface NumbersProps {
    title: string
    items: {
        hasPlus?: boolean
        number: number
        decimals?: number
        suffix?: string
        display?: string
        // second half of a range, counted up alongside the first
        rangeEnd?: number
        text: string
    }[]
}

export default function Numbers({ title, items }: NumbersProps) {

    const swiperRef = useRef<SwiperType | null>(null)

    // starts hidden so the arrows only appear once swiper confirms there is overflow
    const [isLocked, setIsLocked] = useState(true)

    const handleSwiper = (swiper: SwiperType) => {
        swiperRef.current = swiper
        setIsLocked(swiper.isLocked)
    }

	return (
		<section className='section-space'>
            <div className='base-container'>

                <div className='flex items-center justify-between gap-4 mb-4'>

                    <h2 className='text-2xl md:text-3xl xl:text-4xl font-semibold block mb-2 md:mb-4'>
                        <AnimatedText text={title} />
                    </h2>

                    {!isLocked && (
                    <div className='flex items-center gap-1 sm:gap-2'>

                        <button
                            className='w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white cursor-pointer transition-colors hover:bg-black duration-200'
                            type='button'
                            onClick={() => swiperRef.current?.slidePrev()}
                        >
                            <ChevronLeft className='w-4 h-4' />
                        </button>

                        <button
                            className='w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white cursor-pointer transition-colors hover:bg-black duration-200'
                            type='button'
                            onClick={() => swiperRef.current?.slideNext()}
                        >
                            <ChevronRight className='w-4 h-4' />
                        </button>

                    </div>
                    )}

                </div>

                <Swiper
                    modules={[Navigation, FreeMode, Mousewheel]}
                    allowTouchMove={true}
                    slidesPerView={1}
                    spaceBetween={5}
                    freeMode={true}
                    mousewheel={{
                        forceToAxis: true
                    }}
                    simulateTouch
                    watchOverflow
                    onSwiper={handleSwiper}
                    onLock={() => setIsLocked(true)}
                    onUnlock={() => setIsLocked(false)}
                    onResize={(swiper) => setIsLocked(swiper.isLocked)}
                    onBreakpoint={(swiper) => setIsLocked(swiper.isLocked)}
                    breakpoints={{
                        576: {
                            slidesPerView: 1.5
                        },
                        992: {
                            slidesPerView: 2,
                            spaceBetween: 30
                        },
                        1200: {
                            slidesPerView: 3,
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
                            <div className='flex flex-col'>

                                <h2 className='text-[5rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] leading-[1.1] text-green-vivid'>
                                    {item.hasPlus && '+'}
                                    {item.display ? item.display : (
                                        <>
                                            <Counter
                                                number={item.number}
                                                decimals={item.decimals}
                                            />
                                            {item.rangeEnd !== undefined && (
                                                <>
                                                    -
                                                    <Counter
                                                        number={item.rangeEnd}
                                                        decimals={item.decimals}
                                                    />
                                                </>
                                            )}
                                        </>
                                    )}
                                    {item.suffix}
                                </h2>

                                <p className='sm:text-lg lg:text-xl text-green-medium'>
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