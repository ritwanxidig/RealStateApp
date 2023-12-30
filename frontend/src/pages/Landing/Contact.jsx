import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import CustomInput from '../../components/form/CustomInput'
import CustomTextArea from '../../components/form/CustomTextArea'
import { useSelector } from 'react-redux'

const Contact = () => {
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const { darkMode } = useSelector((state) => state.theme);
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
                xs: '1fr',
                md: '1fr 1fr',
            },
            justifyContent: 'space-between',
            alignItems: 'start',
            gap: 12,
            my: 12,
            p: lgUp || mdUp ? 12 : 4,
        }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%'
                }}
            >
                <Typography variant='h3' fontWeight="bold" sx={{fontFamily: 'Plus Jakarta Sans'}} >Contact Us</Typography>
                <Box sx={{ width: '20%', height: '.4rem', backgroundColor: 'primary.main', marginBottom: '1rem', borderRadius: '10px' }}></Box>
                <Typography variant='body1' fontSize="14px" sx={{fontFamily: 'Plus Jakarta Sans'}} >
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Perferendis incidunt maiores laudantium, similique rerum, aut aliquam magni deserunt temporibus et eaque fuga
                    tenetur molestiae cupiditate assumenda debitis libero? Consequuntur rerum maxime delectus soluta laboriosam? Veniam
                    fugiat quam at eius illum, recusandae nam non ipsa ipsum cupiditate accusantium impedit laboriosam possimus, consequatur .
                    inventore corrupti similique distinctio vel commodi, incidunt sapiente sed. Officiis, tenetur? Voluptates repellat alias error
                    inventore voluptatem nam provident omnis facere reprehenderit? Non porro, cum vitae similique impedit aliquid ullam ex ab eius
                    neque nemo, labore architecto optio ad fuga! Consequatur veniam quo suscipit debitis aliquam laborum,
                    sunt repellendus!
                </Typography>
            </Box>

            {/* for form */}
            <Box
                sx={{
                    backgroundColor: darkMode ? 'primary.900' : 'primary.100',
                    borderRadius: '10px',
                    p: 4,
                    width: '100%'
                }}
            >
                <Typography variant='h5' fontWeight="bold">Contact</Typography>
                <Typography variant='body1' fontSize="14px">Left us message</Typography>
                <form>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <Box>
                            <label htmlFor="name" className='font-semibold'>Name</label>
                            <CustomInput type="text" name="name" id="name" placeholder='Enter your name' />
                        </Box>
                        <Box>
                            <label htmlFor="email" className='font-semibold'>Email</label>
                            <CustomInput type="email" name="email" id="email" placeholder='Enter your email' />
                        </Box>
                        <Box>
                            <label htmlFor="message" className='font-semibold'>Message</label>
                            <CustomTextArea name="message" id="message" cols="30" rows="10" placeholder='Enter your message' />
                        </Box>
                        <Button variant="contained" sx={{
                            py: 1.5,
                            backgroundColor: 'primary.main',
                            color: 'white',
                            fontFamily: 'Plus Jakarta Sans',
                            textTransform: 'none',
                            boxShadow: 'none',
                            '&:hover': {
                                boxShadow: 'none',
                                backgroundColor: 'primary.dark',
                            },
                        }} type='submit'>Submit</Button>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default Contact