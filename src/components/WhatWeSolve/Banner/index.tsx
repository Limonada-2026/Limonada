// libraries
import Image, { StaticImageData } from 'next/image'

// components
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'

// interface
interface BannerProps {
    title: string
    subtitle: string
    image: StaticImageData
    imageAlt: string
    imageWidth: number
    imageHeight: number
}

export default function Banner({
    title,
    subtitle,
    image,
    imageAlt,
    imageWidth,
    imageHeight
}: BannerProps) {
    return (
        <section className='menu-space bg-black rounded-bottom-corners relative overflow-hidden'>

            <div className='base-container relative z-2'>

                <div className='flex flex-col lg:flex-row lg:items-end justify-end lg:justify-between gap-1 sm:gap-4 text-white min-h-100 h-[90svh] sm:h-[87svh] pb-12 lg:pb-16'>

                    <h1 className='text-2xl md:text-3xl xl:text-4xl font-semibold max-lg:mb-4 max-w-md text-balance'>
                        <AnimatedText text={title} />
                    </h1>

                    <h2 className='lg:text-lg xl:text-xl lg:text-right max-w-lg text-balance'>
                        {subtitle}
                    </h2>

                </div>

            </div>

            <ScrollingImage big>
                <Image
                    src={image}
                    alt={imageAlt}
                    width={imageWidth}
                    height={imageHeight}
                    priority
                    className='absolute z-0 inset-0 opacity-75'
                />
            </ScrollingImage>

        </section>
    )
}
