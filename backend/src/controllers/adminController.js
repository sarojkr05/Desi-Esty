import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";

export const getUnapprovedArtisans = async (req, res) => {
  const artisans = await User.find({ role: "artisan", isApproved: false });
  res.status(200).json(artisans);
};

export const approveArtisan = async (req, res) => {
  const artisan = await User.findById(req.params.id);
  if (!artisan || artisan.role !== "artisan") {
    return res.status(404).json({ message: "Artisan not found" });
  }
  artisan.isApproved = true;
  await artisan.save();
  res.status(200).json({ message: "Artisan approved" });
};
export const getUnapprovedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isApproved: false }).populate("artisan", "name email");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch unapproved products" });
  }
};
export const approveProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.isApproved = true;
    await product.save();

    res.status(200).json({ message: "Product approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to approve product" });
  }
};