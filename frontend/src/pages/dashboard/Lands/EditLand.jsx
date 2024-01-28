import React from 'react'
import { useFormik } from 'formik'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-hot-toast'

// for project
import PageCard from 'src/Layout/Main/Containers/PageCard'
import PageContainer from 'src/Layout/Main/Containers/PageContainer'
import LandForm from './views/LandForm'
import { LandFormValidation } from 'src/validations/validations'
import { useGetCountriesQuery, useGetLandQuery, useUpdateLandMutation } from 'src/app/services/api'
import Loader from 'src/views/utilities/Loader'


const EditLand = () => {
    // important declarations
    const { id: landId } = useParams();
    const { darkMode } = useSelector(state => state.theme);
    const { data, isFetching } = useGetLandQuery(landId);
    const navigate = useNavigate();
    const land = data?.row

    // update land
    const [updateLand, { isLoading: updating }] = useUpdateLandMutation();


    // destructuring size into width, height, unit
    const unit = land?.size?.split(' ')[1].trim();
    const size = land?.size?.split(' ')[0].trim();

    // countries data
    const { data: countries, isFetching: isCountriesFetching } = useGetCountriesQuery();
    const targetCountry = countries?.countries?.find(country => country._id === land?.address?.country);
    const targetCity = targetCountry?.cities?.find(city => city._id === land?.address?.city);
    const targetLocation = targetCity?.locations?.find(location => location._id === land?.address?.location);

    // formik
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            width: size?.split('x')[0]?.trim() || 0, height: size?.split('x')[1]?.trim() || 0, unit: unit || '',
            images: land?.images || [],
            description: land?.description || '',
            address: {
                country: land?.address?.country || '', city: land?.address?.city || '', location: land?.address?.location || ''
            },
            price: land?.price || 0
        },
        validationSchema: LandFormValidation,
        onSubmit: (values) => {
            const param = landId
            const toSendData = {
                description: values.description,
                address: {
                    country: values.address.country,
                    city: values.address.city,
                    location: values.address.location
                },
                price: values.price,
                size: `${values.width}x${values.height} ${values.unit.trim()}`,
                images: values.images
            }
            updateLand({ param, ...toSendData }).then(() => {
                toast.success('Land updated successfully')
                navigate('/app/all-lands')
            })
        }
    })
    return (
        <PageContainer title='Edit Land'>
            <PageCard headtitle='Edit Land'>
                {isFetching || isCountriesFetching || updating ? <Loader /> : null}
                <Box
                    component="fieldset"
                    sx={{
                        border: `1px solid`,
                        borderColor: darkMode ? 'primary.800' : 'primary.200',
                        p: 2,
                        mx: 1,
                        borderRadius: '10px',
                        filter: isFetching || isCountriesFetching || updating ? 'blur(4px)' : 'none',
                    }}
                >
                    <legend><Typography variant='h6' fontFamily="Plus Jakarta Sans" fontWeight="bold" sx={{ px: 1 }}>Edit Land</Typography> </legend>

                    <LandForm formik={formik} targetCountry={targetCountry} targetCity={targetCity} targetLocation={targetLocation} />
                </Box>
            </PageCard>
        </PageContainer>
    )
}

export default EditLand