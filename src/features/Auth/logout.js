import userService from "../../api/userService";
import { logout } from "../../app/features/authSlice";

const destroySession = async () => async (dispatch) => {
  try {
    const response = await userService.logoutUser();
    if (response) {
      dispatch(logout(response))
      alert("You have logged out successfully");
    }
    
  } catch (error) {
    console.error("Logout Error:", error.response || error.message);
    alert(
      error.response?.data?.message || "Failed to log out. Please try again."
    );
  }
};
export default destroySession;
