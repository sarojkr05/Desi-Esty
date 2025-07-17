import Cart from "../models/cartSchema.js";
import Product from "../models/productSchema.js";

export const getCartByUserId = async (userId) => {
    let cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
    }
    return cart;
};

export const modifyProductInCart = async (userId, productId, operation) => {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
    }

    const productIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
    );

    if (operation === "add") {
        if (productIndex >= 0) {
            cart.items[productIndex].quantity += 1;
        } else {
            cart.items.push({ product: productId, quantity: 1 });
        }
    } else if (operation === "remove") {
        if (productIndex >= 0) {
            if (cart.items[productIndex].quantity > 1) {
                cart.items[productIndex].quantity -= 1;
            } else {
                cart.items.splice(productIndex, 1); // remove item
            }
        }
    } else {
        throw new Error("Invalid operation");
    }

    return await cart.save();
};

export const clearCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new Error("Cart not found");
    cart.items = [];
    return await cart.save();
};
