import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items || []);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrderNow = () => {
    if (!name || !place || !address || !phone) {
      alert("Please fill in all fields.");
      return;
    }

    navigate("/order-confirmation");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-20 p-6 bg-white shadow-xl rounded-2xl border border-amber-100">
      <h2 className="text-3xl font-bold text-amber-700 mb-6 text-center">
        Checkout Summary 🛒
      </h2>

      {/* 🛍️ Product Summary */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-amber-800 mb-4">Your Products</h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={item._id || index}
              className="flex items-center justify-between bg-amber-50 p-4 mb-3 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded border"
                />
                <div>
                  <p className="font-medium text-amber-900">{item.title}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
              <div className="text-amber-700 font-semibold text-lg">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))
        )}
        <div className="text-right mt-4 text-xl font-bold text-amber-800">
          Total: ₹{totalAmount.toFixed(2)}
        </div>
      </section>

      {/* 👤 User Details */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-amber-800 mb-4">Your Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Place (City / Town)"
            className="border p-2 rounded w-full"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="border p-2 rounded w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <select
            className="border p-2 rounded w-full"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <textarea
          rows="3"
          placeholder="Complete Delivery Address"
          className="border p-2 rounded w-full mt-4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </section>

      {/* 🚀 Place Order Button */}
      <button
        onClick={handleOrderNow}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-lg py-3 rounded-xl transition"
      >
        ✅ Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
