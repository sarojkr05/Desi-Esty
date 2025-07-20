import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const removeItem = (item) => {
    dispatch(removeFromCart(item));
    toast.success("Item removed from cart!");

  };

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-extrabold text-amber-700 mb-6 border-b pb-2">
         Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg text-center mt-10">Your cart is empty 😕</p>
      ) : (
        <div className="space-y-8">
          {cartItems.map((item, index) => (
            <div
              key={item.id || index}
              className="flex flex-col md:flex-row gap-6 items-center border border-amber-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-28 h-28 object-cover rounded-xl border border-gray-200"
              />

              <div className="flex-1 space-y-1 text-center md:text-left">
                <h2 className="text-xl font-semibold text-amber-800">{item.title}</h2>
                <p className="text-gray-600 text-sm">{item.category}</p>
                <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>

                <div className="flex justify-center md:justify-start gap-3 mt-3 items-center">
                  <button
                    onClick={() => dispatch(decrementQuantity(item.id))}
                    className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition"
                  >
                    −
                  </button>
                  <span className="font-medium text-lg">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(incrementQuantity(item.id))}
                    className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right space-y-2">
                <p className="text-lg font-bold text-amber-700">
                  ₹ {item.price * item.quantity}
                </p>
                <p className="text-sm text-gray-500">
                  ₹ {item.price} × {item.quantity}
                </p>
                <button
                  onClick={() => removeItem(item)}
                  className="text-red-500 text-sm hover:underline mt-1"
                >
                  ✖ Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right pt-8 border-t mt-8">
            <h2 className="text-2xl font-extrabold text-amber-800">
              Total: ₹ {total.toFixed(2)}
            </h2>
            <button
              className="mt-5 px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition duration-200"
              onClick={() => (window.location.href = "/checkout")}
            >
              🧾 Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
