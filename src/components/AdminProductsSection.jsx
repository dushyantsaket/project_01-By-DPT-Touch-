import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  Grid2X2,
  ListFilter,
  ShoppingCart,
} from "lucide-react";
import ToolImage from "./ToolImage";
import { cordlessData } from "../data/cordlessData";
import { grinderPartsData } from "../data/grinderPartsData";
import { powerToolsData } from "../data/powerTools";

const API = "/api";

const categoryCards = [
  { id: "all", name: "All Products", count: "All", keywords: [] },
  {
    id: "air-tools",
    name: "Air Tools",
    count: 21,
    keywords: ["air", "pneumatic", "blower", "compressor"],
  },
  {
    id: "automobile-tools",
    name: "Automobile Tools",
    count: 13,
    keywords: ["automobile", "car", "vehicle", "garage"],
  },
  {
    id: "cordless-power-tools",
    name: "Cordless Power Tools",
    count: 22,
    keywords: ["cordless", "20v", "battery"],
  },
  {
    id: "spare-parts",
    name: "Spare Parts",
    count: grinderPartsData.length,
    keywords: [
      "spare-parts",
      "spare part",
      "armature",
      "carbon brush",
      "stator",
      "switch",
      "bearing",
    ],
  },
  {
    id: "garden-tools",
    name: "Garden Tools",
    count: 50,
    keywords: ["garden", "chainsaw", "chain saw", "trimmer", "brush cutter"],
  },
  {
    id: "hand-tools",
    name: "Hand Tools",
    count: 508,
    keywords: ["hand-tools", "hand tools", "plier", "hammer", "spanner"],
  },
  {
    id: "hardware",
    name: "Hardware",
    count: 43,
    keywords: ["hardware", "fastener", "screw", "nut", "bolt"],
  },
  {
    id: "light-construction-tools",
    name: "Light Construction Tools",
    count: 4,
    keywords: ["construction", "concrete", "vibrator", "demolition"],
  },
  {
    id: "material-handling",
    name: "Material Handling & Packing Equipments",
    count: 21,
    keywords: ["material", "handling", "packing", "trolley", "hoist"],
  },
  {
    id: "measuring-tools",
    name: "Measuring Tools",
    count: 57,
    keywords: ["measuring", "measure", "level", "laser"],
  },
  {
    id: "power-tools",
    name: "Power Tools",
    count: 146,
    keywords: ["power-tools", "power tools", "grinder", "drill", "hammer"],
  },
  {
    id: "power-tools-accessories",
    name: "Power Tools Accessories",
    count: 226,
    keywords: ["accessories", "blade", "disc", "wheel", "bit", "pad"],
  },
  {
    id: "blades",
    name: "Blades Collection",
    count: 120,
    keywords: [
      "blade",
      "diamond",
      "diamond blade",
      "tct",
      "tct saw",
      "saw blade",
      "brush cutter",
      "alldiamond",
    ],
  },
  { id: "pumps", name: "Pumps", count: 25, keywords: ["pump", "washer"] },
  {
    id: "pump-accessories",
    name: "Pump Accessories",
    count: 2,
    keywords: ["pump accessories", "pump-accessories", "hose"],
  },
  {
    id: "safety-products",
    name: "Safety Products",
    count: 65,
    keywords: ["safety", "ppe", "helmet", "glove", "mask"],
  },
  {
    id: "welding",
    name: "Welding",
    count: 17,
    keywords: ["welding", "welder", "holder", "mma"],
  },
  {
    id: "painting-accessories",
    name: "Painting Accessories",
    count: 59,
    keywords: ["painting", "paint", "spray"],
  },
  {
    id: "electrical-accessories",
    name: "Electrical Accessories",
    count: 32,
    keywords: ["electrical", "electric", "socket", "switch"],
  },
  { id: "sockets", name: "Sockets", count: 64, keywords: ["socket"] },
  {
    id: "miscellaneous",
    name: "Miscellaneous",
    count: 2,
    keywords: ["misc", "miscellaneous"],
  },
];

