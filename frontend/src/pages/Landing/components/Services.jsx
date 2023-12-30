import React from 'react'
import SectionTitle from './SectionTitle'
import { Box, Typography } from '@mui/material'
import { IconAdjustmentsPin, IconHomeSearch } from '@tabler/icons-react'

const Services = () => {
    const ServiceCard = ({ Service }) => (
        <Box
            sx={{
                border: '1px solid',
                borderColor: 'primary.100',
                borderRadius: '10px',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            {/* Icon BOx */}
            <Box sx={{
                width: '3rem',
                height: '3rem',
                backgroundColor: 'primary.100',
                color: 'primary.main',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 2
            }}>
                <Service.Icon />
            </Box>
            <Typography variant='body2' fontSize="14px">
                {Service.preTitle}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }} color={'primary.dark'} className='text-sm'>
                {Service.title}
            </Typography>
            <Typography variant="body2" color={'primary.dark'} className='text-sm'>
                {Service.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis vitae provident expedita obcaecati fuga voluptatem.
            </Typography>
        </Box>
    )
    return (
        <section className='my-12'>
            <SectionTitle title="Services" />

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        lg: 'repeat(3, 1fr)',
                        md: 'repeat(2, 1fr)',
                        sm: 'repeat(1, 1fr)',
                        xs: 'repeat(1, 1fr)',
                    },
                    gap: 3,
                    my: 3,
                    mx: 2
                }}>
                <ServiceCard Service={{ Icon: IconHomeSearch, title: 'RealState Easy', preTitle: 'Find Your', description: 'Best RealState Easy Find Your Best RealState Easy Find Your Best ' }} />
                <ServiceCard Service={{ Icon: IconAdjustmentsPin, title: 'Property Easily', preTitle: 'Sell Your', description: 'Sell Your Property Easily accross the world, and let buyers find you' }} />
                <ServiceCard Service={{ Icon: IconHomeSearch, title: 'Land Easily', preTitle: 'Sell Your', description: 'Sell Your Land Easily accross the world, and let buyers find you' }} />
            </Box>

        </section>
    )
}

export default Services