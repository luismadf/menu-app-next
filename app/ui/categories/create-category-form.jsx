'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Textarea
} from '@nextui-org/react'

import { addCategoryMutation } from '@/lib/api/categories/mutations'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { getItems } from '@/lib/api/item/queries'

export default function CreateCategoryForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { control, register, handleSubmit, reset } = useForm()
  const [items, setItems] = useState([])

  useEffect(() => {
    const getItemsValues = async () => {
      const categories = await getItems()
      setItems(categories)
    }

    getItemsValues()
  }, [])

  async function onSubmit(form) {
    await addCategoryMutation(form)
    onOpenChange()
    reset()
  }

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Crear Categoría
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Crear Categoría</ModalHeader>
            <ModalBody className="flex gap-4">
              <p>
                Aquí podras crear una nueva categoría, ¡Deja volar tu
                creatividad!
              </p>
              <Input
                label="Nombre"
                {...register('name', { required: 'El nombre es obligatorio' })}
              />
              <Textarea
                label="Descripción"
                {...register('description', {
                  required: 'La descripción es obligatoria'
                })}
              />
              <Controller
                control={control}
                name="items"
                render={({ field: { onChange, value } }) => (
                  <Select
                    label="Articulos"
                    selectionMode="multiple"
                    selectedKeys={value}
                    onSelectionChange={(selectedItemsSet) =>
                      onChange(Array.from(selectedItemsSet))
                    }
                  >
                    {items.map(({ id, name }) => (
                      <SelectItem key={id}>{name}</SelectItem>
                    ))}
                  </Select>
                )}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Crear Categoría
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
