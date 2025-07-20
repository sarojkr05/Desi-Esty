import express from "express";
import { protect } from "../middlewares/authMiddlewares.js";
import { approveArtisan, getUnapprovedArtisans } from "../controllers/adminController.js";
import { authorizeRoles } from "../middlewares/authorizedRoles.js";
import { getUnapprovedProducts, approveProduct } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.use(protect); // Ensure admin is logged in
adminRouter.use(authorizeRoles("admin")); // now only admin can access the routes below

adminRouter.get("/artisans", getUnapprovedArtisans);
adminRouter.patch("/artisans/:id/approve", approveArtisan);
adminRouter.get("/products", getUnapprovedProducts);
adminRouter.patch("/products/:id/approve", approveProduct);

export default adminRouter;
