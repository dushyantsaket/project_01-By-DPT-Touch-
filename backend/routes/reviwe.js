import express from "express";
import mongoose from "mongoose";
import Review from "../models/Review.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Get reviews for a product
router.get("/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, sort = "-createdAt", rating } = req.query;

    const query = { productId, isApproved: true };
    if (rating) query.rating = Number(rating);

    const reviews = await Review.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Review.countDocuments(query);

    // Get rating summary
    const ratingSummary = await Review.aggregate([
      {
        $match: {
          productId: new mongoose.Types.ObjectId(productId),
          isApproved: true,
        },
      },
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      reviews,
      ratingSummary,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create a review
router.post("/", protect, async (req, res) => {
  try {
    const { productId, rating, title, comment, images } = req.body;

    // Check if user has purchased the product
    const hasPurchased = await Order.findOne({
      userId: req.user._id,
      "items.productId": productId,
      orderStatus: "DELIVERED",
    });

    const review = new Review({
      productId,
      userId: req.user._id,
      userName: req.user.name,
      rating,
      title,
      comment,
      images,
      isVerifiedPurchase: !!hasPurchased,
    });

    await review.save();

    // Update product ratings
    const product = await Product.findById(productId);
    if (product && product.updateRatings) {
      await product.updateRatings();
    }

    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Mark review as helpful/unhelpful
router.put("/:reviewId/helpful", protect, async (req, res) => {
  try {
    const { type } = req.body; // 'helpful' or 'notHelpful'
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    if (type === "helpful") {
      review.helpfulCount += 1;
    } else {
      review.notHelpfulCount += 1;
    }

    await review.save();
    res.json({ success: true, review });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
