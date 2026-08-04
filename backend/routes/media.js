import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Media from "../models/Media.js";
import Folder from "../models/Folder.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`),
});

const fileFilter = (_req, file, cb) => {
  const allowed =
    /jpeg|jpg|png|webp|gif|mp4|mov|webm|pdf|xlsx|xls|csv|zip|rar|7z/;
  const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
  cb(null, allowed.test(ext));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});

const toUrl = (req, filePath) => {
  if (!filePath) return undefined;
  const normalized = filePath.replace(/\\/g, "/");
  const rel = normalized.split("/uploads/")[1];
  return `${req.protocol}://${req.get("host")}/uploads/${rel}`;
};

const buildSearchFilter = (search) => {
  if (!search) return {};
  const regex = new RegExp(search.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&"), "i");
  return {
    $or: [{ originalName: regex }, { filename: regex }, { tags: regex }],
  };
};

const buildTypeFilter = (type) => {
  if (!type || type === "all") return {};
  switch (type) {
    case "image":
      return { mimeType: /^image\// };
    case "pdf":
      return { mimeType: "application/pdf" };
    case "spreadsheet":
      return { mimeType: /excel|spreadsheet|sheet|csv/i };
    case "archive":
      return { mimeType: /zip|rar|7z|tar|gz/i };
    default:
      return {};
  }
};

// GET /api/media
router.get("/", protect, async (req, res) => {
  try {
    const { search, type, folderId, deleted, favourite } = req.query;

    const filters = {
      ...(deleted === "true" ? { isDeleted: true } : { isDeleted: false }),
      ...buildTypeFilter(type),
      ...(folderId ? { folderId } : {}),
      ...(favourite === "true" ? { isFavourite: true } : {}),
      ...buildSearchFilter(search),
    };

    const media = await Media.find(filters)
      .sort({ createdAt: -1 })
      .populate("folderId", "name")
      .lean();

    res.json(media);
  } catch (err) {
    console.error("Fetch media error:", err.message);
    res.status(500).json({ error: "Failed to fetch media" });
  }
});

// POST /api/media
router.post("/", protect, upload.array("files", 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const folderId = req.body.folderId || null;
    const tags = req.body.tags
      ? Array.isArray(req.body.tags)
        ? req.body.tags
        : String(req.body.tags)
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
      : [];

    if (folderId) {
      const folder = await Folder.findById(folderId);
      if (!folder) {
        return res.status(400).json({ error: "Folder not found" });
      }
    }

    const uploadedMedia = [];
    for (const file of req.files) {
      const newMedia = await Media.create({
        filename: file.filename,
        originalName: file.originalname,
        url: toUrl(req, file.path),
        mimeType: file.mimetype,
        size: file.size,
        folderId: folderId || null,
        tags,
        uploadedBy: req.user._id,
      });
      uploadedMedia.push(newMedia);
    }

    res.status(201).json(uploadedMedia);
  } catch (err) {
    console.error("Upload media error:", err.message);
    res.status(500).json({ error: "Failed to upload files" });
  }
});

// PUT /api/media/:id
router.put("/:id", protect, async (req, res) => {
  try {
    const { originalName, isFavourite, folderId, tags } = req.body;
    const update = {};

    if (originalName !== undefined) update.originalName = originalName;
    if (isFavourite !== undefined) update.isFavourite = Boolean(isFavourite);
    if (folderId !== undefined) update.folderId = folderId || null;
    if (tags !== undefined) {
      update.tags = Array.isArray(tags)
        ? tags
        : String(tags)
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);
    }

    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ error: "Media not found" });

    Object.assign(media, update);
    await media.save();
    res.json(media);
  } catch (err) {
    console.error("Update media error:", err.message);
    res.status(500).json({ error: "Failed to update media" });
  }
});

// DELETE /api/media/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ error: "Media not found" });

    if (media.isDeleted) {
      const filePath = path.join(uploadsDir, media.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      await media.deleteOne();
      return res.json({ message: "Media permanently deleted" });
    }

    media.isDeleted = true;
    await media.save();
    res.json({ message: "Media moved to recycle bin" });
  } catch (err) {
    console.error("Delete media error:", err.message);
    res.status(500).json({ error: "Failed to delete media" });
  }
});

// POST /api/media/:id/restore
router.post("/:id/restore", protect, async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ error: "Media not found" });
    if (!media.isDeleted) {
      return res.status(400).json({ error: "Media is not deleted" });
    }
    media.isDeleted = false;
    await media.save();
    res.json({ message: "Media restored" });
  } catch (err) {
    console.error("Restore media error:", err.message);
    res.status(500).json({ error: "Failed to restore media" });
  }
});

export default router;
