import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, trim: true },
    comment: { type: String, required: true },

    // Media
    images: [
      {
        url: String,
        caption: String,
      },
    ],
    videoUrl: String,

    isVerifiedPurchase: { type: Boolean, default: false },
    isRecommended: { type: Boolean, default: true },

    // Helpfulness
    helpfulCount: { type: Number, default: 0 },
    notHelpfulCount: { type: Number, default: 0 },

    // Admin moderation
    isApproved: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },

    // Seller response
    sellerResponse: {
      text: String,
      respondedAt: Date,
      respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    },
  },
  { timestamps: true },
);

// Index for efficient queries
reviewSchema.index({ productId: 1, rating: -1 });
reviewSchema.index({ isApproved: 1, createdAt: -1 });

export default mongoose.model("Review", reviewSchema);
