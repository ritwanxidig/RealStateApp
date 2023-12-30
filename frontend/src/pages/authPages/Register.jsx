import React from 'react'
import AuthPage from './AuthPage'
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material'
import CustomInput from '../../components/form/CustomInput'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <AuthPage title="Sign Up">
      <Box sx={{
        width: '100%',
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        fontFamily: 'Plus Jakarta Sans',
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: .4 }}>
          <label htmlFor="email" className='font-semibold' style={{fontSize: '14px'}}>Username</label>
          <CustomInput
            type="username"
            name="username"
            id="username"
            backgroundColor="white"
            color="black"
            placeholder="Enter your username"
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: .4 }}>
          <label htmlFor="email" className='font-semibold' style={{fontSize: '14px'}}>Email</label>
          <CustomInput
            type="email"
            name="email"
            id="email"
            backgroundColor="white"
            color="black"
            placeholder="Enter your email"
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: .4 }}>
          <label htmlFor="password" className='font-semibold' style={{fontSize: '14px'}}>Password</label>
          <CustomInput
            type="password"
            name="password"
            id="password"
            backgroundColor="white"
            color="black"
            placeholder="Enter your password"
          />
        </Box>
        <Button variant="contained" sx={{
          width: '100%', fontFamily: 'Plus Jakarta Sans', boxShadow: 'none', textTransform: 'none', fontSize: '16px',
          '&:hover': {
            boxShadow: 'none',
          }
        }}>Sign Up</Button>
        <Typography sx={{ textDecoration: 'none', fontFamily: 'Plus Jakarta Sans',display: 'flex' }}>
          <Typography sx={{fontFamily: 'Plus Jakarta Sans', fontWeight: '600', fontSize: '16px'}}>Already have an account?</Typography>
          <Link to="/auth/login" >
            <Typography sx={{ color: 'primary.main', fontFamily: 'Plus Jakarta Sans', fontWeight: '600', fontSize: '16px', ml: 1 }}>
              Login</Typography></Link>
        </Typography>
      </Box>
    </AuthPage >
  )
}

export default Register