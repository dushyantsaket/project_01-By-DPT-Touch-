import express from "express";
import Coupon from "../models/Coupon.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// Get available coupons for user
router.get("/available", protect, async (req, res) => {
  try {
    const now = new Date();
    const coupons = await Coupon.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
      $or: [
        { eligibleUserIds: { $size: 0 } },
        { eligibleUserIds: req.user._id },
      ],
    }).select(
      "code title discountType discountValue maxDiscountAmount minOrderAmount",
    );

    res.json({ success: true, data: coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create coupon (Admin only)
router.post("/", protect, admin, async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all coupons (Admin only)
router.get("/", protect, admin, async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json({ success: true, data: coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update coupon (Admin only)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ success: true, data: coupon });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete coupon (Admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Coupon deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
