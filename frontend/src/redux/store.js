import { configureStore, createReducer } from "@reduxjs/toolkit"
import AuthSlice from "../redux/authSlice"
import modalSlice from "../redux/modalSlice"
import productSlice from "../redux/productSlice";
import CartSlice from "../redux/CartSlice";
import userSlice from "../redux/userSlice";
export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        modal: modalSlice,
        products: productSlice,
        cart: CartSlice,

        user: userSlice,

    }
})