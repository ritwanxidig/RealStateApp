import { Box, Typography } from '@mui/material'
import React from 'react'

const UserInfo = ({ data }) => {
   
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                }}
            >
                
                <Box sx={{ display: 'flex', alignItems: 'end', gap: 1 }}>
                    <Typography fontFamily="Plus Jakarta Sans" fontWeight="800" fontSize="15px" variant="body1">Name: </Typography>
                    <Typography fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="13px" variant="body1">{data?.name || "Name"} </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'end', gap: 1 }}>
                    <Typography fontFamily="Plus Jakarta Sans" fontWeight="800" fontSize="15px" variant="body1">Email: </Typography>
                    <Typography fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="13px" variant="body1">{data?.email || "Email"} </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'end', gap: 1 }}>
                    <Typography fontFamily="Plus Jakarta Sans" fontWeight="800" fontSize="15px" variant="body1">Username: </Typography>
                    <Typography fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="13px" variant="body1">{data?.username || "Username"} </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'end', gap: 1 }}>
                    <Typography fontFamily="Plus Jakarta Sans" fontWeight="800" fontSize="15px" variant="body1">Roles: </Typography>
                    <Typography fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="13px" variant="body1">{data?.roles || "Roles"} </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default UserInfo