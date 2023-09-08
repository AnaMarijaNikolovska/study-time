import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component/dist/react-stars';
import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  StackDivider,
  theme,
  useColorModeValue,
} from '@chakra-ui/react';
import { AddRating } from '../services/RatingService';
import { useAccessTokenState } from '../context/AccessTokenContext';
import { RatingString } from './Rating';
import RatingMapper from './RatingMapper';

export default function AddUpdateCourseRating({ course, toggleRatingChanges, setToggleRatingChanges }) {

  const { authUser } = useAccessTokenState();

  const initialRating = {
    comment: '',
    star: RatingString[0],
    commenter_id: authUser?.id ?? 0,
    course_id: course.id,
  };

  const [rating, setRating] = useState(initialRating);


  const ratingChanged = newRating => {
    setRating({ ...rating, star: RatingString[newRating] });
  };

  const handleChange = name => event => {
    setRating({ ...rating, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();

    setRating({ ...rating, commenter_id: authUser?.id });

    AddRating(rating)
      .then(() => {
        setRating(initialRating);
        setToggleRatingChanges(!toggleRatingChanges);
        window.alert('success');
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box >
        <div className='flex-space_between'>
          <FormLabel>Rate:</FormLabel>
          <ReactStars
            onChange={ratingChanged}
            count={5}
            size={36}
            value={RatingMapper(rating.star)}
            // activeColor='#ffd700'
          />
        </div>

        <FormControl value={rating.comment} onChange={handleChange('comment')} as='textarea'
                     rows='5'
                     backgroundColor={'whiteAlpha.100'}
                     placeholder='Add Comment for this course' />
        <Button className='float-right mt-3 rounded-content' variant='outline-primary' type='submit'>
          Submit rating
        </Button>
        </Box>
      </form>
    </div>
  );
}