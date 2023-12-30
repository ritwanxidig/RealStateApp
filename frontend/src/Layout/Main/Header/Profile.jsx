import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Avatar,
    Box,
    Menu,
    Button,
    IconButton,
    MenuItem,
    ListItemIcon,
    ListItemText,
    styled,
    Typography,
    Divider,
} from '@mui/material';

import { FaList as IconListCheck, FaInbox as IconMail, FaUser as IconUser } from 'react-icons/fa';

import ProfileImg from '../../../assets/images/profile/user-1.jpg';
import { useTheme } from '@emotion/react';
import { IconChevronDown, IconInbox, IconSubtask, IconX } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import StyledButton from '../../../components/shared/StyledButton';
import { useLogoutMutation } from '../../../app/services/api';
import { authActions } from '../../../app/slices/authSlice';
import { errorActions } from '../../../app/slices/errorSlice';
import { alertActions } from '../../../app/slices/alertSlice';

const StyledAvatar = styled(Avatar)({
    width: 35,
    height: 35,
    borderRadius: '20%',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.1)',
    },
});

const ProfileComponentList = ({ title, Icon, subtitle, darkMode }) => (
    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', gap: 2 }}>
        {/* Icon Container and Text Container */}
        <Box
            sx={{ width: '40px', height: '40px', backgroundColor: 'primary.main', color: 'white', borderRadius: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Icon size={21} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', ':hover': { cursor: 'pointer', color: 'primary.main' } }}>
            <Typography variant='body' fontSize='14px' fontWeight={600} >{title}</Typography>
            <Typography variant='body' fontSize='10px' fontWeight={400} color={darkMode ? 'white' : 'grey.700'} >{subtitle}</Typography>
        </Box>
    </Box>
)

const Profile = () => {
    const [anchorEl2, setAnchorEl2] = useState(null);
    const { darkMode } = useSelector(state => state.theme)

    const theme = useTheme();
    const { authenticatedUser } = useSelector(state => state.auth);
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const StyledMenuItem = styled(MenuItem)({
        padding: '18px 16px',
        borderRadius: '8px',
        '&:hover': {
        },
    });

    const handleLogout = async () => {
        try {
            await logout().then(res => {
                window.location.reload();
                dispatch(authActions.logout({}));
                dispatch(alertActions.setAlert({ type: "success", message: "logged out" }));
                navigate("/");
            }).catch(err => {
                console.log(err);
                dispatch(alertActions.setAlert({
                    type: "error",
                    message: err?.data?.message || "Something went wrong"
                }));
            })
        } catch (error) {
            console.log(error);
            dispatch(errorActions.setError({
                title: error?.data?.status || "Server Error",
                message: error?.data?.message || "Something went wrong"
            }))
        }
    }



    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                }}
                onClick={handleClick2}
            >
                <StyledAvatar src={ProfileImg} />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', ml: 1 }}>
                    <span className='text-[12px] font-bold flex w-full items-center gap-2'>
                        <Typography variant='body' fontSize='12px' fontWeight={600} >
                            {authenticatedUser?.name}
                        </Typography>
                        <IconChevronDown size='1rem' />
                    </span>
                    <Typography variant='body2' fontSize='12px' textTransform="capitalize">
                        {authenticatedUser?.roles.join(",")}
                    </Typography>
                </Box>
            </Box>



            <Menu
                id="profile-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                elevation={3}

                PaperProps={{
                    sx: {
                        backgroundColor: darkMode ? 'primary.900' : '',
                    },
                    style: {
                        width: '400px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        padding: '8px 16px',
                        borderRadius: '16px',

                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant='h5' fontWeight={400} >User Profile</Typography>
                    <IconButton
                        onClick={handleClose2}
                        sx={{
                            color: darkMode ? 'grey.400' : 'black'
                        }}
                    >
                        <IconX size={26} />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', gap: 2, marginTop: 2 }}>
                    <Box>
                        <Avatar src={ProfileImg} sx={{ width: 100, height: 100, mx: 'auto', my: 2 }} />
                    </Box>
                    <Box sx={{ marginTop: -2 }}>
                        <Typography variant='body' fontSize='14px' fontWeight={700} >Ridwan</Typography>
                        <Typography variant='body2' fontSize='12px' color={darkMode ? 'grey.400' : ''} >Admin</Typography>
                        <Typography variant='body2' fontSize='12px' color={darkMode ? 'grey.400' : ''} sx={{ display: 'flex', alignItems: 'center', gap: .5 }}> <IconInbox size={16} /> 6I8e0@example.com</Typography>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', my: 4, flexDirection: 'column', width: '100%', alignItems: 'center', gap: 2, marginTop: 2 }}>
                    {/* User Profile */}
                    <ProfileComponentList title="User Profile" subtitle="Personal Information" Icon={IconUser} darkMode={darkMode} />
                    {/* My Tasks */}
                    <ProfileComponentList title="My Tasks" subtitle="To-do and Daily Tasks" Icon={IconListCheck} darkMode={darkMode} />

                </Box>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        mt: 4,
                    }}
                >
                    <StyledButton
                        variant='contained'
                        color='primary'
                        sx={{ width: '100%', py: 1.5 }}
                        onClick={handleLogout}
                    >
                        Logout
                    </StyledButton>
                </Box>
            </Menu>
        </Box>
    );
};

export default Profile;
