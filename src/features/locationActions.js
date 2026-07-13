import LocationService from "@/services/location.service";

const locationService = new LocationService();

export const searchLocation = createAsyncThunk(
  "event/searchLocation",
  async (query, { rejectWithValue }) => {
    try {
      const response = await locationService.fetchPlaces(query);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to search location"
      );
    }
  }
);
