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
import { addMenuMutation } from '@/lib/api/menus/mutations'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { MultiSelect } from '..'
import { useEffect } from 'react'
import { getCategories } from '@/lib/api/categories/queries'

export default function CreateMenuForm() {
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const { control, register, handleSubmit, reset } = useForm()

  useEffect(() => {
    const getCategoriesValues = async () => {
      const categories = await getCategories()
      setCategories(categories)
    }

    getCategoriesValues()
  }, [])

  function onCloseDialog() {
    setOpen(false)
    reset()
  }

  async function onSubmit(form) {
    await addMenuMutation(form)
    onCloseDialog()
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Crear Menú</Button>

      <Dialog open={open} onOpenChange={onCloseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear Menú</DialogTitle>
            <DialogDescription>
              Aquí podras crear un nuevo menú, ¡Deja volar tu creatividad!
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
                {...register('name', { required: 'Email es obligatorio' })}
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
                  required: 'Email es obligatorio'
                })}
              />
            </div>
            <div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Categorías
                </Label>
                <Controller
                  control={control}
                  name="categories"
                  render={({ field: { onChange, value } }) => (
                    <MultiSelect
                      className="col-span-3"
                      onChange={onChange}
                      values={value}
                      options={categories}
                      getOptions={(category) => ({
                        label: category.name,
                        value: category.id
                      })}
                    />
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Crear Menú</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
