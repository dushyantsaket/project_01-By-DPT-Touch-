import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    checkIn: { type: Date },
    checkOut: { type: Date },
    checkInLocation: {
      latitude: Number,
      longitude: Number,
    },
    checkOutLocation: {
      latitude: Number,
      longitude: Number,
    },
    breaks: [
      {
        start: { type: Date },
        end: { type: Date },
      },
    ],
    workingHours: { type: Number, default: 0 }, // in decimal hours
    breakTime: { type: Number, default: 0 }, // in minutes
    overtime: { type: Number, default: 0 }, // in decimal hours
    lateEntry: { type: Boolean, default: false },
    earlyExit: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["Present", "Absent", "Late", "Half Day", "Holiday"],
      default: "Present",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
