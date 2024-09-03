'use client'

import { ConfirmationModal } from '../ui'
import { removeMenuMutation } from '@/lib/api/menus/mutations'
// import EditMenuForm from '../ui/menus/edit-menu-form'
// import Link from 'next/link'

import { Tooltip } from '@nextui-org/react'
import { DeleteIcon } from '@/lib/utils'

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
        mutation={removeMenuMutation}
        mutationPath={{ menuId: id }}
        onSuccess={async () => {
          revalidatePath('/menus')
          await getItems()
        }}
      />
    )
  }
  // {
  //   id: 'actions',
  //   cell: ({ row }) => (
  //     <ActionsMenu
  //       actions={[
  //         {
  //           component: (
  //             <DropdownMenuItem>
  //               <Link href={`menus/${row.original.id}`}>Generar Menú</Link>
  //             </DropdownMenuItem>
  //           )
  //         },
  //         {
  //           component: <EditMenuForm menu={row.original} />
  //         },
  //         {
  //           component: (
  //             <ConfirmationModal
  //               type="dropdown"
  //               buttonLabel="Eliminar"
  //               mutation={removeMenuMutation}
  //               mutationPath={{ menuId: row.original.id }}
  //             />
  //           )
  //         }
  //       ]}
  //     />
  //   )
  // }
]
