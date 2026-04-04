import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Products from '../components/Products';
import ProductCategories from '../components/ProductCategories';
import BladesCollection from '../components/BladesCollection';
import Stats from '../components/Stats';
import WhyChooseUs from '../components/WhyChooseUs';
import Reviews from '../components/Reviews';
import InstagramMicrosSection from '../components/InstagramMicros';
import CompanyDetailsSection from '../components/CompanyDetails';
import ProfessionalSolutions from '../components/ProfessionalSolutions';
import BrandCollaboration from '../components/BrandCollaboration';
import SparePartsSection from '../components/SparePartsSection';
import ServicesSection from '../components/ServicesSection';
import IndustrialFeatured from '../components/IndustrialFeatured';

const PageSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const Home = () => {
  return (
    <div className="overflow-hidden bg-white">
      <Hero />
      
      <PageSection>
        <ProfessionalSolutions />
      </PageSection>

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
      </PageSection>

      <PageSection>
        <SparePartsSection />
      </PageSection>

      <PageSection>
        <ServicesSection />
      </PageSection>

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
