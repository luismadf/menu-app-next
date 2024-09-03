'use client'

import { removeItemMutation } from '@/lib/api/item/mutations'
import { ConfirmationModal } from '../ui'
import { revalidatePath } from 'next/cache'
import { getItems } from '@/lib/api/item/queries'
import { Tooltip } from '@nextui-org/react'
import { DeleteIcon, formatToEUR } from '@/lib/utils'

const Trigger = ({ onOpen }) => (
  <div className="flex items-center">
    <Tooltip color="danger" content="Eliminar">
      <span className="text-lg text-danger cursor-pointer active:opacity-50">
        <DeleteIcon onClick={onOpen} />
      </span>
    </Tooltip>
  </div>
)

export const columns = [
  {
    id: 'name',
    name: 'Nombre del Artículo'
  },
  {
    id: 'description',
    name: 'Descripción'
  },
  {
    id: 'price',
    name: 'Precio',
    render: ({ price }) => formatToEUR(price)
  },
  {
    id: 'actions',
    name: 'Acciones',
    render: ({ id }) => (
      <ConfirmationModal
        Trigger={Trigger}
        mutation={removeItemMutation}
        mutationPath={{ itemId: id }}
        onSuccess={async () => {
          revalidatePath('/items')
          await getItems()
        }}
      />
    )
  }
]
