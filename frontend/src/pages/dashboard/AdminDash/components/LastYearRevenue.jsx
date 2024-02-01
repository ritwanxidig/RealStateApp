import React from 'react'
import DashboardCard from './DashboardCard'
import { Box } from '@mui/material'
import PieChart from './charts/PieChart'

const LastYearRevenue = () => {
    return (
        <DashboardCard width='100%' title="Last Year Revenue" subtitle="Insights of last year revenue">
            <Box sx={{ overflow: 'hidden', width: '100%', display: 'flex', justifyContent: 'center', height: '13rem' }}>
                <PieChart />
            </Box>
        </DashboardCard>
    )
}

export default LastYearRevenue