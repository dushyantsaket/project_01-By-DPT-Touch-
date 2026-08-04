import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    paymentId: { type: String, required: true, unique: true },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Payment Details
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
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

    // Gateway Response
    gatewayName: String,
    gatewayOrderId: String,
    gatewayPaymentId: String,
    gatewaySignature: String,
    gatewayResponse: mongoose.Schema.Types.Mixed,

    // Card Details (masked)
    cardLastFour: String,
    cardType: String,
    cardNetwork: String,

    // UPI Details
    upiId: String,
    upiTransactionId: String,

    // EMI Details
    emiBankCode: String,
    emiTenure: Number,
    emiInterestRate: Number,
    emiMonthlyAmount: Number,

    // Status
    status: {
      type: String,
      enum: ["INITIATED", "PENDING", "SUCCESS", "FAILED", "REFUNDED"],
      default: "INITIATED",
    },

    // Refund Details
    refundAmount: Number,
    refundId: String,
    refundedAt: Date,
    refundReason: String,

    // Metadata
    metadata: mongoose.Schema.Types.Mixed,

    // Failure Details
    failureCode: String,
    failureMessage: String,
  },
  { timestamps: true },
);

// Auto-generate payment ID
paymentSchema.pre("save", async function (next) {
  if (!this.paymentId) {
    const date = new Date();
    const prefix = "PAY";
    const timestamp = date.getTime().toString().slice(-10);
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    this.paymentId = `${prefix}${timestamp}${random}`;
  }
  next();
});

export default mongoose.model("Payment", paymentSchema);
