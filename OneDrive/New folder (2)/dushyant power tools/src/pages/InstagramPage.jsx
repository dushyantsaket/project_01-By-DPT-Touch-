import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Building2, MapPin, Phone, Mail, ExternalLink, Award, Users, Clock, ShoppingBag, Heart, MessageCircle } from 'lucide-react';
import { InstagramCompanyCard } from '../components/CompanyDetails';

const InstagramPage = () => {
  const companies = [
    {
      name: "Dushyant Power Tools",
      tagline: "Leading Industrial Equipment Supplier in Sidhi, MP",
      description: "Your trusted partner for professional power tools, high-quality industrial equipment, genuine spare parts, and reliable repair services. Follow us on Instagram for product showcases, offers, and industrial tips.",
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
      description: "Established in October 2009, we are the premier destination for premium home and office decor in Sidhi. Follow us on Instagram for furniture inspiration, new arrivals, and exclusive offers.",
      established: "2009",
      phone: "+91 93993 57998",
      email: "info@dushyantfurnituremart.com",
      address: "45, Sidhi, Madhya Pradesh 486661",
      instagram: "https://www.instagram.com/dushyant_furniture_mart/",
      facebook: "https://www.facebook.com/dushyantfurnituremart",
      website: "https://dushyantfurnituremart.com"
    }
  ];

  const instagramHighlights = [
    { name: "Power Tools", icon: "🔧", posts: "150+" },
    { name: "Furniture", icon: "🛋️", posts: "200+" },
    { name: "Reviews", icon: "⭐", posts: "50+" },
    { name: "Offers", icon: "🎉", posts: "30+" },
    { name: "Workshop", icon: "🏭", posts: "80+" },
    { name: "Team", icon: "👥", posts: "40+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
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
              <Instagram size={16} />
              <span className="tracking-wider uppercase text-xs">Follow Our Journey</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
              Instagram <span className="text-yellow-300">Presence</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium mb-10">
              Follow our Instagram pages for daily updates, product showcases, industrial tips, and exclusive offers. Join our community of professionals and home enthusiasts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.instagram.com/dushyant_power_tools_sidhi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <Instagram size={20} />
                @dushyant_power_tools_sidhi
              </a>
              <a 
                href="https://www.instagram.com/dushyant_furniture_mart/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white/20 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all"
              >
                <Instagram size={20} />
                @dushyant_furniture_mart
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Instagram Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Instagram Highlights</h2>
            <p className="text-gray-600 font-medium">Explore our content categories</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {instagramHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl">
                    {highlight.icon}
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-700">{highlight.name}</span>
                <span className="text-xs text-gray-500">{highlight.posts} posts</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Instagram Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-purple-100 text-purple-700 px-6 py-2.5 rounded-full text-sm font-bold mb-6">
              <Building2 size={16} />
              <span className="tracking-wider uppercase text-xs">Our Businesses</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Company <span className="text-purple-600">Instagram</span> Pages
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Follow our business Instagram pages for company updates, product launches, and exclusive content.
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
                <InstagramCompanyCard company={company} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">
              Recent <span className="text-purple-600">Posts</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Check out our latest Instagram content and join the conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((post) => (
              <motion.div
                key={post}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: post * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <img 
                    src={`https://images.unsplash.com/photo-${1504917595217 + post * 1000}?w=400`} 
                    alt="Instagram Post"
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-6 text-white">
                        <span className="flex items-center gap-2">
                          <Heart size={18} />
                          <span className="font-bold">1.2k</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <MessageCircle size={18} />
                          <span className="font-bold">89</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Instagram size={18} className="text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a 
              href="https://www.instagram.com/dushyant_power_tools_sidhi/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
            >
              <Instagram size={20} />
              View All Posts
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6 tracking-tight">Ready to Connect?</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed font-medium">
            Follow us on Instagram for daily inspiration, product updates, and exclusive offers. Join thousands of satisfied customers in our community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://www.instagram.com/dushyant_power_tools_sidhi/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
            >
              <Instagram size={20} />
              Follow Power Tools
            </a>
            <a 
              href="https://www.instagram.com/dushyant_furniture_mart/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white/20 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all"
            >
              <Instagram size={20} />
              Follow Furniture Mart
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstagramPage;