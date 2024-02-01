import React from 'react'
import DashboardCard from './DashboardCard'
import { Box, Chip } from '@mui/material'
import { useTheme } from '@emotion/react';

const MostActiveUsers = () => {
    const users = [
        {
            name: 'ritwan',
            properties: 2,
            lands: 1,
            revenue: 2000
        },
        {
            name: 'waleed',
            properties: 2,
            lands: 1,
            revenue: 2000
        },
        {
            name: 'hassan',
            properties: 2,
            lands: 1,
            revenue: 2000
        },
        {
            name: 'hussain',
            properties: 2,
            lands: 1,
            revenue: 2000
        },
        {
            name: 'safwan',
            properties: 2,
            lands: 1,
            revenue: 2000
        },
    ];
    return (
        <DashboardCard width='100%' title="Most Active Users" subtitle="Top 5 most active users">
            <Box sx={{ width: '100%' }}>
                <table className='min-w-full text-center text-sm shadow-lg rounded-xl'>
                    <thead className=''>
                        <tr>
                            <th className='text-start pl-4 py-2'>City</th>
                            <th className='text-start pl-4 py-2'>Properties</th>
                            <th className='text-start pl-4 py-2'>Lands</th>
                            <th className='text-start pl-4 py-2'>Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr className={` rounded-xl hover:shadow-lg hover:shadow-slate-200 transition-all duration-500 cursor-default`} key={user.name + new Date().getMilliseconds()}>
                                <td className='py-4 text-start pl-4 font-medium capitalize'>{user.name}</td>
                                <td className='py-4 text-start pl-4 font-medium capitalize'>{user.properties}</td>
                                <td className='py-4 text-start pl-4 font-medium capitalize'>{user.lands}</td>
                                <td className='py-4 text-start pl-4 font-medium capitalize'>
                                    <Chip color='success' size='small' label={`$ ${user.revenue}`} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>
        </DashboardCard>
    )
}

export default MostActiveUsers