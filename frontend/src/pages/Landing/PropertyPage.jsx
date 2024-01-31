import { Box, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router'
import { useGetPropertyQuery } from 'src/app/services/api';
import ImageSlider from './components/ImageSlider';
import AmenitiesCard from './components/AmenitiesCard';
import { IconBed, IconMap, IconMapPin, IconNumber5Small, IconParkingCircle, IconSquare } from '@tabler/icons-react';
import { FaBath } from 'react-icons/fa';
import { IconCurrencyDollar } from '@tabler/icons-react';
import { IconDiscount } from '@tabler/icons-react';
import { IconHomeCog } from '@tabler/icons-react';
import StyledButton from 'src/components/shared/StyledButton';
import { IconRectangleFilled } from '@tabler/icons-react';
import { IconCoinOff } from '@tabler/icons-react';
import ContactAgentForm from './components/ContactAgentForm';

const PropertyPage = () => {
    const { id: propertyId } = useParams();
    const [contactFormOpen, setContactFormOpen] = React.useState(false);
    const { data, isFetching: loading } = useGetPropertyQuery(propertyId);
    const property = data?.structured;
    return (
        <>
            {contactFormOpen && <ContactAgentForm onOpen={contactFormOpen} setOnOpen={setContactFormOpen} data={{ ...property }} property={true} />}
            <ImageSlider imageUrls={property?.imageUrls || []} />
            <Box sx={{
                display: 'flex', flexDirection: 'column', width: '100%', height: '100%',
                gap: 4,
            }}>
                <Box sx={{}}>
                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'column',
                        gap: 1,
                        my: 2,
                        p: 2
                    }}>
                        <Typography variant='h4' sx={{ fontWeight: '600', fontFamily: 'Plus Jakarta Sans', display: 'flex' }}>
                            <p className='capitalize'>{property?.name || `Property for ${property?.type || ""}`}</p> - ${property?.price || 0}{property?.type === 'rent' && '/month'}
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                                <IconMapPin />
                                <p>{`${property?.address?.location || ""}, ${property?.address?.city || ""} ${property?.address.country || ""}`}</p>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                                <IconRectangleFilled />
                                <p>{property?.area || ""}</p>
                            </Box>
                        </Box>

                        <Box>
                            <Box sx={{ px: 2, py: .5, color: 'black', width: '4rem', fontFamily: 'Plus Jakarta Sans', fontWeight: '600', textTransform: 'capitalize', backgroundColor: 'secondary.main', borderRadius: '3px' }}>
                                {property?.type || ""}
                            </Box>
                        </Box>

                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                lg: 'repeat(8, 1fr)',
                                md: 'repeat(5, 1fr)',
                                sm: 'repeat(3, 1fr)',
                                xs: 'repeat(3, 1fr)',
                            },
                            justifyItems: 'start',
                            justifyContent: 'start',
                            alignItems: 'start',
                            alignContent: 'start',
                            gap: 0,
                            mt: 2,
                        }}>
                            <Typography fontSize="14px" variant='h2' fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: .5 }}>
                                <p>{property?.beds || 0} Bed Rooms</p>
                            </Typography>

                            <Typography fontSize="14px" variant='h2' fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: .5 }}>
                                <p>{property?.beds || 0} Bath Rooms</p>
                            </Typography>

                            {property?.discount ?
                                <Typography fontSize="14px" variant='h2' fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: .5 }}>
                                    <IconCoinOff />   <p> {property?.discount}</p>
                                </Typography>
                                : null}
                            {property?.parking ?
                                <Typography fontSize="14px" variant='h2' fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: .5 }}>
                                    <IconParkingCircle />  <p> Parking </p>
                                </Typography>
                                : null}

                            {property?.furnished ?
                                <Typography fontSize="14px" variant='h2' fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: .5 }}>
                                    <IconHomeCog />  <p> Furnished </p>
                                </Typography>
                                : null}
                        </Box>

                        <Typography fontFamily="Plus Jakarta Sans" fontSize="14px">{property?.description}</Typography>
                        <Box>
                            <StyledButton onClick={() => setContactFormOpen(true)} variant="contained" sx={{ mt: 1 }} color="primary">Contact Agent</StyledButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default PropertyPage