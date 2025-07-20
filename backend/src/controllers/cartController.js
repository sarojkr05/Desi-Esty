import {
    getCartByUserId,
    modifyProductInCart,
    clearCart
} from "../services/cartService.js";

export const getCartByUser = async (req, res) => {
    try {
        const cart = await getCartByUserId(req.user._id);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const modifyProductTocart = async (req, res) => {
    const { operation, productId } = req.params;
    try {
        const updatedCart = await modifyProductInCart(req.user._id, productId, operation);
        res.json(updatedCart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const clearCartbyId = async (req, res) => {
    try {
        const updatedCart = await clearCart(req.user._id);
        res.json({ message: "Cart cleared", cart: updatedCart });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
