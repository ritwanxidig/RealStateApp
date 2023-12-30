import React from 'react'
import PageContainer from '../../../Layout/Main/Containers/PageContainer'
import PageCard from '../../../Layout/Main/Containers/PageCard'

const Properties_List = () => {
    return (
        <PageContainer title='Properties' description=''>
            <PageCard
                title="Properties List"
                headtitle="Properties Management"
                headsubtitle={"List of all properties"}
                subtitle="List of all your properties"
                actions={<></>}
            />
        </PageContainer>
    )
}

export default Properties_List