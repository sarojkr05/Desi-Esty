import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  orders: [],
  adminOrders: [],
  total: 0,
  user: null,
  loading: false,
  error: null,
};

export const placeOrder = createAsyncThunk(
  "order/place",
  async ({ items, totalAmount, address, userId }, { rejectWithValue }) => {

    try {
      const orderPromise = axiosInstance.post(`/orders/place`, {
        userId,
        items,
        totalAmount,
        address,
      });

      const response = await toast.promise(orderPromise, {
        loading: "Placing your order...",
        success: "Order placed successfully!",
        error: "Something went wrong while placing your order.",
      });

      return response.data;
    } catch (error) {
      console.error("Order error:", error);
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("orders/my-orders");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/allorders", {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.orders = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.adminOrders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
