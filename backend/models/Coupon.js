import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    title: { type: String, required: true },
    description: String,

    // Discount Details
    discountType: {
      type: String,
      enum: ["PERCENTAGE", "FIXED_AMOUNT"],
      required: true,
    },
    discountValue: { type: Number, required: true },
    maxDiscountAmount: Number,
    minOrderAmount: Number,

    // Usage Limits
    maxUses: { type: Number, default: 1 },
    usedCount: { type: Number, default: 0 },
    perUserLimit: { type: Number, default: 1 },

    // Validity
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    // Applicability
    applicableCategories: [String],
    applicableProducts: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    ],
    applicablePaymentMethods: [String],

    // User Eligibility
    eligibleUserIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isFirstTimeUserOnly: { type: Boolean, default: false },

    // Status
    isActive: { type: Boolean, default: true },

    // Offer ID from Flipkart
    offerId: String,
    offerType: String,
  },
  { timestamps: true },
);

// Check if coupon is valid
couponSchema.methods.isValid = async function (userId, cartTotal) {
  // Check if active
  if (!this.isActive) return { valid: false, reason: "Coupon is inactive" };

  // Check date validity
  const now = new Date();
  if (now < this.startDate)
    return { valid: false, reason: "Coupon not yet started" };
  if (now > this.endDate) return { valid: false, reason: "Coupon has expired" };

  // Check usage limit
  if (this.usedCount >= this.maxUses)
    return { valid: false, reason: "Coupon usage limit reached" };

  // Check minimum order amount
  if (cartTotal < this.minOrderAmount) {
    return {
      valid: false,
      reason: `Minimum order amount of ₹${this.minOrderAmount} required`,
    };
  }

  // Check user eligibility
  if (this.eligibleUserIds && this.eligibleUserIds.length > 0) {
    if (!this.eligibleUserIds.includes(userId)) {
      return { valid: false, reason: "Coupon not applicable for this user" };
    }
  }

  return { valid: true };
};

// Calculate discount amount
couponSchema.methods.calculateDiscount = function (cartTotal) {
  let discount = 0;

  if (this.discountType === "PERCENTAGE") {
    discount = (cartTotal * this.discountValue) / 100;
    if (this.maxDiscountAmount) {
      discount = Math.min(discount, this.maxDiscountAmount);
    }
  } else {
    discount = this.discountValue;
  }

  return Math.min(discount, cartTotal);
};

export default mongoose.model("Coupon", couponSchema);
