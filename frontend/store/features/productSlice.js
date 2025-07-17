import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/products");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const fetchLatestProducts = createAsyncThunk(
  "product/fetchLatestProducts",
  async (_, thunkAPI) => {
    try {
     const res = await axiosInstance.get("/api/product/latest-products");
      return res.data.data || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    latestProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.latestProducts = action.payload.latestProducts;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch products";
    });
    builder.addCase(fetchLatestProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchLatestProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.latestProducts = action.payload;
    });
    builder.addCase(fetchLatestProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch latest products";
    });
  },
});

export default productSlice.reducer;
