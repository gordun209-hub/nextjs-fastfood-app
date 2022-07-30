import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'
import type { Category } from '@prisma/client'
import { useCreateCategoryMutation } from '@services/api'
import { useForm } from 'react-hook-form'

const CategoryModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}): JSX.Element => {
  const [createCategory] = useCreateCategoryMutation()
  const { register, handleSubmit } = useForm<Category>()

  const onSubmit = (data: Category) => {
    createCategory({ ...data })
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Category</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Stack spacing={3}>
                <Input {...register('name')} placeholder="Category name" />
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button type="submit" colorScheme="blue">
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CategoryModal
