import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import React from 'react'
import { CircleLoader, HashLoader } from "react-spinners";

const Loader = () => {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'transparent', alignItems: 'center', height: '100%', color: 'primary.main' }}>
            <HashLoader color={theme.palette.primary.main} />
            <Typography variant='body' fontSize='14px' fontWeight={600} >Loading...</Typography>
        </Box>
    )
}

export default Loader