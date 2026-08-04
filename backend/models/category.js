import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    level: { type: Number, default: 0 }, // 0: root, 1: sub, 2: sub-sub
    iconUrl: String,
    bannerUrl: String,
    imageUrl: String,
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: true },
);

// Build category path recursively
categorySchema.methods.getPath = async function () {
  const path = [this.name];
  let current = this;

  while (current.parentId) {
    current = await mongoose.model("Category").findById(current.parentId);
    if (current) path.unshift(current.name);
  }

  return path;
};

export default mongoose.model("Category", categorySchema);
