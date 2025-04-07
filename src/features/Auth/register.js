import userService from "../../api/userService";

const signUp = async (data, navigate) => {
  try {
    const response = await userService.registerUser(data);
    if(response){
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

export default signUp;