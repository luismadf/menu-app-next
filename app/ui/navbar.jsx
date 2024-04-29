'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { Button } from '.'

const items = [
  {
    name: 'Menus',
    href: '/menus'
  },
  {
    name: 'Categorías',
    href: '/categories'
  },
  {
    name: 'Artículos',
    href: '/items'
  }
]

export default function Navbar({ session }) {
  return (
    <header>
      <div className="container mt-5 mb-10 flex items-center justify-between">
        <Link href="/" legacyBehavior passHref>
          <p className="text-black font-bold text-inherit">MENU APP</p>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {items.map(({ name, href }) => (
              <NavigationMenuItem key={name}>
                <Link href={href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex gap-2">
          {session ? (
            <Button variant="destructive">
              <Link href="/api/auth/signout" legacyBehavior passHref>
                Sign Out
              </Link>
            </Button>
          ) : (
            <Button variant="secondary">
              <Link href="/auth/login" legacyBehavior passHref>
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
