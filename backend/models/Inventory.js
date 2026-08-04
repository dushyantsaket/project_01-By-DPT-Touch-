import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  godown: { type: mongoose.Schema.Types.ObjectId, ref: 'Godown', required: true },
  quantity: { type: Number, default: 0 },
  lowStockThreshold: { type: Number, default: 5 }
}, { timestamps: true });

// Prevent duplicate entries for the same product in the same godown
inventorySchema.index({ product: 1, godown: 1 }, { unique: true });

export default mongoose.models.Inventory || mongoose.model('Inventory', inventorySchema);
