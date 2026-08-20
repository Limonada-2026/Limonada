// libraries
import { Metadata } from 'next'

// components
import BannerTop from './BannerTop'
import TeamBlocks from './TeamBlocks'
import Lemons from './Lemons'
import ContactBlock from '@/components/ContactBlock'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'

// metadata
export const metadata: Metadata = {
	title: 'Quem somos | Limonada',
	description: 'A Limonada existe para potencializar pessoas que transformam desafios em decisões e ações e fazem a mudança acontecer.',
	alternates: {
		canonical: '/quem-somos'
	}
}

export default function QuemSomos() {
    return (
        <main>
            
            <BannerTop />

            <section className='section-space'>
                <div className='base-container'>
                    <div className='flex flex-col gap-4 md:items-center md:justify-center md:text-center'>

                        <AnimatedTitle
                            style='green-medium-green-vivid'
                            className='title-96 md:text-balance max-sm:text-5xl!'
                        >
                            Atuamos como uma boutique de desenvolvimento que entra no contexto da empresa, conecta novas perspectivas e transforma desafios em ações que movem pessoas, cultura e negócios.
                        </AnimatedTitle>

                        <p className='md:max-w-2xl md:mx-auto sm:mt-4 md:text-lg xl:text-xl md:text-balance text-green-medium'>
                            <AnimatedText text='No contato diário com líderes e equipes, ampliamos nosso repertório, trazemos nossos valores e fazemos limonadas.' />
                        </p>

                    </div>
                </div>
            </section>

            <TeamBlocks />

            <Lemons />

            <ContactBlock text='Acreditamos na escuta como elemento fundamental para criar jornadas de impacto. Quer nos contar o seu desafio hoje?' />

        </main>
    )
}