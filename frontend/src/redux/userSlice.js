// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch the current user
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/auth/me", {
        withCredentials: true,
      });
      return res.data; // Make sure this is the actual user object
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch current user"
      );
    }
  }
);



export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "/api/users/complete-profile",
        profileData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // important if using cookies
        }
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/auth/profile", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
    userProfile: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.currentUser = null;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.userProfile = action.payload;
    })
    .addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }) .addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    })
    .addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    ;
  },
});

export default userSlice.reducer;
