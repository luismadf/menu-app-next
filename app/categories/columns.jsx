'use client'

import { ActionsMenu, ConfirmationModal } from '../ui'
import { removeCategoryMutation } from '@/lib/api/categories/mutations'
import EditCategoryForm from '../ui/categories/edit-category-form'

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
              component: <EditCategoryForm category={row.original} />
            },
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
