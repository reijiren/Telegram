import React from "react";

import { BrowserRouter, Routes, Route, Outlet, Navigate} from "react-router-dom";

import Home from "../views/home/home";
import Login from "../views/login/login";
import AddRecipe from "../views/add_recipe/add_recipe";
import CodeResetPassword from "../views/code_reset_password/code_reset_password";
import DetailRecipe from "../views/detail_recipe/detail_recipe";
import DetailVideoRecipe from "../views/detail_vid_recipe/detail_vid_recipe";
import ForgotPassword from "../views/forgot_password/forgot_password";
import Profile from "../views/profile/profile";
import Register from "../views/register/register";
import ResetPassword from "../views/reset_password/reset_password";
import User from "../views/user/user";
import ListUser from "../views/listuser/listuser";
import ListRecipe from "../views/listrecipe/listrecipe";
import NotFound from "../views/notfound/notfound";
import UpdateRecipe from "../views/update_recipe/update_recipe";

import ScrollToTop from "../component/ScrollToTop";

const PrivateRoute = () => {
    const token = localStorage.getItem('token');

    if(token){
        return <Outlet />
    }else{
        alert('Anda perlu login terlebih dahulu');
        return <Navigate to='/login' />
    }
}

const Router = () => {
    return(
        <BrowserRouter>
            <ScrollToTop/>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="codereset" element={<CodeResetPassword />} />
                    <Route path="forgotpassword" element={<ForgotPassword />} />
                    <Route path="register" element={<Register />} />
                    <Route path="resetpassword" element={<ResetPassword />} />
                </Route>
                <Route path="/"  element={<PrivateRoute />}>
                    <Route path="addrecipe" element={<AddRecipe />} />
                    <Route path="detailrecipe" element={<DetailRecipe />} />
                    <Route path="detailrecipe/:title" element={<UpdateRecipe />} />
                    <Route path="detailvideo" element={<DetailVideoRecipe />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="recipe" element={<ListRecipe />} />
                    <Route path="user" element={<ListUser />} />
                    <Route path="user/:email" element={<User />} />
                </Route>
                <Route path="*" element={<NotFound />} />
                    
            </Routes>
        </BrowserRouter>
    )
}

export default Router;