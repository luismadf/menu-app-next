import { z } from 'zod'
import { User } from '@/app/models/user'
import bcryptjs from 'bcryptjs'

const userSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
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
    userSchema.parse(data)

    let user = await User.findOne({ email: data.email })
    if (user) {
      return Response.json('The user already exist', { status: 400 })
    }

    const hashedPassword = await bcryptjs.hash(data.password, 10)

    await User.create({ ...data, password: hashedPassword })
    return Response.json('User has been created!', { status: 200 })
  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}
