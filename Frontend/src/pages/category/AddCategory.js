'use client';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue, Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AddCategory } from '../../services/CategoryService';

export default function AddEditCategory() {

  const initialCategory = {
    name: '',
    description: '',
  };

  const [category, setCategory] = useState(initialCategory);

  const handleChange = name => event => {
    setCategory({ ...category, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    AddCategory(category).then(r => {
      console.log(r.data);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
                <Input type='text' onChange={handleChange("name")} />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Description</FormLabel>
                <Textarea onChange={handleChange("description")} />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  type={"submit"}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Add
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}