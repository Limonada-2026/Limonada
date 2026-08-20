// libraries
import Link from 'next/link'
import clsx from 'clsx'

// icons
import { ChevronLeft, ChevronRight } from '@/components/Svg/Icons'

// types
interface PaginationProps {
    className?: string
    basePath: string
    currentPage: number
    totalPages: number
    label?: string
    // when set, paging is handled in place instead of navigating
    onNavigate?: (page: number) => void
}

// builds the visible page list, collapsing long ranges into ellipsis
function buildRange(currentPage: number, totalPages: number) {

    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const range: (number | 'ellipsis')[] = [1]

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    if (start > 2) range.push('ellipsis')

    for (let page = start; page <= end; page++) {
        range.push(page)
    }

    if (end < totalPages - 1) range.push('ellipsis')

    range.push(totalPages)

    return range
}

export default function Pagination({
    className,
    basePath,
    currentPage,
    totalPages,
    label = 'Paginação',
    onNavigate
}: PaginationProps) {

    if (totalPages <= 1) return null

    const hrefFor = (page: number) => page <= 1 ? basePath : `${basePath}?page=${page}`

    // hands the page over to onNavigate and cancels the route change
    const handleClick = (page: number) => (event: React.MouseEvent) => {
        if (!onNavigate) return
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

        event.preventDefault()
        onNavigate(page)
    }

    const range = buildRange(currentPage, totalPages)

    const arrowClass = 'flex items-center justify-center w-10 h-10 rounded-full bg-green-dark text-white transition-colors duration-300 hover:bg-green-medium'

    return (
        <nav
            aria-label={label}
            className={clsx('flex items-center justify-center gap-5 md:gap-8', className)}
        >

            {currentPage > 1 ? (
                <Link
                    href={hrefFor(currentPage - 1)}
                    onClick={handleClick(currentPage - 1)}
                    aria-label='Página anterior'
                    className={arrowClass}
                >
                    <ChevronLeft className='w-5 h-5' />
                </Link>
            ) : (
                <span
                    aria-hidden='true'
                    className={clsx(arrowClass, 'opacity-30 pointer-events-none')}
                >
                    <ChevronLeft className='w-5 h-5' />
                </span>
            )}

            <ul className='flex items-center gap-5 md:gap-7 text-green-dark'>
                {range.map((page, i) => (
                    <li key={`${page}-${i}`}>

                        {page === 'ellipsis' ? (
                            <span aria-hidden='true' className='opacity-50'>
                                &hellip;
                            </span>
                        ) : (
                            <Link
                                href={hrefFor(page)}
                                onClick={handleClick(page)}
                                aria-current={page === currentPage ? 'page' : undefined}
                                aria-label={`Página ${page}`}
                                className={clsx(
                                    'block underline-offset-6 decoration-1 transition-opacity duration-300',
                                    page === currentPage
                                        ? 'underline'
                                        : 'no-underline opacity-70 hover:opacity-100 hover:underline'
                                )}
                            >
                                {page}
                            </Link>
                        )}

                    </li>
                ))}
            </ul>

            {currentPage < totalPages ? (
                <Link
                    href={hrefFor(currentPage + 1)}
                    onClick={handleClick(currentPage + 1)}
                    aria-label='Próxima página'
                    className={arrowClass}
                >
                    <ChevronRight className='w-5 h-5' />
                </Link>
            ) : (
                <span
                    aria-hidden='true'
                    className={clsx(arrowClass, 'opacity-30 pointer-events-none')}
                >
                    <ChevronRight className='w-5 h-5' />
                </span>
            )}

        </nav>
    )
}
