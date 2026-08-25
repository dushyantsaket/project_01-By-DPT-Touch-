import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: false,
      index: true,
    },
    productName: { type: String, required: true, trim: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      index: true,
    },
    userName: { type: String, required: true, trim: true },
    userEmail: { type: String, trim: true },
    userPhone: { type: String, trim: true },
    location: { type: String, trim: true },
    isGuest: { type: Boolean, default: false },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, trim: true, required: true },
    comment: { type: String, required: true },
    purchaseDate: { type: Date },
    dealerName: { type: String, trim: true },
    images: [
      {
        url: String,
        caption: String,
      },
    ],
    videos: [
      {
        url: String,
        type: String,
      },
    ],
    isVerifiedPurchase: { type: Boolean, default: false },
    isRecommended: { type: Boolean, default: true },
    helpfulCount: { type: Number, default: 0 },
    notHelpfulCount: { type: Number, default: 0 },
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        name: String,
        message: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    reports: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        name: String,
        reason: String,
        details: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    sellerResponse: {
      text: String,
      respondedAt: Date,
      respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    },
    isApproved: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

reviewSchema.index({ productId: 1, rating: -1 });
reviewSchema.index({ isApproved: 1, createdAt: -1 });

export default mongoose.model("Review", reviewSchema);
