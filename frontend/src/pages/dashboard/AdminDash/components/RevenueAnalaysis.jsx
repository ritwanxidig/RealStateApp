import React from 'react'
import DashboardCard from './DashboardCard'
import { Box, Typography } from '@mui/material'
import RadialBarChartComponent from './charts/RadialBarChart'
import { useTheme } from '@emotion/react'
import { tbmkFormatter } from 'src/constants'

const RevenueAnalaysis = (props) => {
    const theme = useTheme();

    const data = props?.data || {
        revenueFromProperties: 0,
        revenueFromLands: 0,
    }

    const chatData = [
        {
            name: 'Properties',
            value: data?.revenueFromProperties
        },
        {
            name: 'Lands',
            value: data?.revenueFromLands
        },
    ]

    return (
        <DashboardCard width='100%' title="Revenue Analaysis" subtitle="Revenue Analaysis of all the updates" >
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '13rem' }}>
                <RadialBarChartComponent data={chatData} />
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', gap: 5 }}>
                    <Box sx={{ display: 'flex', gap: .5, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                        <Box sx={{ display: 'flex', gap: .4, justifyContent: 'center', alignItems: 'center', }}>
                            <div className={`w-2 h-2   rounded-full`} style={{ backgroundColor: theme.palette.primary.main }} /> <Typography sx={{ fontWeight: '500', fontSize: '1rem', fontFamily: 'Plus Jakarta Sans' }}>Properties</Typography>
                        </Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', fontFamily: 'Plus Jakarta Sans' }}>${tbmkFormatter(data?.revenueFromProperties)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: .5, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                        <Box sx={{ display: 'flex', gap: .4, justifyContent: 'center', alignItems: 'center', }}>
                            <div className={`w-2 h-2   rounded-full`} style={{ backgroundColor: theme.palette.primary.main }} />
                            <Typography sx={{ fontWeight: '500', fontSize: '1rem', fontFamily: 'Plus Jakarta Sans' }}>Lands</Typography>
                        </Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', fontFamily: 'Plus Jakarta Sans' }}> ${tbmkFormatter(data?.revenueFromLands)}</Typography>
                    </Box>
                </Box>
            </Box>
        </DashboardCard>
    )
}

export default RevenueAnalaysis