// src/services/orderService.js
import mongoose from "mongoose";
import Order from "../models/orderSchema.js";
import Product from "../models/productSchema.js";
import { clearCartItems } from "../repositories/cartRepository.js"
import { createOrder, getOrdersByUserId ,getAllOrdersFromDB,findOrderById,updateOrderStatus } from "../repositories/orderRepository.js";


export const placeOrderService = async (userId, items, _totalFromClient, address) => {
  if (!items?.length) throw new Error("Items array is required");
  if (!address) throw new Error("Address is required");

  const session = await mongoose.startSession();
  let newOrder;
  try {
    await session.withTransaction(async () => {
      let finalTotal = 0;

      
      for (const item of items) {
        const product = await Product.findById(item.product).session(session);
        if (!product) throw new Error("Product not found");

      
        if (product.quantity < item.quantity) {
          throw new Error(`Insufficient stock for ${product.title}`);
        }

        
        finalTotal += product.price * item.quantity;

        
        product.quantity -= item.quantity;
        await product.save({ session });
      }

      
      newOrder = await createOrder(
        {
          user: userId,
          items,
          totalAmount: finalTotal,
          address,
          status: "ordered"
        },
        session
      );
    });
    console.log("Clearing cart...") 
    await clearCartItems(userId)
  } finally {
    session.endSession();
  }

  return newOrder.populate("items.product");
};


export const getOrdersByUserIdService = async (userId) => {
  return await getOrdersByUserId(userId);
};

export const getAllOrdersService = async () => {
  return await getAllOrdersFromDB();
};




export const cancelOrderService = async (orderId, userId) => {
  const order = await findOrderById(orderId);
  console.log("Status at cancel time:", order.status);
  if (!order) {
    throw new Error("Order not found");
  }

  if (order.user.toString() !== userId.toString()) {
    throw new Error("Unauthorized to cancel this order");
  }

  if (order.status !== "pending") {
    throw new Error("Only pending orders can be cancelled");
  }

  return await updateOrderStatus(orderId, "cancelled");
};