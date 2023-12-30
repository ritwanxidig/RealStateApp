import React from 'react'
import CustomModal from '../../../../utilities/CustomModal'
import { Box } from '@mui/material'
import CustomField from '../../../../components/form/CustomField'

const AddUser = ({ onOpen, setOnOpen }) => {
  return (
    <CustomModal onOpen={onOpen} width="500px" setOnOpen={setOnOpen} title="Add User">
      <Box sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <CustomField name={"name"} id="name" label={"Name"} input type="text" required />
            <CustomField name={"email"} label={"Email"} id="email" input type="email" required />
            <Box sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center'
            }}>
              <CustomField name={"username"} label={"Username"} id="username" input type="text" required />
              <CustomField name={"role"} label={"Role"} id="role" select required>
                <option defaultValue >Select One</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </CustomField>
            </Box>
          </Box>
        </form>
      </Box>
    </CustomModal>
  )
}

export default AddUser