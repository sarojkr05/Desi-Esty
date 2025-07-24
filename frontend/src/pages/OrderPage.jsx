import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items || []);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleBackToShop = () => {
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto my-20 p-8 bg-white shadow-2xl rounded-2xl border border-amber-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-amber-700 mb-4">
          🎉 Order Placed Successfully!
        </h1>
        <p className="text-gray-600 text-lg">
          Thank you for your purchase. Your items will be delivered soon!
        </p>
      </div>

      {/* 📦 Order Summary */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-amber-800 mb-4">Your Order Summary</h2>

        {cartItems.map((item, index) => (
          <div
            key={item._id || index}
            className="flex items-center justify-between p-3 border rounded-lg mb-3 bg-amber-50"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-14 h-14 object-cover rounded"
              />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
            </div>
            <div className="text-amber-700 font-semibold">
              ₹{item.price * item.quantity}
            </div>
          </div>
        ))}

        <div className="text-right font-bold text-xl text-amber-800 mt-4">
          Total Paid: ₹{totalAmount.toFixed(2)}
        </div>
      </div>

      {/* 🔙 Back to Shop */}
      <div className="text-center mt-10">
        <button
          onClick={handleBackToShop}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition"
        >
          🛍️ Back to Shop
        </button>
      </div>
    </div>
  );
};

export default OrderPage;

