import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String },
    brand: { type: String, required: true },
    publishDate: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('News', newsSchema);
