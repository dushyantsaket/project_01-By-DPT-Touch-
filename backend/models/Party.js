import mongoose from 'mongoose';

const partySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  gstin: { type: String },
  billingAddress: { type: String },
  shippingAddress: { type: String },
  partyType: { type: String, enum: ['customer', 'supplier'], required: true },
  openingBalance: { type: Number, default: 0 },
  currentBalance: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Party || mongoose.model('Party', partySchema);
