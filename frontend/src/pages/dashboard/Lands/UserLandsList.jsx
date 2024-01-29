import { IconButton } from '@mui/material'
import { IconPlus } from '@tabler/icons-react'
import React from 'react'
import { Link } from 'react-router-dom'
import PageCard from 'src/Layout/Main/Containers/PageCard'
import PageContainer from 'src/Layout/Main/Containers/PageContainer'
import { useGetMyLandsQuery } from 'src/app/services/api'
import Lands_List from './list'

const UserLandsList = () => {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [selectedLand, setSelectedLand] = React.useState(null);

  // api data
  const { data: myLands, isFetching } = useGetMyLandsQuery();

  const handleDeleteOpen = (params) => {
    setDeleteOpen(true);
    setSelectedLand(params?.row);
  }

  return (
    <PageContainer title='Dashboard | User Lands' description=''>
      <PageCard title='User Lands' headtitle="User Lands Management" headsubtitle="Page"
        action={
          <IconButton
            LinkComponent={Link}
            to="/app/lands/new"
            sx={{ backgroundColor: 'primary.main', color: 'white', ":hover": { backgroundColor: 'primary.dark' } }} >
            <IconPlus />
          </IconButton>
        }>
        <Lands_List data={myLands} isFetching={isFetching} />
      </PageCard>
    </PageContainer>
  )
}

export default UserLandsList