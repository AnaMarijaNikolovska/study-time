import React, {useEffect, useState} from 'react';
import ReactStars from 'react-rating-stars-component';
import {DeleteRating, GetAllRatingsByCourseId} from '../services/RatingService';
import RatingMapper from './RatingMapper';
import AddUpdateCourseRating from './AddUpdateReactRating';
import {Heading, IconButton} from '@chakra-ui/react';
import {DeleteIcon} from "@chakra-ui/icons";
import {Rating} from "./Rating";
import {useAccessTokenState} from "../context/AccessTokenContext";

export default function CourseRatings({course, setAverageRating}) {
    const [toggleRatingChanges, setToggleRatingChanges] = useState(false);
    const [courseRatings, setCourseRatings] = useState(null);
    const {authUser} = useAccessTokenState();


    useEffect(() => {
        GetAllRatingsByCourseId(course.id)
            .then(res => {
                let average = 0;
                res.data.forEach(x => average += Rating[x.star]);

                setCourseRatings(res.data);
                setAverageRating(Math.round(average / res.data.length))
            })
            .catch(err => console.log(err));
    }, [toggleRatingChanges, authUser]);

    const deleteRating = ratingId => () => {
        DeleteRating(ratingId)
            .then(() => setToggleRatingChanges(!toggleRatingChanges))
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
                        {authUser?.id === rating.commenter_id && <IconButton
                            size={'md'}
                            icon={<DeleteIcon/>}
                            aria-label={'Delete'}
                            onClick={deleteRating(rating?.id)}
                        />}
                        <br/>
                    </div>,
                )
                : <p>Be the first one to say something about this course.</p>}

            {
                course &&
                <>
                    <hr width='1200' align='center'/>
                    <AddUpdateCourseRating course={course} toggleRatingChanges={toggleRatingChanges}
                                           setToggleRatingChanges={setToggleRatingChanges}/>
                </>
            }
        </div>
    );
}