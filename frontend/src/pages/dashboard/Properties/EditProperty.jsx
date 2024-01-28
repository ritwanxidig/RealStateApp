import { useFormik } from 'formik';
import React from 'react'
import { useNavigate, useParams } from 'react-router';
import { useGetCountriesQuery, useGetPropertyQuery, useUpdatePropertyMutation } from 'src/app/services/api';
import Loader from 'src/views/utilities/Loader';
import NewPropertyForm from './components/NewPropertyForm';
import PageContainer from 'src/Layout/Main/Containers/PageContainer';
import PageCard from 'src/Layout/Main/Containers/PageCard';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const EditProperty = () => {
    const { id: propertyId } = useParams();
    const { data, isFetching: isPropertyFetching } = useGetPropertyQuery(propertyId);
    const property = data?.row;
    const [updateProperty, { isLoading: updating }] = useUpdatePropertyMutation();
    const navigate = useNavigate();
    
    // countries data
    const { data: countries, isFetching: isCountriesFetching } = useGetCountriesQuery();
    const targetCountry = countries?.countries?.find(country => country._id === property?.address?.country);
    const targetCity = targetCountry?.cities?.find(city => city._id === property?.address?.city);
    const targetLocation = targetCity?.locations?.find(location => location._id === property?.address?.location);

    const { darkMode } = useSelector(state => state.theme);

    // destructuring area into width, height, unit
    const unit = property?.area?.split(' ')[1];
    const remain = property?.area?.split(' ')[0];
    const width = remain?.split('x')[0];
    const height = remain?.split('x')[1];

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: property?.name || '', Description: property?.description || '', Address: { country: property?.address?.country || '', city: property?.address?.city || '', location: property?.address?.location || '' },
            price: property?.price || 0, type: property?.type || 'rent', beds: property?.beds || 0, baths: property?.baths || 0, imageUrls: property?.imageUrls || [], furnished: property?.furnished || false,
            parking: property?.parking || false, status: property?.status || 'available',
            discount: property?.discount || 0, width: width || '', height: height || '', unit: unit || '',
        },
        onSubmit: async (values) => {
            const toSendData = {
                name: values.name,
                description: values.Description,
                address: {
                    country: values.Address.country,
                    city: values.Address.city,
                    location: values.Address.location
                },
                price: values.price,
                type: values.type,
                beds: values.beds,
                baths: values.baths,
                imageUrls: values.imageUrls,
                furnished: values.furnished,
                parking: values.parking,
                status: values.status,
                discount: values.discount,
                area: `${values.width}x${values.height} ${values.unit.trim()}`,
            }
            const param = propertyId;
            await toast.promise(updateProperty({ param, ...toSendData }).unwrap().then(rs => { console.log(rs) }), {
                loading: 'Updating property...',
                success: 'Property updated successfully',
                error: 'Error updating property',
            })
        }
    });

    return (
        <PageContainer title='Edit Property' description=''>
            <PageCard
                headtitle="Edit Property"
                headsubtitle="Edit property"
                subtitle="Edit property"
            >
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
                    <legend><Typography variant='h6' fontFamily="Plus Jakarta Sans" fontWeight="bold" sx={{ px: 1 }}>Edit Property</Typography> </legend>
                    {isPropertyFetching ? <Loader /> : <NewPropertyForm formik={formik} targetCountry={targetCountry} targetCity={targetCity} targetLocation={targetLocation} />}
                </Box>

            </PageCard>

        </PageContainer>
    )
}

export default EditProperty