import React from 'react'
import CustomModal from '../../../../views/utilities/CustomModal'
import { useUpdateLocationMutation } from '../../../../app/services/api';
import { Box, CircularProgress } from '@mui/material';
import StyledButton from '../../../../components/shared/StyledButton';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import CustomField from '../../../../components/form/CustomField';


const validationSchemas = yup.object().shape({
    name: yup.string('Enter your name').required('Name is required'),
})

const UpdateLocation = ({ onOpen, setOnOpen, country, city, data }) => {
    const [updateLocation, { isLoading }] = useUpdateLocationMutation();

    const formik = useFormik({
        initialValues: {
            name: data?.name || "",
        },
        validationSchema: validationSchemas,
        onSubmit: async (values) => {
            try {
                const param = `${country.name}/${city.name}/${data?._id}`;
                await toast.promise(updateLocation({ param, ...{ name: values.name } }).unwrap().then(rs => { setOnOpen(false) }), {
                    loading: 'Updating location...',
                    success: 'Location updated successfully',
                    error: 'Error updating new location',
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
            <StyledButton variant="outlined" disabled={isLoading} onClick={handleSubmit} >  Update  {isLoading && <CircularProgress size={20} />}  </StyledButton>
        </Box>
    )

    return (
        <CustomModal
            title="Update Location"
            onOpen={onOpen}
            setOnOpen={setOnOpen}
            actions={actions()}
        >
            <form>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <CustomField
                        name={"name"} value={values.name} onChange={handleChange} error={errors.name} touched={touched.name} label={"Name"} id="name" input type="text" required
                        onBlur={handleBlur}
                    />
                </Box>
            </form>
        </CustomModal>
    )
}

export default UpdateLocation