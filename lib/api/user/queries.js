'use server'

export async function getUser(data) {
  try {
    const response = await fetch(`${process.env.BASE_API_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const user = await response.json()

    return user
  } catch (error) {
    console.log('error', error)
  }
}
