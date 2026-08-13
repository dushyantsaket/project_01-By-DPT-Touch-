import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import PDFDocument from "pdfkit";
import { resolveCategoryConfig } from "./src/data/categoryCatalogConfig.js";
import { buildInitialCatalog } from "./src/utils/catalog/buildCatalog.js";
import {
  buildCatalogFacets,
  filterCatalogProducts,
  getCategoryProducts,
  paginateCatalogProducts,
} from "./src/utils/catalog/queryCatalog.js";

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

const reviewUploadDir = path.join(__dirname, "public", "uploads", "reviews");
fs.mkdirSync(reviewUploadDir, { recursive: true });

const reviewUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, reviewUploadDir),
    filename: (_req, file, cb) => {
      const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "-");
      cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}-${safeName}`);
    },
  }),
  limits: { fileSize: 80 * 1024 * 1024, files: 7 },
  fileFilter: (_req, file, cb) => {
    if (/^(image|video)\//.test(file.mimetype)) return cb(null, true);
    cb(new Error("Only image and video files are allowed"));
  },
});

// ─── Data Helpers ────────────────────────────────────────────────────────────
const dataPath = (fileName) => path.join(__dirname, "data", fileName);

const loadData = (fileName) => {
  try {
    const rawData = fs.readFileSync(dataPath(fileName), "utf-8");
    return JSON.parse(rawData);
  } catch {
    return [];
  }
};

const saveData = (fileName, data) => {
  fs.writeFileSync(dataPath(fileName), JSON.stringify(data, null, 2), "utf-8");
};

const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2);

const env = globalThis.process?.env || {};

const buildNewsPublishText = (post) => {
  const publicSiteUrl =
    env.PUBLIC_SITE_URL || "https://www.dushyantpowertools.com";
  const title = post.title?.trim() || "News Update";
  const summary =
    post.description || post.summary || post.content || "New update published.";
  const link = post.link || `${publicSiteUrl}/latest-news`;

  return [
    `📰 ${title}`,
    "",
    summary.trim().slice(0, 220),
    "",
    `🔗 Read more: ${link}`,
  ].join("\n");
};

const publishNewsToWhatsApp = async (post) => {
  const phoneNumberId = env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = env.WHATSAPP_ACCESS_TOKEN;
  const recipient = env.WHATSAPP_TO_NUMBER;

  if (!phoneNumberId || !accessToken || !recipient) {
    console.log(
      "[WhatsApp] Skipping publish: missing WHATSAPP_PHONE_NUMBER_ID / WHATSAPP_ACCESS_TOKEN / WHATSAPP_TO_NUMBER",
    );
    return { skipped: true, reason: "missing-whatsapp-config" };
  }

  const payload = {
    messaging_product: "whatsapp",
    to: recipient,
    type: "text",
    text: {
      body: buildNewsPublishText(post),
    },
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      const detail = result?.error?.message || "Unknown WhatsApp API error";
      throw new Error(detail);
    }

    return { skipped: false, result };
  } catch (error) {
    console.error("[WhatsApp] publish failed:", error.message);
    return { skipped: true, reason: "publish-error", message: error.message };
  }
};

const unifiedCatalog = buildInitialCatalog();

/* ==========================================
 * ENDPOINTS: GENERAL / BSC & KEIL CATALOGUE
 * ========================================== */

app.get("/api/products", (req, res) => {
  res.json(loadData("products.json"));
});

app.get("/api/catalog/:categoryId", (req, res) => {
  const category = resolveCategoryConfig(req.params.categoryId);
  const categoryProducts = getCategoryProducts(unifiedCatalog, category);
  const facets = buildCatalogFacets(categoryProducts);
  const filteredProducts = filterCatalogProducts(categoryProducts, {
    search: req.query.search,
    brand: req.query.brand,
    subCategory: req.query.subCategory,
    inStock: req.query.inStock,
    minPrice: req.query.minPrice,
    maxPrice: req.query.maxPrice,
    sort: req.query.sort || category.defaultSort,
  });

  const pagination = paginateCatalogProducts(
    filteredProducts,
    req.query.page || 1,
    req.query.limit || 12,
  );

  res.json({
    category,
    facets,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages: pagination.totalPages,
      start: pagination.start,
      end: pagination.end,
    },
    products: pagination.items,
  });
});

app.get("/api/products/:id", (req, res) => {
  const products = loadData("products.json");
  const product = products.find((p) => p.id == req.params.id);
  if (product) return res.json(product);
  res.status(404).json({ error: "Product not found" });
});

app.get("/api/categories", (req, res) => {
  res.json(loadData("categories.json"));
});

app.get("/api/category/:name", (req, res) => {
  const products = loadData("products.json");
  const data = products.filter(
    (p) => p.category.toLowerCase() === req.params.name.toLowerCase(),
  );
  res.json(data);
});

app.get("/api/search", (req, res) => {
  const query = req.query.q?.toLowerCase() || "";
  const products = loadData("products.json");
  if (!query) return res.json(products);
  const results = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.brand?.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query),
  );
  res.json(results);
});

/* ==========================================
 * AUTH ENDPOINTS
 * ========================================== */

// Register Customer
app.post("/api/auth/register", (req, res) => {
  const { name, phone, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ error: "Name, email and password are required" });

  const users = loadData("users.json");
  const existing = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase(),
  );
  if (existing)
    return res.status(409).json({ error: "Email already registered" });

  const newUser = {
    id: generateId(),
    name,
    phone: phone || "",
    email: email.toLowerCase(),
    password, // In production, use bcrypt hashing
    userType: "customer",
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    loginHistory: [new Date().toISOString()],
  };

  users.push(newUser);
  saveData("users.json", users);

  res.status(201).json({
    message: "Customer registered successfully",
    token: "cust_" + newUser.id,
    customer: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      userType: "customer",
    },
  });
});

// Register Shopkeeper
app.post("/api/auth/shopkeeper/register", (req, res) => {
  const { name, phone, email, password, shopName, location } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ error: "Name, email and password are required" });

  const users = loadData("users.json");
  const existing = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase(),
  );
  if (existing)
    return res.status(409).json({ error: "Email already registered" });

  const newUser = {
    id: generateId(),
    name,
    phone: phone || "",
    email: email.toLowerCase(),
    password,
    shopName: shopName || "",
    location: location || "",
    userType: "shopkeeper",
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    loginHistory: [new Date().toISOString()],
  };

  users.push(newUser);
  saveData("users.json", users);

  res.status(201).json({
    message: "Shopkeeper registered successfully",
    token: "shop_" + newUser.id,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      shopName: newUser.shopName,
      userType: "shopkeeper",
    },
  });
});

// Register Dealer
app.post("/api/auth/dealer/register", (req, res) => {
  const { name, phone, email, password, companyName, gstNumber, location } =
    req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ error: "Name, email and password are required" });

  // Validate GST
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (gstNumber && !gstRegex.test(gstNumber.toUpperCase())) {
    return res.status(400).json({ error: "Invalid GST Number format" });
  }

  const users = loadData("users.json");
  const existing = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase(),
  );
  if (existing)
    return res.status(409).json({ error: "Email already registered" });

  const newUser = {
    id: generateId(),
    name,
    phone: phone || "",
    email: email.toLowerCase(),
    password,
    companyName: companyName || "",
    gstNumber: gstNumber ? gstNumber.toUpperCase() : "",
    location: location || "",
    userType: "dealer",
    status: "pending", // Admin approval needed
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    loginHistory: [new Date().toISOString()],
  };

  users.push(newUser);
  saveData("users.json", users);

  res.status(201).json({
    message: "Dealer registered successfully",
    token: "dealer_" + newUser.id,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      companyName: newUser.companyName,
      gstNumber: newUser.gstNumber,
      location: newUser.location,
      userType: "dealer",
    },
  });
});

// Login handler
const handleLogin = (req, res) => {
  const emailVal = req.body.email || req.body.username;
  const password = req.body.password;
  if (!emailVal || !password)
    return res
      .status(400)
      .json({ error: "Email/Username and password are required" });

  const users = loadData("users.json");
  const user = users.find(
    (u) =>
      (u.email?.toLowerCase() === emailVal.toLowerCase() ||
        u.name?.toLowerCase() === emailVal.toLowerCase()) &&
      u.password === password,
  );
  if (!user)
    return res.status(401).json({ error: "Invalid email or password" });

  // Update last login
  const idx = users.findIndex((u) => u.id === user.id);
  const now = new Date().toISOString();
  users[idx].lastLogin = now;
  users[idx].loginHistory = [...(users[idx].loginHistory || []), now];
  saveData("users.json", users);

  const { password: _pw, ...safeUser } = users[idx];
  res.json({
    message: "Login successful",
    token: user.userType + "_" + user.id,
    user: safeUser,
    dealer: user.userType === "dealer" ? safeUser : undefined, // legacy compat
  });
};

app.post("/api/auth/login", handleLogin);
app.post("/api/dealer/login", handleLogin);

/* ==========================================
 * ADMIN ENDPOINTS: USERS
 * ========================================== */

app.get("/api/admin/users", (req, res) => {
  const users = loadData("users.json");
  const safe = users.map(({ password: _pw, ...u }) => u);
  const { type } = req.query;
  if (type) return res.json(safe.filter((u) => u.userType === type));
  res.json(safe);
});

app.get("/api/admin/users/:id", (req, res) => {
  const users = loadData("users.json");
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  const { password: _pw, ...safe } = user;
  res.json(safe);
});

app.delete("/api/admin/users/:id", (req, res) => {
  const users = loadData("users.json");
  const idx = users.findIndex((u) => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "User not found" });
  users.splice(idx, 1);
  saveData("users.json", users);
  res.json({ message: "User deleted" });
});

app.put("/api/user/profile", (req, res) => {
  const users = loadData("users.json");
  const { email, name, phone, address } = req.body;
  const idx = users.findIndex((u) => u.email === email);
  if (idx !== -1) {
    if (name) users[idx].name = name;
    if (phone) users[idx].phone = phone;
    if (address) users[idx].address = address;
    saveData("users.json", users);
    res.json({ success: true, message: "Profile updated" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

/* ==========================================
 * BRANDS API
 * ========================================== */

/* ==========================================
 * LEADS ENDPOINTS
 * ========================================== */

app.post("/api/leads", (req, res) => {
  const leads = loadData("leads.json");
  const lead = {
    id: generateId(),
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  leads.push(lead);
  saveData("leads.json", leads);
  res.status(201).json({ message: "Lead created", lead });
});

app.get("/api/admin/leads", (req, res) => {
  const leads = loadData("leads.json");
  res.json(leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

app.delete("/api/admin/leads/:id", (req, res) => {
  const leads = loadData("leads.json");
  const idx = leads.findIndex((l) => l.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Lead not found" });
  leads.splice(idx, 1);
  saveData("leads.json", leads);
  res.json({ message: "Lead deleted" });
});

/* ==========================================
 * ORDERS ENDPOINTS
 * ========================================== */

app.post("/api/orders", (req, res) => {
  const orders = loadData("orders.json");
  const isSidhi = (city) => {
    if (!city) return false;
    return city.toLowerCase().replace(/\s/g, "").includes("sidhi");
  };

  const { customerInfo, items, paymentMethod, pricing, userId, userEmail } =
    req.body;
  const deliveryCity = customerInfo?.city || customerInfo?.district || "";
  const codAvailable = isSidhi(deliveryCity);

  if (paymentMethod === "COD" && !codAvailable) {
    return res
      .status(400)
      .json({ error: "Cash on Delivery is only available in Sidhi district." });
  }

  const order = {
    id: generateId(),
    orderId: "DPT-" + Date.now(),
    customerInfo,
    items,
    paymentMethod,
    pricing,
    userId: userId || null,
    userEmail: userEmail || customerInfo?.email,
    status: "pending",
    codAvailable,
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  saveData("orders.json", orders);
  res.status(201).json({ message: "Order placed successfully", order });
});

app.get("/api/admin/orders", (req, res) => {
  const orders = loadData("orders.json");
  res.json(
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  );
});

app.patch("/api/admin/orders/:id/status", (req, res) => {
  const orders = loadData("orders.json");
  const idx = orders.findIndex((o) => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Order not found" });
  orders[idx].status = req.body.status;
  saveData("orders.json", orders);
  res.json({ message: "Order status updated", order: orders[idx] });
});

app.delete("/api/admin/orders/:id", (req, res) => {
  const orders = loadData("orders.json");
  const idx = orders.findIndex((o) => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Order not found" });
  orders.splice(idx, 1);
  saveData("orders.json", orders);
  res.json({ message: "Order deleted" });
});

// COD eligibility check
app.post("/api/check-cod", (req, res) => {
  const { city } = req.body;
  const isSidhi =
    city && city.toLowerCase().replace(/\s/g, "").includes("sidhi");
  res.json({
    codAvailable: !!isSidhi,
    message: isSidhi
      ? "Cash on Delivery available"
      : "COD only available in Sidhi district",
  });
});

/* ==========================================
 * REVIEWS ENDPOINTS
 * ========================================== */

const sampleReviews = [
  {
    id: "seed-review-1",
    productName: "DPT Rotary Hammer Drill 26mm",
    fullName: "Rajesh Patel",
    email: "rajesh@example.com",
    phone: "",
    city: "Bhopal, Madhya Pradesh",
    rating: 5,
    reviewTitle: "Excellent Build Quality",
    reviewDescription:
      "Amazing product. Build quality is solid and performance is outstanding. Highly recommended for professional use.",
    images: ["/images/industrial_hero.png", "/images/login-storefront.jpeg"],
    videos: [],
    helpful: 24,
    isVerifiedPurchase: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-review-2",
    productName: "DPT Angle Grinder 1100W",
    fullName: "Amit Sharma",
    email: "amit@example.com",
    phone: "",
    city: "Indore, Madhya Pradesh",
    rating: 4,
    reviewTitle: "Great Product",
    reviewDescription:
      "Very good grinder for its price. I use it daily in my workshop and it has been reliable.",
    images: ["/images/image copy.png"],
    videos: [],
    helpful: 18,
    isVerifiedPurchase: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-review-3",
    productName: "DPT Impact Drill 13mm",
    fullName: "Sanjay Verma",
    email: "sanjay@example.com",
    phone: "",
    city: "Jabalpur, Madhya Pradesh",
    rating: 5,
    reviewTitle: "Value for Money",
    reviewDescription:
      "Best drill machine in this range. Powerful and durable. Thank you Dushyant Power Tools.",
    images: ["/images/login-storefront.jpeg", "/images/industrial_hero.png"],
    videos: [],
    helpful: 12,
    isVerifiedPurchase: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const normalizeReview = (review) => ({
  ...review,
  id: review.id || review._id || generateId(),
  _id: review._id || review.id,
  productName: review.productName || review.product || review.productId || "Dushyant Power Tool",
  fullName: review.fullName || review.userName || review.name || "Guest Customer",
  city: review.city || review.location || "India",
  rating: Number(review.rating || 5),
  reviewTitle: review.reviewTitle || review.title || "Customer Review",
  reviewDescription: review.reviewDescription || review.comment || "",
  images: review.images || [],
  videos: review.videos || [],
  helpful: Number(review.helpful || review.helpfulCount || 0),
  isVerifiedPurchase: Boolean(review.isVerifiedPurchase),
  createdAt: review.createdAt || new Date().toISOString(),
});

const getAllReviews = () => {
  const saved = loadData("reviews.json").map(normalizeReview);
  return saved.length ? saved : sampleReviews.map(normalizeReview);
};

const getRatingBreakdown = (reviews) =>
  [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => Number(review.rating) === rating).length,
    reviewers: reviews
      .filter((review) => Number(review.rating) === rating)
      .map((review) => ({
        id: review.id,
        name: review.fullName,
        productName: review.productName,
        city: review.city,
        createdAt: review.createdAt,
      })),
  }));

app.get("/api/reviews", (req, res) => {
  const {
    search = "",
    rating = "",
    verified = "",
    mediaOnly = "",
    sort = "-createdAt",
    page = 1,
    limit = 8,
  } = req.query;
  const allReviews = getAllReviews();
  const query = String(search).trim().toLowerCase();
  let reviews = allReviews.filter((review) => {
    const matchesSearch =
      !query ||
      `${review.fullName} ${review.productName} ${review.reviewTitle} ${review.reviewDescription}`
        .toLowerCase()
        .includes(query);
    const matchesRating = !rating || Number(review.rating) === Number(rating);
    const matchesVerified = verified !== "true" || review.isVerifiedPurchase;
    const matchesMedia =
      mediaOnly !== "true" || review.images.length > 0 || review.videos.length > 0;
    return matchesSearch && matchesRating && matchesVerified && matchesMedia;
  });

  reviews.sort((a, b) => {
    if (sort === "rating") return a.rating - b.rating;
    if (sort === "-rating") return b.rating - a.rating;
    if (sort === "createdAt") return new Date(a.createdAt) - new Date(b.createdAt);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const pageNumber = Math.max(Number(page) || 1, 1);
  const pageSize = Math.max(Number(limit) || 8, 1);
  const pagedReviews = reviews.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  const realCount = allReviews.length;
  const baseline = 8537;
  const totalReviews = baseline + realCount;
  const weightedTotal =
    4.8 * baseline + allReviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
  const averageRating = totalReviews ? weightedTotal / totalReviews : 0;

  res.json({
    reviews: pagedReviews,
    pagination: {
      page: pageNumber,
      limit: pageSize,
      total: reviews.length,
      hasMore: pageNumber * pageSize < reviews.length,
    },
    stats: {
      averageRating,
      totalReviews,
      verifiedBuyers: 7200 + allReviews.filter((review) => review.isVerifiedPurchase).length,
      recommendCount: 98,
      mediaReviews: allReviews.filter((review) => review.images.length || review.videos.length).length,
    },
    ratingBreakdown: getRatingBreakdown(allReviews),
  });
});

app.get("/api/reviews/:productId", (req, res) => {
  const reviews = getAllReviews();
  const productReviews = reviews.filter(
    (r) => r.productId === req.params.productId || r.productName === req.params.productId,
  );
  res.json(
    productReviews.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    ),
  );
});

app.post(
  "/api/reviews",
  reviewUpload.fields([
    { name: "images", maxCount: 5 },
    { name: "videos", maxCount: 2 },
  ]),
  (req, res) => {
  const reviews = loadData("reviews.json");
  const imageFiles = req.files?.images || [];
  const videoFiles = req.files?.videos || [];
  const review = {
    id: generateId(),
    productName: req.body.productName || "Dushyant Power Tool",
    fullName: req.body.fullName || "Guest Customer",
    email: req.body.email || "",
    phone: req.body.phone || "",
    city: req.body.city || "India",
    dealerName: req.body.dealerName || "",
    purchaseDate: req.body.purchaseDate || "",
    rating: Number(req.body.rating || 5),
    reviewTitle: req.body.reviewTitle || "Customer Review",
    reviewDescription: req.body.reviewDescription || "",
    images: imageFiles.map((file) => `/uploads/reviews/${file.filename}`),
    videos: videoFiles.map((file) => `/uploads/reviews/${file.filename}`),
    helpful: 0,
    reports: [],
    isGuest: true,
    isVerifiedPurchase: false,
    createdAt: new Date().toISOString(),
  };
  reviews.push(review);
  saveData("reviews.json", reviews);
  res.status(201).json({ message: "Review submitted", review });
});

app.post("/api/reviews/:id/helpful", (req, res) => {
  const reviews = loadData("reviews.json");
  const idx = reviews.findIndex((r) => r.id === req.params.id || r._id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Review not found" });
  reviews[idx].helpful = Number(reviews[idx].helpful || 0) + 1;
  saveData("reviews.json", reviews);
  res.json({ message: "Marked helpful", helpful: reviews[idx].helpful });
});

app.post("/api/reviews/:id/report", (req, res) => {
  const reviews = loadData("reviews.json");
  const idx = reviews.findIndex((r) => r.id === req.params.id || r._id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Review not found" });
  reviews[idx].reports = [
    ...(reviews[idx].reports || []),
    { id: generateId(), ...req.body, createdAt: new Date().toISOString() },
  ];
  saveData("reviews.json", reviews);
  res.json({ message: "Report submitted" });
});

app.delete("/api/reviews/:id", (req, res) => {
  const reviews = loadData("reviews.json");
  const idx = reviews.findIndex((r) => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Review not found" });
  reviews.splice(idx, 1);
  saveData("reviews.json", reviews);
  res.json({ message: "Review deleted" });
});

app.get("/api/content/faqs", (_req, res) => {
  res.json({
    faqs: [
      { question: "How do I use this page?", answer: "Write, upload media, and submit your review." },
      { question: "How can I write a review?", answer: "Fill the review form. Login is not required." },
      { question: "Will my review be published?", answer: "Yes, it appears after successful submit." },
      { question: "Can I upload videos?", answer: "Yes, upload up to 2 videos with your review." },
    ],
  });
});

app.get("/api/content/articles", (_req, res) => {
  res.json({
    articles: [
      { title: "How to choose the right power tool", image: "/images/industrial_hero.png" },
      { title: "Power tools safety tips for beginners", image: "/images/login-storefront.jpeg" },
      { title: "Maintenance guide for longer tool life", image: "/images/image copy.png" },
      { title: "Warranty and support information", image: "/images/industrial_hero.png" },
    ],
  });
});

app.get("/api/content/support", (_req, res) => {
  res.json({
    support: {
      phone: "+91 97540 15503",
      email: "support@dushyantpowertools.com",
      chatUrl: "https://wa.me/919754015503",
      hours: "Mon - Sat 9:00 AM - 6:00 PM",
    },
  });
});

app.get("/api/content/pdfs", (_req, res) => {
  res.json({
    pdfs: [
      { title: "Product Catalogue", url: "/api/content/pdfs/catalogue" },
      { title: "Warranty Policy", url: "/api/content/pdfs/warranty" },
      { title: "User Manual", url: "/api/content/pdfs/user-manual" },
      { title: "Safety Guidelines", url: "/api/content/pdfs/safety" },
    ],
  });
});

app.get("/api/content/pdfs/:type", (req, res) => {
  const titleMap = {
    catalogue: "Product Catalogue",
    warranty: "Warranty Policy",
    "user-manual": "User Manual",
    safety: "Safety Guidelines",
  };
  const title = titleMap[req.params.type] || "Dushyant Power Tools PDF";
  const doc = new PDFDocument({ margin: 48 });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${req.params.type}.pdf"`);
  doc.pipe(res);
  doc.fontSize(22).text("Dushyant Power Tools", { align: "center" });
  doc.moveDown();
  doc.fontSize(16).fillColor("#dc2626").text(title);
  doc.moveDown();
  doc.fillColor("#111111").fontSize(11).text(
    "This downloadable document is generated from the website backend. Replace this content with the final PDF copy whenever the official document is ready.",
    { lineGap: 6 },
  );
  doc.end();
});

