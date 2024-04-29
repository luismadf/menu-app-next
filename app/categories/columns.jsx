'use client'

import { ActionsMenu, ConfirmationModal } from '../ui'
import { removeCategoryMutation } from '@/lib/api/categories/mutations'

export const columns = [
  {
    key: 'name',
    header: 'Nombre de la Categoría'
  },
  {
    key: 'description',
    header: 'Descripción'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <ActionsMenu
          actions={[
            {
              component: (
                <ConfirmationModal
                  type="dropdown"
                  buttonLabel="Eliminar"
                  mutation={removeCategoryMutation}
                  mutationPath={{ categoryId: row.original._id }}
                />
              )
            }
          ]}
        />
      )
    }
  }
]
