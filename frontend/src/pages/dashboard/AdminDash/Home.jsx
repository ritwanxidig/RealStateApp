import { Box, useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageContainer from 'src/Layout/Main/Containers/PageContainer'
import OverviewAnalaysis from './components/OverviewAnalaysis'
import RevenueAnalaysis from './components/RevenueAnalaysis'
import LastYearListings from './components/LastYearListings'
import MostActiveCities from './components/MostActiveCities'
import PropertyAnalaysis from './components/PropertyAnalaysis'
import LatestListings from './components/LatestListings'
import LastYearRevenue from './components/LastYearRevenue'
import MostActiveUsers from './components/MostActiveUsers'
import { useGetAnalaysisQuery } from 'src/app/services/api'
import { setAnalaysis } from 'src/app/slices/analaysis'




const Home = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const dispatch = useDispatch();

  const { data } = useGetAnalaysisQuery();

  useEffect(() => {
    dispatch(setAnalaysis(data));
  }, [data]);

  const { analaysis } = useSelector((state) => state.analaysis);

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
            <OverviewAnalaysis data={analaysis?.overview} />
          </Box>
          <Box sx={{ width: '100%' }}>
            <RevenueAnalaysis data={analaysis?.revenueAnalaysis} />
          </Box>
        </Box>

        <Box sx={{ width: '100%', mt: 2 }}>
          <LastYearRevenue data={analaysis?.monthlyRevenue} />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: lgUp ? 'row' : 'column', gap: 2, width: '100%', mt: 2 }}>
          <Box sx={{ width: '100%' }}>
            <LastYearListings data={analaysis?.monthlyPublished} />
          </Box>
          <Box sx={{ width: '100%' }}>
            <MostActiveCities data={analaysis?.topCitiesDetails} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: lgUp ? 'row' : 'column', gap: 2, width: '100%', mt: 2 }}>
          <Box className={`${lgUp ? 'w-1/4' : 'w-full'}`}>
            <PropertyAnalaysis data={analaysis?.propertyAnalaysis} />
          </Box>
          <Box className={`${lgUp ? 'flex-1 w-1/3' : 'w-full'}`}>
            <LatestListings data={analaysis?.latestListings} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: lgUp ? 'row' : 'column', gap: 2, width: '100%', mt: 2 }}>
          <Box className={`${lgUp ? 'w-2/3' : 'w-full'}`}>
            <MostActiveUsers data={analaysis?.topUsersDetails} />
          </Box>
        </Box>

      </Box>
    </PageContainer >
  )
}

export default Home