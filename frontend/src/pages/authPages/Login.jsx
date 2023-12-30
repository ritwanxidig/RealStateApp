import React from "react"
import AuthPage from "./AuthPage"
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Stack, Typography } from "@mui/material"
import CustomInput from "../../components/form/CustomInput"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useTheme } from "@emotion/react"
import CustomField from "../../components/form/CustomField"

const Login = () => {
  const { darkMode } = useSelector(state => state.theme);
  const theme = useTheme();

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
        <Button variant="contained" sx={{
          width: '100%', fontFamily: 'Plus Jakarta Sans', boxShadow: 'none', textTransform: 'none', fontSize: '16px',
          '&:hover': {
            boxShadow: 'none',
          }
        }}>Login</Button>
        <Typography sx={{ textDecoration: 'none', fontFamily: 'Plus Jakarta Sans', display: 'flex' }}>
          <Typography  sx={{ fontFamily: 'Plus Jakarta Sans', fontWeight: '600', fontSize: '16px' }}>Don't have an account?</Typography>
          <Link to="/auth/register" >
            <Typography sx={{ color: 'primary.main', fontFamily: 'Plus Jakarta Sans', fontWeight: '600', fontSize: '16px', ml: 1 }}>
              Register</Typography></Link>
        </Typography>
      </Box>
    </AuthPage>
  )
}

export default Login