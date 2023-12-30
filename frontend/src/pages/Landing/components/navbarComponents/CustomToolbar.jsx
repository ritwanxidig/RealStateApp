import styled from '@emotion/styled';
import { Toolbar } from '@mui/material';
import React from 'react'

const CustomToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
});

export default CustomToolbar