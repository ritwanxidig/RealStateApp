import React from 'react'
import Navbar from './components/Navbar'
import { Outlet, Routes, useLocation } from 'react-router'
import { Box, Container } from '@mui/material';
import Footer from './components/Footer';

const Landing = () => {
    const location = useLocation();
    const [pathname, setPathname] = React.useState(location.pathname);

    React.useEffect(() => { setPathname(location.pathname) }, [location.pathname])
    return (
        <Container maxWidth="xl">
            < Navbar pathname={pathname} />
            <Box sx={{ marginTop: '100px', width: '100%', height: '100%' }}>
                <Outlet />
            </Box>
            <Footer />

        </Container >
    )
}

export default Landing