import { Box, Button } from '@mui/material'
import React from 'react'
import AppleLogo from '../../../assets/images/logos/AppleLogo.jsx'

const AppleOAuth = () => {
    return (
        <Box>
            <Button variant="outlined" sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4px',
                color: 'grey.600',
                borderColor: 'grey.600',
                fontSize: '14px',
                fontFamily: 'Plus Jakarta Sans',
                textTransform: 'none',
                '&:hover': {
                    borderColor: 'grey.600',
                    color: 'grey.600',
                }
            }}>
                <AppleLogo width="30px" height="30px" />  SignIn with Apple
            </Button>
        </Box>
    )
}

export default AppleOAuth