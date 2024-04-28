import React from 'react'
import DashboardCard from './DashboardCard'
import { Box, Typography } from '@mui/material'
import RadialBarChartComponent from './charts/RadialBarChart'
import { useTheme } from '@emotion/react'
import { tbmkFormatter } from 'src/constants'

const PropertyAnalaysis = (props) => {
    const theme = useTheme();

    const formattedData = props?.data?.map((item) => {
        return {
            name: item?._id,
            value: item?.count
        }
    })

    const data = formattedData || [
        {
            name: 'rent',
            value: 0
        },
        {
            name: 'sale',
            value: 0
        },
    ]

    return (
        <DashboardCard width='100%' title="Properties Analaysis" subtitle="Properties Analaysis based on types" >
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '13rem' }}>
                <RadialBarChartComponent data={data} />
                <Box sx={{ display: 'flex', mt: 2, width: '100%', justifyContent: 'center', gap: 5 }}>
                    {data?.map((item) => (
                        <Box key={item.name} sx={{ display: 'flex', gap: .5, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                            <Box sx={{ display: 'flex', gap: .4, justifyContent: 'center', alignItems: 'center', }}>
                                <div className={`w-2 h-2   rounded-full`} style={{ backgroundColor: theme.palette.primary.main }} />
                                <Typography sx={{ fontWeight: '500', fontSize: '1rem', fontFamily: 'Plus Jakarta Sans', textTransform: 'capitalize' }}>{item?.name}</Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '.8rem', fontFamily: 'Plus Jakarta Sans' }}>{tbmkFormatter(item?.value)}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </DashboardCard>
    )
}

export default PropertyAnalaysis