import React from 'react';
import About from '../components/About';
import SisterCompany from '../components/SisterCompany';
import WhyChooseUs from '../components/WhyChooseUs';
import Stats from '../components/Stats';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="pt-20">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        <About />
        <SisterCompany />
        <WhyChooseUs />
        <Stats />
      </motion.div>
    </div>
  );
};

export default AboutPage;
