// libraries
import clsx from 'clsx'

// components
import CaseBlock from '@/components/CaseBlock'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'

// utils
import { pages } from '@/utils/routes'

// types
import type { Case } from '@/db/clientes'

export interface CasesGridProps {
    className?: string
    cases: Case[]
    perRow?: number
}

export default function CasesGrid({
    className,
    cases,
    perRow = 3
}: CasesGridProps) {
    return (
        <StaggerUp className={clsx(
            'grid md:grid-cols-2 gap-10 md:gap-6',
            perRow === 3 && 'lg:grid-cols-3',
            className
        )}>
            {cases.map((item) => (
                <div key={item.id}>
                    <CaseBlock
                        className='group'
                        link={{
                            href: `${pages.clientes}/${item.slug}`
                        }}
                        image={item.image}
                        imageSize='fixed'
                        logo={item.logo}
                        title={item.client}
                        description={item.subtitle}
                    />
                </div>
            ))}
        </StaggerUp>
    )
}
