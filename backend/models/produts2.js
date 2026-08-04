import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Basic Info
    productId: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    description: { type: String, required: true },

    // Pricing
    mrp: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    discountPercent: { type: Number, default: 0 },
    cashbackAmount: { type: Number, default: 0 },

    // Images & Media
    images: [
      {
        url: String,
        altText: String,
        isPrimary: { type: Boolean, default: false },
      },
    ],
    videoUrl: String,
    youtubeId: String,

    // Category & Taxonomy
    category: { type: String, required: true, index: true },
    subCategory: { type: String, index: true },
    categoryPath: [{ type: String }],

    // Specifications
    specifications: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Features/Highlights
    highlights: [String],

    // Inventory
    stock: { type: Number, required: true, default: 0 },
    isInStock: { type: Boolean, default: true },

    // Seller Info
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    sellerName: { type: String, required: true },
    fulfilledBy: { type: String, default: "Flipkart" },

    // Delivery
    isServiceable: { type: Boolean, default: true },
    estimatedDelivery: { type: String },
    freeDelivery: { type: Boolean, default: true },
    codAvailable: { type: Boolean, default: true },

    // Returns & Warranty
    returnPolicy: {
      type: String,
      enum: ["7_day_replacement", "30_day_replacement", "no_return"],
      default: "7_day_replacement",
    },
    warranty: { type: String },

    // Ratings
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    totalRatings: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    ratingDistribution: {
      1: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      5: { type: Number, default: 0 },
    },

    // SEO
    slug: { type: String, required: true, unique: true },
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],

    // Status
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },

    // Analytics
    viewCount: { type: Number, default: 0 },
    orderCount: { type: Number, default: 0 },

    // Flash Sale / Offers
    isOnSale: { type: Boolean, default: false },
    saleEndDate: Date,
    saleStartDate: Date,

    // NEP (Lowest price offers)
    nepEnabled: { type: Boolean, default: false },
    nepPrice: Number,
    nepCallout: String,

    // EMI Options
    emiOptions: [
      {
        bankName: String,
        tenureMonths: Number,
        monthlyPayment: Number,
        interestRate: Number,
      },
    ],
  },
  { timestamps: true },
);

// Indexes for better query performance
productSchema.index({ title: "text", description: "text", brand: "text" });
productSchema.index({ category: 1, sellingPrice: 1 });
productSchema.index({ brand: 1, averageRating: -1 });
productSchema.index({ createdAt: -1 });

// Pre-save middleware to calculate discount percent
productSchema.pre("save", function (next) {
  if (this.mrp > 0 && this.sellingPrice > 0) {
    this.discountPercent = Math.round(
      ((this.mrp - this.sellingPrice) / this.mrp) * 100,
    );
  }
  next();
});

// Method to update ratings
productSchema.methods.updateRatings = async function () {
  const Review = mongoose.model("Review");
  const stats = await Review.aggregate([
    { $match: { productId: this._id, isVerified: true } },
    {
      $group: {
        _id: null,
        avgRating: { $avg: "$rating" },
        totalRatings: { $sum: 1 },
        ratingCounts: {
          $push: {
            $cond: [
              { $eq: ["$rating", 5] },
              5,
              {
                $cond: [
                  { $eq: ["$rating", 4] },
                  4,
                  {
                    $cond: [
                      { $eq: ["$rating", 3] },
                      3,
                      { $cond: [{ $eq: ["$rating", 2] }, 2, 1] },
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
    },
  ]);

  if (stats.length > 0) {
    this.averageRating = Math.round(stats[0].avgRating * 10) / 10;
    this.totalRatings = stats[0].totalRatings;

    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    stats[0].ratingCounts.forEach((r) => {
      if (counts[r] !== undefined) counts[r]++;
    });
    this.ratingDistribution = counts;
  }

  await this.save();
};

export default mongoose.model("Product", productSchema);
