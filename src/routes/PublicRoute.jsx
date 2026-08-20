import CenteredSpinner from "@/components/common/LoadingSpinner";
import useAuth from "@/hooks/useAuth";
import { Navigate, } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) return <CenteredSpinner />;

  if (isAuthenticated) {
    return (
      <Navigate
        to={user?.onboardingCompleted ? "/main/all-events" : "/onboarding"}
        replace
      />
    );
  }

  return children;
};

export default PublicRoute;