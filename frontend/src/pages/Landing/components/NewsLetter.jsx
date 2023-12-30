import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { NewSletterBackg } from '../../../assets'
import CustomInput from '../../../components/form/CustomInput'

const NewsLetter = () => {

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
                        width: '50%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                <CustomInput placeholder="Enter your email" />
                <Button variant="contained" sx={{ 
                    py: 1.5,
                    backgroundColor: 'primary.main', 
                    color: 'common.white', 
                    ml: 2,
                 }}>
                    Subscribe
                </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default NewsLetter