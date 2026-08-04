import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, MapPin, ShieldCheck, CheckCircle } from "lucide-react";

const BusinessCard = ({ business, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="business-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="card-image-container">
        <img src={business.image} alt={business.name} className="card-image" />
        <div className="card-image-overlay"></div>
        <div className="card-logo-container">
          <img
            src={business.logo}
            alt={`${business.name} Logo`}
            className="card-logo"
          />
        </div>
      </div>
      <div className="card-content">
        <h3 className="card-name">{business.name}</h3>
        <p className="card-description">{business.description}</p>

        <div className="card-info-grid">
          <div className="card-info-item">
            <MapPin size={14} className="card-info-icon" />
            <span>{business.location}</span>
          </div>
          <div className="card-info-item">
            <ShieldCheck size={14} className="card-info-icon" />
            <span>Authorized Dealer</span>
          </div>
          <div className="card-info-item">
            <CheckCircle size={14} className="card-info-icon" />
            <span>GST Available</span>
          </div>
        </div>

        <div className="card-founder-section">
          <div className="founder-grid">
            <div className="founder-item">
              <span className="founder-label">Founder</span>
              <span className="founder-name">{business.founder}</span>
            </div>
            <div className="founder-item">
              <span className="founder-label">Co-Founder</span>
              <span className="founder-name placeholder">
                {business.coFounder || "(Placeholder)"}
              </span>
            </div>
          </div>
          <div className="employee-count">
            <Users size={16} />
            <span>{business.employees} Employees</span>
          </div>
        </div>

        <div className="card-footer">
          <div className="business-age">
            <span className="age-number">{business.yearsInBusiness}</span>
            <span className="age-label">Years in Business</span>
          </div>
          <Link to={business.exploreLink} className="explore-button">
            Explore
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessCard;
