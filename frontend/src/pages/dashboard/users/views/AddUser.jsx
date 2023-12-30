import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'

// for project
import CustomModal from '../../../../views/utilities/CustomModal'
import CustomField from '../../../../components/form/CustomField'
import StyledButton from '../../../../components/shared/StyledButton'
import { useAddUserMutation } from '../../../../app/services/api'
import { alertActions } from '../../../../app/slices/alertSlice'


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
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
})

const AddUser = ({ onOpen, setOnOpen }) => {
  const [addUser, { isLoading }] = useAddUserMutation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      username: '',
      role: '',
      password: '',
    },
    validationSchema: validationSchemas,
    onSubmit: async (values) => {
      try {
        await addUser(values).unwrap().then(() => {
          dispatch(alertActions.setAlert({ type: 'success', message: 'User added successfully' }));
          setOnOpen(false);
        }).catch((err) => {
          console.log(err);
          dispatch(alertActions.setAlert({ message: err?.data?.message, type: 'error' }));
        })
      } catch (err) {
        console.log(err);
        dispatch(alertActions.setAlert({ message: err?.data?.message, type: 'error' }));
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
    <CustomModal onOpen={onOpen} width="500px" setOnOpen={setOnOpen} title="Add User" actions={actions()}>
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
            <CustomField
              name={"password"} value={values.password} onChange={handleChange} error={errors.password} touched={touched.password} label={"Password"} id="password" input type="password" required
              onBlur={handleBlur} />
          </Box>
        </form>
      </Box>
    </CustomModal>
  )
}

export default AddUser