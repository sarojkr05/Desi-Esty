import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  cartData: {
    items: [],
    total: 0,
    user: null
  }
};

export const addProductToCart = createAsyncThunk(
  "/cart/addProduct",
  async ({ _id, quantity = 1 }) => {
    try {
      const response = axiosInstance.post(`/cart/add/${_id}`, { quantity });
      toast.promise(response, {
        loading: "Adding product to cart",
        error: "Something went wrong cannot add product to cart",
        success: "Product added successfully to the cart",
      });
      const apiResponse = await response;
      return apiResponse.data;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  "/cart/removeProduct",
  async (productId) => {
    try {
      const response = axiosInstance.post(`/cart/remove/${productId}`);
      toast.promise(response, {
        loading: "Removing product from cart",
        error: "Something went wrong cannot remove product from cart",
        success: "Product removed successfully from the cart",
      });
      const apiResponse = await response;
      return apiResponse.data;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
);

export const getCartDetails = createAsyncThunk("/cart/getDetails", async () => {
  try {
    const response = axiosInstance.get("/cart");
    toast.promise(response, {
      loading: "Fetching cart details",
      error: "Something went wrong cannot fetch cart",
      success: "Cart details fetched successfully",
    });
    const apiResponse = await response;
    return apiResponse.data;
  } catch (error) {
    console.log(error.response);
    if (error?.response?.status === 401) {
      toast.error("Please login to view cart details");
      return {
        isUnauthorized: true,
      };
    }
    toast.error("Something went wrong");
  }
});

export const increaseProductQuantity = createAsyncThunk(
  "cart/increaseProduct", // Remove the leading slash
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/cart/increase/${productId}`);
      return response.data;
    } catch (error) {
      toast.error("Couldn't increase product quantity");
      console.log(
        "Increase quantity error:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const decreaseProductQuantity = createAsyncThunk(
  "cart/decreaseProduct", // Remove the leading slash
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/cart/decrease/${productId}`);
      return response.data;
    } catch (error) {
      toast.error("Couldn't decrease product quantity");
      console.log(
        "Decrease quantity error:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectTotalQuantity = (state) => {
  const items = Array.isArray(state.cart.cartData?.items) ? state.cart.cartData.items : [];
  return items.reduce((total, item) => total + (item.quantity || 0), 0);
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartDetails.fulfilled, (state, action) => {
      state.cartData = action.payload;
    });
  },
});

export default cartSlice.reducer;
