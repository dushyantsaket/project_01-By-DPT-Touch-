import React from 'react';
import { Building2, Phone, Mail, MapPin, Instagram, Facebook, ExternalLink, Award, Users, Clock, Globe, Shield, Star } from 'lucide-react';

const CompanyDetailsCard = ({ company, variant = 'default' }) => {
  const cardVariants = {
    default: 'bg-white border border-gray-200 shadow-lg',
    instagram: 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 shadow-xl',
    facebook: 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-xl',
    compact: 'bg-gray-50 border border-gray-100 shadow-md'
  };

  const iconVariants = {
    default: 'bg-industrial-red text-white',
    instagram: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    facebook: 'bg-blue-600 text-white',
    compact: 'bg-gray-200 text-gray-700'
  };

  return (
    <div className={`rounded-[2.5rem] overflow-hidden ${cardVariants[variant]} hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 flex flex-col`}>
      {company.featuredImage && (
        <div className="h-48 overflow-hidden relative group">
          <img 
            src={company.featuredImage} 
            alt={company.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
             <div className="bg-industrial-red text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-2">
                <Shield size={12} /> Trusted Industrial Partner
             </div>
          </div>
        </div>
      )}
      <div className="p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${iconVariants[variant]} shadow-lg`}>
            <Building2 size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-black text-gray-900 mb-1 tracking-tight uppercase tracking-tighter">{company.name}</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-relaxed">{company.tagline}</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-8 font-medium">
          {company.description}
        </p>

        <div className="grid grid-cols-1 gap-4 mb-8">
          {company.phone && (
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <Phone size={14} className="text-industrial-red flex-shrink-0" />
              <a href={`tel:${company.phone}`} className="text-xs font-bold text-gray-700 hover:text-industrial-red transition-colors">
                {company.phone}
              </a>
            </div>
          )}
          {company.address && (
            <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <MapPin size={14} className="text-industrial-red flex-shrink-0 mt-0.5" />
              <span className="text-xs font-bold text-gray-700">{company.address}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {company.instagram && (
            <a 
              href={company.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all"
            >
              <Instagram size={12} />
              Instagram
            </a>
          )}
          {company.indiamart && (
            <a 
              href={company.indiamart} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-industrial-dark text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all"
            >
              <ExternalLink size={12} />
              IndiaMART
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
      established: "2019",
      phone: "+91 93993 57998",
      email: "info@dushyantpowertools.com",
      address: "45, Sidhi, Madhya Pradesh 486661",
      instagram: "https://www.instagram.com/dushyant_power_tools_sidhi/",
      facebook: "https://www.facebook.com/dushyantpowertools",
      website: "https://dushyantpowertools.com",
      indiamart: "https://www.indiamart.com/dushyant-power-tools"
    },
    {
      name: "Dushyant Furniture Mart",
      tagline: "Premium Home & Office Furniture Solutions",
      featuredImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600",
      description: "Crafting timeless elegance since 2009. We are Sidhi's premier destination for high-quality wooden furniture, modern office setups, and custom home decor solutions that blend functionality with aesthetic appeal.",
      established: "2009",
      phone: "+91 93993 57998",
      email: "info@dushyantfurnituremart.com",
      address: "45, Sidhi, Madhya Pradesh 486661",
      instagram: "https://www.instagram.com/dushyant_furniture_mart/",
      facebook: "https://www.facebook.com/dushyantfurnituremart",
      website: "https://dushyantfurnituremart.com",
      indiamart: "https://www.indiamart.com/dushyant-furniture-mart"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white border border-gray-200 px-6 py-2.5 rounded-full text-sm font-bold mb-6 shadow-sm">
            <Building2 size={16} className="text-industrial-red" />
            <span className="text-gray-700 tracking-wider uppercase text-xs">Our Companies</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight">
            Trusted <span className="text-industrial-red">Business Family</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Operating multiple successful businesses in Sidhi, MP. From industrial tools to premium furniture, we're committed to quality and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {companies.map((company, index) => (
            <CompanyDetailsCard key={index} company={company} variant="default" />
          ))}
        </div>
      </div>
    </section>
  );
};

// Instagram-specific Company Card
const InstagramCompanyCard = ({ company }) => (
  <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
    
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
          <Building2 size={28} />
        </div>
        <div>
          <h3 className="text-2xl font-black mb-1">{company.name}</h3>
          <p className="text-white/80 text-sm font-medium">{company.tagline}</p>
        </div>
      </div>
      
      <p className="text-white/90 text-sm leading-relaxed mb-6 font-medium">
        {company.description}
      </p>
      
      <div className="flex flex-wrap gap-3">
        <a 
          href={company.instagram} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white text-purple-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all"
        >
          <Instagram size={16} />
          Follow on Instagram
        </a>
        <a 
          href={`tel:${company.phone}`} 
          className="flex items-center gap-2 bg-white/20 backdrop-blur text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/30 transition-all"
        >
          <Phone size={16} />
          Call Now
        </a>
      </div>
    </div>
  </div>
);

// Facebook-specific Company Card
const FacebookCompanyCard = ({ company }) => (
  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
    
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
          <Building2 size={28} />
        </div>
        <div>
          <h3 className="text-2xl font-black mb-1">{company.name}</h3>
          <p className="text-white/80 text-sm font-medium">{company.tagline}</p>
        </div>
      </div>
      
      <p className="text-white/90 text-sm leading-relaxed mb-6 font-medium">
        {company.description}
      </p>
      
      <div className="flex flex-wrap gap-3">
        <a 
          href={company.facebook} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all"
        >
          <Facebook size={16} />
          Follow on Facebook
        </a>
        <a 
          href={`tel:${company.phone}`} 
          className="flex items-center gap-2 bg-white/20 backdrop-blur text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/30 transition-all"
        >
          <Phone size={16} />
          Call Now
        </a>
      </div>
    </div>
  </div>
);

export { CompanyDetailsCard, CompanyDetailsSection, InstagramCompanyCard, FacebookCompanyCard };
export default CompanyDetailsSection;