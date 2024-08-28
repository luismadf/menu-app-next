'use client'

import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button
} from '@nextui-org/react'

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
    <NextUINavbar>
      <NavbarBrand>
        <Link href="/">
          <p className="font-bold text-inherit">Menu App</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        {items.map(({ name, href }) => (
          <NavbarItem>
            <Link color="foreground" href={href}>
              {name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        {session ? (
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href="/api/auth/signout"
              variant="flat"
            >
              Sign Out
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Link href="/auth/login">Login</Link>
          </NavbarItem>
        )}
      </NavbarContent>
    </NextUINavbar>
  )
}
