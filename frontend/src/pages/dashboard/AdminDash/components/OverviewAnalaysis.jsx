import React from 'react'
import DashboardCard from './DashboardCard'
import { useTheme } from '@emotion/react';
import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import StatsCard1 from './StatsCard1';
import { IconCurrencyDollar, IconHomeStar, IconSquare0Filled } from '@tabler/icons-react';
import { tbmkFormatter } from 'src/constants';

const OverviewAnalaysis = (props) => {
    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
    const { darkMode } = useSelector((state) => state.theme);

    const data = props.data || {
        totalRevenue: tbmkFormatter(Math.floor(Math.random() * 10000)),
        properties: tbmkFormatter(Math.floor(Math.random() * 10000)),
        lands: tbmkFormatter(Math.floor(Math.random() * 10000))
    }

    return (
        <DashboardCard width={lgUp ? null : '100%'} title="Overview" subtitle="Overview of all the updates">
            <Box sx={{ mt: 2, display: 'grid', gridTemplateColumns: { lg: 'repeat(3, 1fr)', md: 'repeat(3, 1fr)', xs: 'repeat(2, 1fr)' }, gap: 3, width: '100%', }}>
                <StatsCard1 data={`$${tbmkFormatter(data?.totalRevenue)}`} icon={IconCurrencyDollar} caption="Total Revenue Ever" bgColor={darkMode ? 'red.main' : 'red.100'} IconColor={darkMode ? 'red.light' : 'red.800'} />
                <StatsCard1 data={`${tbmkFormatter(data?.properties)}`} icon={IconHomeStar} caption="Total Properties posted Ever" bgColor={darkMode ? "primary.main" : "primary.100"} IconColor={theme.palette.primary.dark} />
                <StatsCard1 data={`${tbmkFormatter(data?.lands)}`} icon={IconSquare0Filled} caption="Total Lands posted Ever" bgColor={darkMode ? 'secondary.main' : "secondary.100"} IconColor={darkMode ? theme.palette.secondary[700] : theme.palette.secondary.dark} textColor={darkMode ? 'grey.800' : 'grey.600'} />
            </Box>
        </DashboardCard>
    )
}

export default OverviewAnalaysis