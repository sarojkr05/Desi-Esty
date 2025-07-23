import express from 'express';
import { getApprovedProducts } from '../controllers/productController.js';
import { protect } from '../middlewares/authMiddlewares.js';

const getAllApprovedProducts = express.Router();

getAllApprovedProducts.use(protect)

// User side product API
getAllApprovedProducts.get("/", getApprovedProducts);

export default getAllApprovedProducts;