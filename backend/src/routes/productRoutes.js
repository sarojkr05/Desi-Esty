import express from "express";
import {
    createProduct,
    getMyProducts,
    updateMyProduct,
    deleteMyProduct,
    getApprovedProducts,
} from "../controllers/productController.js";
import { protect, } from "../middlewares/authMiddlewares.js";
import { authorizeRoles } from "../middlewares/authorizedRoles.js";


const productRouter = express.Router();

productRouter.use(protect);

productRouter.use(authorizeRoles("artisan")); // Only artisan can access these routes
// All routes are artisan protected


productRouter.post("/add", createProduct);
productRouter.get("/mine", getMyProducts);
productRouter.put("/:id", updateMyProduct);
productRouter.delete("/:id", deleteMyProduct);

// User side product API
productRouter.get("/", getApprovedProducts); // for user side

export default productRouter;