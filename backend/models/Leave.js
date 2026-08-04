import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    leaveType: {
      type: String,
      enum: ["Casual Leave", "Sick Leave", "Paid Leave", "Emergency Leave", "Half Day Leave"],
      required: true,
    },
    reason: { type: String, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    attachment: { type: String }, // path or base64
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    managerComment: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Leave", leaveSchema);
