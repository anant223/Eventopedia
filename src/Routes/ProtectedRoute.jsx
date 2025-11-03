import { selectIsAuthenticated } from '@/app/selector/authSelector'
import { LoadingSpinner } from '@/components/common'
import useAuth from '@/hooks/useAuth'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {loading} = useAuth()
    const isAuthenticated = useSelector(selectIsAuthenticated)
    if(!isAuthenticated){
        return <Navigate to={"/auth?type=login"} replace/>
    }

    return loading ? <LoadingSpinner/> : children
}

export default ProtectedRoute
