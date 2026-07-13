import useAuth from '@/hooks/useAuth';
import React from 'react'
import { Navigate } from 'react-router-dom';

const OnBoardingRoute = ({ children }) => {
  const {user, isAuthenticated} = useAuth();

  if(!isAuthenticated){
    return <Navigate to={"/auth?type=login"} replace />;
  }         

  if (!user.onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }

  return children
};

export default OnBoardingRoute