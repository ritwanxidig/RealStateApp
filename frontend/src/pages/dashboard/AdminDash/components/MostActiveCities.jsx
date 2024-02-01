import React from 'react'
import DashboardCard from './DashboardCard'
import { Box, Chip } from '@mui/material'
import { useTheme } from '@emotion/react';

const MostActiveCities = () => {
    const theme = useTheme();
    return (
        <DashboardCard width='100%' title="Most Active Cities" subtitle="Top 3 most active cities">
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
                        <tr className={` rounded-xl hover:shadow-lg hover:shadow-slate-200 transition-all duration-500 cursor-default`}>
                            <td className='py-4 text-start pl-4 font-medium'>Hargeisa</td>
                            <td className='py-4 text-start pl-4 font-medium'>2</td>
                            <td className='py-4 text-start pl-4 font-medium'>1</td>
                            <td className='py-4 text-start pl-4 font-medium'>
                                <Chip color='success' size='small' label={`$ ${200.00}`} />
                            </td>
                        </tr>
                        <tr className={` rounded-xl hover:shadow-lg hover:shadow-slate-200 transition-all duration-500 cursor-default`}>
                            <td className='py-4 text-start pl-4 font-medium'>Hargeisa</td>
                            <td className='py-4 text-start pl-4 font-medium'>2</td>
                            <td className='py-4 text-start pl-4 font-medium'>1</td>
                            <td className='py-4 text-start pl-4 font-medium'>
                                <Chip color='success' size='small' label={`$ ${200.00}`} />
                            </td>
                        </tr>
                        <tr className={` rounded-xl hover:shadow-lg hover:shadow-slate-200 transition-all duration-500 cursor-default`}>
                            <td className='py-4 text-start pl-4 font-medium'>Hargeisa</td>
                            <td className='py-4 text-start pl-4 font-medium'>2</td>
                            <td className='py-4 text-start pl-4 font-medium'>1</td>
                            <td className='py-4 text-start pl-4 font-medium'>
                                <Chip color='success' size='small' label={`$ ${200.00}`} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Box>
        </DashboardCard>
    )
}

export default MostActiveCities