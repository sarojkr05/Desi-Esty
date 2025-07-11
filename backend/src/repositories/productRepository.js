import Product from "../models/productSchema.js";

export const createProduct = async (data) => {
    return await Product.create(data);
};

export const findProductById = async (id) => {
    return await Product.findById(id);
};

export const findProductsByArtisan = async (artisanId) => {
    return await Product.find({ artisan: artisanId });
};

export const updateProduct = async (id, data) => {
    return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};