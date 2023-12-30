import React from "react"
import AuthPage from "./AuthPage"
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Stack, Typography } from "@mui/material"
import CustomInput from "../../components/form/CustomInput"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useTheme } from "@emotion/react"
import CustomField from "../../components/form/CustomField"
import { useFormik } from "formik";
import { useLoginMutation } from "../../app/services/api";
import { errorActions } from "../../app/slices/errorSlice";
import { authActions } from "../../app/slices/authSlice";
import { alertActions } from "../../app/slices/alertSlice";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(4, 'Password should be of minimum 4 characters length')
    .required('Password is required'),
});

const Login = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await login(values).unwrap().then((res) => {
          dispatch(authActions.login(res));
          navigate("/app");
          resetForm();

        }).catch((err) => {
          console.log(err);
          dispatch(alertActions.setAlert({
            type: "error",
            message: err?.data?.message || "Something went wrong"
          }))
          if (err?.data?.message === 'User not found') {
            setFieldError("email", "User not found")
          }
          if (err?.data?.message === 'Incorrect Password') {
            setFieldError("password", "Wrong password")
          }
        })
      } catch (error) {
        console.log(error);
        dispatch(errorActions.setError({
          title: error?.data?.status || "Server Error",
          message: error?.data?.message || "Something went wrong"
        }))
      } finally {
      }
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldError } = formik

  return (
    <AuthPage title="Sign In">
      <Box sx={{
        width: '100%',
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        fontFamily: 'Plus Jakarta Sans',
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: .4 }}>
          <CustomField
            input
            label="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            touched={touched.email}
            error={errors.email}
            type="email"
            name="email"
            id="email"
            // backgroundColor="white"
            // color="black"
            placeholder="Enter your email"
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: .4 }}>
          <CustomField
            input
            label="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            touched={touched.password}
            error={errors.password}
            type="password"
            name="password"
            id="password"
            // backgroundColor="white"
            // color="black"
            placeholder="Enter your password"
          />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remeber this Device" />
          </FormGroup>
          <Typography
            component={Link}
            to="/"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
        <Button
          variant="contained"
          sx={{
            width: '100%',
            fontFamily: 'Plus Jakarta Sans',
            boxShadow: 'none',
            textTransform: 'none',
            fontSize: '16px',
            '&:hover': {
              boxShadow: 'none',
            }
          }}
          onClick={handleSubmit}
        >
          Login
        </Button>
        <Typography variant="h1" sx={{ textDecoration: 'none', fontFamily: 'Plus Jakarta Sans', display: 'flex' }}>
          <Typography component="span" sx={{ fontFamily: 'Plus Jakarta Sans', fontWeight: '600', fontSize: '16px' }}>Don't have an account?</Typography>
          <Link to="/auth/register" >
            <Typography sx={{ color: 'primary.main', fontFamily: 'Plus Jakarta Sans', fontWeight: '600', fontSize: '16px', ml: 1 }}>
              Register</Typography></Link>
        </Typography>
      </Box>
    </AuthPage>
  )
}

export default Login