/* ==========================================
 * ENDPOINTS: API V1 (BOSCH SPARES & TOOLS)
 * ========================================== */

// Tools List
app.get("/api/v1/tools", (req, res) => {
  let tools = loadData("tools.json");
  const { category, page, limit } = req.query;

  if (category) {
    tools = tools.filter(
      (t) => t.category.toLowerCase() === category.toLowerCase(),
    );
  }

  // Basic Pagination Simulation
  if (page && limit) {
    const p = parseInt(page);
    const l = parseInt(limit);
    const start = (p - 1) * l;
    tools = tools.slice(start, start + l);
  }

  res.json(tools);
});

// Single Tool
app.get("/api/v1/tools/:model_code", (req, res) => {
  const tools = loadData("tools.json");
  const code = req.params.model_code.replace(/_/g, " ");

  const tool = tools.find(
    (t) =>
      t.model_code === code ||
      t.model_number.toLowerCase() === code.toLowerCase(),
  );
  if (tool) return res.json(tool);
  res.status(404).json({ error: "Tool not found" });
});

// Spare Parts for Tool
app.get("/api/v1/tools/:model_code/parts", (req, res) => {
  const parts = loadData("spare_parts.json");
  const catFilter = req.query.category?.toLowerCase();

  let toolParts = parts;
  if (catFilter)
    toolParts = toolParts.filter((p) => p.category.toLowerCase() === catFilter);

  res.json(toolParts);
});

