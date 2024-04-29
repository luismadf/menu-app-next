'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useState } from 'react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export default function ConfirmationModal({
  type = 'button',
  buttonLabel = '',
  mutation = () => {},
  mutationPath = {},
  onSucess = () => {}
}) {
  const [open, setOpen] = useState(false)

  async function onClick() {
    await mutation(mutationPath)
    setOpen(false)
    onSucess()
  }

  return (
    <>
      {type === 'button' && (
        <Button onClick={() => setOpen(true)}>{buttonLabel}</Button>
      )}
      {type === 'dropdown' && (
        <DropdownMenuItem
          onSelect={(e) => {
            setOpen(true)
            e.preventDefault()
          }}
        >
          {buttonLabel}
        </DropdownMenuItem>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>¿Estas seguro?</DialogTitle>
            <DialogDescription>
              Al eliminar este item no podras volver a utilizarlo.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start gap-2">
            <Button type="button" variant="destructive" onClick={onClick}>
              Eliminar
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cerrar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
