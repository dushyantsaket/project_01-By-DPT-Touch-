import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  Filter,
  SlidersHorizontal,
  Search,
  Play,
  Phone,
  MessageCircle,
  Upload,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Package,
  Truck,
  ShieldCheck,
  Zap,
  Grid,
  List,
  Plus,
} from "lucide-react";

const SPARE_PARTS = [
  {
    id: "sp1",
    name: "GWS 600 Armature",
    partNo: "1604010626",
    brand: "Bosch",
    compatible: ["GWS600", "GWS750", "GWS800"],
    price: 1250,
    mrp: 1490,
    discount: 16,
    stock: "In Stock",
    stockLeft: 18,
    rating: 4.5,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300&auto=format&fit=crop",
    warranty: "6 Months Warranty",
    delivery: "Delivery Tomorrow",
    type: "Armature",
  },
  {
    id: "sp2",
    name: "GWS 600 Motor Housing",
    partNo: "1619PD9772",
    brand: "Bosch",
    compatible: ["GWS600", "GWS650", "GWS750"],
    price: 850,
    mrp: 1100,
    discount: 23,
    stock: "In Stock",
    stockLeft: 32,
    rating: 4.3,
    reviews: 98,
    image:
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=300&auto=format&fit=crop",
    warranty: "6 Months Warranty",
    delivery: "Delivery Tomorrow",
    type: "Motor Housing",
  },
  {
    id: "sp3",
    name: "GWS 750 Switch",
    partNo: "1607200031V",
    brand: "Bosch",
    compatible: ["GWS750", "GWS800", "GWS900"],
    price: 450,
    mrp: 660,
    discount: 31,
    stock: "Low Stock",
    stockLeft: 7,
    rating: 4.1,
    reviews: 76,
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&auto=format&fit=crop",
    warranty: "6 Months Warranty",
    delivery: "Delivery in 2 Days",
    type: "Switch",
  },
  {
    id: "sp4",
    name: "GWS 850 Carbon Brush Set",
    partNo: "1619B04442",
    brand: "Bosch",
    compatible: ["GWS850", "GWS900", "GWS1000"],
    price: 180,
    mrp: 260,
    discount: 28,
    stock: "In Stock",
    stockLeft: 45,
    rating: 4.6,
    reviews: 142,
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop",
    warranty: "6 Months Warranty",
    delivery: "Delivery Tomorrow",
    type: "Carbon Brush",
  },
  {
    id: "sp5",
    name: "GWS 500 Armature",
    partNo: "1604AD9750",
    brand: "Bosch",
    compatible: ["GWS500", "GWS600"],
    price: 1350,
    mrp: 1590,
    discount: 15,
    stock: "In Stock",
    stockLeft: 12,
    rating: 4.4,
    reviews: 54,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300",
    warranty: "6 Months Warranty",
    delivery: "Delivery Tomorrow",
    type: "Armature",
  },
  {
    id: "sp6",
    name: "GWS 1000 Switch",
    partNo: "1617300301",
    brand: "Bosch",
    compatible: ["GWS1000", "GWS1100"],
    price: 520,
    mrp: 760,
    discount: 32,
    stock: "In Stock",
    stockLeft: 23,
    rating: 4.0,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300",
    warranty: "6 Months Warranty",
    delivery: "Delivery Tomorrow",
    type: "Switch",
  },
  {
    id: "sp7",
    name: "Dewalt DWE81005 Gear Set",
    partNo: "1N617214",
    brand: "Dewalt",
    compatible: ["DWE81005", "DWE8700"],
    price: 680,
    mrp: 890,
    discount: 24,
    stock: "In Stock",
    stockLeft: 15,
    rating: 4.2,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=300",
    warranty: "6 Months Warranty",
    delivery: "Delivery Tomorrow",
    type: "Gear Set",
  },
  {
    id: "sp8",
    name: "Makita 9553NB Armature",
    partNo: "515488B",
    brand: "Makita",
    compatible: ["9553NB", "9554NB", "9556HN"],
    price: 1420,
    mrp: 1960,
    discount: 27,
    stock: "In Stock",
    stockLeft: 9,
    rating: 4.7,
    reviews: 91,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300",
    warranty: "6 Months Warranty",
    delivery: "Delivery Tomorrow",
    type: "Armature",
  },
  {
    id: "sp9",
    name: "Ingco Switch Assembly",
    partNo: "CS09090001",
    brand: "INGCO",
    compatible: ["AG650", "AG750"],
    price: 260,
    mrp: 380,
    discount: 32,
    stock: "In Stock",
    stockLeft: 30,
    rating: 4.0,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300",
    warranty: "6 Months Warranty",
    delivery: "Delivery Tomorrow",
    type: "Switch",
  },
  {
    id: "sp10",
    name: "Hitachi G10SS Carbon Brush",
    partNo: "999060410",
    brand: "Hitachi",
    compatible: ["G10SS", "G13SS"],
    price: 160,
    mrp: 220,
    discount: 27,
    stock: "In Stock",
    stockLeft: 23,
    rating: 4.1,
    reviews: 55,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300",
    warranty: "6 Months Warranty",
    delivery: "Delivery Tomorrow",
    type: "Carbon Brush",
  },
  {
    id: "sp11",
    name: "DCA Armature 1000W",
    partNo: "AF1058080",
    brand: "DCA",
    compatible: ["FF03-100", "FF05-125"],
    price: 1180,
    mrp: 1450,
    discount: 19,
    stock: "In Stock",
    stockLeft: 11,
    rating: 3.9,
    reviews: 38,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300",
    warranty: "6 Months Warranty",
    delivery: "Delivery Tomorrow",
    type: "Armature",
  },
  {
    id: "sp12",
    name: "Bearing 626 ZZ (6x19x6mm)",
    partNo: "BRG626022",
    brand: "Generic",
    compatible: ["Universal"],
    price: 170,
    mrp: 240,
    discount: 29,
    stock: "Low Stock",
    stockLeft: 6,
    rating: 4.2,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300",
    warranty: "3 Months Warranty",
    delivery: "Delivery Tomorrow",
    type: "Bearing",
  },
];

