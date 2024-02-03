import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { IconDots, IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import React from 'react'

// for project
import { useGetLocationsQuery } from 'src/app/services/api';
import Loader from 'src/views/utilities/Loader';
import EditLocation from './EditLocation';
import AddLocation from './AddLocation';
import DeleteLocation from './DeleteLocation';
import { useSelector } from 'react-redux';

const LocationsList = ({ country, loading, city }) => {
  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState(null);

  const { darkMode } = useSelector(state => state.theme);

  const { data, isFetching } = useGetLocationsQuery(`${country?._id}/${city?._id}`);

  const rows = data?.map((item, i) => ({ ...item, index: i + 1, id: item._id }));

  const handleEditOpen = (params) => {
    setEditOpen(true);
    setSelectedLocation(params);
  }

  const handleDeleteOpen = (params) => {
    setDeleteOpen(true);
    setSelectedLocation(params);
  }


  if (loading) return <Loader />

  return (
    <>
      {addOpen && <AddLocation onOpen={addOpen} setOnOpen={setAddOpen} country={country} city={city} />}
      {editOpen && <EditLocation onOpen={editOpen} setOnOpen={setEditOpen} city={city} data={selectedLocation} country={country} />}
      {deleteOpen && <DeleteLocation onOpen={deleteOpen} setOnOpen={setDeleteOpen} data={selectedLocation} country={country} city={city} />}
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1" fontWeight="bold" fontFamily="Plus Jakarta Sans">Locations</Typography>
          <Tooltip title="New City">
            <IconButton onClick={() => setAddOpen(true)} sx={{ backgroundColor: 'primary.main', color: 'white', ":hover": { backgroundColor: 'primary.dark' } }} > <IconPlus size={16} /> </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: .8, py: 3, width: '100%', height: '200px', mt: 1.5, overflow: 'auto' }}>
          {isFetching ? <Loader /> :
            rows && rows.length > 0 ?
              rows?.map((location) => (
                <Box key={location._id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: darkMode ? 'primary.800' : 'grey.100', p: 1, borderRadius: '10px', ":hover": { backgroundColor: darkMode ? 'primary.700' : 'grey.200' }, transition: 'all 0.3s ease-in-out' }}>
                  <Typography>{location.name}</Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Edit Location">
                      <IconButton
                        onClick={() => handleEditOpen(location)}
                        sx={{ backgroundColor: 'primary.main', color: 'white', ":hover": { backgroundColor: 'primary.dark' } }} > <IconEdit size={16} /> </IconButton>
                    </Tooltip>
                    {/* <Tooltip title="Delete Location">
                      <IconButton
                        onClick={() => handleDeleteOpen(location)}
                        sx={{ backgroundColor: 'error.main', color: 'white', ":hover": { backgroundColor: 'red.900' } }} > <IconTrash size={16} /> </IconButton>
                    </Tooltip> */}
                  </Box>
                </Box>
              )) :
              <Typography>No Data</Typography>
          }
        </Box>
      </Box>
    </>
  )
}

export default LocationsList