import { Button } from '@mui/material'
import { IconLogin2 } from '@tabler/icons-react'
import React from 'react'
import { Link } from 'react-router-dom'

const NavbarLoginBtn = () => {
    return (
        <Button variant="contained"
            LinkComponent={Link}
            to="/auth/login"
            sx={{
                borderRadius: '50px',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: 'none',
                textTransform: 'none',
                color: 'white',
                backgroundColor: 'primary.main',
                fontFamily: 'Plus Jakarta Sans',
                '&:hover': {
                    boxShadow: 'none',
                    backgroundColor: 'primary.dark',
                },
            }}>
            Login
            <IconLogin2 />
        </Button>
    )
}

export default NavbarLoginBtn