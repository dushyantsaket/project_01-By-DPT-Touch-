import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Tool Catalog ──────────────────────────────────────────
const toolCatalog = {
  Drills: ["JCB-DR-1000", "JCB-DR-2000", "JCB-DR-PRO"],
  "Angle Grinders": ["JCB-AG-125", "JCB-AG-230", "JCB-AG-PRO"],
  "Circular Saws": ["JCB-CS-185", "JCB-CS-210", "JCB-CS-PRO"],
  Jigsaw: ["JCB-JS-65", "JCB-JS-85"],
};

const allTools = Object.values(toolCatalog).flat();

// ─── News Data ──────────────────────────────────────────────
const newsItems = [
  {
    id: 1,
    title: "JCB Launches New DIAMONDTECH™ Range",
    date: "15 July 2026",
    excerpt:
      "JCB Tools introduces the new DIAMONDTECH™ range with advanced diamond-tipped blades for superior cutting performance.",
    fullContent:
      "JCB Tools has unveiled its latest innovation – the DIAMONDTECH™ range of diamond-tipped cutting tools. This new line features advanced technology that delivers up to 40% faster cutting and 30% longer life compared to standard blades. The range includes circular saw blades, angle grinder discs, and specialized cutting wheels for masonry, tile, and metal applications.",
    image: "https://cdn-icons-png.flaticon.com/128/10845/10845567.png",
    category: "Product Launch",
  },
  {
    id: 2,
    title: "Brushless Motors: The Future of Power Tools",
    date: "8 July 2026",
    excerpt:
      "JCB Pro Tools now feature brushless motor technology for enhanced efficiency, longer runtime, and increased power.",
    fullContent:
      "Brushless motors represent a significant leap forward in power tool technology. Unlike traditional brushed motors, brushless motors offer higher efficiency, longer runtime, increased power-to-weight ratio, and extended tool life. JCB Pro Tools now incorporate this cutting-edge technology across their entire range of cordless power tools, providing professionals with superior performance on the job site.",
    image: "https://cdn-icons-png.flaticon.com/128/15412/15412741.png",
    category: "Technology",
  },
  {
    id: 3,
    title: "Mesh Sanding Technology – A Game Changer",
    date: "1 July 2026",
    excerpt:
      "JCB introduces mesh sanding technology that delivers a superior finish with reduced dust and faster material removal.",
    fullContent:
      "Mesh sanding technology represents a breakthrough in surface preparation. The open mesh design allows dust to be extracted through the pad, resulting in a cleaner work environment and a superior finish. The mesh design also prevents clogging, extends abrasive life, and provides faster material removal compared to traditional sanding paper.",
    image: "https://cdn-icons-png.flaticon.com/128/2203/2203124.png",
    category: "Innovation",
  },
];

// ─── Support Sections ──────────────────────────────────────
const supportSections = [
  {
    id: "delivery",
    title: "Delivery & Shipping Information",
    icon: "https://cdn-icons-png.flaticon.com/128/891/891399.png",
    content:
      "We offer fast and reliable delivery across the UK. Standard delivery takes 2-3 working days. Express delivery is available for next-day shipping. All orders are tracked and insured.",
  },
  {
    id: "warranty",
    title: "Warranty & Repairs",
    icon: "https://cdn-icons-png.flaticon.com/128/15412/15412741.png",
    content:
      "All JCB Tools come with a comprehensive warranty. For repairs, please contact our service center. We offer a 12-month warranty on all power tools and a 24-month warranty on JCB DIAMONDTECH™ products.",
  },
  {
    id: "safe-handling",
    title: "Safe Handling Guides & Operations",
    icon: "https://cdn-icons-png.flaticon.com/128/10342/10342199.png",
    content:
      "Our safe handling guides cover proper usage, maintenance, and safety protocols for all JCB power tools. Download our comprehensive safety manuals for detailed operational instructions.",
  },
  {
    id: "insurance",
    title: "Loxa Insurance Activation",
    icon: "https://cdn-icons-png.flaticon.com/128/6008/6008167.png",
    content:
      "Activate your Loxa insurance coverage for peace of mind. Our insurance plans cover accidental damage, theft, and breakdowns. Activation takes just 5 minutes online.",
  },
  {
    id: "payment",
    title: "Payment Options",
    icon: "https://cdn-icons-png.flaticon.com/128/10290/10290596.png",
    content:
      "We accept all major credit cards, PayPal, and bank transfers. Trade account holders enjoy special payment terms. iwoca Pay financing options are also available for eligible customers.",
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    icon: "https://cdn-icons-png.flaticon.com/128/13191/13191289.png",
    content:
      "Your privacy matters to us. We collect only the information needed to process your orders and provide support. We never share your data with third parties without your explicit consent.",
  },
];

