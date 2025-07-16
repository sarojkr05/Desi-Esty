import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";


export const fetchApprovedProducts = createAsyncThunk(
  "products/fetchApproved",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/products"); 
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch products");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
    name:"products",
    initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers:{

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApprovedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApprovedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.approvedProducts = action.payload;
      })
      .addCase(fetchApprovedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch approved products";
      });
  },
});
export default productSlice.reducer;