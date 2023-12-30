import React, { lazy, Fragment } from 'react'
import { Navigate, Routes, Route } from 'react-router'
import Loadable from '../components/shared/Loadable'
import MainLayout from '../Layout/Main/MainLayout';
import HomePage from '../pages/Landing/Home';
import Landing from '../pages/Landing/Landing';
import About from '../pages/Landing/About';
import Contact from '../pages/Landing/Contact';
import Error400 from '../utilities/authentication/Error400';
import { useSelector } from 'react-redux';
import ErrorModal from '../utilities/ErrorModal';
import CustomAlert from '../utilities/Alert';
import PrivateRoute from './PrivateRoute'

const Router = () => {
    const Login = Loadable(lazy(() => import('../pages/authPages/Login')));
    const Register = Loadable(lazy(() => import('../pages/authPages/Register')));

    // protected routes
    const Home = Loadable(lazy(() => import('../pages/dashboard/Home')));
    const Users_List = Loadable(lazy(() => import('../pages/dashboard/users/list')));

    // accessing error slice
    const { error, isError } = useSelector((state) => state.error);

    return (
        <Fragment>
            {/* Global Error Handler */}
            <ErrorModal />
            {/* using global alert */}
            <CustomAlert />
            <Routes>
                {/* public routes */}
                <Route element={<Landing />}>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                </Route>

                {/* protected routes */}
                <Route path='/app' element={<MainLayout />} >
                    <Route path='/app' element={<PrivateRoute />}>
                        <Route path='/app/' element={<Navigate to="/app/home" />} />
                        <Route path='/app/home' element={<Home />} />
                        <Route path='/app/users' element={<Users_List />} />
                    </Route>
                </Route>

                {/* auth routes */}
                <Route path='/auth'>
                    <Route path='/auth/login' element={<Login />} />
                    <Route path='/auth/register' element={<Register />} />

                    {/* Errors routes */}
                    <Route path="/auth/404" element={<Error400 />} />
                </Route>
                {/* unknown routes */}
                <Route path="*" element={<Navigate to="/auth/404" />} />
            </Routes>
        </Fragment>
    )
}

export default Router