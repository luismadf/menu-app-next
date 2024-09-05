'use client'

import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { addUserMutation } from '@/lib/api/user/mutations'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const { register, handleSubmit } = useForm()

  async function onSubmit(form) {
    try {
      await addUserMutation(form)
    } catch (error) {
      throw error
    }

    return router.push('/auth/login')
  }

  return (
    <section className="w-[350px] mx-auto">
      <Card className="p-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="flex flex-col items-start gap-4">
            <p className="font-semibold text-xl">Regístrate</p>
            <p className="text-default-500">
              Completa la información para registrarte.
            </p>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Nombre"
              {...register('name', { required: 'El nombre es obligatorio' })}
            />
            <Input
              label="Tu correo electrónico"
              {...register('email', { required: 'El email es obligatorio' })}
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
              Crear mi cuenta
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  )
}
