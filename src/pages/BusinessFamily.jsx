import React from "react";
import { motion } from "framer-motion";
import BusinessCard from "./BusinessCard";
import BrandGrid from "./BrandGrid";
import TrustBadges from "./TrustBadges";
import "./BusinessFamily.css";

const businesses = [
  {
    logo: "/images/brands/vpt-logo.png",
    name: "VPT TOOLS INDIA",
    description:
      "Your one-stop destination for professional-grade power tools and industrial equipment.",
    location: "Sidhi, Madhya Pradesh",
    yearsInBusiness: 25,
    employees: "50+",
    founder: "Dushyant Saket",
    coFounder: "(Placeholder)",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3Nob3B8ZW58MHx8MHx8fDA%3D",
    exploreLink: "/products",
  },
  {
    logo: "/images/brands/dushyant-timber-logo.png",
    name: "DUSHYANT TIMBER",
    description:
      "Premium quality timber and wood supplies for construction and furniture manufacturing.",
    location: "Sidhi, Madhya Pradesh",
    yearsInBusiness: 18,
    employees: "30+",
    founder: "Dushyant Saket",
    coFounder: "(Placeholder)",
    image:
      "https://images.unsplash.com/photo-1555696958-c5d68d443445?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdvb2QlMjBwbGFua3N8ZW58MHx8MHx8fDA%3D",
    exploreLink: "/about",
  },
  {
    logo: "/images/brands/dfm-logo.png",
    name: "DUSHYANT FURNITURE MART",
    description:
      "Exquisite handcrafted furniture for modern homes and offices, built to last generations.",
    location: "Sidhi, Madhya Pradesh",
    yearsInBusiness: 15,
    employees: "40+",
    founder: "Dushyant Saket",
    coFounder: "(Placeholder)",
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnVybml0dXJlfGVufDB8fDB8fHww",
    exploreLink: "/about",
  },
  {
    logo: "/images/brands/placeholder-logo.png",
    name: "FOURTH BUSINESS",
    description:
      "Placeholder for the next venture in our expanding business family portfolio.",
    location: "Coming Soon",
    yearsInBusiness: 0,
    employees: "XX+",
    founder: "Dushyant Saket",
    coFounder: "(Placeholder)",
    image:
      "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvbnN0cnVjdGlvbiUyMHBsYW5uaW5nfGVufDB8fDB8fHww",
    exploreLink: "#",
  },
];

const BusinessFamily = () => {
  return (
    <div className="business-family-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="section-header"
      >
        <span className="eyebrow">Our Legacy</span>
        <h2 className="title">A Trusted Business Family</h2>
        <p className="subtitle">
          Four distinct businesses, one unified vision of quality and trust.
        </p>
      </motion.div>
      <div className="business-cards-grid">
        {businesses.map((business, index) => (
          <BusinessCard key={business.name} business={business} index={index} />
        ))}
      </div>
      <TrustBadges />
      <BrandGrid />
    </div>
  );
};

export default BusinessFamily;
