'use server'

import { Menu } from '@/app/models/menu'
import { fetcher } from '../utils'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { Types } from 'mongoose'
import { z } from 'zod'

const addMenuSchema = z.object({
  name: z.string({ required_error: 'Name is required' })
})

export async function addMenuMutation(data) {
  const session = await auth()

  if (!session) return

  const creator = Types.ObjectId.isValid(session.user?.userId)
    ? new Types.ObjectId(String(session.user?.userId))
    : null

  try {
    addMenuSchema.parse(data)

    const menu = new Menu({ ...data, creator })
    menu.save()
  } catch (error) {
    throw new Error(error)
  }

  revalidatePath('/menus')
}

export async function updateMenuMutation({ menuId, body }) {
  await fetcher({
    url: `menus/${menuId}`,
    method: 'PATCH',
    body
  })
  revalidatePath('/menus')
}

export async function removeMenuMutation({ menuId }) {
  await fetcher({
    url: `menus/${menuId}`,
    method: 'DELETE'
  })
  revalidatePath('/menus')
}
