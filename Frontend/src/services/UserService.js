import axios from "../AxiosConfig";

const usersRoute = "/users";

const UserRole = {
  User: 'Regular User',
  Instructor: 'Instructor'
}

const Gender = {
  Male: 'Male',
  Female: 'Female',
  Other: 'Other'
}

const GetAllUsers = (role = null) => {
  return axios.get(usersRoute, {
    params: {userRole: role}
  });
}

const GetUser = async (id) => {
  return await axios.get(`${usersRoute}/${id}`);
}

const GetAuthUser = () => {
  return axios.get(`auth-user`);
}

const LoginUser = (loginForm) => {
  return axios.post(`login`, loginForm)
}

const LogoutUser = () => {
  return axios.post(`${usersRoute}/logout`)
}

const RegisterUser = (userForm) => {
  return axios.post(`${usersRoute}/register`, userForm);
}

const EditUser = (userId, userForm) => {
  return axios.put(`${usersRoute}/${userId}`, userForm);
}

const DeleteUser = (userId) => {
  return axios.delete(`${usersRoute}/${userId}`);
}

export {
  UserRole,
  Gender,
  usersRoute,
  DeleteUser,
  EditUser,
  GetUser,
  GetAllUsers,
  LoginUser,
  RegisterUser,
  LogoutUser,
  GetAuthUser
}