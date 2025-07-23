import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";

export const fetchApprovedProducts = createAsyncThunk(
  "products/fetchApproved",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/product");
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch products");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchMyProducts = createAsyncThunk(
  "products/fetchMyProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/products/mine");
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch products");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (productId, thunkAPI) => {
    try {
      await axiosInstance.delete(`/products/${productId}`);
      toast.success("Product deleted successfully");
      return productId;
    } catch (error) {
      toast.error("Failed to delete product");
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);
//artisan
export const createProduct = createAsyncThunk(
  "products/create",
  async (productData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/products/add", productData);
      toast.success("Product created successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to create product");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/products/${id}`, updatedData);
      toast.success("Product updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update product");
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    myProducts: [],
    prods: [],
    eProds: [],
    loading: false,
    error: null,
  },
  reducers: {},
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
      })

      .addCase(fetchMyProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.myProducts = action.payload;
      })
      .addCase(fetchMyProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch all products";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.prods = state.prods.filter(
          (product) => product._id !== action.payload
        );
        state.myProducts = state.myProducts.filter(
          (product) => product._id !== action.payload
        );
        state.eProds = state.eProds.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;

        state.prods = state.prods.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );

        state.myProducts = state.myProducts.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );

        state.eProds = state.eProds.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
      });
  },
});
export default productSlice.reducer;
