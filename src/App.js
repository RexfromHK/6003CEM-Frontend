import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import PrivateRoutes from './utils/PrivateRoutes';
import PublicRoutes from './utils/PublicRoutes';
import { getToken, removeUserSession, setUserSession } from './utils/common';

import UserLogin from './pages/UserLogin';
import UserSignUp from './pages/UserSignUp';
import UserHome from './pages/UserHome';
import UserMessage from './pages/UserMessage';
import UserFavorite from './pages/UserFavorite';

import StaffLogin from './pages/StaffLogin';
import StaffSignUp from './pages/StaffSignUp';
import StaffHome from './pages/StaffHome';
import StaffAddcat from './pages/StaffAddcat';
import StaffEditcat from './pages/StaffEditcat';
import StaffMessage from './pages/StaffMessage';

import NotFound from './pages/NotFound';

import Test from './pages/test';

function App() {
    const [authLoading, setAuthLoading] = useState(true);
    useEffect(() => {
        const token = getToken();
        if (!token) {
            return;
        }

        axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
            setUserSession(response.data.token, response.data.user);
            setAuthLoading(false);
        }).catch(error => {
            removeUserSession();
            setAuthLoading(false);
        });
    }, []);

    if (authLoading && getToken()) {
        return <div className="content">Checking Authentication...</div>
    }

    return (
        <BrowserRouter>
            <div className="content">
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route index element={<UserLogin />} />
                    <Route path="/test" element={<Test />} />

                    <Route path="/user/login" element={<UserLogin />} />
                    <Route path="/user/signup" element={<UserSignUp />} />
                    <Route path="/user/home" element={<UserHome />} />
                    <Route path="/user/message" element={<UserMessage />} />
                    <Route path="/user/favorite" element={<UserFavorite />} />

                    <Route path="/staff/login" element={<StaffLogin />} />
                    <Route path="/staff/signup" element={<StaffSignUp />} />
                    <Route path="/staff/home" element={<StaffHome />} />
                    <Route path="/staff/addcat" element={<StaffAddcat />} />
                    <Route path="/staff/editcat/:catid" element={<StaffEditcat />} />
                    <Route path="/staff/message" element={<StaffMessage />} />


                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
