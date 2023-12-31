import { Rating as Ratings } from './Rating';

const RatingMapper = (ratingName) => {
  switch (ratingName) {
    case "None":
      return Ratings.None;
    case "Bad":
      return Ratings.Bad;
    case "NotBad":
      return Ratings.NotBad;
    case "Good":
      return Ratings.Good;
    case "VeryGood":
      return Ratings.VeryGood;
    case "Perfect":
      return Ratings.Perfect;
    default :
      return Ratings.None
  }
}

export default RatingMapper