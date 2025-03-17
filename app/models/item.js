import { createSchema } from '@/lib/mongodb'
import mongoose from 'mongoose'

const itemSchema = createSchema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  created: { type: Date, default: Date.now() },
  name: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: String, require: true }
})

export const Item = mongoose.models.Item || mongoose.model('Item', itemSchema)
