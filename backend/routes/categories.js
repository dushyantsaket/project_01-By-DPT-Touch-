import express from "express";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// Get all categories (hierarchical)
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort("sortOrder")
      .lean();

    // Build hierarchical structure
    const categoryMap = {};
    const roots = [];

    categories.forEach((cat) => {
      categoryMap[cat._id] = { ...cat, children: [] };
    });

    categories.forEach((cat) => {
      if (cat.parentId && categoryMap[cat.parentId]) {
        categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
      } else {
        roots.push(categoryMap[cat._id]);
      }
    });

    res.json({ success: true, categories: roots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get category by slug with products
router.get("/:slug", async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
      isActive: true,
    });
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const subCategories = await Category.find({
      parentId: category._id,
      isActive: true,
    });
    const categoryPath = await category.getPath();

    res.json({
      success: true,
      category,
      subCategories,
      categoryPath,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create category (Admin only)
router.post("/", protect, admin, async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update category (Admin only)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ success: true, category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete category (Admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    // Check if category has products
    const productCount = await Product.countDocuments({
      category: req.params.id,
    });
    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category with ${productCount} products`,
      });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
