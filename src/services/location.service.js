import axios from "axios";
import ApiService from "./api.service";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const mapboxClient = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5",
  timeout: 30000,
});


export default class LocationService extends ApiService {
  fetchPlaces = async (query) => {
    try {
      if (!MAPBOX_TOKEN) {
        throw new Error("Mapbox token is not configured");
      }

      const response = await mapboxClient.get(
        `/mapbox.places/${encodeURIComponent(query.trim())}.json`,
        {
          params: {
            access_token: MAPBOX_TOKEN,
            autocomplete: true,
            limit: 5,
          },
        }
      );
      return response?.data?.features ?? [];

    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch locations";

      throw new Error(message);
    }
  };
}