// Search Parts
app.get("/api/v1/parts/search", (req, res) => {
  const query = req.query.q?.toLowerCase() || "";
  const toolModel = req.query.tool_model?.toLowerCase();

  let parts = loadData("spare_parts.json");
  if (toolModel) {
    parts = parts.filter(
      (p) =>
        p.compatibility &&
        p.compatibility.some((c) => c.toLowerCase() === toolModel),
    );
  }
  if (query) {
    parts = parts.filter(
      (p) =>
        p.description.toLowerCase().includes(query) ||
        p.order_no.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query),
    );
  }

  res.json(parts);
});

// Lubricants
app.get("/api/v1/lubricants", (req, res) => {
  const lubes = loadData("lubricants.json");
  const typeFilter = req.query.type?.toLowerCase();

  let results = lubes.products || [];
  if (typeFilter) {
    results = results.filter((l) => l.type?.toLowerCase() === typeFilter);
  }

  res.json(results);
});

// Labour Charges
app.get("/api/v1/labour-charges", (req, res) => {
  const tools = loadData("tools.json");
  const toolCategory = req.query.tool_category?.toLowerCase();

  let result = tools.map((t) => ({
    model: t.model_number,
    category: t.category,
    charges: t.labour_charge,
  }));

  if (toolCategory) {
    result = result.filter((r) => r.category.toLowerCase() === toolCategory);
  }

  res.json(result);
});

