// components
import ClientsSlider from '@/components/ClientsSlider'
import TeamBanner from '@/components/TeamBanner'
import ContactFormSmall from '@/components/ContactFormSmall'

// ISR
export const revalidate = 3600

export default function Home() {
	return (
		<main>

			<div className='min-h-[50svh] bg-red-400 block w-full' />
			
			{/*
			<ClientsSlider />
			*/}

			<TeamBanner />

			<ContactFormSmall />

		</main>
	)
}
