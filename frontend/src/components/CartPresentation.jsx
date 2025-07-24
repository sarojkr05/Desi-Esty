import { Link, useNavigate } from "react-router-dom";

const CartPresentation = ({ handleDecrement, handleIncrement, handleRemove, localCartItems, total }) => {
  const navigate = useNavigate()
  return (
    <div className="max-w-5xl mx-auto mt-12 p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-600 mb-6 border-b pb-2 text-center sm:text-left">
        Your Shopping Cart
      </h1>

      {localCartItems.length === 0 ? (
        <p className="text-gray-500 text-lg text-center mt-10">
          Your cart is empty 😕
        </p>
      ) : (
        <div className="space-y-6 sm:space-y-8">
          {localCartItems.map((item, index) => (
            <div
              key={item.id || index}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start border border-amber-100 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Product Image */}
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border border-gray-200"
              />

              {/* Product Info */}
              <div className="flex-1 space-y-2 text-center sm:text-left">
                <h2 className="text-lg sm:text-xl font-semibold text-amber-700">
                  {item.product.title}
                </h2>
                <p className="text-gray-600 text-sm">{item.category}</p>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {item.product.description}
                </p>

                {/* Quantity Controls */}
                <div className="flex justify-center sm:justify-start gap-3 mt-3 items-center">
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

              {/* Price and Remove */}
              <div className="text-center sm:text-right space-y-2 mt-4 sm:mt-0">
                <p className="text-lg font-bold text-amber-600">
                  ₹ {(item?.product?.price || 0) * item.quantity}
                </p>
                <p className="text-sm text-gray-500">
                  ₹ {item?.product?.price || 0} × {item.quantity}
                </p>
                <button
                  onClick={() => handleRemove(item.product._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  ✖ Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total & Checkout */}
          <div className="text-center sm:text-right pt-6 border-t mt-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-amber-700">
              Total: ₹ {total.toFixed(2)}
            </h2>
            <button onClick={() => navigate("/checkout")} className="mt-10 w-full sm:w-auto px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition duration-200">
              🧾 Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPresentation
