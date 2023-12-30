import { Button } from '@mui/material'
import React from 'react'

const StyledButton = (props) => {
    return (
        <Button style={{
            textTransform: 'none',
            boxShadow: 'none',
            fontFamily: 'Plus Jakarta Sans',
            
            '&:hover': {
                boxShadow: 'none',
            },


        }} {...props}
        >
            {props.children}
        </Button >
    )
}

export default StyledButton