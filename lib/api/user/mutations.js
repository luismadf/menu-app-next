'use server'

import { fetcher } from '../utils'

export async function addUserMutation(body) {
  await fetcher({
    url: `users`,
    method: 'POST',
    body,
    excludeUserId: true
  })
}
