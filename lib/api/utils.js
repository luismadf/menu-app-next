'use server'

import { auth } from '@/auth'

export async function fetcher({
  url = '',
  method = 'GET',
  body,
  excludeUserId
}) {
  const session = await auth()
  const baseURL = excludeUserId
    ? `${process.env.BASE_API_URL}/${url}`
    : `${process.env.BASE_API_URL}/${session.user.userId}/${url}`
  try {
    const response = await fetch(baseURL, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
        // 'x-auth-token': session?.user.access_token
      },
      body: body && JSON.stringify(body)
    })
    return (await response.json()) || []
  } catch (error) {
    console.log('error', error)
  }
}
