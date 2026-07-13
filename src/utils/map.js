
export const GOOGLE_MAPS_LIBRARIES = ["places", "geometry"];


export const MAP_CONTAINER_STYLE = {
  width: "100%",
  height: "100%",
};


export const DEFAULT_MAP_CENTER = {
  lat: 20.5937,
  lng: 78.9629,
};



export const DEFAULT_ZOOM = 12.5;


export const MAP_OPTIONS = {
  disableDefaultUI: true,
  zoomControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  gestureHandling: "cooperative",
  clickableIcons: false,
  maxZoom: 15,
  minZoom: 11,
  draggableCursor: "default",
};

export const MAP_STYLES = [
  // Base map
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#f1f2f4" }],
  },

  // Labels – very soft
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#b0b3b8" }],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#f1f2f4" }, { weight: 2 }],
  },

  // Water – barely visible
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#e6eaef" }],
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },

  // Roads – soft grey, not white
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#e9eaed" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#dcdde1" }, { weight: 1 }],
  },

  // Highways – slightly stronger but still subtle
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#e4e6ea" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#cfd3d8" }],
  },

  // Landscape
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#f3f4f6" }],
  },

  // Parks – almost neutral
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#eef1ee" }],
  },

  // Hide noisy stuff
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },

  // Administrative borders – ultra subtle
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#d6d8dd" }, { weight: 0.5 }],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [{ visibility: "off" }],
  },
];





export const CLUSTER_OPTIONS = {
  gridSize: 60,
  maxZoom: 15,
  minimumClusterSize: 2,
  styles: [
    {
      textColor: "white",
      textSize: 14,
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='18' fill='%23FF5722' stroke='white' stroke-width='3'/%3E%3C/svg%3E",
      height: 40,
      width: 40,
    },
    {
      textColor: "white",
      textSize: 15,
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Ccircle cx='25' cy='25' r='23' fill='%23FF5722' stroke='white' stroke-width='3'/%3E%3C/svg%3E",
      height: 50,
      width: 50,
    },
    {
      textColor: "white",
      textSize: 16,
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23FF5722' stroke='white' stroke-width='3'/%3E%3C/svg%3E",
      height: 60,
      width: 60,
    },
  ],
};

/**
 * Default marker color
 */
export const DEFAULT_MARKER_COLOR = "#FF5722";

/**
 * Marker icon path (SVG path for location pin)
 */
export const MARKER_ICON_PATH =
  "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z";

/**
 * Marker icon configuration
 */
export const MARKER_ICON_CONFIG = {
  fillOpacity: 1,
  strokeColor: "#ffffff",
  strokeWeight: 2,
  scale: 1.8,
};

/**
 * InfoWindow options
 */
export const INFO_WINDOW_OPTIONS = {
  maxWidth: 320,
};

/**
 * Max zoom when fitting bounds
 */
export const MAX_BOUNDS_ZOOM = 16;
