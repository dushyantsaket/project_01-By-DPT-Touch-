import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Menu,
  X,
  Phone,
  User,
  ShoppingCart,
  Search,
  LogOut,
  Mail,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";
import { useInventory } from "../context/useInventory";
import { buildInitialCatalog } from "../utils/catalog/buildCatalog";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showPolicies, setShowPolicies] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const isHomePage = location.pathname === "/";
  const isTransparent = !isScrolled && isHomePage;

  const { isLoggedIn, user, logout } = useAuth();
  const { products: inventoryProducts = [] } = useInventory() || {};
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about", dropdown: true },
    { name: "Policies", path: "/company-policies", dropdown: true },
    { name: "Products", path: "/products" },
    { name: "Cordless Tools", path: "/cordless-tools" },
    { name: "Brands", path: "/brands" },
    { name: "Videos", path: "/video-community" },
    { name: "Reviews", path: "/reviews" },
    { name: "Become Dealer", path: "/become-dealer" },
    { name: "News", path: "/latest-news" },
    { name: "Contact", path: "/contact" },
  ];

  const getLinks = () => {
    if (isAdmin) {
      return [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about", dropdown: true },
        { name: "Admin Dashboard", path: "/dashboard" },
        { name: "Products", path: "/products" },
      ];
    }
    if (isLoggedIn && user?.userType === "dealer") {
      return [
        { name: "Dealer Dashboard", path: "/dealer-dashboard" },
        { name: "About Us", path: "/about", dropdown: true },
        { name: "Products", path: "/products" },
        { name: "Orders", path: "/orders" },
      ];
    }
    if (isLoggedIn && user?.userType === "manager") {
      return [
        { name: "Manager Dashboard", path: "/manager-dashboard" },
        { name: "About Us", path: "/about", dropdown: true },
        { name: "Products", path: "/products" },
        { name: "Orders", path: "/track-order" },
      ];
    }
    if (isLoggedIn && user?.userType === "customer") {
      return [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about", dropdown: true },
        { name: "My Account", path: "/customer-dashboard" },
        { name: "My Orders", path: "/track-order" },
        { name: "Products", path: "/products" },
      ];
    }
    return quickLinks;
  };

  const links = getLinks();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsOpen(false);
      setSearchOpen(false);
      setShowSearchDropdown(false);
    }
  };

  const searchableProducts = useMemo(() => {
    const localProducts = buildInitialCatalog();
    const seen = new Set();
    return [...inventoryProducts, ...localProducts].filter((product) => {
      const key = String(
        product._id ||
          product.id ||
          product.productId ||
          product.sku ||
          product.name,
      );
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return product.name || product.title;
    });
  }, [inventoryProducts]);

  const suggestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return searchableProducts
      .map((product) => {
        const name = product.name || product.title || "";
        const brand = product.brand || "";
        const category = product.category || product.sub_category || "";
        const haystack =
          `${name} ${brand} ${category} ${product.sku || ""}`.toLowerCase();
        return {
          product,
          name,
          brand,
          category,
          image:
            product.image ||
            product.image_url ||
            product.images?.[0]?.url ||
            product.images?.[0] ||
            "",
          id: product._id || product.id || product.productId || product.sku,
          score: name.toLowerCase().startsWith(query) ? 2 : 1,
          match: haystack.includes(query),
        };
      })
      .filter((item) => item.match)
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
      .slice(0, 8);
  }, [searchQuery, searchableProducts]);

  const navbarClass = `dpt-navbar ${isTransparent ? "dpt-navbar--transparent" : "dpt-navbar--solid"}`;

  return (
    <>
      {/* ─── TOP INFO BAR ─── */}
      <div className="dpt-topbar">
        <div className="dpt-topbar__left">
          <a href="tel:+919754015503" className="dpt-topbar__item">
            <Phone size={13} /> +91 97540 15503
          </a>
          <a
            href="mailto:dushyantpowertools@gmail.com"
            className="dpt-topbar__item"
          >
            <Mail size={13} /> dushyantpowertools@gmail.com
          </a>
          <span className="dpt-topbar__item">
            <MapPin size={13} /> Sidhi, Madhya Pradesh
          </span>
        </div>
        <div className="dpt-topbar__right">
          <Link to="/about" className="dpt-topbar__link">
            About Us
          </Link>
          <span className="dpt-topbar__sep">|</span>
          <Link to="/video-community" className="dpt-topbar__link">
            video-community
          </Link>
          <span className="dpt-topbar__sep">|</span>
          <Link to="/become-dealer" className="dpt-topbar__link">
            become-dealer
          </Link>
          <span className="dpt-topbar__sep">|</span>
          <Link to="/reviews" className="dpt-topbar__link">
            reviews
          </Link>
          <span className="dpt-topbar__sep">|</span>
          <Link to="/company-policies" className="dpt-topbar__link">
            company-policies Us
          </Link>
          <span className="dpt-topbar__sep">|</span>
          <Link to="/warranty-claim" className="dpt-topbar__link">
            Warranty Claim
          </Link>
          <span className="dpt-topbar__sep">|</span>
          <Link to="/cordless-tools" className="dpt-topbar__link">
            Cordless Tools
          </Link>
          <span className="dpt-topbar__sep">|</span>
          <Link to="/latest-news" className="dpt-topbar__link">
            latest-news
          </Link>
          <span className="dpt-topbar__sep">|</span>
          <Link to="/contact" className="dpt-topbar__link">
            Contact Us
          </Link>
          <span className="dpt-topbar__sep">|</span>
          <Link
            to="/brands"
            className="dpt-topbar__link dpt-topbar__link--highlight"
          >
            Brand Collaboration
          </Link>
        </div>
      </div>

      {/* ─── MAIN NAVBAR ─── */}
      <nav className={navbarClass}>
        <div className="dpt-navbar__inner">
          {/* Logo */}
          <Link
            to="/"
            className="dpt-navbar__logo"
            onClick={() => setIsOpen(false)}
          >
            <Logo size={40} className="dpt-navbar__logo-img" />
            <div className="dpt-navbar__logo-text">
              <span className="dpt-navbar__logo-name">DUSHYANT</span>
              <span className="dpt-navbar__logo-sub">Power Tools</span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <ul className="dpt-navbar__links">
            {links.map((link) => {
              if (link.dropdown) {
                const isPolicies = link.name === "Policies";
                return (
                  <li
                    key={link.path}
                    style={{ position: "relative" }}
                    onMouseEnter={() =>
                      isPolicies ? setShowPolicies(true) : setShowAbout(true)
                    }
                    onMouseLeave={() =>
                      isPolicies ? setShowPolicies(false) : setShowAbout(false)
                    }
                  >
                    <span
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                      className={`dpt-navbar__link ${location.pathname === link.path ? "dpt-navbar__link--active" : ""}`}
                    >
                      {link.name} <ChevronDown size={12} />
                    </span>

                    {!isPolicies && showAbout && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "16px",
                          boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                          width: "300px",
                          zIndex: 2000,
                          padding: "16px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "14px",
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "10px",
                              fontWeight: "800",
                              color: "#dc2626",
                              textTransform: "uppercase",
                              letterSpacing: "0.1em",
                              marginBottom: "8px",
                            }}
                          >
                            Our Businesses
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            {[
                              {
                                name: "Vijay Power Tools",
                                desc: "Certified Industrial Tools",
                              },
                              {
                                name: "VPT Tool Touch",
                                desc: "Premium Service & Maintenance",
                              },
                              {
                                name: "DFM Mart",
                                desc: "Wholesale & Retail Department Store",
                              },
                              {
                                name: "Dushyant Furniture Mart",
                                desc: "Premium Home & Office Furniture",
                              },
                              {
                                name: "Dushyant Beat Manufacturing",
                                desc: "Advanced Acoustic Beat Solutions",
                              },
                            ].map((comp) => (
                              <Link
                                to="/about"
                                key={comp.name}
                                onClick={() => setShowAbout(false)}
                                style={{
                                  textDecoration: "none",
                                  color: "#1e293b",
                                  display: "block",
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "700",
                                  }}
                                >
                                  {comp.name}
                                </div>
                                <div
                                  style={{
                                    fontSize: "9.5px",
                                    color: "#64748b",
                                  }}
                                >
                                  {comp.desc}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div
                          style={{
                            borderTop: "1px solid #f1f5f9",
                            paddingTop: "10px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "10px",
                              fontWeight: "800",
                              color: "#64748b",
                              textTransform: "uppercase",
                              letterSpacing: "0.1em",
                              marginBottom: "8px",
                            }}
                          >
                            Follow Our Socials
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              justifyContent: "space-between",
                            }}
                          >
                            <a
                              href="https://instagram.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: "none",
                                color: "#e1306c",
                                fontSize: "11px",
                                fontWeight: "700",
                              }}
                            >
                              Instagram
                            </a>
                            <a
                              href="https://facebook.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: "none",
                                color: "#1877f2",
                                fontSize: "11px",
                                fontWeight: "700",
                              }}
                            >
                              Facebook
                            </a>
                            <a
                              href="https://youtube.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: "none",
                                color: "#ff0000",
                                fontSize: "11px",
                                fontWeight: "700",
                              }}
                            >
                              YouTube
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {isPolicies && showPolicies && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "12px",
                          boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                          width: "320px",
                          zIndex: 2000,
                          padding: "12px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                          textAlign: "left",
                          marginTop: "8px",
                        }}
                      >
                        {[
                          { name: "Privacy Policy", path: "/privacy-policy" },
                          {
                            name: "Terms & Conditions",
                            path: "/terms-and-conditions",
                          },
                          {
                            name: "Cancellation & Returns",
                            path: "/cancellation-return",
                          },
                          {
                            name: "Shipping & Delivery",
                            path: "/shipping-delivery",
                          },
                          { name: "Warranty Policy", path: "/warranty-policy" },
                          { name: "Quality Policy", path: "/quality-policy" },
                          { name: "Infrastructure", path: "/infrastructure" },
                          {
                            name: "Company Policies",
                            path: "/company-policies",
                          },
                        ].map((p) => (
                          <Link
                            key={p.path}
                            to={p.path}
                            onClick={() => setShowPolicies(false)}
                            style={{
                              padding: "8px 6px",
                              borderRadius: 6,
                              textDecoration: "none",
                              color: "#0f172a",
                              fontWeight: 600,
                            }}
                          >
                            {p.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`dpt-navbar__link ${location.pathname === link.path ? "dpt-navbar__link--active" : ""}`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop actions */}
          <div className="dpt-navbar__actions">
            {/* SEARCH FORM (Desktop) */}
            <div
              ref={searchRef}
              className="dpt-navbar__search-wrapper"
              style={{ position: "relative" }}
            >
              <form
                onSubmit={handleSearchSubmit}
                className="dpt-navbar__search-form"
              >
                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94a3b8",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchDropdown(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowSearchDropdown(searchQuery.length > 0)}
                  className="dpt-navbar__search-input"
                  aria-label="Search"
                  style={{ paddingLeft: "36px" }}
                />
                <button
                  type="submit"
                  className="dpt-navbar__search-btn"
                  aria-label="Submit search"
                >
                  Search
                </button>
              </form>

              {/* Live suggestions dropdown */}
              {showSearchDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 4px)",
                    left: 0,
                    right: 0,
                    background: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    zIndex: 1000,
                    overflow: "hidden",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  {suggestions.length > 0 ? (
                    <>
                      <div
                        style={{
                          padding: "8px 12px",
                          fontSize: "10px",
                          color: "#94a3b8",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        Suggestions
                      </div>
                      {suggestions.map((s) => (
                        <button
                          key={`${s.id}-${s.name}`}
                          onClick={() => {
                            navigate(
                              s.id
                                ? `/product/${encodeURIComponent(s.id)}`
                                : `/search?q=${encodeURIComponent(s.name)}`,
                            );
                            setSearchQuery("");
                            setShowSearchDropdown(false);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            width: "100%",
                            padding: "10px 14px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "14px",
                            textAlign: "left",
                            color: "#374151",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#f8fafc")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "none")
                          }
                        >
                          <span
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "8px",
                              background: "#f1f5f9",
                              overflow: "hidden",
                              display: "grid",
                              placeItems: "center",
                              flex: "0 0 auto",
                            }}
                          >
                            {s.image ? (
                              <img
                                src={s.image}
                                alt={s.name}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <Search size={15} color="#94a3b8" />
                            )}
                          </span>
                          <span style={{ minWidth: 0, flex: 1 }}>
                            <span
                              style={{
                                display: "block",
                                fontWeight: 700,
                                color: "#0f172a",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {s.name}
                            </span>
                            <span
                              style={{
                                display: "block",
                                fontSize: "11px",
                                color: "#64748b",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {[s.brand, s.category]
                                .filter(Boolean)
                                .join(" • ") || "Product"}
                            </span>
                          </span>
                        </button>
                      ))}
                    </>
                  ) : (
                    <div style={{ padding: "12px 14px" }}>
                      <button
                        onClick={handleSearchSubmit}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          width: "100%",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "14px",
                          color: "#374151",
                        }}
                      >
                        <Search size={14} color="#dc2626" />
                        Search for "<strong>{searchQuery}</strong>"
                      </button>
                    </div>
                  )}
                  <div
                    style={{
                      padding: "8px 12px",
                      borderTop: "1px solid #f1f5f9",
                      fontSize: "11px",
                      color: "#94a3b8",
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    Popular:{" "}
                    {["Angle Grinder", "Drill Machine", "Brush Cutter"].map(
                      (t) => (
                        <button
                          key={t}
                          onClick={() => {
                            navigate(`/search?q=${encodeURIComponent(t)}`);
                            setShowSearchDropdown(false);
                          }}
                          style={{
                            background: "#f1f5f9",
                            border: "none",
                            borderRadius: "4px",
                            padding: "2px 8px",
                            cursor: "pointer",
                            fontSize: "11px",
                            color: "#475569",
                          }}
                        >
                          {t}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="dpt-navbar__cart">
              <ShoppingCart size={18} />
              <span className="dpt-navbar__cart-badge">0</span>
            </Link>

            {/* User Auth Section */}
            {isLoggedIn || isAdmin ? (
              <div
                className="dpt-navbar__user-actions"
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <Link
                  to={
                    isAdmin
                      ? "/dashboard"
                      : user?.userType === "dealer"
                        ? "/dealer-dashboard"
                        : "/customer-dashboard"
                  }
                  className="dpt-navbar__profile"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "#333",
                    textDecoration: "none",
                    padding: "6px 10px",
                    background: "#f1f5f9",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  <User size={16} />
                  {isAdmin ? "Admin" : user?.name || "Account"}
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "#fee2e2",
                    border: "none",
                    color: "#dc2626",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            ) : (
              <div
                className="dpt-navbar__auth-links"
                style={{ display: "flex", gap: "8px" }}
              >
                <Link
                  to="/login"
                  className="dpt-navbar__portal-btn"
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <User size={13} /> Login
                </Link>
                <Link
                  to="/register"
                  className="dpt-navbar__portal-btn"
                  style={{
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Register
                </Link>
              </div>
            )}

            {/* Hamburger */}
            <button
              className="dpt-navbar__hamburger"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {isOpen && (
          <div className="dpt-navbar__drawer">
            {/* Mobile search */}
            <form
              onSubmit={handleSearchSubmit}
              className="dpt-navbar__drawer-search-form"
            >
              <Search size={16} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search power tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="dpt-navbar__drawer-search-input"
              />
              <button type="submit" className="dpt-navbar__drawer-search-btn">
                <Search size={18} />
              </button>
            </form>

            {/* Quick nav links in mobile */}
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`dpt-navbar__drawer-link ${location.pathname === link.path ? "dpt-navbar__drawer-link--active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Extra quick links for mobile (when not logged in) */}
            {!isLoggedIn && !isAdmin && (
              <div
                style={{
                  borderTop: "1px solid #f1f5f9",
                  marginTop: "8px",
                  paddingTop: "8px",
                }}
              >
                <Link
                  to="/about"
                  className="dpt-navbar__drawer-link"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/warranty-claim"
                  className="dpt-navbar__drawer-link"
                  onClick={() => setIsOpen(false)}
                >
                  Warranty Claim
                </Link>
                <Link
                  to="/cordless-tools"
                  className="dpt-navbar__drawer-link"
                  onClick={() => setIsOpen(false)}
                >
                  Cordless Tools
                </Link>
              </div>
            )}

            <div className="dpt-navbar__drawer-footer">
              {isLoggedIn || isAdmin ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="dpt-navbar__drawer-btn dpt-navbar__drawer-btn--portal"
                  style={{ background: "#dc2626" }}
                >
                  <LogOut size={15} /> Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="dpt-navbar__drawer-btn dpt-navbar__drawer-btn--portal"
                    onClick={() => setIsOpen(false)}
                  >
                    <User size={15} /> Login
                  </Link>
                  <Link
                    to="/register"
                    className="dpt-navbar__drawer-btn dpt-navbar__drawer-btn--portal"
                    style={{ background: "#dc2626", color: "#fff" }}
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
              <a
                href="tel:+919754015503"
                className="dpt-navbar__drawer-btn dpt-navbar__drawer-btn--call"
              >
                <Phone size={15} /> Call Now
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
