'use server'

import { auth } from '@/auth'

export async function fetcher({ url = '', method = 'GET', body }) {
  const session = await auth()
  try {
    const response = await fetch(`${process.env.BASE_API_URL}${url}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': session?.user.access_token
      },
      body: body && JSON.stringify(body)
    })
    return (await response.json()) || []
  } catch (error) {
    console.log('error', error)
  }
}
