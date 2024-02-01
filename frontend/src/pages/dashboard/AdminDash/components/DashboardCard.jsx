import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const DashboardCard = (props) => {
    const { darkMode } = useSelector(state => state.theme)
    return (
        <Box sx={{
            display: 'flex', gap: 2
        }}>
            <Box sx={{
                p: 2,
                backgroundColor: darkMode ? 'primary.800' : 'white',
                borderRadius: 2,
                width: props?.width || 'contain'
            }} >
                <Typography variant='h6' sx={{ fontWeight: '600', fontFamily: 'Plus Jakarta Sans' }}>{props?.title || "Title"}</Typography>
                <Typography sx={{
                    fontWeight: '500', color: darkMode ? 'grey.200' : 'grey.600',
                    fontSize: '.9rem', fontFamily: 'Plus Jakarta Sans', mt: -.7
                }}>
                    {props?.subtitle || "Subtitle"}
                </Typography>
                {props?.children}
            </Box>
        </Box>
    )
}

export default DashboardCard