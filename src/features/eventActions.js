import eventService from "../api/eventService";
import { toast } from "sonner";

// Special handling for combined date/time
const DATETIME_FIELDS = {
  startDateTime: ["start", "start-time"],
  endDateTime: ["end", "end-time"],
};

const createNewEvent = async (data) => {
  try {
    const formData = new FormData();

    // Required fieldss
    formData.append("image", data.img[0]);
    formData.append("title", data.title);
    formData.append("desc", data.desc);

    // Date/time handling (your existing code)
    Object.entries(DATETIME_FIELDS).forEach(
      ([backendField, [dateField, timeField]]) => {
        const date = data[dateField];
        const time = data[timeField];

        if (date && time) {
          const combined = new Date(date);
          const [hours, minutes] = time.split(":");
          combined.setHours(parseInt(hours), parseInt(minutes));
          formData.append(backendField, combined.toISOString());
        }
      }
    );

    // Add missing required fields with default values or from data
    formData.append("category", data.category || "other");

    // Handle tags properly
    const tags = Array.isArray(data.tags) ? data.tags.join(",") : data.tags;
    formData.append("tags", tags);

    formData.append("location", data.location || "Online");
    formData.append("capacity", data.capacity || "100");
    formData.append("eventType", data.eventType || "public");
    formData.append("ticketType", data.ticketType || "free");
    formData.append("requireApproval", data.requireApproval || "false");
    
    const res = await eventService.createEvent(formData);
    console.log("res", res)
    if (res) {
      toast.success("Event has been created successfully");
    }
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export { createNewEvent };
