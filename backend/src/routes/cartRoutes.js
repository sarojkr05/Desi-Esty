import express from "express";
import {
  getCartByUser,
  modifyProductTocart,
  clearCartbyId,
  increaseCartQuantity,
  decreaseCartQuantity,
} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddlewares.js";

const cartRouter = express.Router();

cartRouter.use(protect)

cartRouter.get("/",  getCartByUser);

cartRouter.post('/increase/:productId', increaseCartQuantity);
cartRouter.post('/decrease/:productId', decreaseCartQuantity);

cartRouter.post("/:operation/:productId",  modifyProductTocart);
cartRouter.delete("/products",  clearCartbyId);

export default cartRouter;