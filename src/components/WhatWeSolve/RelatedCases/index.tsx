// components
import ClientsCases from '@/components/ClientsCases'

// db
import { cases as allCases } from '@/db/clientes'

// interface
interface RelatedCasesProps {
    slugs: string[]
}

export default function RelatedCases({ slugs }: RelatedCasesProps) {
    const featuredCases = slugs
        .map((slug) => allCases.find((item) => item.slug === slug))
        .filter((item) => item !== undefined)

    return (
        <ClientsCases cases={featuredCases} />
    )
}
