'use server'

import { fetcher } from '../utils'

export async function getUser(data) {
  const response = await fetcher({
    url: 'auth',
    method: 'POST',
    body: data,
    excludeUserId: true
  })
  return response
}
