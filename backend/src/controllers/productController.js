import Product from "../models/productSchema.js";
import {
    addNewProduct,
    getArtisanProducts,
    editProduct,
    removeProduct,
} from "../services/ProductService.js";

export const createProduct = async (req, res) => {
    try {
       console.log("Req Body:", req.body);
        console.log("User ID:", req.user?._id);
        const artisanId = req.user._id;
        const product = await addNewProduct(artisanId, req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getMyProducts = async (req, res) => {
    try {
        const products = await getArtisanProducts(req.user._id);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateMyProduct = async (req, res) => {
    try {
        const product = await editProduct(req.params.id, req.user._id, req.body);
        res.status(200).json(product);
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

export const deleteMyProduct = async (req, res) => {
    try {
        await removeProduct(req.params.id, req.user._id);
        res.status(200).json({ message: "Product deleted" });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

// user side product api
export const getApprovedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isApproved: true });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch approved products" });
  }

};
