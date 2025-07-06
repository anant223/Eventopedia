import createAsyncThunkHandler from "../utils/asyncThunk";
import registerService from "../api/registerService";
import { toggleSubscription } from "../app/features/registerSlice";

export const toggleSubscribeEvent = (eventId) => {
  return createAsyncThunkHandler({
    apiFn: () => registerService.register(eventId),
    onSuccess: (data) => {
      return toggleSubscription({
        event: data.event || eventId,
        ...data,
      });
    },
    onErr: (err) => {
      if (err?.response) {
        alert(err.response?.data?.message || "Something went wrong!");
      } else {
        alert("Failed to register for event. Please try again");
      }
    },
  })();
};

