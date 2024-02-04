import React from 'react'
import DashboardCard from './DashboardCard'
import { Box } from '@mui/material'
import PieChart from './charts/PieChart'

const LastYearRevenue = (props) => {
    const chartData = props?.data?.map(item => {
        return {
            month: item?.month,
            homes: item?.revenue?.properties,
            lands: item?.revenue?.lands
        }
    })
    return (
        <DashboardCard width='100%' title="Last Year Revenue" subtitle="Insights of last year revenue">
            <Box sx={{ overflow: 'hidden', width: '100%', display: 'flex', justifyContent: 'center', height: '13rem' }}>
                <PieChart data={chartData} />
            </Box>
        </DashboardCard>
    )
}

export default LastYearRevenue