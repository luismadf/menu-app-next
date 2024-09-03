'use client'

import { ConfirmationModal } from '../ui'
import { removeCategoryMutation } from '@/lib/api/categories/mutations'
import { Tooltip } from '@nextui-org/react'
import { DeleteIcon } from '@/lib/utils'
// import EditCategoryForm from '../ui/categories/edit-category-form'

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
    id: 'actions',
    name: 'Acciones',
    render: ({ id }) => (
      <ConfirmationModal
        Trigger={Trigger}
        mutation={removeCategoryMutation}
        mutationPath={{ categoryId: id }}
        onSuccess={async () => {
          revalidatePath('/categories')
          await getItems()
        }}
      />
    )
  }
]
