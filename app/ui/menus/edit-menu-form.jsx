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
import { updateMenuMutation } from '@/lib/api/menus/mutations'
import { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { getCategories } from '@/lib/api/categories/queries'

export default function EditMenuForm({ Trigger, menu }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { control, register, handleSubmit } = useForm({
    defaultValues: menu
  })
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategoriesValues = async () => {
      const categories = await getCategories()
      setCategories(categories)
    }

    getCategoriesValues()
  }, [])

  async function onSubmit(form) {
    await updateMenuMutation({ menuId: menu.id, body: form })
    onOpenChange()
  }

  return (
    <>
      <Trigger onOpen={onOpen} />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {categories.length > 0 ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader>Editar Menú</ModalHeader>
              <ModalBody className="flex gap-4">
                <p>Aquí podras editar tú menú, ¡Deja volar tu creatividad!</p>
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
                  name="categories"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label="Categorías"
                      selectionMode="multiple"
                      selectedKeys={value}
                      onSelectionChange={(selectedItemsSet) =>
                        onChange(Array.from(selectedItemsSet))
                      }
                    >
                      {categories.map(({ id, name }) => (
                        <SelectItem key={id}>{name}</SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit">
                  Editar Menú
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
