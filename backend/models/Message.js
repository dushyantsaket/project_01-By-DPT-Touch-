import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true }, // Employee ObjectId or "admin" / adminName
    senderModel: { type: String, enum: ["Admin", "Employee"], required: true },
    receiverId: { type: String, required: true },
    receiverModel: { type: String, enum: ["Admin", "Employee"], required: true },
    message: { type: String },
    attachment: {
      type: { type: String }, // "image", "pdf", "voice"
      url: { type: String },
    },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
