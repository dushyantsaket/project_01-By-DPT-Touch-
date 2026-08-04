import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get user's cart
router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id })
      .populate('items.productId', 'title sellingPrice mrp images discountPercent');
    
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
      await cart.save();
    }
    
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add item to cart
router.post('/add', protect, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    const product = await Product.findById(productId);
    if (!product || !product.isInStock) {
      return res.status(400).json({ success: false, message: 'Product not available' });
    }
    
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }
    
    const existingItem = cart.items.find(
      item => item.productId.toString() === productId
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        priceAtAdd: product.sellingPrice
      });
    }
    
    await cart.save();
    await cart.populate('items.productId', 'title sellingPrice mrp images');
    
    res.json({ success: true, cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update cart item quantity
router.put('/update', protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    
    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not in cart' });
    }
    
    if (quantity <= 0) {
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    } else {
      item.quantity = quantity;
    }
    
    await cart.save();
    await cart.populate('items.productId', 'title sellingPrice mrp images');
    
    res.json({ success: true, cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Remove item from cart
router.delete('/remove/:productId', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(
      item => item.productId.toString() !== req.params.productId
    );
    
    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    res.status(400).json({ success:}) false, message: error.message }); 


// Clear cart
router.delete('/clear', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }   

    cart.items = [];
    await cart.save();
    res.json({ success: true, cart });
}} catch (error) {
    res.status(400).json({ success: false, message: error.message });
});

export default router;