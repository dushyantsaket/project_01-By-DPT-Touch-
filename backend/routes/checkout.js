import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Get checkout details
router.get("/details", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId",
    );
    const user = await User.findById(req.user._id);

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const defaultAddress =
      user.addresses.find((addr) => addr.isDefault) || user.addresses[0];

    res.json({
      success: true,
      cart,
      savedAddresses: user.addresses,
      defaultAddress,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Place Order
router.post("/place-order", protect, async (req, res) => {
  try {
    const { addressId, paymentMethod, couponCode, couponDiscount } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId",
    );
    const user = await User.findById(req.user._id);

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Get shipping address
    const shippingAddress = user.addresses.id(addressId);
    if (!shippingAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    // Prepare order items
    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      productTitle: item.productId.title,
      quantity: item.quantity,
      price: item.priceAtAdd,
      total: item.priceAtAdd * item.quantity,
      imageUrl: item.productId.images[0]?.url,
    }));

    // Calculate totals
    const subtotal = cart.subtotal;
    const discount = cart.totalSavings + (couponDiscount || 0);
    const totalAmount = subtotal - discount;

    // Create order
    const order = new Order({
      userId: req.user._id,
      items: orderItems,
      subtotal,
      discount,
      couponCode,
      couponDiscount: couponDiscount || 0,
      totalAmount,
      paymentMethod,
      shippingAddress,
      orderStatus: "PLACED",
      deliveryStatus: "PENDING",
      paymentStatus: paymentMethod === "COD" ? "PENDING" : "PENDING",
    });

    // await order.save();
    //
    // Clear cart
    // cart.items = [];
    // cart.couponCode = null;
    // cart.couponDiscount = 0;
    // await cart.save();

    // // Update product stock
    // for (const item of cart.items) {
    //   await Product.findByIdAndUpdate(item.productId._id, {
    //     $inc: { stock: -item.quantity },
    //   });
    // }

    await order.save();

    // Update stock FIRST
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: { stock: -item.quantity },
      });
    }

    // Then clear cart
    cart.items = [];
    cart.couponCode = null;
    cart.couponDiscount = 0;
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
