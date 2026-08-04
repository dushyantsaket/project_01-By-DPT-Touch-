import React from "react";
import { motion } from "framer-motion";

const brands = [
  { name: "Bosch", logo: "/images/brands/bosch.png" },
  { name: "DeWalt", logo: "/images/brands/dewalt.png" },
  { name: "Makita", logo: "/images/brands/makita.png" },
  { name: "Ingco", logo: "/images/brands/ingco.png" },
  { name: "Total", logo: "/images/brands/total.png" },
  { name: "DCA", logo: "/images/brands/dca.png" },
  { name: "Hitachi", logo: "/images/brands/hitachi.png" },
  { name: "KPT", logo: "/images/brands/kpt.png" },
  { name: "Dongcheng", logo: "/images/brands/dongcheng.png" },
  { name: "Ralli Wolf", logo: "/images/brands/ralli-wolf.png" },
  { name: "Yato", logo: "/images/brands/yato.png" },
  { name: "Stanley Black & Decker", logo: "/images/brands/stanley.png" },
];

const BrandGrid = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="brand-grid-container"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {brands.map((brand) => (
        <motion.div
          key={brand.name}
          className="brand-logo-item"
          variants={itemVariants}
        >
          <img src={brand.logo} alt={brand.name} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BrandGrid;
