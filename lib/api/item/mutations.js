'use server'

import { fetcher } from '../utils'
import { revalidatePath } from 'next/cache'

export async function addItemMutation(body) {
  await fetcher({
    url: `items`,
    method: 'POST',
    body
  })
  revalidatePath('/items')
}

export async function removeItemMutation({ itemId }) {
  await fetcher({
    url: `items/${itemId}`,
    method: 'DELETE'
  })
  revalidatePath('/items')
}
