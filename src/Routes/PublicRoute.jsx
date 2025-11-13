import { selectIsAuthenticated } from "@/app/selector/authSelector";
import { LoadingSpinner } from "@/components/common";
import useAuth from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import { Navigate, } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const {loading} = useAuth();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/main/all-events" replace />;
  }

  return children;
};

