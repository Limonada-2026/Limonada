'use client'

// components
import CaseBlock from '@/components/CaseBlock'
import PaginatedGrid from '@/components/PaginatedGrid'

// utils
import { pages } from '@/utils/routes'

// types
import type { Case } from '@/lib/wordpress/getCases'

interface CasesProps {
    cases: Case[]
    perPage: number
    initialPage?: number
}

export default function Cases({ cases, perPage, initialPage }: CasesProps) {
    return (
        <PaginatedGrid
            items={cases}
            perPage={perPage}
            initialPage={initialPage}
            basePath={pages.clientes}
            paginationLabel='Paginação dos cases'
            paginationClassName='mt-14 md:mt-20'
            className='grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-x-6 gap-y-10 md:gap-y-20 xl:gap-y-32 xl:[&>*:nth-child(2)]:mt-80 xl:[&>*:nth-child(3)]:mt-40'
            getKey={(item) => item.id}
            renderItem={(item) => (
                <CaseBlock
                    className='js-fade-up group'
                    link={{
                        href: `${pages.clientes}/${item.slug}`
                    }}
                    image={item.image}
                    imageSize='horizontal'
                    logo={item.logo}
                    title={item.client}
                    description={item.subtitle}
                />
            )}
        />
    )
}
