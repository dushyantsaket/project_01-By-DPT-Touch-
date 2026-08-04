import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    userId: { type: String }, // Employee ID or Admin ID/Username
    username: { type: String, required: true },
    role: { type: String, required: true },
    moduleName: { type: String, required: true }, // e.g. "Inventory", "Salary", "Employee Master"
    actionType: {
      type: String,
      enum: ["Create", "Update", "Delete", "View", "Login", "Logout"],
      required: true,
    },
    oldValues: { type: mongoose.Schema.Types.Mixed },
    newValues: { type: mongoose.Schema.Types.Mixed },
    ipAddress: { type: String },
    device: { type: String },
    browser: { type: String },
    location: { type: String }, // GPS if enabled
  },
  { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);
