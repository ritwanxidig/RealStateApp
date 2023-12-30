import { Box, Button } from '@mui/material'
import { IconBrandGoogle } from '@tabler/icons-react'
import React from 'react'
import GoogleLogo from '../../../assets/images/logos/GoogleLogo.jsx'

const GoogleOAuth = () => {
    return (
        <Box>
            <Button
                variant="outlined"
                sx={{
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
                }} >
                <GoogleLogo width="30px" height="30px" />  SignIn Google
            </Button>
        </Box>
    )
}

export default GoogleOAuth