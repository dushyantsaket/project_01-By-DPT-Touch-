import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Building2, MapPin, Phone, Mail, ExternalLink, ThumbsUp, MessageSquare, Share2, Users, Globe } from 'lucide-react';
import { FacebookCompanyCard } from '../components/CompanyDetails';

const FacebookPage = () => {
  const companies = [
    {
      name: "Dushyant Power Tools",
      tagline: "Leading Industrial Equipment Supplier in Sidhi, MP",
      description: "Your trusted partner for professional power tools, high-quality industrial equipment, genuine spare parts, and reliable repair services. Follow us on Facebook for company updates, job openings, and industrial news.",
      established: "2019",
      phone: "+91 93993 57998",
      email: "info@dushyantpowertools.com",
      address: "45, Sidhi, Madhya Pradesh 486661",
      instagram: "https://www.instagram.com/dushyant_power_tools_sidhi/",
      facebook: "https://www.facebook.com/dushyantpowertools",
      website: "https://dushyantpowertools.com"
    },
    {
      name: "Dushyant Furniture Mart",
      tagline: "Premium Home & Office Furniture Since 2009",
      description: "Established in October 2009, we are the premier destination for premium home and office decor in Sidhi. Follow us on Facebook for furniture inspiration, customer testimonials, and community events.",
      established: "2009",
      phone: "+91 93993 57998",
      email: "info@dushyantfurnituremart.com",
      address: "45, Sidhi, Madhya Pradesh 486661",
      instagram: "https://www.instagram.com/dushyant_furniture_mart/",
      facebook: "https://www.facebook.com/dushyantfurnituremart",
      website: "https://dushyantfurnituremart.com"
    }
  ];

  const facebookFeatures = [
    { title: "Community Updates", description: "Stay connected with local news and events", icon: <Users size={24} /> },
    { title: "Customer Reviews", description: "See what our customers are saying", icon: <ThumbsUp size={24} /> },
    { title: "Direct Messaging", description: "Quick responses to your inquiries", icon: <MessageSquare size={24} /> },
    { title: "Job Openings", description: "Career opportunities at our companies", icon: <Building2 size={24} /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-2.5 rounded-full text-sm font-bold mb-8">
              <Facebook size={16} />
              <span className="tracking-wider uppercase text-xs">Connect With Us</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
              Facebook <span className="text-blue-300">Community</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium mb-10">
              Join our Facebook community for company updates, customer reviews, job opportunities, and direct communication with our team. Be part of our growing family.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.facebook.com/dushyantpowertools" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <Facebook size={20} />
                Dushyant Power Tools
              </a>
              <a 
                href="https://www.facebook.com/dushyantfurnituremart" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white/20 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all"
              >
                <Facebook size={20} />
                Dushyant Furniture Mart
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Facebook Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Why Follow Us?</h2>
            <p className="text-gray-600 font-medium">Join our community for exclusive benefits</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facebookFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center border border-blue-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Facebook Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 px-6 py-2.5 rounded-full text-sm font-bold mb-6">
              <Building2 size={16} />
              <span className="tracking-wider uppercase text-xs">Our Businesses</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Company <span className="text-blue-600">Facebook</span> Pages
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Follow our business Facebook pages for company updates, customer engagement, and professional networking.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {companies.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <FacebookCompanyCard company={company} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facebook Feed Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">
              Recent <span className="text-blue-600">Activity</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Check out our latest Facebook posts and join the conversation with our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((post) => (
              <motion.div
                key={post}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: post * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Building2 size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Dushyant Power Tools</h4>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    New stock arrival! Premium Bosch power tools now available. Visit our store for exclusive offers on industrial equipment. 💪🔧
                  </p>
                  <img 
                    src={`https://images.unsplash.com/photo-${1504917595217 + post * 1000}?w=400`} 
                    alt="Facebook Post"
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                  <div className="flex items-center justify-between text-gray-500 text-sm">
                    <span className="flex items-center gap-1">
                      <ThumbsUp size={14} className="text-blue-500" />
                      45 Likes
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare size={14} className="text-blue-500" />
                      12 Comments
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 size={14} className="text-blue-500" />
                      5 Shares
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a 
              href="https://www.facebook.com/dushyantpowertools" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 hover:shadow-2xl hover:bg-blue-700 transition-all duration-500 transform hover:-translate-y-1"
            >
              <Facebook size={20} />
              View All Posts
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6 tracking-tight">Let's Connect!</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed font-medium">
            Follow us on Facebook for the latest updates, customer reviews, and exclusive offers. Message us directly for quick responses to your inquiries.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://www.facebook.com/dushyantpowertools" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
            >
              <Facebook size={20} />
              Follow Power Tools
            </a>
            <a 
              href="https://www.facebook.com/dushyantfurnituremart" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white/20 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all"
            >
              <Facebook size={20} />
              Follow Furniture Mart
            </a>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/70 text-sm font-medium">
              Or contact us directly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <a href="tel:+919399357998" className="flex items-center justify-center gap-2 text-white hover:text-blue-200 transition-colors">
                <Phone size={16} />
                +91 93993 57998
              </a>
              <a href="mailto:info@dushyantpowertools.com" className="flex items-center justify-center gap-2 text-white hover:text-blue-200 transition-colors">
                <Mail size={16} />
                info@dushyantpowertools.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FacebookPage;