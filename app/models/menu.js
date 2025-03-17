import { createSchema } from '@/lib/mongodb'
import mongoose from 'mongoose'

const menuSchema = createSchema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  created: { type: Date, default: Date.now() },
  name: { type: String, required: true },
  description: { type: String, required: true },
  categories: { type: Array }
})

export const Menu = mongoose.models.Menu || mongoose.model('Menu', menuSchema)
