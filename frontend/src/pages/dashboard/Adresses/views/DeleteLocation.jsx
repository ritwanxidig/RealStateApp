import { Box, Typography } from '@mui/material'
import React from 'react'
import toast from 'react-hot-toast';
import { useDeleteLocationMutation } from 'src/app/services/api';
import StyledButton from 'src/components/shared/StyledButton'
import CustomModal from 'src/views/utilities/CustomModal';

const DeleteLocation = ({ onOpen, setOnOpen, data, country, city }) => {
    const [deleteLocation, { isLoading }] = useDeleteLocationMutation();

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
    );

    const handleDelete = async () => {
        const param = `${country?._id}/${city?._id}/${data?._id}`
        await toast.promise(deleteLocation(param).unwrap().then(() => {
            setOnOpen(false);
            // setParentOpen(false);
        }), {
            loading: 'Deleting location...',
            success: 'Location deleted successfully',
            error: 'Failed to delete location'
        })
    }

    return (
        <CustomModal
            onOpen={onOpen}
            setOnOpen={setOnOpen}
            title="Delete Location"
            actions={actions()}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body1" fontWeight="400" fontFamily="Plus Jakarta Sans" fontSize="15px" >
                    Are you sure you want to delete <span style={{ fontWeight: 'bold' }}>{data?.name}</span> location?
                </Typography>

                <Typography variant="body1" fontWeight="400" fontFamily="Plus Jakarta Sans" fontSize="13px" color="grey.400" >
                    This action will delete this location permanently.
                </Typography>
            </Box>
        </CustomModal>
    )
}

export default DeleteLocation