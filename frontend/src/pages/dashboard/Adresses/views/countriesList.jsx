import { Box, Container, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { IconDots, IconPlus } from "@tabler/icons-react";

// for project
import { useGetCountriesQuery } from 'src/app/services/api';
import StyledDataGrid from 'src/components/StyledDataGrid'
import CountryDetails from './CountryDetails';
import AddCountry from './AddCountry';

const CountriesList = () => {
    const { data, isFetching } = useGetCountriesQuery();
    const [addOpen, setAddOpen] = React.useState(false);
    const [detailOpen, setDetailOpen] = React.useState(false);
    const [selectedCountry, setSelectedCountry] = React.useState(null);
    const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));


    const handleDetailOpen = (params) => {
        setDetailOpen(true);
        setSelectedCountry(params?.row);
    }

    const columns = [
        {
            field: 'index',
            headerName: '#',
            width: 60,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: lgUp ? 800 : 200,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 90,
            renderCell: (params) => (
                <IconButton
                    // onClick={() => handleDetailOpen(params)}
                    sx={{ backgroundColor: 'primary.main', color: 'white', ":hover": { backgroundColor: 'primary.dark' } }}
                    onClick={() => handleDetailOpen(params)}
                >
                    <IconDots />
                </IconButton>
            ),
        }
    ];

    const rows = data?.countries?.map((item, i) => ({ ...item, index: i + 1, id: item._id }));

    return (
        <>
            {addOpen && <AddCountry onOpen={addOpen} setOnOpen={setAddOpen} />}
            {detailOpen && <CountryDetails onOpen={detailOpen} setOnOpen={setDetailOpen} data={selectedCountry} />}
            <Box sx={{
                width: '100%',
                display: 'flex', flexDirection: 'column', gap: 4, width: '100%',
                borderRadius: '20px',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',

            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: smUp ? 4 : 2 }}>
                    <Typography variant="h6" fontFamily="Plus Jakarta Sans">Countries</Typography>
                    <Tooltip title="New Country">
                        <IconButton onClick={() => setAddOpen(true)} sx={{ backgroundColor: 'primary.main', color: 'white', ":hover": { backgroundColor: 'primary.dark' } }} > <IconPlus /> </IconButton>
                    </Tooltip>
                </Box>
                <StyledDataGrid data={rows} columns={columns} loading={isFetching} />
            </Box>
        </>
    )
}

export default CountriesList