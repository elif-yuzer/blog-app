import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/auth/authSlice';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const AuthRouter = () => {
    const currentUser = useSelector(selectCurrentUser);
  return (

    currentUser ? <Outlet /> : <Navigate to="/sign-in" />
  )
}

export default AuthRouter