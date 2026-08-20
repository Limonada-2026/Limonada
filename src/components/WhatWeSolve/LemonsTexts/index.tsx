// libraries
import Image from 'next/image'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'

// interface
interface LemonsTextsItem {
    image: string
    title: string
    text: string
}

interface LemonsTextsProps {
    items: LemonsTextsItem[]
}

export default function LemonsTexts({ items }: LemonsTextsProps) {
    return (
        <section>
            <div className='base-container'>

                <div className='w-full block h-px bg-gray-300' />

                <div className='section-space-half'>

                    <h2 className='text-2xl lg:text-3xl font-semibold mb-2'>
                        <AnimatedText text='O que precisa evoluir na liderança para conduzir a transformação?' />
                    </h2>

                    <p className='lg:text-lg'>
                        <AnimatedText text='As temáticas mais frequentes:' />
                    </p>

                    <StaggerUp className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 mt-8 lg:mt-14'>
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className='flex flex-col gap-1 sm:gap-4'
                            >

                                <Image
                                    src={`/img/svg/lemon-${item.image}.svg`}
                                    alt={item.title}
                                    width={125}
                                    height={90}
                                    className='w-24 sm:w-28 h-auto max-sm:mb-2'
                                />

                                <h3 className='font-semibold text-green-medium text-lg lg:text-xl sm:text-balance'>
                                    {item.title}
                                </h3>

                                <p className='sm:text-balance lg:text-lg'>
                                    {item.text}
                                </p>

                            </div>
                        ))}
                    </StaggerUp>

                </div>

            </div>
        </section>
    )
}
