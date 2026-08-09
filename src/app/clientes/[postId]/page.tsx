// libraries
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import BannerTop from './BannerTop'
import FourBlocks from './FourBlocks'
import Numbers from './Numbers'
import Testimonials from './Testimonials'
import ContactBlock from '@/components/ContactBlock'

// images
import image1 from '@/assets/img/clients-01.png'
import image2 from '@/assets/img/clients-02.png'
import image3 from '@/assets/img/clients-03.png'
import image4 from '@/assets/img/clients-04.png'

export default function ClientePost() {
	return (
		<main>

			<BannerTop
				image='/img/clients/featured/john-deere.jpg'
				logo='/img/clients/john-deere.svg'
				title='John Deere: uma nova perspectiva para um programa consolidado'
				description='Como redesenhamos uma jornada de desenvolvimento para manter a liderança preparada para os desafios de um negócio em constante transformação.'
				tags={['Liderança', 'Jornada personalizada']}
			/>

			<section className='relative z-2 bg-green-vivid section-padding rounded-bottom-corners -mt-4 sm:-mt-8 md:-mt-12'>
				<div className='base-container pt-4 sm:pt-8 md:pt-12'>
					<div className='row'>

						<div className='col-lg-6'>
							<AnimatedTitle
								style='green-black'
								className='title-96 mb-6'
							>
								O Limão
							</AnimatedTitle>
						</div>

						<div className='col-lg-6 pt-1'>
							<p className='lg:text-lg'>
								O eLAP, programa de desenvolvimento de lideranças da John Deere, faz parte da história da companhia há uma década. Mas o negócio mudou, os mercados mudaram, e o programa precisava de uma nova perspectiva para continuar relevante.<br /><br />

								A complexidade real apareceu rápido: lideranças no Brasil, na Argentina e no México, com a mesma base cultural da empresa, mas enfrentando desafios locais diferentes.<br /><br />

								O desafio da Limonada era construir uma jornada capaz de conectar desenvolvimento individual, estratégia de negócio e transformação organizacional. Assim, o desenvolvimento das lideranças acontecia sempre ligado aos desafios reais da operação.
							</p>
						</div>

					</div>
				</div>
			</section>

			<section className='relative z-1 bg-green-dark section-padding rounded-bottom-corners -mt-4 sm:-mt-8 md:-mt-12'>
				<div className='base-container pt-4 sm:pt-8 md:pt-12'>
					<div className='row'>

						<div className='col-lg-6'>
							<AnimatedTitle
								style='green-green-vivid'
								className='title-96 mb-6'
							>
								O corte Limonada
							</AnimatedTitle>
						</div>

						<div className='col-lg-6 pt-1'>
							<p className='lg:text-lg text-green-vivid'>
								Antes de propor qualquer mudança, ouvimos. Conversamos com RH, patrocinadores do programa e lideranças de diferentes áreas para entender o que tinha funcionado ao longo dos anos e o que já não gerava o mesmo impacto.<br /><br />

								Dessas conversas nasceu um mapa de competências sobre três pilares: pensamento crítico, visão sistêmica e influência estratégica. Cada um explorado nas dimensões de indivíduo, negócio e mercado.
							</p>
						</div>

					</div>
				</div>
			</section>

			<section className='relative z-0 bg-green-neon section-padding rounded-bottom-corners -mt-4 sm:-mt-8 md:-mt-12'>
				<div className='base-container pt-4 sm:pt-8 md:pt-12 pb-[18vw] sm:pb-[12vw] lg:pb-[8vw] xl:pb-[5vw]'>
					<div className='row'>

						<div className='col-lg-6'>
							<AnimatedTitle
								style='green-black'
								className='title-96 mb-6'
							>
								Espremendo o Limão
							</AnimatedTitle>
						</div>

						<div className='col-lg-6 pt-1'>
							<p className='lg:text-lg'>
								Combinamos assessment individual, network para ampliar repertório, treinamento com curadoria de conteúdo respeitando o contexto de cada país, e projeto real para gerar movimento dentro da operação.<br /><br />

								Os três países rodaram a trilha em paralelo, com o mesmo mapa de competências adaptado à realidade local de cada um.
							</p>
						</div>

					</div>
				</div>
			</section>

			<FourBlocks
				items={[
					{
						image: image1.src,
						title: 'Assessment',
						text: 'Entendimento completo do indivíduo'
					},
					{
						image: image2.src,
						title: 'Network',
						text: 'Conexão que amplia repertório'
					},
					{
						image: image3.src,
						title: 'Treinamento',
						text: 'Curadoria de conteúdo que respeita o contexto'
					},
					{
						image: image4.src,
						title: 'Projeto',
						text: 'Aprendizagem prática que gera movimento'
					}
				]}
			/>

			<Numbers
				items={[
					{
						hasPlus: false,
						number: 60,
						text: 'participantes'
					},
					{
						hasPlus: false,
						number: 3,
						text: 'países: Brasil, Argentina e México'
					},
					{
						hasPlus: true,
						number: 100,
						text: 'horas de treinamento + mentoria'
					},
					{
						hasPlus: false,
						number: 14,
						text: 'projetos desenvolvidos com desafios reais do negócio'
					}
				]}
			/>

			<Testimonials
				items={[
					{
						testimonial: 'Transformadora. Tive a oportunidade de conhecer e entender outras áreas muito distantes da minha, mas fundamentais para o negócio que deveriam estar muito próximas.',
						position: 'Colaborador',
						company: 'John Deere'
					},
					{
						testimonial: 'Uma jornada de transformação, desde conteúdos para suportar o desenvolvimento pessoal quanto liderança e conexão com temas estratégicos da companhia.',
						position: 'Colaborador',
						company: 'John Deere'
					}
				]}
			/>

			<ContactBlock text='Seu desafio é desenvolver líderes para um cenário que muda o tempo todo?' />

			{/*
			<section className='my-10 lg:my-[5vw]'>
				<div className='base-container'>
					<div className='row'>
						<div className='col-lg-10 col-xl-8'>

							<h1 className='text-2xl md:text-3xl xl:text-4xl font-semibold block mb-4 text-green-medium'>
								<AnimatedText text={post.title} />
							</h1>

							<div className='flex flex-wrap gap-x-4 gap-y-1 items-center text-sm mb-6 lg:mb-10'>

								<span>
									Por {post.author}
								</span>

								<span className='flex gap-2 items-center'>
									<Clock className='w-4 h-4' />
									{post.readingTime} min de leitura
								</span>

							</div>

							<div
								className='rich-text'
								dangerouslySetInnerHTML={{ __html: post.content }}
							/>

						</div>
					</div>
				</div>
			</section>

			<section className='section-space'>
				<div className='base-container'>

					<h2 className='text-xl md:text-2xl font-semibold block mb-4 lg:mb-8'>
						<AnimatedText text='Veja outros pontos de vista:' />
					</h2>

				</div>
			</section>
			*/}

		</main>
	)
}
