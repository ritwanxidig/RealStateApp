import { Box, Button, Dialog, IconButton, Modal, Typography, useMediaQuery } from '@mui/material'
import { IconX } from '@tabler/icons-react'
import React from 'react'
import StyledButton from '../../components/shared/StyledButton'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'

const CustomModal = (props) => {
  const { darkMode } = useSelector(state => state.theme);
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const xsUp = useMediaQuery((theme) => theme.breakpoints.up('xs'));

  const modalContentStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: smUp || xsUp ? 400 : props.width || 500,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    px: 2,
    py: 2,
    ':focus': {
      outline: 'none',
    }
  }

  const handleClose = () => {
    props.setOnOpen(false)
  }
  return (
    <Modal
      open={props.onOpen}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalContentStyle}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography fontFamily="Plus Jakarta Sans" fontWeight={"700"} id="modal-modal-title" variant="h6" component="h2">
            {props.title || "Title of the Modal"}
          </Typography>
          <IconButton onClick={handleClose}>
            <IconX size={20} color={darkMode ? '#fff' : '#000'} />
          </IconButton>
        </Box>
        <Box>
          {props.children}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            mt: 2,
            gap: 1,
            fontFamily: 'Plus Jakarta Sans',
          }}
        >
          {props.actions || (
            <>
              <StyledButton variant="outlined" color="red" onClick={handleClose}>Cancel</StyledButton>
              <StyledButton variant="contained" onClick={handleClose}>Save</StyledButton>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  )
}

export default CustomModal