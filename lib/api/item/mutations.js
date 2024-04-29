'use server'

import { auth } from '@/auth'
import { fetcher } from '../utils'
import { revalidatePath } from 'next/cache'

export async function addItemMutation(body) {
  const session = await auth()
  await fetcher({
    url: `/${session.user.userId}/items`,
    method: 'POST',
    body
  })
  revalidatePath('/items')
}

export async function removeItemMutation({ itemId }) {
  const session = await auth()
  await fetcher({
    url: `/${session.user.userId}/items/${itemId}`,
    method: 'DELETE'
  })
  revalidatePath('/items')
}
