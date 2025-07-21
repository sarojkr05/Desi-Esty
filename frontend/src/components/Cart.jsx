import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Cross } from "lucide-react";
import {
  decreaseProductQuantity,
  getCartDetails,
  increaseProductQuantity,
  removeProductFromCart,
} from "../redux/CartSlice";

const Cart = () => {
  const [localCartItems, setLocalCartItems] = useState([]);
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);

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
    const response =  dispatch(increaseProductQuantity(productId));
    if (response?.payload?._id) {
      fetchCartDetails();
    }
  }

  async function handleDecrement(productId) {
    const response =  dispatch(decreaseProductQuantity(productId));
    if (response?.payload?._id) {
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
    <div className="max-w-5xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-extrabold text-amber-600 mb-6 border-b pb-2">
        Your Shopping Cart
      </h1>

      {localCartItems.length === 0 ? (
        <p className="text-gray-500 text-lg text-center mt-10">
          Your cart is empty 😕
        </p>
      ) : (
        <div className="space-y-8">
          {localCartItems.map((item, index) => (
            <div
              key={item.id || index}
              className="flex flex-col md:flex-row gap-6 items-center border border-amber-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-28 h-28 object-cover rounded-xl border border-gray-200"
              />

              <div className="flex-1 space-y-1 text-center md:text-left">
                <h2 className="text-xl font-semibold text-amber-700">
                  {item.product.title}
                </h2>
                <p className="text-gray-600 text-sm">{item.category}</p>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {item.product.description}
                </p>

                <div className="flex justify-center md:justify-start gap-3 mt-3 items-center">
                  <button
                    onClick={() => handleDecrement(item.product._id)}
                    className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full hover:bg-amber-300 transition"
                  >
                    −
                  </button>
                  <span className="font-medium text-lg">
                    {item.product.quantity}
                  </span>
                  <button
                    onClick={() => handleIncrement(item.product._id)}
                    className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full hover:bg-amber-300 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right space-y-2">
                <p className="text-lg font-bold text-amber-600">
                  ₹ {(item?.product?.price || 0) * item.quantity}
                </p>
                <p className="text-sm text-gray-500">
                  ₹ {item?.product?.price || 0} × {item.quantity}
                </p>

                <button
                  onClick={() => handleRemove(item.product._id)}
                  className="text-red-500 text-sm hover:underline mt-1"
                >
                  ✖ Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right pt-8 border-t mt-8">
            <h2 className="text-2xl font-extrabold text-amber-700">
              Total: ₹ {total.toFixed(2)}
            </h2>
            <button className="mt-5 px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition duration-200">
              🧾 Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
