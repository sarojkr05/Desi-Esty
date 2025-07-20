import express from "express";
import {
  getCartByUser,
  modifyProductTocart,
  clearCartbyId,
} from "../controllers/cartController.js";
// import { isLoggedIn } from "../validation/authValidator.js";

const cartRouter = express.Router();

cartRouter.get("/",  getCartByUser);
cartRouter.post("/:operation/:productId",  modifyProductTocart);
cartRouter.delete("/products",  clearCartbyId);

export default cartRouter;
