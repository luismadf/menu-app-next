'use client'

import { ConfirmationModal } from '../ui'
import { removeCategoryMutation } from '@/lib/api/categories/mutations'
import { Tooltip } from '@nextui-org/react'
import { DeleteIcon, EditIcon } from '@/lib/utils'
import EditCategoryForm from '../ui/categories/edit-category-form'

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
    id: 'actions',
    name: 'Acciones',
    render: (row) => (
      <div className="flex gap-2 justify-center">
        <ConfirmationModal
          Trigger={Trigger}
          mutation={removeCategoryMutation}
          mutationPath={{ categoryId: row.id }}
          onSuccess={async () => {
            revalidatePath('/categories')
            await getItems()
          }}
        />

        <EditCategoryForm Trigger={EditTrigger} category={row} />
      </div>
    )
  }
]
