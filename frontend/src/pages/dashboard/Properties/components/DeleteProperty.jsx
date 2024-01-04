import { Box, Typography } from '@mui/material'
import React from 'react'
import toast from 'react-hot-toast';
import { useDeletePropertyMutation } from 'src/app/services/api';
import StyledButton from 'src/components/shared/StyledButton';
import CustomModal from 'src/views/utilities/CustomModal'

const DeleteProperty = ({ onOpen, setOnOpen, data }) => {
    const [deleteProperty, { isLoading }] = useDeletePropertyMutation();
    console.log(data);

    const handleDelete = async () => {
        await toast.promise(deleteProperty(data?._id).unwrap().then(() => {
            setOnOpen(false);
        }), {
            loading: 'Deleting property...',
            success: 'Property deleted successfully',
            error: 'Error deleting property'
        })
    }

    const actions = () => (
        <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}>
            <StyledButton
                variant="contained"
                color="error"
                onClick={() => setOnOpen(false)}
            >
                Cancel
            </StyledButton>
            <StyledButton
                variant="contained"
                color="success"
                onClick={() => handleDelete()}
                disabled={isLoading}
            >
                Delete
            </StyledButton>
        </Box>
    )
    return (
        <CustomModal
            onOpen={onOpen}
            setOnOpen={setOnOpen}
            title="Delete Property"
            actions={actions()}
        >
            <Typography variant="body1" fontSize="14px" fontFamily="Plus Jakarta Sans">
                Are you sure you want to delete this property?
                <br />
                This action cannot be undone.
            </Typography>
        </CustomModal>
    )
}

export default DeleteProperty