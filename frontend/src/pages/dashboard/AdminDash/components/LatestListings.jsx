import React from 'react'
import DashboardCard from './DashboardCard'
import { Avatar, Box, Chip, Typography } from '@mui/material'
import { Product1 } from 'src/assets'
import { IconMapPin } from '@tabler/icons-react'
import { useSelector } from 'react-redux'
import { tbmkFormatter } from 'src/constants'

const ListingCard = ({ data }) => {
    const { darkMode } = useSelector((state) => state.theme);
    return (
        <Box sx={{
            p: 1, backgroundColor: darkMode ? 'primary.900' : 'primary.100', borderRadius: 2, width: '12rem',
            ':hover': {
                boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)'
            },
            transition: 'all .5s ease',
        }}>
            <div className='w-[11rem] h-[8rem]'>
                <img src={data?.image || Product1} className='w-full h-full object-cover rounded' />
            </div>
            <Chip avatar={<Avatar src={data?.owner?.profilePic || Product1} />} label={data?.owner?.name.substring(0, 20) || "Owner Name"} color='primary' sx={{ fontWeight: '500', fontSize: '.7rem', fontFamily: 'Plus Jakarta Sans', mt: .5 }} size='small' />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mt: 1 }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', display: 'flex', fontSize: '.9rem', fontFamily: 'Plus Jakarta Sans', mt: .5 }}>
                    Type: <p className='font-medium capitalize'>{data?.type || "Property"}</p>
                </Typography>
                <Chip label={tbmkFormatter(data?.price) || 500} color='secondary' sx={{ fontWeight: 'bold', fontSize: '.7rem', fontFamily: 'Plus Jakarta Sans', mt: .5 }} size='small' />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mt: 1 }}>
                <IconMapPin size={18} />
                <Typography variant='h6' sx={{ fontWeight: '500', display: 'flex', fontSize: '.9rem', fontFamily: 'Plus Jakarta Sans' }}>
                    {data?.location || "Lagos, Nigeria"}
                </Typography>
            </Box>


        </Box>
    )
}

const LatestListings = (props) => {
    const data = props.data || []
    return (
        <DashboardCard width='100%' title="Latest Listings" subtitle="Latest Listings added" >
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { lg: 'repeat(4, 1fr)', md: 'repeat(3, 1fr)', sm: 'repeat(3, 1fr)', xs: 'repeat(1, 1fr)' },
                gap: 2, width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {
                    data?.map((item, index) => (
                        <ListingCard key={index} data={item} />
                    ))
                }
            </Box>
        </DashboardCard>
    )
}

export default LatestListings