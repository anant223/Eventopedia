import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../app/features/authSlice.js";
import { selectIsAuthenticated } from "@/app/selector/authSelector";
import userService from "../api/userService.js";





export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState(null);
  const isMountedRef = useRef(false);
  const checkAuthPromiseRef = useRef(null);

  console.log("🧠 useAuth mounted");
  useEffect(() => {
    return () => console.log("💀 useAuth unmounted");
  }, []);

  const checkAuth = useCallback(async () => {
    if (checkAuthPromiseRef.current) {
      return checkAuthPromiseRef.current;
    }
    const authPromise = (async () => {
      try {
       
        if(initialized){
          setLoading(false)
          return
        }
        setError(null);
        setLoading(true);
       console.log("pre api call");
       const userData = await userService.fetchCurrentUser();
       console.log("later api call", userData);

        if (!isMountedRef.current) return;

        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        if (!isMountedRef.current) return;
        if (error.response?.status === 401) {
          // only logout if currently authenticated to avoid infinite loops
          if (isAuthenticated) dispatch(logout());
        } else {
          console.error("useAuth error:", error);
          setError(error);
        }
        
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
          setInitialized(true);
          checkAuthPromiseRef.current = null;
        }
      }
    })();

    checkAuthPromiseRef.current = authPromise;
    return authPromise;
  }, [dispatch]);

 
  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);



  useEffect(() => {
    isMountedRef.current = true;
    checkAuth();

    return () => {
      isMountedRef.current = false;
    };
  }, []); 


  return {
    loading,
    initialized,
    error,
    isAuthenticated,
    refetch: checkAuth,
    logout: handleLogout,
  };
};

export default useAuth;
