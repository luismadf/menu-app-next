'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react'

export default function ConfirmationModal({
  Trigger,
  mutation = () => {},
  mutationPath = {},
  onSucess = () => {}
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  async function onClick() {
    await mutation(mutationPath)
    onOpenChange()
    onSucess()
  }

  return (
    <>
      <Trigger onOpen={onOpen} />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>¿Estas seguro?</ModalHeader>
          <ModalBody>
            <p>Al eliminar este item no podras volver a utilizarlo.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={onClick}>
              Eliminar
            </Button>
            <Button onClick={onOpenChange}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
