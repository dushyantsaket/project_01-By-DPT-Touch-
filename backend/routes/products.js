import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Product from "../models/Product.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/* ── Multer setup (disk storage for images, video, pdf) ────────────────────── */
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
  const allowed = /jpeg|jpg|png|webp|gif|mp4|mov|webm|pdf/;
  const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
  cb(null, allowed.test(ext));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});

/* ── Helper: build absolute URL from req + relative path ────────────────────── */
const toUrl = (req, filePath) => {
  if (!filePath) return undefined;
  const rel = filePath.replace(/\\/g, "/").split("uploads/")[1];
  return `${req.protocol}://${req.get("host")}/uploads/${rel}`;
};

/* ═══════════════════════════════════════════════════
 *  PUBLIC ROUTES
 * ═══════════════════════════════════════════════════ */

// GET /api/products — paginated, filterable
router.get("/", async (req, res) => {
  try {
    const {
      category,
      brand,
      search,
      page = 1,
      limit = 2000,
      adminAdded,
      stockStatus,
    } = req.query;
    const filter = { isActive: true };

    if (category) filter.category = category;
    if (brand) filter.brand = new RegExp(brand, "i");
    if (adminAdded === "true") filter.isAdminAdded = true;
    if (stockStatus) filter.stockStatus = stockStatus;
    if (search) filter.$text = { $search: search };

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json({ total, page: Number(page), limit: Number(limit), products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/homepage — all active products for homepage display
router.get("/homepage", async (req, res) => {
  try {
    const limitVal = Number(req.query.limit) || 200;
    const products = await Product.find({
      isActive: true,
    })
      .sort({ createdAt: -1 })
      .limit(limitVal);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/cordless — all cordless products
router.get("/cordless", async (req, res) => {
  try {
    const products = await Product.find({
      category: "cordless-tools",
      isActive: true,
    }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/low-stock — products below 5 units (public or admin)
router.get("/low-stock", protect, async (req, res) => {
  try {
    const products = await Product.find({
      stock_quantity: { $lt: 5 },
      isActive: true,
    }).sort({ stock_quantity: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id — single product
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findById(id).catch(() => null);
    if (!product) product = await Product.findOne({ productId: id });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ═══════════════════════════════════════════════════
 *  ADMIN ROUTES  (JWT protected)
 * ═══════════════════════════════════════════════════ */

// POST /api/products — create product with optional file uploads
router.post(
  "/",
  protect,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "video", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const body = { ...req.body, isAdminAdded: true };

      // Parse JSON strings sent from multipart form
      if (typeof body.specifications === "string") {
        try {
          body.specifications = JSON.parse(body.specifications);
        } catch {
          body.specifications = [];
        }
      }
      if (typeof body.tags === "string") {
        try {
          body.tags = JSON.parse(body.tags);
        } catch {
          body.tags = [];
        }
      }

      // Collect uploaded images
      const uploadedImages = (req.files?.images || []).map((f) =>
        toUrl(req, f.path),
      );
      const existingImages = body.images
        ? (Array.isArray(body.images) ? body.images : [body.images]).filter(
            Boolean,
          )
        : [];
      body.images = [...existingImages, ...uploadedImages];
      body.image = body.image || body.images[0] || "";

      // Uploaded video / pdf
      if (req.files?.video?.[0])
        body.videoUrl = toUrl(req, req.files.video[0].path);
      if (req.files?.pdf?.[0]) body.pdfUrl = toUrl(req, req.files.pdf[0].path);

      // Auto-compute finalPrice from MRP & discount
      if (body.mrp_inr != null && body.discount != null) {
        const mrpValue = Number(body.mrp_inr);
        const discountValue = Number(body.discount);
        if (!Number.isNaN(mrpValue) && !Number.isNaN(discountValue)) {
          body.price_inr = Math.round(
            mrpValue - (mrpValue * discountValue) / 100,
          );
        }
      }

      const product = await Product.create(body);
      res.status(201).json(product);
    } catch (err) {
      if (err.code === 11000)
        return res.status(400).json({ error: "Product ID already exists" });
      res.status(400).json({ error: err.message });
    }
  },
);

// PUT /api/products/:id — update product (with optional new file uploads)
router.put(
  "/:id",
  protect,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "video", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const body = { ...req.body };

      if (typeof body.specifications === "string") {
        try {
          body.specifications = JSON.parse(body.specifications);
        } catch {
          body.specifications = [];
        }
      }
      if (typeof body.tags === "string") {
        try {
          body.tags = JSON.parse(body.tags);
        } catch {
          body.tags = [];
        }
      }

      // Merge any new uploads with existing images
      const uploadedImages = (req.files?.images || []).map((f) =>
        toUrl(req, f.path),
      );
      if (uploadedImages.length > 0) {
        const existing = await Product.findById(req.params.id).select("images");
        body.images = [...(existing?.images || []), ...uploadedImages];
        if (!body.image) body.image = body.images[0];
      }

      if (req.files?.video?.[0])
        body.videoUrl = toUrl(req, req.files.video[0].path);
      if (req.files?.pdf?.[0]) body.pdfUrl = toUrl(req, req.files.pdf[0].path);

      // Recalculate price
      if (
        body.mrp_inr !== undefined &&
        body.mrp_inr !== null &&
        body.discount !== undefined
      ) {
        const mrpValue = Number(body.mrp_inr);
        const discountValue = Number(body.discount);
        if (!Number.isNaN(mrpValue) && !Number.isNaN(discountValue)) {
          body.price_inr = Math.round(
            mrpValue - (mrpValue * discountValue) / 100,
          );
        }
      }

      // Auto stock-status
      if (body.stock_quantity !== undefined) {
        const qty = Number(body.stock_quantity);
        body.stockStatus =
          qty <= 0 ? "Out of Stock" : qty < 5 ? "Low Stock" : "In Stock";
      }

      const product = await Product.findByIdAndUpdate(req.params.id, body, {
        new: true,
        runValidators: true,
      });
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
);

// DELETE specific image from product gallery
router.delete("/:id/image", protect, async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.images = product.images.filter((img) => img !== imageUrl);
    if (product.image === imageUrl) product.image = product.images[0] || "";
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/products/:id/toggle — toggle active status
router.patch("/:id/toggle", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    product.isActive = !product.isActive;
    await product.save();
    res.json({ id: product._id, isActive: product.isActive });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/products/:id — delete product
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
