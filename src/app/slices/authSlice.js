import {
  fetchCurrentUser,
  signup,
  login,
  logout,
  updateProfile,
  fetchHistory,
  onBoardingComplete,
  updatingPreferences,
  notificationPreferences,
  changeEmail,
  emailUpdateConfirmation,
  updateLocation
} from "@/features/authActions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userEvents: {
    organized: null,
    attended: null,
  },
  user: null,
  loading: true,
  initialized: false,
  isUserEventsLoading: false,
  preferencesLoading: false,
  notificationLoading: false,
  errors: {
    auth: null,
    updateProfile: null,
    changeEmail: null,
    onboarding: null,
    fetchHistory: null,
    preferences: null,
    notifications: null,
    location: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state, action) => {
      state.errors[action.payload] = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.userEvents = { organized: null, attended: null };
      state.errors = {
        auth: null,
        updateProfile: null,
        changeEmail: null,
        onboarding: null,
        fetchHistory: null,
        preferences: null,
        notifications: null,
      };
      
    },
    localNotificationPreferances: (state, action) => {
      const { key, value } = action.payload;
      state.user.notificationPreferences[key] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.errors.auth = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.errors.auth = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.errors.auth = null;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.initialized = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.initialized = true;
        if (action.payload?.status !== 401) {
          state.errors.auth = action.payload;
        }
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.userEvents = { organized: null, attended: null };
        state.initialized = true;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.errors.auth = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.initialized = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.initialized = true;
        if (action.payload?.status !== 401) {
          state.errors.auth = action.payload;
        }
      })
      .addCase(updateProfile.pending, (state) => {
        state.errors.updateProfile = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const { name, bio, avatar } = action.payload;
        if (!state.user) return;
        if (name) state.user.name = name;
        if (bio) state.user.bio = bio;
        if (avatar) state.user.avatar = avatar;
        state.errors.updateProfile = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.errors.updateProfile = action.payload;
      })
      .addCase(fetchHistory.pending, (state) => {
        state.isUserEventsLoading = true;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.userEvents.organized = action.payload.history.organizedEvent;
        state.userEvents.attended = action.payload.history.attendedEvent;
        state.isUserEventsLoading = false;
        state.errors.fetchHistory = null;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.userEvents.attended = null;
        state.userEvents.organized = null;
        state.isUserEventsLoading = false;
        state.errors.fetchHistory = action.payload;
      })
      .addCase(onBoardingComplete.pending, (state) => {
        state.errors.onboarding = null;
      })
      .addCase(onBoardingComplete.fulfilled, (state, action) => {
        if (!state.user) return;

        const {
          onboardingCompleted,
          preferredCategories,
          interests,
          location,
        } = action.payload;

        state.user.onboardingCompleted = onboardingCompleted;
        state.user.preferredCategories = preferredCategories;
        state.user.interests = interests;

        if (location) {
          state.user.location = {
            ...state.user.location,
            city: location.city,
            country: location.country,
          };
        }

        state.errors.onboarding = null;
      })
      .addCase(onBoardingComplete.rejected, (state, action) => {
        state.errors.onboarding = action.payload;
      })
      .addCase(notificationPreferences.pending, (state) => {
        state.notificationLoading = true;
        state.errors.notifications = null;
      })
      .addCase(notificationPreferences.fulfilled, (state, action) => {
        if (!state.user) return;
        const { key, value } = action.payload;
        state.user.notificationPreferences[key] = value;
        state.notificationLoading = false;
        state.errors.notifications = null;
      })
      .addCase(notificationPreferences.rejected, (state, action) => {
        state.notificationLoading = false;
        state.errors.notifications = action.payload;
      })
      .addCase(updatingPreferences.pending, (state) => {
        state.preferencesLoading = true;
        state.errors.preferences = null;
      })
      .addCase(updatingPreferences.fulfilled, (state, action) => {
        const { action: type, category } = action.payload;
        if (type === "added") {
          state.user.preferredCategories.push(category._id);
        }
        if (type === "removed") {
          state.user.preferredCategories =
            state.user.preferredCategories.filter((id) => id !== category._id);
        }
        state.preferencesLoading = false;
      })
      .addCase(updatingPreferences.rejected, (state, action) => {
        state.preferencesLoading = false;
        state.errors.preferences = action.payload;
      })
      .addCase(changeEmail.pending, (state) => {
        state.errors.changeEmail = null;
      })
      .addCase(changeEmail.fulfilled, () => {
        //------------nothing-----------
      })
      .addCase(changeEmail.rejected, (state, action) => {
        state.errors.changeEmail = action.payload;
      })
      .addCase(emailUpdateConfirmation.pending, (state) => {
        state.errors.changeEmail = null;
      })
      .addCase(emailUpdateConfirmation.fulfilled, (state, action) => {
        const { newEmail } = action.payload;
        state.user.email = newEmail;
      })
      .addCase(emailUpdateConfirmation.rejected, (state, action) => {
        state.errors.changeEmail = action.payload;
      })
      .addCase(updateLocation.pending, (state) => {
        state.errors.location = null;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        const {location} = action.payload;
        if(location){
          state.user.location = {
            city: location.city,
            country: location.country,
            coordinates: location.coordinates,
          };
        }
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.errors.location = action.payload;
      });
  },
});


export const { clearError, clearUser, localNotificationPreferances} = authSlice.actions;
export default authSlice.reducer;



