// components
import ClientsCases from '@/components/ClientsCases'

// wordpress
import { getCasesBySlugs } from '@/lib/wordpress/getCases'

// interface
interface RelatedCasesProps {
    slugs: string[]
}

export default async function RelatedCases({ slugs }: RelatedCasesProps) {
    const featuredCases = await getCasesBySlugs(slugs)

    return (
        <ClientsCases cases={featuredCases} />
    )
}
