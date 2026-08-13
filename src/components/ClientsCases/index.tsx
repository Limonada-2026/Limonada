// libraries
import clsx from 'clsx'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import CasesGrid, { CasesGridProps } from '@/components/CasesGrid'

// interface
interface ClientsCasesProps {
    className?: string
    title?: string
    cases: CasesGridProps['cases']
    howMany?: number
}

export default function ClientsCases({
    className,
    title = 'O método Limão é vivo e se adapta a cada projeto.',
    cases,
    howMany = 2
}: ClientsCasesProps) {
    return (
        <section className={clsx('section-space-half', className)}>
            <div className='base-container'>

                <h2 className='text-2xl lg:text-3xl font-semibold mb-4 lg:mb-8'>
                    <AnimatedText text={title} />
                </h2>

                <CasesGrid
                    cases={cases}
                    perRow={howMany}
                />

            </div>
        </section>
    )
}