import { Avatar, Box, IconButton } from '@mui/material'
import { IconTrash } from '@tabler/icons-react'
import { IconEye } from '@tabler/icons-react'
import React from 'react'
import { Link } from 'react-router-dom'

// for project
import PageCard from 'src/Layout/Main/Containers/PageCard'
import PageContainer from 'src/Layout/Main/Containers/PageContainer'
import { useGetLandsQuery } from 'src/app/services/api'
import StyledDataGrid from 'src/components/StyledDataGrid'
import DeleteLand from './views/DeleteLand'

const Lands_List = () => {

  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [selectedLand, setSelectedLand] = React.useState(null);
  const { data, isFetching } = useGetLandsQuery();

  const handleDeleteOpen = (params) => {
    setDeleteOpen(true);
    setSelectedLand(params?.row);
  }

  const columns = [
    { field: 'index', filterable: false, hideSortIcons: true, headerName: '#', width: 30 },
    {
      field: 'user', headerName: 'Owner', width: 150, renderCell: (params) =>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={params?.row?.user?.profilePic || SampleProfile1} sx={{ width: 24, height: 24 }} />
          {params?.row?.user?.name?.substring(0, 10) || "Owner Name"}
        </Box>
    },
    { field: 'size', headerName: 'Size', width: 150 },
    { field: 'address', headerName: 'Address', width: 210, renderCell: (params) => <div> <IconButton sx={{ p: 0, ":hover": { color: "primary.main" }, transition: "color 0.4s ease-in-out" }} LinkComponent={Link} to={`/app/lands/edit/${params?.row?._id}`}> <IconEye size={18} /> </IconButton> {params?.row?.address?.city}, {params?.row?.address?.country}</div > },
    {
      field: 'action', hideSortIcons: true, filterable: false, headerName: '', width: 100, renderCell: (params) =>
        <IconButton
          onClick={() => handleDeleteOpen(params)}
          sx={{ backgroundColor: 'error.main', color: 'white', ":hover": { backgroundColor: 'error.dark' }, transition: "color 0.6s ease-in-out" }} >
          <IconTrash size={18} />
        </IconButton>
    },
  ];

  const rows = data?.map((land, i) => ({ ...land, id: land._id, index: i + 1 })) || [];

  return (
    <>
      {deleteOpen && <DeleteLand onOpen={deleteOpen} setOnOpen={setDeleteOpen} data={selectedLand} />}

      <StyledDataGrid columns={columns} data={rows} loading={isFetching} />

    </>
  )
}

export default Lands_List