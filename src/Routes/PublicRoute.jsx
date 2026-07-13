import { LoadingSpinner } from "@/components/common";
import useAuth from "@/hooks/useAuth";
import { Navigate, } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const {loading, isAuthenticated} = useAuth();
  
  if(loading) return <LoadingSpinner/>
  
  if (isAuthenticated) {
    return <Navigate to="/main/all-events" replace />;
  }

  return children;
};

export default PublicRoute

