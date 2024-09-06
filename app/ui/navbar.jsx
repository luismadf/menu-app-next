'use client'

import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar
} from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  {
    id: 'menus',
    name: 'Menus',
    href: '/app/menus'
  },
  {
    id: 'categories',
    name: 'Categorías',
    href: '/app/categories'
  },
  {
    id: 'items',
    name: 'Artículos',
    href: '/app/items'
  }
]

export default function Navbar({ session }) {
  const pathname = usePathname()
  return (
    <NextUINavbar maxWidth="full">
      <NavbarBrand>
        <Link href="/">
          <p className="font-semibold">Menu App</p>
        </Link>
      </NavbarBrand>
      {session && (
        <NavbarContent className="sm:flex gap-4" justify="center">
          {items.map(({ id, name, href }) => (
            <NavbarItem key={id} isActive={pathname === href}>
              <Link href={href}>{name}</Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}
      <NavbarContent justify="end">
        {session ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" isReadOnly className="h-14 gap-2">
                <p className="font-semibold">Sesión iniciada</p>
                <p className="font-semibold">{session.user.email}</p>
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                href="/api/auth/signout"
              >
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarItem>
            <Link href="/auth/login">Login</Link>
          </NavbarItem>
        )}
      </NavbarContent>
    </NextUINavbar>
  )
}
