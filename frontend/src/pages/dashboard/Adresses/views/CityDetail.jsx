import { Box, IconButton, Tab, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { useGetCityQuery } from 'src/app/services/api'
import EditCity from './EditCity'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import styled from '@emotion/styled'
import { IconEdit } from '@tabler/icons-react'
import Loader from 'src/views/utilities/Loader'
import LocationsList from './LocationsList'
import CustomModal from 'src/views/utilities/CustomModal'




const StyledTab = styled(Tab)(({ theme }) => (
    {
        textTransform: 'none',
        borderRadius: '50px'
    }
))
const CityDetail = ({ onOpen, setOnOpen, data, country }) => {
    const [tabValue, setTabValue] = React.useState("1")
    const [editOpen, setEditOpen] = React.useState(false);
    const { data: currentCity, isFetching: isFetchingCity } = useGetCityQuery(`${country?.name}/${data?._id}`);
    return (
        <>
            {editOpen && <EditCity onOpen={editOpen} setOnOpen={setEditOpen} data={currentCity ? currentCity : data} country={country} />}

            <CustomModal
                title="City Detail"
                onOpen={onOpen}
                setOnOpen={setOnOpen}
            >
                <TabContext value={tabValue} >
                    <TabList
                        sx={{
                            mt: 1,
                            "& .MuiTabs-indicator": {
                                display: "none"
                            }
                        }}
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        onChange={(event, newValue) => setTabValue(newValue)}
                    >
                        <StyledTab label="Locations" value="1" />
                        <StyledTab label="Actions" value="2" />
                    </TabList>
                    <TabPanel value="1">
                        <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: '',
                                    gap: 2,
                                    alignItems: 'center',
                                    mb: 1
                                }}>
                                <Typography variant="body1" fontWeight="bold" fontFamily="Plus Jakarta Sans">{currentCity ? currentCity?.name : data?.name}</Typography>
                                <Tooltip title="Edit Name">
                                    <IconButton
                                        onClick={() => setEditOpen(true)}
                                        sx={{ backgroundColor: 'primary.main', color: 'white', ":hover": { backgroundColor: 'primary.dark' } }}
                                    >
                                        <IconEdit size={12} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            {isFetchingCity ? <Loader /> : <LocationsList city={currentCity ? currentCity : data} country={country} loading={isFetchingCity} />}
                        </Box>
                    </TabPanel>
                    <TabPanel value="2">
                        <Box>Tab2</Box>
                    </TabPanel>

                </TabContext>
            </CustomModal>

        </>)
}

export default CityDetail