import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// project
import StyledButton from '../../../../components/shared/StyledButton';
import { useLogoutMutation } from '../../../../app/services/api';
import { alertActions } from '../../../../app/slices/alertSlice';
import { authActions } from '../../../../app/slices/authSlice';
import { Avatar, Box, IconButton, Menu, Typography } from '@mui/material';
import { SampleProfile1 } from '../../../../assets';
import toast from 'react-hot-toast';

const NavbarAvatar = () => {
    const [anchorElement, setAnchorElement] = React.useState(null);
    const { darkMode } = useSelector(state => state.theme);
    const { authenticatedUser } = useSelector(state => state.auth);
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout().then(res => {
                window.location.reload();
                dispatch(authActions.logout({}));
                toast.success("Logged out successfully");
                navigate("/");
            }).catch(err => {
                console.log(err);
                toast.error(err?.data?.message || "Something went wrong")
            })
        } catch (error) {
            console.log(error);
            dispatch(errorActions.setError({
                title: error?.data?.status || "Server Error",
                message: error?.data?.message || "Something went wrong"
            }))
        }
    }
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 1 }}>
                        <Typography variant='body1' fontSize='12px' fontWeight={600} >{authenticatedUser?.name}</Typography>
                        <Typography variant='body2' fontSize='12px'>{authenticatedUser?.roles.join(" | ")}</Typography>
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
                            onClick={handleLogout}
                            sx={{
                                borderRadius: '50px',
                                padding: '5px 32px',
                                color: darkMode ? 'white' : 'primary.main',
                            }}>
                            Log out
                        </StyledButton>
                    </Box>

                </Box>
            </Menu>
        </Box>
    )
}

export default NavbarAvatar