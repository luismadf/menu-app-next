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
import { addItemMutation } from '@/lib/api/item/mutations'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function CreateItemForm() {
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  function onCloseDialog() {
    setOpen(false)
    reset()
  }

  async function onSubmit(form) {
    await addItemMutation(form)
    onCloseDialog()
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Crear Artículo</Button>

      <Dialog open={open} onOpenChange={onCloseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear Item</DialogTitle>
            <DialogDescription>
              Aquí podras crear un nuevo item, ¡Deja volar tu creatividad!
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Precio
              </Label>
              <Input
                id="price"
                className="col-span-3"
                {...register('price', { required: 'Email es obligatorio' })}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Crear Item</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
