import React, { useEffect, useState } from 'react';
import { GetAllCoursesByCategoryId } from '../../services/CoursesService';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import CourseCard from '../../components/CourseCard';
import EditCategoryModal from '../../modals/EditCategoryModal';
import { Button, useDisclosure } from '@chakra-ui/react';
import { GetCategory } from '../../services/CategoryService';

export default function CategoryDetailsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [category, setCategory] = useState(null);
  const [categoryCourses, setCategoryCourses] = useState(null);
  const params = useParams();

  useEffect(() => {
    GetCategory(params.id).then(res => {
      setCategory(res.data);
      GetAllCoursesByCategoryId(params.id).then(r => {
        setCategoryCourses(r.data);
      });

    });
  }, [params.id, isOpen]);

  return (
    category &&
    <>
      <h1>asfsafsa</h1>
      <h1>{category.name}</h1>
      <h1>{category.description}</h1>
      {categoryCourses && categoryCourses.length > 0 && categoryCourses.map((course, index) =>
        <Link key={index} to={`/courses/${course.id}`}>
          <CourseCard course={course} />
        </Link>,
      )}
      <Button onClick={onOpen}>Open Modal</Button>

      <EditCategoryModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} categoryToEdit={category}>
      </EditCategoryModal>
    </>
  );
}