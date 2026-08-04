import express from "express";
import Folder from "../models/Folder.js";
import Media from "../models/Media.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const folders = await Folder.find().sort({ createdAt: -1 });
    res.json(folders);
  } catch (err) {
    console.error("List folders error:", err.message);
    res.status(500).json({ error: "Failed to fetch folders" });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const { name, parentId } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Folder name is required" });
    }

    const folder = await Folder.create({
      name: name.trim(),
      parentId: parentId || null,
      createdBy: req.user?._id || null,
      updatedBy: req.user?._id || null,
    });

    res.status(201).json(folder);
  } catch (err) {
    console.error("Create folder error:", err.message);
    res.status(500).json({ error: "Failed to create folder" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const folder = await Folder.findById(id);
    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    await Media.updateMany({ folderId: id }, { folderId: null });
    await folder.deleteOne();
    res.json({ message: "Folder deleted" });
  } catch (err) {
    console.error("Delete folder error:", err.message);
    res.status(500).json({ error: "Failed to delete folder" });
  }
});

export default router;
