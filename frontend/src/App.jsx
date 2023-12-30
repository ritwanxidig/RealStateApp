import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ThemeProvider } from '@emotion/react'
import { BlueDarkTheme, BluelighTheme } from './theme/DefaultColors'
import { Typography, CssBaseline } from '@mui/material'
import Router from './routes/Router'
import { useSelector } from 'react-redux'


function App() {
  const { theme } = useSelector(state => state.theme)

  const currentTheme = theme === 'light' ? BluelighTheme : BlueDarkTheme

  return (
    <>


      <ThemeProvider theme={currentTheme}>
        <CssBaseline />


        <Router />
      </ThemeProvider>
    </>
  )
}

export default App
