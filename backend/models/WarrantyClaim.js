import mongoose from 'mongoose';

const warrantyClaimSchema = new mongoose.Schema(
  {
    claimId:       { type: String, unique: true },
    productName:   { type: String, required: true },
    customerName:  { type: String, required: true },
    customerEmail: { type: String },
    contactPhone:  { type: String },
    address:       { type: String },
    invoiceNo:     { type: String },
    modelNo:       { type: String },
    purchaseDate:  { type: Date },
    reasons:       [{ type: String }],
    description:   { type: String },
    severity:      { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
    status:        { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Resolved', 'Completed'], default: 'Pending' },
    adminNotes:    { type: String },
    photos: {
      problem: [{ name: String, type: String, dataUrl: String }],
      warranty: { name: String, type: String, dataUrl: String },
      invoice: { name: String, type: String, dataUrl: String },
      serial: { name: String, type: String, dataUrl: String },
    },
  },
  { timestamps: true }
);

warrantyClaimSchema.pre('save', function (next) {
  if (!this.claimId) {
    this.claimId = 'WC-' + Date.now().toString().slice(-6);
  }
  next();
});

export default mongoose.model('WarrantyClaim', warrantyClaimSchema);
