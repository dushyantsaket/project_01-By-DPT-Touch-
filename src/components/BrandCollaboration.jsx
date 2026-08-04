import React from "react";
import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { BRANDS } from "../data/brandData";
import "./BrandCollaboration.css";

const BrandCollaboration = () => {
  return (
    <section className="brand-collaboration-section">
      <div className="brand-collaboration-container brand-collaboration-header">
        <span className="brand-collaboration-eyebrow">Our Global Partners</span>
        <h2 className="brand-collaboration-title">
          Trusted by {" "}
          <span className="brand-collaboration-title-highlight">Industry Leaders</span>
        </h2>
      </div>

      <div className="brand-collaboration-container">
        <div className="brand-grid">
          {BRANDS.map((brand) => (
            <Link
              to={`/brand/${brand.id}`}
              key={brand.id}
              onClick={() => window.scrollTo(0, 0)}
              className="brand-link"
            >
              <BrandLogo name={brand.name} logo={brand.logo} className="brand-link-logo" />
              <p className="brand-link-name">{brand.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCollaboration;
