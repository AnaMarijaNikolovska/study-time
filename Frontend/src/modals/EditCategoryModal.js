import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  Stack,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { EditCategory } from '../services/CategoryService';

export default function EditCategoryModal({ isOpen, onOpen, onClose, categoryToEdit }) {

  const [category, setCategory] = useState(
    {
      name: categoryToEdit.name,
      description: categoryToEdit.description,
    },
  );
  const handleChange = name => event => {
    setCategory({ ...category, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    EditCategory(categoryToEdit.id, category).then(r => {
      onClose();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <Flex
              size={'lg'}
              minH={'100vh'}
              align={'center'}
              justify={'center'}
              bg={useColorModeValue('gray.50', 'gray.800')}>
              <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                  <Heading fontSize={'4xl'}>Add Category</Heading>
                </Stack>
                <Box
                  rounded={'lg'}
                  bg={useColorModeValue('white', 'gray.700')}
                  boxShadow={'lg'}
                  p={8}>
                  <Stack spacing={4}>
                    <FormControl id='email'>
                      <FormLabel>Category Name</FormLabel>
                      <Input type='text' value={category.name} onChange={handleChange('name')} />
                    </FormControl>
                    <FormControl id='password'>
                      <FormLabel>Description</FormLabel>
                      <Textarea value={category.description} onChange={handleChange('description')} />
                    </FormControl>
                    <Stack spacing={10}>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' type={'submit'}>Edit</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}