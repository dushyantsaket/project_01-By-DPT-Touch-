import mongoose from 'mongoose';

const CreditNoteSchema = new mongoose.Schema({
  noteNo: { type: String, unique: true },
  date: { type: Date, default: Date.now },
  salesBill: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesBill' },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Party' },
  amount: Number,
  reason: String,
  items: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    quantity: Number,
    amount: Number
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.CreditNote || mongoose.model('CreditNote', CreditNoteSchema);
