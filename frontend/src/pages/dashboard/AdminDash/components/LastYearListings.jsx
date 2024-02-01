import React from 'react'
import DashboardCard from './DashboardCard'
import { Box } from '@mui/material'
import BarChartComponent from './charts/BarChart'

const LastYearListings = () => {
    return (
        <DashboardCard width='100%' title="Last Year Listings" subtitle="Insights of last year listings">
            <Box sx={{ overflow: 'hidden', width: '100%', display: 'flex', justifyContent: 'center', height: '13rem' }}>
                <BarChartComponent />
            </Box>
        </DashboardCard>
    )
}

export default LastYearListings