'use client'
import { useForm } from 'react-hook-form'

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label
} from '@/app/ui'
import { signIn } from 'next-auth/react'

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  async function onSubmit(e) {
    try {
      await signIn('credentials', e)
    } catch (error) {
      console.log('error')
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
    <Card className="w-[350px] mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Usa tu usuario y contraseña para entrar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                placeholder="Nombre de Usuario"
                {...register('email', { required: 'Email es obligatorio' })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Contraseña</Label>
              <Input
                id="username"
                placeholder="Introduce tu contraseña"
                {...register('password', {
                  required: 'Contraseña es obligatorio'
                })}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Entrar</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
