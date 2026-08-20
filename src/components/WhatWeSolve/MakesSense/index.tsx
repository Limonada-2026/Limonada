// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'

// svg
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'

// interface
interface MakesSenseProps {
    items: string[]
}

export default function MakesSense({ items }: MakesSenseProps) {
    return (
        <section className='section-space-half'>
            <div className='base-container'>

                <h2 className='text-2xl lg:text-3xl font-semibold text-green-medium mb-6 sm:mb-14'>
                    <AnimatedText text='Esse caminho faz sentido quando:' />
                </h2>

                <StaggerUp className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 text-green-medium'>
                    {items.map((item, i) => (
                        <div
                            className='inline-flex gap-2 sm:text-balance'
                            key={i}
                        >
                            <UxArrowRight className='min-w-3 h-3 translate-y-2' />
                            <span className='text-lg lg:text-xl'>{item}</span>
                        </div>
                    ))}
                </StaggerUp>

            </div>
        </section>
    )
}
