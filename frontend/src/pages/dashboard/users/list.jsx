import React from 'react'
import PageContainer from '../../../Layout/Main/Containers/PageContainer'
import PageCard from '../../../Layout/Main/Containers/PageCard'
import StyledDataGrid from '../../../components/StyledDataGrid'
import { Button, IconButton, Tooltip } from '@mui/material'
import { IconPlus } from '@tabler/icons-react'
import AddUser from './views/AddUser'

const Users_List = () => {
  const [addOpen, setAddOpen] = React.useState(false);
  const Actions = () => (
    <div className="flex gap-2">
      <Tooltip title="New User">
        <IconButton onClick={() => setAddOpen(true)} sx={{ backgroundColor: 'primary.main', color: 'white', ":hover": { backgroundColor: 'primary.dark' } }} > <IconPlus /> </IconButton>
      </Tooltip>
    </div>
  );
  const rows = [{
    id: 1,
    name: 'John Doe1',
    email: 'pV5b0@example.com',
    role: 'admin',
  }, {
    id: 2,
    name: 'Jane Doe2',
    email: 'pV5b0@example.com',
    role: 'admin',
  }, {
    id: 3,
    name: 'John Doe3',
    email: 'pV5b0@example.com',
    role: 'admin',
  },
  {
    id: 4,
    name: 'Jane Doe4',
    email: 'pV5b0@example.com',
    role: 'admin',
  }, {
    id: 5,
    name: 'John Doe5',
    email: 'pV5b0@example.com',
    role: 'admin',
  },
  {
    id: 6,
    name: 'Jane Doe6',
    email: 'pV5b0@example.com',
    role: 'admin',
  }, {
    id: 7,
    name: 'John Doe7',
    email: 'pV5b0@example.com',
    role: 'admin',
  }];
  const columns = [{
    field: 'name',
    headerName: 'Name',
    width: 200,
  }, {
    field: 'email',
    headerName: 'Email',
    width: 200,
  }, {
    field: 'role',
    headerName: 'Role',
    width: 200,
  }];
  return (
    <PageContainer title="Users Page" description='Users List Page'>
      {addOpen && <AddUser onOpen={addOpen} setOnOpen={setAddOpen} />}
      <PageCard headtitle='Users Management' title="Users List" headsubtitle="Page" action={<Actions />}>
        <StyledDataGrid columns={columns} data={rows} />
      </PageCard>
    </PageContainer>
  )
}

export default Users_List