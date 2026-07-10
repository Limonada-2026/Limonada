// libraries
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

// components
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'

// types
interface CaseBlockProps {
    className?: string
    title?: string
    description?: string
    image: string
    imageSize: 'fixed' | 'horizontal' | 'vertical' | 'square'
    logo?: string
    link?: {
        href: string
        isExternal?: boolean
    }
}

export default function CaseBlock({
    className,
    title,
    description,
    image,
    imageSize,
    logo,
    link
}: CaseBlockProps) {

    const content = (
        <>
            
            <span className={clsx(
                'relative overflow-hidden flex items-center justify-center w-full rounded-xl lg:rounded-xl bg-black',
                imageSize === 'fixed' && 'h-75',
                imageSize === 'horizontal' && 'aspect-4/3',
                imageSize === 'vertical' && 'aspect-[3/3.75]',
                imageSize === 'square' && 'aspect-square'
            )}>

                {logo && (
                    <span
                        aria-hidden='true'
                        className='relative z-2 w-[45%] h-[45%] object-contain bg-white'
                        style={{
                            WebkitMaskImage: `url(${logo})`,
                            maskImage: `url(${logo})`,
                            WebkitMaskRepeat: 'no-repeat',
                            maskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                            maskPosition: 'center',
                            WebkitMaskSize: 'contain',
                            maskSize: 'contain'
                        }}
                    />
                )}

                <ScrollingImage>
                    <Image
                        src={image}
                        alt={title || description || ''}
                        width={600}
                        height={500}
                        loading='lazy'
                        className={clsx(
                            'object-cover object-center w-full h-full absolute z-0 inset-0',
                            logo && 'opacity-50 transition-opacity duration-300 group-hover:opacity-20'
                        )}
                    />
                </ScrollingImage>

            </span>

            {title && (
                <h3 className='font-bold text-lg md:text-xl mt-4'>
                    {title}
                </h3>
            )}

            {description && (
                <p>
                    {description}
                </p>
            )}
        </>
    )

    return (
        link ? (
            <Link
                href={link.href}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : ''}
                className={clsx('relative h-fit group', className)}           
            >
                <span className='flex flex-col gap-2'>

                    {content}

                    <span className='hover-underline text-green-medium font-bold group-hover:bg-size-[100%_.05em]'>
                        Leia mais
                    </span>

                </span>
            </Link>
        ) : (
            <div className={clsx('relative h-fit', className)}>
                <span className='flex flex-col gap-2'>
                    {content}
                </span>
            </div>
        )
    )
}