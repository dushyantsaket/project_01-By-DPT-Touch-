import mongoose from "mongoose";

const DealerApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    businessName: String,
    gstNumber: String,
    panNumber: String,
    address: String,
    state: String,
    city: String,
    pincode: String,
    yearsInBusiness: Number,
    monthlySales: String,
    annualTurnover: String,
    currentBrands: [String],
    employeeCount: Number,
    storageCapacity: String,
    deliveryVehicles: Number,
    bankDetails: String,
    shopPhotos: [String],
    warehousePhotos: [String],
    documents: [String],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    submittedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date,
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

export default mongoose.model("DealerApplication", DealerApplicationSchema);
