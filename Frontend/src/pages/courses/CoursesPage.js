import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardBody, Flex, Heading, SimpleGrid, Tooltip } from '@chakra-ui/react';
import { GetAllCourses } from '../../services/CoursesService';
import FileUploader from '../../components/FileUploader';
import { Link } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import CourseCard from '../../components/CourseCard';

export default function CoursesPage() {
  const [courses, setCourses] = useState(null);

  const [showAddCourseModal, setShowAddCourseModal] = useState(false);

  useEffect(() => {
    GetAllCourses()
      .then(r => setCourses(r.data));
  }, []);

  return (
    <Box>
      <Flex  justifyContent='center' >
        <Flex margin={'60px'} border={'2px solid transparent'} padding={'10px'}
              _hover={{
                color: 'teal.500',
                border : '2px solid',
                padding : '10px',
                borderRadius : '20px'
              }}>
          <Link to={'/courses/addCourse'}>
            <Tooltip marginBottom={'10px'} label='Click here to add a new course' placement='top' hasArrow>
              <Heading>
                Add Course
              </Heading>
            </Tooltip>
            {/*<Button as={AddIcon} size={'sm'}></Button>*/}
          </Link>
        </Flex>
      </Flex>
    <Flex justifyContent={'space-evenly'}  >
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