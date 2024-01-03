import React from 'react';
import CustomModal from 'src/views/utilities/CustomModal';
import { Box, IconButton, Tab, Tooltip, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CitiesList from './CitiesList';
import { IconEdit } from '@tabler/icons-react';
import EditCountry from './EditCountry';
import { useGetCityQuery, useGetCountryQuery } from 'src/app/services/api';
import Loader from 'src/views/utilities/Loader';



const StyledTab = styled(Tab)(({ theme }) => (
    {
        textTransform: 'none',
        borderRadius: '50px'
    }
))

const CountryDetails = ({ onOpen, setOnOpen, data }) => {
    const [tabValue, setTabValue] = React.useState("1")
    const [editOpen, setEditOpen] = React.useState(false);
    const { data: currentCountry, isFetching: isFetchingCountry } = useGetCountryQuery(data?._id)
    return (
        <>
            {editOpen && <EditCountry onOpen={editOpen} setOnOpen={setEditOpen} data={currentCountry ? currentCountry : data} />}
            <CustomModal
                title="Country Detail"
                onOpen={onOpen}
                setOnOpen={setOnOpen}
                actions={<></>}
            >

                   
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: '',
                                gap: 2,
                                mt:2,
                                alignItems: 'center',
                                mb: 1
                            }}>
                            <Typography variant="body1" fontWeight="bold" fontFamily="Plus Jakarta Sans">{currentCountry ? currentCountry?.name : data?.name}</Typography>
                            <Tooltip title="Edit Name">
                                <IconButton
                                    onClick={() => setEditOpen(true)}
                                    sx={{ backgroundColor: 'primary.main', color: 'white', ":hover": { backgroundColor: 'primary.dark' } }}
                                >
                                    <IconEdit size={12} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        {isFetchingCountry ? <Loader /> : <CitiesList country={currentCountry ? currentCountry : data} loading={isFetchingCountry} />}
                

            </CustomModal>
        </>
    )
}

export default CountryDetails