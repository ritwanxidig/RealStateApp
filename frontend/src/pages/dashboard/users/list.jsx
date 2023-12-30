import React from 'react'
import PageContainer from '../../../Layout/Main/Containers/PageContainer'
import PageCard from '../../../Layout/Main/Containers/PageCard'
import StyledDataGrid from '../../../components/StyledDataGrid'
import { IconButton, Tooltip } from '@mui/material'
import { IconDots, IconPlus } from '@tabler/icons-react'
import AddUser from './views/AddUser'
import { useGetUsersQuery } from '../../../app/services/api'
import UserDetail from './views/UserDetail'

const Users_List = () => {
  const [addOpen, setAddOpen] = React.useState(false);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const { data: users, isFetching } = useGetUsersQuery();

  const handleDetailOpen = (params) => {
    setDetailOpen(true);
    setSelectedUser(params?.row);
  }

  const Actions = () => (
    <div className="flex gap-2">
      <Tooltip title="New User">
        <IconButton onClick={() => setAddOpen(true)} sx={{ backgroundColor: 'primary.main', color: 'white', ":hover": { backgroundColor: 'primary.dark' } }} > <IconPlus /> </IconButton>
      </Tooltip>
    </div>
  );

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'roles', headerName: 'Role', width: 200 },
    {
      field: 'actions', headerName: 'Actions', width: 100,
      renderCell: (params) =>
        <IconButton
          onClick={() => handleDetailOpen(params)}
          sx={{ backgroundColor: 'primary.main', color: 'white', ":hover": { backgroundColor: 'primary.dark' } }} >
          <IconDots />
        </IconButton>
    },
  ];
  const rows = users?.map((user) => ({ ...user, id: user._id })) || [];

  return (
    <PageContainer title="Users Page" description='Users List Page'>
      {addOpen && <AddUser onOpen={addOpen} setOnOpen={setAddOpen} />}
      {detailOpen && <UserDetail onOpen={detailOpen} data={selectedUser} setOnOpen={setDetailOpen} />}
      <PageCard headtitle='Users Management' title="Users List" headsubtitle="Page" action={<Actions />}>
        <StyledDataGrid columns={columns} data={rows} />
      </PageCard>
    </PageContainer>
  )
}

export default Users_List