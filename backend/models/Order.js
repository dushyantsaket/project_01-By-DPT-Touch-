import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productTitle: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  total: { type: Number, required: true },
  imageUrl: String,
  fsn: String,
  listingId: String,
});

const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  pincode: { type: String, required: true },
  address: { type: String, required: true },
  locality: String,
  city: { type: String, required: true },
  state: { type: String, required: true },
  landmark: String,
  addressType: { type: String, enum: ["home", "work"], default: "home" },
});

const paymentDetailsSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: [
      "COD",
      "CREDIT_CARD",
      "DEBIT_CARD",
      "UPI",
      "NET_BANKING",
      "EMI",
      "WALLET",
    ],
    required: true,
  },
  cardType: String,
  bankName: String,
  emiTenure: Number,
  emiMonthlyAmount: Number,
  upiId: String,
  transactionId: String,
  paymentGatewayResponse: mongoose.Schema.Types.Mixed,
});

const feeBreakdownSchema = new mongoose.Schema({
  platformFee: { type: Number, default: 0 },
  paymentHandlingFee: { type: Number, default: 0 },
  shippingCharge: { type: Number, default: 0 },
  couponDiscount: { type: Number, default: 0 },
  mrpDiscount: { type: Number, default: 0 },
  totalFees: { type: Number, default: 0 },
  totalDiscounts: { type: Number, default: 0 },
});

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Order Items
    items: [orderItemSchema],
    totalItems: { type: Number, default: 0 },

    // Pricing
    mrpTotal: { type: Number, required: true },
    sellingPriceTotal: { type: Number, required: true },
    couponDiscount: { type: Number, default: 0 },
    couponCode: String,
    platformFee: { type: Number, default: 0 },
    paymentHandlingFee: { type: Number, default: 0 },
    shippingCharge: { type: Number, default: 0 },
    totalDiscount: { type: Number, default: 0 },
    totalFees: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },
    amountPayable: { type: Number, required: true },

    // Fee Breakdown
    feeBreakdown: feeBreakdownSchema,

    // Payment
    paymentMethod: {
      type: String,
      enum: [
        "COD",
        "CREDIT_CARD",
        "DEBIT_CARD",
        "UPI",
        "NET_BANKING",
        "EMI",
        "WALLET",
      ],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: [
        "PENDING",
        "COMPLETED",
        "FAILED",
        "REFUNDED",
        "AWAITING_CONFIRMATION",
      ],
      default: "PENDING",
    },
    paymentDetails: paymentDetailsSchema,
    paymentId: String,
    paymentGatewayOrderId: String,

    // Delivery
    shippingAddress: addressSchema,
    billingAddress: addressSchema,
    deliveryStatus: {
      type: String,
      enum: [
        "PENDING",
        "PROCESSING",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PENDING",
    },
    trackingNumber: String,
    estimatedDelivery: Date,
    deliveredAt: Date,

    // Order Status
    orderStatus: {
      type: String,
      enum: [
        "PLACED",
        "CONFIRMED",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
        "RETURNED",
      ],
      default: "PLACED",
    },
    cancellationReason: String,
    cancelledAt: Date,
    returnRequested: { type: Boolean, default: false },

    // Offers Applied
    appliedOffers: [
      {
        offerId: String,
        offerType: String,
        discountAmount: Number,
        offerTitle: String,
      },
    ],

    // COD Specific
    codFee: { type: Number, default: 0 },
    isCodAdvance: { type: Boolean, default: false },

    // EMI Specific
    isEmiOrder: { type: Boolean, default: false },
    emiBankCode: String,

    // Gift Card
    giftCardApplied: { type: Boolean, default: false },
    giftCardAmount: { type: Number, default: 0 },

    // Notes
    orderNotes: String,
    customerNotes: String,

    // Employee Assignment
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },

    // Timeline
    timeline: [
      {
        status: String,
        message: String,
        timestamp: { type: Date, default: Date.now },
        updatedBy: String,
      },
    ],
  },
  { timestamps: true },
);

// Pre-save middleware to calculate totals
orderSchema.pre("save", function (next) {
  this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.mrpTotal = this.items.reduce((sum, item) => {
    const itemMrp = Number(item.mrp ?? item.price ?? 0);
    return sum + itemMrp * item.quantity;
  }, 0);
  this.totalDiscount =
    this.mrpTotal - this.sellingPriceTotal + (this.couponDiscount || 0);
  this.totalFees =
    (this.platformFee || 0) +
    (this.paymentHandlingFee || 0) +
    (this.shippingCharge || 0);
  this.grandTotal =
    this.sellingPriceTotal + this.totalFees - this.totalDiscount;
  this.amountPayable = this.grandTotal;

  if (this.paymentMethod === "COD" && this.codFee) {
    this.amountPayable += this.codFee;
    this.grandTotal += this.codFee;
  }
  next();
});

// Auto-generate order ID
orderSchema.pre("save", async function (next) {
  if (!this.orderId) {
    const date = new Date();
    const prefix = "OD";
    const timestamp = date.getTime().toString().slice(-10);
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    this.orderId = `${prefix}${timestamp}${random}`;
  }

  if (this.isModified("orderStatus")) {
    this.timeline.push({
      status: this.orderStatus,
      timestamp: new Date(),
      message: `Order ${this.orderStatus.toLowerCase()}`,
    });
  }
  next();
});

export default mongoose.model("Order", orderSchema);
