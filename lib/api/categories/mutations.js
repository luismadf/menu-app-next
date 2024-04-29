'use server'

import { auth } from '@/auth'
import { fetcher } from '../utils'
import { revalidatePath } from 'next/cache'

export async function addCategoryMutation(body) {
  const session = await auth()
  await fetcher({
    url: `/${session.user.userId}/categories`,
    method: 'POST',
    body
  })
  revalidatePath('/categories')
}

export async function removeCategoryMutation({ categoryId }) {
  const session = await auth()
  await fetcher({
    url: `/${session.user.userId}/categories/${categoryId}`,
    method: 'DELETE'
  })
  revalidatePath('/categories')
}
