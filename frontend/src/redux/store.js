import { configureStore } from "@reduxjs/toolkit"
import AuthSlice from "../redux/authSlice"
export const store = configureStore({
    reducer: {
        auth: AuthSlice
    }
})