import React from 'react';
import ServicesList from '../components/Services';
import Contact from '../components/Contact';
import ServiceRequestForm from '../components/ServiceRequestForm';
import { motion } from 'framer-motion';

const ServicesPage = () => {
  return (
    <div className="pt-20 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        <ServicesList />
        <ServiceRequestForm />
        <Contact />
      </motion.div>
    </div>
  );
};

export default ServicesPage;
