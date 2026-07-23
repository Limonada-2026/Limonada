// libraries
import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'
import { Link } from 'next-transition-router'

// components
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import MagneticButton from '@/components/Utils/Animations/MagneticButton'

// icons
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'

// types
export interface ServiceBlockProps {
    className?: string
    image: StaticImageData
    title: string
    description: string
    href: string
}

export default function ServiceBlock({
    className,
    image,
    title,
    description,
    href
}: ServiceBlockProps) {
	return (
		<div className={clsx('relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl bg-black', className)}>

            <ScrollingImage>
                <Image
                    src={image}
                    alt={title}
                    className='w-full h-full object-cover opacity-80'
                    fill
                />
            </ScrollingImage>

            <div className='flex flex-col justify-between gap-6 relative z-3 w-full min-h-120 sm:min-h-100 lg:min-h-[40vw] xl:min-h-[33vw] p-6 md:p-10'>

                <h3 className='text-3xl xl:text-4xl text-white'>
                    {title}
                </h3>

                <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4 w-full'>

                    <p className='text-white md:max-w-sm'>
                        {description}
                    </p>

                    <MagneticButton>
                        <Link
                            href={href}
                            className='button button--green-neon whitespace-nowrap gap-4!'
                        >
                            Descruba <UxArrowRight className='w-3 h-3' />
                        </Link>
                    </MagneticButton>

                </div>

            </div>
            
		</div>
	)
}