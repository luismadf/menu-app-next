'use client'

import { removeItemMutation } from '@/lib/api/item/mutations'
import { ActionsMenu, ConfirmationModal } from '../ui'
import { revalidatePath } from 'next/cache'
import { getItems } from '@/lib/api/item/queries'

export const columns = [
  {
    key: 'name',
    header: 'Nombre del Artículo'
  },
  {
    key: 'description',
    header: 'Descripción'
  },
  {
    key: 'price',
    header: () => <div className="text-right">Precio</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    }
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
                  mutation={removeItemMutation}
                  mutationPath={{ itemId: row.original._id }}
                  onSuccess={async () => {
                    revalidatePath('/items')
                    await getItems()
                  }}
                />
              )
            }
          ]}
        />
      )
    }
  }
]
