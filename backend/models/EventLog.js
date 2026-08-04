import mongoose from 'mongoose';

const eventLogSchema = new mongoose.Schema(
  {
    type: { type: String, required: true }, // e.g., 'page_view', 'click', 'web_vitals'
    name: { type: String }, // e.g., 'LCP', 'Add to Cart'
    data: { type: mongoose.Schema.Types.Mixed }, // Flexible payload
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sessionId: { type: String },
    pageUrl: { type: String },
    timestamp: { type: Date, default: Date.now }
  }
);

eventLogSchema.index({ type: 1 });
eventLogSchema.index({ userId: 1 });
eventLogSchema.index({ timestamp: -1 });

export default mongoose.model('EventLog', eventLogSchema);
