import { Box, Button, Divider, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import AmenitiesCard from './AmenitiesCard'
import { IconBed, IconDiscount, IconHomeCog, IconSquare, IconToiletPaper } from '@tabler/icons-react'
import { IconMapPin } from '@tabler/icons-react'
import { IconCurrencyDollar } from '@tabler/icons-react'
import { IconParkingCircle } from '@tabler/icons-react'
import { FaBath } from "react-icons/fa";
import { useSelector } from 'react-redux'

const ListingCard = ({ card }) => {
    const { darkMode } = useSelector(state => state.theme)
    return (
        <Box
            sx={{
                p: 2,
                backgroundColor: darkMode ? 'primary.800' : 'primary.100',
                borderRadius: '20px',
                color: 'white',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'primary.main',
                    width: '3rem',
                    textAlign: 'center',
                    display: 'inline-block',
                    position: 'absolute',
                    borderRadius: '5px',
                    color: 'white',
                    fontWeight: '600',
                }}
            >
                Sale
            </Box>
            <img src={card.image} width='20%' style={{ width: '100%', borderRadius: '20px' }} alt={card.name} />
            {/* <Link className='hover:opacity-70'>
                <Typography variant="h6" fontSize="18px" color="primary.main" sx={{ fontWeight: '500', textAlign: 'center', my: 1 }}>
                    {card.name}
                </Typography>
            </Link>
            <Typography variant="body2" fontSize="12px" color={'primary.dark'} className='text-sm text no-underline'>
                {card.description.substring(0, 100)}...
            </Typography>
            <Divider sx={{ my: 1, mt: 2, borderColor: 'primary.main' }} /> */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', justifyContent: 'space-between', alignItems: 'start', gap: 1, mt: 3 }}>
                <AmenitiesCard Icon={IconBed} title={card.beds} />
                <AmenitiesCard Icon={FaBath} title={card.baths} />
                <AmenitiesCard Icon={IconSquare} title={card.area} />
                <AmenitiesCard Icon={IconMapPin} title={card.location.substring(0, 10)} />
                <AmenitiesCard Icon={IconCurrencyDollar} title={card.price} />
                {card.discount && <AmenitiesCard Icon={IconDiscount} title={card.discount} textDecoration='line-through' />}
                {card.parking && <AmenitiesCard Icon={IconParkingCircle} title="Parking" />}
                {card.furnished && <AmenitiesCard Icon={IconHomeCog} title="Furnished" />}
            </Box>
            {/* <Divider sx={{ mt: 2, borderColor: 'primary.main' }} /> */}
            <Button LinkComponent={Link} to={`/listing/${card.name}`} variant='outlined'
                sx={{ width: '100%', mt: 2, textTransform: 'none', boxShadow: 'none', fontFamily: 'Plus Jakarta Sans', '&:hover': { boxShadow: 'none' }, }}>Email Agent</Button>
        </Box>
    )
}

export default ListingCard