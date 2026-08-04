import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, required: true },
  paymentMode: { type: String, enum: ['cash', 'card', 'upi', 'bank_transfer', 'cheque'], required: true },
  referenceType: { type: String, enum: ['invoice', 'purchase', 'expense', 'other'] },
  referenceId: { type: mongoose.Schema.Types.ObjectId }, // e.g., Invoice ID or Purchase ID
  party: { type: mongoose.Schema.Types.ObjectId, ref: 'Party' }, // Link to customer/supplier if applicable
  description: { type: String }
}, { timestamps: true });

export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
