import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../app/features/authSlice.js";
import userService from "../api/userService.js";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService
      .fetchCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
          navigate("/main/all-events", { replace: true });
        } else {
          dispatch(logout());
          navigate("/auth", { replace: true });
        }
      })
      .catch((err) => {
        dispatch(logout());
        navigate("/auth", { replace: true });
      })
      .finally(() => setLoading(false));
  }, [dispatch, navigate]);

  return loading; 
};

export default useAuth;