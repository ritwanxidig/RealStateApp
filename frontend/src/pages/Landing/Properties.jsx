import { Box } from '@mui/material'
import React from 'react'
import { useGetPropertiesQuery } from 'src/app/services/api';
import PropertyList from './components/PropertyList';

const Properties = () => {
    const { data: properties, isFetching: loading } = useGetPropertiesQuery();
    return (
        <Box>
            <PropertyList loading={loading} properties={properties} />
        </Box>
    )
}

export default Properties