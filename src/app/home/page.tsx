// components
import ClientsSlider from '@/components/ClientsSlider'
import CaseBlock from '@/components/CaseBlock'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'

// temp db
import { cases } from '@/temp-db/home'

import TeamBanner from '@/components/TeamBanner'
import ContactFormSmall from '@/components/ContactFormSmall'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'

// ISR
export const revalidate = 3600

export default function Home() {
	return (
		<main>

			<div className='min-h-[50svh] bg-red-400 block w-full' />
			
			<ClientsSlider />

			<section className='section-space'>
				<div className='base-container'>

					<h2 className='text-2xl md:text-3xl xl:text-4xl font-bold'>
						<AnimatedText text='Transformando limões em limonada' />
					</h2>

					<p className='max-w-4xl block mt-2 md:mt-4 mb-6 md:mb-8 lg:mb-10'>
						Como uma boutique, partimos do contexto de cada desafio para construir jornadas de desenvolvimento que apoiam decisões e desdobram em ação, preparando times e lideranças para fazer o negócio avançar e sustentar o resultado.
					</p>

					<StaggerUp className='grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6'>
						{cases.map((item) => (
							<div key={item.id}>
								<CaseBlock
									className='group'
									link={{
										href: `/clientes/${item.slug}`
									}}
									image={item.image}
									imageSize='fixed'
									logo={item.logo}
									title={item.title}
									description={item.description}
								/>
							</div>
						))}
					</StaggerUp>

				</div>
			</section>

			<TeamBanner />

			<ContactFormSmall />

		</main>
	)
}
