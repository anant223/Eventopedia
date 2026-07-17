import axios from "axios";
import ApiService from "./api.service";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const mapboxClient = axios.create({
  baseURL: "https://api.mapbox.com",
  timeout: 30000,
});
export default class LocationService extends ApiService {
    fetchPlaces = async (query) => {
      try {
          if (!MAPBOX_TOKEN) {
            throw new Error("Mapbox token is not configured");
          }

          const trimmedQuery = query?.trim();
          if (!trimmedQuery || trimmedQuery.length < 2) {
            return [];
          }

          const response = await mapboxClient.get(
            `/geocoding/v5/mapbox.places/${encodeURIComponent(
            query.trim()
            )}.json`,
            {
              params: {
                access_token: MAPBOX_TOKEN,
                autocomplete: true,
                types: "place,locality,region",
                limit: 5,
              },
            }
          );
          const features = response?.data?.features;
  
          if (!features || features.length === 0) {
            return [];
          }

          return features.map((place) => {
            const countryContext = place.context?.find((c) =>
              c.id.startsWith("country")
            );

          const regionContext = place.context?.find((c) =>
            c.id.startsWith("region")
          );

          return {
            type: "Point",
            coordinates: [place.center[0], place.center[1]],
            city: place.text,
            country: countryContext?.text || "",
            region: regionContext?.text || "",
            formattedAddress: place.place_name,
            placeId: place.id,
          };
        });
     } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch locations";

      throw new Error(message);
     }
  }
}

