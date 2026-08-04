import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    poster: { type: String, default: "" },
    videoUrl: { type: String, default: "" }, // local path for uploaded videos
    youtubeUrl: { type: String, default: "" }, // URL for youtube links
    type: { type: String, enum: ["shorts", "longform"], default: "longform" },
    duration: { type: String, default: "0:30" },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    category: { type: String, default: "General" },
    tags: [{ type: String }],
    channelId: { type: String, default: "dpt-power-tools" },
    uploaderEmail: { type: String, default: "" },
    isLive: { type: Boolean, default: false },
    sharesCount: { type: Number, default: 0 },
    reportsCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Video", VideoSchema);
