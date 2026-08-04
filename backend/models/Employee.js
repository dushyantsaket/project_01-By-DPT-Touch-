import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true, uppercase: true, trim: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    
    // Personal Details
    fatherName: { type: String },
    motherName: { type: String },
    dob: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    bloodGroup: { type: String },
    maritalStatus: { type: String, enum: ["Single", "Married", "Divorced", "Widowed"] },
    photo: { type: String }, // URL or base64 data

    // Contact Details
    mobile: { type: String, required: true },
    alternateMobile: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true },
    emergencyContact: {
      name: { type: String },
      relation: { type: String },
      phone: { type: String },
    },
    currentAddress: { type: String },
    permanentAddress: { type: String },

    // Official Details
    department: { type: String, required: true },
    designation: { type: String, required: true },
    employmentType: { type: String, enum: ["Full Time", "Part Time", "Contract", "Intern"], default: "Full Time" },
    joiningDate: { type: Date, default: Date.now },
    reportingManager: { type: String },
    shift: { type: String }, // e.g. "9:00 AM - 6:00 PM"
    salary: { type: Number, required: true },
    branch: { type: String },
    status: { type: String, enum: ["Active", "Suspended", "Terminated"], default: "Active" },

    // Role-Based Permissions
    role: { 
      type: String, 
      enum: [
        "Super Admin", "Admin", "HR Manager", "Operations Manager", "Finance Manager", 
        "Inventory Manager", "Dispatch Manager", "Warehouse Manager", "Purchase Manager", 
        "Sales Manager", "Technician", "Customer Support Executive", "Marketing Executive", 
        "Content Manager", "Media Manager", "Dealer Relationship Manager", "Delivery Executive", 
        "Accountant", "IT Administrator", "Auditor", "Sales Employee", "Store Employee", "Manager"
      ],
      default: "Sales Employee"
    },
    permissions: [{ type: String }], // Custom module list override

    // Documents Locker
    documents: {
      aadhaar: { type: String },
      pan: { type: String },
      drivingLicense: { type: String },
      passport: { type: String },
      certificates: [{ type: String }],
      resume: { type: String },
      joiningLetter: { type: String },
      offerLetter: { type: String },
      agreement: { type: String },
    },

    // Security & Auth details
    twoFactorSecret: { type: String },
    isTwoFactorEnabled: { type: Boolean, default: false },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    activeSessions: [{
      deviceId: String,
      deviceName: String,
      browser: String,
      ip: String,
      location: String,
      loginAt: { type: Date, default: Date.now },
      token: String,
    }],
    loginAlerts: [{
      timestamp: { type: Date, default: Date.now },
      ip: String,
      device: String,
      browser: String,
      status: String, // "Success" or "Failed"
    }],
    
    // GPS Live Tracking
    liveLocation: {
      latitude: { type: Number },
      longitude: { type: Number },
      updatedAt: { type: Date },
    },
    routeHistory: [{
      latitude: Number,
      longitude: Number,
      timestamp: { type: Date, default: Date.now },
    }],
    
    // Performance Metrics
    performanceScore: { type: Number, default: 100 }, // Max 100
  },
  { timestamps: true }
);

// Hash password before saving
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password
employeeSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("Employee", employeeSchema);
