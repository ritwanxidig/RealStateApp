import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, IconButton, Slide, Snackbar } from '@mui/material'
import { alertActions } from '../app/slices/alertSlice'
import { IconX } from '@tabler/icons-react'

const CustomAlert = () => {
    const { open, type, message } = useSelector(state => state.alert);
    const dispatch = useDispatch();
    function SlideTransition(props) {
        return <Slide {...props} direction="left" />;
    }

    const handleClose = () => {
        dispatch(alertActions.closeAlert({}))
    }

    const action = () => (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <IconX />
        </IconButton>
    )

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            autoHideDuration={7000}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
            children={
                <Alert variant='filled'
                    onClose={handleClose}
                    severity={type}
                    sx={{ width: '100%', borderRadius: '10px' }}
                    action={action()}>
                    {message}
                </Alert>
            }
        />
    )
}

export default CustomAlert