// Accessories
app.get("/api/v1/accessories", (req, res) => {
  let accessories = loadData("accessories.json");
  const compFilter = req.query.compatibility?.toLowerCase();

  if (compFilter) {
    accessories = accessories.filter(
      (a) =>
        a.compatibility &&
        a.compatibility.some((c) => c.toLowerCase() === compFilter),
    );
  }
  res.json(accessories);
});

// Mock Cart Add
app.post("/api/v1/cart/add", (req, res) => {
  const { order_no, quantity } = req.body;
  if (!order_no || !quantity)
    return res.status(400).json({ error: "Missing order_no or quantity " });

  res.json({
    status: "success",
    message: "Item added to cart",
    cart_item: { order_no, quantity },
  });
});

// Mock Order
app.post("/api/v1/orders", (req, res) => {
  const { items, customer_info } = req.body;
  if (!items || !customer_info)
    return res.status(400).json({ error: "Invalid order data" });

  res.json({
    status: "success",
    order_id: "ORD-" + Math.floor(Math.random() * 1000000),
    message: "Order placed successfully",
  });
});

/* ==========================================
 * WARRANTY CLAIMS
 * ========================================== */

app.post("/api/warranty/claims", (req, res) => {
  const claims = loadData("warranty.json");
  const claim = {
    id: generateId(),
    ...req.body,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  claims.push(claim);
  saveData("warranty.json", claims);
  res.status(201).json({ message: "Warranty claim submitted", data: claim });
});

/* ==========================================
 * CUSTOMER ORDERS
 * ========================================== */
app.post("/api/orders", (req, res) => {
  const orders = loadData("orders.json");
  const order = {
    id: generateId(),
    orderId: "ORD-" + Date.now(),
    ...req.body,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  orders.unshift(order);
  saveData("orders.json", orders);
  res.status(201).json({ message: "Order placed successfully", order });
});

app.get("/api/admin/warranty", (req, res) => {
  const claims = loadData("warranty.json");
  res.json(
    claims.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  );
});

app.put("/api/admin/warranty/:id/status", (req, res) => {
  const claims = loadData("warranty.json");
  const idx = claims.findIndex((c) => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Claim not found" });
  claims[idx].status = req.body.status;
  claims[idx].adminNote = req.body.adminNote || "";
  claims[idx].updatedAt = new Date().toISOString();
  saveData("warranty.json", claims);
  res.json({ message: "Status updated", claim: claims[idx] });
});

/* ==========================================
 * NEWS & NOTIFICATIONS
 * ========================================== */

app.post("/api/admin/news", async (req, res) => {
  const news = loadData("news.json");
  const normalizedPost = {
    id: generateId(),
    title: req.body.title,
    description: req.body.description || req.body.content || req.body.summary,
    summary: req.body.summary || req.body.content?.substring(0, 160),
    content: req.body.content || req.body.description || req.body.summary,
    image: req.body.image,
    brand: req.body.brand || "General",
    link: req.body.link || "/latest-news",
    tags: Array.isArray(req.body.tags)
      ? req.body.tags
      : (req.body.tags || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
    createdAt: new Date().toISOString(),
  };

  const post = {
    ...normalizedPost,
    ...req.body,
    id: normalizedPost.id,
    createdAt: normalizedPost.createdAt,
  };

  news.unshift(post);
  saveData("news.json", news);

  const notifications = loadData("notifications.json");
  notifications.unshift({
    id: generateId(),
    type: "news",
    title: req.body.title,
    message: req.body.summary || req.body.content?.substring(0, 120),
    brand: req.body.brand,
    image: req.body.image,
    newsId: post.id,
    createdAt: new Date().toISOString(),
    read: false,
  });
  saveData("notifications.json", notifications);

  const whatsappResult = await publishNewsToWhatsApp(post);

  res.status(201).json({
    message: "News posted",
    post,
    whatsapp: whatsappResult,
  });
});

app.get("/api/news", (req, res) => {
  const news = loadData("news.json");
  res.json(news);
});

app.delete("/api/admin/news/:id", (req, res) => {
  const news = loadData("news.json");
  const filtered = news.filter((n) => n.id !== req.params.id);
  saveData("news.json", filtered);
  res.json({ message: "News deleted" });
});

app.get("/api/notifications", (req, res) => {
  const notifications = loadData("notifications.json");
  res.json(notifications.slice(0, 20));
});

app.put("/api/notifications/read-all", (req, res) => {
  const notifications = loadData("notifications.json");
  const updated = notifications.map((n) => ({ ...n, read: true }));
  saveData("notifications.json", updated);
  res.json({ message: "All marked as read" });
});

/* ==========================================
 * DEALER ORDERS
 * ========================================== */

app.post("/api/dealer-orders", (req, res) => {
  const dealerOrders = loadData("dealer-orders.json");
  const order = {
    id: generateId(),
    orderId: "DLR-" + Date.now(),
    ...req.body,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  dealerOrders.unshift(order);
  saveData("dealer-orders.json", dealerOrders);
  res.status(201).json({ message: "Dealer order placed", order });
});

app.get("/api/admin/dealer-orders", (req, res) => {
  const dealerOrders = loadData("dealer-orders.json");
  res.json(
    dealerOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  );
});

app.put("/api/admin/dealer-orders/:id/status", (req, res) => {
  const dealerOrders = loadData("dealer-orders.json");
  const idx = dealerOrders.findIndex((o) => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Order not found" });
  dealerOrders[idx].status = req.body.status;
  dealerOrders[idx].updatedAt = new Date().toISOString();
  saveData("dealer-orders.json", dealerOrders);
  res.json({ message: "Status updated", order: dealerOrders[idx] });
});

/* ==========================================
 * DISPATCH MANAGEMENT
 * ========================================== */

app.put("/api/admin/orders/:id/dispatch", (req, res) => {
  const orders = loadData("orders.json");
  const idx = orders.findIndex(
    (o) => o.id === req.params.id || o.orderId === req.params.id,
  );
  if (idx === -1) return res.status(404).json({ error: "Order not found" });
  orders[idx].status = "dispatched";
  orders[idx].dispatchedAt = new Date().toISOString();
  orders[idx].trackingId = req.body.trackingId || "TRK-" + Date.now();
  orders[idx].estimatedDelivery =
    req.body.estimatedDelivery ||
    new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  orders[idx].deliveryPartner = req.body.deliveryPartner || "DPT Delivery";
  saveData("orders.json", orders);
  res.json({ message: "Order dispatched", order: orders[idx] });
});

app.get("/api/admin/orders/:id/dispatch-status", (req, res) => {
  const orders = loadData("orders.json");
  const order = orders.find(
    (o) => o.id === req.params.id || o.orderId === req.params.id,
  );
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json({
    status: order.status,
    dispatchedAt: order.dispatchedAt,
    trackingId: order.trackingId,
    estimatedDelivery: order.estimatedDelivery,
  });
});

/* ==========================================
 * ANALYTICS DASHBOARD
 * ========================================== */

app.get("/api/admin/analytics", (req, res) => {
  const filter = req.query.filter || "all";

  let orders = loadData("orders.json");
  let dealerOrders = loadData("dealer-orders.json");
  let users = loadData("users.json");
  let warranties = loadData("warranty.json");

  const now = new Date();
  now.setHours(23, 59, 59, 999);
  let startDate = new Date(0);

  if (filter === "today") {
    startDate = new Date(now);
    startDate.setHours(0, 0, 0, 0);
  } else if (filter === "7d") {
    startDate = new Date(now);
    startDate.setDate(startDate.getDate() - 7);
  } else if (filter === "30d") {
    startDate = new Date(now);
    startDate.setDate(startDate.getDate() - 30);
  }

  // Filter based on createdAt
  const inRange = (dStr) => {
    if (!dStr) return false;
    const d = new Date(dStr);
    return d >= startDate && d <= now;
  };

  if (filter !== "all") {
    orders = orders.filter((o) => inRange(o.createdAt));
    dealerOrders = dealerOrders.filter((o) => inRange(o.createdAt));
    users = users.filter((u) => !u.createdAt || inRange(u.createdAt));
    warranties = warranties.filter((w) => inRange(w.createdAt));
  }

  // Basic stats
  const totalCustomers = users.filter((u) => u.userType === "customer").length;
  const totalDealers = users.filter((u) => u.userType === "dealer").length;

  let totalRevenue = 0;
  let codOrders = 0;
  let onlineOrders = 0;

  const orderStatuses = {
    pending: 0,
    processing: 0,
    dispatched: 0,
    delivered: 0,
    cancelled: 0,
  };

  const productCounts = {};
  const monthly = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  // Process Customer Orders
  orders.forEach((o) => {
    // Total Revenue (only if not cancelled)
    if (o.status !== "cancelled" && o.status !== "CANCELLED") {
      const amount = o.totalAmount || (o.pricing && o.pricing.grandTotal) || 0;
      totalRevenue += amount;

      // Monthly Sales
      if (o.createdAt) {
        const d = new Date(o.createdAt);
        const month = d.toLocaleString("en-US", { month: "short" });
        if (monthly[month] !== undefined) monthly[month] += amount;
      }
    }

    // Payment splits
    if (o.paymentMethod === "COD") codOrders++;
    else onlineOrders++;

    // Order Status
    const s = (o.status || "pending").toLowerCase();
    if (orderStatuses[s] !== undefined) orderStatuses[s]++;
    else if (s === "pending_approval" || s === "approved")
      orderStatuses.pending++;

    // Product counts
    if (o.items && Array.isArray(o.items)) {
      o.items.forEach((item) => {
        const name = item.name || item.title || "Unknown Product";
        productCounts[name] = (productCounts[name] || 0) + (item.quantity || 1);
      });
    }
  });

  // Top Products Array
  const topProducts = Object.entries(productCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const totalOrdersCount = orders.length;

  res.json({
    summary: {
      totalRevenue,
      totalOrders: totalOrdersCount,
      codOrders,
      onlineOrders,
      totalCustomers,
      totalDealers,
      avgOrderValue:
        totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0,
      pendingOrders: orderStatuses.pending || 0,
      warrantyPending: warranties.filter((w) => w.status === "pending").length,
    },
    topProducts,
    monthlySales: monthly,
    orderStatuses,
    recentOrders: orders.slice(0, 5),
  });
});

/* ==========================================
 * CUSTOMER ORDERS (by user email)
 * ========================================== */

app.get("/api/my-orders", (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email required" });
  const orders = loadData("orders.json");
  const myOrders = orders.filter(
    (o) =>
      o.customerInfo?.email?.toLowerCase() === email.toLowerCase() ||
      o.userEmail?.toLowerCase() === email.toLowerCase(),
  );
  res.json(
    myOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  );
});

/* ==========================================
 * ANALYTICS DATA
 * ========================================== */

app.get("/api/admin/analytics", (req, res) => {
  const orders = loadData("orders.json");
  const users = loadData("users.json");
  const leads = loadData("leads.json");
  const warranty = loadData("warranty.json");
  const dealerOrders = loadData("dealer-orders.json");

  const totalRevenue = orders.reduce(
    (s, o) => s + (o.pricing?.grandTotal || 0),
    0,
  );
  const totalOrders = orders.length;
  const codOrders = orders.filter((o) => o.paymentMethod === "COD").length;
  const onlineOrders = orders.filter(
    (o) => o.paymentMethod === "online",
  ).length;
  const customers = users.filter((u) => u.userType === "customer");
  const dealers = users.filter((u) => u.userType === "dealer");
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const dispatchedOrders = orders.filter(
    (o) => o.status === "dispatched" || o.status === "delivered",
  ).length;

  // Product analytics
  const productSales = {};
  orders.forEach((o) => {
    (o.items || []).forEach((item) => {
      const name = item.name || "Unknown";
      if (!productSales[name]) productSales[name] = { count: 0, revenue: 0 };
      productSales[name].count += item.quantity || 1;
      productSales[name].revenue += (item.price || 0) * (item.quantity || 1);
    });
  });
  const topProducts = Object.entries(productSales)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10)
    .map(([name, data]) => ({ name, ...data }));

  // Monthly sales (last 6 months)
  const monthlySales = {};
  orders.forEach((o) => {
    const m = new Date(o.createdAt).toLocaleString("en-IN", {
      month: "short",
      year: "2-digit",
    });
    monthlySales[m] = (monthlySales[m] || 0) + (o.pricing?.grandTotal || 0);
  });

  res.json({
    summary: {
      totalRevenue,
      totalOrders,
      codOrders,
      onlineOrders,
      totalCustomers: customers.length,
      totalDealers: dealers.length,
      pendingOrders,
      dispatchedOrders,
      totalLeads: leads.length,
      avgOrderValue:
        totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0,
      warrantyPending: warranty.filter((w) => w.status === "pending").length,
    },
    topProducts,
    monthlySales,
    orderStatuses: {
      pending: orders.filter((o) => o.status === "pending").length,
      processing: orders.filter((o) => o.status === "processing").length,
      dispatched: orders.filter((o) => o.status === "dispatched").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
    },
    recentOrders: orders.slice(0, 5),
  });
});

/* ==========================================
 * USER PROFILE UPDATE
 * ========================================== */

app.put("/api/user/profile", (req, res) => {
  const { email, name, phone, address } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });
  const users = loadData("users.json");
  const idx = users.findIndex(
    (u) => u.email?.toLowerCase() === email.toLowerCase(),
  );
  if (idx === -1) return res.status(404).json({ error: "User not found" });
  if (name) users[idx].name = name;
  if (phone) users[idx].phone = phone;
  if (address) users[idx].address = address;
  saveData("users.json", users);
  const { password: _pw, ...safe } = users[idx];
  res.json({ message: "Profile updated", user: safe });
});

// Start
const PORT = env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`✅ Dushyant Power Tools API Backend Running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`-------------------------------------------------`);
  console.log(`  Auth Endpoints:`);
  console.log(`  POST /api/auth/register`);
  console.log(`  POST /api/auth/dealer/register`);
  console.log(`  POST /api/auth/shopkeeper/register`);
  console.log(`  POST /api/auth/login`);
  console.log(`-------------------------------------------------`);
  console.log(`  Admin Endpoints:`);
  console.log(`  GET  /api/admin/users`);
  console.log(`  GET  /api/admin/leads`);
  console.log(`  GET  /api/admin/orders`);
  console.log(`-------------------------------------------------`);
  console.log(`  v1 Core Endpoints Available`);
  console.log(`=================================================`);
});
