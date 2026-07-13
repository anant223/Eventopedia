
const formatDuration = (start, end) => {
  const diffMs = new Date(end) - new Date(start);

  const hours = Math.floor(diffMs / 3600000);
  const minutes = Math.floor(diffMs % 3600000) / 60000;

  return hours > 0 ? `${hours}h - ${minutes}M` : `${minutes}m`;
};


const isExpired = (endDateTime) => {
  const currentDate = new Date();
  const endDate = new Date(endDateTime);

  if (currentDate > endDate) {
    return "Expired";
  }

  if (currentDate <= endDate) {
    return "Live";
  }

  return "Upcoming";
};

export {formatDuration, isExpired}