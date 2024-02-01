import Chart from 'chart.js/auto'
import { Colors } from 'chart.js'
import { useTheme } from '@emotion/react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { IconHome, IconHomeStar } from '@tabler/icons-react'
import React from 'react'
import { useSelector } from 'react-redux'
import PageContainer from 'src/Layout/Main/Containers/PageContainer'
import DashboardCard from './components/DashboardCard'
import StatsCard1 from './components/StatsCard1'
import { Line, Pie } from 'react-chartjs-2'
import PieChart from './components/charts/PieChart'
import BarChart from './components/charts/BarChart'




const Home = () => {
  const theme = useTheme();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const xsUp = useMediaQuery((theme) => theme.breakpoints.up('xs'));

  const { darkMode } = useSelector((state) => state.theme);
  return (
    <PageContainer title='Dashboard' description=''>
      <Box>
        <Box sx={{
          display: 'flex',
          flexDirection: lgUp ? 'row' : 'column',
          width: '100%',
          gap: 2,
        }}>

          <DashboardCard width={lgUp ? null : '100%'} title="Overview" subtitle="Overview of all the updates">
            <Box sx={{ mt: 2, display: 'grid', gridTemplateColumns: { lg: 'repeat(4, 1fr)', md: 'repeat(3, 1fr)', xs: 'repeat(2, 1fr)' }, gap: 3, width: '100%', }}>
              <StatsCard1 bgColor={darkMode ? 'red.main' : 'red.100'} IconColor={darkMode ? 'red.light' : 'red.800'} />
              <StatsCard1 bgColor={darkMode ? "primary.main" : "primary.100"} IconColor={theme.palette.primary.dark} />
              <StatsCard1 bgColor={darkMode ? 'secondary.main' : "secondary.100"} IconColor={darkMode ? theme.palette.secondary[700] : theme.palette.secondary.dark} textColor={darkMode ? 'grey.800' : 'grey.600'} />
              <StatsCard1 bgColor={darkMode ? 'red.main' : 'red.100'} IconColor={darkMode ? 'red.light' : 'red.800'} />
            </Box>
          </DashboardCard>

          <Box >
            <DashboardCard title="Insights" subtitle="Overview of all the updates" >
              <Box sx={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', height: '13rem' }}>
                <PieChart />
              </Box>
            </DashboardCard>

          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, width: '100%', mt: 2 }}>
          <DashboardCard title="Insights in Last year" subtitle="Overview of all the updates in last year">
            <BarChart />
          </DashboardCard>
          <DashboardCard title="Insights in Last year" subtitle="Overview of all the updates in last year">
            <BarChart />
          </DashboardCard>
        </Box>
      </Box>
    </PageContainer >
  )
}

export default Home