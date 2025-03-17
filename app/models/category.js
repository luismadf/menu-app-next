import { createSchema } from '@/lib/mongodb'
import mongoose from 'mongoose'

const categorySchema = createSchema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  created: { type: Date, default: Date.now() },
  name: { type: String, require: true },
  items: { type: Array },
  description: { type: String, require: true }
})

export const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema)
