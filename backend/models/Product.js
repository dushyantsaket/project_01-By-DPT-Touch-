import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    slug:        { type: String, unique: true },
    productId:   { type: String, unique: true, sparse: true },
    brand:       { type: String, default: 'DPT Original' },
    category: {
      type: String,
      required: true,
    },
    subCategory:  { type: String },
    description:  { type: String, default: '' },

    /* ── Pricing ──────────────────────────────────────────────────────── */
    price_inr:    { type: Number, default: 0 },   // selling price (after discount)
    mrp_inr:      { type: Number, default: 0 },   // maximum retail price
    discount:     { type: Number, default: 0 },   // % discount off MRP
    unit:         { type: String, default: 'Piece' },

    /* ── Media ────────────────────────────────────────────────────────── */
    image:        { type: String, default: '' },  // primary image (base64 or URL)
    images:       [{ type: String }],              // extra gallery images
    videoUrl:     { type: String },               // YouTube / self-hosted URL
    pdfUrl:       { type: String },               // brochure / data-sheet

    /* ── Stock ────────────────────────────────────────────────────────── */
    stock_quantity: { type: Number, default: 50 },
    sold_quantity:  { type: Number, default: 0 },
    stockStatus: {
      type: String,
      enum: ['In Stock', 'Low Stock', 'Out of Stock'],
      default: 'In Stock',
    },

    /* ── Power / Cordless tool specs ──────────────────────────────────── */
    voltage:      { type: String },
    noLoadSpeed:  { type: String },
    spec:         { type: String },
    feature:      { type: String },
    includes:     { type: String },
    impactRate:   { type: String },
    driveRate:    { type: String },
    maxFlow:      { type: String },
    maxAirVolume: { type: String },

    /* ── Admin extras ─────────────────────────────────────────────────── */
    specifications: [{ key: String, value: String }],
    specificationsMap: { type: Map, of: String },
    tags:           [{ type: String }],
    
    // New fields for Complete Admin Panel implementation
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    priceHistory: [{
      oldPrice: Number,
      newPrice: Number,
      reason: String,
      changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      date: { type: Date, default: Date.now }
    }],
    stockHistory: [{
      oldStock: Number,
      newStock: Number,
      changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      date: { type: Date, default: Date.now }
    }],

    isActive:       { type: Boolean, default: true },
    isAdminAdded:   { type: Boolean, default: false }, // shows on homepage
  },
  { timestamps: true }
);

/* ── Auto-compute stockStatus and slug before every save ───────────────────────────── */
productSchema.pre('save', function (next) {
  const qty = this.stock_quantity;
  if (qty <= 0)      this.stockStatus = 'Out of Stock';
  else if (qty < 5)  this.stockStatus = 'Low Stock';
  else               this.stockStatus = 'In Stock';

  // keep primary image in sync with first gallery image
  if (!this.image && this.images && this.images.length > 0) {
    this.image = this.images[0];
  }

  // generate slug if missing
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }

  next();
});

/* ── Also run on findByIdAndUpdate via middleware ─────────────────────────── */
productSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.stock_quantity !== undefined) {
    const qty = Number(update.stock_quantity);
    if (qty <= 0)      update.stockStatus = 'Out of Stock';
    else if (qty < 5)  update.stockStatus = 'Low Stock';
    else               update.stockStatus = 'In Stock';
  }
  next();
});

// Text index for search
productSchema.index({ name: 'text', description: 'text', brand: 'text', subCategory: 'text' });

export default mongoose.model('Product', productSchema);
