import { useDispatch } from "react-redux";
import {
  decreaseProductQuantity,
  getCartDetails,
  increaseProductQuantity,
  removeProductFromCart,
} from "../redux/CartSlice";
import CartPresentation from "./CartPresentation";
import { useEffect, useState } from "react";

const Cart = () => {
  const [localCartItems, setLocalCartItems] = useState([]);
  const dispatch = useDispatch();


  async function fetchCartDetails() {
    const response = await dispatch(getCartDetails());
    const cart = response?.payload;

    if (cart?.items) {
      setLocalCartItems(cart.items);
    }
  }

  async function handleRemove(productId) {
    const response = await dispatch(removeProductFromCart(productId));
    if (response?.payload?._id) {
      fetchCartDetails();
    }
  }

  async function handleIncrement(productId) {
    const response = await dispatch(increaseProductQuantity(productId));
    if (response?.payload?.success) {
      fetchCartDetails();
    }
  }

  async function handleDecrement(productId) {
    const response = await dispatch(decreaseProductQuantity(productId));
    if (response?.payload?.success) {
      fetchCartDetails();
    }
  }

  useEffect(() => {
    fetchCartDetails();
  }, []);

  const total = localCartItems.reduce(
    (sum, item) => sum + (item?.product?.price || 0) * item.quantity,
    0
  );

  return (
    <CartPresentation 
      localCartItems={localCartItems}
      setLocalCartItems={setLocalCartItems}
      handleDecrement={handleDecrement}
      handleIncrement={handleIncrement}
      handleRemove={handleRemove}
      total={total}
    />
  )
};

export default Cart;
