'use client';

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link, Switch, RadioGroup, Radio,
} from '@chakra-ui/react';
import {useState} from 'react';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {Gender, RegisterUser, UserRole} from '../../services/UserService';
import {useNavigate} from 'react-router-dom';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const initialUser = {
        name: '',
        surname: '',
        email: '',
        password: '',
        role: UserRole.User,
        gender: Gender.Male
    };

    const [user, setUser] = useState(initialUser);

    const [userPhoto, setUserPhoto] = useState(null);

    const handleChange = name => event => {
        console.log(user);
        if (name !== 'isInstructor' && name !== 'gender') {
            setUser({...user, [name]: event.target.value});
        } else if(name === 'isInstructor') {
            let userRole = event.target.checked ? UserRole.Instructor : UserRole.User
            setUser({...user, role: userRole});
        } else {
            setUser({...user, [name]: event});
        }
    };

    const handleDrop = event => {
        let file = event.target.files[0];
        setUserPhoto(file);
    };

    const handleSubmit = event => {
        event.preventDefault();
        RegisterUser(user).then(r => {
            navigate("/login");
            window.location.reload();
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
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign up
                        </Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <HStack>
                                <Box>
                                    <FormControl id='firstName' isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input type='text' onChange={handleChange('name')}/>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id='lastName'>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input type='text' onChange={handleChange('surname')}/>
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id='email' isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type='email' onChange={handleChange('email')}/>
                            </FormControl>
                            <FormControl id='password' isRequired>
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
                            <FormControl display='flex' alignItems='center'>
                                <FormLabel htmlFor='user-role' mb='0'>
                                    User
                                </FormLabel>
                                <Switch id='user-role' onChange={handleChange("isInstructor")}/>
                                <FormLabel htmlFor='user-role' mb='0' pl='2'>
                                    Instructor
                                </FormLabel>
                            </FormControl>
                            <FormControl as='fieldset'>
                                <FormLabel as='legend'>
                                    Gender
                                </FormLabel>
                                <RadioGroup onChange={handleChange("gender")} value={user.gender}>
                                    <HStack spacing='24px'>
                                        <Radio value={Gender.Male}>{Gender.Male}</Radio>
                                        <Radio value={Gender.Female}>{Gender.Female}</Radio>
                                        <Radio value={Gender.Other}>{Gender.Other}</Radio>
                                    </HStack>
                                </RadioGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    type={'submit'}
                                    loadingText='Submitting'
                                    size='lg'
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link href='logIn' color={'blue.400'}>Login</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </form>
    );
}