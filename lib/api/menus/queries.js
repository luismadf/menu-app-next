'use server'

import { fetcher } from '../utils'

export async function getMenus() {
  const response = await fetcher({ url: `menus` })
  return response
}
