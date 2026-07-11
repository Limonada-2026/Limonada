// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import { Form, Input, InputHidden, Textarea, Checkbox, Submit } from '@/components/Form'

export const metadata = {
	title: 'Contato Limonada: Entre em contato conosco',
	description: 'A escuta é o primeiro passo para construir jornadas que movem pessoas, cultura e resultado. Vamos transformar limões em limonada!',
	canonical: '/contato'
}

export default function Contact() {
	return (
		<main className='menu-space'>
			
			<section className='my-10 md:my-[10vw]'>
				<div className='base-container'>

					<h1 className='title-96 text-green-medium md:text-center'>
						Nos conte o seu desafio
					</h1>

					<h2 className='md:text-lg lg:text-xl text-green-medium md:text-center md:max-w-180 md:mx-auto mt-4 md:mt-6'>
						A escuta é o primeiro passo para construir jornadas que movem pessoas, cultura e resultado. <strong>Vamos transformar limões em limonada!</strong>
					</h2>

				</div>
			</section>

			<section className='mb-20 md:mb-[10vw]'>
				<div className='base-container'>
					<Form
						endpoint='/api/resend'
						onSuccess={{
							title: 'Mensagem enviada com sucesso',
							text: 'Obrigado por entrar em contato. Entraremos em contato o mais breve possível.'
						}}
						onError={{
							title: 'Ocorreu um erro ao enviar a mensagem',
							text: 'Por favor, tente novamente mais tarde.'
						}}
						clearOnSubmit
					>

						<InputHidden
							name='form'
							value='contact'
							id='form'
						/>

						<div className='row'>

							<div className='col-md-6'>

								<Input
									id='name'
									name='Nome'
									label='Nome'
									placeholder='Digite seu nome'
									type='text'
									required
								/>

								<div className='row'>

									<div className='col-lg-6'>
										<Input
											id='email'
											name='Email'
											label='Email'
											placeholder='Digite seu email'
											type='email'
											required
										/>
									</div>

									<div className='col-lg-6'>
										<Input
											id='phone'
											name='Telefone'
											label='Telefone'
											placeholder='(00) 00000-0000'
											type='tel'
										/>
									</div>

									<div className='col-lg-6'>
										<Input
											id='company'
											name='Empresa'
											label='Empresa'
											placeholder='Digite o nome da empresa'
											type='text'
										/>
									</div>

									<div className='col-lg-6'>
										<Input
											id='position'
											name='Cargo'
											label='Cargo'
											placeholder='Digite seu cargo'
											type='text'
										/>
									</div>

								</div>

							</div>

							<div className='col-md-6'>
								<Textarea
									id='message'
									name='Mensagem'
									label='Mensagem'
									placeholder='Digite sua mensagem'
									required
									inputClassName='md:min-h-115 lg:min-h-65'
								/>
							</div>

						</div>

						<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6'>

							<Checkbox
								id='privacy-policy'
								name='Privacy Policy'
								checked
								type='checkbox'
								label='Aceito os Termos da Política de Privacidade'
								className='mb-0!'
								required
							/>

							<MagneticButton className='max-sm:w-full!'>
								<Submit
									text='Enviar'
									className='max-sm:w-full!'
								/>
							</MagneticButton>

						</div>

					</Form>
				</div>
			</section>

		</main>
	)
}
