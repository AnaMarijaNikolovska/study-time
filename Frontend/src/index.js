import {ColorModeScript} from '@chakra-ui/react';
import React, {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import {ChakraProvider} from '@chakra-ui/react';

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import Register from './pages/user/Register';
import LogIn from './pages/user/LogIn';
import AddCoursePage from './pages/courses/AddCoursePage';
import HomePage from './pages/HomePage';
import AddCategory from './pages/category/AddCategory';
import CategoriesPage from './pages/category/CategoriesPage';
import CoursesPage from './pages/courses/CoursesPage';
import CourseDetailsPage from './pages/courses/CourseDetailsPage';
import CategoryDetailsPage from './pages/category/CategoryDetailsPage';
import UserDetailsPage from './pages/user/UserDetailsPage';
import {AccessTokenProvider} from './context/AccessTokenContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>}>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<LogIn/>}/>
            <Route path='/userDetails/' element={<UserDetailsPage/>}/>
            <Route path='/courses' element={<CoursesPage/>}/>
            <Route path='/courses/:id' element={<CourseDetailsPage/>}/>
            <Route path='/courses/addCourse' element={<AddCoursePage/>}/>
            <Route path='/categories' element={<CategoriesPage/>}/>
            <Route path='/categories/addCategory' element={<AddCategory/>}/>
            <Route path='/categories/:id' element={<CategoryDetailsPage/>}/>
            <Route path='/users/:id' element={<UserDetailsPage/>}/>
        </Route>,
    ),
);

root.render(
    <StrictMode>
        <ChakraProvider>
            <ColorModeScript/>
            <AccessTokenProvider>
                <RouterProvider router={router}/>
            </AccessTokenProvider>
        </ChakraProvider>
    </StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
