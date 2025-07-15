import { configureStore } from "@reduxjs/toolkit"
import AuthSlice from "../redux/authSlice"
import modalSlice from "../redux/modalSlice"
export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        modal: modalSlice
    }
})