'use server'

import { fetcher } from '../utils'
import { revalidatePath } from 'next/cache'

export async function addCategoryMutation(body) {
  await fetcher({
    url: `categories`,
    method: 'POST',
    body
  })
  revalidatePath('/categories')
}

export async function updateCategoryMutation({ categoryId, body }) {
  await fetcher({
    url: `categories/${categoryId}`,
    method: 'PATCH',
    body
  })
  revalidatePath('/categories')
}

export async function removeCategoryMutation({ categoryId }) {
  await fetcher({
    url: `categories/${categoryId}`,
    method: 'DELETE'
  })
  revalidatePath('/categories')
}
