import { Box, Modal, Typography } from '@mui/material'
import React from 'react'
import StyledButton from '../components/shared/StyledButton'
import { IconCheck } from '@tabler/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { errorActions } from '../app/slices/errorSlice'

const ErrorModal = () => {
    const { isError, error } = useSelector((state) => state.error);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(errorActions.setError({}))
    }

    return (
        <Modal open={isError}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                bgcolor: 'background.paper',
                borderRadius: '10px',
                boxShadow: 24,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                px: 2,
                py: 2,
                ':focus': {
                    outline: 'none',
                }
            }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Plus Jakarta Sans' }}>
                    {error?.title ? `Error, ${error?.title}` : 'Error'}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Plus Jakarta Sans', mt: 2 }}>
                    {error?.message}
                </Typography>
                <StyledButton
                    onClick={handleClose}
                    variant="contained"
                    sx={{ py: 2, px: .2 }}>
                    <IconCheck size={30} />
                </StyledButton>
            </Box>
        </Modal>
    )
}

export default ErrorModal