import React, { useEffect } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/user/Register';
import LogIn from './pages/user/LogIn';
import AddCoursePage from './pages/courses/AddCoursePage';
import HomePage from './pages/HomePage';
import AddCategory from './pages/category/AddCategory';
import CategoriesPage from './pages/category/CategoriesPage';
import Header from './components/Header';
import CoursesPage from './pages/courses/CoursesPage';
import CourseDetailsPage from './pages/courses/CourseDetailsPage';
import UserDetailsPage from './pages/user/UserDetailsPage';
import { useAccessTokenUpdater } from './context/AccessTokenContext';
import axios from './AxiosConfig';
import { GetAuthUser } from './services/UserService';
import CategoryDetailsPage from './pages/category/CategoryDetailsPage';

function App() {

  const { setAccessToken, setAuthUser } = useAccessTokenUpdater();

  useEffect(() => {
    if (sessionStorage.getItem('bearerToken')) {
      axios.defaults.headers['Authorization'] = sessionStorage.getItem('bearerToken');
      setAccessToken(sessionStorage.getItem('bearerToken'));

      GetAuthUser()
        .then(r => {
          setAuthUser(r.data.user);
        })
        .catch(err => {
          sessionStorage.removeItem('bearerToken');
          axios.defaults.headers['Authorization'] = null;
          window.alert('Your session has expired, try to log in again');
          setAccessToken(null);
          setAuthUser(null);
        });
    }

  }, []);


  return (
    <ChakraProvider theme={theme}>
      <Header />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<LogIn />} />

        {/*for user*/}
        <Route path='/users/:id' element={<UserDetailsPage />} />

        {/*for course*/}
        <Route path='/courses' element={<CoursesPage />} />
        <Route path='/courses/:id' element={<CourseDetailsPage />} />
        <Route path='/courses/addCourse' element={<AddCoursePage />} />

        {/*for category*/}
        <Route path='/categories' element={<CategoriesPage />} />
        <Route path='/categories/:id' element={<CategoryDetailsPage />} />
        <Route path='/categories/addCategory' element={<AddCategory />} />
      </Routes>

    </ChakraProvider>
  );
}

export default App;
