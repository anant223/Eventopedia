import AuthPage from "@/auth/AuthPage";
import useWarmupServer from "@/hooks/useWarmupServer";
import React from "react"

const Auth = () => {
  const backendHealthUrl = `${import.meta.VITE_API_BASE_URL}/api/v1/health`;
  const {isWakingUp} = useWarmupServer(backendHealthUrl);

  return (
    <div className="relative">
      {isWakingUp && (
        <div className="absolute top-4 right-4 text-xs text-muted-foreground animate-pulse">
          Connecting to secure server...
        </div>
      )}
      <AuthPage />
    </div>
  );
};
export default Auth;
