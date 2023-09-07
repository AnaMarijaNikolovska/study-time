'use client';

import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LogoutUser } from '../services/UserService';
import { useAccessTokenState, useAccessTokenUpdater } from '../context/AccessTokenContext';
import axios from '../AxiosConfig';

// interface Props {
//   children: React.ReactNode
// }
//
// const Links = ['Dashboard', 'Projects', 'Team']
//
// const NavLink = (props: Props) => {
//   const { children } = props
//
//   return (
//     <Box
//       as="a"
//       px={2}
//       py={1}
//       rounded={'md'}
//       _hover={{
//         textDecoration: 'none',
//         bg: useColorModeValue('gray.200', 'gray.700'),
//       }}
//       href={'#'}>
//       {children}
//     </Box>
//   )
// }

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setAccessToken, setUserId } = useAccessTokenUpdater();
  const navigate = useNavigate();
  const { token, userId } = useAccessTokenState();

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(!!token);
  }, [token]);

  const logout = () => {
    LogoutUser()
      .then(() => {
        sessionStorage.removeItem('bearerToken');
        setAccessToken(null);
        setUserId(null);
        axios.defaults.headers['Authorization'] = null;
        navigate('/');
        setIsLogged(false);
        window.alert('Succesfully logged out');
      });
  };

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={3} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack as={'nav'}
                    display={{ base: 'none', md: 'flex' }}
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}
            >
              {/*{Links.map((link) => (*/}
              {/*  <NavLink key={link}>{link}</NavLink>*/}
              {/*))}*/}
              <NavLink to={'/courses'}>
                Courses
              </NavLink>
              <NavLink to={'/categories'}>
                Categories
              </NavLink>
            </HStack>
          </HStack>

          <HStack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>

            <Menu>
              <ColorModeSwitcher justifySelf='flex-end' />
            </Menu>

            {
              isLogged ?
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar
                      size={'sm'}
                      src={
                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    <NavLink to={`/user/${userId}`}>
                      <MenuItem minH='48px'>
                        Account
                      </MenuItem>
                    </NavLink>
                    <NavLink to={'/myList'}>
                    <MenuItem>My List</MenuItem>
                    </NavLink>
                    <MenuDivider />
                    <MenuItem minH='48px' onClick={logout}>Log out</MenuItem>
                  </MenuList>
                </Menu>
                :
                <>
                  <Menu>
                    <Button
                      as={'a'}
                      display={{ base: 'none', md: 'inline-flex' }}
                      fontSize={'sm'}
                      fontWeight={600}
                      color={'white'}
                      bg={'blue.400'}
                      href={'/login'}
                      _hover={{
                        bg: 'blue.300',
                      }}>
                      Log In
                    </Button>
                  </Menu>

                  <Menu>
                    <Button
                      as={'a'}
                      display={{ base: 'none', md: 'inline-flex' }}
                      fontSize={'sm'}
                      fontWeight={600}
                      color={'white'}
                      bg={'pink.400'}
                      href={'/register'}
                      _hover={{
                        bg: 'pink.300',
                      }}>
                      Register
                    </Button>
                  </Menu>
                </>
            }
          </HStack>
        </Flex>

        {/*{isOpen ? (*/}
        {/*  <Box pb={4} display={{ md: 'none' }}>*/}
        {/*    <Stack as={'nav'} spacing={4}>*/}
        {/*      {Links.map((link) => (*/}
        {/*        <NavLink key={link}>{link}</NavLink>*/}
        {/*      ))}*/}
        {/*    </Stack>*/}
        {/*  </Box>*/}
        {/*) : null}*/}

      </Box>
    </>
  );
}