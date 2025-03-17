import mongoose from 'mongoose'
import { createSchema } from '@/lib/mongodb'

const userSchema = createSchema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)
