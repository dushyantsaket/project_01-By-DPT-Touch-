import mongoose from "mongoose";

const VideoUserStateSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    likedVideoIds: [{ type: String }],
    watchLaterIds: [{ type: String }],
    history: [
      {
        videoId: { type: String },
        watchedAt: { type: Date, default: Date.now },
      },
    ],
    subscriptions: [{ type: String }],
    downloadedVideoIds: [{ type: String }],
    channelName: { type: String, default: "" },
    channelBio: { type: String, default: "" },
    channelAvatar: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("VideoUserState", VideoUserStateSchema);
