import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  order: {
    orders: [],
    total: 0,
    user: null
  }
}

export const placeOrder = createAsyncThunk(
  "order/place",
  async ({ _id, quantity }, { getState, rejectWithValue }) => {
    const state = getState();
    const user = state.auth?.user;

    try {
      if (!user || user?.isProfileComplete === false) {
        toast.error("Please complete your profile before placing an order.");
        return rejectWithValue("Profile incomplete");
      }

      const orderPromise = axiosInstance.post(`/orders/place/`, { _id, quantity });

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


  export const getMyOrders = createAsyncThunk("/orders/my-order", async () => {
  try {
    const response = axiosInstance.get("/orders/my-order");
    toast.promise(response, {
      loading: "Fetching cart details",
      error: "Something went wrong cannot fetch cart",
      success: "orders fetched successfully",
    });
    const apiResponse = await response;
    return apiResponse.data;
  } catch (error) {
    console.log(error.response);
    if (error?.response?.status === 401) {
      toast.error("Please login to view order details");
      return {
        isUnauthorized: true,
      };
    }
    toast.error("Something went wrong");
  }
});



const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
  },
});

export default orderSlice;