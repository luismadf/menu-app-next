'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  addCategoryMutation,
  updateCategoryMutation
} from '@/lib/api/categories/mutations'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { MultiSelect } from '..'
import { useEffect } from 'react'
import { getItems } from '@/lib/api/item/queries'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export default function EditCategoryForm({ category }) {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([])
  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: category
  })

  useEffect(() => {
    const getItemsValues = async () => {
      const categories = await getItems()
      setItems(categories)
    }

    getItemsValues()
  }, [])

  function onCloseDialog() {
    setOpen(false)
    reset()
  }

  async function onSubmit(form) {
    await updateCategoryMutation({ categoryId: category.id, body: form })
    onCloseDialog()
  }

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          setOpen(true)
          e.preventDefault()
        }}
      >
        Editar
      </DropdownMenuItem>

      <Dialog open={open} onOpenChange={onCloseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Categoría</DialogTitle>
            <DialogDescription>
              Aquí podras editar tú categoría, ¡Deja volar tu creatividad!
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 pt-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                className="col-span-3"
                {...register('name', { required: 'El nombre es obligatorio' })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descripción
              </Label>
              <Textarea
                id="description"
                className="col-span-3"
                {...register('description', {
                  required: 'La descripción es obligatoria'
                })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Items
              </Label>
              <Controller
                control={control}
                name="items"
                render={({ field: { onChange, value } }) => (
                  <MultiSelect
                    className="col-span-3"
                    onChange={onChange}
                    values={value}
                    options={items}
                    getOptions={(item) => ({
                      label: item.name,
                      value: item.id
                    })}
                  />
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Editar Categoría</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
