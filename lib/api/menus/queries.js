'use server'

import { auth } from '@/auth'
import { Menu } from '@/app/models/menu'
import { Types } from 'mongoose'

export async function getMenus() {
  const session = await auth()

  if (!session) return

  const creator = Types.ObjectId.isValid(session.user?.userId)
    ? new Types.ObjectId(String(session.user?.userId))
    : null

  const data = await Menu.find({ creator }).sort({
    created: -1
  })

  return data
}

export async function getMenu(menuId) {
  const session = await auth()

  if (!session) return

  const data = await Menu.findById(menuId)

  return data
}
