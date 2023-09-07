import axios from "../AxiosConfig";

const categoryRoute = "/category";

const GetAllCategories = () => {
  return axios.get(`${categoryRoute}`);
}

const GetCategory = (id) => {
  return axios.get(`${categoryRoute}/${id}`);
}

const AddCategory = (formData) => {
  return axios.post(`${categoryRoute}/create`, formData);
}

const EditCategory = (id, formData) => {
  return axios.put(`${categoryRoute}/update/${id}`, formData);
}

const DeleteCategory = (id) => {
  return axios.delete(`${categoryRoute}/${id}`);
}

export {
  categoryRoute,
  GetAllCategories,
  GetCategory,
  AddCategory,
  EditCategory,
  DeleteCategory,
}