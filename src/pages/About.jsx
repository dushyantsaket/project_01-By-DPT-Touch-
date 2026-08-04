import React, { useState, useRef } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Shield,
  Truck,
  Wrench,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Zap,
  Armchair,
  Hammer,
  Settings,
  Eye,
  HelpCircle,
  HardHat,
  Compass,
} from "lucide-react";
import {
  Link,
  Outlet,
  useParams,
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";
import { BRANDS as brands } from "../data/brandData";

const BUSINESS_VERTICALS = [
  {
    id: "nch",
    name: "Dushyant Power Tools",
    tagline:
      "Your one-stop destination for industrial and professional grade power tools.",
    stats: { products: "500+", years: "25+" },
    color: "#ff6700",
    icon: Zap,
    logo: "NCH",
  },
  {
    id: "dfm",
    name: "DFM Furniture Mart",
    tagline:
      "Premium quality furniture for home, office and commercial spaces.",
    stats: { products: "1000+", years: "15+" },
    color: "#854d0e",
    icon: Armchair,
    logo: "DFM",
  },
  {
    id: "vpt",
    name: "VPT Tool Touch",
    tagline:
      "India's trusted tool service network for repairs and spare parts.",
    stats: { services: "500+", years: "25+" },
    color: "#2563eb",
    icon: Wrench,
    logo: "VPT",
  },
  {
    id: "dbt",
    name: "Dushyant Beat Manufacturing",
    tagline: "Advanced manufacturing of beat & acoustic instruments.",
    stats: { instruments: "50+", years: "10+" },
    color: "#4f46e5",
    icon: Compass,
    logo: "DBT",
  },
  {
    id: "vijay",
    name: "Vijay Power Tools",
    tagline: "Certified industrial power tools for heavy duty performance.",
    stats: { products: "800+", years: "20+" },
    color: "#dc2626",
    icon: Hammer,
    logo: "VPT",
  },
];

const OFFERED_CATEGORIES = [
  { name: "Power Tools", icon: Zap },
  { name: "Hand Tools", icon: Hammer },
  { name: "Industrial Equipment", icon: Settings },
  { name: "Wood Working Tools", icon: Wrench },
  { name: "Agricultural Equipment", icon: Compass },
  { name: "Safety Equipment", icon: HardHat },
  { name: "Hardware & Accessories", icon: Award },
  { name: "Spare Parts & Components", icon: Settings },
];

const GALLERY_IMAGES = [
  {
    title: "Store Front",
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "Tool Display",
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "DFM Signboard",
    url: "https://lh3.googleusercontent.com/gps-cs/AH1DqX9hsVcD4WYPNIhcoBujQq-IVlzTSXNb6v6-eR9lsShl3ZIyobXzspTNBQe-jogoeyQUh2t2AnGXIwmtQLUVShkaqA4kHTbid8q_EACp6KtCKvQvkw9b_-uYMx5A8kSFw0LdPLQ40hbe8h4_=w675-h361-p-k-no",
  },
  {
    title: "Workshop Service",
    url: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "Acoustic Instruments",
    url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "Hardware Rack",
    url: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=600&auto=format&fit=crop&q=60",
  },
];

const ArrowRight = ({ size, style, color }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || "currentColor"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const styles = {
  container: {
    minHeight: "100vh",
    background: "#fafafa",
    paddingTop: "72px",
    fontFamily: "'Inter', sans-serif",
  },
  heroSection: {
    position: "relative",
    height: "540px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 80px",
    overflow: "hidden",
  },
  heroBgContainer: {
    position: "absolute",
    inset: 0,
    zIndex: 1,
  },
  heroBgImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "650px",
  },
  heroEstBadge: {
    background: "#ff6700",
    color: "#fff",
    fontSize: "11px",
    fontWeight: "800",
    padding: "6px 16px",
    borderRadius: "6px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    display: "inline-block",
    marginBottom: "18px",
  },
  heroTitle: {
    fontSize: "48px",
    fontWeight: "900",
    color: "#ffffff",
    margin: "0 0 16px",
    lineHeight: 1.1,
  },
  heroSubtitle: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: "1.6",
    margin: "0 0 32px",
  },
  heroActions: {
    display: "flex",
    gap: "16px",
  },
  heroBtnPrimary: {
    background: "#ff6700",
    color: "#fff",
    border: "none",
    padding: "14px 28px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  heroBtnSecondary: {
    background: "rgba(255, 255, 255, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    color: "#fff",
    padding: "14px 28px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "700",
    textDecoration: "none",
    display: "inline-block",
    textAlign: "center",
    transition: "background 0.2s",
  },
  statsBar: {
    background: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    padding: "24px 0",
  },
  statsInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    textAlign: "center",
  },
  statItem: {
    borderRight: "1px solid #e2e8f0",
  },
  statNum: {
    fontSize: "22px",
    fontWeight: "900",
    color: "#ff6700",
    marginBottom: "4px",
  },
  statDesc: {
    fontSize: "11px",
    color: "#64748b",
    fontWeight: "600",
  },
  sectionContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "60px 24px",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "32px",
    position: "relative",
  },
  sectionEyebrow: {
    fontSize: "10px",
    fontWeight: "800",
    color: "#ff6700",
    background: "#fff7ed",
    padding: "2px 8px",
    borderRadius: "4px",
    display: "inline-block",
    marginBottom: "8px",
    letterSpacing: "0.5px",
  },
  sectionTitle: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 4px",
  },
  sectionSub: {
    fontSize: "14px",
    color: "#64748b",
    margin: 0,
  },
  sliderControls: {
    display: "flex",
    gap: "8px",
    position: "absolute",
    right: "0",
    bottom: "0",
  },
  arrowBtn: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "1px solid #e2e8f0",
    background: "#fff",
    color: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  scrollWrapper: {
    display: "flex",
    gap: "20px",
    overflowX: "auto",
    paddingBottom: "16px",
    scrollbarWidth: "none",
  },
  verticalCard: {
    flex: "0 0 280px",
    background: "#ffffff",
    borderRadius: "20px",
    border: "1px solid #f1f5f9",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
  },
  verticalLogoBox: {
    marginBottom: "20px",
  },
  verticalNchLogo: {
    width: "60px",
    height: "36px",
    border: "2px solid #dc2626",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  verticalGenericLogo: {
    width: "60px",
    height: "36px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "900",
  },
  verticalName: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "8px",
  },
  verticalTagline: {
    fontSize: "12px",
    color: "#64748b",
    lineHeight: "1.5",
    marginBottom: "20px",
    flex: 1,
  },
  verticalStatsRow: {
    display: "flex",
    gap: "20px",
    borderTop: "1px solid #f1f5f9",
    paddingTop: "14px",
    marginBottom: "16px",
  },
  verticalStatVal: {
    fontSize: "14px",
    fontWeight: "800",
    color: "#0f172a",
  },
  verticalStatLabel: {
    fontSize: "9px",
    color: "#94a3b8",
  },
  verticalLink: {
    fontSize: "12px",
    fontWeight: "700",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
  },
  aboutSplitSection: {
    background: "#ffffff",
    borderTop: "1px solid #f1f5f9",
    borderBottom: "1px solid #f1f5f9",
    padding: "80px 0",
  },
  aboutSplitGrid: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr",
    gap: "48px",
    alignItems: "center",
  },
  aboutLeftImgCol: {},
  aboutStoreImg: {
    width: "100%",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  },
  aboutRightTextCol: {},
  aboutSmallEyebrow: {
    fontSize: "10px",
    fontWeight: "800",
    color: "#ff6700",
    background: "#fff7ed",
    padding: "2px 8px",
    borderRadius: "4px",
    display: "inline-block",
    marginBottom: "12px",
    letterSpacing: "0.5px",
  },
  aboutMainHeading: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 16px",
  },
  aboutParagraph: {
    fontSize: "14px",
    color: "#475569",
    lineHeight: "1.7",
    marginBottom: "24px",
  },
  bulletsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px 24px",
    marginBottom: "32px",
  },
  bulletItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  bulletCheckIcon: {
    display: "flex",
    alignItems: "center",
  },
  bulletText: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#334155",
  },
  knowMoreBtn: {
    background: "#ff6700",
    color: "#ffffff",
    border: "none",
    padding: "14px 28px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
  },
  categoriesSection: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "80px 24px 40px",
  },
  categoriesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
  },
  categoryCard: {
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #f1f5f9",
    padding: "24px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  categoryIconBox: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#fff7ed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },
  categoryCardTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#0f172a",
    margin: 0,
  },
  partnersSection: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 24px 60px",
    position: "relative",
  },
  sliderControlsOuter: {
    position: "absolute",
    right: "24px",
    top: "40px",
  },
  brandsBarScroll: {
    display: "flex",
    gap: "16px",
    overflowX: "auto",
    paddingBottom: "10px",
    scrollbarWidth: "none",
  },
  brandLogoCard: {
    flex: "0 0 140px",
    height: "70px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
  },
  miniNchLogo: {
    width: "100%",
    height: "100%",
    border: "3px solid #dc2626",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  miniNchBorder: {
    width: "90%",
    height: "90%",
    border: "1px solid #dc2626",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  brandLogoImg: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  galleryCard: {
    flex: "0 0 280px",
    height: "180px",
    borderRadius: "16px",
    overflow: "hidden",
    position: "relative",
  },
  galleryImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  galleryCardTitleOverlay: {
    position: "absolute",
    bottom: 0,
    insetX: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
    padding: "16px",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "700",
  },
  trustBadgesBar: {
    background: "#fff7ed",
    padding: "32px 0",
    borderTop: "1px solid #fed7aa",
    borderBottom: "1px solid #fed7aa",
  },
  trustBadgesInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "16px",
  },
  trustBadgeItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  trustBadgeIconBox: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "8px",
    boxShadow: "0 2px 8px rgba(249, 115, 22, 0.08)",
  },
  trustBadgeLabel: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#0f172a",
    lineHeight: "1.3",
  },
  footer: {
    background: "#0f172a",
    color: "#94a3b8",
    padding: "60px 0",
  },
  footerGrid: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "32px",
  },
  footerCol: {},
  footerColHeading: {
    fontSize: "14px",
    fontWeight: "800",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "20px",
  },
  footerList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  footerListItem: {
    fontSize: "13px",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
  },
  mapContainer: {
    borderRadius: "10px",
    overflow: "hidden",
    position: "relative",
    height: "120px",
    border: "1px solid #334155",
  },
  mapImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.5,
  },
  mapOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(255,255,255,0.9)",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  mapLink: {
    fontSize: "10px",
    color: "#ff6700",
    fontWeight: "700",
    textDecoration: "none",
    marginTop: "6px",
  },
  socialsRow: {
    display: "flex",
    gap: "12px",
  },
  socialIconBox: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#1e293b",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  },
};

