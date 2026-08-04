import mongoose from 'mongoose';

const godownSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  managerName: { type: String },
  contactNumber: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

export default mongoose.models.Godown || mongoose.model('Godown', godownSchema);
