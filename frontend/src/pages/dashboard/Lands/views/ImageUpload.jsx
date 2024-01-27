import { Box, IconButton, Typography } from '@mui/material'
import { IconTrash } from '@tabler/icons-react'
import React from 'react'
import StyledButton from 'src/components/shared/StyledButton'

const ImageUpload = ({ formik }) => {
    const imageUpload = React.useRef(null)
    const { values, touched, errors, handleSubmit, handleChange, handleBlur } = formik
    return (
        <Box>
            <Box sx={{
                display: 'flex', flexDirection: 'column', gap: 1, justifyContent: 'center',
                alignItems: 'center', width: '100%', py: 2,
                border: '1px dashed', borderColor: 'primary.main',
                my: 2,
                borderRadius: '20px'
            }}>
                <Typography variant='' fontFamily="Plus Jakarta Sans" fontWeight="bold" sx={{ fontSize: '16px', }}>Upload Image</Typography>
                <input type="file" accept='image/*' ref={imageUpload} style={{ display: 'none' }} />
                <StyledButton variant="contained" color="primary" type="button" onClick={() => imageUpload.current.click()}>Upload</StyledButton>
            </Box>
            <Box >
                <Box sx={{ width: '12rem', height: '12rem', objectFit: 'cover', border: '2px solid', borderColor: 'primary.light', borderRadius: '20px' }}>
                    <IconButton sx={{ position: 'absolute', zIndex: 100000, transform: 'translate(180%, 190%)', backgroundColor: 'error.main', color: 'white', ":hover": { backgroundColor: 'error.dark' } }}><IconTrash /></IconButton>
                    <img src="https://via.placeholder.com/300" className='brightness-90' alt="image" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
                </Box>
            </Box>
        </Box>
    )
}

export default ImageUpload