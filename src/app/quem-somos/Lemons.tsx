'use client'

// libraries
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Scrollbar, FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/scrollbar'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'

export default function Lemons() {

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

    return (
        <section className='section-space'>
            <div className='base-container'>

                <h2 className='text-2xl lg:text-3xl font-semibold mb-6 sm:mb-14'>
                    <AnimatedText text='Nossos Valores' />
                </h2>
                
                <Swiper
                    modules={[Scrollbar, FreeMode, Mousewheel]}
                    allowTouchMove={true}
                    slidesPerView={1.2}
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
                            slidesPerView: 2
                        },
                        768: {
                            slidesPerView: 3
                        },
                        992: {
                            slidesPerView: 4,
                            spaceBetween: 30
                        },
                        1200: {
                            slidesPerView: 5,
                            spaceBetween: 30
                        }
                    }}
                    className='overflow-visible!'
                >
                    {[
                        {
                            image: '/img/svg/lemon-1.svg',
                            title: 'Pessoas',
                            text: 'Feita por pessoas e para pessoas que movem negócios com propósito.'
                        },
                        {
                            image: '/img/svg/lemon-2.svg',
                            title: 'Conexão',
                            text: 'Conectamos repertório, parceiros e negócio para gerar transformação.'
                        },
                        {
                            image: '/img/svg/lemon-3.svg',
                            title: 'Inovação',
                            text: 'Trazemos o que é relevante no mundo para dentro do que é real no negócio.'
                        },
                        {
                            image: '/img/svg/lemon-4.svg',
                            title: 'Desafios',
                            text: 'Nossos olhos brilham por habilidades que ainda precisam ser desenvolvidas.'
                        },
                        {
                            image: '/img/svg/lemon-5.svg',
                            title: 'Agilidade',
                            text: 'Na velocidade que os negócios precisam.'
                        }
                    ].map((item, i) => (
                        <SwiperSlide key={i}>
                            <div className='flex flex-col gap-2 sm:text-center'>
                                
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={265}
                                    height={192}
                                    className='max-w-full w-54 h-full object-contain sm:mx-auto max-sm:-ml-2'
                                />

                                <h3 className='text-2xl text-green-medium font-semibold mt-3'>
                                    {item.title}
                                </h3>

                                <p className='text-green-medium sm:mx-auto w-[90%] text-balance'>
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