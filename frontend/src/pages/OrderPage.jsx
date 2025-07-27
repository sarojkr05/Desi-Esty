import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../redux/orderSlice";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);
  const latestOrder =
    Array.isArray(orders) && orders.length > 0
      ? orders[orders.length - 1]
      : null;

  const orderDate = latestOrder
    ? new Date(latestOrder.createdAt).toLocaleString()
    : new Date().toLocaleString();

  const totalAmount = latestOrder?.items?.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  const handleBackToShop = () => {
    navigate("/products");
  };

  return (
    <div className="max-w-3xl mx-auto my-20 p-8 bg-white shadow-2xl rounded-2xl border border-amber-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-amber-600 mb-4">
          🎉 Order Placed Successfully!
        </h1>
        <p className="text-gray-600 text-lg">
          Thank you for your purchase. Your items will be delivered soon!
        </p>
        <p className="text-gray-500 text-sm mt-2">
          <span className="font-medium">Order ID:</span>{" "}
          {latestOrder?._id || "Generating..."}
        </p>
        <p className="text-gray-500 text-sm">
          <span className="font-medium">Order Date:</span> {orderDate}
        </p>
      </div>

      {latestOrder ? (
        <div>
          <h2 className="text-xl font-semibold text-amber-600 mb-4 mt-8">
            Your Order Summary
          </h2>

          <div className="bg-white p-4 rounded shadow">
            <p>
              <strong>Status:</strong> {latestOrder.status}
            </p>
            <p>
              <strong>Total Items:</strong> {latestOrder.items.length}
            </p>

            <h3 className="mt-4 font-semibold">Items:</h3>
            <ul className="list-disc pl-4">
              {latestOrder.items.map((item, idx) => (
                <li key={idx}>
                  {item.product?.title || "Product"} × {item.quantity}
                </li>
              ))}
            </ul>

            <hr className="my-4" />

            <div className="text-right font-bold text-xl text-amber-600 mt-4">
              Total Paid: ₹{totalAmount?.toFixed(2)}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">
          Loading latest order...
        </p>
      )}

      <div className="text-center mt-10">
        <button
          onClick={handleBackToShop}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition"
        >
          🛍️ Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
