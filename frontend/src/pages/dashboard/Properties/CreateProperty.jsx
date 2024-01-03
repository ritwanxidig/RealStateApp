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
  const { darkMode } = useSelector(state => state.theme)

  const formik = useFormik({
    initialValues: {
      name: '', Description: '', Address: { country: '', city: '', location: '' },
      price: 0, type: 'rent', beds: 0, baths: 0, imageUrls: [], furnished: false,
      parking: false, status: 'available', rent: false,
      sale: false, discount: 0, width: '', height: '', unit: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
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
          <Box>

            <CustomField
              name="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
              touched={touched.name}
              onBlur={handleBlur}
              input
              optional
            />

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography variant='body2' fontFamily="Plus Jakarta Sans" fontWeight="bold" sx={{ px: 1 }}>Address:</Typography>
              <CustomField
                name="Address.country"
                label="Country"
                value={values.Address.country}
                onChange={handleChange}
                error={errors.Address?.country}
                touched={touched.Address?.country}
                onBlur={handleBlur}
                input
                optional
              />
              <CustomField
                name="Address.city"
                label="City"
                value={values.Address.city}
                onChange={handleChange}
                error={errors.Address?.city}
                touched={touched.Address?.city}
                onBlur={handleBlur}
                input
                optional
              />
              <CustomField
                name="Address.location"
                label="Location"
                value={values.Address.location}
                onChange={handleChange}
                error={errors.Address?.location}
                touched={touched.Address?.location}
                onBlur={handleBlur}
                input
                optional
              />
            </Box>

            <CustomField
              name="type"
              label="Type"
              value={values.type}
              onChange={handleChange}
              error={errors.type}
              touched={touched.type}
              onBlur={handleBlur}
              select
            >
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </CustomField>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography variant='body2' fontFamily="Plus Jakarta Sans" fontWeight="bold" sx={{ px: 1 }}>Price:</Typography>
              <CustomField
                name="price"
                label="Price"
                value={values.price}
                onChange={handleChange}
                error={errors.price}
                touched={touched.price}
                onBlur={handleBlur}
                input
                type="number"
                optional
              />
              <CustomField
                name="discount"
                label="Discount"
                value={values.discount}
                onChange={handleChange}
                error={errors.discount}
                touched={touched.discount}
                onBlur={handleBlur}
                input
                type="number"
                optional
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography variant='body2' fontFamily="Plus Jakarta Sans" fontWeight="bold" sx={{ px: 1 }}>Area: </Typography>
              <CustomField
                name="width"
                label="Width"
                value={values.width}
                onChange={handleChange}
                error={errors.width}
                touched={touched.width}
                onBlur={handleBlur}
                input
                type="number"
              />

              <CustomField
                name="height"
                label="Height"
                value={values.height}
                onChange={handleChange}
                error={errors.height}
                touched={touched.height}
                onBlur={handleBlur}
                input
                type="number"
              />
              <CustomField
                name="unit"
                label="Unit"
                value={values.unit}
                onChange={handleChange}
                error={errors.unit}
                touched={touched.unit}
                onBlur={handleBlur}
                input
              />
            </Box>


            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography variant='body2' fontFamily="Plus Jakarta Sans" fontWeight="bold" sx={{ px: 1 }}>Details:</Typography>
              <CustomField
                name="beds"
                label="Beds"
                value={values.beds}
                onChange={handleChange}
                error={errors.beds}
                touched={touched.beds}
                onBlur={handleBlur}
                input
                type="number"
              />
              <CustomField
                name="baths"
                label="Baths"
                value={values.baths}
                onChange={handleChange}
                error={errors.baths}
                touched={touched.baths}
                onBlur={handleBlur}
                input
                type="number"
              />
              <CustomField
                name="furnished"
                label="Furnished"
                value={values.furnished}
                onChange={handleChange}
                error={errors.furnished}
                touched={touched.furnished}
                onBlur={handleBlur}
                select
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </CustomField>
              <CustomField
                name="parking"
                label="Parking"
                value={values.parking}
                onChange={handleChange}
                error={errors.parking}
                touched={touched.parking}
                onBlur={handleBlur}
                select
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </CustomField>

            </Box>
            <CustomField
              name="Description"
              label="Description"
              value={values.Description}
              onChange={handleChange}
              error={errors.Description}
              touched={touched.Description}
              onBlur={handleBlur}
              textarea
              optional
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <StyledButton variant="contained" color="red" type="button" >Cancel</StyledButton>
              <StyledButton variant="outlined"
                // disabled={isLoading}
                onClick={handleSubmit} >  Add
                {/* {isLoading && <CircularProgress size={20} />} */}
              </StyledButton>
            </Box>

          </Box>
        </Box>
      </PageCard>
    </PageContainer>
  )
}

export default CreateProperty