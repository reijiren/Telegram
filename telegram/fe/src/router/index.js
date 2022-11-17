import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import Login from '../pages/login';
import Register from '../pages/register';
import Home from '../pages/home';

export default function Router() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path='/'>
                    <Route index element={<Home />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}