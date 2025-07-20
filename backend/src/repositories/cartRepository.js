import Cart from "../models/cartSchema.js";

export const createCart = async (data) => {
    return await Cart.create(data);
};

export const findCartByUserId = async (userId) => {
    return await Cart.findOne({ user: userId }).populate("items.product");
};

export const updateCart = async (userId, updateData) => {
    return await Cart.findOneAndUpdate(
        { user: userId },
        updateData,
        { new: true, upsert: true }
    );
};

export const clearCartItems = async (userId) => {
    return await Cart.findOneAndUpdate(
        { user: userId },
        { items: [] },
        { new: true }
    );
};

export const deleteCartByUserId = async (userId) => {
    return await Cart.findOneAndDelete({ user: userId });
};
