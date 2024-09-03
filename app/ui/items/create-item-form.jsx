'use client'

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
import { addItemMutation } from '@/lib/api/item/mutations'
import { useForm } from 'react-hook-form'

export default function CreateItemForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { register, handleSubmit, reset } = useForm()

  async function onSubmit(form) {
    await addItemMutation(form)
    onOpenChange()
    reset()
  }

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Crear Artículo
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Crear Artículo</ModalHeader>
            <ModalBody className="flex gap-4">
              <p>
                Aquí podras crear un nuevo item, ¡Deja volar tu creatividad!
              </p>
              <Input
                label="Nombre"
                {...register('name', { required: 'El nombre es obligatorio' })}
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
                Crear Artículo
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
