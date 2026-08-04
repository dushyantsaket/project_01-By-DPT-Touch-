import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskName: { type: String, required: true },
    description: { type: String },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    deadline: { type: Date },
    attachments: [{ type: String }],
    assignedBy: { type: String, default: "Admin" }, // Admin Name or Manager Name
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    assignedDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "On Hold"],
      default: "Pending",
    },
    proofAttachment: { type: String }, // optional completion file path
    completionComment: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
