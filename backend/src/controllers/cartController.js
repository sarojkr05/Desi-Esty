import Cart from "../models/cartSchema.js";
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
export const increaseCartQuantity = async (req, res) => {
    try {   
        console.log("=== Increase Cart Quantity Debug ===");
        console.log("req.user:", req.user);
        console.log("req.params:", req.params);
        
        const userId = req.user._id;
        const { productId } = req.params;
        
        console.log("Processed userId:", userId);
        console.log("Processed productId:", productId);
      
        const cart = await Cart.findOne({ user: userId });
        console.log("Cart found:", !!cart);
        
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
      
        const item = cart.items.find((i) => i.product.toString() === productId);
        console.log("Item found:", !!item);
        
        if (!item) return res.status(404).json({ message: 'Item not found in cart' });
      
        console.log("Current quantity:", item.quantity);
        item.quantity += 1;
        console.log("New quantity:", item.quantity);
        
        await cart.save();
        console.log("Cart saved successfully");
        
        res.json({ success: true, data: cart });
    } catch (error) {
        console.log("Error increasing cart quantity", error);
        res.status(500).json({message: "Internal server error", error: error.message});
    }
};


export const decreaseCartQuantity = async (req, res) => {
    console.log('=== decreaseCartQuantity HIT ===', req.params);
    try {
        const userId = req.user._id;
        const { productId } = req.params;
      
        console.log("User ID:", userId);
        console.log("Product ID:", productId);
      
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
      
        const item = cart.items.find((i) => i.product.toString() === productId);
        if (!item) return res.status(404).json({ message: 'Item not found in cart' });
      
        console.log("Item quantity before:", item.quantity);
      
        if (item.quantity > 1) {
          item.quantity -= 1;
          await cart.save();
          res.json({ success: true, data: cart });
        } else {
          res.status(400).json({ message: 'Quantity must be at least 1' });
        }
    } catch (error) {
        console.log("Error decreasing cart quantity", error); // Fixed: was "increasing"
        res.status(500).json({message: "Internal server error", error: error.message});
    }
};
