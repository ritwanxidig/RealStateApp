import { Box, Typography } from '@mui/material'
import React from 'react'
import toast from 'react-hot-toast'
import { useDeleteCountryMutation } from 'src/app/services/api'
import StyledButton from 'src/components/shared/StyledButton'
import CustomModal from 'src/views/utilities/CustomModal'

const DeleteCountry = ({ onOpen, setOnOpen, data, setParentOpen }) => {
    const [deleteCountry, { isLoading }] = useDeleteCountryMutation()


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

    const handleDelete = async () => {
        await toast.promise(deleteCountry(data?._id).unwrap().then(() => {
            setOnOpen(false);
            // setParentOpen(false);
        }), {
            loading: 'Deleting country...',
            success: 'Country deleted successfully',
            error: 'Error deleting country',
        });
    }

    return (
        <CustomModal
            title="Delete Country"
            onOpen={onOpen}
            setOnOpen={setOnOpen}
            actions={actions()}
        >
            <Typography variant="body2" fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="15px">
                Are you sure you want to delete <span className='font-bold capitalize'>{data?.name}</span> country?
            </Typography>
            <Typography variant="body2" fontFamily={"Plus Jakarta Sans"} fontWeight="400" fontSize="13px" color="grey.400">
                This action will remove all the cities and their locations associated with this country. and it is irreversible
            </Typography>
        </CustomModal>
    )
}

export default DeleteCountry