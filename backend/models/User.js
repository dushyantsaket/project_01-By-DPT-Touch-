import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "dealer", "customer", "manager"],
      default: "customer",
    },
    phone: { type: String },
    companyName: { type: String }, // For dealers
    shopName: { type: String },
    gstNumber: { type: String }, // For dealers
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true },
    tokenVersion: { type: Number, default: 0 },
    lastLogin: { type: Date },
    adminSessionVersion: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
