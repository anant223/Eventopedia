import { EventService } from "@/services/index";
import { createAsyncThunk} from "@reduxjs/toolkit";

const eventService = new EventService();

export const createEvent = createAsyncThunk(
  "event/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await eventService.createEvent(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create event");
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "event/delete",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await eventService.deleteEvent(eventId);
      return { eventId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete event");
    }
  }
);

export const updateEvent = createAsyncThunk(
  "event/update",
  async ({ eventId, data }, { rejectWithValue }) => {
    try {
      const response = await eventService.updateEvent(eventId, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update event");
    }
  }
);

export const fetchEventById = createAsyncThunk(
  "event/fetchById",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await eventService.readEvent(eventId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch event");
    }
  }
);

export const fetchAllEvents = createAsyncThunk(
  "event/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await eventService.readEvents();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch events");
    }
  }
);

export const fetchPrivateEvent = createAsyncThunk(
  "event/fetchPrivate",
  async ({ eventId, token }, { rejectWithValue }) => {
    try {
      const response = await eventService.readprivateEvent(eventId, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch private event"
      );
    }
  }
);




export const updateCoHost = createAsyncThunk(
  "event/updateCoHost",
  async ({ eventId, data }, { rejectWithValue }) => {
    try {
      const res = await eventService.updateCoHost(eventId, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update co-hosts"
      );
    }
  }
);

export const inviteUsers = createAsyncThunk(
  "event/inviteUsers",
  async ({ eventId, data }, { rejectWithValue }) => {
    try {
      const res = await eventService.updateUserInvitation(eventId, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to invite users");
    }
  }
);
export const respondInvitation = createAsyncThunk(
  "event/respondInvitation",
  async ({ eventId, data }, { rejectWithValue }) => {
    try {
      const res = await eventService.invitationConfirmation(eventId, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to respond to invitation"
      );
    }
  }
);
export const cancelEvent = createAsyncThunk(
  "event/cancelEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const res = await eventService.cancelEvent(eventId);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to cancel event");
    }
  }
);

export const activateEvent = createAsyncThunk(
  "event/activateEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const res = await eventService.activeEvent(eventId);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to activate event"
      );
    }
  }
);



// likes
export const toggleEventLike = createAsyncThunk(
  "event/toggle-like",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await likeService.toggleEventLike(eventId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to search location"
      );
    }
  }
);
export const eventLikes = createAsyncThunk(
  "event/event-likes",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await likeService.getEventLikedUsers(eventId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to search location"
      );
    }
  }
);
export const userLikeHistory = createAsyncThunk(
  "event/events-like",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await likeService.getLikedEventsByUser(eventId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to search location"
      );
    }
  }
);