const About = () => {
  const verticalsRef = useRef(null);
  const galleryRef = useRef(null);
  const brandsSliderRef = useRef(null);

  const scrollContainer = (ref, direction, amount = 300) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div style={styles.container}>
      {/* ── HERO SECTION ── */}
      <div style={styles.heroSection}>
        {/* Background store image */}
        <div style={styles.heroBgContainer}>
          <img
            src="https://lh3.googleusercontent.com/gps-cs/AH1DqX9hsVcD4WYPNIhcoBujQq-IVlzTSXNb6v6-eR9lsShl3ZIyobXzspTNBQe-jogoeyQUh2t2AnGXIwmtQLUVShkaqA4kHTbid8q_EACp6KtCKvQvkw9b_-uYMx5A8kSFw0LdPLQ40hbe8h4_=w675-h361-p-k-no"
            alt="Dushyant Store Front"
            style={styles.heroBgImg}
          />
          <div style={styles.heroOverlay}></div>
        </div>

        {/* Hero Content */}
        <div style={styles.heroContent}>
          <span style={styles.heroEstBadge}>EST. 1998</span>
          <h1 style={styles.heroTitle}>Dushyant Power Tools</h1>
          <p style={styles.heroSubtitle}>
            A trusted name in industrial tools, furniture, hardware and more –
            delivering quality, reliability and service since 1998.
          </p>
          <div style={styles.heroActions}>
            <button
              style={styles.heroBtnPrimary}
              onClick={() => scrollContainer(verticalsRef, "right", 400)}
            >
              Explore Our Businesses
            </button>
            <Link to="/products" style={styles.heroBtnSecondary}>
              View Our Products
            </Link>
          </div>
        </div>
      </div>

      {/* ── STATS HIGHLIGHTS BAR ── */}
      <div style={styles.statsBar}>
        <div style={styles.statsInner}>
          {[
            { num: "25+", desc: "Years Experience" },
            { num: "10,000+", desc: "Happy Customers" },
            { num: "500+", desc: "Products Available" },
            { num: "40+", desc: "Brands Associated" },
            { num: "PAN India", desc: "Supply Network" },
            { num: "4.9/5", desc: "Customer Rating" },
          ].map((stat, i) => (
            <div key={i} style={styles.statItem}>
              <div style={styles.statNum}>{stat.num}</div>
              <div style={styles.statDesc}>{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── EXPLORE OUR BUSINESS VERTICALS ── */}
      <div style={styles.sectionContainer}>
        <div style={styles.sectionHeader}>
          <div style={{ textAlign: "center", width: "100%" }}>
            <span style={styles.sectionEyebrow}>OUR BUSINESSES</span>
            <h2 style={styles.sectionTitle}>Explore Our Business Verticals</h2>
            <p style={styles.sectionSub}>
              Multiple businesses, One vision – Quality & Trust.
            </p>
          </div>
          {/* Slider buttons */}
          <div style={styles.sliderControls}>
            <button
              style={styles.arrowBtn}
              onClick={() => scrollContainer(verticalsRef, "left")}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              style={styles.arrowBtn}
              onClick={() => scrollContainer(verticalsRef, "right")}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Horizontal scroll of Verticals */}
        <div style={styles.scrollWrapper} ref={verticalsRef}>
          {BUSINESS_VERTICALS.map((vertical, i) => {
            const Icon = vertical.icon;
            return (
              <div key={vertical.id} style={styles.verticalCard}>
                <div style={styles.verticalLogoBox}>
                  {vertical.id === "nch" ? (
                    <div style={styles.verticalNchLogo}>
                      <span
                        style={{
                          fontWeight: 900,
                          color: "#dc2626",
                          fontSize: "14px",
                        }}
                      >
                        NCH
                      </span>
                    </div>
                  ) : (
                    <div
                      style={{
                        ...styles.verticalGenericLogo,
                        background: `${vertical.color}15`,
                        color: vertical.color,
                      }}
                    >
                      {vertical.logo}
                    </div>
                  )}
                </div>
                <h3 style={styles.verticalName}>{vertical.name}</h3>
                <p style={styles.verticalTagline}>{vertical.tagline}</p>
                <div style={styles.verticalStatsRow}>
                  {vertical.stats.products && (
                    <div>
                      <div style={styles.verticalStatVal}>
                        {vertical.stats.products}
                      </div>
                      <div style={styles.verticalStatLabel}>Products</div>
                    </div>
                  )}
                  {vertical.stats.services && (
                    <div>
                      <div style={styles.verticalStatVal}>
                        {vertical.stats.services}
                      </div>
                      <div style={styles.verticalStatLabel}>Services</div>
                    </div>
                  )}
                  {vertical.stats.instruments && (
                    <div>
                      <div style={styles.verticalStatVal}>
                        {vertical.stats.instruments}
                      </div>
                      <div style={styles.verticalStatLabel}>Instruments</div>
                    </div>
                  )}
                  <div>
                    <div style={styles.verticalStatVal}>
                      {vertical.stats.years}
                    </div>
                    <div style={styles.verticalStatLabel}>Years</div>
                  </div>
                </div>
                <Link
                  to="/products"
                  style={{ ...styles.verticalLink, color: vertical.color }}
                >
                  Explore More{" "}
                  <ArrowRight size={14} style={{ marginLeft: "4px" }} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── ABOUT DUSHYANT POWER TOOLS (SPLIT SECTION) ── */}
      <div style={styles.aboutSplitSection}>
        <div style={styles.aboutSplitGrid}>
          {/* Left: Store Interior Image */}
          <div style={styles.aboutLeftImgCol}>
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=60"
              alt="Store Interior"
              style={styles.aboutStoreImg}
            />
          </div>

          {/* Right: Text and Bullet Points */}
          <div style={styles.aboutRightTextCol}>
            <span style={styles.aboutSmallEyebrow}>ABOUT US</span>
            <h2 style={styles.aboutMainHeading}>About Dushyant Power Tools</h2>
            <p style={styles.aboutParagraph}>
              Established in 1998, Dushyant Power Tools has grown to become a
              leading wholesaler and retailer of industrial tools, hardware, and
              machinery. We are committed to providing authentic products,
              competitive prices and unmatched after-sales service.
            </p>

            {/* Bullet points with orange check circles */}
            <div style={styles.bulletsGrid}>
              {[
                "Quality Products",
                "Competitive Prices",
                "Genuine Brands",
                "After Sales Support",
                "GST Billing",
              ].map((bullet, i) => (
                <div key={i} style={styles.bulletItem}>
                  <div style={styles.bulletCheckIcon}>
                    <CheckCircle2 size={14} color="#ff6700" fill="#fffefd" />
                  </div>
                  <span style={styles.bulletText}>{bullet}</span>
                </div>
              ))}
            </div>

            <button style={styles.knowMoreBtn}>Know More About Us</button>
          </div>
        </div>
      </div>

      {/* ── PRODUCT CATEGORIES WE OFFER ── */}
      <div style={styles.categoriesSection}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span style={styles.sectionEyebrow}>PRODUCT CATEGORIES</span>
          <h2 style={styles.sectionTitle}>Wide Range of Products We Offer</h2>
        </div>

        <div style={styles.categoriesGrid}>
          {OFFERED_CATEGORIES.map((cat, i) => {
            const CatIcon = cat.icon;
            return (
              <div key={i} style={styles.categoryCard}>
                <div style={styles.categoryIconBox}>
                  <CatIcon size={24} color="#ff6700" />
                </div>
                <h4 style={styles.categoryCardTitle}>{cat.name}</h4>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── TRUSTED BRAND PARTNERS ── */}
      <div style={styles.partnersSection}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <span style={styles.sectionEyebrow}>TOP BRANDS</span>
          <h2 style={styles.sectionTitle}>Our Trusted Brand Partners</h2>
        </div>

        <div style={styles.sliderControlsOuter}>
          <div style={styles.sliderControls}>
            <button
              style={styles.arrowBtn}
              onClick={() => scrollContainer(brandsSliderRef, "left")}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              style={styles.arrowBtn}
              onClick={() => scrollContainer(brandsSliderRef, "right")}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div style={styles.brandsBarScroll} ref={brandsSliderRef}>
          {brands.map((b, idx) => (
            <div key={idx} style={styles.brandLogoCard}>
              {b.name === "NCH" ? (
                <div style={styles.miniNchLogo}>
                  <div style={styles.miniNchBorder}>
                    <span
                      style={{
                        fontWeight: 900,
                        color: "#dc2626",
                        fontSize: "12px",
                      }}
                    >
                      NCH
                    </span>
                  </div>
                </div>
              ) : b.logo ? (
                <img src={b.logo} alt={b.name} style={styles.brandLogoImg} />
              ) : (
                <span style={{ fontWeight: 700 }}>{b.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── STORE GALLERY ── */}
      <div style={styles.sectionContainer}>
        <div style={styles.sectionHeader}>
          <div style={{ textAlign: "center", width: "100%" }}>
            <span style={styles.sectionEyebrow}>OUR STORE GALLERY</span>
            <h2 style={styles.sectionTitle}>Glimpse of Our Store & Work</h2>
          </div>
          <div style={styles.sliderControls}>
            <button
              style={styles.arrowBtn}
              onClick={() => scrollContainer(galleryRef, "left")}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              style={styles.arrowBtn}
              onClick={() => scrollContainer(galleryRef, "right")}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div style={styles.scrollWrapper} ref={galleryRef}>
          {GALLERY_IMAGES.map((img, i) => (
            <div key={i} style={styles.galleryCard}>
              <img src={img.url} alt={img.title} style={styles.galleryImg} />
              <div style={styles.galleryCardTitleOverlay}>{img.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TRUST BADGES BAR ── */}
      <div style={styles.trustBadgesBar}>
        <div style={styles.trustBadgesInner}>
          {[
            { title: "100% Genuine Products", icon: Shield },
            { title: "Trusted Since 1998", icon: Award },
            { title: "Fast & Safe Delivery", icon: Truck },
            { title: "Wide Product Range", icon: Compass },
            { title: "Expert Guidance & Support", icon: HelpCircle },
            { title: "Easy Returns & Warranty", icon: CheckCircle2 },
          ].map((badge, i) => {
            const BadgeIcon = badge.icon;
            return (
              <div key={i} style={styles.trustBadgeItem}>
                <div style={styles.trustBadgeIconBox}>
                  <BadgeIcon size={18} color="#ff6700" />
                </div>
                <span style={styles.trustBadgeLabel}>{badge.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;

export const BusinessPage = () => {
  return (
    <div className="pt-16">
      <Outlet />
    </div>
  );
};

export const BusinessDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const business = BUSINESS_VERTICALS.find((b) => b.id === id);

  if (!business) {
    return (
      <div className="bd-not-found">
        <h2>Business Vertical Not Found</h2>
        <button onClick={() => navigate("/about")}>Go Back to About</button>
      </div>
    );
  }

  const { name, tagline, stats, color, logo } = business;
  const BusinessIcon = business.icon;

  return (
    <div className="business-detail">
      <button className="bd-back-btn" onClick={() => navigate("/about")}>
        <ChevronLeft size={16} /> Back to About Us
      </button>

      <div
        className="bd-hero"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=60')`,
        }}
      >
        <div className="bd-hero-overlay"></div>
        <div className="bd-hero-content">
          <div className="bd-hero-logo" style={{ borderColor: color }}>
            {logo}
          </div>
          <h1 className="bd-hero-title">{name}</h1>
          <p className="bd-hero-tagline">{tagline}</p>
          <div className="bd-hero-stats">
            {Object.entries(stats).map(([key, value]) => (
              <div className="bd-stat-badge" key={key}>
                <span className="bd-stat-num">{value}</span>
                <span className="bd-stat-label">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bd-main">
        <div className="bd-grid">
          <div className="bd-image-col">
            <img
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=60"
              alt={`${name} interior`}
            />
          </div>
          <div className="bd-text-col">
            <h2>Welcome to {name}</h2>
            <p className="bd-description">
              Detailed information about {name} goes here. We are dedicated to
              providing the best in class products and services in our domain.
              Our commitment to quality and customer satisfaction has been our
              hallmark for over {stats.years}.
            </p>
            <div className="bd-contact-mini">
              <div>
                <Phone size={14} /> +91 97540 15503
              </div>
              <div>
                <Mail size={14} /> dushyantpowertools@gmail.com
              </div>
            </div>
          </div>
        </div>

        <h3 className="bd-section-title">Our Brands</h3>
        <div className="brands-scroll">
          {brands.slice(0, 10).map((b, idx) => (
            <div key={idx} className="brand-card">
              {b.logo ? (
                <img
                  src={b.logo}
                  alt={b.name}
                  style={{ maxWidth: "100%", maxHeight: "40px" }}
                />
              ) : (
                <span>{b.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
