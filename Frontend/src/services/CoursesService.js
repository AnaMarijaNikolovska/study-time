import axios from '../AxiosConfig';

const courseRoute = '/courses';

const GetAllCourses = () => {
  return axios.get(`${courseRoute}`);
};

const GetAllCoursesByCategoryId = (categoryId) => {
  return axios.get(`${courseRoute}/category/${categoryId}`);
};

const GetCourse = (id) => {
  return axios.get(`${courseRoute}/${id}`);
};

const AddCourse = (formData) => {
  return axios.post(`${courseRoute}/create`, formData);
};

const EditCourse = (id, formData) => {
  return axios.put(`${courseRoute}/update/${id}`, formData);
};

const DeleteCourse = (id) => {
  return axios.delete(`${courseRoute}/${id}`);
};

const GetFiles = async (id) => {
  return await axios.get(`${courseRoute}/${id}/files`, {
    responseType: 'arraybuffer',
  });
};

const UploadFile = async (id, formData) => {
  return await axios.post(`${courseRoute}/${id}/files`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export {
  courseRoute,
  GetAllCourses,
  GetAllCoursesByCategoryId,
  GetCourse,
  AddCourse,
  EditCourse,
  DeleteCourse,
  GetFiles,
  UploadFile,
};