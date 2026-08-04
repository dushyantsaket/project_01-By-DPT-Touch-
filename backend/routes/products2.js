import express from "express";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Review from "../models/Review.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// ==================== PUBLIC ROUTES ====================

// Get all products with filtering, sorting, pagination
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      sort = "-createdAt",
      category,
      brand,
      minPrice,
      maxPrice,
      rating,
      search,
      inStock,
      isFeatured,
    } = req.query;

    // Build query
    const query = { isActive: true, isPublished: true };

    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (inStock === "true") query.isInStock = true;
    if (isFeatured === "true") query.isFeatured = true;
    if (minPrice || maxPrice) {
      query.sellingPrice = {};
      if (minPrice) query.sellingPrice.$gte = Number(minPrice);
      if (maxPrice) query.sellingPrice.$lte = Number(maxPrice);
    }
    if (rating) query.averageRating = { $gte: Number(rating) };

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Execute query with pagination
    const products = await Product.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("category", "name slug");

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single product by ID or Slug
router.get("/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;

    // Check if identifier is ObjectId or slug
    const query = identifier.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: identifier, isActive: true, isPublished: true }
      : { slug: identifier, isActive: true, isPublished: true };

    const product = await Product.findOne(query).populate(
      "category",
      "name slug parentId",
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Increment view count
    product.viewCount += 1;
    await product.save();

    // Get similar products (same category)
    const similarProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isActive: true,
      isPublished: true,
    })
      .limit(10)
      .select(
        "title brand sellingPrice mrp discountPercent images averageRating",
      );

    // Get reviews
    const reviews = await Review.find({
      productId: product._id,
      isApproved: true,
    })
      .sort("-createdAt")
      .limit(5);

    const reviewStats = {
      total: product.totalRatings,
      average: product.averageRating,
      distribution: product.ratingDistribution,
    };

    res.json({
      success: true,
      product,
      similarProducts,
      reviews,
      reviewStats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get product reviews with pagination
router.get("/:productId/reviews", async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, sort = "-createdAt" } = req.query;

    const reviews = await Review.find({
      productId,
      isApproved: true,
    })
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Review.countDocuments({ productId, isApproved: true });

    res.json({
      success: true,
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get products by category path
router.get("/category/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const category = await Category.findOne({ slug, isActive: true });
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Get all subcategories
    const subCategories = await Category.find({
      parentId: category._id,
      isActive: true,
    });
    const subCategoryIds = subCategories.map((c) => c._id);

    const query = {
      category: { $in: [category._id, ...subCategoryIds] },
      isActive: true,
      isPublished: true,
    };

    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      category,
      subCategories,
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get filter options (brands, price range, etc.)
router.get("/filters/options", async (req, res) => {
  try {
    const { category } = req.query;
    const query = { isActive: true, isPublished: true };
    if (category) query.category = category;

    const [brands, priceRange] = await Promise.all([
      Product.distinct("brand", query),
      Product.aggregate([
        { $match: query },
        {
          $group: {
            _id: null,
            minPrice: { $min: "$sellingPrice" },
            maxPrice: { $max: "$sellingPrice" },
          },
        },
      ]),
    ]);

    res.json({
      success: true,
      filters: {
        brands: brands.sort(),
        priceRange: priceRange[0] || { minPrice: 0, maxPrice: 100000 },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==================== ADMIN ROUTES ====================

// Create product (Admin only)
router.post("/", protect, admin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update product (Admin only)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete product (Admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Bulk update stock (Admin only)
router.post("/bulk/stock", protect, admin, async (req, res) => {
  try {
    const { updates } = req.body; // Array of { productId, stock }

    const bulkOps = updates.map((update) => ({
      updateOne: {
        filter: { _id: update.productId },
        update: {
          $set: {
            stock: update.stock,
            isInStock: update.stock > 0,
          },
        },
      },
    }));

    await Product.bulkWrite(bulkOps);
    res.json({ success: true, message: "Stock updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
