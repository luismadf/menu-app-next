'use server'

import { fetcher } from '../utils'

export async function getMenus() {
  const response = await fetcher({ url: `menus` })
  return response
}

export async function getMenu(menuId) {
  const response = await fetcher({ url: `menus/${menuId}` })
  return response
}
