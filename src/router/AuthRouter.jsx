import React from 'react'
import { useSelector } from 'react-redux'

const AuthRouter = () => {
    const currentUser = useSelector(selectCurrentUser);
  return (

    currentUser ? <Outlet /> : <Navigate to="/sign-in" />
  )
}

export default AuthRouter