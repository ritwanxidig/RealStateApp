import React from 'react';
import { IconButton, Drawer, List, useMediaQuery, Box } from '@mui/material';
import { IconMenu, IconX } from '@tabler/icons-react';
import { styled } from '@mui/system';
import Logo from '../../../components/logo/Logo'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavbarAvatar from './navbarComponents/NavbarAvatar';
import NavbarLoginBtn from './navbarComponents/NavbarLoginBtn';
import CustomAppBar from './navbarComponents/CustomAppBar';
import CustomToolbar from './navbarComponents/CustomToolbar'





const MenuButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.primary.main,
    marginRight: '16px',
}));

const NavigationItem = styled(Link)(({ theme }) => ({
    fontWeight: '500',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
        color: theme.palette.primary.main,
    },
    transition: 'color 0.3s ease',
}));

const DrawerContainer = styled(Drawer)({
    width: '250px',
});

// profile


const Navbar = ({ pathname }) => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const { darkMode } = useSelector(state => state.theme)

    const { isAuthenticated } = useSelector(state => state.auth)

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Properties', path: '/properties' },
        { label: 'Lands', path: '/lands' },
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/contact' },
    ];

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    if (lgUp || mdUp) return (
        <div className='container mx-auto'>
            <CustomAppBar position='fixed' >
                <CustomToolbar>
                    <Logo />

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        width: '100%',
                    }}>

                        {navItems.map((item) => (
                            <NavigationItem
                                key={item.path}
                                to={item.path}
                                sx={{
                                    backgroundColor: pathname === item.path ? 'primary.main' : 'inherit',
                                    borderRadius: pathname === item.path ? '20px' : '0',
                                    padding: pathname === item.path ? '7px 20px' : '',
                                    color: pathname === item.path ? 'white' : 'primary.main',
                                }}
                            >
                                {item.label}
                            </NavigationItem>
                        ))}
                    </Box>

                    <Box>
                        {isAuthenticated ? <NavbarAvatar /> : <NavbarLoginBtn />}

                    </Box>
                </CustomToolbar>
            </CustomAppBar>

        </div>)
    // Mobile NavBar
    return (
        <div className='container mx-auto'>
            <CustomAppBar position="fixed">
                <CustomToolbar>
                    <Logo />
                    <MenuButton onClick={handleDrawerOpen}>
                        <IconMenu />
                    </MenuButton>
                </CustomToolbar>
                <DrawerContainer
                    open={drawerOpen}
                    onClose={handleDrawerClose}
                    anchor="right"
                    PaperProps={{
                        sx: {
                            width: '300px',
                            backgroundColor: darkMode ? 'primary.900' : 'primary.light',

                            zIndex: 1000
                        }
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 20px',
                        fontSize: '20px',
                    }}>
                        <Logo />
                        <IconButton onClick={handleDrawerClose}>
                            <IconX />
                        </IconButton>
                    </Box>
                    <List sx={{
                        padding: '10px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}>
                        {navItems.map((item) => (
                            <NavigationItem
                                key={item.path}
                                to={item.path}
                                sx={{
                                    backgroundColor: pathname === item.path ? 'primary.main' : 'inherit',
                                    borderRadius: pathname === item.path ? '20px' : '0',
                                    padding: pathname === item.path ? '7px 20px' : '',
                                    color: pathname === item.path ? 'white' : 'white',
                                }}
                            >
                                {item.label}
                            </NavigationItem>
                        ))}
                        {isAuthenticated ? <NavbarAvatar /> : <NavbarLoginBtn />}

                    </List>
                </DrawerContainer>
            </CustomAppBar>
        </div>
    );
};

export default Navbar;
