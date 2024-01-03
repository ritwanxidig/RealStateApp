import { Box, Typography } from '@mui/material'
import React from 'react'
import toast from 'react-hot-toast'
import { useDeleteCityMutation } from 'src/app/services/api'
import StyledButton from 'src/components/shared/StyledButton'
import CustomModal from 'src/views/utilities/CustomModal'

const DeleteCity = ({ onOpen, setOnOpen, data, country }) => {
    const [deleteCity, { isLoading }] = useDeleteCityMutation();
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

    const handleDelete = async () => {
        const param = `${country?._id}/${data?._id}`
        await toast.promise(deleteCity(param).unwrap().then(() => {
            setOnOpen(false);
            // setParentOpen(false);
        }), {
            loading: 'Deleting city...',
            success: 'City deleted successfully',
            error: 'Error deleting city',
        });
    }


    return (
        <CustomModal
            title="Delete City"
            onOpen={onOpen}
            setOnOpen={setOnOpen}
            actions={actions()}
        >
            <Typography variant="body1">Are you sure you want to delete this city?</Typography>
            <Typography variant="body1" fontFamily="Plus Jakarta Sans" fontSize="13px" mt={1} color="grey.400">
                This action will be permanently deleted the <span className='capitalize font-bold'>{data?.name}</span> city
            </Typography>
        </CustomModal>
    )
}

export default DeleteCity