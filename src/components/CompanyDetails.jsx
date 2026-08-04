import React from 'react';
import { Building2, Phone, MapPin, Instagram, ExternalLink, Shield } from 'lucide-react';

const CompanyDetailsCard = ({ company }) => {
  return (
    <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {company.featuredImage && (
        <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
          <img 
            src={company.featuredImage} 
            alt={company.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', display: 'flex', alignItems: 'end', padding: '16px' }}>
             <div style={{ background: '#dc2626', color: '#fff', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', padding: '4px 10px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={12} /> Trusted Industrial Partner
             </div>
          </div>
        </div>
      )}
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '16px', marginBottom: '20px' }}>
          <div style={{ width: '48px', height: '48px', background: '#111', color: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Building2 size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#111', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '2px' }}>{company.name}</h3>
            <p style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{company.tagline}</p>
          </div>
        </div>

        <p style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600, lineHeight: 1.6, marginBottom: '24px' }}>
          {company.description}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {company.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f9fafb', padding: '10px', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
              <Phone size={14} style={{ color: '#dc2626' }} />
              <a href={`tel:${company.phone}`} style={{ fontSize: '12px', fontWeight: 700, color: '#111', textDecoration: 'none' }}>
                {company.phone}
              </a>
            </div>
          )}
          {company.address && (
            <div style={{ display: 'flex', alignItems: 'start', gap: '10px', background: '#f9fafb', padding: '10px', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
              <MapPin size={14} style={{ color: '#dc2626', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#111' }}>{company.address}</span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: 'auto' }}>
          {company.instagram && (
            <a 
              href={company.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'linear-gradient(to r, #833ab4, #fd1d1d, #fcb045)', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}
            >
              <Instagram size={14} /> Instagram
            </a>
          )}
          {company.indiamart && (
            <a 
              href={company.indiamart} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#111', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}
            >
              <ExternalLink size={14} /> IndiaMART
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const CompanyDetailsSection = () => {
  const companies = [
    {
      name: "Dushyant Power Tools",
      tagline: "Authorized Industrial Equipment Marketplace",
      featuredImage: "https://www.stihl.com/content/dam/stihl/media/pr---hr-category/corporate-communications/company/dealer/36828.jpg",
      description: "Our Trusted platform is where you can buy and sell any industrial equipment with confidence. We specialize in DeWalt, Dongcheng, and BSC Power tools, offering professional repair services and genuine spare parts for all major brands.",
      phone: "+91 97540 15503",
      address: "45, Sidhi, Madhya Pradesh 486661",
      instagram: "https://www.instagram.com/dushyant_power_tools_sidhi/",
      indiamart: "https://www.indiamart.com/dushyant-power-tools"
    },
    {
      name: "Dushyant Furniture Mart",
      tagline: "Premium Home & Office Furniture Solutions",
      featuredImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600",
      description: "Crafting timeless elegance since 2009. We are Sidhi's premier destination for high-quality wooden furniture, modern office setups, and custom home decor solutions that blend functionality with aesthetic appeal.",
      phone: "+91 93993 57998",
      address: "45, Sidhi, Madhya Pradesh 486661",
      instagram: "https://www.instagram.com/dushyant_furniture_mart/",
      indiamart: "https://www.indiamart.com/dushyant-furniture-mart"
    }
  ];

  return (
    <section style={{ padding: '64px 0', background: '#fff' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f9fafb', border: '1px solid #e5e7eb', padding: '6px 16px', borderRadius: '100px', marginBottom: '16px' }}>
            <Building2 size={14} style={{ color: '#dc2626' }} />
            <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111' }}>Our Companies</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.04em', color: '#111', marginBottom: '16px' }}>
            Trusted <span style={{ color: '#dc2626' }}>Business Family</span>
          </h2>
          <p style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600, maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Operating multiple successful businesses in Sidhi, MP. From industrial tools to premium furniture, we're committed to quality and customer satisfaction.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {companies.map((company, index) => (
            <CompanyDetailsCard key={index} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyDetailsSection;
export { CompanyDetailsCard, CompanyDetailsSection, CompanyDetailsCard as InstagramCompanyCard };