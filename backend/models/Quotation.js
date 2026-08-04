import mongoose from 'mongoose';

const quotationItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String, required: true }, 
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, 
  discount: { type: Number, default: 0 },
  taxRate: { type: Number, default: 0 }, 
  taxAmount: { type: Number, default: 0 },
  total: { type: Number, required: true }
});

const quotationSchema = new mongoose.Schema({
  quotationNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ['quotation', 'proforma_invoice'], default: 'quotation' },
  date: { type: Date, default: Date.now },
  validUntil: { type: Date },
  party: { type: mongoose.Schema.Types.ObjectId, ref: 'Party' }, 
  customerName: { type: String }, 
  customerPhone: { type: String },
  items: [quotationItemSchema],
  subTotal: { type: Number, required: true },
  totalDiscount: { type: Number, default: 0 },
  totalTax: { type: Number, default: 0 },
  grandTotal: { type: Number, required: true },
  status: { type: String, enum: ['draft', 'sent', 'accepted', 'rejected', 'invoiced'], default: 'draft' },
  notes: { type: String }
}, { timestamps: true });

export default mongoose.models.Quotation || mongoose.model('Quotation', quotationSchema);
