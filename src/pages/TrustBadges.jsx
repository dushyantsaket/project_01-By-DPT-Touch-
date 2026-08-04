import React from "react";
import { motion } from "framer-motion";

const badges = [
  { name: "Authorized Dealer", image: "/images/badges/authorized-dealer.png" },
  { name: "Secure Delivery", image: "/images/badges/secure-delivery.png" },
  { name: "GST Invoice", image: "/images/badges/gst-invoice.png" },
  { name: "Easy Returns", image: "/images/badges/easy-returns.png" },
];

const TrustBadges = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <motion.div
      className="trust-badges-container"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {badges.map((badge) => (
        <motion.div
          key={badge.name}
          className="trust-badge"
          variants={itemVariants}
        >
          <img
            src={badge.image}
            alt={badge.name}
            className="trust-badge-image"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TrustBadges;
