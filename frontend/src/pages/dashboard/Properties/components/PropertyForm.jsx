import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useGetCountriesQuery } from 'src/app/services/api'
import CustomField from 'src/components/form/CustomField'
import StyledButton from 'src/components/shared/StyledButton'
import Loader from 'src/views/utilities/Loader'
import ImageUpload from './ImageUpload'


const NewPropertyForm = ({ formik, ...props }) => {
  const { values, touched, errors, handleSubmit, handleChange, handleBlur } = formik;
  const { data: countries, isFetching: isFetchingCountries } = useGetCountriesQuery();
  const [cities, setCities] = React.useState(props?.targetCountry?.cities || null);
  const [locations, setLocations] = React.useState(props?.targetCity?.locations || null);
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [selectedCity, setSelectedCity] = React.useState(null);




  useEffect(() => {
    if (values.Address?.country && countries) {
      const country = countries?.countries?.find(country => country._id === values.Address?.country);
      setCities(country?.cities);
      setSelectedCountry(country);
    }
    if (values.Address?.city) {
      const city = cities?.find(city => city._id === values.Address?.city);
      setLocations(city?.locations);
      setSelectedCity(city);
    }
  }, [formik, values])

  const handleCountryChange = (e) => {
    const country = countries?.countries?.find(country => country._id === e.target.value);
    setCities(country?.cities);
    setLocations(null);
    setSelectedCountry(country);

    handleChange(e);
  }
  const handleCityChange = (e) => {
    const city = cities?.find(city => city._id === e.target.value);
    setLocations(city?.locations);
    setSelectedCity(city);
    handleChange(e);
  }


  if (isFetchingCountries
  ) return <Loader />
  return (
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
      {/* address */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Typography variant='body2' fontFamily="Plus Jakarta Sans" fontWeight="bold" sx={{ px: 1 }}>Address:</Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 2
          }}
        >
          <CustomField
            name="Address.country"
            label="Country"
            value={values.Address.country}
            onChange={handleCountryChange}
            error={errors.Address?.country}
            touched={touched.Address?.country}
            onBlur={handleBlur}
            select
          >
            <option value="">Select Country</option>
            {countries?.countries?.length > 0 ? countries?.countries?.map((country, index) => (
              <option key={index} value={country._id}>{country.name}</option>
            )) : <option>there is no data.</option>}
          </CustomField>

          <CustomField
            name="Address.city"
            label="City"
            value={values.Address.city}
            onChange={handleCityChange}
            error={errors.Address?.city}
            touched={touched.Address?.city}
            onBlur={handleBlur}
            select
          >
            <option value="">Select City</option>

            {cities && cities?.length > 0 ? cities?.map((city, index) => (
              <option key={index} value={city._id}>{city.name}</option>
            )) : <option>there is no data.</option>}
          </CustomField>

          <CustomField
            name="Address.location"
            label="Location"
            value={values.Address.location}
            onChange={handleChange}
            error={errors.Address?.location}
            touched={touched.Address?.location}
            onBlur={handleBlur}
            select
          >
            <option value="">Select Location</option>
            {locations && locations?.length > 0
              ? locations?.map((location, index) => (
                <option key={index} value={location._id}>{location.name}</option>
              ))
              : <option>there is no data.</option>}
          </CustomField>
        </Box>
      </Box>
      {/* type */}
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
      {/* price */}
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
      {/* area */}
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
          select
        >
          <option value="">Select Unit</option>
          <option value="sqft">Sqft</option>
          <option value="sqkm">Sqkm</option>
        </CustomField>
      </Box>

      {/* details */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Typography variant='body2' fontFamily="Plus Jakarta Sans" fontWeight="bold" sx={{ px: 1 }}>Details:</Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr',
              lg: 'repeat(4, 1fr)',
              xl: 'repeat(4, 1fr)',
            },
            gap: 2
          }}
        >
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

      </Box>

      {/* description */}
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
      {/* Image upload */}
      <ImageUpload formik={formik} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <StyledButton variant="contained" color="red" type="button" >Cancel</StyledButton>
        <StyledButton variant="outlined"
          // disabled={isLoading}
          onClick={handleSubmit} >  Submit
          {/* {isLoading && <CircularProgress size={20} />} */}
        </StyledButton>
      </Box>

    </Box>
  )
}

export default NewPropertyForm