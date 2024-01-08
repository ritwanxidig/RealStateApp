import { Box, IconButton, Stack } from '@mui/material';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';

const ImageSlider = ({ imageUrls }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isAutoSliding, setIsAutoSliding] = useState(true);

    const perImages = 1;
    const slideInterval = 5000; // Set the interval in milliseconds

    const handleNextPage = () => {
        setCurrentImage((prev) => Math.min(prev + 1, imageUrls.length - 1));
    };

    const handlePrevPage = () => {
        setCurrentImage((prev) => Math.max(prev - 1, 0));
    };

    const startAutoSlide = () => {
        setIsAutoSliding(true);
    };

    const stopAutoSlide = () => {
        setIsAutoSliding(false);
    };

    useEffect(() => {
        // Preload images for smoother transitions
        imageUrls.forEach((img) => {
            const image = new Image();
            image.src = img;
        });

        // Start automatic sliding
        const intervalId = setInterval(() => {
            if (isAutoSliding) {
                setCurrentImage((prev) => (prev + 1) % imageUrls.length);
            }
        }, slideInterval);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [imageUrls, isAutoSliding]);

    return (
        <Box
            sx={{
                mt: -10,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            onMouseEnter={stopAutoSlide}
            onMouseLeave={startAutoSlide}
        >
            <Box sx={{ width: '100%', height: '20rem', overflow: 'hidden' }}>
                {imageUrls?.map((img, index) => (
                    <Box
                        key={`Card-${index}`}
                        sx={{
                            width: '100%',
                            height: '20rem',
                            display: currentImage === index ? 'block' : 'none',
                        }}
                    >
                        <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`image ${index}`} />
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            paddingX="1.5rem"
                            position="absolute"
                            width="100%"
                            top="50%"
                            transform="translateY(-50%)"
                        >
                            <IconButton onClick={handlePrevPage} disabled={currentImage === 0} sx={{ backgroundColor: 'primary.light', color: 'white' }}>
                                <IconChevronLeft />
                            </IconButton>
                            <IconButton onClick={handleNextPage} disabled={currentImage === imageUrls.length - 1} sx={{ backgroundColor: 'primary.light', color: 'white' }}>
                                <IconChevronRight />
                            </IconButton>
                        </Stack>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ImageSlider;
