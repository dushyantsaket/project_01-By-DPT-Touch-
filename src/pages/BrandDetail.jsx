import React, { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Search, ShoppingCart, Heart, CheckCircle2, Phone } from "lucide-react";
import { BRANDS, BOSCH_PRODUCTS, BRAND_VIDEOS } from "../data/brandData";

const FILTER_TABS = [
  "All Brands",
  "Power Tools",
  "Accessories",
  "Industrial",
  "Available",
  "Coming Soon",
];

export default function BrandDetail() {
  const { id } = useParams();
  const selectedBrand =
    BRANDS.find((brand) => brand.id === id) || BRANDS.find((brand) => brand.id === "bosch") || BRANDS[0];

  const [searchBrand, setSearchBrand] = useState("");
  const [filterTab, setFilterTab] = useState("All Brands");
  const [sortBy, setSortBy] = useState("Popularity");
  const [activeTab, setActiveTab] = useState("Power Tools");
  const [wishlist, setWishlist] = useState([]);
  const [addedMap, setAddedMap] = useState({});
  const [searchProduct, setSearchProduct] = useState("");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const productRowRef = useRef(null);

  const filteredBrands = BRANDS.filter((b) => {
    const matchesSearch =
      !searchBrand || b.name.toLowerCase().includes(searchBrand.toLowerCase());
    if (!matchesSearch) return false;

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

  const videos = BRAND_VIDEOS.filter((item) => item.brandId === selectedBrand.id);
  const currentVideo = videos[currentVideoIndex] || videos[0] || null;

  const handleAddToCart = (e, prodId) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedMap((prev) => ({ ...prev, [prodId]: true }));
    setTimeout(
      () => setAddedMap((prev) => ({ ...prev, [prodId]: false })),
      1500,
    );
  };

  const productName = (product) => {
    if (selectedBrand.id === "bosch") return product.name;
    return product.name.includes("Bosch")
      ? product.name.replace(/Bosch/g, selectedBrand.name)
      : `${selectedBrand.name} ${product.name}`;
  };

  const featuredProducts = (BOSCH_PRODUCTS[activeTab] || []).filter((prod) => {
    if (!searchProduct) return true;
    const query = searchProduct.toLowerCase();
    return (
      productName(prod).toLowerCase().includes(query) ||
      prod.subtitle?.toLowerCase().includes(query)
    );
  });

  const scrollLeft = () => {
    if (productRowRef.current) {
      productRowRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (productRowRef.current) {
      productRowRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div style={styles.page}>
      {/* ===== HERO ===== (unchanged) */}
      <div style={styles.hero}>
        <div style={styles.heroBg}>
          <div style={styles.heroMapDots}>
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: i % 7 === 0 ? "6px" : "3px",
                  height: i % 7 === 0 ? "6px" : "3px",
                  borderRadius: "50%",
                  background:
                    i % 7 === 0 ? "#dc2626" : "rgba(255,255,255,0.15)",
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 23 + 10) % 100}%`,
                }}
              />
            ))}
          </div>
        </div>
        <div style={styles.heroInner}>
          <div style={styles.heroLeft}>
            <div style={styles.heroOurPartners}>OUR GLOBAL PARTNERS</div>
            <h1 style={styles.heroTitle}>
              TRUSTED BY
              <br />
              <span style={{ color: "#dc2626" }}>INDUSTRY LEADERS</span>
            </h1>
            <p style={styles.heroSubtitle}>
              We collaborate with world-class brands to bring you the finest
              power tools, accessories, and industrial solutions.
            </p>
            <div style={styles.heroStats}>
              {[
                { val: "18+", label: "Global Brands" },
                { val: "5000+", label: "Products Available" },
                { val: "15+", label: "Years of Trust" },
                { val: "100%", label: "Genuine Products" },
                { val: "24x7", label: "Expert Support" },
              ].map((stat, i) => (
                <div key={i} style={styles.heroStat}>
                  <div style={styles.heroStatVal}>{stat.val}</div>
                  <div style={styles.heroStatLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div style={styles.heroBadges}>
              {[
                "✅ Authorized Dealer",
                "📄 GST Invoice",
                "🚚 Secure Delivery",
                "↩️ Easy Returns",
              ].map((badge, i) => (
                <span key={i} style={styles.heroBadgeItem}>
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div style={styles.heroRight}>
            <div style={styles.floatingBrandLogos}>
              {[
                { name: "BOSCH", x: "10%", y: "20%", color: "#dc2626" },
                { name: "Makita", x: "65%", y: "10%", color: "#2563eb" },
                { name: "Ingco", x: "35%", y: "40%", color: "#dc2626" },
                { name: "DeWalt", x: "70%", y: "60%", color: "#f59e0b" },
                { name: "DCA", x: "5%", y: "65%", color: "#475569" },
                {
                  name: "Total Power Tools",
                  x: "60%",
                  y: "78%",
                  color: "#0f172a",
                },
              ].map((logo, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: logo.x,
                    top: logo.y,
                    background: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    padding: "8px 14px",
                    fontSize: "13px",
                    fontWeight: "900",
                    color: logo.color,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    letterSpacing: "0.5px",
                    zIndex: 2,
                  }}
                >
                  {logo.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.inner}>
        {/* ===== FILTER BAR ===== */}
        <div style={styles.filterBar}>
          <div style={styles.filterSearchWrapper}>
            <Search size={14} color="#94a3b8" style={{ marginRight: "8px" }} />
            <input
              value={searchBrand}
              onChange={(e) => setSearchBrand(e.target.value)}
              placeholder="Search by brand name..."
              style={styles.filterSearchInput}
            />
          </div>
          <div style={styles.filterTabsRow}>
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                style={{
                  ...styles.filterTab,
                  background: filterTab === tab ? "#dc2626" : "#f1f5f9",
                  color: filterTab === tab ? "#ffffff" : "#475569",
                  border: filterTab === tab ? "none" : "1px solid #e2e8f0",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: "#64748b" }}>Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={styles.sortSelect}
            >
              {["Popularity", "A-Z", "Z-A", "Newest"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ===== BRANDS GRID ===== */}
        <div style={styles.brandsGrid}>
          {filteredBrands.map((brand) => (
            <Link
              key={brand.id}
              to={`/brand/${brand.id}`}
              style={styles.brandCard}
            >
              {brand.statusNew && <span style={styles.newBadge}>New</span>}
              <div style={styles.brandLogoArea}>
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    style={styles.brandLogoImage}
                  />
                ) : (
                  <span style={styles.brandLogoText}>{brand.name}</span>
                )}
                {brand.tagline && (
                  <span
                    style={{
                      fontSize: "9px",
                      opacity: 0.7,
                      display: "block",
                      marginTop: "4px",
                    }}
                  >
                    {brand.tagline}
                  </span>
                )}
              </div>
              <div style={styles.brandCardFooter}>
                <div style={styles.brandCountry}>
                  <span style={{ marginRight: "4px" }}>
                    {brand.countryFlag}
                  </span>
                  <span style={{ fontSize: "11px", color: "#64748b" }}>
                    {brand.country}
                  </span>
                </div>
                <span style={styles.authorizedBadge}>
                  <CheckCircle2 size={9} style={{ marginRight: "3px" }} />
                  {brand.status}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <button style={styles.viewAllBrandsBtn}>View All Brands →</button>
        </div>

        {/* ===== FEATURED BRAND ===== */}
        <div style={styles.featuredBrandSection}>
          {/* Left: Brand Info */}
          <div style={styles.featuredBrandLeft}>
            <div style={styles.featuredBrandHeader}>
              <div style={styles.featuredBrandLogoBox}>
                {selectedBrand.logo ? (
                  <img
                    src={selectedBrand.logo}
                    alt={selectedBrand.name}
                    style={{ width: "36px", height: "36px", objectFit: "contain" }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "900",
                      color: "#dc2626",
                    }}
                  >
                    ⊙
                  </span>
                )}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "900",
                    color: "#0f172a",
                  }}
                >
                  {selectedBrand.name.toUpperCase()}
                </div>
                {selectedBrand.tagline && (
                  <div style={{ fontSize: "11px", color: "#64748b" }}>
                    {selectedBrand.tagline}
                  </div>
                )}
              </div>
            </div>
            <div style={styles.authorizedPartnerTag}>
              <CheckCircle2
                size={12}
                color="#059669"
                style={{ marginRight: "4px" }}
              />
              {selectedBrand.status?.toUpperCase() || "AUTHORIZED PARTNER"}
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                margin: "12px 0",
                lineHeight: "1.6",
              }}
            >
              {selectedBrand.name} is a trusted brand in power tools and
              accessories, known for quality and performance across trade
              professionals.
            </p>
            <div style={styles.brandInfoGrid}>
              {[
                {
                  label: "Country",
                  val: `${selectedBrand.countryFlag || ""} ${selectedBrand.country || "Global"}`,
                },
                { label: "Established", val: selectedBrand.founded || "N/A" },
                { label: "Products", val: selectedBrand.products || "200+" },
                { label: "Warranty", val: selectedBrand.warranty || "Up to 6 Months" },
              ].map((info) => (
                <div key={info.label} style={styles.brandInfoRow}>
                  <span style={styles.brandInfoLabel}>{info.label}</span>
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
            <Link to={`/brand/${selectedBrand.id}`} style={styles.exploreBrandBtn}>
              Explore {selectedBrand.name} Products →
            </Link>
          </div>

          {/* Right: Product Tabs with new card design */}
          <div style={styles.featuredBrandRight}>
            {/* Tabs */}
            <div style={styles.featuredTabs}>
              {Object.keys(BOSCH_PRODUCTS).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    ...styles.featuredTab,
                    borderBottom:
                      activeTab === tab
                        ? "2px solid #dc2626"
                        : "2px solid transparent",
                    color: activeTab === tab ? "#dc2626" : "#64748b",
                    fontWeight: activeTab === tab ? "800" : "600",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div style={styles.productSearchBar}>
              <Search size={14} color="#94a3b8" style={{ marginRight: "10px" }} />
              <input
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
                placeholder={`Search ${selectedBrand.name} products...`}
                style={styles.productSearchInput}
              />
            </div>

            {/* Products Row with scroll buttons */}
            <div style={{ position: "relative" }}>
              <button
                onClick={scrollLeft}
                style={styles.scrollBtnLeft}
                aria-label="Scroll left"
              >
                ‹
              </button>
              <div ref={productRowRef} style={styles.featuredProductsRow}>
                {featuredProducts.map((prod, i) => (
                  <Link
                    to={`/product/${prod.id}`}
                    key={i}
                    style={{ textDecoration: "none" }}
                  >
                    <div style={styles.featuredProductCard}>
                      {/* Wishlist heart */}
                      <button
                        style={{
                          position: "absolute",
                          top: "6px",
                          right: "6px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          zIndex: 2,
                        }}
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

                      {/* Product content - text only */}
                      <div style={styles.featuredProductContent}>
                        <div style={styles.featuredProductName}>
                          {productName(prod)}
                        </div>
                        {prod.subtitle && (
                          <div style={styles.featuredProductSubtitle}>
                            {prod.subtitle}
                          </div>
                        )}
                        <div style={styles.featuredProductPriceLine}>
                          <span style={styles.featuredProductPrice}>
                            ₹{prod.price.toLocaleString("en-IN")}
                          </span>
                          <button
                            onClick={(e) => handleAddToCart(e, `b${i}`)}
                            style={{
                              ...styles.featuredProductCartBtn,
                              background: addedMap[`b${i}`]
                                ? "#059669"
                                : "#dc2626",
                            }}
                          >
                            <ShoppingCart size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <button
                onClick={scrollRight}
                style={styles.scrollBtnRight}
                aria-label="Scroll right"
              >
                ›
              </button>
            </div>

            {/* Why Choose + Latest Updates */}
            <div style={styles.featuredBottomGrid}>
              <div style={styles.whyChooseBox}>
                <h4
                  style={{
                    fontSize: "13px",
                    fontWeight: "800",
                    color: "#0f172a",
                    marginBottom: "10px",
                  }}
                >
                  Why Choose {selectedBrand.name}?
                </h4>
                {(selectedBrand.whyChoose || selectedBrand.categories || [])
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
              <div style={styles.latestUpdatesBox}>
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
                  <span style={styles.newTag}>New</span>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    lineHeight: "1.5",
                    marginBottom: "10px",
                  }}
                >
                  {selectedBrand.latestUpdate ||
                    `${selectedBrand.name} continues to expand its product range with premium tools and accessories.`}
                </p>
                <img
                  src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=200"
                  alt={`Latest ${selectedBrand.name}`}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    objectFit: "cover",
                    height: "60px",
                  }}
                />
                <button style={styles.readMoreBtn}>Read More →</button>
              </div>
            </div>
          </div>
        </div>

        {/* ===== VIDEO HIGHLIGHTS ===== */}
        <div style={styles.videoSection}>
          <div style={styles.videoSectionHeader}>
            <div>
              <div style={styles.sectionTitle}>{selectedBrand.name} Video Showcase</div>
              <div style={styles.sectionSubtitle}>
                Watch product demos, engineering stories and usage guidance for
                the selected brand.
              </div>
            </div>
            {videos.length > 0 && (
              <div style={styles.videoNavButtons}>
                <button
                  style={styles.videoNavBtn}
                  type="button"
                  onClick={() =>
                    setCurrentVideoIndex((prev) =>
                      prev > 0 ? prev - 1 : videos.length - 1,
                    )
                  }
                >
                  ←
                </button>
                <button
                  style={styles.videoNavBtn}
                  type="button"
                  onClick={() =>
                    setCurrentVideoIndex((prev) =>
                      prev < videos.length - 1 ? prev + 1 : 0,
                    )
                  }
                >
                  →
                </button>
              </div>
            )}
          </div>
          {currentVideo ? (
            <div style={styles.videoHighlightCard}>
              <img
                src={currentVideo.thumbnail}
                alt={currentVideo.title}
                style={styles.videoThumbnail}
              />
              <div style={styles.videoHighlightMeta}>
                <div style={styles.videoBadge}>{currentVideo.duration}</div>
                <h3 style={styles.videoHighlightTitle}>
                  {currentVideo.title}
                </h3>
                <p style={styles.videoHighlightDesc}>
                  {currentVideo.subtitle}
                </p>
              </div>
            </div>
          ) : (
            <div style={styles.noVideoCard}>
              <div style={styles.sectionTitle}>Video coming soon</div>
              <div style={styles.sectionSubtitle}>
                We are preparing a detailed video experience for {selectedBrand.name}.
              </div>
            </div>
          )}
          <div style={styles.videoCardsRow}>
            {videos.map((video, idx) => (
              <div
                key={video.title}
                style={
                  idx === currentVideoIndex
                    ? styles.videoCardActive
                    : styles.videoCard
                }
                onClick={() => setCurrentVideoIndex(idx)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  style={styles.videoCardThumb}
                />
                <div style={styles.videoCardInfo}>
                  <div style={styles.videoCardTitle}>{video.title}</div>
                  <div style={styles.videoCardSubtitle}>{video.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== TRUST FOOTER ===== */}
        <div style={styles.trustFooter}>
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
            <div key={i} style={styles.trustBadge}>
              <span style={{ fontSize: "24px", marginBottom: "8px" }}>
                {badge.icon}
              </span>
              <div style={styles.trustBadgeTitle}>{badge.title}</div>
              <div style={styles.trustBadgeDesc}>{badge.desc}</div>
            </div>
          ))}
        </div>

        {/* ===== GLOBAL FOOTPRINT ===== */}
        <div style={styles.mapRatingsSection}>
          <div style={styles.mapPanel}>
            <h3 style={styles.sectionTitle}>Global Brand Footprint</h3>
            <p style={styles.sectionSubtitle}>
              Visualize the reach of our trusted brands across major regions with
              verified delivery and service locations.
            </p>
            <img
              src="https://images.unsplash.com/photo-1497493292307-31c376b6e479?w=800&auto=format&fit=crop&q=60"
              alt="Global footprint map"
              style={styles.mapImage}
            />
            <div style={styles.mapStatsRow}>
              {[
                { label: "Countries", value: "24+" },
                { label: "Cities", value: "86+" },
                { label: "Warehouses", value: "12" },
              ].map((item) => (
                <div key={item.label} style={styles.mapStatCard}>
                  <div style={styles.mapStatValue}>{item.value}</div>
                  <div style={styles.mapStatLabel}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={styles.ratingPanel}>
            <div style={styles.sectionTitle}>Customer Satisfaction</div>
            <div style={styles.ratingSummary}>
              <span style={styles.ratingValue}>4.8</span>
              <span style={styles.ratingOutOf}>/5</span>
            </div>
            <div style={styles.ratingMeta}>
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} style={styles.ratingStar}>★</span>
              ))}
              <span style={styles.ratingCount}>(1200+ reviews)</span>
            </div>
            <div style={styles.ratingDetails}>
              <div style={styles.ratingDetailRow}>
                <span>Verified Product Quality</span>
                <strong>98%</strong>
              </div>
              <div style={styles.ratingDetailRow}>
                <span>Delivery Satisfaction</span>
                <strong>95%</strong>
              </div>
              <div style={styles.ratingDetailRow}>
                <span>Support Experience</span>
                <strong>96%</strong>
              </div>
            </div>
          </div>
        </div>

        {/* ===== PARTNER CTA ===== */}
        <div style={styles.partnerCtaSection}>
          <div style={styles.partnerCtaLeft}>
            <img
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&auto=format&fit=crop"
              alt="Partnership"
              style={styles.partnerCtaImg}
            />
            <div style={{ flex: 1 }}>
              <h2 style={styles.partnerCtaTitle}>
                Want to Partner With Global Brands?
              </h2>
              <p style={styles.partnerCtaSubtitle}>
                Become our authorized dealer and get exclusive access to global
                brands with special pricing & support.
              </p>
              <div style={styles.partnerBenefits}>
                {[
                  "Exclusive Pricing",
                  "Marketing Support",
                  "Priority Service",
                  "Business Growth",
                ].map((b, i) => (
                  <div key={i} style={styles.partnerBenefit}>
                    <CheckCircle2
                      size={12}
                      color="#059669"
                      style={{ marginRight: "5px" }}
                    />
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={styles.partnerCtaRight}>
            <Link to="/contact" style={styles.dealershipBtn}>
              Apply for Dealership →
            </Link>
            <div style={styles.talkExpertRow}>
              <Phone size={14} color="#94a3b8" style={{ marginRight: "6px" }} />
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                Talk to our expert:{" "}
              </span>
              <a
                href="tel:+919754015503"
                style={{
                  fontSize: "13px",
                  fontWeight: "800",
                  color: "#ffffff",
                  textDecoration: "none",
                  marginLeft: "4px",
                }}
              >
                +91 97540 15503
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== STYLES ====================
const styles = {
  // ... (all previous styles remain the same, except we update featuredProductCard and related)
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    paddingTop: "72px",
    fontFamily: "'Inter', sans-serif",
  },
  hero: {
    background:
      "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #1a0a0a 100%)",
    position: "relative",
    overflow: "hidden",
    minHeight: "320px",
  },
  heroBg: { position: "absolute", inset: 0 },
  heroMapDots: { position: "absolute", inset: 0 },
  heroInner: {
    maxWidth: "1240px",
    margin: "0 auto",
    padding: "40px 20px",
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: "40px",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
  },
  heroLeft: {},
  heroOurPartners: {
    fontSize: "10px",
    fontWeight: "800",
    color: "#94a3b8",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "12px",
  },
  heroTitle: {
    fontSize: "40px",
    fontWeight: "900",
    color: "#ffffff",
    lineHeight: "1.15",
    margin: "0 0 16px",
  },
  heroSubtitle: {
    fontSize: "13px",
    color: "#94a3b8",
    margin: "0 0 24px",
    lineHeight: "1.6",
    maxWidth: "420px",
  },
  heroStats: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  heroStat: { textAlign: "center" },
  heroStatVal: {
    fontSize: "20px",
    fontWeight: "900",
    color: "#ffffff",
    lineHeight: "1.1",
  },
  heroStatLabel: {
    fontSize: "9px",
    color: "#64748b",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  heroBadges: { display: "flex", gap: "12px", flexWrap: "wrap" },
  heroBadgeItem: { fontSize: "11px", color: "#94a3b8", fontWeight: "600" },
  heroRight: { position: "relative", height: "240px" },
  floatingBrandLogos: { position: "relative", width: "100%", height: "100%" },
  inner: {
    maxWidth: "1240px",
    margin: "0 auto",
    padding: "32px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  filterBar: {
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  filterSearchWrapper: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "8px 12px",
    minWidth: "200px",
  },
  filterSearchInput: {
    border: "none",
    outline: "none",
    fontSize: "12px",
    flex: 1,
    background: "transparent",
  },
  filterTabsRow: { display: "flex", gap: "6px", flex: 1, flexWrap: "wrap" },
  filterTab: {
    padding: "7px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  sortSelect: {
    padding: "6px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "12px",
    outline: "none",
    background: "#fff",
  },
  productSearchBar: {
    marginTop: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "10px 14px",
    background: "#ffffff",
  },
  productSearchInput: {
    border: "none",
    outline: "none",
    fontSize: "12px",
    color: "#0f172a",
    width: "100%",
    background: "transparent",
  },
  brandsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "14px",
  },
  brandCard: {
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    textDecoration: "none",
    position: "relative",
    cursor: "pointer",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    transition: "box-shadow 0.2s",
    ":hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.08)" },
  },
  newBadge: {
    position: "absolute",
    top: "6px",
    right: "6px",
    background: "#059669",
    color: "#ffffff",
    fontSize: "8px",
    fontWeight: "800",
    padding: "2px 6px",
    borderRadius: "10px",
    zIndex: 1,
  },
  brandLogoArea: {
    height: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    textAlign: "center",
    background: "#ffffff",
  },
  brandLogoImage: { maxWidth: "80%", maxHeight: "60px", objectFit: "contain" },
  brandLogoText: {
    fontSize: "14px",
    fontWeight: "900",
    letterSpacing: "0.5px",
    color: "#0f172a",
  },
  brandCardFooter: {
    padding: "8px 10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #f1f5f9",
  },
  brandCountry: { display: "flex", alignItems: "center" },
  authorizedBadge: {
    display: "flex",
    alignItems: "center",
    background: "#ecfdf5",
    color: "#059669",
    fontSize: "8px",
    fontWeight: "800",
    padding: "2px 6px",
    borderRadius: "10px",
  },
  viewAllBrandsBtn: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    color: "#0f172a",
    padding: "12px 32px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
  },
  featuredBrandSection: {
    background: "#0f172a",
    borderRadius: "16px",
    border: "1px solid #1e293b",
    display: "grid",
    gridTemplateColumns: "260px 1fr",
    overflow: "hidden",
  },
  featuredBrandLeft: { padding: "28px", borderRight: "1px solid #1e293b" },
  featuredBrandHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  featuredBrandLogoBox: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "#1e293b",
    border: "1px solid #334155",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  authorizedPartnerTag: {
    display: "inline-flex",
    alignItems: "center",
    background: "#022c22",
    color: "#34d399",
    fontSize: "10px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "20px",
    border: "1px solid #064e3b",
  },
  brandInfoGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "20px",
  },
  brandInfoRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    paddingBottom: "6px",
    borderBottom: "1px solid #1e293b",
  },
  brandInfoLabel: { color: "#64748b", fontWeight: "500" },
  exploreBrandBtn: {
    display: "block",
    background: "#dc2626",
    color: "#ffffff",
    textDecoration: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "700",
    textAlign: "center",
  },
  featuredBrandRight: { padding: "20px 24px" },
  featuredTabs: {
    display: "flex",
    gap: "0",
    borderBottom: "1px solid #1e293b",
    marginBottom: "16px",
  },
  featuredTab: {
    padding: "10px 16px",
    background: "none",
    border: "none",
    fontSize: "12px",
    cursor: "pointer",
    transition: "all 0.15s",
    whiteSpace: "nowrap",
  },
  scrollBtnLeft: {
    position: "absolute",
    left: "-12px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    opacity: 0.8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    transition: "all 0.2s",
    ":hover": { background: "#334155", opacity: 1 },
  },
  scrollBtnRight: {
    position: "absolute",
    right: "-12px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    opacity: 0.8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    transition: "all 0.2s",
    ":hover": { background: "#334155", opacity: 1 },
  },
  featuredProductsRow: {
    display: "flex",
    gap: "16px",
    overflowX: "auto",
    padding: "12px 4px",
    marginBottom: "16px",
    scrollbarWidth: "thin",
    scrollbarColor: "#334155 #1e293b",
  },
  featuredProductCard: {
    background: "#1e293b",
    borderRadius: "10px",
    border: "1px solid #334155",
    padding: "14px",
    minWidth: "160px",
    position: "relative",
    flexShrink: 0,
    transition: "transform 0.2s, box-shadow 0.2s",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
    },
  },
  featuredProductContent: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  featuredProductName: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#ffffff",
    lineHeight: "1.3",
  },
  featuredProductSubtitle: {
    fontSize: "10px",
    fontWeight: "500",
    color: "#94a3b8",
    marginBottom: "6px",
  },
  featuredProductPriceLine: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "6px",
  },
  featuredProductPrice: {
    fontSize: "14px",
    fontWeight: "900",
    color: "#f87171",
  },
  featuredProductCartBtn: {
    width: "28px",
    height: "28px",
    border: "none",
    borderRadius: "6px",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  featuredBottomGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  videoSection: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  videoSectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "900",
    color: "#0f172a",
  },
  sectionSubtitle: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "6px",
    maxWidth: "640px",
    lineHeight: "1.6",
  },
  videoNavButtons: { display: "flex", gap: "8px" },
  videoNavBtn: {
    background: "#0f172a",
    border: "none",
    color: "#ffffff",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "700",
  },
  videoHighlightCard: {
    display: "grid",
    gridTemplateColumns: "320px 1fr",
    gap: "20px",
    alignItems: "center",
    background: "#f8fafc",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
  },
  videoThumbnail: {
    width: "100%",
    height: "240px",
    objectFit: "cover",
  },
  videoHighlightMeta: { padding: "20px" },
  videoBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "#dc2626",
    color: "#ffffff",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "10px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  videoHighlightTitle: {
    fontSize: "18px",
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: "10px",
  },
  videoHighlightDesc: {
    fontSize: "12px",
    color: "#475569",
    lineHeight: "1.6",
  },
  noVideoCard: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "36px",
    background: "#f8fafc",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
  },
  videoCardsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
  },
  videoCard: {
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    cursor: "pointer",
    background: "#ffffff",
  },
  videoCardActive: {
    borderRadius: "14px",
    border: "2px solid #dc2626",
    overflow: "hidden",
    cursor: "pointer",
    background: "#ffffff",
  },
  videoCardThumb: { width: "100%", height: "140px", objectFit: "cover" },
  videoCardInfo: { padding: "12px" },
  videoCardTitle: {
    fontSize: "13px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "6px",
  },
  videoCardSubtitle: { fontSize: "11px", color: "#64748b", lineHeight: "1.5" },
  mapRatingsSection: {
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr",
    gap: "20px",
    alignItems: "stretch",
  },
  mapPanel: {
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  mapImage: {
    width: "100%",
    borderRadius: "16px",
    objectFit: "cover",
    minHeight: "220px",
  },
  mapStatsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "12px",
  },
  mapStatCard: {
    background: "#f8fafc",
    borderRadius: "14px",
    padding: "14px",
    textAlign: "center",
  },
  mapStatValue: {
    fontSize: "18px",
    fontWeight: "900",
    color: "#0f172a",
  },
  mapStatLabel: {
    fontSize: "11px",
    color: "#64748b",
    marginTop: "4px",
  },
  ratingPanel: {
    background: "#0f172a",
    borderRadius: "16px",
    padding: "24px",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  ratingSummary: {
    display: "flex",
    alignItems: "flex-end",
    gap: "8px",
  },
  ratingValue: {
    fontSize: "44px",
    fontWeight: "900",
    lineHeight: "1",
  },
  ratingOutOf: { fontSize: "18px", color: "#94a3b8" },
  ratingMeta: { display: "flex", alignItems: "center", gap: "10px" },
  ratingStar: { color: "#facc15", fontSize: "16px" },
  ratingCount: { fontSize: "12px", color: "#94a3b8" },
  ratingDetails: { display: "grid", gap: "12px" },
  ratingDetailRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#cbd5e1",
  },
  whyChooseBox: {
    background: "#1e293b",
    borderRadius: "10px",
    border: "1px solid #334155",
    padding: "14px",
  },
  latestUpdatesBox: {
    background: "#1e293b",
    borderRadius: "10px",
    border: "1px solid #334155",
    padding: "14px",
  },
  newTag: {
    background: "#059669",
    color: "#ffffff",
    fontSize: "9px",
    fontWeight: "800",
    padding: "2px 7px",
    borderRadius: "10px",
  },
  readMoreBtn: {
    background: "none",
    border: "none",
    color: "#dc2626",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
    padding: "6px 0 0",
    display: "block",
  },
  trustFooter: {
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    padding: "24px",
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "16px",
    textAlign: "center",
  },
  trustBadge: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  trustBadgeTitle: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "4px",
  },
  trustBadgeDesc: { fontSize: "10px", color: "#94a3b8" },
  partnerCtaSection: {
    background: "#0f172a",
    borderRadius: "16px",
    padding: "32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "24px",
  },
  partnerCtaLeft: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flex: 1,
  },
  partnerCtaImg: {
    width: "80px",
    height: "80px",
    borderRadius: "12px",
    objectFit: "cover",
    flexShrink: 0,
  },
  partnerCtaTitle: {
    fontSize: "18px",
    fontWeight: "900",
    color: "#ffffff",
    margin: "0 0 8px",
  },
  partnerCtaSubtitle: {
    fontSize: "12px",
    color: "#94a3b8",
    margin: "0 0 12px",
    lineHeight: "1.5",
  },
  partnerBenefits: { display: "flex", flexWrap: "wrap", gap: "12px" },
  partnerBenefit: {
    display: "flex",
    alignItems: "center",
    fontSize: "11px",
    color: "#94a3b8",
    fontWeight: "600",
  },
  partnerCtaRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    flexShrink: 0,
  },
  dealershipBtn: {
    background: "#dc2626",
    color: "#ffffff",
    textDecoration: "none",
    padding: "14px 24px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "800",
    display: "block",
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  talkExpertRow: { display: "flex", alignItems: "center" },
};
