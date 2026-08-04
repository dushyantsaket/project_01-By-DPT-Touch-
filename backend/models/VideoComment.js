import mongoose from 'mongoose';

const VideoCommentSchema = new mongoose.Schema(
  {
    videoId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model('VideoComment', VideoCommentSchema);