const FILTER_CATEGORIES = [
  { id: "all", label: "All Parts", icon: "🔧" },
  { id: "Motor Housing", label: "Motor Housing", icon: "⚙️" },
  { id: "Armature", label: "Armature", icon: "🔌" },
  { id: "Carbon Brush", label: "Carbon Brush", icon: "✏️" },
  { id: "Field Coil", label: "Field Coil", icon: "🌀" },
  { id: "Switch", label: "Switch", icon: "🔵" },
  { id: "Gear Set", label: "Gear Set", icon: "⚙️" },
  { id: "Bearing", label: "Bearing", icon: "⭕" },
  { id: "Accessories", label: "Accessories", icon: "🔩" },
];

const BRANDS_FILTER = [
  "All Brands",
  "Bosch",
  "Makita",
  "Dewalt",
  "INGCO",
  "Hitachi",
  "DCA",
];
const PART_TYPES = [
  "All Types",
  "Armature",
  "Carbon Brush",
  "Switch",
  "Motor Housing",
  "Bearing",
  "Field Coil",
  "Gear Set",
];
const MODELS = [
  "All Models",
  "GWS 600",
  "GWS 650",
  "GWS 750",
  "GWS 800",
  "GWS 850",
  "GWS 900",
  "GWS 1000",
  "GWS 7-100",
  "GWS 8-100",
];

const SPECS_DATA = {
  brand: "Bosch",
  material: "Copper & Steel",
  weight: "320 g",
  warranty: "6 Months",
  country: "Germany",
  availability: "In Stock",
};

const INSTALL_VIDEOS = [
  {
    title: "How to Replace Armature",
    time: "04:35",
    thumb: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=200",
  },
  {
    title: "Carbon Brush Replacement",
    time: "03:20",
    thumb: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200",
  },
  {
    title: "Gear Assembly Process",
    time: "05:10",
    thumb: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=200",
  },
  {
    title: "Switch Replacement Guide",
    time: "02:45",
    thumb: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=200",
  },
];

const REVIEWS = [
  {
    author: "Rahul Verma",
    rating: 5,
    verified: true,
    date: "2 Days ago",
    text: "Original product and perfect fit for GWS 600. Machine is working like new. Highly recommended!",
  },
  {
    author: "Amit Sharma",
    rating: 5,
    verified: true,
    date: "4 Days ago",
    text: "Good packaging and fast delivery. Quality is excellent. 👌",
  },
  {
    author: "Sandeep Yadav",
    rating: 4,
    verified: true,
    date: "1 Week ago",
    text: "Product is genuine and works perfectly. Happy with the purchase.",
  },
];

const RELATED_PARTS = [
  {
    name: "Carbon Brush Set",
    price: 180,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=120",
  },
  {
    name: "Bearing 626 ZZ",
    price: 120,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=120",
  },
  {
    name: "Gear Set",
    price: 350,
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=120",
  },
  {
    name: "Field Coil",
    price: 450,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=120",
  },
  {
    name: "Switch",
    price: 320,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=120",
  },
  {
    name: "Armature",
    price: 1250,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=120",
  },
  {
    name: "Rotor",
    price: 980,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=120",
  },
  {
    name: "Stator",
    price: 1100,
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=120",
  },
];

const StarRating = ({ rating, size = 12 }) => (
  <div style={{ display: "flex", gap: "1px" }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        size={size}
        color="#f59e0b"
        fill={i <= Math.round(rating) ? "#f59e0b" : "none"}
      />
    ))}
  </div>
);