const localCatalogProducts = [
  ...powerToolsData.slice(0, 90),
  ...cordlessData.products.slice(0, 30).map((product) => ({
    ...product,
    id: product.productId,
    brand: "INGCO",
    category: "cordless-power-tools",
  })),
  ...grinderPartsData,
];

const getProductId = (product) =>
  product._id || product.id || product.productId || product.sku;

const normalizeProduct = (product, source = "api") => {
  const price =
    product.price_inr ?? product.sale_price ?? product.price ?? null;
  const mrp = product.mrp_inr ?? product.regular_price ?? product.mrp ?? null;
  const id = getProductId(product);

  return {
    ...product,
    _id: source === "api" ? id : `${source}-${id}`,
    source,
    id,
    price_inr: price,
    mrp_inr: mrp,
    stockStatus: product.stockStatus || "In Stock",
    stock_quantity: product.stock_quantity ?? 10,
    brand: product.brand || "DPT",
    category: product.category || "miscellaneous",
  };
};

const normalizeText = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const productMatchesCategory = (product, category) => {
  if (category.id === "all") return true;
  const haystack = normalizeText(
    `${product.category} ${product.sub_category} ${product.name} ${product.brand} ${product.description}`,
  );
  return category.keywords.some((keyword) =>
    haystack.includes(normalizeText(keyword)),
  );
};

