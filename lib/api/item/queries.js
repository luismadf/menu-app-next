'use server'

import { Item } from '@/app/models/item'
import { auth } from '@/auth'
import { Types } from 'mongoose'

export async function getItems() {
  const session = await auth()

  if (!session) return

  const creator = Types.ObjectId.isValid(session.user?.userId)
    ? new Types.ObjectId(String(session.user?.userId))
    : null

  try {
    const data = await Item.find({ creator }).sort({
      created: -1
    })

    return data
  } catch (error) {
    throw new Error(error)
  }
}
