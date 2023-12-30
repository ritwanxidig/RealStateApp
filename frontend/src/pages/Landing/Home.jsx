import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import NewListings from './components/NewListings'
import Services from './components/Services'
import NewsLetter from './components/NewsLetter'

const HomePage = () => {
  return (
    <div className='container mx-auto'>
      <Hero />
      <Services />
      <NewListings />
      <NewsLetter />
    </div>
  )
}

export default HomePage