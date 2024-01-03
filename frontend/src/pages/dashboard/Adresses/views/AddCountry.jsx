import React from 'react'
import CustomModal from 'src/views/utilities/CustomModal'
import { Box, CircularProgress } from '@mui/material'
import StyledButton from 'src/components/shared/StyledButton'
import { useFormik } from 'formik'
import { useAddCountryMutation } from 'src/app/services/api'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import CustomField from 'src/components/form/CustomField'


const validationSchemas = yup.object().shape({
    name: yup.string('Enter your name').required('Name is required'),
})

const AddCountry = ({ onOpen, setOnOpen }) => {
    const [addCountry, { isLoading }] = useAddCountryMutation();

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: validationSchemas,
        onSubmit: async (values) => {
            try {
                await toast.promise(addCountry(values).unwrap().then(rs => { setOnOpen(false) }), {
                    loading: 'Adding country...',
                    success: 'Country added successfully',
                    error: 'Error adding new country',
                });
            } catch (err) {
                console.log(err);
                // toast.error(err?.data?.message || "Something went wrong"); 
            }
        }
    });
    const { values, touched, errors, handleSubmit, handleChange, handleBlur, } = formik;

    const actions = () => (
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1
        }}>
            <StyledButton variant="contained" color="red" type="button" onClick={() => setOnOpen(false)}>Cancel</StyledButton>
            <StyledButton variant="outlined" disabled={isLoading} onClick={handleSubmit} >  Add  {isLoading && <CircularProgress size={20} />}  </StyledButton>
        </Box>
    )
    return (
        <CustomModal
            title="Add Country"
            onOpen={onOpen}
            setOnOpen={setOnOpen}
            actions={actions()}
        >
            <Box sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <form>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <CustomField
                            name={"name"} value={values.name} onChange={handleChange} error={errors.name} touched={touched.name} label={"Name"} id="name" input type="text" required
                            onBlur={handleBlur}
                        />
                    </Box>
                </form>
            </Box>
        </CustomModal>
    )
}

export default AddCountry