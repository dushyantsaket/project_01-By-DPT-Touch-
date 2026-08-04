import React, { useState, useRef } from "react";
import {
  X,
  Upload,
  Plus,
  Trash2,
  Image,
  FileText,
  Video,
  Tag,
  Package,
  DollarSign,
  Layers,
  Save,
  AlertTriangle,
} from "lucide-react";

const API = "/api";

const CATEGORIES = [
  { value: "power-tools", label: "Power Tools" },
  { value: "hand-tools", label: "Hand Tools" },
  { value: "safety-ppe", label: "Safety & PPE" },
  { value: "welding-tools", label: "Welding Tools" },
  { value: "agriculture-tools", label: "Agriculture Tools" },
  { value: "tool-storage", label: "Tool Storage" },
  { value: "spare-parts", label: "Spare Parts" },
  { value: "cordless-tools", label: "Cordless Tools" },
  { value: "abrasives", label: "Abrasives" },
  { value: "all-products", label: "All Products" },
];

const inp = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: 600,
  outline: "none",
  background: "#fff",
  color: "#111",
  boxSizing: "border-box",
};
const label = {
  fontSize: "10px",
  fontWeight: 900,
  textTransform: "uppercase",
  color: "#6b7280",
  letterSpacing: "0.05em",
  display: "block",
  marginBottom: "6px",
};

