import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'

// for project
import PageCard from 'src/Layout/Main/Containers/PageCard'
import PageContainer from 'src/Layout/Main/Containers/PageContainer'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import CustomField from 'src/components/form/CustomField'
import StyledButton from 'src/components/shared/StyledButton'
import NewPropertyForm from './components/NewPropertyForm'
import { useAddPropertyMutation } from 'src/app/services/api'
import Loader from 'src/views/utilities/Loader'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'


const validationSchema = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
  Address: yup.object().shape({
    country: yup.string('Enter the country').required('Country is required'),
    city: yup.string('Enter the city').required('City is required'),
    location: yup.string('Enter the location').required('Location is required'),
  }),
  price: yup.number().required('Price is required').min(1, 'Price must be greater than 0'),
  type: yup.string().required('Type is required'),
  beds: yup.number().required('Beds is required').min(1, 'Beds must be greater than 0'),
  baths: yup.number().required('Baths is required').min(1, 'Baths must be greater than 0'),
  imageUrls: yup.array(),
  furnished: yup.boolean().required('Furnished is required'),
  parking: yup.boolean().required('Parking is required'),
  offer: yup.boolean(),
  status: yup.string(),
  rent: yup.boolean(),
  sale: yup.boolean(),
  discount: yup.number(),
  width: yup.number().required('Width is required'),
  height: yup.number().required('Height is required'),
  unit: yup.string().required('Unit is required'),
})


const CreateProperty = () => {
  const { darkMode } = useSelector(state => state.theme);
  const [addProperty, { isLoading }] = useAddPropertyMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '', Description: '', Address: { country: '', city: '', location: '' },
      price: 0, type: 'rent', beds: 0, baths: 0, imageUrls: [], furnished: false,
      parking: false, status: 'available', rent: false,
      sale: false, discount: 0, width: '', height: '', unit: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const toSendData = {
        name: values.name,
        description: values.Description,
        address: {
          country: values.Address.country,
          city: values.Address.city,
          location: values.Address.location
        },
        price: values.price,
        discount: values.discount,
        imageUrls: values.imageUrls,
        type: values.type,
        beds: values.beds,
        baths: values.baths,
        furnished: values.furnished,
        parking: values.parking,
        area: `${values.width}x${values.height} ${values.unit.trim()}`,
      };
      console.log(toSendData);
      await toast.promise(addProperty(toSendData).unwrap().then(rs => { resetForm(); }), {
        loading: 'Adding property...',
        success: 'Property added successfully',
        error: 'Error adding new property',
      });
    }
  })

  const { values, touched, errors, handleSubmit, handleChange, handleBlur, } = formik;

  return (

    <PageContainer title='New Property' description=''>
      <PageCard
        headtitle="Create Property"
        headsubtitle="Create new property"
        subtitle="Create new property"
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
          <legend><Typography variant='h6' fontFamily="Plus Jakarta Sans" fontWeight="bold" sx={{ px: 1 }}>Create Property</Typography> </legend>
          {isLoading ? <Loader /> : <NewPropertyForm formik={formik} />}
        </Box>
      </PageCard>
    </PageContainer>
  )
}

export default CreateProperty