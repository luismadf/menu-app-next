'use server'

import { auth } from '@/auth'

export async function getItems() {
  const session = await auth()

  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/items/${session.user.userId}`,
      {
        headers: {
          'x-auth-token': session.user.access_token
        }
      }
    )
    const { items } = await response.json()

    return items || []
  } catch (error) {
    console.log('error', error)
  }
}
