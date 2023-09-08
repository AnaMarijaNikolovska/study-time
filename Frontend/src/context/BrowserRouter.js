import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import Register from "../pages/user/Register";
import LogIn from "../pages/user/LogIn";
import UserDetailsPage from "../pages/user/UserDetailsPage";
import CoursesPage from "../pages/courses/CoursesPage";
import CourseDetailsPage from "../pages/courses/CourseDetailsPage";
import AddCoursePage from "../pages/courses/AddCoursePage";
import CategoriesPage from "../pages/category/CategoriesPage";
import CategoryDetailsPage from "../pages/category/CategoryDetailsPage";
import React from "react";
import {AddCategory} from "../services/CategoryService";

const routes = createRoutesFromElements(
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
)

const BrowserRouter = createBrowserRouter(routes);

export default BrowserRouter;