// ─── Main Component ─────────────────────────────────────────
const ContactPage = () => {
  // ─── State ────────────────────────────────────────────────

  // Contact Form
  const [contactForm, setContactForm] = useState({
    companyName: "",
    fullName: "",
    email: "",
    phone: "",
    helpType: "",
    message: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState("");

  // Registration – Products
  const [products, setProducts] = useState([
    {
      modelNumber: "",
      modelId: "",
      purchaseDate: "",
      purchasedFrom: "",
      serialNumber: "",
      file: null,
    },
  ]);
  const [regForm, setRegForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    trade: "",
    street: "",
    city: "",
    zip: "",
    country: "",
    state: "",
    subscribe: false,
    accountType: "new",
  });
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [regError, setRegError] = useState("");
  const navigate = useNavigate();

  const handleTradeRegister = () => {
    navigate("/register");
  };
  const [showReference, setShowReference] = useState(false);
  const [showToolModal, setShowToolModal] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  // Parts Finder
  const [selectedCategory, setSelectedCategory] = useState("Drills");
  const [partSearchTerm, setPartSearchTerm] = useState("");
  const [partRequestSent, setPartRequestSent] = useState(false);

  // News Modal
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  // Support Accordion
  const [expandedSection, setExpandedSection] = useState(null);

  // ─── Handlers ─────────────────────────────────────────────

  // Contact
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactError("");
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      if (!res.ok) throw new Error("Failed");
      setContactSubmitted(true);
      setTimeout(() => setContactSubmitted(false), 3000);
      setContactForm({
        companyName: "",
        fullName: "",
        email: "",
        phone: "",
        helpType: "",
        message: "",
      });
    } catch (err) {
      setContactError("Could not send message.");
      const existing = JSON.parse(
        localStorage.getItem("contactRequests") || "[]",
      );
      existing.push({ ...contactForm, timestamp: new Date().toISOString() });
      localStorage.setItem("contactRequests", JSON.stringify(existing));
      setContactSubmitted(true);
      setTimeout(() => setContactSubmitted(false), 3000);
    }
  };

  // Registration – Product rows
  const addProductRow = () => {
    setProducts((prev) => [
      ...prev,
      {
        modelNumber: "",
        modelId: "",
        purchaseDate: "",
        purchasedFrom: "",
        serialNumber: "",
        file: null,
      },
    ]);
  };

  const removeProductRow = (index) => {
    if (products.length === 1) return;
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const updateProduct = (index, field, value) => {
    setProducts((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    );
  };

  const handleFileChange = (index, e) => {
    if (e.target.files && e.target.files[0]) {
      updateProduct(index, "file", e.target.files[0]);
    }
  };

  // Tool modal
  const openToolModal = (index) => {
    setCurrentProductIndex(index);
    setShowToolModal(true);
  };

  const selectTool = (toolName) => {
    updateProduct(currentProductIndex, "modelNumber", toolName);
    updateProduct(currentProductIndex, "modelId", toolName);
    setShowToolModal(false);
  };

  // Reference image
  const toggleReference = () => setShowReference((prev) => !prev);

  // Registration – form fields
  const handleRegChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (regForm.accountType === "new") {
      if (regForm.password !== regForm.confirmPassword) {
        setRegError("Passwords do not match");
        return;
      }
      if (
        !regForm.firstName ||
        !regForm.lastName ||
        !regForm.email ||
        !regForm.password
      ) {
        setRegError("All fields are mandatory");
        return;
      }
    } else {
      if (!regForm.email || !regForm.password) {
        setRegError("Email and password required");
        return;
      }
    }
    setRegError("");

    const payload = {
      accountType: regForm.accountType,
      products: products.map((p) => ({
        modelNumber: p.modelNumber,
        modelId: p.modelId,
        purchaseDate: p.purchaseDate,
        purchasedFrom: p.purchasedFrom,
        serialNumber: p.serialNumber,
      })),
      firstName: regForm.firstName,
      lastName: regForm.lastName,
      email: regForm.email,
      password: regForm.password,
      trade: regForm.trade,
      street: regForm.street,
      city: regForm.city,
      zip: regForm.zip,
      country: regForm.country,
      state: regForm.state,
      subscribe: regForm.subscribe,
    };

    try {
      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        if (key === "products") {
          formData.append(key, JSON.stringify(payload[key]));
        } else {
          formData.append(key, payload[key]);
        }
      });
      products.forEach((p, idx) => {
        if (p.file) {
          formData.append(`file_${idx}`, p.file);
        }
      });

      const res = await fetch("/api/registrations", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Registration failed");
      const data = await res.json();
      console.log("Registration success:", data);
      setRegSubmitted(true);
      setTimeout(() => {
        setRegSubmitted(false);
        setProducts([
          {
            modelNumber: "",
            modelId: "",
            purchaseDate: "",
            purchasedFrom: "",
            serialNumber: "",
            file: null,
          },
        ]);
        setRegForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          trade: "",
          street: "",
          city: "",
          zip: "",
          country: "",
          state: "",
          subscribe: false,
          accountType: "new",
        });
      }, 3000);
    } catch (err) {
      console.error("Registration API error:", err);
      const existing = JSON.parse(
        localStorage.getItem("registrations") || "[]",
      );
      existing.push({ ...payload, timestamp: new Date().toISOString() });
      localStorage.setItem("registrations", JSON.stringify(existing));
      setRegSubmitted(true);
      setTimeout(() => setRegSubmitted(false), 3000);
    }
  };

  // Parts Finder
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setPartSearchTerm("");
  };

  const requestPart = async (part) => {
    try {
      const res = await fetch("/api/part-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: selectedCategory, part }),
      });
      if (!res.ok) throw new Error("Failed");
    } catch (err) {
      console.error("Part request error:", err);
      const existing = JSON.parse(localStorage.getItem("partRequests") || "[]");
      existing.push({
        category: selectedCategory,
        part,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("partRequests", JSON.stringify(existing));
    }
    setPartRequestSent(true);
    setTimeout(() => setPartRequestSent(false), 3000);
  };

  // News
  const openNews = (news) => {
    setSelectedNews(news);
    setShowNewsModal(true);
  };
  const closeNews = () => {
    setShowNewsModal(false);
    setSelectedNews(null);
  };

  // Support
  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  // ─── Render ──────────────────────────────────────────────
  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        paddingTop: "80px",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "#111",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
        }}
      >
        {/* Background images (watermark) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            backgroundImage: `url(https://www.catpowertools.com/upload/about/1764266983657846888.jpg), url(https://www.catpowertools.com/upload/about/1768262785880438031.jpg), url(https://www.catpowertools.com/upload/about/1770831062014238082.jpg), url(https://www.catpowertools.com/upload/about/1740531304824924879.jpg)`,
            backgroundSize: "contain, contain, contain, contain",
            backgroundPosition:
              "top left, top right, bottom left, bottom right",
            backgroundRepeat: "no-repeat",
            opacity: 0.06,
          }}
        />

        {/* Content container */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* ─── TOP CONTACT BAR ──────────────────────────────── */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              padding: "16px 0",
              borderBottom: "1px solid #f0f0f0",
              marginBottom: "40px",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                flexWrap: "wrap",
              }}
            >
              <a
                href="tel:01646404400"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#111",
                  textDecoration: "none",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  background: "#f8f8f8",
                  border: "1px solid transparent",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f0f0f0";
                  e.currentTarget.style.borderColor = "#ddd";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f8f8f8";
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10845/10845567.png"
                  alt="phone"
                  style={{ width: "20px", height: "20px" }}
                />{" "}
                9244526432
              </a>
              <a
                href="vpttoolstouch@gmail.com"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#111",
                  textDecoration: "none",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  background: "#f8f8f8",
                  border: "1px solid transparent",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f0f0f0";
                  e.currentTarget.style.borderColor = "#ddd";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f8f8f8";
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/8898/8898833.png"
                  alt="email"
                  style={{ width: "20px", height: "20px" }}
                />{" "}
                vpttoolstouch@gmail.com
              </a>
            </div>
            <div style={{ fontSize: "13px", color: "#888" }}>
              Mon–Fri 8:00 – 17:30 · Sat 9:00 – 13:00
            </div>
          </div>
          {/* ─── HERO ────────────────────────────────────────── */}
          <div
            style={{
              textAlign: "center",
              padding: "32px 20px 48px",
              marginBottom: "48px",
              borderRadius: "20px",
              background: "#fafafa",
              border: "1px solid #f0f0f0",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#f0f0f0",
                color: "#111",
                padding: "6px 18px 6px 14px",
                borderRadius: "100px",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "18px",
                border: "1px solid #e0e0e0",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#111",
                  animation: "pulseDot 2s ease-in-out infinite",
                }}
              ></span>{" "}
              We're here to help
            </div>
            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 900,
                color: "#111",
                textTransform: "uppercase",
                letterSpacing: "-0.03em",
                marginBottom: "12px",
              }}
            >
              Contact{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #111, #444, #111)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmerText 4s ease-in-out infinite",
                }}
              >
                Us
              </span>
            </h1>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "#666",
                maxWidth: "620px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Have questions about our power tools, spare parts, or need
              tactical support? Reach out to our expert team today.
            </p>
          </div>
          {/* ─── TWO‑COLUMN: CONTACT FORM + INFO ──────────────── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "48px",
              marginBottom: "64px",
            }}
          >
            {/* Contact Form */}
            <div
              style={{
                background: "#fff",
                padding: "28px 32px",
                borderRadius: "16px",
                border: "1px solid #e8e8e8",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                marginBottom: "0",
              }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#111",
                  marginBottom: "6px",
                }}
              >
                Send us a message
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "#888",
                  marginBottom: "20px",
                }}
              >
                Fill in the form and we'll get back to you within 24 hours.
              </p>
              <form onSubmit={handleContactSubmit}>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#333",
                      marginBottom: "4px",
                    }}
                  >
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={contactForm.companyName}
                    onChange={handleContactChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: "14px",
                      border: "1.5px solid #e0e0e0",
                      borderRadius: "8px",
                      background: "#fafafa",
                      color: "#111",
                      outline: "none",
                    }}
                    required
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#333",
                      marginBottom: "4px",
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={contactForm.fullName}
                    onChange={handleContactChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: "14px",
                      border: "1.5px solid #e0e0e0",
                      borderRadius: "8px",
                      background: "#fafafa",
                      color: "#111",
                      outline: "none",
                    }}
                    required
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#333",
                      marginBottom: "4px",
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: "14px",
                      border: "1.5px solid #e0e0e0",
                      borderRadius: "8px",
                      background: "#fafafa",
                      color: "#111",
                      outline: "none",
                    }}
                    required
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#333",
                      marginBottom: "4px",
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: "14px",
                      border: "1.5px solid #e0e0e0",
                      borderRadius: "8px",
                      background: "#fafafa",
                      color: "#111",
                      outline: "none",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#333",
                      marginBottom: "4px",
                    }}
                  >
                    How can we help? *
                  </label>
                  <select
                    name="helpType"
                    value={contactForm.helpType}
                    onChange={handleContactChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: "14px",
                      border: "1.5px solid #e0e0e0",
                      borderRadius: "8px",
                      background: "#fafafa",
                      color: "#111",
                      outline: "none",
                      appearance: "none",
                      cursor: "pointer",
                    }}
                    required
                  >
                    <option value="">Select an option...</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="warranty">Warranty & Repairs</option>
                    <option value="spare-parts">Spare Parts</option>
                    <option value="trade">Trade / Reseller</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#333",
                      marginBottom: "4px",
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: "14px",
                      border: "1.5px solid #e0e0e0",
                      borderRadius: "8px",
                      background: "#fafafa",
                      color: "#111",
                      outline: "none",
                      resize: "vertical",
                      minHeight: "80px",
                    }}
                    required
                  />
                </div>
                {contactError && (
                  <div
                    style={{
                      color: "#cc0000",
                      fontSize: "13px",
                      marginTop: "6px",
                    }}
                  >
                    {contactError}
                  </div>
                )}
                <button
                  type="submit"
                  style={{
                    padding: "12px 28px",
                    background: "#111",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#333";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#111";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Send Message →
                </button>
                {contactSubmitted && (
                  <div
                    style={{
                      background: "#f0faf0",
                      color: "#1a7a1a",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: 600,
                      textAlign: "center",
                      border: "1px solid #b8e0b8",
                      marginTop: "12px",
                    }}
                  >
                    ✅ Thank you! We'll get back to you within 24 hours.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info Side */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div
                style={{
                  background: "#fafafa",
                  padding: "24px 28px",
                  borderRadius: "16px",
                  border: "1px solid #e8e8e8",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f5f5f5";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fafafa";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#111",
                    marginBottom: "4px",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/10845/10845567.png"
                    alt="phone"
                    style={{ width: "24px", height: "24px" }}
                  />{" "}
                  Call Us
                </div>
                <div
                  style={{ fontSize: "14px", color: "#555", lineHeight: 1.6 }}
                >
                  <a
                    href="tel:01646404400"
                    style={{
                      color: "#111",
                      textDecoration: "none",
                      fontWeight: 600,
                      borderBottom: "2px solid #ddd",
                      transition: "border-color 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#111";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#ddd";
                    }}
                  >
                    9244526432
                  </a>
                  <br />
                  <span style={{ fontSize: "13px", color: "#999" }}>
                    Mon–Fri 8:00–17:30 · Sat 9:00–13:00
                  </span>
                </div>
              </div>
              <div
                style={{
                  background: "#fafafa",
                  padding: "24px 28px",
                  borderRadius: "16px",
                  border: "1px solid #e8e8e8",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f5f5f5";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fafafa";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#111",
                    marginBottom: "4px",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/8898/8898833.png"
                    alt="email"
                    style={{ width: "24px", height: "24px" }}
                  />{" "}
                  Email Us
                </div>
                <div
                  style={{ fontSize: "14px", color: "#555", lineHeight: 1.6 }}
                >
                  <a
                    href="vpttoolstouch@gmail.com"
                    style={{
                      color: "#111",
                      textDecoration: "none",
                      fontWeight: 600,
                      borderBottom: "2px solid #ddd",
                      transition: "border-color 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#111";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#ddd";
                    }}
                  >
                    vpttoolstouch@gmail.com
                  </a>
                  <br />
                  <a
                    href="mailto:support@jcb-tools.co.uk"
                    style={{
                      color: "#666",
                      textDecoration: "none",
                      fontWeight: 600,
                      borderBottom: "2px solid #ddd",
                      fontSize: "13px",
                      transition: "border-color 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#111";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#ddd";
                    }}
                  >
                    support@jcb-tools.co.uk
                  </a>
                </div>
              </div>
              <div
                style={{
                  background: "#fafafa",
                  padding: "24px 28px",
                  borderRadius: "16px",
                  border: "1px solid #e8e8e8",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f5f5f5";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fafafa";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#111",
                    marginBottom: "4px",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/11525/11525509.png"
                    alt="location"
                    style={{ width: "24px", height: "24px" }}
                  />{" "}
                  Visit Us
                </div>
                <div
                  style={{ fontSize: "14px", color: "#555", lineHeight: 1.6 }}
                >
                  <strong>VPT TOOLS TOUCH Ltd</strong>
                  <br />
                  Gopal Das Rd, Sidhi, Jamodi, New Bus Stand Sidhi
                  <br />
                  <br />
                  Madhya Pradesh 486661
                </div>
              </div>
              <div
                style={{
                  background: "#fafafa",
                  padding: "24px 28px",
                  borderRadius: "16px",
                  border: "1px solid #e8e8e8",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f5f5f5";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fafafa";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#111",
                    marginBottom: "4px",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/19013/19013080.png"
                    alt="trade"
                    style={{ width: "24px", height: "24px" }}
                  />{" "}
                  Trade Account
                </div>
                <div
                  style={{ fontSize: "14px", color: "#555", lineHeight: 1.6 }}
                >
                  <p style={{ marginBottom: "8px" }}>
                    Apply for a trade account to access exclusive pricing, bulk
                    discounts, and special payment terms.
                  </p>

                  <button
                    type="button"
                    onClick={handleTradeRegister}
                    style={{
                      padding: "12px 28px",
                      margin: "0 auto",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      background: "#111",
                      color: "#fff",
                    }}
                  >
                    Register as a Trade Partner →
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* ─── REGISTRATION SECTION ──────────────────────────── */}
          <div
            style={{
              background: "#fff",
              padding: "28px 32px",
              borderRadius: "16px",
              border: "1px solid #e8e8e8",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              marginBottom: "40px",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#111" }}>
                BENEFITS OF REGISTRATION
              </h3>
              <p style={{ fontSize: "14px", color: "#555", marginTop: "4px" }}>
                Efficient Product support and Our customer service team can
                quickly identify you for product support
              </p>
            </div>

            {/* ADD YOUR PRODUCT INFORMATION */}
            <div style={{ marginBottom: "30px" }}>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#111",
                  marginBottom: "12px",
                }}
              >
                ADD YOUR PRODUCT INFORMATION
              </h3>
              <form onSubmit={handleRegSubmit}>
                {products.map((product, idx) => (
                  <div
                    key={idx}
                    style={{
                      borderBottom:
                        idx < products.length - 1 ? "1px solid #eee" : "none",
                      paddingBottom: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(200px, 1fr))",
                        gap: "12px",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#333",
                            marginBottom: "4px",
                          }}
                        >
                          Model Number:
                        </p>
                        <div style={{ display: "flex", gap: "4px" }}>
                          <input
                            type="text"
                            value={product.modelNumber}
                            readOnly
                            style={{
                              flex: 1,
                              padding: "8px 10px",
                              border: "1px solid #ddd",
                              borderRadius: "6px",
                              background: "#f5f5f5",
                              fontSize: "13px",
                            }}
                          />
                          <input type="hidden" value={product.modelId} />
                          <button
                            type="button"
                            onClick={() => openToolModal(idx)}
                            style={{
                              padding: "6px 12px",
                              background: "#111",
                              color: "#fff",
                              border: "none",
                              borderRadius: "6px",
                              fontSize: "11px",
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            SELECT TOOLS
                          </button>
                          {products.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeProductRow(idx)}
                              style={{
                                padding: "6px 10px",
                                background: "#dc2626",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "11px",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#333",
                            marginBottom: "4px",
                          }}
                        >
                          Date of Purchase:
                        </p>
                        <input
                          type="date"
                          value={product.purchaseDate}
                          onChange={(e) =>
                            updateProduct(idx, "purchaseDate", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "8px 10px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            background: "#fff",
                            fontSize: "13px",
                          }}
                        />
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#333",
                            marginBottom: "4px",
                          }}
                        >
                          Purchased from:
                        </p>
                        <input
                          type="text"
                          value={product.purchasedFrom}
                          onChange={(e) =>
                            updateProduct(idx, "purchasedFrom", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "8px 10px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            background: "#fff",
                            fontSize: "13px",
                          }}
                        />
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#333",
                            marginBottom: "4px",
                          }}
                        >
                          Serial Number:
                        </p>
                        <input
                          type="text"
                          value={product.serialNumber}
                          onChange={(e) =>
                            updateProduct(idx, "serialNumber", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "8px 10px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            background: "#fff",
                            fontSize: "13px",
                          }}
                        />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#333",
                            marginBottom: "4px",
                          }}
                        >
                          Product label:
                        </p>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <button
                              type="button"
                              style={{
                                padding: "6px 16px",
                                background: "#f0f0f0",
                                border: "1px solid #ddd",
                                borderRadius: "6px",
                                fontSize: "12px",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              UPLOAD
                            </button>
                            <input
                              type="file"
                              accept="image/jpeg,image/png"
                              onChange={(e) => handleFileChange(idx, e)}
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                width: "100%",
                                height: "100%",
                                opacity: 0,
                                cursor: "pointer",
                              }}
                            />
                          </div>
                          {product.file && (
                            <span
                              style={{ fontSize: "12px", color: "#1a7a1a" }}
                            >
                              {product.file.name}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={toggleReference}
                            style={{
                              padding: "6px 16px",
                              background: "#f0f0f0",
                              border: "1px solid #ddd",
                              borderRadius: "6px",
                              fontSize: "12px",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            REFERENCE
                          </button>
                          {showReference && (
                            <div style={{ marginLeft: "8px" }}>
                              <img
                                src="https://www.catpowertools.com/upload/about/1764266983657846888.jpg"
                                alt="reference"
                                style={{
                                  width: "100px",
                                  height: "auto",
                                  border: "1px solid #ddd",
                                  borderRadius: "4px",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                  <button
                    type="submit"
                    style={{
                      padding: "10px 24px",
                      background: "#111",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    SUBMIT
                  </button>
                  <button
                    type="button"
                    onClick={addProductRow}
                    style={{
                      padding: "10px 24px",
                      background: "#f0f0f0",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    ADD ANOTHER TOOL
                  </button>
                </div>
              </form>
            </div>

            {/* CONTACT INFORMATION */}
            <div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#111",
                  marginBottom: "12px",
                }}
              >
                CONTACT INFORMATION
              </h3>
              <div
                style={{ display: "flex", gap: "12px", marginBottom: "16px" }}
              >
                <button
                  onClick={() =>
                    setRegForm((prev) => ({ ...prev, accountType: "new" }))
                  }
                  style={{
                    padding: "8px 20px",
                    border: "1.5px solid #e0e0e0",
                    borderRadius: "6px",
                    background: regForm.accountType === "new" ? "#111" : "#fff",
                    color: regForm.accountType === "new" ? "#fff" : "#666",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Create new account
                </button>
                <button
                  onClick={() =>
                    setRegForm((prev) => ({ ...prev, accountType: "existing" }))
                  }
                  style={{
                    padding: "8px 20px",
                    border: "1.5px solid #e0e0e0",
                    borderRadius: "6px",
                    background:
                      regForm.accountType === "existing" ? "#111" : "#fff",
                    color: regForm.accountType === "existing" ? "#fff" : "#666",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  I have an account
                </button>
              </div>

              {regForm.accountType === "new" ? (
                <form onSubmit={handleRegSubmit}>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#999",
                      marginBottom: "12px",
                    }}
                  >
                    NOTE: All fields are mandatory
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        First name:
                      </p>
                      <input
                        type="text"
                        name="firstName"
                        value={regForm.firstName}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Last name:
                      </p>
                      <input
                        type="text"
                        name="lastName"
                        value={regForm.lastName}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Email Address:
                      </p>
                      <input
                        type="email"
                        name="email"
                        value={regForm.email}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Password:
                      </p>
                      <input
                        type="password"
                        name="password"
                        value={regForm.password}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Confirm Password:
                      </p>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={regForm.confirmPassword}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Trade/Occupation:
                      </p>
                      <input
                        type="text"
                        name="trade"
                        value={regForm.trade}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Street Address:
                      </p>
                      <input
                        type="text"
                        name="street"
                        value={regForm.street}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        City:
                      </p>
                      <input
                        type="text"
                        name="city"
                        value={regForm.city}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Zip / Postal Code:
                      </p>
                      <input
                        type="text"
                        name="zip"
                        value={regForm.zip}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Country:
                      </p>
                      <input
                        type="text"
                        name="country"
                        value={regForm.country}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        State/Province/Territory:
                      </p>
                      <input
                        type="text"
                        name="state"
                        value={regForm.state}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "16px" }}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#333",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        name="subscribe"
                        checked={regForm.subscribe}
                        onChange={handleRegChange}
                      />
                      I WOULD LIKE TO RECEIVE INFORMATION ABOUT CAT® PRODUCTS
                      AND PROMOTIONS BY EMAIL
                    </label>
                  </div>
                  <div style={{ marginTop: "16px" }}>
                    <button
                      type="submit"
                      style={{
                        padding: "10px 32px",
                        background: "#111",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Register
                    </button>
                  </div>
                  {regError && (
                    <div
                      style={{
                        color: "#cc0000",
                        fontSize: "13px",
                        marginTop: "8px",
                      }}
                    >
                      {regError}
                    </div>
                  )}
                  {regSubmitted && (
                    <div
                      style={{
                        background: "#f0faf0",
                        color: "#1a7a1a",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: 600,
                        textAlign: "center",
                        border: "1px solid #b8e0b8",
                        marginTop: "12px",
                      }}
                    >
                      ✅ Registration submitted! We'll process your request and
                      notify the admin.
                    </div>
                  )}
                </form>
              ) : (
                <form onSubmit={handleRegSubmit}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Email Address:
                      </p>
                      <input
                        type="email"
                        name="email"
                        value={regForm.email}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        placeholder="Email Address"
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Password:
                      </p>
                      <input
                        type="password"
                        name="password"
                        value={regForm.password}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        placeholder="Password"
                        required
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "16px" }}>
                    <button
                      type="submit"
                      style={{
                        padding: "10px 32px",
                        background: "#111",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      LOG IN
                    </button>
                  </div>
                  {regError && (
                    <div
                      style={{
                        color: "#cc0000",
                        fontSize: "13px",
                        marginTop: "8px",
                      }}
                    >
                      {regError}
                    </div>
                  )}
                  {regSubmitted && (
                    <div
                      style={{
                        background: "#f0faf0",
                        color: "#1a7a1a",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: 600,
                        textAlign: "center",
                        border: "1px solid #b8e0b8",
                        marginTop: "12px",
                      }}
                    >
                      ✅ Login successful! Redirecting...
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
          {/* ─── PARTS FINDER ──────────────────────────────────── */}
          <div
            style={{
              background: "#fff",
              padding: "28px 32px",
              borderRadius: "16px",
              border: "1px solid #e8e8e8",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              marginBottom: "40px",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#111",
                marginBottom: "6px",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/13191/13191289.png"
                alt="parts"
                style={{
                  width: "28px",
                  height: "28px",
                  marginRight: "10px",
                  verticalAlign: "middle",
                }}
              />
              Parts Finder
            </h2>
            <p
              style={{ fontSize: "14px", color: "#888", marginBottom: "20px" }}
            >
              Select your product category and find the exact part you need.
              Request it and our team will assist.
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                marginBottom: "16px",
              }}
            >
              <div style={{ flex: 1, minWidth: "200px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#333",
                    marginBottom: "4px",
                  }}
                >
                  Choose Product Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    fontSize: "14px",
                    border: "1.5px solid #e0e0e0",
                    borderRadius: "8px",
                    background: "#fafafa",
                    color: "#111",
                    outline: "none",
                    appearance: "none",
                    cursor: "pointer",
                  }}
                >
                  {Object.keys(toolCatalog).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 2, minWidth: "200px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#333",
                    marginBottom: "4px",
                  }}
                >
                  Search Parts
                </label>
                <input
                  type="text"
                  placeholder="Search by name, description, or ID"
                  value={partSearchTerm}
                  onChange={(e) => setPartSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    fontSize: "14px",
                    border: "1.5px solid #e0e0e0",
                    borderRadius: "8px",
                    background: "#fafafa",
                    color: "#111",
                    outline: "none",
                  }}
                />
              </div>
            </div>
            <div>
              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "10px",
                }}
              >
                Available Parts for {selectedCategory}
              </h4>
              {toolCatalog[selectedCategory]?.map((part) => (
                <div
                  key={part}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    borderBottom: "1px solid #f0f0f0",
                    fontSize: "14px",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: "#111" }}>{part}</div>
                    <div style={{ color: "#666", fontSize: "13px" }}>
                      Part ID: {part.replace(/\s/g, "-")}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      requestPart({ name: part, id: part.replace(/\s/g, "-") })
                    }
                    style={{
                      background: "none",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      padding: "4px 12px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      color: "#111",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#111";
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.borderColor = "#111";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "none";
                      e.currentTarget.style.color = "#111";
                      e.currentTarget.style.borderColor = "#ddd";
                    }}
                  >
                    Request this part
                  </button>
                </div>
              ))}
            </div>
            {partRequestSent && (
              <div
                style={{
                  background: "#f0faf0",
                  color: "#1a7a1a",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textAlign: "center",
                  border: "1px solid #b8e0b8",
                  marginTop: "12px",
                }}
              >
                ✅ Your part request has been sent to our support team.
              </div>
            )}
          </div>
          {/* ─── SUPPORT SECTIONS ────────────────────────────── */}
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#111",
              marginBottom: "18px",
            }}
          >
            Support & Information
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "16px",
              marginBottom: "56px",
            }}
          >
            {supportSections.map((section) => (
              <div
                key={section.id}
                style={{
                  background: "#fafafa",
                  border: "1px solid #e8e8e8",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ccc";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e8e8e8";
                  e.currentTarget.style.boxShadow = "none";
                }}
                onClick={() => toggleSection(section.id)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 20px",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#111",
                    background: "#fff",
                    borderBottom: "1px solid #e8e8e8",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={section.icon}
                      alt=""
                      style={{ width: "24px", height: "24px" }}
                    />{" "}
                    {section.title}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#999",
                      transition: "transform 0.3s ease",
                      transform:
                        expandedSection === section.id
                          ? "rotate(180deg)"
                          : "rotate(0)",
                    }}
                  >
                    ▼
                  </span>
                </div>
                <div
                  style={{
                    padding:
                      expandedSection === section.id
                        ? "16px 20px 20px"
                        : "0 20px",
                    maxHeight: expandedSection === section.id ? "300px" : "0",
                    overflow: "hidden",
                    transition: "all 0.4s ease",
                    color: "#555",
                    fontSize: "14px",
                    lineHeight: 1.7,
                  }}
                >
                  {section.content}
                </div>
              </div>
            ))}
          </div>
          {/* ─── NEWS SECTION ──────────────────────────────────── */}
          <div style={{ marginBottom: "56px" }}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#111",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/2203/2203124.png"
                alt="news"
                style={{ width: "28px", height: "28px" }}
              />
              Latest News
              <span
                style={{ fontSize: "13px", fontWeight: 500, color: "#999" }}
              >
                Click any card to read more
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {newsItems.map((news) => (
                <div
                  key={news.id}
                  style={{
                    background: "#fafafa",
                    border: "1px solid #e8e8e8",
                    borderRadius: "12px",
                    padding: "22px 24px",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#111";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e8e8e8";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  onClick={() => openNews(news)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "8px",
                    }}
                  >
                    <img
                      src={news.image}
                      alt=""
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#999",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {news.date}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#dc2626",
                        }}
                      >
                        {news.category}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#111",
                      marginBottom: "8px",
                    }}
                  >
                    {news.title}
                  </div>
                  <div
                    style={{ fontSize: "14px", color: "#666", lineHeight: 1.5 }}
                  >
                    {news.excerpt}
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#111",
                      borderBottom: "2px solid #ddd",
                      transition: "border-color 0.25s ease",
                    }}
                  >
                    Read more →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── TOOL SELECT MODAL ──────────────────────────────── */}
      {showToolModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "32px",
              borderRadius: "16px",
              maxWidth: "500px",
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 800,
                marginBottom: "16px",
              }}
            >
              Select a Tool
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {allTools.map((tool) => (
                <button
                  key={tool}
                  onClick={() => selectTool(tool)}
                  style={{
                    padding: "10px 16px",
                    background: "#f0f0f0",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 500,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#e0e0e0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#f0f0f0")
                  }
                >
                  {tool}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowToolModal(false)}
              style={{
                marginTop: "16px",
                padding: "8px 20px",
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ─── NEWS MODAL ────────────────────────────────────── */}
      {showNewsModal && selectedNews && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "24px",
            animation: "fadeIn 0.3s ease",
          }}
          onClick={closeNews}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              maxWidth: "640px",
              width: "100%",
              padding: "40px",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
              animation: "slideUp 0.35s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                float: "right",
                background: "none",
                border: "none",
                fontSize: "24px",
                color: "#999",
                cursor: "pointer",
                padding: "4px 8px",
                transition: "color 0.25s ease",
              }}
              onClick={closeNews}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
            >
              ✕
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <img
                src={selectedNews.image}
                alt=""
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />
              <div>
                <div
                  style={{ fontSize: "26px", fontWeight: 800, color: "#111" }}
                >
                  {selectedNews.title}
                </div>
                <div style={{ fontSize: "13px", color: "#999" }}>
                  {selectedNews.date} · {selectedNews.category}
                </div>
              </div>
            </div>
            <div style={{ fontSize: "15px", color: "#444", lineHeight: 1.8 }}>
              {selectedNews.fullContent}
            </div>
            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <button
                onClick={closeNews}
                style={{
                  padding: "10px 28px",
                  background: "#111",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#333";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#111";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Global Keyframes ──────────────────────────────── */}
      <style>{`
        @keyframes shimmerText { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes pulseDot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.7); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @media (max-width: 768px) { .two-col { grid-template-columns: 1fr !important; gap: 24px !important; } }
      `}</style>
    </div>
  );
};

export default ContactPage;
