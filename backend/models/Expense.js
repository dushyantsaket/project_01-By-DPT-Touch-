import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  category: { type: String, required: true }, // e.g., Rent, Salaries, Utilities, Transport
  amount: { type: Number, required: true },
  paymentMode: { type: String, enum: ['cash', 'card', 'upi', 'bank_transfer'], required: true },
  description: { type: String },
  receiptImage: { type: String } // URL/Path to uploaded receipt
}, { timestamps: true });

export default mongoose.models.Expense || mongoose.model('Expense', expenseSchema);
