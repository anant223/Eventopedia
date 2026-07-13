
const DATETIME_FIELDS = {
  startDateTime: ["start", "start-time"],
  endDateTime: ["end", "end-time"],
};

export const eventFormData = (data) => {
  const formData = new FormData();

  formData.append("image", data.img?.[0]);
  formData.append("title", data.title);
  formData.append("desc", data.desc);

  console.log(formData)
  Object.entries(DATETIME_FIELDS).forEach(
    ([backendField, [dateField, timeField]]) => {
      const dateObj = data[dateField];

      console.log(dateObj.time, dateObj.date); // {date:2025-12-30, time: 2:00:00} {date:2025-12-30, time: 3:00:00}

      if (dateObj && dateObj.date && dateObj.time) {
        const combined = new Date(dateObj.date);
        const [hours, minutes] = dateObj.time.split(":");
        combined.setHours(+hours, +minutes);
        console.log(combined);

        formData.append(backendField, combined.toISOString());
      }
    }
  );


  formData.append("category", data.category || "other");
  formData.append(
    "tags",
    Array.isArray(data.tags) ? data.tags.join(",") : data.tags
  );
  formData.append("location", data.location || "Online");
  formData.append("capacity", data.capacity || "100");
  formData.append("eventType", data.eventType || "public");
  formData.append("ticketType", data.ticketType || "free");
  formData.append("requireApproval", data.requireApproval || "false");

  return formData;
};
