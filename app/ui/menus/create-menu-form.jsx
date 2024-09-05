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

import { addMenuMutation } from '@/lib/api/menus/mutations'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { getCategories } from '@/lib/api/categories/queries'

export default function CreateMenuForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { control, register, handleSubmit, reset } = useForm()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategoriesValues = async () => {
      const categories = await getCategories()
      setCategories(categories)
    }

    getCategoriesValues()
  }, [])

  async function onSubmit(form) {
    await addMenuMutation(form)
    onOpenChange()
    reset()
  }

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Crear Menú
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Crear Menú</ModalHeader>
            <ModalBody className="flex gap-4">
              <p>
                Aquí podras crear un nuevo menú, ¡Deja volar tu creatividad!
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
                name="categories"
                render={({ field: { onChange, value } }) => (
                  <Select
                    label="Categorías"
                    selectionMode="multiple"
                    selectedKeys={value}
                    onSelectionChange={(selectedCategoriesSet) =>
                      onChange(Array.from(selectedCategoriesSet))
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
                Crear Menú
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
