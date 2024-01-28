import React from 'react'
import { IconButton } from '@mui/material'

// for project
import { useGetMyPropertiesQuery } from 'src/app/services/api'
import { } from 'src/app/slices/alertSlice'
import PageContainer from 'src/Layout/Main/Containers/PageContainer'
import PageCard from 'src/Layout/Main/Containers/PageCard'
import { IconPlus } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import DeleteProperty from './components/DeleteProperty'
import { useSelector } from 'react-redux'
import Properties_List from './list'

const MyProperties_List = () => {
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    useSelector(state => state.auth)
    const [selectedProperty, setSelectedProperty] = React.useState(null);
    const { data: properties, isFetching } = useGetMyPropertiesQuery();
    return (
        <>
            {deleteOpen && <DeleteProperty onOpen={deleteOpen} setOnOpen={setDeleteOpen} data={selectedProperty} />}
            <PageContainer title='Properties' description=''>

                <PageCard
                    title="Properties List"
                    headtitle="Properties Management"
                    headsubtitle={"List of all properties"}
                    subtitle="List of all your properties"
                    action={<>
                        <IconButton
                            sx={{ backgroundColor: 'primary.main', color: 'white', ":hover": { backgroundColor: 'primary.dark' } }} >
                            <Link to="/app/properties/new">
                                <IconPlus />
                            </Link>
                        </IconButton>
                    </>}
                >
                    <Properties_List properties={properties} isFetching={isFetching} setDeleteOpen={setDeleteOpen} setSelectedProperty={setSelectedProperty} />
                </PageCard>
            </PageContainer>
        </>
    )
}

export default MyProperties_List