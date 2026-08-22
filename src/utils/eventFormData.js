export const buildEventFormData = (data) => {
  const fd = new FormData();
  fd.append("title", data.title);
  fd.append("desc", data.desc || " ");
  fd.append("category", data.category);
  fd.append("startDateTime", data.startDateTime);
  fd.append("endDateTime", data.endDateTime);
  fd.append("eventType", data.eventType);
  fd.append("ticketType", data.ticketType);
  fd.append("price", data.price || 0);
  fd.append("currency", data.currency);
  fd.append("requireApproval", data.requireApproval);
  fd.append("status", data.status);
  fd.append("eventMode", data.eventMode);

  if (data.image?.file) fd.append("image", data.image.file);

  if (data.eventMode === "in_person" || data.eventMode === "hybrid") {
    if (data.location?.address)
      fd.append("location[address]", data.location.address);
    if (data.location?.city) fd.append("location[city]", data.location.city);
    if (data.location?.state) fd.append("location[state]", data.location.state);
    if (data.location?.country)
      fd.append("location[country]", data.location.country);
    if (data.location?.countryCode)
      fd.append("location[countryCode]", data.location.countryCode);
    if (data.location?.postalCode)
      fd.append("location[postalCode]", data.location.postalCode);
    if (data.location?.placeId)
      fd.append("location[placeId]", data.location.placeId);
    if (data.location?.lat != null)
      fd.append("location[lat]", data.location.lat);
    if (data.location?.lng != null)
      fd.append("location[lng]", data.location.lng);
  }

  if (data.eventMode === "online" || data.eventMode === "hybrid") {
    if (data.online?.platform)
      fd.append("online[platform]", data.online.platform);
    if (data.online?.link) fd.append("online[link]", data.online.link);
    fd.append(
      "online[linkVisibility]",
      data.online?.linkVisibility || "attendees_only"
    );
    if (data.totalTickets) fd.append("totalTickets", data.totalTickets);
  }

  data.tags?.forEach((t) => fd.append("tags[]", t));

  return fd;
};
