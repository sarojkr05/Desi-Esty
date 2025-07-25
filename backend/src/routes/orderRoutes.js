import express from "express";
import { getOrdersByUserId, placeOrder, cancelOrder, getAllOrders  } from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddlewares.js";

const OrderRouter = express.Router();

OrderRouter.post("/place", protect, placeOrder);
OrderRouter.get("/my-orders", protect, getOrdersByUserId);

OrderRouter.patch("/cancel/:orderId", protect, cancelOrder);
export default OrderRouter;
