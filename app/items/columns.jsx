'use client'

import { removeItemMutation } from '@/lib/api/item/mutations'
import { ConfirmationModal } from '../ui'
import { revalidatePath } from 'next/cache'
import { getItems } from '@/lib/api/item/queries'
import { Tooltip } from '@nextui-org/react'
import { DeleteIcon, EditIcon, formatToEUR } from '@/lib/utils'
import EditItemForm from '../ui/items/edit-item-form'

const Trigger = ({ onOpen }) => (
  <div className="flex items-center">
    <Tooltip color="danger" content="Eliminar">
      <span className="text-lg text-danger cursor-pointer active:opacity-50">
        <DeleteIcon onClick={onOpen} />
      </span>
    </Tooltip>
  </div>
)

const EditTrigger = ({ onOpen }) => (
  <div className="flex items-center">
    <Tooltip content="Editar">
      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
        <EditIcon onClick={onOpen} />
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
    render: (row) => (
      <div className="flex gap-2 justify-center">
        <ConfirmationModal
          Trigger={Trigger}
          mutation={removeItemMutation}
          mutationPath={{ itemId: row.id }}
          onSuccess={async () => {
            revalidatePath('/items')
            await getItems()
          }}
        />

        <EditItemForm Trigger={EditTrigger} item={row} />
      </div>
    )
  }
]
