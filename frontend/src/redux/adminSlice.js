import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    admin: {
        artisans: [],
        products: []
    }
}

export const getAllUnApprovedArtisans = createAsyncThunk("/admin/getUnApprovedArtisans", async () => {
  try {
    const response = axiosInstance.get("/admin/artisans");
    toast.promise(response, {
      loading: "Fetching all unapproved artisans",
      error: "Something went while fetching unapproved artisans",
      success: "Unapproved artisans fetched successfully",
    });
    const apiResponse = await response;
    console.log("res from back", apiResponse)
    return apiResponse.data;
  } catch (error) {
    console.log(error.response);
    if (error?.response?.status === 401) {
      toast.error("Please login to fetch artisans");
      return {
        isUnauthorized: true,
      };
    }
    toast.error("Something went wrong");
  }
});

export const getAllUnApprovedProducts = createAsyncThunk("/admin/getUnApprovedProducts", async () => {
  try {
    const response = axiosInstance.get("/admin/products");
    toast.promise(response, {
      loading: "Fetching all unapproved products",
      error: "Something went while fetching unapproved products",
      success: "Unapproved products fetched successfully",
    });
    const apiResponse = await response;
    return apiResponse.data;
  } catch (error) {
    console.log(error.response);
    if (error?.response?.status === 401) {
      toast.error("Please login to fetch products");
      return {
        isUnauthorized: true,
      };
    }
    toast.error("Something went wrong");
  }
});

export const approveArtisan = createAsyncThunk("/admin/approveArtisan", async (id) => {
  try {
    const response = axiosInstance.patch(`/admin/artisans/${id}/approve`);
    toast.promise(response, {
      loading: "Approving unapproved artisan",
      error: "Something went wrong while approving unapproved artisan",
      success: "artisan approved successfully",
    });
    const apiResponse = await response;
    return apiResponse.data;
  } catch (error) {
    console.log(error.response);
    if (error?.response?.status === 401) {
      toast.error("Please login to approve artisan");
      return {
        isUnauthorized: true,
      };
    }
    toast.error("Something went wrong");
  }
});

export const approveProduct = createAsyncThunk("/admin/approveProduct", async (id) => {
  try {
    const response = axiosInstance.patch(`admin/products/${id}/approve`);
    toast.promise(response, {
      loading: "Approving unapproved product",
      error: "Something went wrong while approving unapproved product",
      success: "products approved successfully",
    });
    const apiResponse = await response;
    return apiResponse.data;
  } catch (error) {
    console.log(error.response);
    if (error?.response?.status === 401) {
      toast.error("Please login to approve product");
      return {
        isUnauthorized: true,
      };
    }
    toast.error("Something went wrong");
  }
});

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUnApprovedArtisans.fulfilled, (state, action) => {
            state.admin.artisans = action.payload;
        })
        builder.addCase(getAllUnApprovedProducts.fulfilled, (state, action) => {
            state.admin.products = action.payload;
        })
    }
})

export default adminSlice.reducer;

