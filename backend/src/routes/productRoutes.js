import express from "express";
import {
    createProduct,
    getMyProducts,
    updateMyProduct,
    deleteMyProduct,
    getApprovedProducts,
} from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddlewares.js";

const productRouter = express.Router();
productRouter.use(protect);


// All routes are artisan protected


productRouter.post("/add", createProduct);
productRouter.get("/mine", getMyProducts);
productRouter.put("/:id", updateMyProduct);
productRouter.delete("/:id", deleteMyProduct);

// User side product API
productRouter.get("/", getApprovedProducts); // for user side

export default productRouter;