// components
import BannerHome from '@/components/BannerHome'
import BlocksHome from '@/components/BlocksHome'
import LemonVideo from '@/components/LemonVideo'
import ClientsSlider from '@/components/ClientsSlider'
import CasesGrid from '@/components/CasesGrid'
import TeamBanner from '@/components/TeamBanner'
import ContactFormSmall from '@/components/ContactFormSmall'

import AnimatedText from '@/components/Utils/Animations/AnimatedText'

// wordpress
import { getCasesBySlugs } from '@/lib/wordpress/getCases'

// cases featured on the homepage
const featured = [
	'limonada-com-john-deere',
	'limonada-com-neoenergia',
	'limonada-com-boticario'
]

export default async function Home() {

	const cases = await getCasesBySlugs(featured)
	return (
		<main>

			<BannerHome />

			<BlocksHome />

			<LemonVideo />
			
			<ClientsSlider />

			<section className='section-space'>
				<div className='base-container'>

					<h2 className='text-2xl md:text-3xl xl:text-4xl font-semibold'>
						<AnimatedText text='Transformando limões em limonada' />
					</h2>

					<p className='max-w-4xl block mt-2 md:mt-4 mb-6 md:mb-8 lg:mb-10 lg:text-lg'>
						Como uma boutique, partimos do contexto de cada desafio para construir jornadas de desenvolvimento que apoiam decisões e desdobram em ação, preparando times e lideranças para fazer o negócio avançar e sustentar o resultado.
					</p>

					<CasesGrid cases={cases} />

				</div>
			</section>

			<TeamBanner />

			<ContactFormSmall />

		</main>
	)
}
