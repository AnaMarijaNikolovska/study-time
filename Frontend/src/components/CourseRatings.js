import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { DeleteRating, GetAllRatingsByCourseId } from '../services/RatingService';
import RatingMapper from './RatingMapper';
import AddUpdateCourseRating from './AddUpdateReactRating';
import { Card, Heading, StackDivider, theme, useColorModeValue } from '@chakra-ui/react';

export default function CourseRatings({ course }) {

  const [toggleRatingChanges, setToggleRatingChanges] = useState(false);
  const [courseRatings, setCourseRatings] = useState(null);
  const color = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    GetAllRatingsByCourseId(course.id)
      .then(res => {
        console.log('course ratings', res.data);
        setCourseRatings(res.data);
      })
      .catch(err => console.log(err));
  }, [toggleRatingChanges]);

  const deleteRating = ratingId => () => {
    DeleteRating(ratingId)
      .then(() => window.location.reload())
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Heading> Course Ratings</Heading>
      {courseRatings && courseRatings.length
        ? courseRatings.map((rating, index) => <div key={index}>
            <ReactStars
              count={5}
              size={30}
              edit={false}
              value={RatingMapper(rating.star)}
              // activeColor='#ffd700'
            />
            <div className='flex-space_between'>
              <p className='text-left'>User: {rating.commenter?.name}</p>
            </div>
            <p className='text-left'>Comment: {rating.comment}</p>
          <br/>

          </div>,
        )
        : <p>No ratings are given yet</p>}

      {
        course &&
        <>
          <hr width='1200' align='center' />
          <AddUpdateCourseRating course={course} toggleRatingChanges={toggleRatingChanges} setToggleRatingChanges={setToggleRatingChanges} />
        </>
      }
    </div>
  );
}