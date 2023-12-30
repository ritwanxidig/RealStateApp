import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, Button, Box, Avatar, Menu } from '@mui/material';
import { IconLogin, IconLogin2, IconMenu, IconX } from '@tabler/icons-react';
import { SampleProfile1 } from '../../../assets/index'
import { styled } from '@mui/system';
import Logo from '../../../components/logo/Logo'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StyledButton from '../../../components/shared/StyledButton';

const CustomAppBar = styled(AppBar)(({ theme }) => ({
    background: theme.palette.mode === 'dark' ? theme.palette.primary[900] : 'white', // You can customize the background color
    color: theme.palette.primary.main,
    boxShadow: 'none',
    position: 'fixed',
    marginBottom: '10rem',
    top: 0,
    left: 0,
    right: 0,
    // margin: '0 10px'
}));

const CustomToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
});

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
const Profile = () => {
    const [anchorElement, setAnchorElement] = React.useState(null);
    const { darkMode } = useSelector(state => state.theme)
    const handleClick = (event) => {
        setAnchorElement(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElement(null);
    };

    return (
        <Box>
            <IconButton onClick={handleClick}>
                <Avatar src={SampleProfile1} />
            </IconButton>

            <Menu
                id="profile-menu"
                anchorEl={anchorElement}
                keepMounted
                open={Boolean(anchorElement)}
                onClose={handleClose}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                elevation={3}
                PaperProps={{
                    sx: {
                        backgroundColor: darkMode ? 'primary.900' : '',
                        width: '150px',
                        borderRadius: '8px',
                        padding: '8px 5px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    },
                }}>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', }}>
                    <Avatar src={SampleProfile1} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', ml: 1 }}>
                        <Typography variant='body1' fontSize='12px' fontWeight={600} >Ridwan</Typography>
                        <Typography variant='body2' fontSize='12px'>Admin</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1
                        }}>
                        <StyledButton
                            variant="contained"
                            LinkComponent={Link}
                            to="/app/"
                            sx={{
                                borderRadius: '50px',
                                padding: '5px 18px',
                                color: 'white',
                            }}>
                            Dashboard
                        </StyledButton>
                        <StyledButton
                            variant="outlined"
                            LinkComponent={Link}
                            to="/auth/login"
                            sx={{
                                borderRadius: '50px',
                                padding: '5px 32px',
                                color: 'white',
                            }}>
                            Log out
                        </StyledButton>
                    </Box>

                </Box>
            </Menu>
        </Box>
    )
}

const LoginButton = () => (
    <Button variant="contained"
        LinkComponent={Link}
        to="/auth/login"
        sx={{
            borderRadius: '50px',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            boxShadow: 'none',
            textTransform: 'none',
            color: 'white',
            backgroundColor: 'primary.main',
            fontFamily: 'Plus Jakarta Sans',
            '&:hover': {
                boxShadow: 'none',
                backgroundColor: 'primary.dark',
            },
        }}>
        Login
        <IconLogin2 />
    </Button>
)

const Navbar = ({ pathname }) => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const { darkMode } = useSelector(state => state.theme)

    const { isAuthenticated, authenticatedUser } = useSelector(state => state.auth)

    const navItems = [
        { label: 'Home', path: '/' },
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
                        {isAuthenticated ? <Profile /> : <LoginButton />}

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
                        {isAuthenticated ? <Profile /> : <LoginButton />}

                    </List>
                </DrawerContainer>
            </CustomAppBar>
        </div>
    );
};

export default Navbar;
