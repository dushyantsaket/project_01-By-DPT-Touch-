import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js"; // ADD THIS
import Coupon from "../models/Coupon.js"; // ADD THIS
import Product from "../models/Product.js";
import Payment from "../models/Payment.js";
import Lead from "../models/Lead.js";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Get order summary for checkout
router.get("/checkout/summary", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId",
      "title sellingPrice mrp images discountPercent fsn",
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let mrpTotal = 0;
    let sellingPriceTotal = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = item.productId;
      const itemTotal = product.sellingPrice * item.quantity;
      const itemMrpTotal = product.mrp * item.quantity;

      mrpTotal += itemMrpTotal;
      sellingPriceTotal += itemTotal;

      orderItems.push({
        productId: product._id,
        productTitle: product.title,
        quantity: item.quantity,
        price: product.sellingPrice,
        total: itemTotal,
        imageUrl: product.images[0]?.url,
        fsn: product.productId,
      });
    }

    const totalDiscount = mrpTotal - sellingPriceTotal;
    const platformFee = 7;
    let grandTotal = sellingPriceTotal + platformFee;

    let couponDiscount = 0;
    let appliedCoupon = null;

    if (cart.couponCode) {
      const coupon = await Coupon.findOne({
        code: cart.couponCode.toUpperCase(),
        isActive: true,
      });
      if (coupon) {
        const isValid = await coupon.isValid(req.user._id, sellingPriceTotal);
        if (isValid.valid) {
          couponDiscount = coupon.calculateDiscount(sellingPriceTotal);
          appliedCoupon = {
            code: coupon.code,
            discount: couponDiscount,
            title: coupon.title,
          };
        }
      }
    }

    grandTotal = grandTotal - couponDiscount;
    const codFee = Math.max(21, Math.ceil(grandTotal * 0.02));

    res.json({
      success: true,
      data: {
        items: orderItems,
        totalItems: cart.totalItems,
        pricing: {
          mrpTotal,
          sellingPriceTotal,
          totalDiscount,
          platformFee,
          couponDiscount,
          grandTotal,
          amountPayable: grandTotal,
          codFee,
        },
        appliedCoupon,
        couponCode: cart.couponCode,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Apply coupon
router.post("/apply-coupon", protect, async (req, res) => {
  try {
    const { couponCode } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId",
      "sellingPrice",
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const cartTotal = cart.items.reduce(
      (sum, item) => sum + item.productId.sellingPrice * item.quantity,
      0,
    );

    const coupon = await Coupon.findOne({
      code: couponCode.toUpperCase(),
      isActive: true,
    });
    if (!coupon) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid coupon code" });
    }

    const validation = await coupon.isValid(req.user._id, cartTotal);
    if (!validation.valid) {
      return res
        .status(400)
        .json({ success: false, message: validation.reason });
    }

    cart.couponCode = coupon.code;
    cart.couponDiscount = coupon.calculateDiscount(cartTotal);
    await cart.save();

    res.json({
      success: true,
      message: "Coupon applied successfully",
      data: {
        couponCode: coupon.code,
        discount: cart.couponDiscount,
        title: coupon.title,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove coupon
router.delete("/remove-coupon", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      cart.couponCode = null;
      cart.couponDiscount = 0;
      await cart.save();
    }
    res.json({ success: true, message: "Coupon removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create order (Place Order)
router.post("/create", protect, async (req, res) => {
  try {
    const { paymentMethod, addressId } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId",
      "title sellingPrice mrp images productId",
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const user = await req.user.populate("addresses");
    const shippingAddress = user.addresses.id(addressId);

    if (!shippingAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    let mrpTotal = 0;
    let sellingPriceTotal = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = item.productId;
      if (!product) {
        return res.status(400).json({
          success: false,
          message: "One or more cart items refer to a missing product",
        });
      }
      const availableQuantity = Number(
        product.stock_quantity ?? product.stock ?? 0,
      );
      if (availableQuantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Product ${product.title} has only ${availableQuantity} item(s) available`,
        });
      }

      const sellingPrice = Number(
        product.sellingPrice ?? product.price_inr ?? product.price ?? 0,
      );
      const mrpValue = Number(
        product.mrp ??
          product.mrp_inr ??
          product.price ??
          product.price_inr ??
          sellingPrice,
      );
      const itemTotal = sellingPrice * item.quantity;
      const itemMrpTotal = mrpValue * item.quantity;

      mrpTotal += itemMrpTotal;
      sellingPriceTotal += itemTotal;

      orderItems.push({
        productId: product._id,
        productTitle: product.title,
        quantity: item.quantity,
        price: sellingPrice,
        mrp: mrpValue,
        total: itemTotal,
        imageUrl: product.images?.[0] || product.image || "",
        fsn: product.productId,
      });
    }

    const platformFee = 7;
    let codFee = 0;
    if (paymentMethod === "COD") {
      codFee = Math.max(21, Math.ceil(sellingPriceTotal * 0.02));
    }

    let couponDiscount = 0;
    if (cart.couponCode) {
      const coupon = await Coupon.findOne({
        code: cart.couponCode.toUpperCase(),
      });
      if (coupon) {
        const isValid = await coupon.isValid(req.user._id, sellingPriceTotal);
        if (isValid.valid) {
          couponDiscount = coupon.calculateDiscount(sellingPriceTotal);
          coupon.usedCount += 1;
          await coupon.save();
        }
      }
    }

    const totalDiscount = mrpTotal - sellingPriceTotal + couponDiscount;
    const totalFees = platformFee + codFee;
    const grandTotal = sellingPriceTotal + totalFees - couponDiscount;
    const amountPayable = grandTotal;

    const order = new Order({
      userId: req.user._id,
      items: orderItems,
      mrpTotal,
      sellingPriceTotal,
      couponDiscount,
      couponCode: cart.couponCode,
      platformFee,
      codFee,
      totalDiscount,
      totalFees,
      grandTotal,
      amountPayable,
      paymentMethod,
      shippingAddress,
      orderStatus: "PLACED",
      deliveryStatus: "PENDING",
      paymentStatus: paymentMethod === "COD" ? "PENDING" : "PENDING",
    });

    await order.save();

    // Reserve stock for the order
    await Promise.all(
      order.items.map((item) =>
        Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity },
        }),
      ),
    );

    const payment = new Payment({
      orderId: order._id,
      userId: req.user._id,
      amount: amountPayable,
      method: paymentMethod,
      status: paymentMethod === "COD" ? "PENDING" : "INITIATED",
    });
    await payment.save();

    // Clear cart
    cart.items = [];
    cart.couponCode = null;
    cart.couponDiscount = 0;
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: {
        orderId: order.orderId,
        order: order,
        paymentId: payment.paymentId,
        amountPayable,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get order by ID
router.get("/:orderId", protect, async (req, res) => {
  try {
    const order = await Order.findOne({
      orderId: req.params.orderId,
      userId: req.user._id,
    }).populate("items.productId", "title images sellingPrice");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const payment = await Payment.findOne({ orderId: order._id });

    res.json({
      success: true,
      data: { order, payment },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all orders for user
router.get("/", protect, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = { userId: req.user._id };
    if (status) query.orderStatus = status;

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select(
        "orderId orderStatus paymentMethod amountPayable createdAt items",
      );

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: orders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Cancel order
router.post("/:orderId/cancel", protect, async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await Order.findOne({
      orderId: req.params.orderId,
      userId: req.user._id,
    });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (order.orderStatus !== "PLACED" && order.orderStatus !== "CONFIRMED") {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled at this stage",
      });
    }

    order.orderStatus = "CANCELLED";
    order.cancellationReason = reason;
    order.cancelledAt = new Date();

    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: item.quantity },
      });
    }

    await order.save();

    if (order.paymentMethod !== "COD" && order.paymentStatus === "COMPLETED") {
      const payment = await Payment.findOne({ orderId: order._id });
      if (payment) {
        payment.status = "REFUNDED";
        payment.refundAmount = order.amountPayable;
        payment.refundedAt = new Date();
        payment.refundReason = reason;
        await payment.save();
      }
    }

    res.json({ success: true, message: "Order cancelled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Public checkout endpoint
router.post("/request", async (req, res) => {
  try {
    const { customerInfo, items, pricing = {}, paymentMethod = "COD" } = req.body;
    if (!customerInfo?.name || !customerInfo?.phone) {
      return res.status(400).json({
        success: false,
        error: "Customer name and mobile number are required",
      });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Order items are required" });
    }

    let user = await User.findOne({ email: customerInfo.email || `${customerInfo.phone}@local.dpt` });
    if (!user) {
      user = await User.create({
        name: customerInfo.name,
        email: customerInfo.email || `${customerInfo.phone}@local.dpt`,
        phone: customerInfo.phone,
        password: `order-${Date.now()}-${Math.random()}`,
        role: "customer",
      });
    }

    const orderItems = [];
    for (const item of items) {
      const productKey = item._id || item.id || item.productId;
      let product = productKey ? await Product.findById(productKey).catch(() => null) : null;
      if (!product) {
        product = await Product.create({
          name: item.name || item.title || "Cart Product",
          category: item.category || "Power Tools",
          brand: item.brand || "DPT",
          price_inr: Number(item.price_inr || item.sale_price || item.price || 0),
          mrp_inr: Number(item.mrp_inr || item.regular_price || item.price_inr || item.price || 0),
          stock_quantity: Number(item.stock_quantity || 100),
          image: item.image || "",
          isAdminAdded: false,
        });
      }

      const price = Number(item.price_inr || item.sale_price || item.price || 0);
      const mrp = Number(item.mrp_inr || item.regular_price || price);
      const quantity = Math.max(Number(item.quantity || 1), 1);
      orderItems.push({
        productId: product._id,
        productTitle: item.name || item.title || product.name,
        quantity,
        price,
        mrp,
        total: price * quantity,
        imageUrl: item.image || product.image || "",
        fsn: item.sku || item.productId || product.productId || "",
      });
    }

    const sellingPriceTotal = Number(pricing.subtotal || orderItems.reduce((sum, item) => sum + item.total, 0));
    const shippingCharge = Number(pricing.deliveryFee || 0);
    const grandTotal = Number(pricing.grandTotal || sellingPriceTotal + shippingCharge);
    const sidhiOnly = /sidhi/i.test(`${customerInfo.city || ""} ${customerInfo.address || ""}`);

    const order = await Order.create({
      userId: user._id,
      items: orderItems,
      sellingPriceTotal,
      mrpTotal: orderItems.reduce((sum, item) => sum + item.mrp * item.quantity, 0),
      shippingCharge,
      grandTotal,
      amountPayable: grandTotal,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "PENDING" : "AWAITING_CONFIRMATION",
      shippingAddress: {
        fullName: customerInfo.name,
        phone: customerInfo.phone,
        pincode: customerInfo.pincode || "486661",
        address: customerInfo.address || "Address pending",
        city: customerInfo.city || "Sidhi",
        state: customerInfo.state || "Madhya Pradesh",
      },
      orderStatus: "PLACED",
      deliveryStatus: sidhiOnly ? "PROCESSING" : "PENDING",
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      trackingNumber: `DPT-${Date.now().toString().slice(-6)}`,
      customerNotes: sidhiOnly
        ? "COD available in Sidhi district. Delivery expected within 1-3 days."
        : "COD outside Sidhi needs admin confirmation.",
      timeline: [
        {
          status: "PLACED",
          message: "Order request received from website checkout",
          updatedBy: "customer",
        },
      ],
    });

    await Lead.create({
      customer: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
      address: `${customerInfo.address || ""}, ${customerInfo.city || ""} - ${customerInfo.pincode || ""}`,
      product: orderItems.map((item) => `${item.productTitle} x${item.quantity}`).join(", "),
      type: "Order Request",
      status: "New",
      notes: `Order ${order.orderId} | ${paymentMethod} | Total Rs ${grandTotal}`,
    });

    res.status(201).json({
      success: true,
      message: "Order request received",
      data: {
        orderId: order.orderId,
        trackingNumber: order.trackingNumber,
        invoice: {
          invoiceNo: `INV-${order.orderId}`,
          customer: customerInfo.name,
          total: grandTotal,
          items: orderItems,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
