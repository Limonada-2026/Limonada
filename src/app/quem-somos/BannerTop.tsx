// libraries
import Image from 'next/image'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import LemonTrail from '@/components/Utils/Animations/LemonTrail'
import MagneticButton from '@/components/Utils/Animations/MagneticButton'

// image
import team from '@/assets/img/team-2.jpg'

export default function BannerTop() {
	return (
		<LemonTrail>
            <section className='menu-space bg-[#383438] rounded-bottom-corners relative z-3 overflow-hidden'>
                
                <div className='base-container relative z-2'>
                    <div className='flex flex-col gap-4 md:items-center max-w-6xl md:mx-auto section-space-half'>

                        <h1 className='text-2xl md:text-3xl xl:text-4xl font-semibold text-white md:text-center md:text-balance'>
                            <AnimatedText text='A Limonada existe para potencializar pessoas que tranformam desafios em decisões e ações e fazem a mudança acontecer.' />
                        </h1>

                        <h2 className='text-white md:text-lg max-w-4xl md:text-center md:text-balance'>
                            Conduzir a transformação pode ser azedo e desafiador. Azedo, para nós, é encarar o que ainda não está claro, fazer as perguntas certas e trabalhar o que precisa mudar de verdade.
                        </h2>

                    </div>
                </div>

                <div className='relative z-0 w-full -mt-[40vw] sm:-mt-[25vw]'>

                    <div className='absolute z-1 top-0 left-0 w-full h-1/3 bg-linear-to-b from-[#383438] to-transparent' />
                    
                    <div className='absolute z-2 top-0 left-0 w-full h-full flex items-center'>
                        <div className='base-container pt-[30vw] sm:pt-[10vw]'>
                            <div className='flex justify-between lg:justify-around items-center gap-4'>
                                {['Aline', 'Eduardo', 'Marcela'].map((name) => (
                                    <MagneticButton
                                        key={name}
                                        className='nth-[2]:mt-[30vw] sm:nth-[2]:mt-[20vw]'
                                    >
                                        <p className='text-sm lg:text-lg text-white font-medium px-6 sm:px-8 lg:px-10 py-2 rounded-4xl bg-black/30 backdrop-blur-xs border-t border-l border-white/50'>
                                            {name}
                                        </p>
                                    </MagneticButton>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Image
                        src={team.src}
                        alt='Equipe da Limonada'
                        priority
                        width={2200}
                        height={1551}
                        sizes='100vw'
                        className='w-full h-auto relative z-0 max-sm:w-[140vw] max-sm:max-w-[140vw] max-sm:-ml-[20vw]'
                    />

                </div>

            </section>
        </LemonTrail>
	)
}