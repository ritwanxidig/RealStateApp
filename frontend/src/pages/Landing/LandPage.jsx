import React from 'react'
import { useParams } from 'react-router'
import { useGetLandQuery } from 'src/app/services/api';
import ImageSlider from './components/ImageSlider';
import { Box, Typography } from '@mui/material';
import { IconMapPin, IconRectangleFilled } from '@tabler/icons-react';
import ContactAgentForm from './components/ContactAgentForm';
import StyledButton from 'src/components/shared/StyledButton';

const LandPage = () => {
    const [contactFormOpen, setContactFormOpen] = React.useState(false);
    const { id: landId } = useParams();

    const { data, isFetching: loading } = useGetLandQuery(landId)
    const land = data?.structured;


    return (
        <>
            {contactFormOpen && <ContactAgentForm onOpen={contactFormOpen} setOnOpen={setContactFormOpen} data={{ location: land?.address?.country, ...land }} />}
            <ImageSlider imageUrls={land?.images || []} />

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
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
                            <p className='capitalize'>{`Land for Sale`}</p> - ${land?.price || 0}{land?.type === 'rent' && '/month'}
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box sx={{ display: 'flex', fontWeight: '600', alignItems: 'center', gap: 0.5, fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                                <IconMapPin />
                                <p>{`${land?.address?.location || ""}, ${land?.address?.city || ""} ${land?.address.country || ""}`}</p>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontFamily: 'Plus Jakarta Sans', fontSize: '14px', fontWeight: '600' }}>
                                <IconRectangleFilled />
                                <p>{land?.size || ""}</p>
                            </Box>
                        </Box>
                        <Typography fontFamily="Plus Jakarta Sans" fontSize="14px">{land?.description}</Typography>
                        <Box>
                            <StyledButton onClick={() => setContactFormOpen(true)} variant="contained" sx={{ mt: 1 }} color="primary">Contact Agent</StyledButton>
                        </Box>
                    </Box>

                </Box>
            </Box>
        </>
    )
}

export default LandPage