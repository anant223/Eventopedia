import createAsyncThunkHandler from "../utils/asyncThunk";
import registerService from "../api/registerService";
import { toggleSubscription } from "../app/features/registerSlice";
import { toast } from "sonner";

export const toggleSubscribeEvent = async (eventId, currentlySubscribed) => {
  const { register } = registerService;

  return createAsyncThunkHandler({
    apiFn: () => register(eventId),
    onSuccess: toggleSubscription,
    onAfter: () => {
      toast(
        currentlySubscribed
          ? "You have unregistered from the event successfully"
          : "You have registered for the event successfully"
      );
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

