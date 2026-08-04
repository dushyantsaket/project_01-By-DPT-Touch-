import React, { useState, useEffect } from "react";
import "../styles/SparePartsDetail.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import {
  ArrowLeft,
  ShoppingCart,
  Search,
  Package,
  CheckCircle2,
} from "lucide-react";

const sparePartsInventory = {
  grinder: [
    {
      id: "g1",
      name: "GWS 600 Motor Housing",
      partNo: "1 619 P09 772",
      price_inr: 850,
      image:
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=300",
      category: "spare-parts",
    },
    {
      id: "g2",
      name: "GWS 600 Armature",
      partNo: "1 604 010 626",
      price_inr: 1250,
      image:
        "https://images.unsplash.com/photo-1590236170131-4f8e969bfbf0?auto=format&fit=crop&q=80&w=300",
      category: "spare-parts",
    },
    {
      id: "g3",
      name: "GWS 750 Switch",
      partNo: "1 607 200 31V",
      price_inr: 450,
      image:
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=300",
      category: "spare-parts",
    },
    {
      id: "g4",
      name: "GWS 850 Carbon Brush Set",
      partNo: "1 616 B04 442",
      price_inr: 180,
      image:
        "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=300",
      category: "spare-parts",
    },
  ],
  hammer: [
    {
      id: "h1",
      name: "GBH 2-20 Field",
      partNo: "1 616 B10 269",
      price_inr: 1100,
      image:
        "https://images.unsplash.com/photo-1590236170131-4f8e969bfbf0?auto=format&fit=crop&q=80&w=300",
      category: "spare-parts",
    },
    {
      id: "h2",
      name: "GBH 200 Power Cord",
      partNo: "1 604 460 72W",
      price_inr: 350,
      image:
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=300",
      category: "spare-parts",
    },
    {
      id: "h3",
      name: "GSH 500 Armature",
      partNo: "1 619 P15 112",
      price_inr: 2400,
      image:
        "https://images.unsplash.com/photo-1590236170131-4f8e969bfbf0?auto=format&fit=crop&q=80&w=300",
      category: "spare-parts",
    },
    {
      id: "h4",
      name: "GBH 5-40 D Gear Set",
      partNo: "1 617 000 437",
      price_inr: 3200,
      image:
        "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=300",
      category: "spare-parts",
    },
  ],
  cutter: [
    {
      id: "c1",
      name: "GCO 220 Armature",
      partNo: "1 609 B03 639",
      price_inr: 3500,
      image:
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=300",
      category: "spare-parts",
    },
    {
      id: "c2",
      name: "TCT Saw Blade Premium",
      partNo: "XP-TCT-4",
      price_inr: 180,
      image:
        "https://images.unsplash.com/photo-1590236170131-4f8e969bfbf0?auto=format&fit=crop&q=80&w=300",
      category: "spare-parts",
    },
  ],
  welding: [
    {
      id: "w1",
      name: "Inverter Board Alpha",
      partNo: "WLD-INV-A1",
      price_inr: 4200,
      image:
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=300",
      category: "spare-parts",
    },
  ],
};

const SparePartsDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [showAddSuccess, setShowAddSuccess] = useState(false);

  const sectionName = id ? id.charAt(0).toUpperCase() + id.slice(1) : "All";

  useEffect(() => {
    if (id && sparePartsInventory[id]) {
      setItems(sparePartsInventory[id]);
    } else {
      setItems(Object.values(sparePartsInventory).flat());
    }
  }, [id]);

  const handleAdd = (item) => {
    addToCart(item, 1);
    setShowAddSuccess(true);
    setTimeout(() => setShowAddSuccess(false), 3000);
  };

  const filtered = query.trim()
    ? items.filter(
        (i) =>
          i.name.toLowerCase().includes(query.toLowerCase()) ||
          i.partNo.toLowerCase().includes(query.toLowerCase()),
      )
    : items;

  return (
    <div className="spare-parts-page">
      {/* Toast */}
      <AnimatePresence>
        {showAddSuccess && (
          <motion.div
            className="spare-parts-toast"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
          >
            <div className="toast-icon">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="toast-title">Added to Cart</p>
              <p className="toast-sub">Part reserved successfully</p>
            </div>
            <Link to="/cart" className="toast-link">
              View Cart →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container">
        {/* Page Head */}
        <div className="spare-parts-head">
          <div className="heading-group">
            <Link to="/" className="back-btn" aria-label="Back">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1>{sectionName} Spare Parts</h1>
              <p className="head-sub">Original Components · Procurement Hub</p>
            </div>
          </div>

          <div className="search-wrap">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by name or part no…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Parts Grid */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "#9ca3af",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            No parts found for "<strong>{query}</strong>"
          </div>
        ) : (
          <div className="spare-parts-grid">
            {filtered.map((item, idx) => (
              <motion.div
                className="part-card"
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
              >
                {/* Image */}
                <div className="part-image">
                  <span className="original-badge">Original Asset</span>
                  <img src={item.image} alt={item.name} loading="lazy" />
                </div>

                {/* Body */}
                <div className="part-body">
                  <h3 className="part-name">{item.name}</h3>
                  <div className="part-no">
                    <span className="dot" />
                    <span>Part No: {item.partNo}</span>
                  </div>
                  <div className="part-footer">
                    <div className="price-group">
                      <span className="price-label">Unit Price</span>
                      <span className="price-value">
                        ₹{item.price_inr.toLocaleString()}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        className="add-btn"
                        style={{
                          border: "1px solid #111",
                          background: "#fff",
                          color: "#111",
                          fontSize: "10px",
                          padding: "0 12px",
                          width: "auto",
                          fontWeight: 800,
                        }}
                        onClick={() =>
                          navigate(
                            `/product/${encodeURIComponent(item.partNo)}`,
                          )
                        }
                      >
                        Details
                      </button>
                      <button
                        className="add-btn"
                        onClick={() => handleAdd(item)}
                        aria-label={`Add ${item.name} to cart`}
                      >
                        <ShoppingCart size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Support Banner */}
        <div className="spare-parts-support-banner">
          <div className="support-icon">
            <Package size={28} />
          </div>
          <h2>Can't Find Your Component?</h2>
          <p>
            We hold inventory for thousands of parts beyond our digital catalog.
            Connect with our procurement desk and we'll source it for you.
          </p>
          <Link to="/contact" className="enquire-btn">
            Enquire Now →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SparePartsDetail;