export default function AdminProductForm({
  editProduct,
  onSuccess,
  onClose,
  token,
}) {
  const isEdit = !!editProduct;

  const [form, setForm] = useState({
    name: editProduct?.name || "",
    brand: editProduct?.brand || "DPT Original",
    category: editProduct?.category || "power-tools",
    subCategory: editProduct?.subCategory || "",
    description: editProduct?.description || "",
    mrp_inr: editProduct?.mrp_inr ?? editProduct?.price_inr ?? "",
    discount: editProduct?.discount ?? 0,
    stock_quantity: editProduct?.stock_quantity ?? 50,
    isActive: editProduct?.isActive ?? true,
    videoUrl: editProduct?.videoUrl || "",
    tags: editProduct?.tags || [],
    specifications: editProduct?.specifications || [],
    images: editProduct?.images || [],
    pdfUrl: editProduct?.pdfUrl || "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState(editProduct?.images || []);
  const [videoFile, setVideoFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("basic");

  const imgRef = useRef();
  const vidRef = useRef();
  const pdfRef = useRef();

  /* ── Derived values ──────────────────────────────────────────────── */
  const finalPrice = form.mrp_inr
    ? Math.round(form.mrp_inr - (form.mrp_inr * form.discount) / 100)
    : 0;

  const stockStatus =
    form.stock_quantity <= 0
      ? "Out of Stock"
      : form.stock_quantity < 5
        ? "Low Stock"
        : "In Stock";

  /* ── Field helpers ────────────────────────────────────────────────── */
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  /* ── Image preview ────────────────────────────────────────────────── */
  const handleImageFiles = (files) => {
    const newFiles = Array.from(files);
    setImageFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((f) => {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrls((prev) => [...prev, e.target.result]);
      reader.readAsDataURL(f);
    });
  };

  const removeImage = (idx) => {
    const existingCount = (editProduct?.images || []).length;
    if (idx < existingCount) {
      setImageUrls((prev) => prev.filter((_, i) => i !== idx));
    } else {
      const newIdx = idx - existingCount;
      setImageFiles((prev) => prev.filter((_, i) => i !== newIdx));
      setImageUrls((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  /* ── Specs ────────────────────────────────────────────────────────── */
  const addSpec = () =>
    setForm((f) => ({
      ...f,
      specifications: [...f.specifications, { key: "", value: "" }],
    }));
  const updateSpec = (i, field, val) =>
    setForm((f) => ({
      ...f,
      specifications: f.specifications.map((s, idx) =>
        idx === i ? { ...s, [field]: val } : s,
      ),
    }));
  const removeSpec = (i) =>
    setForm((f) => ({
      ...f,
      specifications: f.specifications.filter((_, idx) => idx !== i),
    }));

  /* ── Tags ─────────────────────────────────────────────────────────── */
  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      setForm((f) => ({ ...f, tags: [...f.tags, t] }));
      setTagInput("");
    }
  };
  const removeTag = (t) =>
    setForm((f) => ({ ...f, tags: f.tags.filter((x) => x !== t) }));

  /* ── Submit ───────────────────────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (!form.name?.trim()) {
      setError("Product name is required");
      return;
    }
    if (
      form.mrp_inr === "" ||
      form.mrp_inr == null ||
      Number(form.mrp_inr) < 0
    ) {
      setError("MRP price cannot be negative");
      return;
    }
    if (form.stock_quantity < 0) {
      setError("Stock quantity cannot be negative");
      return;
    }

    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("brand", form.brand);
      fd.append("category", form.category);
      fd.append("subCategory", form.subCategory);
      fd.append("description", form.description);
      fd.append("mrp_inr", form.mrp_inr);
      fd.append("discount", form.discount);
      fd.append("stock_quantity", form.stock_quantity);
      fd.append("isActive", form.isActive);
      fd.append("videoUrl", form.videoUrl);
      fd.append("specifications", JSON.stringify(form.specifications));
      fd.append("tags", JSON.stringify(form.tags));

      // existing image URLs (for edit mode)
      if (isEdit) {
        imageUrls
          .filter((url) => !url.startsWith("data:"))
          .forEach((url) => fd.append("images", url));
      }

      // new image files
      imageFiles.forEach((f) => fd.append("images", f));
      if (videoFile) fd.append("video", videoFile);
      if (pdfFile) fd.append("pdf", pdfFile);

      const url = isEdit
        ? `${API}/products/${editProduct._id}`
        : `${API}/products`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Backend error:", data);
        throw new Error(data.error || "Request failed");
      }

      onSuccess(data, isEdit ? "updated" : "added");
    } catch (err) {
      console.error("Form submission error:", err);

      // Always attempt local save as fallback
      const localProduct = {
        ...form,
        _id: editProduct?._id ?? `LOCAL-${Date.now()}`,
        images: imageUrls,
        price_inr: finalPrice,
        stock_quantity: Number(form.stock_quantity || 0),
        stockStatus,
        isActive: form.isActive,
      };

      if (onSuccess) {
        onSuccess(localProduct, isEdit ? "updated" : "added");
        return;
      }

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ── UI ─────────────────────────────────────────────────────────── */
  const tabs = [
    { id: "basic", label: "Basic Info", icon: Package },
    { id: "media", label: "Media", icon: Image },
    { id: "pricing", label: "Price & Stock", icon: DollarSign },
    { id: "specs", label: "Specs & Tags", icon: Layers },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        zIndex: 3000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "720px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 32px 64px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 28px",
            background: "#f8fafc",
            color: "#111",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                margin: 0,
                color: "#111",
              }}
            >
              {isEdit ? "Edit Product" : "Add Product"}
            </h2>
            <p
              style={{
                fontSize: "11px",
                color: "#6b7280",
                margin: "6px 0 0",
                fontWeight: 700,
              }}
            >
              Simple admin form — update price, stock and product details here.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#111",
              border: "none",
              borderRadius: "999px",
              padding: "10px",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #f0f0f0",
            background: "#fafafa",
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                flex: 1,
                padding: "14px 8px",
                border: "none",
                cursor: "pointer",
                background: activeTab === t.id ? "#fff" : "transparent",
                borderBottom: `2px solid ${activeTab === t.id ? "#dc2626" : "transparent"}`,
                fontSize: "10px",
                fontWeight: 900,
                textTransform: "uppercase",
                color: activeTab === t.id ? "#dc2626" : "#6b7280",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                transition: "all 0.2s",
              }}
            >
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>

        {/* Form body */}
        <form
          onSubmit={handleSubmit}
          style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}
        >
          {error && (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                padding: "12px 16px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#dc2626",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          {/* ── BASIC INFO ─────────────────────────────────────────── */}
          {activeTab === "basic" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              <div>
                <span style={label}>Product Name *</span>
                <input
                  style={inp}
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="e.g. Bosch GBH 2-26 DRE"
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
              >
                <div>
                  <span style={label}>Brand</span>
                  <input
                    style={inp}
                    value={form.brand}
                    onChange={(e) => set("brand", e.target.value)}
                    placeholder="e.g. Bosch, Ingco"
                  />
                </div>
                <div>
                  <span style={label}>Sub-Category</span>
                  <input
                    style={inp}
                    value={form.subCategory}
                    onChange={(e) => set("subCategory", e.target.value)}
                    placeholder="e.g. Rotary Hammer"
                  />
                </div>
              </div>
              <div>
                <span style={label}>Category *</span>
                <select
                  style={inp}
                  required
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <span style={label}>Product Description</span>
                <textarea
                  style={{
                    ...inp,
                    minHeight: "100px",
                    resize: "vertical",
                    lineHeight: 1.6,
                  }}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="Describe the product features, uses, and benefits..."
                />
              </div>
            </div>
          )}

          {/* ── MEDIA ───────────────────────────────────────────────── */}
          {activeTab === "media" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {/* Image upload area */}
              <div>
                <span style={label}>Product Images (up to 10)</span>
                <div
                  onClick={() => imgRef.current.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleImageFiles(e.dataTransfer.files);
                  }}
                  style={{
                    border: "2px dashed #e5e7eb",
                    borderRadius: "12px",
                    padding: "32px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: "#fafafa",
                    transition: "border-color 0.2s",
                  }}
                >
                  <Upload
                    size={32}
                    color="#9ca3af"
                    style={{ marginBottom: "8px" }}
                  />
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#6b7280",
                      margin: 0,
                    }}
                  >
                    Click or drag images here
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#9ca3af",
                      margin: "4px 0 0",
                    }}
                  >
                    JPG, PNG, WebP — up to 50MB each
                  </p>
                  <input
                    ref={imgRef}
                    type="file"
                    multiple
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageFiles(e.target.files)}
                  />
                </div>
                {imageUrls.length > 0 && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(90px, 1fr))",
                      gap: "10px",
                      marginTop: "14px",
                    }}
                  >
                    {imageUrls.map((url, i) => (
                      <div
                        key={i}
                        style={{
                          position: "relative",
                          borderRadius: "8px",
                          overflow: "hidden",
                          border: "1px solid #e5e7eb",
                          aspectRatio: "1",
                        }}
                      >
                        <img
                          src={url}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "4px",
                            background: "#dc2626",
                            border: "none",
                            borderRadius: "4px",
                            padding: "2px",
                            cursor: "pointer",
                            display: "flex",
                          }}
                        >
                          <X size={12} color="#fff" />
                        </button>
                        {i === 0 && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              background: "#111",
                              color: "#fff",
                              fontSize: "8px",
                              fontWeight: 900,
                              textAlign: "center",
                              padding: "2px",
                              textTransform: "uppercase",
                            }}
                          >
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video */}
              <div>
                <span style={label}>Product Video</span>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    style={{ ...inp, flex: 1 }}
                    value={form.videoUrl}
                    onChange={(e) => set("videoUrl", e.target.value)}
                    placeholder="Paste YouTube / video URL (optional)"
                  />
                  <button
                    type="button"
                    onClick={() => vidRef.current.click()}
                    style={{
                      padding: "10px 16px",
                      background: "#f3f4f6",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "11px",
                      fontWeight: 800,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Video size={14} /> Upload
                  </button>
                  <input
                    ref={vidRef}
                    type="file"
                    accept="video/*"
                    style={{ display: "none" }}
                    onChange={(e) => setVideoFile(e.target.files[0])}
                  />
                </div>
                {videoFile && (
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#22c55e",
                      marginTop: "6px",
                      fontWeight: 700,
                    }}
                  >
                    ✅ {videoFile.name}
                  </p>
                )}
              </div>

              {/* PDF */}
              <div>
                <span style={label}>Product Brochure / PDF</span>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div
                    style={{
                      ...inp,
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#6b7280",
                    }}
                  >
                    <FileText size={16} />
                    <span style={{ fontSize: "12px" }}>
                      {pdfFile
                        ? pdfFile.name
                        : form.pdfUrl
                          ? "Existing PDF attached"
                          : "No PDF uploaded"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => pdfRef.current.click()}
                    style={{
                      padding: "10px 16px",
                      background: "#f3f4f6",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "11px",
                      fontWeight: 800,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Upload size={14} /> Upload PDF
                  </button>
                  <input
                    ref={pdfRef}
                    type="file"
                    accept=".pdf"
                    style={{ display: "none" }}
                    onChange={(e) => setPdfFile(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── PRICING & STOCK ───────────────────────────────────── */}
          {activeTab === "pricing" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
              >
                <div>
                  <span style={label}>MRP (₹) *</span>
                  <input
                    style={inp}
                    type="number"
                    min="0"
                    required
                    value={form.mrp_inr}
                    onChange={(e) => set("mrp_inr", Number(e.target.value))}
                    placeholder="Maximum Retail Price"
                  />
                </div>
                <div>
                  <span style={label}>Discount (%)</span>
                  <input
                    style={inp}
                    type="number"
                    min="0"
                    max="100"
                    value={form.discount}
                    onChange={(e) => set("discount", Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Live price preview */}
              <div
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "12px",
                  padding: "18px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        color: "#16a34a",
                        margin: 0,
                      }}
                    >
                      Selling Price (Auto-calculated)
                    </p>
                    <p
                      style={{
                        fontSize: "28px",
                        fontWeight: 900,
                        color: "#111",
                        margin: "4px 0 0",
                      }}
                    >
                      ₹{finalPrice.toLocaleString("en-IN")}
                    </p>
                  </div>
                  {form.discount > 0 && (
                    <div style={{ textAlign: "right" }}>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#6b7280",
                          textDecoration: "line-through",
                          margin: 0,
                        }}
                      >
                        MRP ₹{Number(form.mrp_inr).toLocaleString("en-IN")}
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: 900,
                          color: "#dc2626",
                          margin: "4px 0 0",
                        }}
                      >
                        Save {form.discount}%
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
              >
                <div>
                  <span style={label}>Stock Quantity *</span>
                  <input
                    style={inp}
                    type="number"
                    min="0"
                    required
                    value={form.stock_quantity}
                    onChange={(e) =>
                      set("stock_quantity", Number(e.target.value))
                    }
                  />
                </div>
                <div>
                  <span style={label}>Visibility</span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      type="button"
                      onClick={() => set("isActive", true)}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: "10px",
                        border: form.isActive
                          ? "1px solid #111"
                          : "1px solid #e5e7eb",
                        background: form.isActive ? "#111" : "#f8fafc",
                        color: form.isActive ? "#fff" : "#111",
                        fontSize: "11px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Live
                    </button>
                    <button
                      type="button"
                      onClick={() => set("isActive", false)}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: "10px",
                        border: !form.isActive
                          ? "1px solid #111"
                          : "1px solid #e5e7eb",
                        background: !form.isActive ? "#111" : "#f8fafc",
                        color: !form.isActive ? "#fff" : "#111",
                        fontSize: "11px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Private
                    </button>
                  </div>
                </div>
              </div>

              {/* Stock status preview */}
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background:
                    stockStatus === "Out of Stock"
                      ? "#fef2f2"
                      : stockStatus === "Low Stock"
                        ? "#fffbeb"
                        : "#f0fdf4",
                  border: `1px solid ${stockStatus === "Out of Stock" ? "#fecaca" : stockStatus === "Low Stock" ? "#fde68a" : "#bbf7d0"}`,
                }}
              >
                {stockStatus === "Out of Stock" && (
                  <AlertTriangle size={18} color="#dc2626" />
                )}
                {stockStatus === "Low Stock" && (
                  <AlertTriangle size={18} color="#d97706" />
                )}
                {stockStatus === "In Stock" && (
                  <Package size={18} color="#16a34a" />
                )}
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 900,
                      color: "#111",
                      margin: 0,
                    }}
                  >
                    Status:{" "}
                    <span
                      style={{
                        color:
                          stockStatus === "Out of Stock"
                            ? "#dc2626"
                            : stockStatus === "Low Stock"
                              ? "#d97706"
                              : "#16a34a",
                      }}
                    >
                      {stockStatus}
                    </span>
                  </p>
                  <p
                    style={{
                      fontSize: "10px",
                      color: "#6b7280",
                      margin: "2px 0 0",
                      fontWeight: 600,
                    }}
                  >
                    {stockStatus === "Out of Stock"
                      ? "Product will show OUT OF STOCK on homepage"
                      : stockStatus === "Low Stock"
                        ? "Warning will show — only a few units left"
                        : "Product is available and will show on homepage"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── SPECS & TAGS ─────────────────────────────────────── */}
          {activeTab === "specs" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {/* Specifications */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <span style={label}>Technical Specifications</span>
                  <button
                    type="button"
                    onClick={addSpec}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "#111",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 12px",
                      fontSize: "10px",
                      fontWeight: 900,
                      cursor: "pointer",
                      textTransform: "uppercase",
                    }}
                  >
                    <Plus size={12} /> Add Row
                  </button>
                </div>
                {form.specifications.length === 0 ? (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9ca3af",
                      fontWeight: 600,
                    }}
                  >
                    No specs added. Click "Add Row" to add.
                  </p>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {form.specifications.map((s, i) => (
                      <div
                        key={i}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr auto",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <input
                          style={inp}
                          value={s.key}
                          placeholder="e.g. Voltage"
                          onChange={(e) => updateSpec(i, "key", e.target.value)}
                        />
                        <input
                          style={inp}
                          value={s.value}
                          placeholder="e.g. 220V"
                          onChange={(e) =>
                            updateSpec(i, "value", e.target.value)
                          }
                        />
                        <button
                          type="button"
                          onClick={() => removeSpec(i)}
                          style={{
                            padding: "10px",
                            background: "#fef2f2",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            color: "#dc2626",
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div>
                <span style={label}>Tags</span>
                <div
                  style={{ display: "flex", gap: "8px", marginBottom: "10px" }}
                >
                  <input
                    style={{ ...inp, flex: 1 }}
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="Type tag and press Enter"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    style={{
                      padding: "10px 16px",
                      background: "#111",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "11px",
                      fontWeight: 800,
                    }}
                  >
                    <Tag size={14} /> Add
                  </button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {form.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        background: "#111",
                        color: "#fff",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: 700,
                      }}
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => removeTag(t)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "rgba(255,255,255,0.6)",
                          padding: 0,
                          display: "flex",
                        }}
                      >
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div
          style={{
            padding: "16px 28px",
            borderTop: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            background: "#fafafa",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "12px 24px",
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              fontSize: "11px",
              fontWeight: 900,
              textTransform: "uppercase",
              cursor: "pointer",
              color: "#6b7280",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: "12px 28px",
              background: loading ? "#9ca3af" : "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "11px",
              fontWeight: 900,
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Save size={14} />
            {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
