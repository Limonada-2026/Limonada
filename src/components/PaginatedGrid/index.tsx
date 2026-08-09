'use client'

// libraries
import { Fragment, useCallback, useMemo, useRef, useState } from 'react'
import { Masonry } from 'grid-rows-masonry/react'
import { useTransitionState } from 'next-transition-router'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import clsx from 'clsx'

// components
import Pagination from '@/components/Pagination'

// utils
import { scrollViewportToElement } from '@/utils/scroll'

gsap.registerPlugin(ScrollTrigger)

// types
interface PaginatedGridProps<T> {
    items: T[]
    perPage: number
    basePath: string
    initialPage?: number
    className?: string
    paginationClassName?: string
    paginationLabel?: string
    getKey: (item: T) => string | number
    renderItem: (item: T) => React.ReactNode
}

export default function PaginatedGrid<T>({
    items,
    perPage,
    basePath,
    initialPage = 1,
    className,
    paginationClassName,
    paginationLabel,
    getKey,
    renderItem
}: PaginatedGridProps<T>) {

    const container = useRef<HTMLDivElement>(null)
    const { stage } = useTransitionState()

    const totalPages = Math.max(1, Math.ceil(items.length / perPage))
    const clamp = useCallback(
        (page: number) => Math.min(Math.max(page, 1), totalPages),
        [totalPages]
    )

    // the page the pagination shows, and the page currently painted
    const [page, setPage] = useState(() => clamp(initialPage))
    const [renderedPage, setRenderedPage] = useState(() => clamp(initialPage))

    // true while a page swap is mid-flight, so the reveal waits for the scroll
    const isPaging = useRef(false)

    const visibleItems = useMemo(
        () => items.slice((renderedPage - 1) * perPage, renderedPage * perPage),
        [items, renderedPage, perPage]
    )

    // the inner wrapper of every card, which is what actually animates
    const getBlockChildren = () => {
        if (!container.current) return []

        return gsap.utils
            .toArray<HTMLElement>('.js-fade-up', container.current)
            .flatMap((block) => Array.from(block.children) as HTMLElement[])
    }

    const goToPage = useCallback((target: number) => {

        const next = clamp(target)

        if (next === page || isPaging.current) return

        setPage(next)

        const children = getBlockChildren()

        if (children.length === 0) {
            setRenderedPage(next)
            return
        }

        isPaging.current = true

        // move to the top of the grid first, so the swap happens in view
        scrollViewportToElement(container.current, 140, .6, () => {

            // then fade the current page out and swap the items underneath
            gsap.to(children, {
                opacity: 0,
                y: '-1.5rem',
                duration: .25,
                stagger: .04,
                ease: 'power2.in',
                overwrite: true,
                onComplete: () => setRenderedPage(next)
            })
        })

    }, [clamp, page])

    useGSAP(() => {
        if (!container.current) return

        const viewport = document.getElementById('viewport')
        if (!viewport) return

        const blocks = gsap.utils.toArray<HTMLElement>('.js-fade-up', container.current)

        if (blocks.length === 0) return
        if (stage === 'leaving') return

        blocks.forEach(block => {
            gsap.set(block.children, {
                opacity: 0,
                y: '3rem'
            })
        })

        if (stage !== 'none') return

        let triggers: ScrollTrigger[] = []

        // reveals whatever sits in the viewport, then the rest on scroll
        const createTriggers = () => {
            triggers = ScrollTrigger.batch(blocks, {
                start: '0% 80%',
                scroller: viewport,
                onEnter: batch => {
                    batch.forEach((block, i) => {
                        gsap.to(block.children, {
                            opacity: 1,
                            y: 0,
                            duration: .6,
                            ease: 'power2.out',
                            delay: i * 0.125
                        })
                    })
                }
            })
        }

        // the swap changed the grid height, so measure again before revealing
        if (isPaging.current) {
            isPaging.current = false
            ScrollTrigger.refresh()
        }

        createTriggers()

        return () => {
            triggers.forEach(trigger => trigger.kill())
        }
    }, {
        scope: container,
        dependencies: [stage, renderedPage]
    })

    return (
        <>
            <div ref={container}>
                <Masonry
                    className={clsx('grid', className)}
                    style={{ gridTemplateRows: 'masonry' }}
                >
                    {visibleItems.map((item) => (
                        <Fragment key={getKey(item)}>
                            {renderItem(item)}
                        </Fragment>
                    ))}
                </Masonry>
            </div>

            <Pagination
                className={paginationClassName}
                basePath={basePath}
                currentPage={page}
                totalPages={totalPages}
                label={paginationLabel}
                onNavigate={goToPage}
            />
        </>
    )
}
