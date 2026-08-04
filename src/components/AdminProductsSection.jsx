import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, AlertTriangle, Package } from "lucide-react";
import ToolImage from "./ToolImage";

const API = "/api";

export default function AdminProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) return null; // silently hide while loading
  if (products.length === 0) return null; // nothing added yet → don't render

  return (
    <section
      style={{
        padding: "80px 24px",
        background: "white",
        color: "black",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ marginBottom: "48px" }}>
          <p
            style={{
              fontSize: "10px",
              fontWeight: 900,
              letterSpacing: "0.3em",
              color: "black",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            FEATURED PRODUCTS
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.04em",
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            Our <span style={{ color: "black" }}>Top Picks</span>
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((p) => {
            const isOut = p.stockStatus === "Out of Stock";
            const isLow = p.stockStatus === "Low Stock";
            const hasDeal = p.mrp_inr && p.price_inr && p.mrp_inr > p.price_inr;
            const pct = hasDeal
              ? Math.round(((p.mrp_inr - p.price_inr) / p.mrp_inr) * 100)
              : 0;

            return (
              <div
                key={p._id}
                onClick={() => !isOut && navigate(`/product/${p._id}`)}
                style={{
                  background: "192, 192, 192",
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "3D3D3D",
                  cursor: isOut ? "not-allowed" : "pointer",
                  transition: "transform 0.2s, border-color 0.2s",
                  opacity: isOut ? 0.75 : 1,
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (!isOut)
                    e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "#dc2626";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.borderColor = "#222";
                }}
              >
                {/* Out-of-stock overlay */}
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
                        color: "#ffff",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Discount badge */}
                {hasDeal && !isOut && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      zIndex: 5,
                      background: "white",
                      color: "black",
                      fontSize: "10px",
                      fontWeight: 900,
                      padding: "4px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    -{pct}%
                  </div>
                )}

                {/* Low stock badge */}
                {isLow && !isOut && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      zIndex: 5,
                      background: "#d97706",
                      color: "#fff",
                      fontSize: "9px",
                      fontWeight: 900,
                      padding: "3px 8px",
                      borderRadius: "6px",
                      textTransform: "uppercase",
                    }}
                  >
                    Only {p.stock_quantity} left!
                  </div>
                )}

                {/* Image */}
                <div
                  style={{
                    height: "200px",
                    background: "#FAF9F6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        padding: "16px",
                      }}
                    />
                  ) : (
                    <ToolImage
                      toolName={p.name}
                      category={p.category}
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: "16px" }}>
                  <p
                    style={{
                      fontSize: "9px",
                      fontWeight: 800,
                      color: "black",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      margin: "0 0 6px",
                    }}
                  >
                    {p.brand}
                  </p>
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: 900,
                      color: "black",
                      margin: "0 0 12px",
                      lineHeight: 1.3,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {p.name}
                  </h3>

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
                          fontSize: "18px",
                          fontWeight: 900,
                          color: "black",
                          margin: 0,
                        }}
                      >
                        ₹
                        {(p.price_inr || p.mrp_inr || 0).toLocaleString(
                          "en-IN",
                        )}
                      </p>
                      {hasDeal && (
                        <p
                          style={{
                            fontSize: "11px",
                            color: "red",
                            textDecoration: "line-through",
                            margin: "2px 0 0",
                          }}
                        >
                          ₹{p.mrp_inr.toLocaleString("en-IN")}
                        </p>
                      )}
                    </div>
                    {!isOut && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${p._id}`);
                        }}
                        style={{
                          background: "#dc2626",
                          border: "none",
                          borderRadius: "8px",
                          padding: "8px 14px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "11px",
                          fontWeight: 900,
                          color: "#fff",
                          textTransform: "uppercase",
                        }}
                      >
                        <ShoppingCart size={14} /> View
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
