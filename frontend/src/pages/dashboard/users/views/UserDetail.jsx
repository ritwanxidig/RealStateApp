import React from 'react'
import CustomModal from 'src/views/utilities/CustomModal'
import { Box, Tab, Typography } from '@mui/material'
import { TabPanel, TabList, TabContext } from "@mui/lab";
import styled from '@emotion/styled';
import UserInfo from './UserInfo';
import UserActions from './UserActions';

const UserDetail = ({ onOpen, setOnOpen, data }) => {
  const [tabValue, setTabValue] = React.useState("1")

  const Actions = () => {
    <></>
  }


  const StyledTab = styled(Tab)(({ theme }) => (
    {
      textTransform: 'none',
      borderRadius: '50px'
    }
  ))

  return (
    <CustomModal
      title="User Detail"
      onOpen={onOpen}
      setOnOpen={setOnOpen}
      actions={<Actions />}
    >
      <TabContext value={tabValue} >
        <TabList
          sx={{
            mt: 1,
            "& .MuiTabs-indicator": {
              display: "none"
            }
          }}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          onChange={(event, newValue) => setTabValue(newValue)}
        >
          <StyledTab label="Basic Info" value="1" />
          <StyledTab label="Actions" value="2" />
        </TabList>
        <TabPanel value="1">
          <UserInfo data={data} />
        </TabPanel>
        <TabPanel value="2">
          <UserActions data={data} setOnOpen={setOnOpen} />
        </TabPanel>

      </TabContext>



    </CustomModal>
  )
}

export default UserDetail