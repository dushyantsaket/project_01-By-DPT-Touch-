import express from "express";
import mongoose from "mongoose";
import Review from "../models/Review.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const buildQuery = (query) => {
  const filter = { isApproved: true };
  if (query.productId) filter.productId = query.productId;
  if (query.rating) filter.rating = Number(query.rating);
  if (query.verified === "true") filter.isVerifiedPurchase = true;
  if (query.hasMedia === "true")
    filter.$or = [
      { "images.0": { $exists: true } },
      { "videos.0": { $exists: true } },
    ];
  if (query.search) filter.$text = { $search: query.search.trim() };
  return filter;
};

router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const sort = req.query.sort || "-createdAt";
    const filter = buildQuery(req.query);

    const reviews = await Review.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Review.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const stats = await Review.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
          verifiedBuyers: { $sum: { $cond: ["$isVerifiedPurchase", 1, 0] } },
          recommendCount: { $sum: { $cond: ["$isRecommended", 1, 0] } },
          guestReviews: { $sum: { $cond: ["$isGuest", 1, 0] } },
        },
      },
    ]);

    const ratingBreakdown = await Review.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    res.json({
      success: true,
      reviews,
      stats: stats[0] || {
        averageRating: 0,
        totalReviews: 0,
        verifiedBuyers: 0,
        recommendCount: 0,
        guestReviews: 0,
      },
      ratingBreakdown,
      total,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      productId,
      productName,
      userId,
      userName,
      userEmail,
      userPhone,
      location,
      isGuest,
      rating,
      title,
      comment,
      purchaseDate,
      dealerName,
      images,
      videos,
      acceptTerms,
    } = req.body;

    if (!rating || !title || !comment || !userName || !productName) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required review fields.",
      });
    }

    const review = new Review({
      productId: productId ? new mongoose.Types.ObjectId(productId) : null,
      productName,
      userId: isGuest ? null : userId || null,
      userName,
      userEmail,
      userPhone,
      location,
      isGuest: !!isGuest,
      rating,
      title,
      comment,
      purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
      dealerName,
      images: Array.isArray(images) ? images : [],
      videos: Array.isArray(videos) ? videos : [],
      isVerifiedPurchase: false,
      isRecommended: true,
      isApproved: false,
    });

    await review.save();

    res.status(201).json({
      success: true,
      review,
      message: "Review submitted and pending approval.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/:reviewId/report", async (req, res) => {
  try {
    const { reason, details, name } = req.body;
    const review = await Review.findById(req.params.reviewId);
    if (!review)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });

    review.reports.push({
      name: name || "Guest",
      reason,
      details,
    });
    await review.save();

    res.json({ success: true, message: "Report submitted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/:reviewId/helpful", async (req, res) => {
  try {
    const { type } = req.body;
    const review = await Review.findById(req.params.reviewId);
    if (!review)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });

    if (type === "helpful") review.helpfulCount += 1;
    else review.notHelpfulCount += 1;

    await review.save();
    res.json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
