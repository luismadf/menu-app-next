'use client'

import { updateItemMutation } from '@/lib/api/item/mutations'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'

export default function EditItemForm({ Trigger, item }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { register, handleSubmit } = useForm({
    defaultValues: item
  })

  async function onSubmit(form) {
    await updateItemMutation({ itemId: item.id, body: form })
    onOpenChange()
  }

  return (
    <>
      <Trigger onOpen={onOpen} />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Editar Artículo</ModalHeader>
            <ModalBody className="flex gap-4">
              <p>Aquí podras editar tú artículo, ¡Deja volar tu creatividad!</p>
              <Input
                label="Nombre"
                {...register('name', {
                  required: 'El nombre es obligatorio'
                })}
              />
              <Input
                label="Descripción"
                {...register('description', {
                  required: 'La descripción es obligatoria'
                })}
              />
              <Input
                label="Precio"
                {...register('price', {
                  required: 'El precio es obligatorio'
                })}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Editar Categoría
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
