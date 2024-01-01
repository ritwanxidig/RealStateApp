import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const PrivateRoute = ({ allowedRoles }) => {
    const { isAuthenticated, authenticatedUser } = useSelector(state => state.auth);

    if (!allowedRoles?.includes(authenticatedUser?.roles[0])) {
        return <Navigate to="/auth/403" />
    }

    if (!isAuthenticated || !authenticatedUser) {
        return <Navigate to="/auth/login" />
    }

    return (
        <Outlet />
    )
}

export default PrivateRoute