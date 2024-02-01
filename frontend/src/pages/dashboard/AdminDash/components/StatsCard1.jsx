import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import { IconHomeStar } from '@tabler/icons-react';
import React from 'react'
import { useSelector } from 'react-redux';

const StatsCard1 = ({ bgColor, IconColor, textColor, data, caption, Icon, ...props }) => {

    const theme = useTheme();
    const { darkMode } = useSelector((state) => state.theme);
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            justifyItems: 'start',
            alignItems: 'start',
            justifyContent: 'center',
            backgroundColor: bgColor || "",
            p: 2,
            borderRadius: 2,
            height: '12rem'
        }}>
            <Box sx={{ p: 1, borderRadius: '50%', backgroundColor: IconColor || "", color: 'white' }} >
                <props.icon size={18} />
            </Box>
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.4rem', fontFamily: 'Plus Jakarta Sans' }}>{data || 0}</Typography>
            <Typography sx={{ fontWeight: '500', color: textColor ? textColor : darkMode ? 'grey.100' : 'grey.800', fontSize: '.9rem', fontFamily: 'Plus Jakarta Sans' }}>{caption}</Typography>
        </Box>
    )
}


export default StatsCard1