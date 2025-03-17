import { z } from 'zod'
import { User } from '@/app/models/user'
import bcryptjs from 'bcryptjs'

const schema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters')
})

export async function POST(request) {
  const data = await request.json()

  try {
    schema.parse(data)

    let user = await User.findOne({ email: data.email })
    if (!user) {
      return Response.json("The user doesn't exists", { status: 400 })
    }

    const rightPassword = await bcryptjs.compare(data.password, user.password)

    if (!rightPassword) {
      return Response.json('Password is incorrect', { status: 400 })
    }

    return Response.json(
      { id: user.id, name: user.name, email: user.email },
      { status: 200 }
    )
  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}
