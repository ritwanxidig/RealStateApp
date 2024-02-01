import React from 'react'
import DashboardCard from './DashboardCard'
import { Box, Typography } from '@mui/material'
import RadialBarChartComponent from './charts/RadialBarChart'
import { useTheme } from '@emotion/react'

const PropertyAnalaysis = () => {
    const theme = useTheme();
    return (
        <DashboardCard width='100%' title="Properties Analaysis" subtitle="Properties Analaysis based on types" >
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '13rem' }}>
                <RadialBarChartComponent />
                <Box sx={{ display: 'flex', mt: 2, width: '100%', justifyContent: 'center', gap: 5 }}>
                    <Box sx={{ display: 'flex', gap: .5, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                        <Box sx={{ display: 'flex', gap: .4, justifyContent: 'center', alignItems: 'center', }}>
                            <div className={`w-2 h-2   rounded-full`} style={{ backgroundColor: theme.palette.primary.main }} /> <Typography sx={{ fontWeight: '500', fontSize: '1rem', fontFamily: 'Plus Jakarta Sans' }}>Rent</Typography>
                        </Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '.8rem', fontFamily: 'Plus Jakarta Sans' }}>52</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: .5, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                        <Box sx={{ display: 'flex', gap: .4, justifyContent: 'center', alignItems: 'center', }}>
                            <div className={`w-2 h-2   rounded-full`} style={{ backgroundColor: theme.palette.primary.main }} /> <Typography sx={{ fontWeight: '500', fontSize: '1rem', fontFamily: 'Plus Jakarta Sans' }}>Sale</Typography>
                        </Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '.8rem', fontFamily: 'Plus Jakarta Sans' }}> 34</Typography>
                    </Box>
                </Box>
            </Box>
        </DashboardCard>
    )
}

export default PropertyAnalaysis