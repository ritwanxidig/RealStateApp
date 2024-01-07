import { Box } from '@mui/material'
import React from 'react'
import { useGetPropertiesQuery } from 'src/app/services/api';
import PropertyList from './components/PropertyList';
import { Link } from 'react-router-dom';

const Properties = () => {
    const { data: properties, isFetching: loading } = useGetPropertiesQuery();
    return (
        <Box>
            <PropertyList loading={loading} properties={properties} filterComponent={<Box sx={{ mb: 1, display: 'flex', justifyContent: 'end', mx: 4, alignItems: 'center' }}>
                <Link to='/properties/search' style={{ fontFamily: 'Plus Jakarta Sans' }}>All Filters</Link>
            </Box>} />
        </Box>
    )
}

export default Properties