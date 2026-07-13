import mapboxgl from "mapbox-gl";

export const fitMapBounds = ({map, events}) => {
  const validCoords = events
    .map((e) => [parseFloat(e.location?.lng), parseFloat(e.location?.lat)])
    .filter(([lng, lat]) => !isNaN(lng) && !isNaN(lat));

  if (validCoords.length === 0) return;

  const bounds = validCoords.reduce(
    (b, coord) => b.extend(coord),
    new mapboxgl.LngLatBounds(validCoords[0], validCoords[0])
  );

  map.fitBounds(bounds, {
    padding: { top: 60, bottom: 60, left: 60, right: 100 },
    maxZoom: 12,
    duration: 800,
  });
};
