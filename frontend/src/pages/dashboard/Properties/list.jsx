import React from 'react'

// for project
import { useGetPropertiesQuery } from '../../../app/services/api'
import { } from '../../../app/slices/alertSlice'
import PageContainer from '../../../Layout/Main/Containers/PageContainer'
import PageCard from '../../../Layout/Main/Containers/PageCard'
import { Avatar, Box, Checkbox, IconButton } from '@mui/material'
import { IconDots, IconEye } from '@tabler/icons-react'
import StyledDataGrid from '../../../components/StyledDataGrid'
import { SampleProfile1 } from '../../../assets'

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
            renderCell: (params) =>
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