import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { NewSletterBackg } from '../../../assets'
import CustomInput from '../../../components/form/CustomInput'
import StyledButton from 'src/components/shared/StyledButton'
import { Md10K } from 'react-icons/md'

const NewsLetter = () => {

    const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const xlUp = useMediaQuery((theme) => theme.breakpoints.up('xl'));

    return (
        <Box
            sx={{
                width: '100%',
                mx: 'auto',
                my: 3,
                height: '15rem',
                backgroundColor: 'grey.100',
                backgroundImage: `url(${NewSletterBackg})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box sx={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.2)',
                display: 'flex',
                flexDirection: 'column',
                px: 8,
                justifyContent: 'center',
                alignItems: 'start',
                backdropFilter: 'blur(2px)',
            }}>
                <Typography variant="h6" sx={{ fontFamily: 'Poppins', color: 'common.white' }}>
                    Subscribe to our newsletter
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: lgUp || mdUp ? 'row' : 'column',
                        width: '100%',
                        gap: 2,
                        justifyContent: 'center',
                        alignItems: 'end',
                    }}
                >
                    <CustomInput placeholder="Enter your email" />
                    <StyledButton variant="contained">
                        Subscribe
                    </StyledButton>
                </Box>
            </Box>
        </Box >
    )
}

export default NewsLetter