import React from 'react'
import PageContainer from '../../../Layout/Main/Containers/PageContainer'
import PageCard from '../../../Layout/Main/Containers/PageCard'
import { Box } from '@mui/material'
import CountriesList from './views/countriesList'
import CitiesList from './views/CitiesList'
import LocationsList from './views/LocationsList'

const Adresses_List = () => {
    return (
        <PageContainer title='Dashboard' description=''>
            <PageCard title='Adresses' headtitle="Adresses Management" headsubtitle="Page">
                <CountriesList />

            </PageCard>
        </PageContainer>
    )
}

export default Adresses_List