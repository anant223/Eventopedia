import { createSlice } from "@reduxjs/toolkit";
import { readCategories } from "@/features/categoryAction";

const initialState = {
  categories: null,
  isCategoryLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCategories: (state) => {
      state.categories = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(readCategories.pending, (state) => {
        state.isCategoryLoading = true;
        state.error = null;
      })
      .addCase(readCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.isCategoryLoading = false;
      })
      .addCase(readCategories.rejected, (state, action) => {
        state.isCategoryLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearError, clearCategories } = categorySlice.actions;

export default categorySlice.reducer;
