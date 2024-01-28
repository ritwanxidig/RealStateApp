import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CustomField from 'src/components/form/CustomField'
import StyledButton from 'src/components/shared/StyledButton'
import ImageUpload from './ImageUpload'
import { useGetCountriesQuery } from 'src/app/services/api'

const LandForm = ({ formik, ...props }) => {
    const { data: countries } = useGetCountriesQuery();
    const [cities, setCities] = React.useState(props?.targetCountry?.cities || null);
    const [locations, setLocations] = React.useState(props?.targetCity?.locations || null);
    const { errors, touched, values, handleChange, handleBlur, handleSubmit } = formik;

    useEffect(() => {
        if (props?.targetCountry) {
            setCities(props?.targetCountry?.cities);
        }
        if (values?.address?.city) {
            const city = cities?.find(city => city._id === values?.address?.city);
            setLocations(city?.locations);
        }

    }, [formik, values])

    const handleCountryChange = (e) => {
        const country = countries?.countries?.find(country => country._id === e.target.value);
        setCities(country?.cities);
        setLocations(null);
        formik.setFieldValue('address.city', '');
        formik.setFieldValue('address.location', '');
        handleChange(e);
    }

    const handleCityChange = (e) => {
        const city = cities?.find(city => city._id === e.target.value);
        setLocations(city?.locations);
        formik.setFieldValue('address.location', '');
        handleChange(e);
    }

    return (
        <Box sx={{ display: 'grid', gap: 2 }}>
            {/* image upload */}
            <ImageUpload formik={formik} />
            {/* size */}
            <Box>
                <Typography variant='' fontFamily="Plus Jakarta Sans" fontWeight="bold" sx={{ fontSize: '16px', }}>Size:</Typography>
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { lg: 'repeat(3, 1fr)', md: 'repeat(3, 1fr)', sm: 'repeat(2, 1fr)', xs: 'repeat(1, 1fr)' } }} >
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
                        <option value="kmsquare">Km square</option>
                        <option value="ftsquare">Ft square</option>
                    </CustomField>
                </Box>
            </Box>
            {/* address */}
            <Box>
                <Typography variant='' fontFamily="Plus Jakarta Sans" fontWeight="bold" sx={{ fontSize: '16px', }}>Address:</Typography>
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { lg: 'repeat(3, 1fr)', md: 'repeat(3, 1fr)', sm: 'repeat(2, 1fr)', xs: 'repeat(1, 1fr)' } }} >
                    <CustomField
                        name="address.country"
                        label="Country"
                        value={values.address.country}
                        onChange={handleCountryChange}
                        error={errors.address?.country}
                        touched={touched.address?.country}
                        onBlur={handleBlur}
                        select
                    >
                        <option value="">Select Country</option>
                        {countries?.countries?.map((country) => (
                            <option key={country._id} value={country._id}>{country.name}</option>
                        ))}
                    </CustomField>

                    <CustomField
                        name="address.city"
                        label="City"
                        value={values.address.city}
                        onChange={handleCityChange}
                        error={errors.address?.city}
                        touched={touched.address?.city}
                        onBlur={handleBlur}
                        select
                    >
                        <option value="">Select City</option>
                        {cities?.map((city) => (
                            <option key={city._id} value={city._id}>{city.name}</option>
                        ))}
                    </CustomField>

                    <CustomField
                        name="address.location"
                        label="Location"
                        value={values.address.location}
                        onChange={handleChange}
                        error={errors.address?.location}
                        touched={touched.address?.location}
                        onBlur={handleBlur}
                        select
                    >
                        <option value="">Select Location</option>
                        {locations?.map((location) => (
                            <option key={location._id} value={location._id}>{location.name}</option>
                        ))}
                    </CustomField>
                </Box>
            </Box>

            {/* price */}
            <Box>
                <Typography variant='' fontFamily="Plus Jakarta Sans" fontWeight="bold" sx={{ fontSize: '16px', }}>Price:</Typography>
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
            </Box>

            {/* description */}
            <Box>
                <Typography variant='' fontFamily="Plus Jakarta Sans" fontWeight="bold" sx={{ fontSize: '16px', }}>Details:</Typography>
                <CustomField
                    name="description"
                    label="Description"
                    value={values.description}
                    onChange={handleChange}
                    error={errors.description}
                    touched={touched.description}
                    onBlur={handleBlur}
                    textarea
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <StyledButton variant="contained" color="red" type="button" onClick={() => formik.resetForm()} >Reset</StyledButton>
                <StyledButton variant="contained" color="primary" type="submit" onClick={handleSubmit}>Submit</StyledButton>
            </Box>
        </Box>
    )
}

export default LandForm