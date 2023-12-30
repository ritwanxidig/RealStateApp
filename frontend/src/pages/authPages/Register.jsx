import React from 'react'
import AuthPage from './AuthPage'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import CustomField from '../../components/form/CustomField'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useRegisterMutation } from '../../app/services/api'
import { alertActions } from '../../app/slices/alertSlice'
import * as yup from 'yup';
import { useDispatch } from 'react-redux'



const validationSchema = yup.object({
  username: yup
    .string('Enter your username')
    .required('username is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(4, 'Password should be of minimum 4 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string('Enter your password')
    .min(4, 'Password should be of minimum 4 characters length')
    .required('Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const toSendValues = {
        username: values.username,
        email: values.email,
        password: values.password
      }
      try {
        await register(toSendValues).unwrap().then((res) => {
          dispatch(alertActions.setAlert({
            type: "success",
            message: "Account created successfully"
          }));
          console.log(res);
          navigate("/auth/login");
        }).catch((err) => {
          console.log(err);
          if (err?.data?.message === 'Username already exists') {
            setFieldError("username", "username already exists")
          }
          if (err?.data?.message === 'Email already exists') {
            setFieldError("email", "Email already exists")
          }
          dispatch(alertActions.setAlert({
            type: "error",
            message: err?.data?.message || "Something went wrong"
          }))
        })
      } catch (error) {
        console.log(error);
        dispatch(alertActions.setAlert({
          type: "error",
          message: error?.data?.message || "Something went wrong"
        }))
      }
    },
  });
  const { errors, touched, handleSubmit, handleChange, handleBlur, values, setFieldError } = formik
  return (
    <AuthPage title="Sign Up">
      <Box sx={{
        width: '100%',
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        fontFamily: 'Plus Jakarta Sans',
      }}>
        <CustomField
          name={"username"}
          id="username"
          label={"username"}
          input
          type="text"
          required
          placeholder={"Enter your username"}
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.username}
          touched={touched.username}

        />
        <CustomField
          name={"email"}
          id="email"
          label={"Email"}
          input
          type="email"
          required
          placeholder={"Enter your email"}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}

        />
        <CustomField
          name={"password"}
          id="password"
          label={"Password"}
          input
          type="password"
          required
          placeholder={"Enter your password"}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          touched={touched.password}

        />
        <CustomField
          name={"confirmPassword"}
          id="confirmPassword"
          label={"Confirm Password"}
          input
          type="password"
          required
          placeholder={"Enter your password"}
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.confirmPassword}
          touched={touched.confirmPassword}
        />
        <Button variant="contained" sx={{
          width: '100%', fontFamily: 'Plus Jakarta Sans', boxShadow: 'none', textTransform: 'none', fontSize: '16px',
          '&:hover': {
            boxShadow: 'none',
          }
        }}
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Sign Up <CircularProgress size={20} sx={{ display: isLoading ? 'inline' : 'none' }} />
        </Button>
        <Typography variant="h1" sx={{ textDecoration: 'none', fontFamily: 'Plus Jakarta Sans', display: 'flex' }}>
          <Typography sx={{ fontFamily: 'Plus Jakarta Sans', fontWeight: '600', fontSize: '16px' }}>Already have an account?</Typography>
          <Link to="/auth/login" >
            <Typography sx={{ color: 'primary.main', fontFamily: 'Plus Jakarta Sans', fontWeight: '600', fontSize: '16px', ml: 1 }}>
              Login</Typography></Link>
        </Typography>
      </Box>
    </AuthPage >
  )
}

export default Register