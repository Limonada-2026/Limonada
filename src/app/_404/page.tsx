// libraries
import { Link } from 'next-transition-router'
import { Metadata } from 'next'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'

// icons
import UxArrowLeft from '@/assets/svg/ux/arrow-left.svg'

// utils
import { pages } from '@/utils/routes'
import LemonTrail from '@/components/Utils/Animations/LemonTrail'

// metadata
export const metadata: Metadata = {
	title: 'Erro 404: Página não encontrada | Limonada',
	description: 'Parece que o link que você seguiu não está mais disponível.',
	alternates: {
		canonical: '/404'
	}
}

export default function Error404() {
	return (
		<main>
			<LemonTrail>
				<section className='bg-white text-center'>
					<div className='base-container min-h-svh flex flex-col items-center justify-center py-30 gap-4 sm:gap-10'>

						<h1 className='text-[40vw] sm:text-[35vw] xl:text-[30vw] font-semibold leading-[.8] mt-10 sm:mt-20 sm:tracking-tighter'>
							404
						</h1>

						<p className='lg:text-lg'>
							Parece que o link que você seguiu não está mais disponível.
						</p>

						<MagneticButton>
							<Link
								href={pages.home}
								className='button button--green-neon whitespace-nowrap gap-4!'
							>
								<UxArrowLeft className='w-3 h-3' /> Voltar para a Home
							</Link>
						</MagneticButton>

					</div>
				</section>
			</LemonTrail>
		</main>
	)
}
