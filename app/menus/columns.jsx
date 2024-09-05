'use client'

import { ConfirmationModal } from '../ui'
import { removeMenuMutation } from '@/lib/api/menus/mutations'
import EditMenuForm from '../ui/menus/edit-menu-form'
import { Tooltip } from '@nextui-org/react'
import { DeleteIcon, EditIcon, EyeIcon } from '@/lib/utils'
import Link from 'next/link'

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
          mutation={removeMenuMutation}
          mutationPath={{ menuId: row.id }}
          onSuccess={async () => {
            revalidatePath('/menus')
            await getItems()
          }}
        />

        <EditMenuForm Trigger={EditTrigger} menu={row} />

        <Tooltip content="Generar Menú">
          <Link href={`menus/${row.id}`}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon />
            </span>
          </Link>
        </Tooltip>
      </div>
    )
  }
]
