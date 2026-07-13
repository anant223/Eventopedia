import CategoryService from "@/services/category.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

const categoryService = new CategoryService()

export const readCategories = createAsyncThunk(
  "event/category",
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryService.fetchCategories();
      console.log(response)
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Catgory haven't been fetched");
    }
  }
);
