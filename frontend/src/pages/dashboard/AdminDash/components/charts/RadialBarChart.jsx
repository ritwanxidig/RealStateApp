import { useTheme } from '@emotion/react';
import React from 'react'
import { RadialBarChart, Pie, RadialBar, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Cell } from 'recharts'

const RadialBarChartComponent = (props) => {
    const data = props?.data || [
        {
            name: 'properties',
            value: 80
        },
        {
            name: 'lands',
            value: 300
        },
    ]
    const theme = useTheme();

    const colors = [
        theme.palette.primary['main'],
        theme.palette.secondary['main'],
    ]

    return (
        <ResponsiveContainer>
            <PieChart>
                <Tooltip />
                <Pie
                    data={data}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} stroke={colors[index % colors.length]} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default RadialBarChartComponent