export default function AdminProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const [sortOption, setSortOption] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/products/homepage`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const allFeaturedProducts = useMemo(() => {
    const seen = new Set();
    return [
      ...products.map((product) => normalizeProduct(product, "api")),
      ...localCatalogProducts.map((product) =>
        normalizeProduct(product, "catalog"),
      ),
    ].filter((product) => {
      const id = String(product.id || product._id || "");
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }, [products]);

  const activeCategory =
    categoryCards.find((category) => category.id === activeCategoryId) ||
    categoryCards[0];

  const filteredProducts = useMemo(
    () =>
      allFeaturedProducts.filter((product) =>
        productMatchesCategory(product, activeCategory),
      ),
    [allFeaturedProducts, activeCategory],
  );

  const sortedProducts = useMemo(() => {
    const arr = [...filteredProducts];
    if (!sortOption) return arr;
    switch (sortOption) {
      case "price_low_high":
        return arr.sort((a, b) => (a.price_inr || 0) - (b.price_inr || 0));
      case "price_high_low":
        return arr.sort((a, b) => (b.price_inr || 0) - (a.price_inr || 0));
      case "discount":
        return arr.sort((a, b) => {
          const da = (a.mrp_inr || 0) - (a.price_inr || 0);
          const db = (b.mrp_inr || 0) - (b.price_inr || 0);
          return db - da;
        });
      case "new_arrivals":
        // Prefer API source (assumed newer), then fallback to id
        return arr.sort((a, b) => {
          if (a.source === b.source) return 0;
          return a.source === "api" ? -1 : 1;
        });
      case "best_selling":
        // If no sales data, approximate by larger mrp->price difference
        return arr.sort((a, b) => {
          const sa = a.sales || a.sold_count || 0;
          const sb = b.sales || b.sold_count || 0;
          if (sa || sb) return sb - sa;
          const da = (a.mrp_inr || 0) - (a.price_inr || 0);
          const db = (b.mrp_inr || 0) - (b.price_inr || 0);
          return db - da;
        });
      default:
        return arr;
    }
  }, [filteredProducts, sortOption]);

  const visibleProducts = showAll
    ? sortedProducts
    : sortedProducts.slice(0, 24);

  const categoryPreviewProducts = useMemo(
    () =>
      categoryCards.reduce((acc, category) => {
        acc[category.id] =
          allFeaturedProducts.find((product) =>
            productMatchesCategory(product, category),
          ) || allFeaturedProducts[0];
        return acc;
      }, {}),
    [allFeaturedProducts],
  );

  if (loading && products.length === 0) return null;
  if (allFeaturedProducts.length === 0) return null;

  return (
    <section
      style={{ padding: "80px 24px", background: "#fff", color: "#000" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ marginBottom: "22px" }}>
          <p
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "#dc2626",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 900,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "12px",
              padding: "5px 10px",
              borderRadius: "2px",
            }}
          >
            FEATURED PRODUCTS
          </p>
          <h2
            style={{
              fontSize: "clamp(34px, 5vw, 54px)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.04em",
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            Our <span style={{ color: "#dc2626" }}>Top Picks</span>
          </h2>
          <p
            style={{
              color: "#4b5563",
              fontSize: "16px",
              margin: "12px 0 0",
              maxWidth: "640px",
            }}
          >
            Handpicked bestsellers and top-rated tools, accessories & spare
            parts.
          </p>
        </div>

        {/* Premium Accessories - Blades Collection */}
        <div
          style={{
            marginBottom: "24px",
            display: "flex",
            gap: "20px",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: 1 }}>
            <p
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#111827",
                color: "#fff",
                fontSize: "11px",
                fontWeight: 900,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "8px",
                padding: "5px 10px",
                borderRadius: "2px",
              }}
            >
              PREMIUM ACCESSORIES
            </p>
            <h3
              style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: 900,
                color: "#111827",
              }}
            >
              Professional — Blades Collection
            </h3>
            <p
              style={{ color: "#4b5563", marginTop: "8px", maxWidth: "760px" }}
            >
              Cut through the toughest materials with our high-grade diamond and
              TCT saw blades. Engineered for precision, speed, and extended
              service life in extreme environments.
            </p>

            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginTop: "12px",
              }}
            >
              <span
                style={{
                  background: "#f3f4f6",
                  padding: "6px 10px",
                  borderRadius: "999px",
                  fontWeight: 800,
                }}
              >
                High-Speed Precision
              </span>
              <span
                style={{
                  background: "#f3f4f6",
                  padding: "6px 10px",
                  borderRadius: "999px",
                  fontWeight: 800,
                }}
              >
                Alldiamond-blades
              </span>
              <span
                style={{
                  background: "#f3f4f6",
                  padding: "6px 10px",
                  borderRadius: "999px",
                  fontWeight: 800,
                }}
              >
                Diamond Saw Blades
              </span>
              <span
                style={{
                  background: "#f3f4f6",
                  padding: "6px 10px",
                  borderRadius: "999px",
                  fontWeight: 800,
                }}
              >
                TCT Saw Blades
              </span>
              <span
                style={{
                  background: "#f3f4f6",
                  padding: "6px 10px",
                  borderRadius: "999px",
                  fontWeight: 800,
                }}
              >
                Brush Cutter Blades
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              type="button"
              onClick={() => {
                setActiveCategoryId("blades");
                setShowAll(true);
                setSortOption(null);
              }}
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                padding: "12px 18px",
                borderRadius: "8px",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              See More (100+)
            </button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "#111827",
                fontSize: "15px",
                fontWeight: 900,
                textTransform: "uppercase",
              }}
            >
              Shop by Categories
            </h3>
            <h3
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#374151",
                fontWeight: 800,
              }}
            >
              Products (
              {activeCategoryId === "all"
                ? allFeaturedProducts.length
                : filteredProducts.length}
              )
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveCategoryId("all");
              setShowAll(false);
            }}
            style={{
              border: "none",
              background: "transparent",
              color: "#dc2626",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              fontWeight: 900,
            }}
          >
            View All Categories <ArrowRight size={16} />
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(178px, 1fr))",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          {categoryCards.slice(1).map((category) => {
            const previewProduct = categoryPreviewProducts[category.id];
            const active = activeCategoryId === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  setActiveCategoryId(category.id);
                  setShowAll(false);
                }}
                style={{
                  minHeight: "164px",
                  border: active ? "1.5px solid #dc2626" : "1px solid #e5e7eb",
                  borderRadius: "16px",
                  background: active ? "#fff5f5" : "#fff",
                  boxShadow: active
                    ? "0 16px 32px rgba(220,38,38,0.12)"
                    : "0 8px 24px rgba(15,23,42,0.06)",
                  padding: "14px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition:
                    "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderColor = "#dc2626";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.borderColor = active
                    ? "#dc2626"
                    : "#e5e7eb";
                }}
              >
                <div
                  style={{
                    height: "86px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "8px",
                  }}
                >
                  {previewProduct?.image ? (
                    <img
                      src={previewProduct.image}
                      alt={category.name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "86px",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <ToolImage
                      toolName={category.name}
                      category={category.id}
                      style={{ width: "100%", height: "86px" }}
                    />
                  )}
                </div>
                <strong
                  style={{
                    display: "block",
                    color: "#111827",
                    fontSize: "13px",
                    lineHeight: 1.25,
                    minHeight: "32px",
                  }}
                >
                  {category.name}
                </strong>
                <span
                  style={{
                    display: "block",
                    color: "#6b7280",
                    fontSize: "11px",
                    fontWeight: 700,
                    marginTop: "7px",
                  }}
                >
                  Products: {category.count}
                </span>
              </button>
            );
          })}
        </div>

        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            paddingTop: "16px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <button
              type="button"
              onClick={() => {
                setActiveCategoryId("all");
                setShowAll(false);
              }}
              style={{
                border: "none",
                borderRadius: "8px",
                background: activeCategoryId === "all" ? "#dc2626" : "#fff",
                color: activeCategoryId === "all" ? "#fff" : "#111827",
                boxShadow: "0 6px 18px rgba(15,23,42,0.08)",
                padding: "10px 18px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                fontWeight: 900,
              }}
            >
              <Grid2X2 size={15} /> All Products
            </button>
            {[
              { key: "best_selling", label: "Best Selling" },
              { key: "new_arrivals", label: "New Arrivals" },
              { key: "discount", label: "Discount" },
              { key: "price_low_high", label: "Price: Low to High" },
              { key: "price_high_low", label: "Price: High to Low" },
            ].map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() =>
                  setSortOption((s) => (s === opt.key ? null : opt.key))
                }
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  background: sortOption === opt.key ? "#dc2626" : "#fff",
                  color: sortOption === opt.key ? "#fff" : "#111827",
                  padding: "10px 18px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "12px",
                  fontWeight: 800,
                }}
              >
                <ListFilter size={14} /> {opt.label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <p
              style={{
                margin: 0,
                color: "#6b7280",
                fontSize: "13px",
                fontWeight: 800,
              }}
            >
              Showing {visibleProducts.length} of {filteredProducts.length}{" "}
              items
              {activeCategoryId !== "all" ? ` in ${activeCategory.name}` : ""}
            </p>
            {filteredProducts.length > 24 && (
              <button
                type="button"
                onClick={() => setShowAll((s) => !s)}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  background: showAll ? "#fff" : "#dc2626",
                  color: showAll ? "#111827" : "#fff",
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 900,
                }}
              >
                {showAll ? "Show Less" : `See All (${filteredProducts.length})`}
              </button>
            )}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {(() => {
            const featured = {
              id: "featured-cordless",
              title: "INGCO 20V Cordless Tools",
              subtitle: ".",
              bullets: [
                "One Battery Fits All Tools",
                "Rapid Charge Technology",
                "Heavy Duty Brushless Motors",
              ],
              image:
                "https://res-sg.togroup.com/stc/home_product/ingco/website-center/upload/images/25509f3165474f368e831a512cdff6e2.webp",
              link: "/cordless-tools",
            };

            const nodes = [];
            visibleProducts.forEach((product, idx) => {
              const isOut = product.stockStatus === "Out of Stock";
              const hasDeal =
                product.mrp_inr &&
                product.price_inr &&
                product.mrp_inr > product.price_inr;
              const pct = hasDeal
                ? Math.round(
                    ((product.mrp_inr - product.price_inr) / product.mrp_inr) *
                      100,
                  )
                : 0;
              const detailId = product.id || product._id;

              nodes.push(
                <div
                  key={product._id || `${product.source}-${detailId}-${idx}`}
                  onClick={() => !isOut && navigate(`/product/${detailId}`)}
                  style={{
                    background: "#fff",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 10px 28px rgba(15,23,42,0.06)",
                    cursor: isOut ? "not-allowed" : "pointer",
                    transition: "transform 0.2s, border-color 0.2s",
                    opacity: isOut ? 0.75 : 1,
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!isOut) {
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }
                    e.currentTarget.style.borderColor = "#dc2626";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.borderColor = "#e5e7eb";
                  }}
                >
                  {isOut && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 10,
                        background: "rgba(0,0,0,0.6)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <AlertTriangle size={28} color="#dc2626" />
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 900,
                          color: "#fff",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        OUT OF STOCK
                      </span>
                    </div>
                  )}

                  <div
                    style={{
                      height: "200px",
                      background: "#fafafa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          padding: "16px",
                        }}
                      />
                    ) : (
                      <ToolImage
                        toolName={product.name}
                        category={product.category}
                        style={{ width: "100%", height: "100%" }}
                      />
                    )}
                  </div>

                  <div style={{ padding: "14px" }}>
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: 800,
                        color: "#6b7280",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        margin: "0 0 6px",
                      }}
                    >
                      {product.category}
                    </p>

                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: 900,
                        color: "#111827",
                        margin: "0 0 10px",
                        lineHeight: 1.25,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "36px",
                      }}
                    >
                      {product.name}
                    </h3>

                    <div style={{ marginBottom: "10px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "8px",
                        }}
                      >
                        <div style={{ fontSize: "18px", fontWeight: 900 }}>
                          Rs.{" "}
                          {(
                            product.price_inr ||
                            product.mrp_inr ||
                            0
                          ).toLocaleString("en-IN")}
                        </div>
                        {product.mrp_inr &&
                          product.mrp_inr > (product.price_inr || 0) && (
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#6b7280",
                                textDecoration: "line-through",
                              }}
                            >
                              Rs. {product.mrp_inr.toLocaleString("en-IN")}
                            </div>
                          )}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#6b7280",
                          marginTop: "6px",
                        }}
                      >
                        Stock: {product.stock_quantity ?? "—"}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "12px",
                      }}
                    >
                      {!isOut ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${detailId}`);
                          }}
                          style={{
                            background: "#dc2626",
                            border: "none",
                            borderRadius: "8px",
                            padding: "8px 12px",
                            cursor: "pointer",
                            color: "#fff",
                            fontWeight: 900,
                          }}
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div style={{ color: "#6b7280", fontWeight: 900 }}>
                          Unavailable
                        </div>
                      )}

                      {hasDeal && (
                        <div style={{ color: "#dc2626", fontWeight: 900 }}>
                          -{pct}%
                        </div>
                      )}
                    </div>
                  </div>
                </div>,
              );

              // Insert featured card after 3rd item (index 2)
              if (idx === 2) {
                nodes.push(
                  <div
                    key={featured.id}
                    style={{
                      borderRadius: "14px",
                      border: "1px solid #e5e7eb",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "18px",
                      background: "linear-gradient(135deg,#fff,#fffaf5)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={featured.image}
                        alt={featured.title}
                        style={{
                          width: "96px",
                          height: "96px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                      <div>
                        <h3
                          style={{
                            margin: 0,
                            fontSize: "16px",
                            fontWeight: 900,
                          }}
                        >
                          {featured.title}
                        </h3>
                        <p style={{ margin: "8px 0", color: "#4b5563" }}>
                          {featured.subtitle}
                        </p>
                        <ul
                          style={{
                            margin: 0,
                            paddingLeft: "18px",
                            color: "#374151",
                          }}
                        >
                          {featured.bullets.map((b) => (
                            <li
                              key={b}
                              style={{ fontSize: "13px", fontWeight: 800 }}
                            >
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: "12px",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        onClick={() => navigate(featured.link)}
                        style={{
                          background: "#dc2626",
                          color: "#fff",
                          padding: "8px 14px",
                          borderRadius: "8px",
                          border: "none",
                          fontWeight: 900,
                        }}
                      >
                        Explore Cordless Range
                      </button>
                    </div>
                  </div>,
                );
              }
            });

            return nodes;
          })()}
        </div>
      </div>
    </section>
  );
}
