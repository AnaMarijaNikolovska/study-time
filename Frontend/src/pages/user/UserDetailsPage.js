'use client';

import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react';
import {ReactElement, useEffect, useState} from 'react';
import {IoLogoBitcoin} from 'react-icons/all';
import {GetAuthUser, GetUser} from '../../services/UserService';
import {useAccessTokenUpdater} from '../../context/AccessTokenContext';
import CourseCard from '../../components/CourseCard';
import {AtSignIcon} from '@chakra-ui/icons';
import {useParams} from "react-router";

// interface FeatureProps {
//   text: string
//   iconBg: string
//   icon?: ReactElement
// }

const Feature = ({text, icon, iconBg},
                 // : FeatureProps
) => {
    return (
        <Stack direction={'row'} align={'center'}>
            <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{text}</Text>
        </Stack>
    );
};

export default function UserDetailsPage() {
    const [user, setUser] = useState(null);
    const color3 = useColorModeValue('teal.500', 'teal.300');
    const color4 = useColorModeValue('yellow.100', 'yellow.900');
    const params = useParams();

    useEffect(() => {
        GetUser(params.id)
            .then(r => {
                setUser(r.data);
            });
    }, [params.id]);


    return (
        <Container maxW={'5xl'} py={12}>
            <Flex>
                <SimpleGrid columns={{base: 1, md: 2}} spacing={10}>
                    <Flex>
                        <Image
                            rounded={'md'}
                            alt={'feature image'}
                            src={
                                'https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                            }
                            objectFit={'cover'}
                        />
                    </Flex>
                    <Stack spacing={4}>
                        <Heading>User Name</Heading>
                        <Text color={'gray.500'} fontSize={'lg'}>
                            About me
                        </Text>
                        <Stack
                            spacing={4}
                            divider={
                                <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')}/>
                            }
                        >
                            <Feature
                                icon={<Icon as={AtSignIcon} color={'yellow.500'} w={4} h={4}/>}
                                iconBg={color4}
                                text={'E-mail'}
                            />
                            {/*<Feature*/}
                            {/*  // icon={<Icon as={IoLogoBitcoin()} color={'green.500'} w={5} h={5} />}*/}
                            {/*  // iconBg={useColorModeValue('green.100', 'green.900')}*/}
                            {/*  text={'Phone Number'}*/}
                            {/*/>*/}
                            {/*<Feature*/}
                            {/*  // icon={<Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />}*/}
                            {/*  // iconBg={useColorModeValue('purple.100', 'purple.900')}*/}
                            {/*  text={'Market Analysis'}*/}
                            {/*/>*/}
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Flex>
            <Flex marginTop={'30px'} flexDirection={'column'}>
                <Flex>
                    <Text fontSize='3xl' color={color3}> My Courses</Text>
                </Flex>
                <Flex justifyContent={'space-evenly'}>
                    {/*<SimpleGrid columns={3} spacing={9}>*/}
                    {/*  <CourseCard></CourseCard>*/}
                    {/*  <CourseCard></CourseCard>*/}
                    {/*  <CourseCard></CourseCard>*/}
                    {/*  <CourseCard></CourseCard>*/}
                    {/*</SimpleGrid>*/}

                </Flex>
            </Flex>


        </Container>
    );
}