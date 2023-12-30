import React from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import { HeroImage } from '../../../assets';

const HeroContainer = styled(Box)({
    position: 'relative',
    display: 'flex',
    overflow: 'hidden',
    width: '100%',
    minHeight: '650px',
    padding: '5px 25px',
});





const HeroText = styled(Box)({
    textAlign: 'start',
});

const Hero = () => {
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const ShapeInsideImage = styled(Box)({
        width: lgUp ? '500px' : '400px', // Adjust the width of the unique shape
        height: lgUp ? '500px' : '400px', // Adjust the height of the unique shape
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: `url(${HeroImage}) center/cover no-repeat`,
            backgroundSize: '100% 100%', // Ensure the background covers the entire pseudo-element
            borderRadius: '0 50% 0% 50%', // Create a cylindrical shape
        },
    });

    return (

        <div className='container mx-auto'>
            <HeroContainer sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: lgUp || mdUp ? '14rem' : '4rem',
                flexDirection: lgUp || mdUp ? 'row' : 'column-reverse',
            }}

            >
                <HeroText>
                    <Typography variant='h2' sx={{ fontFamily: 'Plus Jakarta Sans', }} fontWeight="bold">Your Trusted Real Estate Partner</Typography>
                    <Box sx={{ width: '20%', height: '.4rem', backgroundColor: 'primary.main', marginBottom: '1rem', borderRadius: '10px' }}></Box>

                    {/*  */}
                    <Typography
                        variant="body1"
                        sx={{ mb: 2, fontFamily: 'Plus Jakarta Sans', }}
                    >
                        Welcome to the #1 site that real estate professionals trust. Whether you're a seasoned agent or just starting out in the industry, our platform provides the tools, resources, and support you need to succeed in the competitive world of real estate. From property listings to market trends, networking opportunities to educational resources, we are dedicated to helping you thrive in your career. Join our community of trusted professionals and take your real estate business to the next level.
                    </Typography>
                    <Button variant="contained"
                        sx={{
                            borderRadius: '20px', fontFamily: 'Plus Jakarta Sans',
                            textTransform: 'none',
                            boxShadow: 'none',
                            '&:hover': {
                                boxShadow: 'none',
                            },
                        }}>
                        Learn More
                    </Button>
                </HeroText>
                <Box>
                    <ShapeInsideImage />
                </Box>
            </HeroContainer>
        </div>

    );
};

export default Hero;
