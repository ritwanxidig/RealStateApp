import { Box, Button, CircularProgress } from '@mui/material'
import { IconBrandGoogle } from '@tabler/icons-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import GoogleLogo from '../../../assets/images/logos/GoogleLogo.jsx'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import app from '../../../firebase.js'
import { useDispatch } from 'react-redux'

// project
import { useSignInWithGoogleMutation } from '../../../app/services/api'
import { alertActions } from '../../../app/slices/alertSlice.js'
import { authActions } from '../../../app/slices/authSlice.js'
import toast from 'react-hot-toast'

const GoogleOAuth = () => {
    const [signInWithGoogle, { isLoading }] = useSignInWithGoogleMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSignInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            await signInWithGoogle({
                id: result.user.uid,
                email: result.user.email,
                name: result.user.displayName,
                profilePic: result.user.photoURL
            }).unwrap().then((res => {
                dispatch(authActions.login(res));
                navigate("/");
            })).catch((er => {
                toast.error(er?.data?.message || "Something went wrong")
                console.log(er);
            }));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box>
            <Button
                variant="outlined"
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'grey.600',
                    borderColor: 'grey.600',
                    fontSize: '14px',
                    fontFamily: 'Plus Jakarta Sans',
                    textTransform: 'none',
                    '&:hover': {
                        borderColor: 'grey.600',
                        color: 'grey.600',
                    }
                }}
                onClick={handleSignInWithGoogle}
                disabled={isLoading}
            >
                <GoogleLogo width="30px" height="30px" />  SignIn Google
                {isLoading && <CircularProgress size={20} />}
            </Button>
        </Box>
    )
}

export default GoogleOAuth