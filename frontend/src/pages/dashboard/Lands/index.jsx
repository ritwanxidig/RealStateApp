import React from 'react'
import PageCard from 'src/Layout/Main/Containers/PageCard'
import PageContainer from 'src/Layout/Main/Containers/PageContainer'
import Lands_List from './list'
import { IconButton } from '@mui/material'
import { IconPlus } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

const index = () => {
    return (
        <PageContainer title='Admin | Lands' description=''>
            <PageCard title='Lands' headtitle="Lands Management" headsubtitle="Page"
                action={
                    <IconButton
                        LinkComponent={Link}
                        to="/app/lands/new"
                        sx={{ backgroundColor: 'primary.main', color: 'white', ":hover": { backgroundColor: 'primary.dark' } }} >

                        <IconPlus />

                    </IconButton>
                }
            >
                <Lands_List />
            </PageCard>
        </PageContainer>
    )
}

export default index