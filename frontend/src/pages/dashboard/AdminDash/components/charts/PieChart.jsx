import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import { Legend } from 'chart.js';
import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const PieChart = () => {
    const theme = useTheme();
    // Data for the pie chart
    const data = [
        {
            name: 'Jan',
            homes: 4000,
            lands: 2400,
            amt: 2400,
        },
        {
            name: 'Feb',
            homes: 3000,
            lands: 1398,
            amt: 2210,
        },
        {
            name: 'Mar',
            homes: 2000,
            lands: 9800,
            amt: 2290,
        },
        {
            name: 'Apr',
            homes: 2780,
            lands: 3908,
            amt: 2000,
        },
        {
            name: 'May',
            homes: 2780,
            lands: 3908,
            amt: 2000,
        },
        {
            name: 'Jun',
            homes: 1890,
            lands: 4800,
            amt: 2181,
        },
        {
            name: 'Jul',
            homes: 2390,
            lands: 3800,
            amt: 2500,
        },
        {
            name: 'Aug',
            homes: 3490,
            lands: 4300,
            amt: 2100,
        },

        {
            name: 'Sep',
            homes: 1890,
            lands: 4800,
            amt: 2181,
        },
        {
            name: 'Oct',
            homes: 2390,
            lands: 3800,
            amt: 2500,
        },
        {
            name: 'Nov',
            homes: 3490,
            lands: 4300,
            amt: 2100,
        },

        {
            name: 'Dec',
            homes: 3490,
            lands: 4300,
            amt: 2100,
        },
    ];
    return (
        // <Box sx={{ width: '100%' }}>
        <ResponsiveContainer>
            <AreaChart
                data={data}

            >
                {/* <CartesianGrid strokeDasharray="4 4" /> */}
                <XAxis dataKey="name" />
                
                <Tooltip />
                <Area type="monotone" dataKey="lands" stackId="1" stroke={theme?.palette?.secondary?.main || "#82ca9d"} fill={theme?.palette?.secondary?.main || "#82ca9d"} />
                <Area type="monotone" dataKey="homes" stackId="1" stroke={theme?.palette?.primary?.main || "#8884d8"} fill={theme?.palette?.primary?.main || "#8884d8"} />
            </AreaChart>
        </ResponsiveContainer>
        // </Box>
    )
}

export default PieChart