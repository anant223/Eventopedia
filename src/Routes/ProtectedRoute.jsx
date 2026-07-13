import { LoadingSpinner } from '@/components/common'
import useAuth from '@/hooks/useAuth'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {loading, isAuthenticated, user} = useAuth();
    const location = useLocation();


    if (loading) return <LoadingSpinner/>

    if(!isAuthenticated){
        return <Navigate to={"/auth?type=login"} replace/>
    }
 
     if (!user.onboardingCompleted && location.pathname !== "/onboarding") {
       return <Navigate to="/onboarding" replace />;
     }
    return children
}

export default ProtectedRoute
