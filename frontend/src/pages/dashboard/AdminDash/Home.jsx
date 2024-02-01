import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import PageContainer from 'src/Layout/Main/Containers/PageContainer'
import OverviewAnalaysis from './components/OverviewAnalaysis'
import RevenueAnalaysis from './components/RevenueAnalaysis'
import LastYearListings from './components/LastYearListings'
import MostActiveCities from './components/MostActiveCities'
import PropertyAnalaysis from './components/PropertyAnalaysis'
import LatestListings from './components/LatestListings'
import LastYearRevenue from './components/LastYearRevenue'
import MostActiveUsers from './components/MostActiveUsers'




const Home = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  useSelector((state) => state.theme);
  return (
    <PageContainer title='Dashboard' description=''>
      <Box>
        <Box sx={{
          display: 'flex',
          flexDirection: lgUp ? 'row' : 'column',
          width: '100%',
          gap: 2,
        }}>
          <Box sx={{ width: '100%' }}>
            <OverviewAnalaysis />
          </Box>
          <Box sx={{ width: '100%' }}>
            <RevenueAnalaysis />
          </Box>
        </Box>

        <Box sx={{ width: '100%', mt: 2 }}>
          <LastYearRevenue />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: lgUp ? 'row' : 'column', gap: 2, width: '100%', mt: 2 }}>
          <Box sx={{ width: '100%' }}>
            <LastYearListings />
          </Box>
          <Box sx={{ width: '100%' }}>
            <MostActiveCities />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: lgUp ? 'row' : 'column', gap: 2, width: '100%', mt: 2 }}>
          <Box className={`${lgUp ? 'w-1/4' : 'w-full'}`}>
            <PropertyAnalaysis />
          </Box>
          <Box className={`${lgUp ? 'flex-1 w-1/3' : 'w-full'}`}>
            <LatestListings />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: lgUp ? 'row' : 'column', gap: 2, width: '100%', mt: 2 }}>
          <Box className={`${lgUp ? 'w-1/3' : 'w-full'}`}>
            <MostActiveUsers />
          </Box>
        </Box>

      </Box>
    </PageContainer >
  )
}

export default Home