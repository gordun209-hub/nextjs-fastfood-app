/* eslint-disable @typescript-eslint/ban-ts-comment */
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
  Select,
  Stack,
} from '@chakra-ui/react'
import type { Product } from '@prisma/client'
import {
  useCreateProductMutation,
  useGetAllCategoriesQuery,
} from '@services/api'
import { useForm } from 'react-hook-form'

const Productmodal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}): JSX.Element => {
  const { data: categories } = useGetAllCategoriesQuery()
  // TODO make it clearer
  const flattencategories =
    categories &&
    categories.map((c) =>
      // @ts-ignore
      c.categories.map((x) => x).map((x: { name: string }) => x.name)
    )[0]
  const [createProduct] = useCreateProductMutation()
  const { register, handleSubmit } = useForm<Product>()
  const onSubmit = (data: Product) => {
    const { price, name, categoryName } = { data }.data
    console.log(price, name, categoryName, 'laaaaa')
    const price2 = Number(price)
    createProduct({ name, price2, categoryName })
  }

  // createProduct({ Number(price), ...data })
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <Input {...register('name')} placeholder="Product name" />
                <Input
                  {...register('price')}
                  placeholder="Product's price"
                  type="number"
                />
                <Select placeholder="Choose category">
                  {categories &&
                    flattencategories?.map((category: string) => {
                      return (
                        <option {...register('categoryName')} key={category}>
                          <label>{category}</label>
                        </option>
                      )
                    })}
                  )
                </Select>
              </Stack>
              <ModalFooter>
                <Button colorScheme="gray" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button type="submit" colorScheme="blue">
                  Save
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Productmodal
