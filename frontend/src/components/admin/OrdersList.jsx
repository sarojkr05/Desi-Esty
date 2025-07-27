import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../redux/orderSlice";

const OrdersList = () => {
  const dispatch = useDispatch();
  const { adminOrders, loading, error } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
   <div className="p-6">
  <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Orders</h2>

  {adminOrders.length === 0 ? (
    <p className="text-gray-600">No orders found</p>
  ) : (
    <div className="grid gap-4">
      {adminOrders.map((order) => (
        <div
          key={order._id}
          className="p-5 bg-white shadow-xl rounded-xl hover:shadow-xl transition-shadow"
        >
          <p className="text-sm text-gray-500 mb-1">
            <span className="font-medium text-gray-700">Order ID:</span> {order._id}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            <span className="font-medium text-gray-700">User:</span> {order.user?.name || "Unknown"}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            <span className="font-medium text-gray-700">Total:</span> ₹{order.totalAmount}
          </p>
          <p className="text-sm text-gray-500 mb-3">
            <span className="font-medium text-gray-700">Status:</span> {order.status}
          </p>

        
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default OrdersList;

