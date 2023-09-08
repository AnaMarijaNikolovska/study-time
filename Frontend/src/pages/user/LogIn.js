'use client';

import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import {useState} from 'react';
import {LoginUser} from '../../services/UserService';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {useNavigate} from 'react-router-dom';
import {useAccessTokenUpdater} from '../../context/AccessTokenContext';
import axios from '../../AxiosConfig';


export default function LogIn() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {setAccessToken, setAuthUser} = useAccessTokenUpdater();

    const logInUser = {
        email: '',
        password: '',
    };

    const [user, setUser] = useState(logInUser);

    const handleChange = name => event => {
        setUser({...user, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();

        LoginUser(user).then(r => {

            axios.defaults.headers['Authorization'] = `Bearer ${r.data.token}`;

            sessionStorage.setItem('bearerToken', `Bearer ${r.data.token}`);
            setAccessToken(`Bearer ${r.data.token}`);
            setAuthUser(r.data.user);
            navigate(`/`);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id='email'>
                                <FormLabel>Email address</FormLabel>
                                <Input type='email' onChange={handleChange('email')}/>
                            </FormControl>
                            <FormControl id='password'>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'}
                                           onChange={handleChange('password')}/>
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                            {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    type={'submit'}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign in
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Not a user yet? <Link href='/register' color={'blue.400'}>Register</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </form>

    );
}