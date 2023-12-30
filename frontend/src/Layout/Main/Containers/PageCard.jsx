import React from 'react';
import { Card, CardContent, Typography, Stack, Box, CardHeader, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IconHomeDot } from '@tabler/icons-react';
import { BannerBackground } from '../../../assets';

const PageCard = ({
    title,
    headtitle,
    headsubtitle,
    children,
    action,
    footer,
    middlecontent,
    link,
}) => {
    const { darkMode } = useSelector((state) => state.theme);
    const path = window.location.pathname.split('/').map(path => path + '/');

    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

    return (
        <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
            {/* BreadCrumbs Card */}
            <Card
                sx={{
                    border: 'none',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    backgroundColor: `${darkMode ? 'primary.800' : 'primary.light'}`,
                    backgroundImage: lgUp || mdUp ? `url(${BannerBackground})` : '',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: lgUp || mdUp ? 'right' : '',
                    objectFit: 'cover',
                    mx: 'auto',
                    backgroundSize: lgUp || mdUp ? '100px' : '',
                    color: 'white',
                }}
            >
                <Typography variant='h5' color='#FFEB69' textTransform='capitalize' fontWeight='600'>{headtitle}</Typography>
                <Typography variant='body2' fontWeight='500'>{headsubtitle}</Typography>
                <Typography variant='body2' color={`${darkMode ? 'grey.300' : 'grey.600'}`}>
                    <Link className='hover:text-white transition-all' to={path}>{path}</Link>
                </Typography>
            </Card>

            {/* Main Content Card */}
            <Card
                sx={{
                    border: 'none',
                    marginTop: '20px',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.0)',
                    backgroundColor: `${darkMode ? 'primary.900' : ''}`,
                    // Mobile styles
                    '@media (max-width: 600px)': {
                        padding: '10px',
                    },
                }}
            >
                <CardHeader
                    title={title}
                    action={action}
                    subheaderTypographyProps={{
                        color: `${darkMode ? 'grey.300' : 'grey.600'}`,
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: '500',
                    }}
                    sx={{
                        padding: '20px', // Adjust padding for mobile
                    }}
                />
                <CardContent sx={{ padding: '0' }}>
                    {children}
                </CardContent>
            </Card>
        </Box>
    );
};

export default PageCard;
