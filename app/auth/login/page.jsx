'use client'

import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Link
} from '@nextui-org/react'

export default function Page() {
  const { register, handleSubmit } = useForm()

  async function onSubmit(e) {
    try {
      await signIn('credentials', e)
    } catch (error) {
      if (error) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.'
          default:
            return 'Something went wrong.'
        }
      }
      throw error
    }
  }

  return (
    <section className="w-[350px] mx-auto flex flex-col gap-4 items-center">
      <Card className="p-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="flex flex-col items-start gap-4">
            <p className="font-semibold text-xl">Inicia Sesión</p>
            <p className="text-default-500">
              Usa tu usuario y contraseña para entrar.
            </p>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Correo Electronico"
              {...register('email', { required: 'Email es obligatorio' })}
            />
            <Input
              label="Contraseña"
              {...register('password', {
                required: 'Contraseña es obligatorio'
              })}
            />
          </CardBody>
          <CardFooter>
            <Button type="submit" color="primary">
              Entrar
            </Button>
          </CardFooter>
        </form>
      </Card>

      <p>
        Si no tienes cuenta puede registrate{' '}
        <Link href="/auth/signup">aquí</Link>.
      </p>
    </section>
  )
}
