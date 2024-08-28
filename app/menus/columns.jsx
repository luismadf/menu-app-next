'use client'

import { removeMenuMutation } from '@/lib/api/menus/mutations'
import { ActionsMenu, ConfirmationModal } from '../ui'
import EditMenuForm from '../ui/menus/edit-menu-form'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import Link from 'next/link'

export const columns = [
  {
    key: 'name',
    header: 'Nombre del Menú'
  },
  {
    key: 'description',
    header: 'Descripción'
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <ActionsMenu
        actions={[
          {
            component: (
              <DropdownMenuItem>
                <Link href={`menus/${row.original.id}`}>Generar Menú</Link>
              </DropdownMenuItem>
            )
          },
          {
            component: <EditMenuForm menu={row.original} />
          },
          {
            component: (
              <ConfirmationModal
                type="dropdown"
                buttonLabel="Eliminar"
                mutation={removeMenuMutation}
                mutationPath={{ menuId: row.original.id }}
              />
            )
          }
        ]}
      />
    )
  }
]
