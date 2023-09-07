'use client';

import {
  Box,
  Button, Card,
  Container,
  Flex,
  Heading, Icon,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text, Tooltip,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GetCourse, GetFiles } from '../../services/CoursesService';
import { useParams } from 'react-router';
import JSZip from 'jszip';
import InstructorCard from '../../components/InstructorCard';
import CourseRatings from '../../components/CourseRatings';
import { StarIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export default function CourseDetailsPage({ id }) {
  const params = useParams();

  const [course, setCourse] = useState(null);
  const [courseFiles, setCourseFiles] = useState([]);

  const color = useColorModeValue('gray.900', 'gray.400');
  const color1 = useColorModeValue('gray.200', 'gray.600');
  const color2 = useColorModeValue('gray.500', 'gray.400');
  const color3 = useColorModeValue('yellow.500', 'yellow.300');
  const color4 = useColorModeValue('gray.900', 'gray.50');
  const color5 = useColorModeValue('white', 'gray.900');

  const [videos, setVideos] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetFiles(params.id); // Replace with the actual course ID
        const zipData = await JSZip.loadAsync(response.data);

        let videoList = [];
        let pdf = null;

        for (const [relativePath, file] of Object.entries(zipData.files)) {
          if (file.dir) continue; // Skip directories

          const fileContent = await file.async('arraybuffer');
          if (relativePath.endsWith('.mp4')) {
            // It's a video file
            videoList.push({
              name: relativePath,
              data: fileContent,
            });
          } else if (relativePath.endsWith('.pdf')) {
            // It's a PDF file
            pdf = {
              name: relativePath,
              data: fileContent,
            };
          }
        }

        console.log(videoList, 'listtt');
        setVideos(videoList);
        setPdfFile(pdf);
      } catch (error) {
        console.error('Error streaming ZIP file:', error);
      }
    };

    console.log(params.id);
    GetCourse(params.id).then(r => {
      setCourse(r.data);
      fetchData();
    });
  }, []);

  return (
    <Container maxW={'7xl'}>
      {course &&
        <Flex flexDirection={'column'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Flex rounded={'md'}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={{ base: '100%', sm: '400px', lg: '500px' }}>
            {videos.map((video, index) => (
              <div key={index}>
                <h2>{video.name}</h2>
                <video controls>
                  <source src={URL.createObjectURL(new Blob([video.data], { type: 'video/mp4' }))} type='video/mp4' />
                </video>
              </div>
            ))}

            {courseFiles && courseFiles.length > 0 && courseFiles.map((file, index) =>
              <div key={index}>
                {file.type === 'mp4'
                  ? <video width='640' height='360' controls>
                    <source src={URL.createObjectURL(new Blob([file.path]))} type='video/mp4' />
                    Your browser does not support the video tag.
                  </video>
                  : ''}
                asd sads afsa fsa
              </div>,
            )}
            {/*<InstructorCard></InstructorCard>*/}
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Tooltip label='Click here to edit course' placement='top-start' hasArrow>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
                _hover={{
                  color: 'teal.500',
                }}
              >
                {course.name}
              </Heading>
              </Tooltip>
              <Icon as={StarIcon} h={5} w={5} color={color3} />
            </Box>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              // divider={
              //   <StackDivider borderColor={color1} />
              // }
              >
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={'pink.300'}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mt={'4'}>
                  About the course
                </Text>

                <Text
                  color={color2}
                  fontSize={'2xl'}
                  fontWeight={'300'}>
                  {course.description}
                </Text>


              {/*<Box>*/}
              {/*  <Text*/}
              {/*    fontSize={{ base: '16px', lg: '18px' }}*/}
              {/*    color={color3}*/}
              {/*    fontWeight={'500'}*/}
              {/*    textTransform={'uppercase'}*/}
              {/*    mb={'4'}>*/}
              {/*    Дополнителни материјали*/}
              {/*  </Text>*/}

              {/*  <List spacing={2}>*/}
              {/*    <ListItem>*/}
              {/*      <Text as={'span'} fontWeight={'bold'}>*/}
              {/*        Between lugs:*/}
              {/*      </Text>{' '}*/}
              {/*      20 mm*/}
              {/*    </ListItem>*/}
              {/*    <ListItem>*/}
              {/*      <Text as={'span'} fontWeight={'bold'}>*/}
              {/*        Bracelet:*/}
              {/*      </Text>{' '}*/}
              {/*      leather strap*/}
              {/*    </ListItem>*/}
              {/*    <ListItem>*/}
              {/*      <Text as={'span'} fontWeight={'bold'}>*/}
              {/*        Case:*/}
              {/*      </Text>{' '}*/}
              {/*      Steel*/}
              {/*    </ListItem>*/}
              {/*    <ListItem>*/}
              {/*      <Text as={'span'} fontWeight={'bold'}>*/}
              {/*        Case diameter:*/}
              {/*      </Text>{' '}*/}
              {/*      42 mm*/}
              {/*    </ListItem>*/}
              {/*    <ListItem>*/}
              {/*      <Text as={'span'} fontWeight={'bold'}>*/}
              {/*        Dial color:*/}
              {/*      </Text>{' '}*/}
              {/*      Black*/}
              {/*    </ListItem>*/}
              {/*    <ListItem>*/}
              {/*      <Text as={'span'} fontWeight={'bold'}>*/}
              {/*        Crystal:*/}
              {/*      </Text>{' '}*/}
              {/*      Domed, scratch‑resistant sapphire crystal with anti‑reflective treatment*/}
              {/*      inside*/}
              {/*    </ListItem>*/}
              {/*    <ListItem>*/}
              {/*      <Text as={'span'} fontWeight={'bold'}>*/}
              {/*        Water resistance:*/}
              {/*      </Text>{' '}*/}
              {/*      5 bar (50 metres / 167 feet){' '}*/}
              {/*    </ListItem>*/}
              {/*  </List>*/}
              {/*</Box>*/}
            </Stack>

            {/*<Button*/}
            {/*  rounded={'none'}*/}
            {/*  w={'full'}*/}
            {/*  mt={8}*/}
            {/*  size={'lg'}*/}
            {/*  py={'7'}*/}
            {/*  bg={color4}*/}
            {/*  color={color5}*/}
            {/*  textTransform={'uppercase'}*/}
            {/*  _hover={{*/}
            {/*    transform: 'translateY(2px)',*/}
            {/*    boxShadow: 'lg',*/}
            {/*  }}>*/}
            {/*  Add to My List*/}
            {/*</Button>*/}
          </Stack>
        </SimpleGrid>

          <Flex w={'full'}>
              <CourseRatings course={course} />
          </Flex>
        </Flex>
      }
    </Container>
  );
}