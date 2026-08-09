import { cases as allCases } from '@/db/clientes'

// cases featured on the homepage
const featured = [
    'limonada-com-john-deere',
    'limonada-com-neoenergia',
    'limonada-com-boticario'
]

export const cases = featured
    .map((slug) => allCases.find((item) => item.slug === slug))
    .filter((item) => item !== undefined)
