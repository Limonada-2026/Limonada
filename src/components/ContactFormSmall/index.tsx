// libraries
import clsx from 'clsx'

// components
import { Form, InputHidden, Input, Textarea, Submit, UtmHiddenFields } from '@/components/Form'
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'

// utils
import { pages } from '@/utils/routes'

// types
interface ContactFormSmallProps {
    className?: string
}

export default function ContactFormSmall({
    className,
}: ContactFormSmallProps) {
    return (
        <section className={clsx('section-space', className)}>
            <div className='base-container'>
                <div className='row'>

                    <div className='col-lg-5 col-xl-4'>

                        <AnimatedTitle
                            style='gray-green-dark'
                            className='title-96'
                        >
                            Qual é o desafio do seu negócio?
                        </AnimatedTitle>

                        <p className='text-green-dark mt-4 lg:pr-10 mb-6 lg:text-lg'>
                            Cada projeto nasce de um desafio e contexto particular. Nos conte o seu! Estamos prontos para ouvir e construir uma jornada de impacto juntos.
                        </p>

                    </div>

                    <div className='col-lg-7 col-xl-8'>

                        <Form
                            endpoint='/api/resend'
                            redirectTo={pages.contato_obrigado}
                            onError={{
                                title: 'Ocorreu um erro ao enviar a mensagem',
                                text: 'Por favor, tente novamente mais tarde.'
                            }}
                            clearOnSubmit
                        >

                            <InputHidden
                                name='form'
                                value='contact_home'
                                id='form'
                            />

                            <UtmHiddenFields />

                            <Input
                                id='name'
                                name='Nome'
                                label='Nome'
                                placeholder='Digite seu nome'
                                type='text'
                                required
                            />

                            <div className='row'>

                                <div className='col-sm-6'>
                                    <Input
                                        id='email'
                                        name='Email'
                                        label='Email'
                                        placeholder='Digite seu email'
                                        type='email'
                                        required
                                    />
                                </div>

                                <div className='col-sm-6'>
                                    <Input
                                        id='phone'
                                        name='Telefone'
                                        label='Telefone'
                                        placeholder='(00) 00000-0000'
                                        type='tel'
                                    />
                                </div>

                                <div className='col-sm-6'>
                                    <Input
                                        id='company'
                                        name='Empresa'
                                        label='Empresa'
                                        placeholder='Digite o nome da empresa'
                                        type='text'
                                    />
                                </div>

                                <div className='col-sm-6'>
                                    <Input
                                        id='position'
                                        name='Cargo'
                                        label='Cargo'
                                        placeholder='Digite seu cargo'
                                        type='text'
                                    />
                                </div>

                            </div>

                            <Textarea
                                id='challenge'
                                name='Desafio'
                                label='Desafio'
                                placeholder='Digite o desafio do negócio'
                                required
                            />

                            <MagneticButton className='max-sm:w-full!'>
                                <Submit
                                    text='Enviar'
                                    className='max-sm:w-full!'
                                />
                            </MagneticButton>

                        </Form>

                    </div>

                </div>
            </div>
        </section>
    )
}