'use server'

import { fetcher } from '../utils'

export async function getCategories() {
  const response = await fetcher({ url: `categories` })
  return response
}
