import { configureStore } from "@reduxjs/toolkit"
import AuthSlice from "../redux/authSlice"
import modalSlice from "../redux/modalSlice"
import productSlice from "../redux/productSlice";
import cartSlice from "../redux/CartSlice"
import adminSlice from "../redux/adminSlice"
export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        modal: modalSlice,
        products: productSlice,
        cart: cartSlice,
        admin: adminSlice
    }
});
