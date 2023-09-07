import axios from "../AxiosConfig";

const usersRoute = "/user";

const UserRole = {
  User: 'User',
  LocationOwner: 'LocationOwner',
  Admin: 'Admin'
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

const GetUser = (id) => {
  return axios.get(`${usersRoute}/${id}`);
}

const GetAuthUser = () => {
  return axios.get(`${usersRoute}/profile`);
}

const LoginUser = (loginForm) => {
  return axios.post(`login`, loginForm)
}

const LogoutUser = () => {
  return axios.post(`${usersRoute}/logout`)
}

const RegisterUser = (userForm) => {
  return axios.post(`${usersRoute}/create`, userForm);
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