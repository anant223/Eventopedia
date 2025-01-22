import ApiError from "../utils/handleApiError";
import api from "./axiosInstance";


const apiRequest = async (
  {
    method,
    url,
    data = null,
    params = null,
    customHeader = {}, 
    debug = false,
  },
  errorMessage = "An error occurred while processing your request"
) => {
  try {
    const headers = {
      ...(!(data instanceof FormData) && {
        "Content-Type": "application/json",
      }),
      ...customHeader,
    };

    if (debug) {
      console.log("Request details:", {
        method,
        url,
        dataType: data instanceof FormData ? "FormData" : typeof data,
        headers,
      });
    }

    // Make the API call
    const response = await api({
      method,
      url,
      data,
      params,
      headers,
    });

    // Check for valid response
    if (!response.data) {
      throw new ApiError(500, "No data received from the server");
    }

    return response.data;
  } catch (error) {
    // Handle specific error statuses
    if (error.response?.status === 404) {
      throw new ApiError(404, String(errorMessage) || "Resource not found");
    }
    if (error.response?.status === 401) {
      throw new ApiError(401, "Unauthorized access. Please log in again.");
    }

    // Log debug information if enabled
    if (debug) {
      console.error("API Error:", error);
    }

    // Re-throw the error
    throw error;
  }
};

export default apiRequest;