import { useTheme } from '@emotion/react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { LoginBack } from '../../assets'
import Logo from '../../components/logo/Logo'
import GoogleOAuth from './components/GoogleOAuth'
import AppleOAuth from './components/AppleOAuth'
import { useSelector } from 'react-redux'

const AuthPage = (props) => {
    const theme = useTheme();
    const lgUp = useMediaQuery(theme1 => theme1.breakpoints.up('lg'));
    const mdUp = useMediaQuery(theme1 => theme1.breakpoints.up('md'));
    const { darkMode } = useSelector(state => state.theme);
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: lgUp && mdUp ? 'space-between' : 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            {lgUp && mdUp && (<Box
                sx={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: darkMode ? 'primary.900' : '',
                    display: 'flex',
                    justifyContent: '',
                    alignItems: '',
                }}>
                <Box sx={{ p: 2 }}><Logo /></Box>
                <img src={LoginBack} style={{ width: '710px' }} />

            </Box>)}
            <Box
                sx={{
                    width: '700px',
                    height: '100%',
                    backgroundColor: darkMode ? 'grey.900' : 'common.white',
                    display: 'flex',
                    padding: '2rem',
                    justifyContent: 'start',
                    alignItems: 'start',
                    flexDirection: 'column',
                }}>
                <Box>
                    <Typography variant="h5" fontSize="25px"
                        sx={{
                            fontWeight: 'bold',
                            mb: 2,
                            fontFamily: 'Plus Jakarta Sans'
                        }}
                        color={darkMode ? "common.white" : "common.black"}>
                        Welcome to <span style={{ color: theme.palette.primary.main }}>RealState</span>
                    </Typography>
                    <Typography variant='body2' fontSize="14px"
                        sx={{
                            mb: 2,
                            fontFamily: 'Plus Jakarta Sans'
                        }}
                        color={darkMode ? "grey.200" : "common.black"}>
                        {props.title} to your account to access your dashboard
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    mt: 2
                }}
                >
                    <GoogleOAuth />
                    <AppleOAuth />
                </Box>

                <Box sx={{ width: '100%', mt: 5 }}>
                    <Box
                        variant='body2' fontSize="14px"
                        sx={{
                            mb: 2,
                            width: '100%',
                            display: 'flex',
                            height: '1px',
                            backgroundColor: darkMode ? 'grey.800' : 'grey.300',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontFamily: 'Plus Jakarta Sans',
                        }}
                    >
                        <Typography fontFamily={'Plus Jakarta Sans'} fontSize={14} sx={{ backgroundColor: darkMode ? 'grey.900' : 'white', px: 2 }}>Or {props.title} With</Typography>
                    </Box>
                </Box>
                {props.children}
            </Box>

        </Box>
    )
}

export default AuthPage