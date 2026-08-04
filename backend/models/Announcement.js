import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: ["Notice", "Holiday", "Policy", "Birthday", "Update"],
      default: "Notice",
    },
    createdBy: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

export default mongoose.model("Announcement", announcementSchema);
