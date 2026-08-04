import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Plus, Edit2, Trash2 } from "lucide-react";
import { buildInitialCatalog } from "../utils/catalog/buildCatalog";

const API = "/api";

const ProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    product || {
      name: "",
      category: "tools",
      price_inr: 0,
      mrp_inr: 0,
      description: "",
      image: "",
      stock_quantity: 50,
    },
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name.includes("quantity") ||
        name.includes("price") ||
        name.includes("mrp")
          ? Number(value)
          : value,
    }));
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "8px",
          maxWidth: "600px",
          width: "90%",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h2>{product ? "Edit Product" : "Add New Product"}</h2>

        <div style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
          <div>
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontFamily: "inherit",
              }}
              placeholder="Product name"
            />
          </div>

          <div>
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontFamily: "inherit",
              }}
              placeholder="e.g., power-tools"
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            <div>
              <label>Selling Price (₹) *</label>
              <input
                type="number"
                name="price_inr"
                value={formData.price_inr}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontFamily: "inherit",
                }}
                placeholder="0"
              />
            </div>
            <div>
              <label>MRP (₹)</label>
              <input
                type="number"
                name="mrp_inr"
                value={formData.mrp_inr}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontFamily: "inherit",
                }}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label>Stock Quantity</label>
            <input
              type="number"
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontFamily: "inherit",
              }}
              placeholder="0"
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontFamily: "inherit",
                minHeight: "80px",
              }}
              placeholder="Product description"
            />
          </div>

          <div>
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontFamily: "inherit",
              }}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              border: "1px solid #ddd",
              background: "#f5f5f5",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            style={{
              padding: "8px 16px",
              background: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {product ? "Update" : "Add"} Product
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductsNew = () => {
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [cartToast, setCartToast] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const isAdmin = isLoggedIn && localStorage.getItem("userRole") === "admin";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/products?page=1&limit=100`);
      if (!res.ok) throw new Error("Failed to load products");
      const data = await res.json();
      const newProducts = Array.isArray(data.products) ? data.products : data;
      setProducts(newProducts);
      setHasMore(newProducts.length === 100);
    } catch (error) {
      console.warn("Failed to load products:", error);
      const fallbackProducts = buildInitialCatalog()
        .slice(0, 100)
        .map((product) => ({
          ...product,
          _id: product._id || product.id,
          price_inr:
            product.price_inr || product.price || product.sale_price || 0,
          mrp_inr: product.mrp_inr || product.regular_price || product.mrp || 0,
        }));
      setProducts(fallbackProducts);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    const isOutOfStock =
      product.stockStatus === "Out of Stock" ||
      Number(product.stock_quantity ?? 0) <= 0;
    if (isOutOfStock) return;
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price_inr,
      image: product.image,
      stockStatus: product.stockStatus,
      stock_quantity: product.stock_quantity,
      quantity: 1,
    };
    addToCart(cartItem);
    setCartToast(product.name);
    setTimeout(() => setCartToast(null), 2500);
  };

  const handleSaveProduct = async (formData) => {
    try {
      const method = editingProduct ? "PUT" : "POST";
      const url = editingProduct
        ? `${API}/products/${editingProduct._id}`
        : `${API}/products`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save product");
      const savedProduct = await response.json();

      if (editingProduct) {
        setProducts((prev) =>
          prev.map((p) => (p._id === savedProduct._id ? savedProduct : p)),
        );
      } else {
        setProducts((prev) => [savedProduct, ...prev]);
      }

      setShowModal(false);
      setEditingProduct(null);
      setCartToast(editingProduct ? "Product updated" : "Product added");
      setTimeout(() => setCartToast(null), 2500);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(`${API}/products/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      setCartToast("Product deleted");
      setTimeout(() => setCartToast(null), 2500);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <section
      id="products"
      style={{
        padding: isMobile ? "20px 0" : "40px 0",
        background: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile ? "0 15px" : "0 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: isMobile ? "20px" : "30px",
            flexDirection: isMobile ? "column" : "row",
            gap: "15px",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "24px" : "32px",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            Products ({products.length})
          </h2>
          {isAdmin && (
            <button
              onClick={() => {
                setEditingProduct(null);
                setShowModal(true);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: isMobile ? "14px" : "16px",
              }}
            >
              <Plus size={20} /> Add Product
            </button>
          )}
        </div>

        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#999",
            }}
          >
            Loading products...
          </div>
        )}

        {!loading && products.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#999",
            }}
          >
            No products available
          </div>
        )}

        {!loading && products.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "repeat(auto-fill, minmax(150px, 1fr))"
                : "repeat(auto-fill, minmax(200px, 1fr))",
              gap: isMobile ? "12px" : "20px",
            }}
          >
            {products.map((product) => {
              const isOutOfStock =
                product.stockStatus === "Out of Stock" ||
                Number(product.stock_quantity ?? 0) <= 0;

              return (
                <div
                  key={product._id || product.id}
                  style={{
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    overflow: "hidden",
                    transition: "box-shadow 0.2s, transform 0.2s",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    opacity: isOutOfStock ? 0.58 : 1,
                  }}
                  onClick={() =>
                    navigate(`/product/${product._id || product.id}`)
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.1)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      height: isMobile ? "120px" : "160px",
                      background: "#f9fafb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {isOutOfStock && (
                      <span
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          zIndex: 2,
                          background: "#dc2626",
                          color: "#fff",
                          borderRadius: "4px",
                          padding: "4px 8px",
                          fontSize: "10px",
                          fontWeight: 900,
                          letterSpacing: "0.04em",
                        }}
                      >
                        OUT OF STOCK
                      </span>
                    )}
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          padding: "8px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          textAlign: "center",
                          color: "#d1d5db",
                          fontSize: "12px",
                        }}
                      >
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      padding: isMobile ? "10px" : "12px",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: isMobile ? "13px" : "14px",
                        fontWeight: "600",
                        margin: "0 0 6px 0",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {product.name}
                    </h3>

                    <p
                      style={{
                        fontSize: isMobile ? "11px" : "12px",
                        color: "#6b7280",
                        margin: "0 0 8px 0",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.category}
                    </p>

                    {/* Price */}
                    <div style={{ marginBottom: "8px" }}>
                      <div
                        style={{
                          fontSize: isMobile ? "14px" : "16px",
                          fontWeight: "700",
                          color: "#dc2626",
                        }}
                      >
                        ₹{product.price_inr}
                      </div>
                      {product.mrp_inr > product.price_inr && (
                        <div
                          style={{
                            fontSize: isMobile ? "11px" : "12px",
                            color: "#9ca3af",
                            textDecoration: "line-through",
                          }}
                        >
                          ₹{product.mrp_inr}
                        </div>
                      )}
                    </div>

                    {/* Stock */}
                    <div
                      style={{
                        fontSize: isMobile ? "11px" : "12px",
                        color: !isOutOfStock ? "#16a34a" : "#dc2626",
                        marginBottom: "8px",
                      }}
                    >
                      {!isOutOfStock
                        ? `Stock: ${product.stock_quantity}`
                        : "OUT OF STOCK"}
                    </div>

                    {/* Buttons */}
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        marginTop: "auto",
                      }}
                    >
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={isOutOfStock}
                        style={{
                          flex: 1,
                          padding: isMobile ? "6px 8px" : "8px 12px",
                          background: isOutOfStock ? "#d1d5db" : "#dc2626",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: isOutOfStock ? "not-allowed" : "pointer",
                          fontSize: isMobile ? "12px" : "13px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "4px",
                        }}
                      >
                        <ShoppingCart size={isMobile ? 14 : 16} />
                        {isOutOfStock
                          ? "Unavailable"
                          : isMobile
                            ? "Add"
                            : "Add to Cart"}
                      </button>
                      {isAdmin && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingProduct(product);
                              setShowModal(true);
                            }}
                            style={{
                              padding: isMobile ? "6px 8px" : "8px 12px",
                              background: "#3b82f6",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            <Edit2 size={isMobile ? 14 : 16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProduct(product._id);
                            }}
                            style={{
                              padding: isMobile ? "6px 8px" : "8px 12px",
                              background: "#ef4444",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            <Trash2 size={isMobile ? 14 : 16} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More */}
        {hasMore && !loading && (
          <div
            style={{
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            <button
              onClick={() => setPage((prev) => prev + 1)}
              style={{
                padding: "10px 24px",
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Load More Products
            </button>
          </div>
        )}
      </div>

      {/* Cart Toast */}
      {cartToast && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#10b981",
            color: "white",
            padding: "12px 20px",
            borderRadius: "4px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            animation: "slideIn 0.3s ease-out",
          }}
        >
          {cartToast} added to cart
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setShowModal(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveProduct}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        }
        @keyframes slideIn {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default ProductsNew;
