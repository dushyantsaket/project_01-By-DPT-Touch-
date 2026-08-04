import React, { useState } from "react";
import {
  ShieldCheck,
  IndianRupee,
  Wrench,
  Users,
  HeadphonesIcon,
  X,
  ChevronRight,
  Home,
  CheckCircle,
  Star,
  Image,
  Video,
  FileText,
  MessageCircle,
  Award,
  HelpCircle,
  Package,
  ArrowLeft,
  TrendingUp,
  ThumbsUp,
  Zap,
  Shield,
  Settings,
  Clock,
  Truck,
  BarChart,
} from "lucide-react";

// ------------------------------------------------------------
// Data: 5 main features with sub‑topics and detailed content
// ------------------------------------------------------------
const featuresData = [
  {
    id: "tools",
    name: "High-Quality Professional Tools",
    icon: ShieldCheck,
    shortDesc: "Premium-grade equipment for every job",
    color: "#dc2626",
    bgColor: "#fef2f2",
    description:
      "Our professional tools are engineered for demanding industrial and commercial applications. We source only the finest materials and employ rigorous quality control to ensure every tool exceeds expectations.",
    subTopics: [
      {
        id: "durability",
        label: "Durability",
        icon: Shield,
        content: {
          overview:
            "Built to withstand the harshest job sites, our tools are designed for long‑term performance. Every component is tested to endure heavy use without compromising accuracy or safety.",
          benefits: [
            "High carbon steel construction",
            "Rust‑resistant coating",
            "Heat treatment for enhanced strength",
            "Shock‑resistant body",
            "Industrial‑grade testing (ISO 9001)",
          ],
          suitableFor: [
            "Construction",
            "Plumbing",
            "Electrical",
            "Fabrication",
            "Automotive",
          ],
          maintenance:
            "Clean after each use, store in a dry place, and lubricate moving parts regularly to extend tool life.",
          relatedProducts: [
            "Hammer",
            "Drill",
            "Angle Grinder",
            "Impact Wrench",
          ],
          specifications: {
            material: "High‑carbon steel with anti‑corrosion finish",
            weight: "1.2 – 4.5 kg (varies by model)",
            warranty: "5‑year limited warranty",
          },
          reviews: [
            {
              user: "Rajesh K.",
              rating: 5,
              comment: "Unmatched durability – survived a year of daily use.",
            },
            {
              user: "Priya S.",
              rating: 4,
              comment: "Great quality, only minor rust after 6 months.",
            },
          ],
        },
      },
      {
        id: "premium-materials",
        label: "Premium Materials",
        icon: Award,
        content: {
          overview:
            "We use only the finest raw materials – from aerospace‑grade aluminium to hardened steel alloys – to ensure every tool is both lightweight and incredibly strong.",
          benefits: [
            "Corrosion‑resistant alloys",
            "Ergonomic grips made from sustainable rubber",
            "Precision‑machined components",
          ],
          suitableFor: ["Precision work", "Heavy‑duty operations"],
          maintenance:
            "Wipe with a soft cloth and apply anti‑corrosion oil periodically.",
          relatedProducts: ["Screwdriver Set", "Pliers", "Wrenches"],
          specifications: {
            material: "Chromium‑vanadium steel, TPE handles",
            weight: "0.8 – 3.2 kg",
            warranty: "3‑year warranty",
          },
          reviews: [
            {
              user: "Anil M.",
              rating: 5,
              comment:
                "The grip is fantastic – no slipping even with oily hands.",
            },
          ],
        },
      },
      {
        id: "precision-engineering",
        label: "Precision Engineering",
        icon: TrendingUp,
        content: {
          overview:
            "Our tools are crafted with micron‑level precision to deliver consistent results, whether you are aligning parts or cutting materials.",
          benefits: [
            "CNC‑machined tolerances ±0.01mm",
            "Laser‑calibrated for accuracy",
            "Balanced design for reduced vibration",
          ],
          suitableFor: [
            "Mechanical workshops",
            "Aerospace",
            "Medical device manufacturing",
          ],
          maintenance: "Regular calibration checks recommended.",
          relatedProducts: ["Digital Caliper", "Micrometer", "Laser Level"],
          specifications: {
            accuracy: "±0.01mm",
            material: "Hardened stainless steel",
            warranty: "2‑year accuracy guarantee",
          },
          reviews: [
            {
              user: "Sneha R.",
              rating: 5,
              comment: "Perfect for our lab – measurements are spot on.",
            },
          ],
        },
      },
      {
        id: "safety-standards",
        label: "Safety Standards",
        icon: Shield,
        content: {
          overview:
            "Every tool meets or exceeds international safety standards, including CE, UL, and OSHA requirements, to protect you on the job.",
          benefits: [
            "Insulated handles for electrical safety",
            "Non‑sparking materials for hazardous environments",
            "Overload protection mechanisms",
          ],
          suitableFor: ["Electrical work", "Oil & gas", "Mining"],
          maintenance: "Inspect insulation regularly; replace if damaged.",
          relatedProducts: [
            "Insulated Screwdrivers",
            "Safety Gloves",
            "Face Shields",
          ],
          specifications: {
            certification: "CE, UL, CSA",
            insulation: "Class II double insulation",
            warranty: "Lifetime safety guarantee",
          },
          reviews: [
            {
              user: "Vikram P.",
              rating: 5,
              comment: "I feel safe using these near live wires.",
            },
          ],
        },
      },
      {
        id: "warranty",
        label: "Warranty & Support",
        icon: Award,
        content: {
          overview:
            "We stand behind our tools with a comprehensive warranty and responsive customer support to keep your projects running smoothly.",
          benefits: [
            "5‑year limited warranty",
            "Free replacement for manufacturing defects",
            "24/7 technical support",
          ],
          suitableFor: ["All professional users"],
          maintenance: "Register your product online to activate warranty.",
          relatedProducts: ["Extended Service Plans", "Protective Cases"],
          specifications: {
            warrantyPeriod: "5 years",
            coverage: "Parts and labour",
            support: "Email, phone, and live chat",
          },
          reviews: [
            {
              user: "Meera D.",
              rating: 5,
              comment:
                "They replaced a faulty part within 48 hours – amazing support.",
            },
          ],
        },
      },
      {
        id: "maintenance-tips",
        label: "Maintenance Tips",
        icon: "",
        content: {
          overview:
            "Proper care extends tool life and ensures consistent performance. Follow these simple tips to keep your tools in top shape.",
          benefits: [
            "Clean after each use to prevent rust",
            "Lubricate moving parts regularly",
            "Store in a dry, temperature‑controlled environment",
          ],
          suitableFor: ["All tools"],
          maintenance:
            "Use a soft brush to remove debris, apply a light oil coating, and periodically check for loose fasteners.",
          relatedProducts: ["Maintenance Kit", "Lubricants", "Storage Racks"],
          specifications: {
            recommendedProducts: "WD‑40, 3‑in‑1 Oil, Silicone Spray",
          },
          reviews: [],
        },
      },
      {
        id: "recommended-industries",
        label: "Recommended Industries",
        icon: BarChart,
        content: {
          overview:
            "Our tools are trusted across a wide range of industries due to their reliability and precision.",
          benefits: [
            "Construction & Infrastructure",
            "Automotive Repair",
            "Aerospace Manufacturing",
            "Energy & Utilities",
            "Mining & Heavy Equipment",
          ],
          suitableFor: [
            "B2B clients",
            "Government projects",
            "Private contractors",
          ],
          maintenance: "Industry‑specific care guides available on request.",
          relatedProducts: ["Custom Tool Sets", "Industrial Carts"],
          specifications: {
            industryStandards: "ISO 9001, API, ASTM",
          },
          reviews: [
            {
              user: "Suresh N.",
              rating: 5,
              comment:
                "We use them across all our sites – they never disappoint.",
            },
          ],
        },
      },
      {
        id: "faqs",
        label: "FAQs",
        icon: HelpCircle,
        content: {
          overview: "Frequently asked questions about our professional tools.",
          benefits: [
            "Q: Are the tools covered by a warranty? A: Yes, 5‑year limited warranty.",
            "Q: Do you offer bulk discounts? A: Yes, for orders above 50 units.",
            "Q: Can I get custom branding? A: Yes, minimum order quantities apply.",
          ],
          suitableFor: ["All customers"],
          maintenance: "Visit our FAQ page for more answers.",
          relatedProducts: ["Contact Sales"],
          specifications: {},
          reviews: [],
        },
      },
      {
        id: "certifications",
        label: "Certifications",
        icon: Award,
        content: {
          overview:
            "Our tools are certified by leading independent bodies, ensuring quality and safety you can trust.",
          benefits: [
            "ISO 9001:2015 Quality Management",
            "ISO 14001 Environmental Management",
            "CE Marking",
            "UL Listed",
          ],
          suitableFor: ["Regulated industries", "Government contracts"],
          maintenance: "Certificates available upon request.",
          relatedProducts: ["Compliance Kits"],
          specifications: {
            certifications: "ISO, CE, UL, CSA",
          },
          reviews: [],
        },
      },
      {
        id: "customer-reviews",
        label: "Customer Reviews",
        icon: MessageCircle,
        content: {
          overview: "What our customers say about our high‑quality tools.",
          benefits: [
            "“Reliable and durable – every time.” – Arjun S.",
            "“The best tools I have used in 20 years.” – Lakshmi P.",
            "“Worth every rupee – highly recommend.” – Ravi G.",
          ],
          suitableFor: ["Decision‑makers", "Procurement teams"],
          maintenance: "Submit your own review to win a gift card!",
          relatedProducts: ["All products"],
          specifications: {},
          reviews: [
            { user: "Arjun S.", rating: 5, comment: "Absolutely top‑notch." },
            { user: "Lakshmi P.", rating: 5, comment: "They last forever." },
          ],
        },
      },
    ],
  },
  {
    id: "prices",
    name: "Affordable Prices",
    icon: IndianRupee,
    shortDesc: "Best value without compromising quality",
    color: "#16a34a",
    bgColor: "#f0fdf4",
    description:
      "We offer competitive pricing that makes professional tools accessible to everyone, without sacrificing quality or performance.",
    subTopics: [
      {
        id: "pricing-model",
        label: "Transparent Pricing",
        icon: IndianRupee,
        content: {
          overview: "No hidden fees – what you see is what you pay.",
          benefits: [
            "Upfront quotes",
            "Volume discounts",
            "Price match guarantee",
          ],
          suitableFor: ["Budget‑conscious projects", "Large‑scale procurement"],
          maintenance: "Contact our sales team for tailored pricing.",
          relatedProducts: ["Bulk Packs", "Subscription Plans"],
          specifications: { discountTiers: "5% for 10+, 10% for 50+" },
          reviews: [
            {
              user: "Neha K.",
              rating: 5,
              comment: "Saved 30% on our annual order.",
            },
          ],
        },
      },
      // Additional sub‑topics for affordability could be added here
      // For brevity, we include only one example; you can expand similarly.
    ],
  },
  // The other three features (Repair Services, Trusted Contractors, Customer Support)
  // would follow the same structure. To keep the code manageable, I will include
  // placeholder sub‑topics for them, but you can easily expand.
  {
    id: "repair",
    name: "Reliable Repair Services",
    icon: Wrench,
    shortDesc: "Fast, dependable, and built to last",
    color: "#2563eb",
    bgColor: "#eff6ff",
    description:
      "Our certified technicians bring decades of experience to every repair, ensuring your equipment is back in service quickly.",
    subTopics: [
      {
        id: "repair-process",
        label: "Repair Process",
        icon: Settings,
        content: {
          overview: "Streamlined repair workflow from diagnosis to delivery.",
          benefits: [
            "Same‑day diagnosis",
            "OEM parts",
            "6‑month service guarantee",
          ],
          suitableFor: ["Industrial machinery", "Power tools"],
          maintenance: "Schedule regular check‑ups to prevent breakdowns.",
          relatedProducts: ["Extended Service Contracts"],
          specifications: { turnaround: "4–6 hours average" },
          reviews: [
            {
              user: "Suresh R.",
              rating: 5,
              comment: "They fixed my compressor in record time.",
            },
          ],
        },
      },
      // add more sub‑topics as needed
    ],
  },
  {
    id: "contractors",
    name: "Trusted by Local Contractors",
    icon: Users,
    shortDesc: "The preferred choice of industry professionals",
    color: "#7c3aed",
    bgColor: "#f5f3ff",
    description:
      "Over 2,000 local contractors rely on us for consistent quality and service. Join the community of satisfied professionals.",
    subTopics: [
      {
        id: "contractor-network",
        label: "Contractor Network",
        icon: Users,
        content: {
          overview:
            "We partner with contractors to deliver exceptional results.",
          benefits: [
            "Exclusive discounts",
            "Priority support",
            "Co‑marketing opportunities",
          ],
          suitableFor: ["General contractors", "Sub‑contractors"],
          maintenance: "Join our referral program to earn rewards.",
          relatedProducts: ["Contractor Kits"],
          specifications: { networkSize: "2,100+ active contractors" },
          reviews: [
            {
              user: "Vijay M.",
              rating: 5,
              comment: "They understand our needs perfectly.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "support",
    name: "Fast Customer Support",
    icon: HeadphonesIcon,
    shortDesc: "We are here when you need us most",
    color: "#f59e0b",
    bgColor: "#fffbeb",
    description:
      "Our support team operates 24/7 across multiple channels to resolve your issues quickly and effectively.",
    subTopics: [
      {
        id: "support-channels",
        label: "Support Channels",
        icon: HeadphonesIcon,
        content: {
          overview: "Reach us via phone, email, live chat, or social media.",
          benefits: [
            "Average response time under 1 minute",
            "Dedicated technical hotline",
          ],
          suitableFor: ["All customers"],
          maintenance: "Check our knowledge base for self‑help articles.",
          relatedProducts: ["Premium Support Plans"],
          specifications: {
            channels: "Phone, Email, Chat, WhatsApp, Telegram",
          },
          reviews: [
            {
              user: "Deepa N.",
              rating: 5,
              comment: "They resolved my issue at 2 AM – incredible.",
            },
          ],
        },
      },
    ],
  },
];

// ------------------------------------------------------------
// Helper component for rendering stars
// ------------------------------------------------------------
const StarRating = ({ rating }) => (
  <div style={{ display: "flex", gap: "2px" }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        size={16}
        fill={i <= rating ? "#f59e0b" : "none"}
        color={i <= rating ? "#f59e0b" : "#d1d5db"}
        strokeWidth={1.5}
      />
    ))}
  </div>
);

// ------------------------------------------------------------
// Main Component
// ------------------------------------------------------------
const WhyChooseUs = () => {
  // State: which feature is selected (null = closed)
  const [activeFeatureId, setActiveFeatureId] = useState(null);
  // State: which sub‑topic is selected (first by default when modal opens)
  const [activeSubTopicId, setActiveSubTopicId] = useState(null);
  // State: which tab is active inside the detail view (e.g., 'overview', 'benefits', etc.)
  const [activeTab, setActiveTab] = useState("overview");

  // Find the currently active feature object
  const activeFeature = featuresData.find((f) => f.id === activeFeatureId);
  // Find the currently active sub‑topic object
  const activeSubTopic = activeFeature?.subTopics.find(
    (st) => st.id === activeSubTopicId,
  );

  // When a feature card is clicked, open modal and set first sub‑topic as active
  const handleFeatureClick = (featureId) => {
    const feature = featuresData.find((f) => f.id === featureId);
    if (feature) {
      setActiveFeatureId(featureId);
      setActiveSubTopicId(feature.subTopics[0]?.id || null);
      setActiveTab("overview");
      document.body.style.overflow = "hidden";
    }
  };

  // Close modal and reset state
  const closeModal = () => {
    setActiveFeatureId(null);
    setActiveSubTopicId(null);
    setActiveTab("overview");
    document.body.style.overflow = "auto";
  };

  // Handle sub‑topic click from left menu
  const handleSubTopicClick = (subTopicId) => {
    setActiveSubTopicId(subTopicId);
    setActiveTab("overview"); // reset tab when switching sub‑topic
  };

  // Breadcrumb
  const breadcrumbItems = [
    { label: "Home", icon: Home, onClick: closeModal },
    {
      label: "Why Choose Us",
      onClick: () => {
        /* stays in modal */
      },
    },
  ];
  if (activeFeature) {
    breadcrumbItems.push({ label: activeFeature.name, onClick: () => {} });
  }
  if (activeSubTopic) {
    breadcrumbItems.push({ label: activeSubTopic.label, onClick: () => {} });
  }

  // Tabs for detail view
  const tabKeys = [
    "overview",
    "benefits",
    "specifications",
    "maintenance",
    "reviews",
    "relatedProducts",
  ];
  const tabLabels = {
    overview: "Overview",
    benefits: "Benefits",
    specifications: "Specs",
    maintenance: "Maintenance",
    reviews: "Reviews",
    relatedProducts: "Related Products",
  };

  // Render the detail content based on activeTab and activeSubTopic
  const renderDetailContent = () => {
    if (!activeSubTopic) return null;
    const content = activeSubTopic.content;
    switch (activeTab) {
      case "overview":
        return (
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#1e293b" }}>
            {content.overview}
          </p>
        );
      case "benefits":
        return (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {content.benefits &&
              content.benefits.map((b, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <CheckCircle
                    size={20}
                    color={activeFeature.color}
                    style={{ flexShrink: 0, marginTop: "2px" }}
                  />
                  <span>{b}</span>
                </li>
              ))}
          </ul>
        );
      case "specifications":
        const specs = content.specifications || {};
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            {Object.entries(specs).map(([key, value]) => (
              <div
                key={key}
                style={{
                  background: "#f8fafc",
                  padding: "12px 16px",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    color: "#64748b",
                    fontWeight: 600,
                  }}
                >
                  {key}
                </div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "#0f172a",
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        );
      case "maintenance":
        return (
          <div>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#1e293b" }}>
              {content.maintenance}
            </p>
            {content.suitableFor && (
              <>
                <h5
                  style={{
                    marginTop: "20px",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                  }}
                >
                  Suitable For
                </h5>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {content.suitableFor.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        background: "#e2e8f0",
                        padding: "4px 12px",
                        borderRadius: "100px",
                        fontSize: "0.85rem",
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        );
      case "reviews":
        const reviews = content.reviews || [];
        if (reviews.length === 0) return <p>No reviews yet.</p>;
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {reviews.map((review, i) => (
              <div
                key={i}
                style={{
                  background: "#f1f5f9",
                  padding: "16px",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <strong>{review.user}</strong>
                  <StarRating rating={review.rating} />
                </div>
                <p style={{ marginTop: "6px", color: "#334155" }}>
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        );
      case "relatedProducts":
        const products = content.relatedProducts || [];
        if (products.length === 0) return <p>No related products.</p>;
        return (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {products.map((p, i) => (
              <span
                key={i}
                style={{
                  background: activeFeature.bgColor,
                  color: activeFeature.color,
                  padding: "8px 18px",
                  borderRadius: "100px",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Homepage Section */}
      <section style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
        >
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#fef2f2",
                padding: "6px 18px",
                borderRadius: "100px",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#dc2626",
                }}
              >
                Why We Stand Out
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.6rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#0a0a0a",
                marginBottom: "8px",
              }}
            >
              Why <span style={{ color: "#dc2626" }}>Choose Us</span>
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "#4b5563",
                maxWidth: "520px",
                margin: "0 auto",
              }}
            >
              Click any card to explore what makes us the trusted partner for
              professionals across India.
            </p>
            <div
              style={{
                width: "56px",
                height: "4px",
                background: "#dc2626",
                borderRadius: "4px",
                margin: "16px auto 0",
              }}
            ></div>
          </div>

          {/* Card Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {featuresData.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  onClick={() => handleFeatureClick(feature.id)}
                  style={{
                    background: "#ffffff",
                    padding: "28px 20px 32px",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(0,0,0,0.08)";
                    e.currentTarget.style.borderColor = feature.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 1px 3px rgba(0,0,0,0.04)";
                    e.currentTarget.style.borderColor = "#e5e7eb";
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: feature.color,
                      borderRadius: "12px 12px 0 0",
                    }}
                  />
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      background: feature.bgColor,
                      color: feature.color,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      fontSize: "28px",
                    }}
                  >
                    <Icon size={30} strokeWidth={1.8} />
                  </div>
                  <h3
                    style={{
                      fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
                      fontWeight: 700,
                      color: "#0a0a0a",
                      marginBottom: "6px",
                      lineHeight: 1.3,
                    }}
                  >
                    {feature.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#6b7280",
                      marginBottom: "14px",
                      lineHeight: 1.4,
                    }}
                  >
                    {feature.shortDesc}
                  </p>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: feature.color,
                      letterSpacing: "0.02em",
                    }}
                  >
                    <span>Learn More</span>
                    <ChevronRight size={14} />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `radial-gradient(circle at 50% 0%, ${feature.color}08, transparent 70%)`,
                      opacity: 0,
                      transition: "opacity 0.4s",
                      pointerEvents: "none",
                      borderRadius: "12px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeFeature && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
            animation: "fadeIn 0.25s ease",
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              maxWidth: "1100px",
              width: "100%",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 40px 80px rgba(0,0,0,0.25)",
              animation: "slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with close & breadcrumb */}
            <div
              style={{
                padding: "20px 28px",
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={closeModal}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#64748b",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <X size={20} />
                </button>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.85rem",
                    color: "#475569",
                  }}
                >
                  {breadcrumbItems.map((item, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <ChevronRight size={14} color="#94a3b8" />}
                      <span
                        onClick={
                          item.onClick && item.onClick !== closeModal
                            ? item.onClick
                            : undefined
                        }
                        style={{
                          cursor: item.onClick ? "pointer" : "default",
                          fontWeight:
                            idx === breadcrumbItems.length - 1 ? 700 : 400,
                          color:
                            idx === breadcrumbItems.length - 1
                              ? "#0f172a"
                              : "#64748b",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {item.icon && <item.icon size={14} />}
                        {item.label}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <button
                onClick={closeModal}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: "100px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#1e293b",
                }}
              >
                Close
              </button>
            </div>

            {/* Main content: sidebar + detail */}
            <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
              {/* Left sidebar */}
              <div
                style={{
                  width: "280px",
                  minWidth: "200px",
                  background: "#f8fafc",
                  borderRight: "1px solid #e5e7eb",
                  padding: "20px 0",
                  overflowY: "auto",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    padding: "0 16px 12px",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#64748b",
                  }}
                >
                  {activeFeature.name}
                </div>
                {activeFeature.subTopics.map((st) => {
                  const Icon = st.icon || ChevronRight;
                  const isActive = st.id === activeSubTopicId;
                  return (
                    <div
                      key={st.id}
                      onClick={() => handleSubTopicClick(st.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "10px 20px",
                        cursor: "pointer",
                        background: isActive
                          ? activeFeature.bgColor
                          : "transparent",
                        borderLeft: isActive
                          ? `4px solid ${activeFeature.color}`
                          : "4px solid transparent",
                        transition: "all 0.2s",
                        color: isActive ? activeFeature.color : "#1e293b",
                        fontWeight: isActive ? 600 : 400,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive)
                          e.currentTarget.style.background = "#f1f5f9";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive)
                          e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <Icon size={18} />
                      <span style={{ fontSize: "0.9rem" }}>{st.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Right detail panel */}
              <div
                style={{
                  flex: 1,
                  padding: "24px 28px",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {activeSubTopic ? (
                  <>
                    {/* Sub-topic title and description */}
                    <div style={{ marginBottom: "16px" }}>
                      <h3
                        style={{
                          fontSize: "1.4rem",
                          fontWeight: 800,
                          color: "#0f172a",
                          marginBottom: "4px",
                        }}
                      >
                        {activeSubTopic.label}
                      </h3>
                      <p style={{ fontSize: "0.95rem", color: "#475569" }}>
                        {activeSubTopic.content.overview
                          ? activeSubTopic.content.overview.substring(0, 100) +
                            "…"
                          : ""}
                      </p>
                    </div>

                    {/* Tabs */}
                    <div
                      style={{
                        display: "flex",
                        gap: "4px",
                        borderBottom: "1px solid #e5e7eb",
                        marginBottom: "20px",
                        flexWrap: "wrap",
                      }}
                    >
                      {tabKeys.map((key) => {
                        // Only show tab if content exists for that key
                        const hasContent =
                          activeSubTopic.content[key] &&
                          (Array.isArray(activeSubTopic.content[key])
                            ? activeSubTopic.content[key].length > 0
                            : activeSubTopic.content[key]);
                        if (!hasContent) return null;
                        return (
                          <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            style={{
                              padding: "8px 16px",
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                              fontWeight: activeTab === key ? 700 : 400,
                              color:
                                activeTab === key
                                  ? activeFeature.color
                                  : "#64748b",
                              borderBottom:
                                activeTab === key
                                  ? `3px solid ${activeFeature.color}`
                                  : "3px solid transparent",
                              transition: "all 0.2s",
                              fontSize: "0.85rem",
                              textTransform: "capitalize",
                            }}
                          >
                            {tabLabels[key] || key}
                          </button>
                        );
                      })}
                    </div>

                    {/* Detail content */}
                    <div style={{ flex: 1 }}>{renderDetailContent()}</div>
                  </>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      color: "#94a3b8",
                    }}
                  >
                    Select a topic from the left menu.
                  </div>
                )}
              </div>
            </div>
          </div>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(30px) scale(0.97); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
            /* Custom scroll */
            div[style*="overflow"]::-webkit-scrollbar {
              width: 6px;
            }
            div[style*="overflow"]::-webkit-scrollbar-track {
              background: #f1f5f9;
              border-radius: 10px;
            }
            div[style*="overflow"]::-webkit-scrollbar-thumb {
              background: #cbd5e1;
              border-radius: 10px;
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default WhyChooseUs;
