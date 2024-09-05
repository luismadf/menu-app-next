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
  Spinner,
  Select,
  SelectItem
} from '@nextui-org/react'
import { updateCategoryMutation } from '@/lib/api/categories/mutations'
import { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { getItems } from '@/lib/api/item/queries'

export default function EditCategoryForm({ Trigger, category }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { control, register, handleSubmit } = useForm({
    defaultValues: category
  })
  const [items, setItems] = useState([])

  useEffect(() => {
    const getItemsValues = async () => {
      const categories = await getItems()
      setItems(categories)
    }

    getItemsValues()
  }, [])

  async function onSubmit(form) {
    await updateCategoryMutation({ categoryId: category.id, body: form })
    onOpenChange()
  }

  return (
    <>
      <Trigger onOpen={onOpen} />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {items.length > 0 ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader>Editar Categoría</ModalHeader>
              <ModalBody className="flex gap-4">
                <p>
                  Aquí podras editar tú categoría, ¡Deja volar tu creatividad!
                </p>
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
                  Editar Categoría
                </Button>
              </ModalFooter>
            </form>
          ) : (
            <Spinner />
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
