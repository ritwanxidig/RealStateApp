import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import React from 'react'
import { CircleLoader, HashLoader } from "react-spinners";

const Loader = () => {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'transparent', alignItems: 'center', height: '100%', color: 'primary.main' }}>
            <HashLoader color={theme.palette.primary.main} />
        </Box>
    )
}

export default Loader