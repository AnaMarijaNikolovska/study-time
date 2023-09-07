'use client'

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
} from '@chakra-ui/react'
import { IoAnalyticsSharp, IoLogoBitcoin, IoSearchSharp } from 'react-icons/io'
import { ReactElement } from 'react'
import { AtSignIcon, BellIcon, CheckCircleIcon, HamburgerIcon } from '@chakra-ui/icons';
import StudyTimeLogo from '../assets/StudyTimeLogo.png'
const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  )
}

export default function HomePage() {
  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Our Story
          </Text>
          <Heading>Welcome to STUDY TIME</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Your Gateway to Online Learning!
            <br/>
            <br/>
            Discover the future of education and
            explore online courses for personal and professional growth.
            <br/>
            Join us today and start your learning adventure!
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
            }>
            <Feature
              icon={<Icon as={CheckCircleIcon} color={'yellow.500'} w={5} h={5} />}
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={'Learn new skills'}
            />
            <Feature
              icon={<Icon as={CheckCircleIcon} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Improve old skills'}
            />
            <Feature
              icon={<Icon as={CheckCircleIcon} color={'purple.500'} w={5} h={5} />}
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'....'}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={StudyTimeLogo}
            objectFit={'cover'}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  )
}