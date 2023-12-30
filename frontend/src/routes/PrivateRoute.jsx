import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const PrivateRoute = () => {
    const { isAuthenticated, authenticatedUser } = useSelector(state => state.auth)
    return (
        isAuthenticated && authenticatedUser ? <Outlet /> : <Navigate to="/auth/login" />
    )
}

export default PrivateRoute