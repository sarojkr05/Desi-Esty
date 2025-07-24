import { configureStore } from "@reduxjs/toolkit"
import AuthSlice from "../redux/authSlice"
import modalSlice from "../redux/modalSlice"
import productSlice from "../redux/productSlice";
<<<<<<< HEAD
import CartSlice from "../redux/CartSlice";
=======
import cartSlice from "../redux/CartSlice";
>>>>>>> 97d45a6c12f416de7b0f9966fbeaf93171787895
import userSlice from "../redux/userSlice";
export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        modal: modalSlice,
        products: productSlice,
<<<<<<< HEAD
        cart: CartSlice,

        user: userSlice,

=======
        cart: cartSlice,
        user:userSlice,
>>>>>>> 97d45a6c12f416de7b0f9966fbeaf93171787895
    }
});
