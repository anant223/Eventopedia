import registerService from "../../api/registerService.js"
import {toggleSub} from "../../app/features/authSlice.js"

const registerEvent =  (id) => async (dispatch) => {
  
  try {
    const response = await registerService.register(id);
    if (response && response.data) {
      dispatch(toggleSub(response.data.data));
      alert("Successfully registered for the event!");
    }
  } catch (error) {
    console.log(error.message);
    return;
  }
};


export {registerEvent}
