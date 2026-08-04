import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Products from "../components/Products";
import ProductCategories from "../components/ProductCategories";
import BladesCollection from "../components/BladesCollection";
import Stats from "../components/Stats";
import WhyChooseUs from "../components/WhyChooseUs";
import Reviews from "../components/Reviews";
import InstagramMicrosSection from "../components/InstagramMicros";
import CompanyDetailsSection from "../components/CompanyDetails";
import BrandCollaboration from "../components/BrandCollaboration";
import SparePartsSection from "../components/SparePartsSection";
import ServicesSection from "../components/ServicesSection";
import IndustrialFeatured from "../components/IndustrialFeatured";
import AdminProductsSection from "../components/AdminProductsSection";
import CordlessTools from "../components/CordlessTools";

const PageSection = ({ children }) => <div>{children}</div>;

const LatestNewsPreview = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/news")
      .then((res) => res.json())
      .then((payload) => {
        if (!isMounted) return;
        const liveNews = Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload)
            ? payload
            : [];
        setNews(liveNews.slice(0, 4));
      })
      .catch(() => {
        if (isMounted) setNews([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!news.length) return null;

  return (
    <section style={{ padding: "32px 24px 72px", background: "#fff" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "10px",
                fontWeight: 900,
                letterSpacing: "0.3em",
                color: "#dc2626",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Latest News
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.04em",
                margin: 0,
              }}
            >
              Fresh Updates
            </h2>
          </div>
          <Link
            to="/latest-news"
            style={{
              color: "#dc2626",
              fontWeight: "800",
              textDecoration: "none",
            }}
          >
            View All News →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {news.map((item) => (
            <div
              key={item.id || item.title}
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "18px",
                overflow: "hidden",
              }}
            >
              <img
                src={
                  item.image ||
                  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                }
                alt={item.title}
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
              <div style={{ padding: "16px" }}>
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#dc2626",
                    marginBottom: "10px",
                  }}
                >
                  {item.brand || item.category || "General"}
                </p>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#0f172a",
                    lineHeight: 1.4,
                    marginBottom: "8px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    lineHeight: 1.6,
                    marginBottom: "12px",
                  }}
                >
                  {item.description || item.summary || item.content}
                </p>
                <Link
                  to="/latest-news"
                  style={{
                    color: "#dc2626",
                    fontSize: "12px",
                    fontWeight: 800,
                    textDecoration: "none",
                  }}
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div style={{ background: "#ffffff", color: "#333", overflowX: "hidden" }}>
      <Hero />
      {/* Admin added products will show here automatically */}
      <PageSection>
        <AdminProductsSection />
      </PageSection>{" "}
      <PageSection>
        <IndustrialFeatured />
      </PageSection>
      <PageSection>
        <Stats />
      </PageSection>
      <PageSection>
        <BrandCollaboration />
      </PageSection>
      <PageSection>
        <ProductCategories />
      </PageSection>
      <PageSection>
        <Products />
        <CordlessTools />
      </PageSection>
      <PageSection>
        <LatestNewsPreview />
      </PageSection>
      <PageSection></PageSection>
      <PageSection></PageSection>
      <PageSection>
        <BladesCollection />
      </PageSection>
      <PageSection>
        <WhyChooseUs />
      </PageSection>
      <PageSection>
        <InstagramMicrosSection />
      </PageSection>
      <PageSection>
        <CompanyDetailsSection />
      </PageSection>
      <PageSection>
        <Reviews />
      </PageSection>
    </div>
  );
};

export default Home;
