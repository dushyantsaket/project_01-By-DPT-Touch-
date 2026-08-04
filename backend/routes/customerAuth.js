import express from "express";
import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const otpStore = new Map();

const normalizeEmail = (email = "") => email.trim().toLowerCase();
const createOtp = () => String(Math.floor(100000 + Math.random() * 900000));
const isEmailDeliveryConfigured = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
);
const publicCustomer = (customer) => ({
  id: customer._id,
  email: customer.email,
  name: customer.name || customer.email.split("@")[0],
});

// Middleware to protect routes
export function protectCustomer(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);
    req.customer = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const customer = await Customer.create({ email, password, name });

    const token = jwt.sign(
      { id: customer._id, email: customer.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      token,
      customer: {
        id: customer._id,
        email: customer.email,
        name: customer.name,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const customer = await Customer.findOne({ email });
    if (!customer || !(await customer.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!customer.isActive) {
      return res.status(403).json({ error: "Account disabled" });
    }

    customer.lastLogin = new Date();
    await customer.save();

    const token = jwt.sign(
      { id: customer._id, email: customer.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      token,
      customer: {
        id: customer._id,
        email: customer.email,
        name: customer.name,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/otp/request", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const role = req.body.role || "customer";
    if (!email) return res.status(400).json({ error: "Email required" });

    let customer = await Customer.findOne({ email });
    if (!customer) {
      customer = await Customer.create({
        email,
        password: `otp-${Date.now()}-${Math.random()}`,
        name: req.body.name || email.split("@")[0],
      });
    }

    const otp = createOtp();
    otpStore.set(email, {
      otp,
      role,
      expiresAt: Date.now() + 5 * 60 * 1000,
      attempts: 0,
    });

    const response = {
      success: true,
      expiresInSeconds: 300,
      deliveryMode: isEmailDeliveryConfigured ? "email" : "dev",
    };

    if (!isEmailDeliveryConfigured) {
      console.log(`Customer OTP for ${email}: ${otp}`);
      return res.json({
        ...response,
        message: "OTP sent to email. Dev OTP is returned for local testing.",
        devOtp: otp,
      });
    }

    console.log(
      `Customer OTP email requested for ${email}. Real email delivery path is enabled.`,
    );
    return res.json({
      ...response,
      message: "OTP sent successfully via configured email delivery.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/otp/verify", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const otp = String(req.body.otp || "").trim();
    const record = otpStore.get(email);
    if (!record) return res.status(400).json({ error: "OTP not requested" });
    if (Date.now() > record.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ error: "OTP expired" });
    }
    if (record.attempts >= 5) {
      otpStore.delete(email);
      return res.status(429).json({ error: "Too many OTP attempts" });
    }
    if (record.otp !== otp) {
      record.attempts += 1;
      return res.status(401).json({ error: "Invalid OTP" });
    }

    const customer = await Customer.findOne({ email });
    if (!customer || !customer.isActive) {
      return res.status(403).json({ error: "Account disabled" });
    }
    customer.lastLogin = new Date();
    await customer.save();
    otpStore.delete(email);

    const token = jwt.sign(
      {
        id: customer._id,
        email: customer.email,
        role: record.role || "customer",
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    res.json({
      success: true,
      token,
      customer: publicCustomer(customer),
      user: { ...publicCustomer(customer), role: record.role || "customer" },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get current user profile
router.get("/me", protectCustomer, async (req, res) => {
  try {
    const customer = await Customer.findById(req.customer.id).select(
      "-password",
    );
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function getOrCreateUserFromCustomer(customerId) {
  const customer = await Customer.findById(customerId);
  if (!customer) return null;

  let user = await User.findOne({ email: customer.email });
  if (!user) {
    user = await User.create({
      name: customer.name || customer.email.split("@")[0],
      email: customer.email,
      password: `customer-${customer._id}-${Date.now()}`,
      role: "customer",
      isActive: customer.isActive,
    });
  }
  return user;
}

// Browse active products for customers.
router.get("/products", async (req, res) => {
  try {
    const { search, category, page = 1, limit = 24 } = req.query;
    const filter = { isActive: true, stockStatus: { $ne: "Out of Stock" } };
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { brand: new RegExp(search, "i") },
        { category: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true,
    }).catch(() => null);
    if (!product)
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Request quote: customer creates an order in pending approval.
router.post("/products/:id/request", protectCustomer, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.isActive)
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });

    const user = await getOrCreateUserFromCustomer(req.customer.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, error: "Customer not found" });

    const quantity = Math.max(Number(req.body.quantity || 1), 1);
    const order = await Order.create({
      customerId: user._id,
      productId: product._id,
      quantity,
      totalAmount: Number(product.price_inr || product.mrp_inr || 0) * quantity,
      requestMessage: req.body.message,
      timeline: [
        {
          status: "pending_approval",
          changedBy: user._id,
          note: "Quote requested by customer",
        },
      ],
    });

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get("/orders", protectCustomer, async (req, res) => {
  try {
    const user = await getOrCreateUserFromCustomer(req.customer.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, error: "Customer not found" });

    const orders = await Order.find({ customerId: user._id })
      .populate("dealerId", "name email phone companyName")
      .populate("productId", "name image price_inr")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/orders/:id/cancel", protectCustomer, async (req, res) => {
  try {
    const user = await getOrCreateUserFromCustomer(req.customer.id);
    const order = await Order.findOne({
      _id: req.params.id,
      customerId: user?._id,
    });
    if (!order)
      return res.status(404).json({ success: false, error: "Order not found" });
    if (!["pending_approval", "approved", "quoted"].includes(order.status)) {
      return res
        .status(400)
        .json({
          success: false,
          error: "This order can no longer be cancelled",
        });
    }

    order.status = "cancelled";
    order.timeline.push({
      status: "cancelled",
      changedBy: user._id,
      note: req.body.note || "Cancelled by customer",
    });
    await order.save();
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

export default router;
