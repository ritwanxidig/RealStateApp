import { Box, useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


// for project
import PageContainer from 'src/Layout/Main/Containers/PageContainer'
import { useGetUserAnalaysisQuery } from 'src/app/services/api'
import { setAnalaysis } from 'src/app/slices/analaysis'
import OverviewAnalaysis from '../AdminDash/components/OverviewAnalaysis'
import RevenueAnalaysis from '../AdminDash/components/RevenueAnalaysis'
import LastYearListings from '../AdminDash/components/LastYearListings'
import MostActiveCities from '../AdminDash/components/MostActiveCities'
import LastYearRevenue from '../AdminDash/components/LastYearRevenue'
import PropertyAnalaysis from '../AdminDash/components/PropertyAnalaysis'
import LatestListings from '../AdminDash/components/LatestListings'

const UserHome = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const dispatch = useDispatch();

  const { data } = useGetUserAnalaysisQuery();
  const { analaysis } = useSelector(state => state.analaysis);

  useEffect(() => {
    dispatch(setAnalaysis(data));
  }, [data]);

  return (
    <PageContainer title='Dashboard'>
      <Box>
        <Box sx={{
          display: 'flex',
          flexDirection: lgUp ? 'row' : 'column',
          width: '100%',
          gap: 2,
        }}>
          <Box sx={{ width: '100%' }}>
            <OverviewAnalaysis data={analaysis?.overview} />
          </Box>
          <Box sx={{ width: '100%' }}>
            <RevenueAnalaysis data={analaysis?.revenueAnalaysis} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: lgUp ? 'row' : 'column', gap: 2, width: '100%', mt: 2 }}>
          <Box sx={{ width: '100%' }}>
            <LastYearListings data={analaysis?.monthlyPublished} />
          </Box>
          <Box sx={{ width: '100%' }}>
            <LastYearRevenue data={analaysis?.monthlyRevenue} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: lgUp ? 'row' : 'column', gap: 2, width: '100%', mt: 2 }}>
          <Box className={`${lgUp ? 'w-1/4' : 'w-full'}`}>
            <PropertyAnalaysis data={analaysis?.propertyAnalaysis} />
          </Box>
          <Box className={`${lgUp ? 'flex-1 w-3/4' : 'w-full'}`}>
            <LatestListings data={analaysis?.latestListings} />
          </Box>
        </Box>

      </Box>
    </PageContainer>
  )
}

export default UserHome