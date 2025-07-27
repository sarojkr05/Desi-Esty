import {
  placeOrderService,
  getOrdersByUserIdService,
  getAllOrdersService,
  cancelOrderService,
} from "../services/orderServices.js";
import { clearCartItems } from "../repositories/cartRepository.js";
import asyncHandler from "express-async-handler";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { items, totalAmount, address } = req.body;

    const order = await placeOrderService(userId, items, totalAmount, address);
    console.log("Order Placed:", order);
    await clearCartItems(userId);

    res.status(201).json(order);
  } catch (error) {
    console.error("Order Error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

export const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await getOrdersByUserIdService(userId);
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await getAllOrdersService();
  console.log(orders, "allorders");
  res.status(200).json(orders);
});

export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id;

    const cancelledOrder = await cancelOrderService(orderId, userId);

    res.status(200).json({
      message: "Order cancelled successfully",
      order: cancelledOrder,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
