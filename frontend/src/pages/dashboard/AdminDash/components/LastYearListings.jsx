import React from 'react'
import DashboardCard from './DashboardCard'
import { Box } from '@mui/material'
import BarChartComponent from './charts/BarChart'

const LastYearListings = (props) => {
    const chartData = props?.data?.map(item => {
        return {
            month: item?.month,
            homes: item?.published?.properties,
            lands: item?.published?.lands
        }
    })
    return (
        <DashboardCard width='100%' title="Last Year Listings" subtitle="Insights of last year listings">
            <Box sx={{ overflow: 'hidden', width: '100%', display: 'flex', justifyContent: 'center', height: '13rem' }}>
                <BarChartComponent data={chartData} />
            </Box>
        </DashboardCard>
    )
}

export default LastYearListings