import userService from "../api/userService";

const updateProfileImg = async (data) => {
  try {
    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append("avatar", data?.avatar[0]);
    const response = await userService.updateUserAvatar(formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // console.log("Response:", response.data);
    alert("You have uploaded the image successfully!");
  } catch (error) {
    console.error("Error:", error);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      alert(error.response.data.message || "Something went wrong!");
    } else {
      alert("Failed to upload the image. Please try again later.");
    }
  }
};

const updateProfile = async (data) => {
    const socialLinks = [];

    Object.keys(data).forEach(key => {
      if(key.startsWith("social_") && data[key]){
        const platform = key.replace("social_", "");
        socialLinks.push({platform, url: data[key]})
      }
    });
    const {
        social_discord,
        social_linkedin,
        social_twitter,
        social_instagram,
        ...rest
      } = data;


    const payload = {
      ...rest,
      socialLinks,
    };
    
      try {
        const response = await userService.updateUserProfile(payload);
        // console.log("Response:", response.data);
        alert("You have updated the profile successfully!");
      } catch (error) {
        console.error("Error:", error);

        if (error.response) {
          console.error("Status:", error.response.status);
          console.error("Data:", error.response.data);
          alert(error.response.data.message || "Something went wrong!");
        } else {
          alert("Failed to upload the image. Please try again later.");
        }
      }
};

export {updateProfileImg, updateProfile}