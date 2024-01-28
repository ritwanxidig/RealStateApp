import { useTheme } from '@emotion/react'
import { Box, IconButton, LinearProgress, Typography } from '@mui/material'
import { IconTrash } from '@tabler/icons-react'
import React from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable, } from 'firebase/storage'

// for project
import StyledButton from 'src/components/shared/StyledButton'
import app from 'src/firebase'

const ImageHolder = ({ image, formik }) => {
    const theme = useTheme();
    return (
        <Box sx={{ width: '12rem', height: '12rem', objectFit: 'cover', borderRadius: '20px' }}>
            <IconButton
                onClick={() => formik.setFieldValue('images', formik?.values?.images?.filter(i => i !== image))}
                sx={{
                    position: 'absolute', zIndex: 1000,
                    transform: 'translate(230%, 240%)', backgroundColor: 'error.main', color: 'white',
                    ":hover": { backgroundColor: 'error.dark' }
                }}>
                <IconTrash size={18} /></IconButton>
            <img src={image || "https://via.placeholder.com/300"} className='brightness-90'
                alt="image"
                style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    borderRadius: '20px', border: '3px solid',
                    filter: 'brightness(0.5)',
                    borderColor: theme.palette.primary.main
                }} />
        </Box>
    )
}

const ImageUpload = ({ formik }) => {
    const imageUpload = React.useRef(null);
    const [uploading, setUploading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const { values, touched, errors, handleSubmit, handleChange, handleBlur, setFieldError } = formik;

    const uploadTask = (image) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const storageRef = ref(storage, image.name);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on('state_changed', (snapshot) => {
                const perc = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(perc);
            },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                });
        })

    }

    const handleUploadImage = (e) => {
        const selectedImgs = e.target.files;
        if (selectedImgs.length + values.images.length <= 2) {
            setUploading(true);
            setFieldError("images", "")
            const promises = [];
            for (const file of selectedImgs) {
                promises.push(uploadTask(file));
            }

            Promise.all(promises)
                .then((urls) => {
                    formik.setFieldValue('images', formik.values.images.concat(urls));
                    setUploading(false);
                }).catch(er => {
                    formik.setFieldError('images', "Images must be under  = 3 MB");
                    console.log("firebase image upload error: ", er);
                    setUploading(false);
                });
        }
        else {
            setFieldError('images', "you can only upload maximum 2 images");
        }
    }

    return (
        <Box>
            <Box sx={{
                display: 'flex', flexDirection: 'column', gap: 1, justifyContent: 'center',
                alignItems: 'center', width: '100%', py: 2,
                border: '1px dashed', borderColor: 'primary.main',
                my: 2,
                borderRadius: '20px',
                cursor: uploading ? 'not-allowed' : '',
                filter: uploading ? 'blur(2px)' : 'none',
            }}>
                <Typography variant='h6' fontFamily="Plus Jakarta Sans" fontWeight="500" sx={{}}>Upload Images</Typography>
                <Typography
                    sx={{
                        fontFamily: 'Plus Jakarta Sans', mt: -.9, fontSize: '14px',
                        textAlign: 'center', fontWeight: '500', lineHeight: '1.5'
                    }}>
                    Upload at least <strong>1 image</strong>  under or equal <strong> 2MB </strong>, and Maximum of <strong>2 images</strong> under or equal <strong> 2MB </strong>
                </Typography>
                <input type="file" accept='image/*' multiple ref={imageUpload} onChange={handleUploadImage} style={{ display: 'none' }} />
                <StyledButton disabled={uploading} variant="contained" color="primary" type="button" onClick={() => imageUpload.current.click()}>Upload</StyledButton>
            </Box>
            {uploading && <LinearProgress variant="determinate" value={progress} />}
            {uploading && <p className='text-right text-sm'> <strong>{progress} %</strong> done. </p>}
            {errors.images && <Typography sx={{ fontSize: '14px', color: 'error.main', mt: -1, mb: 2, textTransform: 'capitalize', fontWeight: '500', px: 2 }}>{errors.images}</Typography>}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns:
                {
                    lg: 'repeat(4,1fr)',
                    md: 'repeat(4,1fr)',
                    sm: 'repeat(2,1fr)',
                    xs: 'repeat(1,1fr)'
                },
                gap: 2,
                justifyContent: 'center', alignItems: 'center', justifyItems: 'center'
            }} >
                {values.images?.map((image, index) => (
                    <ImageHolder key={index} image={image} formik={formik} />
                ))}
            </Box>
        </Box>
    )
}

export default ImageUpload