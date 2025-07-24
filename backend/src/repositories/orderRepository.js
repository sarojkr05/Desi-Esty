import Order from "../models/orderSchema.js";

export const createOrder = async ({ user, items, totalAmount, address }) => {
  const order = new Order({
    user,
    items,
    totalAmount,
    address,
  });

  return await order.save();
};

export const getOrdersByUserId = async (userId) => {
  return await Order.find({ user: userId }).populate("items.product");
};

export const getAllOrdersFromDB = async () => {
  return await Order.find({})
    .populate("user", "name email")
    .populate("items.product", "title price artisan");
};
export const findOrderById = async (orderId) => {
  return await Order.findById(orderId);
};

export const updateOrderStatus = async (orderId, newStatus) => {
  return await Order.findByIdAndUpdate(
    orderId,
    { status: newStatus },
    { new: true }
  );
};