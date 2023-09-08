import React, {useEffect, useState} from 'react';
import {Box, Flex, Heading, SimpleGrid, Tooltip} from '@chakra-ui/react';
import {GetAllCourses} from '../../services/CoursesService';
import {Link} from 'react-router-dom';
import CourseCard from '../../components/CourseCard';
import {useAccessTokenState} from "../../context/AccessTokenContext";
import {UserRole} from "../../services/UserService";

export default function CoursesPage() {
    const {authUser} = useAccessTokenState();
    const [courses, setCourses] = useState(null);

    const [showAddCourseModal, setShowAddCourseModal] = useState(false);

    useEffect(() => {
        GetAllCourses()
            .then(r => setCourses(r.data));
    }, [authUser]);

    return (
        <Box>
            <Flex justifyContent='center'>
                <Flex margin={'60px'} border={'2px solid transparent'} padding={'10px'}
                      _hover={{
                          color: 'teal.500',
                          border: '2px solid',
                          padding: '10px',
                          borderRadius: '20px'
                      }}>
                    {authUser?.role === UserRole.Instructor ?
                        <Link to={'/courses/addCourse'}>
                            <Tooltip marginBottom={'10px'} label='Click here to add a new course' placement='top'
                                     hasArrow>
                                <Heading>
                                    Add Course
                                </Heading>
                            </Tooltip>
                        </Link>
                        : <Heading>
                            Courses Page
                        </Heading>
                    }
                </Flex>
            </Flex>
            <Flex justifyContent={'space-evenly'}>
                <SimpleGrid columns={4} spacing={9}>
                    {courses && courses.length > 0 && courses.map((course, index) =>
                        <Link key={index} to={`/courses/${course.id}`}>
                            <CourseCard course={course}/>
                        </Link>
                    )}
                </SimpleGrid>
            </Flex>
        </Box>

    );
}