import React, { lazy, Fragment } from 'react'
import { Navigate, Routes, Route } from 'react-router'
import Loadable from '../components/shared/Loadable'
import MainLayout from '../Layout/Main/MainLayout';
import Error400 from '../views/authentication/Error400';
import { useSelector } from 'react-redux';
import ErrorModal from '../views/utilities/ErrorModal';
import AccessDenied from '../pages/authPages/AccessDenied'
import PrivateRoute from './PrivateRoute'
import { Toaster } from 'react-hot-toast'



import HomePage from '../pages/Landing/Home';
import Landing from '../pages/Landing/Landing';
import About from '../pages/Landing/About';
import Contact from '../pages/Landing/Contact';


const Router = () => {

    const Properties = Loadable(lazy(() => import('src/pages/Landing/Properties')));
    const SearchPropery = Loadable(lazy(() => import('src/pages/Landing/SearchProperty')));
    const SpecifictProperty = Loadable(lazy(() => import('src/pages/Landing/PropertyPage')));

    // Lands
    const Lands = Loadable(lazy(() => import('src/pages/Landing/Lands')));
    const SearchLand = Loadable(lazy(() => import('src/pages/Landing/SearchLand')));
    const SepecificLand = Loadable(lazy(() => import('src/pages/Landing/LandPage')));

    const Login = Loadable(lazy(() => import('src/pages/authPages/Login')));
    const Register = Loadable(lazy(() => import('src/pages/authPages/Register')));

    // protected routes
    const Home = Loadable(lazy(() => import('src/pages/dashboard/AdminDash/Home')));
    const UserHome = Loadable(lazy(() => import('src/pages/dashboard/UserDash/UserHome')));
    const ProfilePage = Loadable(lazy(() => import('src/pages/dashboard/Profile')));
    const Users_List = Loadable(lazy(() => import('src/pages/dashboard/users/list')));
    // properties
    const Properties_List = Loadable(lazy(() => import('src/pages/dashboard/Properties/AllProperties')));
    const MyProperties_List = Loadable(lazy(() => import('src/pages/dashboard/Properties/MyProperties')));
    const NewPropertiesList = Loadable(lazy(() => import('src/pages/dashboard/Properties/CreateProperty')));
    const EditProperty = Loadable(lazy(() => import('src/pages/dashboard/Properties/EditProperty')));
    // lands
    const LandsList = Loadable(lazy(() => import('src/pages/dashboard/Lands/index')));
    const UserLands = Loadable(lazy(() => import('src/pages/dashboard/Lands/UserLandsList')));
    const NewLand = Loadable(lazy(() => import('src/pages/dashboard/Lands/CreateLand')));
    const EditLand = Loadable(lazy(() => import('src/pages/dashboard/Lands/EditLand')));
    // addresses
    const Address_List = Loadable(lazy(() => import('src/pages/dashboard/Adresses/list')));

    // accessing auth slice
    const { authenticatedUser } = useSelector((state) => state.auth)

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
                    <Route path='/properties' element={<Properties />} />
                    <Route path='/lands' element={<Lands />} />
                    <Route path='/properties/search' element={<SearchPropery />} />
                    <Route path='/lands/search' element={<SearchLand />} />
                    <Route path='/properties/:id' element={<SpecifictProperty />} />
                    <Route path='/lands/:id' element={<SepecificLand />} />

                </Route>

                {/* protected routes for admin and user*/}
                <Route path='/app' element={<PrivateRoute allowedRoles={['admin', 'user']} />}>
                    <Route path='/app' element={<MainLayout />} >
                        <Route path='/app/' element={<Navigate to="/app/home" />} />
                        <Route path='/app/home' element={authenticatedUser?.roles[0] === 'admin' ? <Home /> : <UserHome />} />
                        <Route path='/app/profile' element={<ProfilePage />} />
                        <Route path='/app/properties/new' element={<NewPropertiesList />} />
                        <Route path='/app/lands/new' element={<NewLand />} />
                        <Route path='/app/properties/edit/:id' element={<EditProperty />} />
                        <Route path='/app/lands/edit/:id' element={<EditLand />} />
                        <Route path='/app/properties' element={authenticatedUser?.roles[0] === 'admin' ? <Properties_List /> : <MyProperties_List />} />
                        <Route path='/app/lands' element={ authenticatedUser?.roles[0] === 'admin' ? <LandsList /> : <UserLands />} />

                        {/* only for user */}
                        <Route path='/app/' element={<PrivateRoute allowedRoles={['user']} />}>
                            <Route path='/app/home' element={<UserHome />} />
                            <Route path='/app/lands' element={<UserLands />} />
                        </Route>

                        {/* only for admin */}
                        <Route path='/app/' element={<PrivateRoute allowedRoles={['admin']} />}>
                            <Route path='/app/home' element={<Home />} />
                            <Route path='/app/users' element={<Users_List />} />
                            <Route path='/app/addresses' element={<Address_List />} />
                            <Route path='/app/properties' element={<Properties_List />} />
                            <Route path='/app/lands' element={<LandsList />} />
                        </Route>
                    </Route>
                </Route>

                {/* auth routes */}
                <Route path='/auth'>
                    <Route path='/auth/login' element={<Login />} />
                    <Route path='/auth/register' element={<Register />} />

                    {/* Errors routes */}
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