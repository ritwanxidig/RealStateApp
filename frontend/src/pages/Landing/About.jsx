import React from 'react'
import Navbar from './components/Navbar'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { AboutPageImage } from 'src/assets'
import { IconBallpen, IconTarget } from '@tabler/icons-react'

const About = () => {
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'))
    const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'))
    return (
        <Box
            sx={{
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
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'start',
                    width: '100%',
                    gap: 2,
                }}
            >
                <Typography variant='h3' fontWeight="bold" fontFamily="Plus Jakarta Sans">About Us</Typography>
                <Box sx={{ width: '20%', height: '.4rem', backgroundColor: 'primary.main', marginBottom: '1rem', borderRadius: '10px' }}></Box>
                <Typography variant='body1' fontSize="14px" fontFamily="Plus Jakarta Sans">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis incidunt maiores laudantium, similique rerum, aut aliquam magni deserunt temporibus et eaque fuga
                    tenetur molestiae cupiditate assumenda debitis libero? Consequuntur rerum maxime delectus soluta laboriosam? Veniam
                    fugiat quam at eius illum, recusandae nam non ipsa ipsum cupiditate accusantium impedit laboriosam possimus, consequatur .
                    inventore corrupti similique distinctio vel commodi, incidunt sapiente sed. Officiis, tenetur? Voluptates repellat alias error
                    inventore voluptatem nam provident omnis facere reprehenderit? Non porro, cum vitae similique impedit aliquid ullam ex ab eius
                    neque nemo, labore architecto optio ad fuga! Consequatur veniam quo suscipit debitis aliquam laborum,
                    sunt repellendus!
                </Typography>

                <Typography variant='h5' fontWeight="bold" fontFamily="Plus Jakarta Sans" sx={{ display: 'flex', alignItems: 'center', gap: 1 }} >
                    <IconTarget />
                    Mission
                </Typography>
                <Typography variant='body1' fontSize="14px" fontFamily="Plus Jakarta Sans">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis incidunt maiores laudantium, similique rerum, aut aliquam magni deserunt temporibus et eaque fuga
                    tenetur molestiae cupiditate assumenda debitis libero? Consequuntur rerum maxime delectus soluta laboriosam? Veniam
                    fugiat quam at eius illum, recusandae nam non ipsa ipsum cupiditate accusantium impedit laboriosam possimus, consequatur .
                    inventore corrupti similique distinctio vel commodi, incidunt sapiente sed. Officiis, tenetur? Voluptates repellat alias error
                    inventore voluptatem nam provident omnis facere reprehenderit? Non porro, cum vitae similique impedit aliquid ullam ex ab eius
                    neque nemo, labore architecto optio ad fuga! Consequatur veniam quo suscipit debitis aliquam laborum,
                    sunt repellendus!
                </Typography>


                <Typography variant='h5' fontWeight="bold" fontFamily="Plus Jakarta Sans" sx={{ display: 'flex', alignItems: 'center', gap: 1 }} >
                    <IconBallpen />
                    Vision
                </Typography>
                <Typography variant='body1' fontSize="14px" fontFamily="Plus Jakarta Sans">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis incidunt maiores laudantium, similique rerum, aut aliquam magni deserunt temporibus et eaque fuga
                    tenetur molestiae cupiditate assumenda debitis libero? Consequuntur rerum maxime delectus soluta laboriosam? Veniam
                    fugiat quam at eius illum, recusandae nam non ipsa ipsum cupiditate accusantium impedit laboriosam possimus, consequatur .
                    inventore corrupti similique distinctio vel commodi, incidunt sapiente sed. Officiis, tenetur? Voluptates repellat alias error
                    inventore voluptatem nam provident omnis facere reprehenderit? Non porro, cum vitae similique impedit aliquid ullam ex ab eius
                    neque nemo, labore architecto optio ad fuga! Consequatur veniam quo suscipit debitis aliqu
                </Typography>

            </Box>


            {/* unique shape image */}
            <Box
                sx={{
                    width: '500px',
                    height: '500px',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        background: `url(${AboutPageImage}) center/cover no-repeat`,
                        backgroundSize: '100% 100%',
                        borderRadius: '0 50% 0 50%',
                    },
                }}
            ></Box>
        </Box>
    )
}

export default About