'use client'

// libraries
import { useEffect, useState } from 'react'

// components
import CaseBlock from '@/components/CaseBlock'
import PaginatedGrid from '@/components/PaginatedGrid'

// utils
import { pages } from '@/utils/routes'

// types
import type { Post } from '@/lib/wordpress/getPosts'

interface PostsProps {
    posts: Post[]
    perPage: number
    initialPage?: number
}

const imageSizes = ['square', 'vertical', 'horizontal'] as const
type ImageSize = typeof imageSizes[number]

function randomImageSizes(posts: Post[]) {
	return Object.fromEntries(
		posts.map((post) => [
			post.id,
			imageSizes[Math.floor(Math.random() * imageSizes.length)],
		])
	) as Record<number, ImageSize>
}

export default function Posts({ posts, perPage, initialPage }: PostsProps) {

    const [imageSizeByPost, setImageSizeByPost] = useState<Record<number, ImageSize>>({})

    useEffect(() => {
        setImageSizeByPost(randomImageSizes(posts))
    }, [posts])

    return (
        <PaginatedGrid
            items={posts}
            perPage={perPage}
            initialPage={initialPage}
            basePath={pages.ponto_de_vista}
            paginationLabel='Paginação dos posts'
            paginationClassName='mt-14 md:mt-20'
            className='grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-x-6 gap-y-10 md:gap-y-20 xl:gap-y-32 xl:[&>*:nth-child(2)]:mt-80 xl:[&>*:nth-child(3)]:mt-40'
            getKey={(post) => post.id}
            renderItem={(post) => (
                <CaseBlock
                    className='js-fade-up'
                    link={{
                        href: `${pages.ponto_de_vista}/${post.slug}`
                    }}
                    image={post.image}
                    imageSize={imageSizeByPost[post.id] ?? 'square'}
                    title={post.title}
                    description={post.description}
                    readingTime={post.readingTime}
                />
            )}
        />
    )
}
