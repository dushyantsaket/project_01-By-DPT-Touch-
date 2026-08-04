import mongoose from 'mongoose';

const ProformaInvoiceSchema = new mongoose.Schema({
  proformaNo: { type: String, unique: true },
  date: { type: Date, default: Date.now },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Party' },
  items: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    quantity: Number,
    price: Number,
    total: Number
  }],
  subtotal: Number,
  gstTotal: Number,
  grandTotal: Number,
  validUntil: Date,
  status: { type: String, enum: ['draft', 'sent', 'converted'], default: 'draft' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.ProformaInvoice || mongoose.model('ProformaInvoice', ProformaInvoiceSchema);
