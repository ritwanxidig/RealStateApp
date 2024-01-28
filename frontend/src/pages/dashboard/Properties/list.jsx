import React from 'react'
import { Avatar, Box, IconButton } from '@mui/material'

// for project
import { useGetMyPropertiesQuery, useGetPropertiesQuery } from 'src/app/services/api'
import { } from 'src/app/slices/alertSlice'
import PageContainer from 'src/Layout/Main/Containers/PageContainer'
import PageCard from 'src/Layout/Main/Containers/PageCard'
import { IconDots, IconEye, IconPlus, IconTrash } from '@tabler/icons-react'
import StyledDataGrid from 'src/components/StyledDataGrid'
import { SampleProfile1 } from 'src/assets'
import { Link } from 'react-router-dom'
import DeleteProperty from './components/DeleteProperty'
import { useSelector } from 'react-redux'

const Properties_List = ({ properties, setDeleteOpen, setSelectedProperty, isFetching }) => {



    const columns = [
        { field: 'index', headerName: '#', width: 30 },
        {
            field: 'user', headerName: 'Owner', width: 150, renderCell: (params) =>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar src={params?.row?.user?.profilePic || SampleProfile1} sx={{ width: 24, height: 24 }} />
                    {params?.row?.user?.name?.substring(0, 10) || "Owner Name"}
                </Box>
        },
        { field: 'address', headerName: 'Location', width: 200, renderCell: (params) => <div>{params?.row?.address?.city}, {params?.row?.address?.country}</div> },
        { field: 'type', headerName: 'Type', width: 120 },
        { field: 'price', headerName: 'Price', width: 120 },
        {
            field: 'offer', headerName: 'Info', width: 350,
            renderCell: (params) => (
                <Box>
                    <IconButton LinkComponent={Link} to={`/app/properties/edit/${params?.row?._id}`} sx={{ mr: .7, p: 0, ":hover": { color: "primary.main" }, transition: "color 0.4s ease-in-out" }}>
                        <IconEye size={18} />
                    </IconButton>
                    {params?.row?.beds && `${params?.row?.beds} beds, `}
                    {params?.row?.baths && `${params?.row?.baths} baths, `}
                    {params?.row?.parking && "Parking, "}
                    {params?.row?.furnished && "Furnished, "}
                </Box>
            )
        },
        {
            field: 'actions', headerName: 'Actions', width: 100,
            renderCell: (params) =>
                <IconButton
                    onClick={() => handleDeleteOpen(params)}
                    sx={{ backgroundColor: 'error.main', color: 'white', ":hover": { backgroundColor: 'error.dark' } }} >
                    <IconTrash size={18} />
                </IconButton>
        },
    ]

    const rows = properties?.map((property, i) => ({ ...property, id: property._id, index: i + 1 })) || [];

    const handleDeleteOpen = (params) => {

        setDeleteOpen(true);
        setSelectedProperty(params?.row);
    }

    return (
        <StyledDataGrid
            columns={columns}
            data={rows}
            loading={isFetching}
        />
    )
}

export default Properties_List