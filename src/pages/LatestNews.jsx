import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LatestNews.css";
import {
  ArrowRight,
  Calendar,
  Tag,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

const fallbackNewsData = [
  {
    id: 1,
    title:
      "TCT Saw Blades Explained: Which Blade Is Right for MDF, Plywood & Hardwood?",
    description:
      "Choosing the right TCT (Tungsten Carbide Tipped) saw blade is important for getting smooth, clean and chip-free cuts on different types of wood. MDF, plywood, and hardwood each require specific tooth counts and geometry for best results.",
    date: "27 Nov, 2025",
    category: "Technical Guide",
    image:
      "https://www.endicopowertools.com/storage/app/public/uploads/ZV1QxerqMB6cn7lsQD01uThf3WfLpJoD6pHI0XXN.jpg",
    link: "https://www.endicopowertools.com/latest-news/tct-saw-blades-explained-which-blade-is-right-for-mdf-plywood-and-hardwood",
    featured: true,
  },
  {
    id: 2,
    title:
      "Why Endico Power Tools Are Not Expensive — A Real Case Study for Professionals",
    description:
      "When customers compare prices in the Indian power tool market, Endico products may seem slightly more expensive at first glance. But a lifecycle cost analysis reveals a very different story — one of long-term savings.",
    date: "30 Apr, 2025",
    category: "Industry Insight",
    image:
      "https://www.endicopowertools.com/storage/app/public/uploads/wOhruz8jB9qZY53Q7pf3mUahAN5ywT0Of84CoFp9.jpg",
    link: "https://www.endicopowertools.com/latest-news/why-endico-power-tools-are-not-expensive-but-actually-cheaper-in-the-long-run-a-real-case-study-for-power-tools-professionals",
  },
  {
    id: 3,
    title:
      "Buy a WoodWorking Router Machine to Match Your Project Requirements",
    description:
      "Modern woodworking projects are complicated and require efficient tools to ensure smooth work. Artisans use sophisticated tools to make precise cuts and joints. Here's how to choose the right router for your projects.",
    date: "25 Dec, 2024",
    category: "Buying Guide",
    image:
      "https://www.endicopowertools.com/storage/app/public/uploads/FOTrOdrPx5xlYYopqbxdEPM8rkDoJpNlSaOUjj4J.jpg",
    link: "https://www.endicopowertools.com/latest-news/buy-a-woodworking-router-machine-to-match-your-project-requirements",
  },
  {
    id: 4,
    title:
      "BOSCH Professional Introduces New 18V Cordless Range for Indian Market",
    description:
      "BOSCH Professional has expanded its cordless power tool lineup in India with a new 18V brushless range including drills, impact drivers, and grinders — available now at Dushyant Power Tools, Sidhi.",
    date: "15 Jan, 2025",
    category: "New Products",
    image:
      "https://www.endicopowertools.com/storage/app/public/uploads/xjXeqvwHXnBfl84oIn5AI8LdHYHQ9L3C9GkkSQEJ.jpg",
    link: "/cordless-tools",
  },
  {
    id: 5,
    title: "India Wood 2024 — Dushyant Power Tools Exhibition Recap",
    description:
      "We participated in Asia's largest woodworking industry exhibition, organized by NürnbergMesse India from 22–26 Feb 2024 at BIEC, Bangalore. Here's a recap of our showcase and the tools that attracted the most attention.",
    date: "01 Mar, 2024",
    category: "Events",
    image:
      "https://www.endicopowertools.com/storage/app/public/uploads/xjXeqvwHXnBfl84oIn5AI8LdHYHQ9L3C9GkkSQEJ.jpg",
    link: "https://www.endicopowertools.com/latest-news/india-wood-2024",
  },
  {
    id: 6,
    title: "How to Maintain Your Angle Grinder for Long Life",
    description:
      "An angle grinder is one of the most used power tools in any workshop. Proper maintenance — including brush replacement, disc inspection, and gear housing checks — can extend its life by years. Here's our expert guide.",
    date: "12 Feb, 2025",
    category: "Maintenance",
    image:
      "https://www.endicopowertools.com/storage/app/public/uploads/ZkY8QVnodPum5yT6xtsOMCCJTcpiQSM9nk7wP6Lz.jpg",
    link: "/warranty-claim",
  },
  {
    id: 7,
    title: "How to Change Carbon Brush Set of Endico Router Machine",
    description:
      "Here is a detailed guide showing how you can change the carbon brush set of Endico Router machine. Carbon brushes are wear components and replacing them on time prevents permanent motor damage.",
    date: "19 Nov, 2022",
    category: "DIY Tutorial",
    image:
      "https://www.endicopowertools.com/storage/app/public/uploads/ak6SqhKrcetOyuh91KSERh1AYDPdtLEk8CNWPcB4.jpg",
    link: "https://www.endicopowertools.com/latest-news/how-to-change-carbon-brush-set-of-endico-router",
  },
  {
    id: 8,
    title: "Cordless vs Corded: Which Power Tool Is Right for You in 2025?",
    description:
      "The debate between cordless and corded power tools continues. With improvements in battery technology (especially 18V and 54V platforms), cordless tools now match corded performance in most applications. We break it down.",
    date: "05 Apr, 2025",
    category: "Comparison",
    image:
      "https://www.endicopowertools.com/storage/app/public/uploads/ZV1QxerqMB6cn7lsQD01uThf3WfLpJoD6pHI0XXN.jpg",
    link: "/cordless-tools",
  },
  {
    id: 9,
    title: "Top 5 Drilling Machines for Construction Sites in 2025",
    description:
      "Construction-grade drilling machines need to handle concrete, steel, and masonry daily. We've compiled the top 5 hammer drills and rotary hammers available at Dushyant Power Tools for professional contractors.",
    date: "20 Mar, 2025",
    category: "Buying Guide",
    image:
      "https://www.endicopowertools.com/storage/app/public/uploads/FOTrOdrPx5xlYYopqbxdEPM8rkDoJpNlSaOUjj4J.jpg",
    link: "/products",
  },
];

const categoryColors = {
  "Technical Guide": "#3b82f6",
  "Industry Insight": "#8b5cf6",
  "Buying Guide": "#f59e0b",
  "New Products": "#10b981",
  Events: "#ec4899",
  Maintenance: "#ef4444",
  "DIY Tutorial": "#f97316",
  Comparison: "#06b6d4",
  General: "#dc2626",
};

const normalizeNews = (item, index) => {
  const title = item.title || "Untitled News";
  const description =
    item.description ||
    item.summary ||
    item.content ||
    "No description available.";
  const category = item.category || item.brand || "General";
  const date =
    item.date ||
    new Date(item.publishDate || item.createdAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return {
    id: item.id || `news-${index}`,
    title,
    description,
    date,
    category,
    image:
      item.image ||
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    link: item.link || item.url || "/latest-news",
    featured: Boolean(item.featured),
  };
};

const mergeNewsItems = (liveItems = []) => {
  const fallbackItems = fallbackNewsData.map((item, index) =>
    normalizeNews(item, index),
  );
  const liveMapped = Array.isArray(liveItems)
    ? liveItems.map(normalizeNews)
    : [];
  const merged = [...fallbackItems, ...liveMapped];
  const unique = new Map();

  merged.forEach((item) => {
    const key = item.id || item.title;
    if (!unique.has(key)) unique.set(key, item);
  });

  return [...unique.values()];
};

const buildWhatsAppShareUrl = (news) => {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://www.dushyantpowertools.com";
  const fullLink = news.link?.startsWith("http")
    ? news.link
    : `${baseUrl}${news.link?.startsWith("/") ? news.link : `/${news.link}`}`;
  const text = `${news.title}\n\n${news.description}\n\nRead more: ${fullLink}`;
  return `https://wa.me/919754015503?text=${encodeURIComponent(text)}`;
};

const LatestNews = () => {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState(fallbackNewsData);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadNews = async () => {
      try {
        const res = await fetch("/api/news");
        const payload = await res.json();
        if (!isMounted) return;

        const liveItems = Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload)
            ? payload
            : [];

        const merged = mergeNewsItems(liveItems);
        if (isMounted) setNewsData(merged);
      } catch {
        if (isMounted) setNewsData(mergeNewsItems([]));
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadNews();

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(newsData.map((n) => n.category))],
    [newsData],
  );
  const filtered =
    activeCategory === "All"
      ? newsData
      : newsData.filter((n) => n.category === activeCategory);
  const featured = filtered.find((n) => n.featured) || filtered[0];
  const rest = filtered.filter((n) => n.id !== featured?.id);

  const handleShareWhatsApp = (event, news) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(buildWhatsAppShareUrl(news), "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="pt-24 min-h-screen bg-white pb-20 overflow-hidden"
      style={{ paddingTop: "100px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-6 bg-industrial-red"></span>
            <span className="text-industrial-red font-black uppercase tracking-[0.2em] text-[10px]">
              News & Updates
            </span>
            <span className="h-px w-6 bg-industrial-red"></span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-industrial-dark uppercase tracking-tighter">
            Market <span className="text-industrial-red">Insights</span>
          </h1>
          <p style={{ color: "#64748b", marginTop: "12px", fontSize: "15px" }}>
            Latest news, guides, and updates from the power tools industry
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "6px 16px",
                borderRadius: "20px",
                border: "1.5px solid",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
                background: activeCategory === cat ? "#dc2626" : "#fff",
                color: activeCategory === cat ? "#fff" : "#64748b",
                borderColor: activeCategory === cat ? "#dc2626" : "#e2e8f0",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading && (
          <div
            style={{ textAlign: "center", padding: "30px", color: "#64748b" }}
          >
            Loading latest news...
          </div>
        )}

        {featured && (
          <div
            onClick={() =>
              navigate(`/latest-news/${encodeURIComponent(featured.id)}`)
            }
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0",
              background: "#0f172a",
              borderRadius: "20px",
              overflow: "hidden",
              marginBottom: "40px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                position: "relative",
                minHeight: "380px",
                overflow: "hidden",
              }}
            >
              <img
                src={featured.image}
                alt={featured.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.3), transparent)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  background: "#dc2626",
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: "700",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Featured
              </span>
            </div>
            <div
              style={{
                padding: "48px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background:
                    (categoryColors[featured.category] || "#dc2626") + "22",
                  color: categoryColors[featured.category] || "#dc2626",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "16px",
                  width: "fit-content",
                }}
              >
                <Tag size={11} /> {featured.category}
              </div>
              <h2
                style={{
                  fontSize: "26px",
                  fontWeight: "800",
                  color: "#f8fafc",
                  lineHeight: 1.3,
                  marginBottom: "16px",
                }}
              >
                {featured.title}
              </h2>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  marginBottom: "24px",
                }}
              >
                {featured.description}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#64748b",
                    fontSize: "12px",
                  }}
                >
                  <Calendar size={13} /> {featured.date}
                </span>
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShareWhatsApp(e, featured);
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "#fff",
                      background: "#25D366",
                      border: "none",
                      borderRadius: "999px",
                      padding: "8px 14px",
                      fontSize: "12px",
                      fontWeight: "800",
                      cursor: "pointer",
                    }}
                  >
                    <MessageCircle size={14} /> Share on WhatsApp
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(
                        `/latest-news/${encodeURIComponent(featured.id)}`,
                      );
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "#dc2626",
                      fontSize: "13px",
                      fontWeight: "700",
                      textDecoration: "none",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    Read More <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((news) => (
            <div
              key={news.id}
              onClick={() =>
                navigate(`/latest-news/${encodeURIComponent(news.id)}`)
              }
              style={{
                textDecoration: "none",
                display: "block",
                background: "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                border: "1px solid #f1f5f9",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(0,0,0,0.12)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <div
                style={{
                  height: "200px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={news.image}
                  alt={news.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    background: categoryColors[news.category] || "#dc2626",
                    color: "#fff",
                    fontSize: "9px",
                    fontWeight: "700",
                    padding: "3px 10px",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {news.category}
                </span>
              </div>

              <div style={{ padding: "20px" }}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "#94a3b8",
                    fontSize: "11px",
                    marginBottom: "10px",
                  }}
                >
                  <Calendar size={12} /> {news.date}
                </span>
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#0f172a",
                    lineHeight: 1.4,
                    marginBottom: "10px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebnlineBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {news.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    lineHeight: 1.6,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    marginBottom: "16px",
                  }}
                >
                  {news.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                  }}
                >
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/latest-news/${encodeURIComponent(news.id)}`);
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      color: "#dc2626",
                      fontSize: "12px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      cursor: "pointer",
                    }}
                  >
                    Read More <ChevronRight size={14} />
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShareWhatsApp(e, news);
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      color: "#0f172a",
                      padding: "7px 10px",
                      borderRadius: "999px",
                      cursor: "pointer",
                      fontSize: "11px",
                      fontWeight: "800",
                    }}
                  >
                    <MessageCircle size={12} /> Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
