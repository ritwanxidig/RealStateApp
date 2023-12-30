import { Box, Typography } from '@mui/material'
import React from 'react'

const SectionTitle = ({title}) => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        my: '5rem',
    }}>

        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Plus Jakarta Sans' }}>
            {title}
        </Typography>

        <Box sx={{
            width: '5%',
            height: '.8rem',
            backgroundColor: 'primary.main',
            marginTop: '-.5rem',
            borderRadius: '10px',
        }}></Box>
    </Box>
)

export default SectionTitle