export default function GrinderSpareParts() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeBrand, setActiveBrand] = useState("All Brands");
  const [activePartType, setActivePartType] = useState("All Types");
  const [priceRange, setPriceRange] = useState(5000);
  const [searchTerm, setSearchTerm] = useState("");
  const [specsTab, setSpecsTab] = useState("specs");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("Popularity");
  const [wishlist, setWishlist] = useState([]);
  const [added, setAdded] = useState({});

  const filteredParts = SPARE_PARTS.filter((p) => {
    const matchesCat = activeCategory === "all" || p.type === activeCategory;
    const matchesBrand =
      activeBrand === "All Brands" || p.brand === activeBrand;
    const matchesType =
      activePartType === "All Types" || p.type === activePartType;
    const matchesSearch =
      !searchTerm ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.partNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = p.price <= priceRange;
    return (
      matchesCat && matchesBrand && matchesType && matchesSearch && matchesPrice
    );
  });

  const handleAddToCart = (partId) => {
    setAdded((prev) => ({ ...prev, [partId]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [partId]: false })), 2000);
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id],
    );
  };

  return (
    <div style={gs.container}>
      {/* ─── Hero Header ─── */}
      <div style={gs.heroHeader}>
        <div style={gs.heroInner}>
          <div style={gs.heroLeft}>
            <Link to="/products" style={gs.backBtn}>
              <ArrowLeft size={16} style={{ marginRight: "6px" }} /> Back
            </Link>
            <div>
              <h1 style={gs.heroTitle}>Grinder Spare Parts</h1>
              <p style={gs.heroSubtitle}>
                Original & Genuine Spare Parts for All Grinder Machines
              </p>
            </div>
          </div>
          <div style={gs.heroRight}>
            <img
              src="https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300&auto=format&fit=crop"
              alt="Grinder Spare Parts"
              style={gs.heroImg}
            />
          </div>
        </div>

        {/* Trust badges row */}
        <div style={gs.heroBadgesRow}>
          {[
            {
              icon: "✅",
              title: "100% Genuine Parts",
              desc: "Original & Reliable",
            },
            {
              icon: "⚡",
              title: "Fast & Same Day Dispatch",
              desc: "Order before 2 PM",
            },
            { icon: "🛡️", title: "Warranty Available", desc: "Upto 6 Months" },
            {
              icon: "🎧",
              title: "Technical Support",
              desc: "Expert Assistance",
            },
            { icon: "📦", title: "5000+ Spare Parts", desc: "Huge Inventory" },
          ].map((b, i) => (
            <div key={i} style={gs.heroBadge}>
              <span style={{ fontSize: "16px" }}>{b.icon}</span>
              <div>
                <div style={gs.heroBadgeTitle}>{b.title}</div>
                <div style={gs.heroBadgeDesc}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Category Chips ─── */}
      <div style={gs.categoriesBar}>
        <div style={gs.categoriesInner}>
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                ...gs.categoryChip,
                background: activeCategory === cat.id ? "#dc2626" : "#ffffff",
                color: activeCategory === cat.id ? "#ffffff" : "#475569",
                border:
                  activeCategory === cat.id ? "none" : "1px solid #e2e8f0",
              }}
            >
              <span style={{ marginRight: "5px" }}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Main Layout ─── */}
      <div style={gs.mainLayout}>
        {/* Sidebar Filters */}
        <aside style={gs.sidebar}>
          <h3 style={gs.sidebarTitle}>FILTERS</h3>

          {/* Brand Filter */}
          <div style={gs.filterSection}>
            <div style={gs.filterSectionTitle}>BRAND</div>
            <div style={gs.filterList}>
              {BRANDS_FILTER.map((brand, i) => (
                <label key={i} style={gs.filterCheckLabel}>
                  <input
                    type="checkbox"
                    checked={activeBrand === brand}
                    onChange={() => setActiveBrand(brand)}
                    style={{ marginRight: "8px" }}
                  />
                  <span>{brand}</span>
                  {i > 0 && (
                    <span style={gs.filterCount}>
                      ({[512, 98, 64, 75, 42, 38][i - 1]})
                    </span>
                  )}
                </label>
              ))}
              <button style={gs.filterMoreBtn}>More +</button>
            </div>
          </div>

          {/* Part Type Filter */}
          <div style={gs.filterSection}>
            <div style={gs.filterSectionTitle}>PART TYPE</div>
            <div style={gs.filterList}>
              {PART_TYPES.map((type, i) => (
                <label key={i} style={gs.filterCheckLabel}>
                  <input
                    type="checkbox"
                    checked={activePartType === type}
                    onChange={() => setActivePartType(type)}
                    style={{ marginRight: "8px" }}
                  />
                  <span>{type}</span>
                  {i > 0 && (
                    <span style={gs.filterCount}>
                      ({[89, 145, 76, 53, 34, 28, 42][i - 1]})
                    </span>
                  )}
                </label>
              ))}
              <button style={gs.filterMoreBtn}>More +</button>
            </div>
          </div>

          {/* Compatible Model */}
          <div style={gs.filterSection}>
            <div style={gs.filterSectionTitle}>COMPATIBLE MODEL</div>
            <input placeholder="Search model..." style={gs.filterSearchInput} />
            <div style={gs.filterList}>
              {MODELS.slice(0, 6).map((model, i) => (
                <label key={i} style={gs.filterCheckLabel}>
                  <input type="checkbox" style={{ marginRight: "8px" }} />
                  <span>{model}</span>
                  {i > 0 && (
                    <span style={gs.filterCount}>
                      ({[45, 38, 52, 41, 35, 28][i - 1]})
                    </span>
                  )}
                </label>
              ))}
              <button style={gs.filterMoreBtn}>More +</button>
            </div>
          </div>

          {/* Price Range */}
          <div style={gs.filterSection}>
            <div style={gs.filterSectionTitle}>PRICE RANGE</div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "11px",
                color: "#64748b",
                marginBottom: "8px",
              }}
            >
              <span>₹15</span>
              <span>₹{priceRange.toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range"
              min="15"
              max="5000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#dc2626" }}
            />
            <button style={gs.applyFilterBtn}>Apply</button>
          </div>

          {/* Availability */}
          <div style={gs.filterSection}>
            <div style={gs.filterSectionTitle}>AVAILABILITY</div>
            <label style={gs.filterCheckLabel}>
              <input
                type="checkbox"
                defaultChecked
                style={{ marginRight: "8px" }}
              />{" "}
              <span style={{ color: "#059669" }}>●</span> In Stock (243)
            </label>
            <label style={gs.filterCheckLabel}>
              <input type="checkbox" style={{ marginRight: "8px" }} />{" "}
              <span style={{ color: "#d97706" }}>●</span> Low Stock (22)
            </label>
          </div>

          {/* Can't Find Part */}
          <div style={gs.cantFindBox}>
            <div style={gs.cantFindTitle}>Can't Find Your Part?</div>
            <p style={gs.cantFindText}>
              Enter your machine model or part number and we will help you find
              it.
            </p>
            <button style={gs.uploadPhotoBtn}>
              <Upload size={13} style={{ marginRight: "6px" }} /> Upload Photo
            </button>
            <button style={gs.whatsappExpertBtn}>
              <MessageCircle size={13} style={{ marginRight: "6px" }} />{" "}
              WhatsApp Us
            </button>
            <button style={gs.callExpertBtn}>📞 Call Expert</button>
          </div>

          {/* Why Choose Us */}
          <div style={gs.whyChooseBox}>
            <div style={gs.filterSectionTitle}>WHY CHOOSE US</div>
            {[
              "100% Genuine Parts",
              "Wide Compatibility",
              "Best Match Prices",
              "Fast & Safe Delivery",
              "GST Invoice Available",
              "Expert Technical Support",
            ].map((item, i) => (
              <div key={i} style={gs.whyItem}>
                <CheckCircle2
                  size={12}
                  color="#dc2626"
                  style={{ marginRight: "6px", flexShrink: 0 }}
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div style={gs.mainContent}>
          {/* Results Header */}
          <div style={gs.resultsHeader}>
            <div style={{ fontSize: "13px", color: "#64748b" }}>
              Showing <strong>1-{Math.min(filteredParts.length, 24)}</strong> of{" "}
              <strong>{filteredParts.length}</strong> results
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "12px", color: "#64748b" }}>
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={gs.sortSelect}
              >
                {[
                  "Popularity",
                  "Price: Low to High",
                  "Price: High to Low",
                  "Newest",
                  "Rating",
                ].map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
              <button
                onClick={() => setViewMode("grid")}
                style={{
                  ...gs.viewToggleBtn,
                  background: viewMode === "grid" ? "#dc2626" : "#f1f5f9",
                  color: viewMode === "grid" ? "#fff" : "#475569",
                }}
              >
                <Grid size={14} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                style={{
                  ...gs.viewToggleBtn,
                  background: viewMode === "list" ? "#dc2626" : "#f1f5f9",
                  color: viewMode === "list" ? "#fff" : "#475569",
                }}
              >
                <List size={14} />
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div style={gs.productsGrid}>
            {filteredParts.map((part) => (
              <div key={part.id} style={gs.partCard}>
                {/* Stock Badge */}
                <div
                  style={{
                    ...gs.stockBadge,
                    background:
                      part.stock === "In Stock" ? "#f0fdf4" : "#fffbeb",
                    color: part.stock === "In Stock" ? "#059669" : "#d97706",
                    borderColor:
                      part.stock === "In Stock" ? "#bbf7d0" : "#fcd34d",
                  }}
                >
                  {part.stock}
                </div>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(part.id)}
                  style={gs.wishlistBtn}
                >
                  <Heart
                    size={16}
                    color={wishlist.includes(part.id) ? "#dc2626" : "#94a3b8"}
                    fill={wishlist.includes(part.id) ? "#dc2626" : "none"}
                  />
                </button>

                {/* Image */}
                <div style={gs.partCardImg}>
                  <img
                    src={part.image}
                    alt={part.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* Info */}
                <div style={gs.partCardInfo}>
                  <div style={gs.partRatingRow}>
                    <StarRating rating={part.rating} />
                    <span style={gs.partReviews}>({part.reviews})</span>
                  </div>
                  <h4 style={gs.partName}>{part.name}</h4>
                  <div style={gs.partNo}>Part No. {part.partNo}</div>
                  <div style={gs.compatibleRow}>
                    Compatible Models:{" "}
                    {part.compatible.map((m) => (
                      <span key={m} style={gs.compatibleTag}>
                        {m}
                      </span>
                    ))}
                  </div>

                  {/* Price Row */}
                  <div style={gs.partPriceRow}>
                    <span style={gs.partPrice}>
                      ₹{part.price.toLocaleString("en-IN")}
                    </span>
                    <span style={gs.partMrp}>
                      ₹{part.mrp.toLocaleString("en-IN")}
                    </span>
                    <span style={gs.partDisc}>{part.discount}% OFF</span>
                  </div>

                  <div style={gs.partMetaRow}>
                    <span style={gs.partMeta}>📄 GST Invoice</span>
                    <span style={gs.partMeta}>🛡️ {part.warranty}</span>
                  </div>
                  <div style={gs.partDelivery}>
                    🚚 {part.delivery} · Stock Left: {part.stockLeft}
                  </div>
                </div>

                {/* Buttons */}
                <div style={gs.partCardBtns}>
                  <button style={gs.detailsBtn}>Details</button>
                  <button
                    onClick={() => handleAddToCart(part.id)}
                    style={{
                      ...gs.addCartBtn,
                      background: added[part.id] ? "#059669" : "#dc2626",
                    }}
                  >
                    <ShoppingCart size={13} style={{ marginRight: "5px" }} />
                    {added[part.id] ? "Added!" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Promo Feature Cards */}
          <div style={gs.promoCardsGrid}>
            {[
              {
                icon: "🔧",
                title: "Genuine Product",
                desc: "100% original parts sourced from authorized channels.",
                color: "#fef2f2",
                accent: "#dc2626",
              },
              {
                icon: "✅",
                title: "Perfect Fit",
                desc: "Designed to fit your machine perfectly without any issues.",
                color: "#eff6ff",
                accent: "#2563eb",
              },
              {
                icon: "⚡",
                title: "High Performance",
                desc: "Ensures optimal performance and longer machine life.",
                color: "#f0fdf4",
                accent: "#059669",
              },
              {
                icon: "🛠️",
                title: "Easy Replacement",
                desc: "Easy to install and replace with basic tools at home.",
                color: "#fffbeb",
                accent: "#d97706",
              },
            ].map((card, i) => (
              <div key={i} style={{ ...gs.promoCard, background: card.color }}>
                <span
                  style={{
                    fontSize: "24px",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  {card.icon}
                </span>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "800",
                    color: card.accent,
                    marginBottom: "4px",
                  }}
                >
                  {card.title}
                </div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>
                  {card.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Specs / Compatible Models / Description Tabs */}
          <div style={gs.specTabsSection}>
            <div style={gs.specTabsHeader}>
              {["specs", "compatible", "description"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSpecsTab(tab)}
                  style={{
                    ...gs.specTabBtn,
                    borderBottom:
                      specsTab === tab
                        ? "2px solid #dc2626"
                        : "2px solid transparent",
                    color: specsTab === tab ? "#dc2626" : "#64748b",
                    fontWeight: specsTab === tab ? "800" : "600",
                  }}
                >
                  {tab === "specs"
                    ? "Specifications"
                    : tab === "compatible"
                      ? "Compatible Models"
                      : "Description"}
                </button>
              ))}
            </div>

            <div style={gs.specTabContent}>
              {specsTab === "specs" && (
                <div style={gs.specContent}>
                  <div style={gs.specTableCol}>
                    <table style={gs.specTable}>
                      <tbody>
                        {Object.entries(SPECS_DATA).map(([key, val]) => (
                          <tr key={key}>
                            <td style={gs.specKey}>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </td>
                            <td style={gs.specVal}>
                              {val === "In Stock" ? (
                                <span
                                  style={{
                                    color: "#059669",
                                    fontWeight: "700",
                                  }}
                                >
                                  {val}
                                </span>
                              ) : (
                                val
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div style={gs.specCompatCol}>
                    <div style={gs.specCompatTitle}>Compatible With</div>
                    <div style={gs.specCompatGrid}>
                      {[
                        "GWS 600",
                        "GWS 650",
                        "GWS 750",
                        "GWS 800",
                        "GWS 850",
                        "GWS 900",
                        "GWS 7-100",
                        "GWS 8-100",
                      ].map((m) => (
                        <div key={m} style={gs.specCompatItem}>
                          <CheckCircle2
                            size={12}
                            color="#059669"
                            style={{ marginRight: "4px" }}
                          />
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={gs.whyOriginalCol}>
                    <div style={gs.whyOriginalTitle}>
                      Why Choose Original Parts?
                    </div>
                    {[
                      "Better durability & performance",
                      "Smooth operation & less vibration",
                      "Increases machine life",
                      "Safe & reliable for long term use",
                    ].map((item, i) => (
                      <div key={i} style={gs.whyOriginalItem}>
                        <CheckCircle2
                          size={12}
                          color="#059669"
                          style={{ marginRight: "6px", flexShrink: 0 }}
                        />
                        <span style={{ fontSize: "12px", color: "#475569" }}>
                          {item}
                        </span>
                      </div>
                    ))}
                    <img
                      src="https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=120"
                      alt="Grinder"
                      style={{
                        width: "100px",
                        borderRadius: "8px",
                        marginTop: "10px",
                      }}
                    />
                  </div>
                </div>
              )}
              {specsTab === "compatible" && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    padding: "16px 0",
                  }}
                >
                  {MODELS.map((m, i) => (
                    <span
                      key={i}
                      style={{
                        background: "#f1f5f9",
                        color: "#475569",
                        fontSize: "12px",
                        fontWeight: "600",
                        padding: "6px 14px",
                        borderRadius: "20px",
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}
              {specsTab === "description" && (
                <div
                  style={{
                    padding: "16px 0",
                    fontSize: "13px",
                    color: "#475569",
                    lineHeight: "1.7",
                  }}
                >
                  This is a 100% original spare part sourced directly from
                  authorized channels. It is designed for precision fit and
                  long-lasting performance. Replace worn-out parts easily with
                  this genuine replacement to restore your grinder's full
                  performance.
                </div>
              )}
            </div>
          </div>

          {/* Load More */}
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "6px",
                marginBottom: "16px",
              }}
            >
              {[1, 2, 3, "...", 18].map((p, i) => (
                <button
                  key={i}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    background: p === 1 ? "#dc2626" : "#fff",
                    color: p === 1 ? "#fff" : "#475569",
                    fontSize: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
            <button style={gs.loadMoreBtn}>Load More Products</button>
          </div>

          {/* Repair & Installation Videos */}
          <div style={gs.videosSection}>
            <div style={gs.videosSectionLeft}>
              <h3 style={gs.sectionTitle}>Installation Videos</h3>
              <div style={gs.videosGrid}>
                {INSTALL_VIDEOS.map((video, i) => (
                  <div key={i} style={gs.videoCard}>
                    <div style={gs.videoThumb}>
                      <img
                        src={video.thumb}
                        alt={video.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <div style={gs.videoPlayOverlay}>
                        <div style={gs.playCircle}>
                          <Play size={16} color="#fff" fill="#fff" />
                        </div>
                      </div>
                      <div style={gs.videoTime}>{video.time}</div>
                    </div>
                    <div style={gs.videoCardTitle}>{video.title}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={gs.videosSectionRight}>
              <div style={gs.viewAllVideosCard}>
                <div style={gs.viewAllPlayCircle}>
                  <Play size={20} color="#fff" fill="#fff" />
                </div>
                <div style={gs.viewAllVideosTitle}>View All Videos</div>
                <div style={gs.viewAllVideosDesc}>
                  Watch more installation and repair videos
                </div>
                <button style={gs.viewAllLink}>View All →</button>
              </div>
            </div>
          </div>

          {/* Customer Reviews + Support */}
          <div style={gs.reviewsSupportGrid}>
            {/* Reviews */}
            <div style={gs.reviewsSection}>
              <h3 style={gs.sectionTitle}>Customer Reviews</h3>
              <div style={gs.reviewsLayout}>
                <div style={gs.reviewScoreCard}>
                  <div style={gs.avgScore}>4.8</div>
                  <StarRating rating={4.8} size={16} />
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#64748b",
                      marginTop: "4px",
                    }}
                  >
                    Based on 150 Reviews
                  </div>

                  <div style={gs.ratingBars}>
                    {[
                      { star: 5, pct: 78 },
                      { star: 4, pct: 15 },
                      { star: 3, pct: 4 },
                      { star: 2, pct: 2 },
                      { star: 1, pct: 1 },
                    ].map((bar) => (
                      <div key={bar.star} style={gs.ratingBarRow}>
                        <span
                          style={{
                            fontSize: "10px",
                            color: "#64748b",
                            width: "18px",
                          }}
                        >
                          {bar.star}★
                        </span>
                        <div style={gs.barTrack}>
                          <div
                            style={{ ...gs.barFill, width: `${bar.pct}%` }}
                          ></div>
                        </div>
                        <span
                          style={{
                            fontSize: "10px",
                            color: "#64748b",
                            width: "28px",
                          }}
                        >
                          {bar.pct}%
                        </span>
                      </div>
                    ))}
                  </div>

                  <button style={gs.writeReviewBtn}>Write a Review</button>
                </div>

                <div style={gs.reviewsList}>
                  {REVIEWS.map((review, i) => (
                    <div key={i} style={gs.reviewCard}>
                      <div style={gs.reviewHeader}>
                        <div style={gs.authorAvatar}>{review.author[0]}</div>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <span style={gs.authorName}>{review.author}</span>
                            {review.verified && (
                              <span style={gs.verifiedBadge}>
                                ✅ Verified Purchase
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "6px",
                              alignItems: "center",
                              marginTop: "2px",
                            }}
                          >
                            <StarRating rating={review.rating} />
                            <span
                              style={{ fontSize: "10px", color: "#94a3b8" }}
                            >
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p style={gs.reviewText}>{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Can't Find Part */}
            <div style={gs.supportSection}>
              <h3 style={gs.sectionTitle}>Can't Find Your Spare Part?</h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  marginBottom: "16px",
                  lineHeight: "1.5",
                }}
              >
                Upload your machine image or share the model number.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <button style={gs.uploadPhotoLargeBtn}>
                  <Upload size={16} style={{ marginRight: "8px" }} /> Upload
                  Photo
                </button>
                <button style={gs.whatsappExpertLargeBtn}>
                  <MessageCircle size={16} style={{ marginRight: "8px" }} />{" "}
                  WhatsApp Expert
                </button>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                  }}
                >
                  <button style={gs.supportSubBtn}>
                    <Phone size={13} style={{ marginRight: "6px" }} />
                    Call Support
                  </button>
                  <button style={gs.supportSubBtn}>💬 Live Chat</button>
                </div>
                <div style={gs.responseTime}>
                  ⏱️ Response Time: 5-10 Minutes
                </div>
              </div>
            </div>
          </div>

          {/* Related Spare Parts */}
          <div style={gs.relatedSection}>
            <h3 style={gs.sectionTitle}>Related Spare Parts</h3>
            <div style={{ position: "relative" }}>
              <div style={gs.relatedScroll}>
                {RELATED_PARTS.map((part, i) => (
                  <div key={i} style={gs.relatedCard}>
                    <img
                      src={part.image}
                      alt={part.name}
                      style={gs.relatedImg}
                    />
                    <div style={gs.relatedName}>{part.name}</div>
                    <div style={gs.relatedPrice}>₹{part.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const gs = {
  container: {
    minHeight: "100vh",
    background: "#f8fafc",
    paddingTop: "72px",
    fontFamily: "'Inter', sans-serif",
  },
  heroHeader: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    color: "#ffffff",
    paddingBottom: "0",
  },
  heroInner: {
    maxWidth: "1240px",
    margin: "0 auto",
    padding: "24px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroLeft: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "12px",
    fontWeight: "600",
    background: "rgba(255,255,255,0.1)",
    padding: "6px 12px",
    borderRadius: "8px",
    marginTop: "4px",
    flexShrink: 0,
  },
  heroTitle: {
    fontSize: "28px",
    fontWeight: "900",
    margin: "0 0 4px",
    background: "linear-gradient(90deg, #ffffff, #ef4444)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSubtitle: {
    fontSize: "13px",
    color: "#94a3b8",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  heroRight: {},
  heroImg: {
    width: "140px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "12px",
    opacity: 0.8,
  },
  heroBadgesRow: {
    maxWidth: "1240px",
    margin: "0 auto",
    padding: "12px 20px",
    display: "flex",
    gap: "20px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    flexWrap: "wrap",
  },
  heroBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  heroBadgeTitle: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#ffffff",
  },
  heroBadgeDesc: {
    fontSize: "9px",
    color: "#94a3b8",
  },
  categoriesBar: {
    background: "#ffffff",
    borderBottom: "1px solid #f1f5f9",
    position: "sticky",
    top: "72px",
    zIndex: 10,
  },
  categoriesInner: {
    maxWidth: "1240px",
    margin: "0 auto",
    padding: "10px 20px",
    display: "flex",
    gap: "8px",
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  categoryChip: {
    display: "flex",
    alignItems: "center",
    padding: "7px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
    transition: "all 0.15s",
  },
  mainLayout: {
    maxWidth: "1240px",
    margin: "0 auto",
    padding: "24px 20px",
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    gap: "24px",
    alignItems: "start",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    position: "sticky",
    top: "120px",
  },
  sidebarTitle: {
    fontSize: "12px",
    fontWeight: "900",
    color: "#0f172a",
    margin: 0,
    padding: "14px 16px",
    borderBottom: "1px solid #f1f5f9",
    letterSpacing: "0.5px",
  },
  filterSection: {
    padding: "12px 16px",
    borderBottom: "1px solid #f1f5f9",
  },
  filterSectionTitle: {
    fontSize: "10px",
    fontWeight: "900",
    color: "#94a3b8",
    letterSpacing: "0.5px",
    marginBottom: "8px",
  },
  filterList: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  filterCheckLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
    color: "#475569",
    cursor: "pointer",
  },
  filterCount: {
    marginLeft: "auto",
    fontSize: "10px",
    color: "#94a3b8",
  },
  filterMoreBtn: {
    background: "none",
    border: "none",
    color: "#dc2626",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
    padding: "2px 0",
    textAlign: "left",
  },
  filterSearchInput: {
    width: "100%",
    padding: "6px 10px",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "11px",
    marginBottom: "8px",
    outline: "none",
    boxSizing: "border-box",
  },
  applyFilterBtn: {
    width: "100%",
    background: "#dc2626",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    padding: "8px",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "8px",
  },
  cantFindBox: {
    padding: "14px 16px",
    borderBottom: "1px solid #f1f5f9",
    background: "#fafafa",
  },
  cantFindTitle: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "4px",
  },
  cantFindText: {
    fontSize: "10px",
    color: "#64748b",
    margin: "0 0 10px",
    lineHeight: "1.5",
  },
  uploadPhotoBtn: {
    width: "100%",
    background: "#059669",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "6px",
  },
  whatsappExpertBtn: {
    width: "100%",
    background: "#25d366",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "6px",
  },
  callExpertBtn: {
    width: "100%",
    background: "none",
    border: "1px solid #e2e8f0",
    color: "#475569",
    borderRadius: "6px",
    padding: "7px",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
  },
  whyChooseBox: {
    padding: "12px 16px",
  },
  whyItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "11px",
    color: "#475569",
    marginBottom: "5px",
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  resultsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#ffffff",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    padding: "12px 16px",
  },
  sortSelect: {
    padding: "6px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "12px",
    outline: "none",
    background: "#fff",
  },
  viewToggleBtn: {
    width: "32px",
    height: "32px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
  },
  partCard: {
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    padding: "12px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    transition: "box-shadow 0.2s",
  },
  stockBadge: {
    position: "absolute",
    top: "10px",
    left: "10px",
    fontSize: "9px",
    fontWeight: "800",
    padding: "2px 8px",
    borderRadius: "10px",
    border: "1px solid",
    zIndex: 1,
  },
  wishlistBtn: {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 1,
  },
  partCardImg: {
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8fafc",
    borderRadius: "8px",
    marginBottom: "10px",
    overflow: "hidden",
  },
  partCardInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  partRatingRow: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  partReviews: {
    fontSize: "10px",
    color: "#94a3b8",
  },
  partName: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#0f172a",
    margin: "2px 0",
    lineHeight: "1.3",
  },
  partNo: {
    fontSize: "10px",
    color: "#94a3b8",
  },
  compatibleRow: {
    fontSize: "10px",
    color: "#64748b",
    display: "flex",
    alignItems: "center",
    gap: "3px",
    flexWrap: "wrap",
  },
  compatibleTag: {
    background: "#f1f5f9",
    padding: "1px 5px",
    borderRadius: "4px",
    fontSize: "9px",
  },
  partPriceRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "4px",
  },
  partPrice: {
    fontSize: "14px",
    fontWeight: "900",
    color: "#dc2626",
  },
  partMrp: {
    fontSize: "10px",
    color: "#94a3b8",
    textDecoration: "line-through",
  },
  partDisc: {
    fontSize: "9px",
    fontWeight: "800",
    color: "#059669",
  },
  partMetaRow: {
    display: "flex",
    gap: "8px",
    fontSize: "9px",
    color: "#64748b",
    marginTop: "2px",
  },
  partMeta: {
    display: "flex",
    alignItems: "center",
  },
  partDelivery: {
    fontSize: "9px",
    color: "#059669",
    fontWeight: "600",
    marginTop: "2px",
  },
  partCardBtns: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    gap: "6px",
    marginTop: "10px",
  },
  detailsBtn: {
    border: "1px solid #e2e8f0",
    background: "#fff",
    color: "#475569",
    fontSize: "10px",
    fontWeight: "700",
    padding: "7px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  addCartBtn: {
    border: "none",
    color: "#ffffff",
    fontSize: "10px",
    fontWeight: "700",
    padding: "7px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  },
  promoCardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "14px",
  },
  promoCard: {
    borderRadius: "12px",
    padding: "16px",
    border: "1px solid rgba(0,0,0,0.05)",
  },
  specTabsSection: {
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
  },
  specTabsHeader: {
    display: "flex",
    borderBottom: "1px solid #e2e8f0",
  },
  specTabBtn: {
    padding: "14px 20px",
    background: "none",
    border: "none",
    fontSize: "13px",
    cursor: "pointer",
    letterSpacing: "0.2px",
  },
  specTabContent: {
    padding: "20px",
  },
  specContent: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "24px",
  },
  specTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  specKey: {
    padding: "8px 0",
    fontSize: "12px",
    color: "#64748b",
    width: "40%",
    borderBottom: "1px solid #f1f5f9",
  },
  specVal: {
    padding: "8px 0",
    fontSize: "12px",
    fontWeight: "600",
    color: "#0f172a",
    borderBottom: "1px solid #f1f5f9",
  },
  specTableCol: {},
  specCompatCol: {},
  specCompatTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "10px",
  },
  specCompatGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "6px",
  },
  specCompatItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
    color: "#475569",
    fontWeight: "600",
  },
  whyOriginalCol: {},
  whyOriginalTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "10px",
  },
  whyOriginalItem: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "6px",
  },
  loadMoreBtn: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    color: "#0f172a",
    padding: "12px 32px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
  },
  videosSection: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "20px",
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    padding: "20px",
  },
  videosSectionLeft: {},
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 16px",
  },
  videosGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
  },
  videoCard: {},
  videoThumb: {
    position: "relative",
    height: "90px",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "6px",
    background: "#0f172a",
  },
  videoPlayOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.4)",
  },
  playCircle: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  videoTime: {
    position: "absolute",
    bottom: "6px",
    right: "6px",
    background: "rgba(0,0,0,0.7)",
    color: "#ffffff",
    fontSize: "9px",
    fontWeight: "700",
    padding: "1px 5px",
    borderRadius: "4px",
  },
  videoCardTitle: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#334155",
    lineHeight: "1.3",
  },
  videosSectionRight: {
    width: "140px",
  },
  viewAllVideosCard: {
    background: "#0f172a",
    borderRadius: "12px",
    padding: "16px",
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  viewAllPlayCircle: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "#dc2626",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 10px",
  },
  viewAllVideosTitle: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: "4px",
  },
  viewAllVideosDesc: {
    fontSize: "9px",
    color: "#94a3b8",
    marginBottom: "10px",
  },
  viewAllLink: {
    background: "none",
    border: "none",
    color: "#dc2626",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
  },
  reviewsSupportGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 280px",
    gap: "20px",
  },
  reviewsSection: {
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    padding: "20px",
  },
  reviewsLayout: {
    display: "grid",
    gridTemplateColumns: "180px 1fr",
    gap: "20px",
  },
  reviewScoreCard: {
    textAlign: "center",
  },
  avgScore: {
    fontSize: "48px",
    fontWeight: "900",
    color: "#0f172a",
    lineHeight: "1",
    marginBottom: "4px",
  },
  ratingBars: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    margin: "14px 0",
  },
  ratingBarRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  barTrack: {
    flex: 1,
    height: "5px",
    background: "#e2e8f0",
    borderRadius: "3px",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    background: "#f59e0b",
    borderRadius: "3px",
  },
  writeReviewBtn: {
    width: "100%",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    color: "#0f172a",
    borderRadius: "8px",
    padding: "8px",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
  },
  reviewsList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  reviewCard: {
    borderBottom: "1px solid #f1f5f9",
    paddingBottom: "14px",
  },
  reviewHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "8px",
  },
  authorAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#eff6ff",
    color: "#2563eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: "900",
    flexShrink: 0,
  },
  authorName: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#0f172a",
  },
  verifiedBadge: {
    fontSize: "9px",
    color: "#059669",
    fontWeight: "700",
  },
  reviewText: {
    fontSize: "12px",
    color: "#475569",
    margin: 0,
    lineHeight: "1.5",
  },
  supportSection: {
    background: "#fff5f5",
    borderRadius: "12px",
    border: "1px solid #fecaca",
    padding: "20px",
  },
  uploadPhotoLargeBtn: {
    width: "100%",
    background: "#059669",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "12px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  whatsappExpertLargeBtn: {
    width: "100%",
    background: "#25d366",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "12px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  supportSubBtn: {
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    color: "#475569",
    borderRadius: "8px",
    padding: "10px",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  responseTime: {
    textAlign: "center",
    fontSize: "11px",
    color: "#64748b",
    fontWeight: "600",
    marginTop: "4px",
  },
  relatedSection: {
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    padding: "20px",
  },
  relatedScroll: {
    display: "flex",
    gap: "14px",
    overflowX: "auto",
    paddingBottom: "8px",
    scrollbarWidth: "thin",
  },
  relatedCard: {
    background: "#f8fafc",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    padding: "12px",
    textAlign: "center",
    minWidth: "100px",
    flexShrink: 0,
  },
  relatedImg: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
    marginBottom: "6px",
  },
  relatedName: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#334155",
    marginBottom: "4px",
  },
  relatedPrice: {
    fontSize: "12px",
    fontWeight: "900",
    color: "#dc2626",
  },
};
