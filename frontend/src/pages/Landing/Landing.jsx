import React from 'react'
import Navbar from './components/Navbar'
import { Outlet, Routes, useLocation } from 'react-router'
import { Box } from '@mui/material';
import Footer from './components/Footer';

const Landing = () => {
    const location = useLocation();
    const [pathname, setPathname] = React.useState(location.pathname);

    React.useEffect(() => { setPathname(location.pathname) }, [location.pathname])
    return (
        <div className='container mx-auto'>
            < Navbar pathname={pathname} />
            <Box sx={{ marginTop: '100px', width: '100%', height: '100%' }}>
                <Outlet />
            </Box>
            <Footer />

        </div >
    )
}

export default Landing