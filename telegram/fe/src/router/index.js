import React from 'react';
import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import Login from '../pages/login';
import Register from '../pages/register';

const PrivateRoute = () => {
	const token = localStorage.getItem("token");

	if (token) {
		return <Outlet />;
	} else {
		alert("Please login first");
		return <Navigate to="/login" />;
	}
};

export default function Router() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path='/'>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}