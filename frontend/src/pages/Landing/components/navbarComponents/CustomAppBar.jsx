import styled from '@emotion/styled';
import { AppBar } from '@mui/material';
import React from 'react'

const CustomAppBar = styled(AppBar)(({ theme }) => ({
    background: theme.palette.mode === 'dark' ? theme.palette.primary[900] : 'white', // You can customize the background color
    color: theme.palette.primary.main,
    boxShadow: 'none',
    position: 'fixed',
    marginBottom: '10rem',
    top: 0,
    left: 0,
    right: 0,
    // margin: '0 10px'
}));

export default CustomAppBar