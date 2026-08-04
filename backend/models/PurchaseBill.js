import mongoose from "mongoose";

const PurchaseBillSchema = new mongoose.Schema({
  billNo: { type: String, unique: true },
  date: { type: Date, default: Date.now },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Party" },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      quantity: Number,
      purchasePrice: Number,
      total: Number,
    },
  ],
  subtotal: Number,
  gstTotal: Number,
  grandTotal: Number,
  paymentStatus: {
    type: String,
    enum: ["paid", "pending", "partial"],
    default: "pending",
  },
  billImage: String, // Uploaded bill image
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.PurchaseBill ||
  mongoose.model("PurchaseBill", PurchaseBillSchema);
