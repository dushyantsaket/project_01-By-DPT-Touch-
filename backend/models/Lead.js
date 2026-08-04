import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    leadId:   { type: String, unique: true },
    customer: { type: String, required: true },
    company:  { type: String, default: 'Direct Buyer' },
    phone:    { type: String },
    email:    { type: String },
    product: { type: String },
    requirement: { type: String },
    source: { type: String, default: 'Website' },
    assignedTo: { type: String },
    priority: { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'], default: 'Medium' },

    type:     { type: String, enum: ['Order Request', 'Message', 'Enquiry', 'Repair', 'Warranty', 'Quotation'], default: 'Enquiry' },
    status:   { type: String, enum: ['New', 'Pending', 'Contacted', 'Converted', 'Shipped', 'Closed'], default: 'New' },
    address:  { type: String },
    notes:    { type: String },
    leadNotes: [{ note: String, by: String, at: { type: Date, default: Date.now } }],
  },
  { timestamps: true }
);

leadSchema.pre('save', function (next) {
  if (!this.leadId) {
    this.leadId = 'L-' + Date.now().toString().slice(-4);
  }
  next();
});

export default mongoose.model('Lead', leadSchema);
