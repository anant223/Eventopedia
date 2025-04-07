import userService from "../../api/userService"
import { login } from "../../app/features/authSlice.js"

const loginSession = (data, navigate) => async (dispatch) => {
    try {
        const userData = await userService.loginUser(data);
        if (userData) {
          dispatch(login(userData));
          alert("You have logged in successfull");
          navigate("/main/all-events")
        }
    } catch (error) {
        console.log("Error:", error.message);
        if (error.response) {
          alert(error.response.data.message || "Something went wrong!");
        } else {
          alert("Failed to register. Please try again later.");
        }
    }
}

export default loginSession