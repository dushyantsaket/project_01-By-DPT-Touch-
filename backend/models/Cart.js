import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  priceAtAdd: { type: Number, required: true },
  selectedAttributes: {
    type: Map,
    of: String,
    default: {}
  }
});

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, sparse: true, index: true },
    sessionId: { type: String, unique: true, sparse: true, index: true },
    ip: String,
    device: String,
    lastActivityAt: { type: Date },
    items: [cartItemSchema],
    couponCode: String,
    couponDiscount: { type: Number, default: 0 },
    totalItems: { type: Number, default: 0 },
    subtotal: { type: Number, default: 0 },
    totalSavings: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 }
  },
  { timestamps: true }
);

cartSchema.pre('save', async function(next) {
  const Product = mongoose.model('Product');
  let subtotal = 0;
  let totalSavings = 0;
  
  for (const item of this.items) {
    const product = await Product.findById(item.productId);
    if (product) {
      const sellingPrice = Number(product.price_inr ?? product.mrp_inr ?? 0);
      const mrp = Number(product.mrp_inr ?? sellingPrice);
      subtotal += sellingPrice * item.quantity;
      totalSavings += Math.max(mrp - sellingPrice, 0) * item.quantity;
      item.priceAtAdd = sellingPrice;
    }
  }
  
  this.subtotal = subtotal;
  this.totalSavings = totalSavings;
  this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.grandTotal = subtotal - this.couponDiscount;
  
  next();
});

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema);
