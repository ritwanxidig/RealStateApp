import React from 'react'
import DashboardCard from './DashboardCard'
import { Box, Chip } from '@mui/material'
import { useTheme } from '@emotion/react';
import { tbmkFormatter } from 'src/constants';

const MostActiveCities = (props) => {
    const theme = useTheme();

    const data = props.data || [
        {
            name: 'Hargeisa',
            properties: '2',
            lands: '1',
            revenue: '500'
        }
    ]
    return (
        <DashboardCard width='100%' title="Most Active Cities" subtitle="Top 3 most active cities">
            <Box sx={{ width: '100%' }}>
                <table className='min-w-full text-center text-sm shadow-lg rounded-xl'>
                    <thead className=''>
                        <tr>
                            <th className='text-start pl-4 py-2'>Name</th>
                            <th className='text-start pl-4 py-2'>Properties</th>
                            <th className='text-start pl-4 py-2'>Lands</th>
                            <th className='text-start pl-4 py-2'>Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <tr key={item.name + item.properties + index + Date.now()} className={` rounded-xl hover:shadow-lg hover:shadow-slate-200 transition-all duration-500 cursor-default`}>
                                <td className='py-4 text-start pl-4 font-medium'>{item.name}</td>
                                <td className='py-4 text-start pl-4 font-medium'>{item.properties}</td>
                                <td className='py-4 text-start pl-4 font-medium'>{item.lands}</td>
                                <td className='py-4 text-start pl-4 font-medium'>
                                    <Chip color='success' size='small' label={`$ ${tbmkFormatter(item.revenue)}`} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>
        </DashboardCard>
    )
}

export default MostActiveCities