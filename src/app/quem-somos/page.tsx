// libraries
import { Metadata } from 'next'

// components
import BannerTop from './BannerTop'
import ContactBlock from '@/components/ContactBlock'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'

// images
import banner from '@/assets/img/lemons-bg-2.jpg'

// metadata
export const metadata: Metadata = {
	title: 'Quem somos | Limonada',
	description: 'A Limonada existe para potencializar pessoas que tranformam desafios em decisões e ações e fazem a mudança acontecer.',
	alternates: {
		canonical: '/quem-somos'
	}
}

export default function QuemSomos() {
    return (
        <main>
            
            <BannerTop />

            <section className='section-space-half'>
                <div className='base-container'>
                    <div className='flex flex-col gap-4 md:items-center md:justify-center md:text-center'>

                        <h2 className='text-2xl lg:text-3xl font-semibold'>
                            <AnimatedText text='As 5 etapas do Método Limão:' />
                        </h2>

                        <p className='md:max-w-sm md:mx-auto pb-14'>
                            Da primeira conversa à análise de impacto, é assim que cocriamos jornadas de aprendizagem.
                        </p>

                    </div>
                </div>
            </section>

            <ContactBlock text='Acreditamos na escuta como elemento fundamental para criar jornadas de impacto. Quer nos contar o seu desafio hoje?' />

        </main>
    )
}