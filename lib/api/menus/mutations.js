'use server'

import { fetcher } from '../utils'
import { revalidatePath } from 'next/cache'

export async function addMenuMutation(body) {
  await fetcher({
    url: `menus`,
    method: 'POST',
    body
  })
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
