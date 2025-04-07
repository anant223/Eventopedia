import userService from "../../api/userService";

const destroySession = async () => {
  try {
    const response = await userService.logoutUser();
    if (response) {
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
