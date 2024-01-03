import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { IconDots, IconPlus } from '@tabler/icons-react';
import React from 'react'

// for project
import { useGetCitiesQuery } from 'src/app/services/api';
import Loader from 'src/views/utilities/Loader';
import AddCity from './AddCity';
import CityDetail from './CityDetail';

const CitiesList = ({ country, loading }) => {
    const [addOpen, setAddOpen] = React.useState(false);
    const [detailOpen, setDetailOpen] = React.useState(false);
    const [selectedCity, setSelectedCity] = React.useState(null);

    const { data, isFetching } = useGetCitiesQuery(country?.name);

    const rows = data?.cities?.map((item, i) => ({ ...item, index: i + 1, id: item._id }));

    const handleDetailOpen = (params) => {
        setDetailOpen(true);
        setSelectedCity(params);
    }


    if (loading) return <Loader />

    return (
        <>
            {addOpen && <AddCity onOpen={addOpen} setOnOpen={setAddOpen} country={country} />}
            {detailOpen && <CityDetail onOpen={detailOpen} setOnOpen={setDetailOpen} data={selectedCity} country={country} />}
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" fontWeight="bold" fontFamily="Plus Jakarta Sans">Cities</Typography>
                    <Tooltip title="New City">
                        <IconButton onClick={() => setAddOpen(true)} sx={{ backgroundColor: 'primary.main', color: 'white', ":hover": { backgroundColor: 'primary.dark' } }} > <IconPlus size={16} /> </IconButton>
                    </Tooltip>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: .8, py: 3, width: '100%', height: '200px', mt: 1.5, overflow: 'auto' }}>
                    {isFetching ? <Loader /> :
                        rows && rows.length > 0 ?
                            rows?.map((city) => (
                                <Box key={city._id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'primary.800', p: 1, borderRadius: '10px', ":hover": { backgroundColor: 'primary.700' }, transition: 'all 0.3s ease-in-out' }}>
                                    <Typography>{city.name}</Typography>
                                    <IconButton onClick={() => handleDetailOpen(city)} sx={{ backgroundColor: 'primary.main', color: 'white', ":hover": { backgroundColor: 'primary.dark' } }} > <IconDots size={16} /> </IconButton>
                                </Box>
                            )) :
                            <Typography>No Data</Typography>
                    }
                </Box>
            </Box>
        </>
    )
}

export default CitiesList