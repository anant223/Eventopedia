
const createAsyncThunkHandler = ({apiFn, onSuccess, onErr, onAfter}) => { 
    return (...args) => async (dispatch) => {
        try {
            const response = await apiFn(...args);
            if(response && response.data){
                onSuccess && dispatch(onSuccess(response));
                onAfter && onAfter(response)
            }else {
                console.warn("API returned no response!");
            }
        } catch (error) {
            if(onErr){
                onErr(error)
            }else{
                console.error("Caught error in async thunk:", error);
            }
        
        }
    }
}
export default createAsyncThunkHandler;