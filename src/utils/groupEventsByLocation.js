export const groupEventsByLocation = (events) => {
  const locationGroups = new Map();

  events.forEach((event) => {
    const coords = event.location?.coordinates;

    const coordsArray = Array.isArray(coords)
      ? coords
      : coords?.coordinates;

    
    if (!coordsArray || coordsArray.length < 2) return;


    const lat = parseFloat(coordsArray[1]);
    const lng = parseFloat(coordsArray[0]);

    if (isNaN(lat) || isNaN(lng)) {
      console.log("NaN SKIPPED:", event.title);
      return;
    }

    const key = `${lat.toFixed(5)},${lng.toFixed(5)}`;

    if (!locationGroups.has(key)) {
      locationGroups.set(key, {
        lat,
        lng,
        venueName: event.location.address,
        count: 0,
        events: [],
      });
    }

    const group = locationGroups.get(key);
    group.count++;
    group.events.push(event);
  });

  return locationGroups;
};
