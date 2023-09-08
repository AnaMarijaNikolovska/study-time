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
import React, {useEffect, useState} from 'react';
import {GetCourse, GetFiles} from '../../services/CoursesService';
import {useParams} from 'react-router';
import JSZip from 'jszip';
import InstructorCard from '../../components/InstructorCard';
import CourseRatings from '../../components/CourseRatings';
import {AddIcon, CheckIcon, DeleteIcon, StarIcon} from '@chakra-ui/icons';
import {Link} from 'react-router-dom';
import {useAccessTokenState} from "../../context/AccessTokenContext";
import {AttachCourse, ListUserCoursers} from "../../services/UserService";
import {DeleteRating} from "../../services/RatingService";

export default function CourseDetailsPage({id}) {
    const params = useParams();
    const {authUser} = useAccessTokenState();

    const [course, setCourse] = useState(null);
    const [averageRating, setAverageRating] = useState(0);

    const color = useColorModeValue('gray.900', 'gray.400');
    const color1 = useColorModeValue('gray.200', 'gray.600');
    const color2 = useColorModeValue('gray.500', 'gray.400');
    const color3 = useColorModeValue('yellow.500', 'yellow.300');
    const color4 = useColorModeValue('gray.900', 'gray.50');
    const color5 = useColorModeValue('white', 'gray.900');

    const [videos, setVideos] = useState([]);
    const [pdfFile, setPdfFile] = useState(null);
    const [courseBelongsToUser, setCourseBelongsToUser] = useState(false);

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

                setVideos(videoList);
                setPdfFile(pdf);
            } catch (error) {
                console.log('Error streaming ZIP file:', error);
            }
        };

        GetCourse(params.id).then(r => {
            setCourse(r.data);
            fetchData();
        });
    }, []);

    useEffect(() => {
        console.log(authUser, 'aa')
        if (!authUser && !course) {
            return;
        }

        ListUserCoursers(authUser.id)
            .then(res => {
                setCourseBelongsToUser(res.data.some(x => x.id === course.id));
            })

    }, [authUser])

    const addToMyList = () => {
        AttachCourse(authUser.id, course.id)
            .then(() => setCourseBelongsToUser(true))
            .catch(err => console.log(err));
    };

    return (
        <Container maxW={'7xl'}>
            {course &&
                <Flex flexDirection={'column'}>
                    <SimpleGrid
                        columns={{base: 1, lg: 2}}
                        spacing={{base: 8, md: 10}}
                        py={{base: 18, md: 24}}>
                        <Flex rounded={'md'}
                              fit={'cover'}
                              align={'center'}
                              w={'100%'}
                              h={{base: '100%', sm: '400px', lg: '500px'}}>
                            {videos.map((video, index) => (
                                <div key={index}>
                                    <h2>{video.name}</h2>
                                    <video controls>
                                        <source src={URL.createObjectURL(new Blob([video.data], {type: 'video/mp4'}))}
                                                type='video/mp4'/>
                                    </video>
                                </div>
                            ))}
                            {/*<InstructorCard></InstructorCard>*/}
                        </Flex>
                        <Stack spacing={{base: 6, md: 10}}>
                            <Box as={'header'}>
                                <Tooltip label='Click here to edit course' placement='top-start' hasArrow>
                                    <Heading
                                        lineHeight={1.1}
                                        fontWeight={600}
                                        fontSize={{base: '2xl', sm: '4xl', lg: '5xl'}}
                                        _hover={{
                                            color: 'teal.500',
                                        }}
                                    >
                                        {course.name}
                                    </Heading>
                                </Tooltip>
                                {averageRating > 0 ?
                                    Array.from({length: averageRating}).map((_, index) => (
                                        <Icon key={index} as={StarIcon} h={5} w={5} color={color3}/>))
                                    :
                                    Array.from({length: 5}).map((_, index) => (
                                        <Icon key={index} as={StarIcon} h={5} w={5} color={color1}/>))
                                }
                            </Box>
                            <Stack
                                spacing={{base: 4, sm: 6}}
                                direction={'column'}
                            >
                                <Text
                                    fontSize={{base: '16px', lg: '18px'}}
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

                                {authUser?.id === course.instructor_id &&
                                    <Button leftIcon={<DeleteIcon/>} colorScheme='red'
                                            variant={"solid"}>Delete</Button>
                                }

                                {authUser ? !courseBelongsToUser ?
                                        <Button onClick={addToMyList} leftIcon={<AddIcon/>} colorScheme='linkedin'
                                                variant={"solid"}>Add to my list </Button>
                                        : <Button disabled={true} rightIcon={< CheckIcon/>} colorScheme='teal'
                                                  variant='outline'>
                                            Already in your list
                                        </Button>
                                    : null
                                }


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
                        <CourseRatings course={course} setAverageRating={setAverageRating}/>
                    </Flex>
                </Flex>
            }
        </Container>
    );
}