// libraries
import clsx from 'clsx'
import Image from 'next/image'
import { Link } from 'next-transition-router'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'

// images
import lemons from '@/assets/img/lemons-bg.jpg'

// utils
import { pages } from '@/utils/routes'

// interface
interface ContactBlockProps {
    text?: string
}

export default function ContactBlock({
    text = 'Transforme seus limões em limonada'
}: ContactBlockProps) {
	return (
		<section className='relative overflow-hidden py-14 sm:py-20 lg:py-30 rounded-tl-2xl rounded-tr-2xl sm:rounded-tl-4xl sm:rounded-tr-4xl md:rounded-tl-[3rem] md:rounded-tr-[3rem] md:-mb-12'>

            <ScrollingImage big>
                <Image
                    src={lemons}
                    alt='Lemons'
                    width={1000}
                    height={1000}
                    className='absolute z-0 inset-0 w-full h-full object-cover'
                    loading='lazy'
                />
            </ScrollingImage>

            <div className='base-container my-10 lg:my-[7vw] relative z-2'>
                <div className='bg-green-dark rounded-corners py-13 lg:py-[7vw] text-center'>

                    <h2 className='text-green-light block mb-6 md:mb-8 text-2xl md:text-3xl font-semibold sm:text-balance'>
                        <AnimatedText text={text} />
                    </h2>

                    <MagneticButton className='mx-auto'>
                        <Link
                            href={pages.contato}
                            className='button button--green-neon whitespace-nowrap'
                        >
                            Vamos conversar
                        </Link>
                    </MagneticButton>

                </div>
            </div>

        </section>
	)
}