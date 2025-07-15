import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
  role: localStorage.getItem("role") || "",
  userData: JSON.parse(localStorage.getItem("userData")) || null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (userData) => {
    try {
      const responsePromise = axiosInstance.post("/auth/signup", userData);

      await toast.promise(responsePromise, {
        loading: "Hold back tight, we're registering you...",
        success: (res) => res?.data?.message || "Registration successful!",
        error:
          "Oh, no! Something went wrong during registering. Please try again!",
      });

      const response = await responsePromise;
      return response.data;
    } catch (error) {
      console.log("Login error:", error);
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk("/auth/signin", async (userData) => {
  try {
    const responsePromise = axiosInstance.post("/auth/login", userData);

    console.log("responsePromise", responsePromise);

    await toast.promise(responsePromise, {
      loading: "Hold back tight, we're logging you in...",
      success: (res) => res?.data?.message || "Login successful!",
      error:
        "Oh, no! Something went wrong during login. Please try again!",
    });

    const response = await responsePromise;
    return response.data;
  } catch (error) {
    console.log("Register error:", error);
    throw error;
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const responsePromise = axiosInstance.post("/auth/logout");

    await toast.promise(responsePromise, {
      loading: "Hold back tight, we're logging you out...",
      success: (res) => res?.data?.message || "Logout successful!",
      error: "Oh, no! Something went wrong during logout. Please try again!",
    });

    const response = await responsePromise;
    return response.data;
  } catch (error) {
    console.log("Logout error:", error);
    throw error;
  }
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        // Reducer which will execute when login thunk is fulfilled
        const user = action?.payload?.user;
        const token = action?.payload?.token;

        if (user && token) {
          state.isLoggedIn = true;
          state.role = user.role;
          state.userData = user;
        }

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", user.role);
        localStorage.setItem("userData", JSON.stringify(user));
      })
      .addCase(logout.fulfilled, (state) => {
        // Reducer which will execute when login thunk is fulfilled

        state.isLoggedIn = false;
        state.role = "";
        state.userData = {};

        localStorage.setItem("isLoggedIn", "false");
        localStorage.setItem("role", "");
        localStorage.setItem("userData", JSON.stringify({}));
      });
  },
});

export default AuthSlice.reducer;
