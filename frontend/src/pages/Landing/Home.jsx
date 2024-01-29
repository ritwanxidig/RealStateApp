import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import NewListings from './components/NewListings'
import Services from './components/Services'
import NewsLetter from './components/NewsLetter'
import { Container, useMediaQuery } from '@mui/material'

const HomePage = () => {

  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const xsUp = useMediaQuery((theme) => theme.breakpoints.up('xs'));
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const xlUp = useMediaQuery((theme) => theme.breakpoints.up('xl'));
  return (
    <Container>
      <Hero />
      <Services />
      <NewListings />
      <NewsLetter />
    </Container>
  )
}

export default HomePage