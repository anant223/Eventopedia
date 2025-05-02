import userService from "../api/userService.js";
import { login, logout } from "../app/features/authSlice.js";
import createAsyncThunkHandler from "../utils/asyncThunk.js";

const signUp = async (data) => {
  try {
    const response = await userService.registerUser(data);
    if (response) {
      alert("You have registred successfull");
    }
  } catch (error) {
    console.log("Error:", error.message);
    if (error.response) {
      alert(error.response.data.message || "Something went wrong!");
    } else {
      alert("Failed to register. Please try again later.");
    }
  }
};
 
const loginSession = (data, navigate) =>
  createAsyncThunkHandler({
    apiFn: () => userService.loginUser(data),
    onSuccess: login,
    onAfter: () => {
      alert("You have logged in successfully");
      navigate("/main/all-events");
    },
    onErr: (err) => {
      if (err?.response) {
        alert(err.response?.data?.message, "Something went wrong!");
      } else {
        alert("Failed to login. Please try again");
      }
    },
  })();

  const destroySession = () =>
    createAsyncThunkHandler({
      apiFn: () => userService.logoutUser(),
      onSuccess: logout,
      onAfter: () => {
        alert("You have logged out successfully");
        navigate("/auth");
      },
      onErr: (err) => {
        if (err?.response) {
          alert(err.response?.data?.message, "Something went wrong!");
        } else {
          alert("Failed to logout. Please try again");
        }
      },
    })()

export {loginSession, signUp, destroySession};
