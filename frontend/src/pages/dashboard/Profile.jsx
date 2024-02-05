import { Avatar, Box, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

// for project
import CustomField from 'src/components/form/CustomField'
import StyledButton from 'src/components/shared/StyledButton'
import app from 'src/firebase'
import { useUpdateMeMutation } from 'src/app/services/api'
import toast from 'react-hot-toast'
import { authActions } from 'src/app/slices/authSlice'
import Loader from 'src/views/utilities/Loader'


const validations = yup.object().shape({
    name: yup.string('Enter your name').required('Name is required'),
    email: yup.string('Enter your email').required('Email is required'),
    username: yup.string('Enter your username').required('Username is required'),
    profilePic: yup.string('Enter your profilePic').required('profilePic is required'),
})

const Profile = () => {
    const { authenticatedUser } = useSelector(state => state.auth);
    const { darkMode } = useSelector(state => state.theme);
    const imageUploadRef = React.useRef(null);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);

    const [updateMe, { isLoading }] = useUpdateMeMutation();
    const dispatch = useDispatch();

    const handleUpload = async (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            if (file.size >= 2 * 1024 * 1024) {
                formik.setFieldError('profilePic', "Images must be under 2MB");
            }
            else {
                setUploading(true);
                formik.setFieldError('profilePic', "");
                setSelectedImage(file);

                const storage = getStorage(app);
                const fileName = new Date().getTime() + file.name;
                const storageRef = ref(storage, `/users/${fileName}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on('state_changed', (snapshot) => {
                    const perc = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(perc);
                }, (error) => {
                    console.log(error);
                    formik.setFieldError('profilePic', "Images must be under 2MB");
                    setSelectedImage(null);
                    setUploading(false);
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        formik.setFieldValue('profilePic', downloadURL);
                        setUploading(false);
                    });
                });
            }

        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: validations,
        initialValues: {
            name: authenticatedUser?.name || '',
            email: authenticatedUser?.Email || '',
            username: authenticatedUser?.username || '',
            profilePic: authenticatedUser?.profilePic || '',
        },
        onSubmit: async (values) => {
            const param = authenticatedUser?.userId;
            await toast.promise(updateMe({ param, ...values }).unwrap().then(rs => {
                dispatch(authActions.updateUserData(rs));
                formik.resetForm();
            }), {
                loading: 'Updating...',
                success: <b>Updated Successfully</b>,
                error: <b>Could not update</b>
            })
        }
    })
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                mt: 5,
                py: 6,
                width: '100%',
                backgroundColor: darkMode ? 'primary.900' : 'white',
                borderRadius: '12px',
                gap: 1
            }}
        >
            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column', alignItems: 'center', mt: -10 }}>
                <input type="file" ref={imageUploadRef} hidden onChange={handleUpload} />
                <Avatar
                    src={formik.values.profilePic || authenticatedUser?.profilePic}
                    sx={{ width: 150, height: 150 }}
                />
                {uploading && <p className='text-green-500 font-bold'>Uploading.... {progress}%</p>}
                {formik.errors.profilePic && <p className='text-red-500 font-semibold'>{formik.errors.profilePic}</p>}
                {uploading && <Loader />}
                <StyledButton sx={{ display: uploading ? 'none' : '' }} variant="contained" onClick={() => imageUploadRef?.current?.click()} color="primary">Upload</StyledButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: "100%",
                    flexDirection: 'column',
                    px: 2,
                    gap: 1
                }}
            >
                <CustomField
                    label="Name"
                    id="name"
                    name="name"
                    error={formik.errors.name}
                    touched={formik.touched.name}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    input
                    type="text"
                />

                <CustomField
                    label="Username"
                    id="username"
                    name="username"
                    error={formik.errors.username}
                    touched={formik.touched.username}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    input
                    type="text"
                />
                <CustomField
                    label="Email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    error={formik.errors.email}
                    touched={formik.touched.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    input
                    type="email"
                    disabled
                />
            </Box>
            <StyledButton
                variant="contained"
                onClick={formik.handleSubmit}
            >
                Save
            </StyledButton>
        </Box>
    )
}

export default Profile