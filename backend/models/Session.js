import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ip: String,
    ua: String,
    browser: String,
    os: String,
    device: String,
    country: String,
    city: String,
    createdAt: { type: Date, default: Date.now },
    lastActivity: { type: Date, default: Date.now },
    expiresAt: Date,
    status: {
      type: String,
      enum: ["active", "logged_out", "expired", "revoked"],
      default: "active",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Session", sessionSchema);
