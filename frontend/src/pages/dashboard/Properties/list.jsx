import React from 'react'

// for project
import { useGetPropertiesQuery } from 'src/app/services/api'
import { } from 'src/app/slices/alertSlice'
import PageContainer from 'src/Layout/Main/Containers/PageContainer'
import PageCard from 'src/Layout/Main/Containers/PageCard'
import { Avatar, Box, IconButton } from '@mui/material'
import { IconDots } from '@tabler/icons-react'
import StyledDataGrid from 'src/components/StyledDataGrid'
import { SampleProfile1 } from 'src/assets'

const Properties_List = () => {
    const { data: properties, isFetching } = useGetPropertiesQuery();


    const columns = [
        {
            field: 'user', headerName: 'Owner', width: 150, renderCell: (params) =>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar src={params?.row?.user?.avatar || SampleProfile1} sx={{ width: 24, height: 24 }} />
                    {params?.row?.user?.name?.substring(0, 10) || "Owner Name"}
                </Box>
        },
        { field: 'address', headerName: 'Location', width: 200, renderCell: (params) => <div>{params?.row?.address?.city}, {params?.row?.address?.country}</div> },
        { field: 'type', headerName: 'Type', width: 120 },
        { field: 'price', headerName: 'Price', width: 120 },
        {
            field: 'offer', headerName: 'Info', width: 420,
            renderCell: (params) => (
                <Box>
                    {params?.row?.beds && `${params?.row?.beds} beds, `}
                    {params?.row?.baths && `${params?.row?.baths} baths, `}
                    {params?.row?.parking && "Parking, "}
                    {params?.row?.furnished && "Furnished, "}
                </Box>
            )
        },
        {
            field: 'actions', headerName: 'Actions', width: 100,
            renderCell: () =>
                <IconButton
                    // onClick={() => handleDetailOpen(params)}
                    sx={{ backgroundColor: 'primary.main', color: 'white', ":hover": { backgroundColor: 'primary.dark' } }} >
                    <IconDots />
                </IconButton>
        },
    ]

    const rows = properties?.map(property => ({ ...property, id: property._id })) || [];
    
    return (
        <PageContainer title='Properties' description=''>
            <PageCard
                title="Properties List"
                headtitle="Properties Management"
                headsubtitle={"List of all properties"}
                subtitle="List of all your properties"
                actions={<></>}
            >

                <StyledDataGrid
                    columns={columns}
                    data={rows}
                    loading={isFetching}
                />

            </PageCard>
        </PageContainer>
    )
}

export default Properties_List