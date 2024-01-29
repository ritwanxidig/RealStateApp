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
import StyledButton from 'src/components/shared/StyledButton'
import ContactAgentForm from './ContactAgentForm'

const ListingCard = ({ card }) => {
    const [contactOpen, setContactOpen] = React.useState(false)
    const { darkMode } = useSelector(state => state.theme)
    return (
        <>
            {contactOpen && <ContactAgentForm onOpen={contactOpen} property={card?.property} setOnOpen={setContactOpen} data={card} />}
            <Box
                sx={{
                    p: 2,
                    backgroundColor: darkMode ? 'primary.800' : 'primary.100',
                    borderRadius: '20px',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {card?.type && <Box
                    sx={{
                        backgroundColor: 'primary.main',
                        width: '5rem',
                        textAlign: 'center',
                        display: 'inline-block',
                        position: 'absolute',
                        borderRadius: '5px',
                        color: 'white',
                        fontWeight: '600',
                        textTransform: 'capitalize',
                        fontSize: '14px',
                    }}
                >
                    {card.type ? `For ${card.type}` : 'For Sale'}
                </Box>}
                <Box sx={{ width: '100%', height: '190px', display: 'flex', flexDirection: 'column' }}>
                    <Link to={card?.property ? `/properties/${card._id}` : `/lands/${card._id}`} style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '20px', }}>
                        <img
                            className='hover:transform hover:scale-105 transition-all'
                            src={card.image}
                            style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '20px', }}
                            alt={card.name}
                        />
                    </Link>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', justifyContent: 'space-between', alignItems: 'start', gap: 1, mt: 3 }}>
                    {card?.beds && <AmenitiesCard Icon={IconBed} title={card.beds} />}
                    {card?.baths && <AmenitiesCard Icon={FaBath} title={card.baths} />}
                    {card?.area && <AmenitiesCard Icon={IconSquare} title={card.area} />}
                    {card?.location && <AmenitiesCard Icon={IconMapPin} title={card.location.substring(0, 10)} />}
                    <AmenitiesCard Icon={IconCurrencyDollar} title={card.price} />
                    {card.discount && card.discount > 1 ? <AmenitiesCard Icon={IconDiscount} title={card.discount} textDecoration='line-through' /> : null}
                    {card.parking && <AmenitiesCard Icon={IconParkingCircle} title="Parking" />}
                    {card.furnished && <AmenitiesCard Icon={IconHomeCog} title="Furnished" />}
                </Box>
                {/* <Divider sx={{ mt: 2, borderColor: 'primary.main' }} /> */}
                <StyledButton onClick={() => setContactOpen(true)} variant='outlined'
                    sx={{ width: '100%', mt: 2, textTransform: 'none', boxShadow: 'none', fontFamily: 'Plus Jakarta Sans', '&:hover': { boxShadow: 'none' }, }}>Email Agent</StyledButton>
            </Box>
        </>
    )
}

export default ListingCard