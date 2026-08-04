import mongoose from 'mongoose';

const invoiceItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String, required: true }, // Store name at time of invoice
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, // Selling price
  discount: { type: Number, default: 0 },
  taxRate: { type: Number, default: 0 }, // e.g. 18 for 18% GST
  taxAmount: { type: Number, default: 0 },
  total: { type: Number, required: true }
});

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ['tax_invoice', 'retail_invoice', 'delivery_challan', 'credit_note'], default: 'tax_invoice' },
  date: { type: Date, default: Date.now },
  dueDate: { type: Date },
  party: { type: mongoose.Schema.Types.ObjectId, ref: 'Party' }, // Can be null for cash sales
  customerName: { type: String }, // For walk-in customers
  customerPhone: { type: String },
  items: [invoiceItemSchema],
  subTotal: { type: Number, required: true },
  totalDiscount: { type: Number, default: 0 },
  totalTax: { type: Number, default: 0 },
  grandTotal: { type: Number, required: true },
  amountPaid: { type: Number, default: 0 },
  balanceDue: { type: Number, default: 0 },
  paymentStatus: { type: String, enum: ['paid', 'partial', 'unpaid'], default: 'unpaid' },
  paymentMode: { type: String, enum: ['cash', 'card', 'upi', 'bank_transfer', 'credit'] },
  notes: { type: String }
}, { timestamps: true });

export default mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);
