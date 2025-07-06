const createAsyncThunkHandler = ({ apiFn, onSuccess, onErr, onAfter }) => {
  return (...args) =>
    async (dispatch) => {
      try {
        const response = await apiFn(...args);

        console.log("✅ API Response:", response);

        if (response && response.data) {
          const data = response.data;
          console.log("🟡 Data for Success:", data);

          if (onSuccess) {
            const action = onSuccess(data);
            console.log("🟢 Dispatching action:", action);
            dispatch(action);
          }

          onAfter && onAfter(data);
        } else {
          console.warn("⚠️ API returned no valid data");
        }
      } catch (error) {
        console.error("❌ Caught error in async thunk:", error);
        if (onErr) onErr(error);
      }
    };
};

export default createAsyncThunkHandler;
