import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../app/features/authSlice.js";
import userService from "../api/userService.js";
import { useLocation } from "react-router-dom";


export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const {pathname} = useLocation();
  const [error, setError] = useState(null);
  const isMountedRef = useRef(false);


  const checkAuth = useCallback(async () => {
    
    try {
      setError(null);
      setLoading(true);
      const userData = await userService.fetchCurrentUser();

      if (!isMountedRef.current) return;

      if (userData) {
        dispatch(login(userData));
        if (!pathname.startsWith("/main")) {
          navigate("/main/all-events", { replace: true });
        }
      } else {
        dispatch(logout());
        navigate("/auth?type=login", { replace: true });
      }
    } catch (error) {
      if (!isMountedRef.current) return;
      setError(error.message);
      dispatch(logout());
      navigate("/auth?type=login", { replace: true });
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [pathname, dispatch, navigate]);


  useEffect(() => {
    isMountedRef.current = true;
    checkAuth()
    return () => {
      isMountedRef.current = false
    }
  }, [checkAuth]);

  return {loading, error, Refetch : checkAuth, isAuthenticated : !loading && !error}; 
};


export default useAuth;