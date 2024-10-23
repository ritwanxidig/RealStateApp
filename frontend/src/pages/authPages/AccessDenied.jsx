import { Box, Container, Typography } from '@mui/material'
import ErrorImg from '../../assets/images/backgrounds/403 Error Forbidden-rafiki.svg';

import React from 'react'
import StyledButton from '../../components/shared/StyledButton';
import { Link } from 'react-router-dom';

const AccessDenied = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        <img src={ErrorImg} alt="403" style={{ width: '100%', maxWidth: '500px' }} />
        <Typography variant="h3" sx={{ fontWeight: 'bold', fontFamily: 'Plus Jakarta Sans' }}>
          Oops!
        </Typography>
        <Typography variant="h6" sx={{ fontFamily: 'Plus Jakarta Sans' }}>
          You don't have the permission to access this page
        </Typography>
        <StyledButton
          color="primary"
          variant="contained"
          component={Link}
          to='/'
          disableElevation
        >
          Go Back
        </StyledButton>
      </Container>
    </Box>
  )
}

export default AccessDenied
