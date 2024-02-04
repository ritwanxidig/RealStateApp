import { useTheme } from '@emotion/react';
import { Box } from '@mui/material'
import React from 'react'
import { Area, BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const BarChartComponent = (props) => {
    const theme = useTheme();
    // Data for the pie chart
    const data = props?.data || [
        {
            month: 'Jan',
            homes: 4000,
            lands: 2400,
            amt: 2400,
        },
        {
            month: 'Feb',
            homes: 3000,
            lands: 1398,
            amt: 2210,
        },
        {
            month: 'Mar',
            homes: 2000,
            lands: 9800,
            amt: 2290,
        },
        {
            month: 'Apr',
            homes: 2780,
            lands: 3908,
            amt: 2000,
        },
        {
            month: 'May',
            homes: 2780,
            lands: 3908,
            amt: 2000,
        },
        {
            month: 'Jun',
            homes: 1890,
            lands: 4800,
            amt: 2181,
        },
        {
            month: 'Jul',
            homes: 2390,
            lands: 3800,
            amt: 2500,
        },
        {
            month: 'Aug',
            homes: 3490,
            lands: 4300,
            amt: 2100,
        },

        {
            month: 'Sep',
            homes: 1890,
            lands: 4800,
            amt: 2181,
        },
        {
            month: 'Oct',
            homes: 2390,
            lands: 3800,
            amt: 2500,
        },
        {
            month: 'Nov',
            homes: 3490,
            lands: 4300,
            amt: 2100,
        },

        {
            month: 'Dec',
            homes: 3490,
            lands: 4300,
            amt: 2100,
        },
    ];
    return (
        // <Box sx={{ width: '100%' }}>
        <ResponsiveContainer>
            <BarChart
                data={data}

            >
                {/* <CartesianGrid strokeDasharray="4 4" /> */}
                <XAxis dataKey="month" />
                <Tooltip />
                <Bar dataKey="homes" barSize={9} fill={theme?.palette?.primary?.main || "#8884d8"} />
                <Bar dataKey="lands" barSize={9} fill={theme?.palette?.secondary?.main || "#82ca9d"} />
            </BarChart>
        </ResponsiveContainer>
        // </Box>
    )
};

export default BarChartComponent;
