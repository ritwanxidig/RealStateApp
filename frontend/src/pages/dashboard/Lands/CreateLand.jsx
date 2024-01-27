import { Box, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'
import PageCard from 'src/Layout/Main/Containers/PageCard'
import PageContainer from 'src/Layout/Main/Containers/PageContainer'
import CustomField from 'src/components/form/CustomField'
import * as yup from 'yup'
import LandForm from './views/LandForm'
import { useAddLandMutation } from 'src/app/services/api'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router'

const validations = yup.object().shape({
    width: yup.number().required('Width is required').min(1, 'Width must be greater than 0'),
    height: yup.number().required('Height is required').min(1, 'Height must be greater than 0'),
    unit: yup.string().required('Unit is required'),
    images: yup.array().min(1, 'At least one image is required'),
    description: yup.string(),
    address: yup.object().shape({
        country: yup.string('Enter the country').required('Country is required'),
        city: yup.string('Enter the city').required('City is required'),
        location: yup.string('Enter the location').required('Location is required'),
    }),
    price: yup.number().required('Price is required').min(1, 'Price must be greater than 0'),
})

const CreateLand = () => {
    const { darkMode } = useSelector(state => state.theme);
    const [createLand, { isLoading }] = useAddLandMutation();
    const navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            width: 0, height: 0, unit: '',
            images: [],
            description: '',
            address: {
                country: '', city: '', location: ''
            },
            price: 0
        },
        validationSchema: validations,
        onSubmit: async (values, { resetForm }) => {
            const toSendData = {
                size: `${values.width}x${values.height} ${values.unit.trim()}`,
                description: values.description,
                images: values.images,
                address: {
                    country: values.address.country,
                    city: values.address.city,
                    location: values.address.location
                },
                price: values.price
            }

            try {
                await toast.promise(createLand(toSendData).unwrap().then(rs => { navigate('/app/all-lands'); resetForm(); }), {
                    loading: 'Creating Land...',
                    success: 'Land created successfully',
                    error: 'Failed to create Land'
                });
            } catch (error) {
                console.log(error);
            }
        }
    });



    return (
        <PageContainer title='Create Land' description=''>
            <PageCard headtitle="Create Land" headsubtitle="Create New Land">
                <Box
                    component="fieldset"
                    sx={{
                        border: `1px solid`,
                        borderColor: darkMode ? 'primary.800' : 'primary.200',
                        p: 2,
                        mx: 1,
                        borderRadius: '10px',
                    }}
                >
                    <legend><Typography variant='h6' fontFamily="Plus Jakarta Sans" fontWeight="bold" sx={{ px: 1 }}>Create Land</Typography> </legend>
                    <LandForm formik={formik} />
                </Box>
            </PageCard>
        </PageContainer>
    )
}

export default CreateLand