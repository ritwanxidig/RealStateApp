import { Box } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router'
import { useGetPropertyQuery } from 'src/app/services/api';

const PropertyPage = () => {
    const { id: propertyId } = useParams();
    const { data: property, isFetching: loading } = useGetPropertyQuery(propertyId);
    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', width: '100%', height: '100%',
            gap: 4,
        }}>
            <Box sx={{}}>
                
            </Box>
        </Box>
    )
}

export default PropertyPage