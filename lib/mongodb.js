import mongoose from 'mongoose'

export async function dbConnect() {
  try {
    const server = await mongoose.connect(String(process.env.MONGODB_URI))
    return server
  } catch (error) {
    throw new Error(error)
  }
}

export function createSchema(object) {
  const schema = mongoose.Schema(object, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  })

  schema.virtual('id').get(function () {
    return this._id.toHexString()
  })

  return schema
}
