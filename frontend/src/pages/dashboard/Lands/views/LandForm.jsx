import { Box, Typography } from '@mui/material'
import React from 'react'
import CustomField from 'src/components/form/CustomField'
import StyledButton from 'src/components/shared/StyledButton'
import ImageUpload from './ImageUpload'

const LandForm = ({ formik, ...props }) => {
    const { errors, touched, values, handleChange, handleBlur, handleSubmit } = formik
    return (
        <Box sx={{ display: 'grid', gap: 2 }}>
            {/* image upload */}
            <ImageUpload formik={formik} />
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
                        input
                    />
                </Box>
            </Box>
            <Box>
                <Typography variant='' fontFamily="Plus Jakarta Sans" fontWeight="bold" sx={{ fontSize: '16px', }}>Address:</Typography>
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { lg: 'repeat(3, 1fr)', md: 'repeat(3, 1fr)', sm: 'repeat(2, 1fr)', xs: 'repeat(1, 1fr)' } }} >
                    <CustomField
                        name="address.country"
                        label="Country"
                        value={values.address.country}
                        onChange={handleChange}
                        error={errors.address?.country}
                        touched={touched.address?.country}
                        onBlur={handleBlur}
                        input
                    />

                    <CustomField
                        name="address.city"
                        label="City"
                        value={values.address.city}
                        onChange={handleChange}
                        error={errors.address?.city}
                        touched={touched.address?.city}
                        onBlur={handleBlur}
                        input
                    />

                    <CustomField
                        name="address.location"
                        label="Location"
                        value={values.address.location}
                        onChange={handleChange}
                        error={errors.address?.location}
                        touched={touched.address?.location}
                        onBlur={handleBlur}
                        input
                    />
                </Box>
            </Box>

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
                <StyledButton variant="contained" color="red" type="button" >Cancel</StyledButton>
                <StyledButton variant="contained" color="primary" type="submit" onClick={handleSubmit}>Submit</StyledButton>
            </Box>
        </Box>
    )
}

export default LandForm