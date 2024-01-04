import React, { lazy, Fragment } from 'react'
import { Navigate, Routes, Route } from 'react-router'
import Loadable from '../components/shared/Loadable'
import MainLayout from '../Layout/Main/MainLayout';
import HomePage from '../pages/Landing/Home';
import Landing from '../pages/Landing/Landing';
import About from '../pages/Landing/About';
import Contact from '../pages/Landing/Contact';
import Error400 from '../views/authentication/Error400';
import { useSelector } from 'react-redux';
import ErrorModal from '../views/utilities/ErrorModal';
import AccessDenied from '../pages/authPages/AccessDenied'
import PrivateRoute from './PrivateRoute'
import { Toaster } from 'react-hot-toast'

const Router = () => {
    const Login = Loadable(lazy(() => import('../pages/authPages/Login')));
    const Register = Loadable(lazy(() => import('../pages/authPages/Register')));

    // protected routes
    const Home = Loadable(lazy(() => import('../pages/dashboard/Home')));
    const Users_List = Loadable(lazy(() => import('../pages/dashboard/users/list')));
    const Properties_List = Loadable(lazy(() => import('../pages/dashboard/Properties/list')));
    const NewPropertiesList = Loadable(lazy(() => import('../pages/dashboard/Properties/CreateProperty')));
    const EditProperty = Loadable(lazy(() => import('../pages/dashboard/Properties/EditProperty')));
    const Address_List = Loadable(lazy(() => import('../pages/dashboard/Adresses/list')));

    // accessing error slice
    useSelector((state) => state.error);

    return (
        <Fragment>
            {/* Global Error Handler */}
            <ErrorModal />
            {/* using global alert */}
            <Toaster
                position="top-right"
                reverseOrder={true}
            />
            <Routes>
                {/* public routes */}
                <Route element={<Landing />}>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                </Route>

                {/* protected routes for admin */}
                <Route path='/app' element={<PrivateRoute allowedRoles={['admin', 'user']} />}>
                    <Route path='/app' element={<MainLayout />} >
                        <Route path='/app/' element={<Navigate to="/app/home" />} />
                        <Route path='/app/home' element={<Home />} />
                        <Route path='/app/properties' element={<Properties_List />} />
                        <Route path='/app/properties/new' element={<NewPropertiesList />} />
                        <Route path='/app/properties/edit/:id' element={<EditProperty />} />

                        {/* only for admin */}
                        <Route path='/app/' element={<PrivateRoute allowedRoles={['admin']} />}>
                            <Route path='/app/users' element={<Users_List />} />
                            <Route path='/app/addresses' element={<Address_List />} />
                        </Route>
                    </Route>
                </Route>

                {/* auth routes */}
                <Route path='/auth'>
                    <Route path='/auth/login' element={<Login />} />
                    <Route path='/auth/register' element={<Register />} />

                    {/* Errors routes */}
                    <Route path="/auth/404" element={<Error400 />} />
                    <Route path="/auth/404" element={<Error400 />} />
                    <Route path='/auth/403' element={<AccessDenied />} />
                </Route>
                {/* unknown routes */}
                <Route path="*" element={<Navigate to="/auth/404" />} />
            </Routes>
        </Fragment>
    )
}

export default Router