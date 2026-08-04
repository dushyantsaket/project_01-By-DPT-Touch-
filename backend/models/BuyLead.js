import mongoose from 'mongoose';

const buyLeadSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number },
    unit: { type: String },
    budget: { type: Number },
    location: { type: String },
    preferredBrands: [{ type: String }],
    requiredBy: { type: Date },
    isExport: { type: Boolean, default: false },
    isHotLead: { type: Boolean, default: false },
    
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postedByType: { type: String }, // 'admin', 'customer'
    
    interests: [
      {
        dealerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        dealerName: { type: String },
        message: { type: String },
        quotedPrice: { type: Number },
        expressedAt: { type: Date, default: Date.now },
        status: { type: String, default: 'pending' } // pending, accepted, rejected
      }
    ],
    
    shortlistedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    
    shortlistCount: { type: Number, default: 0 },
    interestCount: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    relevanceScore: { type: Number, default: 0 },
    
    status: { 
      type: String, 
      enum: ['active', 'expired', 'deleted', 'completed'], 
      default: 'active' 
    },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('BuyLead', buyLeadSchema);
