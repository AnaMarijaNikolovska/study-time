import axios from "../AxiosConfig";

const mylistRoute = "/mylist";


const GetMyList = (id) => {
  return axios.get(`${mylistRoute}/${id}`);
}

const AddMyList = (formData) => {
  return axios.post(`${mylistRoute}/create`, formData);
}

const EditMyList= (id, formData) => {
  return axios.put(`${mylistRoute}/${id}`, formData);
}

const DeleteMyList = (id) => {
  return axios.delete(`${mylistRoute}/${id}`);
}



export {
  GetMyList,
  AddMyList,
  EditMyList,
  DeleteMyList
}