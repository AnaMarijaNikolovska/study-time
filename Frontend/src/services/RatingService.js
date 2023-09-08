import axios from "../AxiosConfig";

const ratingRoute = "/ratings";

const GetAllRatings = () => {
  return axios.get(`${ratingRoute}`);
}

const GetAllRatingsByCourseId = (courseId) => {
  return axios.get(`/courses/${courseId}/ratings`);
}

const GetRating = (id) => {
  return axios.get(`${ratingRoute}/${id}`);
}

const AddRating = (formData) => {
  return axios.post(`${ratingRoute}/create`, formData);
}

const EditRating= (id, formData) => {
  return axios.put(`${ratingRoute}/${id}`, formData);
}

const DeleteRating = (id) => {
  return axios.delete(`${ratingRoute}/delete/${id}`);
}



export {
  ratingRoute,
  GetAllRatings,
  GetRating,
  AddRating,
  EditRating,
  DeleteRating,
  GetAllRatingsByCourseId
}