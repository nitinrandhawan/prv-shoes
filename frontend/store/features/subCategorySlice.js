import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSubCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/api/subcategory");
      return res.data.data || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState: {
    subCategories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSubCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSubCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.subCategories = action.payload;
    });
    builder.addCase(fetchSubCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch categories";
    });
  },
});

export default subCategorySlice.reducer;