import { Box, Container } from '@mui/material'
import React from 'react'
import LandsList from './components/LandsList'
import { Link } from 'react-router-dom'
import { useGetLandsQuery } from 'src/app/services/api'

const Lands = () => {
    const { data: lands, isFetching: loading } = useGetLandsQuery()
    return (
        <Container>
            <LandsList loading={loading} lands={lands} filterComponent={<Box sx={{ mb: 1, display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                <Link to='/lands/search' style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: '500' }}>All Filters</Link>
            </Box>} />
        </Container >
    )
}

export default Lands