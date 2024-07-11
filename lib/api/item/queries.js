'use server'

import { fetcher } from '../utils'

export async function getItems() {
  const response = await fetcher({ url: `items` })
  return response
}
