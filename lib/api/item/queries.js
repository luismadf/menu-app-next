'use server'

import { auth } from '@/auth'
import { fetcher } from '../utils'

export async function getItems() {
  const session = await auth()
  const response = await fetcher({ url: `/${session.user.userId}/items/` })
  return response
}
