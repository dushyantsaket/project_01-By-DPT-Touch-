import mongoose from 'mongoose';

const DeliveryChallanSchema = new mongoose.Schema({
  challanNo: { type: String, unique: true },
  date: { type: Date, default: Date.now },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Party' },
  items: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    quantity: Number,
    delivered: { type: Number, default: 0 }
  }],
  status: { type: String, enum: ['pending', 'partial', 'delivered'], default: 'pending' },
  deliveryDate: Date,
  receiverName: String,
  receiverSignature: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.DeliveryChallan || mongoose.model('DeliveryChallan', DeliveryChallanSchema);
