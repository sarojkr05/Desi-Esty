import { configureStore, createReducer } from "@reduxjs/toolkit"
import AuthSlice from "../redux/authSlice"
import modalSlice from "../redux/modalSlice"
import productSlice from "../redux/productSlice";
<<<<<<< HEAD
import CartSlice from "../redux/CartSlice";
=======
import userSlice from "../redux/userSlice";
>>>>>>> 6bb47a87d6cd45e61792c94991aa2a537a6e145d
export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        modal: modalSlice,
        products: productSlice,
<<<<<<< HEAD
        cart: CartSlice,
       
=======
        user: userSlice,
>>>>>>> 6bb47a87d6cd45e61792c94991aa2a537a6e145d
    }
})