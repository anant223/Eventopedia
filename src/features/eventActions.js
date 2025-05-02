import eventService from "../api/eventService";

const createNewEvent = async (data) => {
    try {
      const formData = new FormData();

      if (!data.thumbnail?.[0]) {
        throw new Error("No thumbnail file selected");
      }
      formData.append("thumbnail", data.thumbnail[0]);
      formData.append("tag", data.tag);
      formData.append("title", data.title);
      formData.append("desc", data.desc);
      formData.append("duration", data.duration);
      formData.append("startingDate", data.startingDate);
      formData.append("url", data.url);
      formData.append("eventType", data.eventType);

      // Debug: Log FormData contents
      formData.forEach((value, key) => {
        if (key === "thumbnail") {
          console.log("thumbnail details:", {
            name: value.name,
            type: value.type,
            size: value.size,
          });
        } else {
          console.log(`${key}:`, value);
        }
      });

      const response = await eventService.createEvent(formData, {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      });

      alert("Event has been created successfully");
      console.log(response);
    } catch (error) {
      console.error("Error creating event:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  };

export {createNewEvent}