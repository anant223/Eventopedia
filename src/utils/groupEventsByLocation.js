export const groupEventsByLocation = (events) => {
  const locationGroups = new Map();

  events.forEach((event) => {
    const lat = parseFloat(event.location?.lat);
    const lng = parseFloat(event.location?.lng);

    if (isNaN(lat) || isNaN(lng)) return;

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
