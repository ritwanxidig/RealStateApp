import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Box, CircularProgress, Typography } from '@mui/material'




// for project
import StyledButton from 'src/components/shared/StyledButton'
import CustomField from 'src/components/form/CustomField'
import { useDeleteUserMutation, useUpdateUserMutation } from 'src/app/services/api'
import { alertActions } from 'src/app/slices/alertSlice'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'



const validationSchemas = yup.object().shape({
    name: yup.string('Enter your name').required('Name is required'),
    email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
    // small upper case letter, 1 number username
    username: yup
        .string('Enter your username')
        .min(4, 'Username should be of minimum 4 characters length')
        .max(15, 'Username should be of maximum 15 characters length')
        .matches(/^[a-zA-Z0-9]+$/, 'Username should contain only letters and numbers')
        .required('Username is required'),
    role: yup.string('Enter your role').required('Role is required'),
})

const UserActions = ({ data, setOnOpen }) => {
    const [updateUser, { isLoading }] = useUpdateUserMutation();
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: data?.name || '',
            email: data?.email || '',
            username: data?.username || '',
            role: data?.roles[0] || '',
        },
        validationSchema: validationSchemas,
        onSubmit: async (values) => {
            const param = data?._id
            try {
                await toast.promise(updateUser({ param, ...values }).unwrap().then(() => {
                    // toast.success("User updated successfully");
                    setOnOpen(false);
                }), {
                    loading: 'Updating user...',
                    success: 'User updated successfully',
                    error: 'Error updating user',
                });
            } catch (err) {
                console.log(err);
                // toast.error(err?.data?.message || "Error something went wrong.")
            }
        }
    });
    const { values, touched, errors, handleSubmit, handleChange, handleBlur, } = formik;

    const handleDelete = async () => {
        const param = data?._id
        try {
            await toast.promise(deleteUser(param).unwrap().then(() => {
                // toast.success("User deleted successfully");
                setOnOpen(false);
            }), {
                loading: 'Deleting user...',
                success: 'User deleted successfully',
                error: 'Error deleting user',
            });
        } catch (err) {
            console.log(err);
            // toast.error(err?.data?.message || "Error something went wrong.")
        }
    }



    return (
        <Box sx={{
            p: 0,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <form>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <CustomField
                        name={"name"} value={values.name} onChange={handleChange} error={errors.name} touched={touched.name} label={"Name"} id="name" input type="text" required
                        onBlur={handleBlur}
                    />
                    <CustomField
                        name={"email"} value={values.email} onChange={handleChange} error={errors.email} touched={touched.email} label={"Email"} id="email" input type="email" required
                        onBlur={handleBlur}

                    />
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center'
                    }}>
                        <CustomField
                            name={"username"} value={values.username} onChange={handleChange} error={errors.username} touched={touched.username} label={"Username"} id="username" input type="text" required
                            onBlur={handleBlur}
                        />
                        <CustomField
                            name={"role"} value={values.role} onChange={handleChange} error={errors.role} touched={touched.role} label={"Role"} id="role" select type="text" required
                            onBlur={handleBlur}
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </CustomField>
                    </Box>
                </Box>
            </form>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 1,
                    mt: 3
                }}
            >
                <StyledButton variant="outlined" disabled={isLoading} onClick={handleSubmit} >  Update  {isLoading && <CircularProgress size={20} />}  </StyledButton>
                <StyledButton variant="outlined" color="red" disabled={isDeleting} onClick={handleDelete} >  Delete  {isDeleting && <CircularProgress size={20} />}  </StyledButton>
            </Box>
        </Box>
    )
}

export default UserActions