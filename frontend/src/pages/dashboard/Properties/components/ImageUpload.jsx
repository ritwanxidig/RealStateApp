import { Box, IconButton, ImageList, ImageListItem, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import StyledButton from 'src/components/shared/StyledButton';
import app from 'src/firebase';
import Loader from 'src/views/utilities/Loader';
import { IconTrash } from '@tabler/icons-react';

const ImageUpload = ({ formik }) => {
    const [selectedImages, setSelectedImages] = React.useState(null);
    const imageUploadRef = React.useRef(null);
    const [uploading, setUploading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const xsUp = useMediaQuery((theme) => theme.breakpoints.up('xs'));

    const handleImageUpload = (e) => {
        setSelectedImages(e.target.files);
        formik.setFieldError('imageUrls', "");
        if (e.target.files.length > 6 || e.target.files.length + formik?.values?.imageUrls?.length > 7) {
            formik.setFieldError('imageUrls', 'Cannot upload more than 6 images');

        } else {
            setUploading(true);
            const promises = [];
            for (const file of e.target.files) {
                promises.push(storeImage(file));
            }

            Promise.all(promises)
                .then((urls) => {
                    formik.setFieldValue('imageUrls', formik.values.imageUrls.concat(urls));
                    setSelectedImages(null);
                    setUploading(false);
                }).catch(er => {
                    console.log("firebase image upload error: ", er);
                    formik.setFieldError('imageUrls', "Images must be under 3MB");
                    setSelectedImages(null);
                    setUploading(false);
                })
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', (snapshot) => {
                const perc = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(perc);
            },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((donwloadURL) => {
                            resolve(donwloadURL);
                        })
                }
            )
        })
    }

    return (
        <Box >
            <Box sx={{ display: 'flex', my: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, p: 4, borderRadius: 2, border: '1px dashed #e0e0e0' }}>
                {uploading ? <Loader /> : <>
                    <Typography variant='body2' fontFamily="Plus Jakarta Sans" fontWeight="bold" sx={{ px: 1, mb: -1 }}>Upload Images:</Typography>
                    <Typography variant='body2' fontSize="14px" fontFamily="Plus Jakarta Sans" sx={{ px: 1 }}>Upload at least 1 image and maximum of 6</Typography>
                    <input
                        ref={imageUploadRef}
                        type="file"
                        hidden
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                    // onChange={handleImageUpload}
                    />
                    <StyledButton
                        variant="contained"
                        onClick={() => imageUploadRef.current.click()}
                    >
                        Upload
                        {/* <Upload /> */}
                    </StyledButton>
                </>}

            </Box>
            <div className='text-red-500 -mt-4 text-sm'>{formik.errors.imageUrls}</div>
            {uploading && <Typography variant='body2' fontFamily="Plus Jakarta Sans" fontWeight="bold" sx={{ px: 1 }}>Uploading {progress}%</Typography>}
            <Box sx={{ py: 2 }}>
                <ImageList
                    sx={{}}
                    cols={lgUp ? 6 : mdUp ? 4 : smUp ? 3 : xsUp ? 2 : 1}
                    rowHeight={164}
                >
                    {formik?.values?.imageUrls?.length > 0 ?
                        formik.values.imageUrls && formik.values.imageUrls.map((image) => (
                            <ImageListItem
                                key={image}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 1
                                }}
                            >
                                <img
                                    src={image}
                                    alt={image}
                                    style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '10px' }}
                                    loading="lazy"
                                />
                                <IconButton
                                    onClick={() => formik.setFieldValue('imageUrls', formik.values.imageUrls.filter(img => img !== image))}
                                    sx={{ position: 'absolute', top: 5, right: 5, backgroundColor: 'error.main', color: 'white', ":hover": { backgroundColor: 'error.dark' } }} ><IconTrash size={20} /></IconButton>
                            </ImageListItem>
                        )) : <p>No images data</p>
                    }
                </ImageList>
            </Box>
        </Box>
    )
}

export default ImageUpload