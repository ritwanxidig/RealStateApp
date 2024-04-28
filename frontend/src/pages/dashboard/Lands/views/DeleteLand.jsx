import { Box, Typography } from '@mui/material'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useDeleteLandMutation } from 'src/app/services/api'
import StyledButton from 'src/components/shared/StyledButton'
import CustomModal from 'src/views/utilities/CustomModal'

const DeleteLand = ({ onOpen, setOnOpen, data }) => {
    const [deleteLand, { isLoading }] = useDeleteLandMutation()

    const handleDelete = async () => {
        await toast.promise(deleteLand(data?._id).unwrap().then(() => {
            setOnOpen(false);
        }), {
            loading: 'Deleting land...',
            success: 'Land deleted successfully',
            error: 'Error deleting land',
        });
    }

    const actions = () => (
        <Box sx={{ display: "flex", justifyContent: "end", gap: 1 }}>
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
            title="Delete Land"
            onOpen={onOpen}
            setOnOpen={setOnOpen}
            actions={actions()}
        >
            <Typography variant="body2" fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="15px">
                Are you sure you want to delete <span className='font-bold capitalize'>{data?.name}</span> land?
            </Typography>
            <Typography variant="body2" fontFamily={"Plus Jakarta Sans"} fontWeight="400" fontSize="13px" color="grey.400">
                This action will remove the selected land. and it is irreversible
            </Typography>
        </CustomModal>
    )
}

export default DeleteLand