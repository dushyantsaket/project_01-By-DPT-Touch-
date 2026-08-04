import React, { useState, useRef } from "react";

import { Link } from "react-router-dom";
import {
  Search,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  Heart,
  CheckCircle2,
  Globe,
  Package,
  Award,
  Phone,
  Star,
} from "lucide-react";
import { BRANDS, BOSCH_PRODUCTS, ALL_BOSCH_PRODUCTS } from "../data/brandData";
import "./BrandCollabopration.css";

const FILTER_TABS = [
  "All Brands",
  "Power Tools",
  "Accessories",
  "Industrial",
  "Available",
  "Coming Soon",
];

const bc = {
  page: { minHeight: "100vh", background: "#f8fafc", paddingTop: "72px", fontFamily: "'Inter', sans-serif" },
  hero: { background: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #1a0a0a 100%)", position: "relative", overflow: "hidden", minHeight: "320px" },
  heroBg: { position: "absolute", inset: 0 },
  heroMapDots: { position: "absolute", inset: 0 },
  heroInner: { maxWidth: "1240px", margin: "0 auto", padding: "40px 20px", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px", alignItems: "center", position: "relative", zIndex: 2 },
  heroLeft: {},
  heroOurPartners: { fontSize: "10px", fontWeight: "800", color: "#94a3b8", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" },
  heroTitle: { fontSize: "40px", fontWeight: "900", color: "#ffffff", lineHeight: 1.15, margin: "0 0 16px" },
  heroSubtitle: { fontSize: "13px", color: "#94a3b8", margin: "0 0 24px", lineHeight: 1.6, maxWidth: "420px" },
  heroStats: { display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap" },
  heroStat: { textAlign: "center" },
  heroStatVal: { fontSize: "20px", fontWeight: "900", color: "#ffffff", lineHeight: 1.1 },
  heroStatLabel: { fontSize: "9px", color: "#64748b", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" },
  heroBadges: { display: "flex", gap: "12px", flexWrap: "wrap" },
  heroBadgeItem: { fontSize: "11px", color: "#94a3b8", fontWeight: "600" },
  heroRight: { position: "relative", height: "240px" },
  floatingBrandLogos: { position: "relative", width: "100%", height: "100%" },
  filterBar: { background: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "14px 16px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" },
  filterSearchWrapper: { display: "flex", alignItems: "center", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "8px 12px", minWidth: "200px" },
  filterSearchInput: { border: "none", outline: "none", fontSize: "12px", flex: 1, background: "transparent" },
  filterTabsRow: { display: "flex", gap: "6px", flex: 1, flexWrap: "wrap" },
  filterTab: { padding: "7px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" },
  sortSelect: { padding: "6px 12px", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "12px", outline: "none", background: "#fff" },
  brandsGrid: { display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "14px" },
  brandCard: { background: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden", textDecoration: "none", position: "relative", cursor: "pointer", boxShadow: "0 1px 3px rgba(0,0,0,.04)" },
  newBadge: { position: "absolute", top: "6px", right: "6px", background: "#059669", color: "#fff", fontSize: "8px", fontWeight: "800", padding: "2px 6px", borderRadius: "10px", zIndex: 1 },
  hotBadge: { position: "absolute", top: "6px", right: "6px", fontSize: "12px", zIndex: 1 },
  brandLogoText: { fontSize: "14px", fontWeight: "900", letterSpacing: "0.5px" },
  brandCardFooter: { padding: "8px 10px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9" },
  brandCountry: { display: "flex", alignItems: "center" },
  authorizedBadge: { display: "flex", alignItems: "center", background: "#ecfdf5", color: "#059669", fontSize: "8px", fontWeight: "800", padding: "2px 6px", borderRadius: "10px" },
  viewAllBrandsBtn: { background: "#fff", border: "1px solid #e2e8f0", color: "#0f172a", padding: "12px 32px", borderRadius: "8px", fontSize: "13px", fontWeight: "700", cursor: "pointer" },
  featuredBrandSection: { background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", display: "grid", gridTemplateColumns: "260px 1fr", overflow: "hidden" },
  featuredBrandLeft: { padding: "28px", borderRight: "1px solid #e2e8f0" },
  featuredBrandHeader: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" },
  featuredBrandLogoBox: { width: "48px", height: "48px", borderRadius: "12px", background: "#f1f5f9", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" },
  authorizedPartnerTag: { display: "inline-flex", alignItems: "center", background: "#ecfdf5", color: "#059669", fontSize: "10px", fontWeight: "700", padding: "4px 10px", borderRadius: "20px", border: "1px solid #a7f3d0" },
  brandInfoGrid: { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" },
  brandInfoRow: { display: "flex", justifyContent: "space-between", fontSize: "12px", paddingBottom: "6px", borderBottom: "1px solid #f1f5f9" },
  brandInfoLabel: { color: "#64748b", fontWeight: "500" },
  exploreBrandBtn: { display: "block", background: "#dc2626", color: "#fff", textDecoration: "none", padding: "10px 16px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", textAlign: "center" },
  featuredBrandRight: { padding: "20px 24px" },
  featuredTabs: { display: "flex", borderBottom: "1px solid #e2e8f0", marginBottom: "16px" },
  featuredTab: { padding: "10px 16px", background: "none", border: "none", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" },
  featuredProductsRow: { display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "12px", marginBottom: "16px" },
  featuredProductCard: { background: "#fff", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "10px", minWidth: "130px", position: "relative", flexShrink: 0 },
  featuredProductImg: { height: "80px", borderRadius: "6px", overflow: "hidden", marginBottom: "8px", background: "#f8fafc" },
  featuredProductName: { fontSize: "10px", fontWeight: "700", color: "#0f172a", marginBottom: "8px", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" },
  featuredProductPriceLine: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  featuredProductPrice: { fontSize: "12px", fontWeight: "900", color: "#dc2626" },
  featuredProductCartBtn: { width: "26px", height: "26px", border: "none", borderRadius: "6px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  featuredBottomGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  whyChooseBox: { background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "14px" },
  latestUpdatesBox: { background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "14px" },
  newTag: { background: "#059669", color: "#fff", fontSize: "9px", fontWeight: "800", padding: "2px 7px", borderRadius: "10px" },
  readMoreBtn: { background: "none", border: "none", color: "#dc2626", fontSize: "11px", fontWeight: "700", cursor: "pointer", padding: "6px 0 0" },
  trustFooter: { background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "24px", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px", textAlign: "center" },
  trustBadge: { display: "flex", flexDirection: "column", alignItems: "center" },
  trustBadgeTitle: { fontSize: "12px", fontWeight: "800", color: "#0f172a", marginBottom: "4px" },
  trustBadgeDesc: { fontSize: "10px", color: "#94a3b8" },
  partnerCtaSection: { background: "#0f172a", borderRadius: "16px", padding: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px" },
  partnerCtaLeft: { display: "flex", alignItems: "center", gap: "20px", flex: 1 },
  partnerCtaImg: { width: "80px", height: "80px", borderRadius: "12px", objectFit: "cover", flexShrink: 0 },
  partnerCtaTitle: { fontSize: "18px", fontWeight: "900", color: "#fff", margin: "0 0 8px" },
  partnerCtaSubtitle: { fontSize: "12px", color: "#94a3b8", margin: 0, lineHeight: 1.5 },
};

export default function BrandCollaboration() {
  const [searchBrand, setSearchBrand] = useState("");
  const [filterTab, setFilterTab] = useState("All Brands");
  const [sortBy, setSortBy] = useState("Popularity");
  const activeFeaturedBrand = BRANDS.find((brand) => brand.id === "bosch") || BRANDS[0];
  const [activeTab, setActiveTab] = useState("Power Tools");
  const [wishlist, setWishlist] = useState([]);
  const [addedMap, setAddedMap] = useState({});
  const [productSearch, setProductSearch] = useState("");
  const productRowRef = useRef(null);

  const filteredBrands = BRANDS.filter((b) => {
    const query = searchBrand.toLowerCase().trim();
    const matchesSearch =
      !query ||
      b.name.toLowerCase().includes(query) ||
      b.tagline?.toLowerCase().includes(query) ||
      b.categories?.some((category) => category.toLowerCase().includes(query));
    if (!matchesSearch) {
      if (query && ALL_BOSCH_PRODUCTS.some((prod) => prod.name.toLowerCase().includes(query))) {
        return true;
      }
      return false;
    }

    switch (filterTab) {
      case "All Brands":
        return true;
      case "Coming Soon":
        return b.statusNew === true;
      case "Available":
        return b.statusNew !== true;
      default:
        return b.categories?.includes(filterTab);
    }
  });

  // Fixed: use prodId correctly
  const handleAddToCart = (e, prodId) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedMap((prev) => ({ ...prev, [prodId]: true }));
    setTimeout(
      () => setAddedMap((prev) => ({ ...prev, [prodId]: false })),
      1500,
    );
  };

  const featuredProducts = BOSCH_PRODUCTS[activeTab] || [];
  const productQuery = productSearch.toLowerCase().trim();
  const filteredFeaturedProducts = featuredProducts.filter((prod) => {
    if (!productQuery) return true;
    return (
      prod.name.toLowerCase().includes(productQuery) ||
      prod.brand?.toLowerCase().includes(productQuery) ||
      prod.category?.toLowerCase().includes(productQuery)
    );
  });

  const scrollLeft = () => {
    if (productRowRef.current) {
      productRowRef.current.scrollBy({ left: -260, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (productRowRef.current) {
      productRowRef.current.scrollBy({ left: 260, behavior: "smooth" });
    }
  };

  return (
    <div style={bc.page}>
      {/* ─── HERO SECTION ─── */}
      <div style={bc.hero}>
        <div style={bc.heroBg}>
          <div style={bc.heroMapDots}>
            {Array.from({ length: 60 }).map((_, i) => (
              <div key={i} className="hero-map-dot" />
            ))}
          </div>
        </div>

        <div style={bc.heroInner}>
          <div style={bc.heroLeft}>
            <div style={bc.heroOurPartners}>OUR GLOBAL PARTNERS</div>
            <h1 style={bc.heroTitle}>
              TRUSTED BY
              <br />
              <span style={{ color: "#dc2626" }}>INDUSTRY LEADERS</span>
            </h1>
            <p style={bc.heroSubtitle}>
              We collaborate with world-class brands to bring you the finest
              power tools, accessories, and industrial solutions.
            </p>

            <div style={bc.heroStats}>
              {[
                { val: "18+", label: "Global Brands" },
                { val: "5000+", label: "Products Available" },
                { val: "15+", label: "Years of Trust" },
                { val: "100%", label: "Genuine Products" },
                { val: "24x7", label: "Expert Support" },
              ].map((stat, i) => (
                <div key={i} style={bc.heroStat}>
                  <div style={bc.heroStatVal}>{stat.val}</div>
                  <div style={bc.heroStatLabel}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={bc.heroBadges}>
              {[
                "✅ Authorized Dealer",
                "📄 GST Invoice",
                "🚚 Secure Delivery",
                "↩️ Easy Returns",
              ].map((badge, i) => (
                <span key={i} style={bc.heroBadgeItem}>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div style={bc.heroRight}>
            <div style={bc.floatingBrandLogos}>
              {[
                {
                  name: "BOSCH",
                  x: "10%",
                  y: "20%",
                  size: "large",
                  color: "#dc2626",
                },
                {
                  name: "Makita",
                  x: "65%",
                  y: "10%",
                  size: "large",
                  color: "#2563eb",
                },
                {
                  name: "INGCO",
                  x: "35%",
                  y: "40%",
                  size: "xlarge",
                  color: "#dc2626",
                },
                {
                  name: "DeWalt",
                  x: "70%",
                  y: "60%",
                  size: "large",
                  color: "#f59e0b",
                },
                {
                  name: "DCA",
                  x: "5%",
                  y: "65%",
                  size: "medium",
                  color: "#475569",
                },
                {
                  name: "TOTAL",
                  x: "60%",
                  y: "78%",
                  size: "medium",
                  color: "#0f172a",
                },
              ].map((logo, i) => (
                <div key={i} className={`floating-brand-logo ${logo.size}`}>
                  {logo.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bc-inner">
        {/* ─── SEARCH & FILTER BAR ─── */}
        <div style={bc.filterBar}>
          <div style={bc.filterSearchWrapper}>
            <Search size={14} color="#94a3b8" style={{ marginRight: "8px" }} />
            <input
              value={searchBrand}
              onChange={(e) => setSearchBrand(e.target.value)}
              placeholder="Search brands, categories, products..."
              style={bc.filterSearchInput}
            />
          </div>

          <div style={bc.filterTabsRow}>
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`filter-tab ${filterTab === tab ? "active" : ""}`}
              >
                {filterTab === "All Brands" && tab === "All Brands" && (
                  <span style={{ fontSize: "9px", marginRight: "4px" }}>
                    🔧
                  </span>
                )}
                {tab}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: "#64748b" }}>Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={bc.sortSelect}
            >
              {["Popularity", "A-Z", "Z-A", "Newest"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ─── BRANDS GRID ─── */}
        <div style={bc.brandsGrid}>
          {filteredBrands.map((brand) => (
            <Link key={brand.id} to={`/brand/${brand.id}`} style={bc.brandCard}>
              {brand.statusNew && <span style={bc.newBadge}>New</span>}
              {brand.id === "ingco" && <span style={bc.hotBadge}>🔥</span>}

              <div className="brand-logo-area">
                <span style={bc.brandLogoText}>{brand.name}</span>
                {brand.tagline && (
                  <span
                    style={{ fontSize: "9px", opacity: 0.7, display: "block" }}
                  >
                    {brand.tagline}
                  </span>
                )}
              </div>

              <div style={bc.brandCardFooter}>
                <div style={bc.brandCountry}>
                  <span style={{ marginRight: "4px" }}>
                    {brand.countryFlag}
                  </span>
                  <span style={{ fontSize: "11px", color: "#64748b" }}>
                    {brand.country}
                  </span>
                </div>
                <span style={bc.authorizedBadge}>
                  <CheckCircle2 size={9} style={{ marginRight: "3px" }} />
                  {brand.status}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <button style={bc.viewAllBrandsBtn}>View All Brands →</button>
        </div>

        {/* ─── FEATURED BRAND: BOSCH ─── */}
        <div style={bc.featuredBrandSection}>
          {/* Left: Brand Info */}
          <div style={bc.featuredBrandLeft}>
            <div style={bc.featuredBrandHeader}>
              <div style={bc.featuredBrandLogoBox}>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "900",
                    color: "#dc2626",
                  }}
                >
                  ⊙
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "900",
                    color: "#0f172a",
                  }}
                >
                  BOSCH
                </div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>
                  Invented for Life
                </div>
              </div>
            </div>

            <div style={bc.authorizedPartnerTag}>
              <CheckCircle2
                size={12}
                color="#059669"
                style={{ marginRight: "4px" }}
              />
              AUTHORIZED PARTNER
            </div>

            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                margin: "12px 0",
                lineHeight: "1.6",
              }}
            >
              {activeFeaturedBrand.name} is a trusted global partner for power
              tools and accessories, built on quality, service, and performance.
            </p>

            <div style={bc.brandInfoGrid}>
              {[
                {
                  label: "Country",
                  val: `${activeFeaturedBrand.countryFlag || ""} ${activeFeaturedBrand.country || "Global"}`,
                },
                { label: "Founded", val: activeFeaturedBrand.founded || "N/A" },
                { label: "Products", val: activeFeaturedBrand.products || "200+" },
                { label: "Warranty", val: activeFeaturedBrand.warranty || "Up to 6 Months" },
              ].map((info) => (
                <div key={info.label} style={bc.brandInfoRow}>
                  <span style={bc.brandInfoLabel}>{info.label}</span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#0f172a",
                      fontWeight: "700",
                    }}
                  >
                    {info.val}
                  </span>
                </div>
              ))}
            </div>

            <Link to={`/brand/${activeFeaturedBrand.id}`} style={bc.exploreBrandBtn}>
              Explore {activeFeaturedBrand.name} Products →
            </Link>
          </div>

          {/* Right: Product Tabs */}
          <div className="featured-brand-right">
            <div style={bc.featuredTabs}>
              {Object.keys(BOSCH_PRODUCTS).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`featured-tab ${activeTab === tab ? "active" : ""}`}
                >
                  {tab === "Power Tools" && (
                    <span style={{ marginRight: "4px" }}>🔧</span>
                  )}
                  {tab === "Accessories" && (
                    <span style={{ marginRight: "4px" }}>🔩</span>
                  )}
                  {tab === "Measuring Tools" && (
                    <span style={{ marginRight: "4px" }}>📏</span>
                  )}
                  {tab === "Spare Parts" && (
                    <span style={{ marginRight: "4px" }}>⚙️</span>
                  )}
                  {tab}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
              <div style={bc.filterSearchWrapper}>
                <Search size={14} color="#94a3b8" style={{ marginRight: "8px" }} />
                <input
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search Bosch products..."
                  style={bc.filterSearchInput}
                />
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  onClick={scrollLeft}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1px solid #e2e8f0",
                    background: "#ffffff",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#0f172a",
                  }}
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={scrollRight}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1px solid #e2e8f0",
                    background: "#ffffff",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#0f172a",
                  }}
                >
                  ›
                </button>
              </div>
            </div>

            <div ref={productRowRef} style={bc.featuredProductsRow}>
              {filteredFeaturedProducts.length > 0 ? (
                filteredFeaturedProducts.map((prod, i) => (
                  <Link
                    to={`/product/${prod.id}`}
                    key={i}
                    style={{ textDecoration: "none" }}
                  >
                    <div style={bc.featuredProductCard}>
                      <button
                        className="wishlist-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setWishlist((prev) =>
                            prev.includes(`b${i}`)
                              ? prev.filter((w) => w !== `b${i}`)
                              : [...prev, `b${i}`],
                          );
                        }}
                      >
                        <Heart
                          size={13}
                          color={
                            wishlist.includes(`b${i}`) ? "#dc2626" : "#cbd5e1"
                          }
                          fill={wishlist.includes(`b${i}`) ? "#dc2626" : "none"}
                        />
                      </button>
                      <div style={bc.featuredProductImg}>
                        <img
                          src={prod.image}
                          alt={prod.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "6px",
                          }}
                        />
                      </div>
                      <div style={bc.featuredProductName}>{prod.name}</div>
                      <div style={bc.featuredProductPriceLine}>
                        <span style={bc.featuredProductPrice}>
                          ₹{prod.price.toLocaleString("en-IN")}
                        </span>
                        <button
                          onClick={(e) => handleAddToCart(e, `b${i}`)}
                          className={`featured-product-cart-btn ${addedMap[`b${i}`] ? "added" : ""}`}
                        >
                          <ShoppingCart size={12} />
                        </button>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div
                  style={{
                    minHeight: "140px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#64748b",
                    fontSize: "13px",
                  }}
                >
                  No products found for "{productSearch}" in {activeFeaturedBrand.name}.
                </div>
              )}
            </div>

            <div style={bc.featuredBottomGrid}>
              <div style={bc.whyChooseBox}>
                <h4
                  style={{
                    fontSize: "13px",
                    fontWeight: "800",
                    color: "#0f172a",
                    marginBottom: "10px",
                  }}
                >
                  Why Choose {activeFeaturedBrand.name}?
                </h4>
                {(activeFeaturedBrand.whyChoose || activeFeaturedBrand.categories || [])
                  .slice(0, 4)
                  .map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "6px",
                      fontSize: "12px",
                      color: "#475569",
                    }}
                  >
                    <CheckCircle2 size={13} color="#059669" />
                    {item}
                  </div>
                ))}
              </div>
              <div style={bc.latestUpdatesBox}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "13px",
                      fontWeight: "800",
                      color: "#0f172a",
                      margin: 0,
                    }}
                  >
                    Latest Updates
                  </h4>
                  <span style={bc.newTag}>New</span>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    lineHeight: "1.5",
                    marginBottom: "10px",
                  }}
                >
                  {activeFeaturedBrand.latestUpdate ||
                    `${activeFeaturedBrand.name} continues to expand its product range with premium tools and accessories.`}
                </p>
                <img
                  src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=200"
                  alt="Latest Bosch"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    objectFit: "cover",
                    height: "60px",
                  }}
                />
                <button style={bc.readMoreBtn}>Read More →</button>
              </div>
            </div>
          </div>
        </div>

        {/* ─── TRUST FOOTER BADGES ─── */}
        <div style={bc.trustFooter}>
          {[
            {
              icon: "✅",
              title: "100% Original Products",
              desc: "Genuine & Authorised Parts",
            },
            {
              icon: "🚚",
              title: "Fast & Safe Delivery",
              desc: "Pan India Fast Shipping",
            },
            {
              icon: "🛡️",
              title: "Warranty Assurance",
              desc: "Brand Warranty Upto 6 Months",
            },
            {
              icon: "📦",
              title: "Bulk Order Support",
              desc: "Best Prices for Bulk Buyers",
            },
            {
              icon: "📄",
              title: "GST Invoice Available",
              desc: "Complete Billing & Invoice",
            },
            {
              icon: "🎧",
              title: "Expert Support",
              desc: "24x7 Technical Assistance",
            },
          ].map((badge, i) => (
            <div key={i} style={bc.trustBadge}>
              <span style={{ fontSize: "24px", marginBottom: "8px" }}>
                {badge.icon}
              </span>
              <div style={bc.trustBadgeTitle}>{badge.title}</div>
              <div style={bc.trustBadgeDesc}>{badge.desc}</div>
            </div>
          ))}
        </div>

        {/* ─── PARTNER CTA SECTION ─── */}
        <div style={bc.partnerCtaSection}>
          <div style={bc.partnerCtaLeft}>
            <img
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&auto=format&fit=crop"
              alt="Partnership"
              style={bc.partnerCtaImg}
            />
            <div style={{ flex: 1 }}>
              <h2 style={bc.partnerCtaTitle}>
                Want to Partner With Global Brands?
              </h2>
              <p style={bc.partnerCtaSubtitle}>
                Become our authorized dealer and get exclusive access to global
                brands with special pricing & support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
