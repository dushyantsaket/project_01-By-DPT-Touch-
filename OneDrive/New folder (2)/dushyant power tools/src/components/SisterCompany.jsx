import React from 'react';
import { Instagram, MapPin, ExternalLink, Award, Users, Clock, ShoppingBag } from 'lucide-react';

const SisterCompany = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
          
          {/* Visual Elements */}
          <div className="lg:w-1/2 relative group">
            <div className="absolute -inset-4 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-yellow-500/20 transition-all duration-700"></div>
            
            <div className="relative z-10 p-2 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform group-hover:scale-[1.01] transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              <img
                src="https://lh3.googleusercontent.com/gps-cs-s/AHVAweqlU_4KbabcR3bC52eil-Xkq_X5PxQvPE_x-_n0q_OjOGPi3rRLzIMefGe7dDLMO_TqLAxmIYE2uCSLsZKptDuvg7aBGsPItZ42bTtGrJBO5hWKUi_-JbeQGMzZgxhNP56pPjjZKuA6S3_o=s1360-w1360-h1020-rw"
                alt="Dushyant Furniture Mart Storefront"
                className="w-full h-[500px] object-cover rounded-2xl"
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
                 <span className="bg-yellow-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                   Since 2009
                 </span>
                 <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur text-white flex items-center justify-center border border-white/30">
                       <Award size={14} />
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur text-white flex items-center justify-center border border-white/30">
                       <Users size={14} />
                    </div>
                 </div>
              </div>
            </div>
            
            {/* Small Floating Card */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 hidden md:block max-w-[240px] animate-bounce-slow">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-sm font-black text-yellow-500">★</span>
                  ))}
                </div>
                <span className="text-[10px] font-bold text-gray-400">4.8 Rating</span>
              </div>
              <p className="text-xs text-gray-600 font-medium leading-relaxed italic">
                "Best quality products and service in Sidhi Furniture Mart."
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-yellow-500"></span>
              <span className="text-yellow-600 font-bold tracking-[0.2em] uppercase text-xs">Sister Company</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-industrial-dark mb-8 uppercase tracking-tight leading-tight">
              Dushyant <span className="text-yellow-600">Furniture Mart</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed font-medium">
              Established in October 2009, Dushyant Furniture Mart is the premier destination for premium home and office decor in Sidhi. 
              Known for craftsmanship and durability, we specialize in high-quality wooden furniture that brings elegance to every space.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 group/item hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0 group-hover/item:bg-yellow-500 group-hover/item:text-white transition-colors">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-1 uppercase text-sm tracking-wide">Products</h4>
                  <p className="text-xs text-gray-500 font-bold leading-relaxed">Sofa Sets, Designer Beds, Wooden Doors & Diwans</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 group/item hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0 group-hover/item:bg-yellow-500 group-hover/item:text-white transition-colors">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-1 uppercase text-sm tracking-wide">Experience</h4>
                  <p className="text-xs text-gray-500 font-bold leading-relaxed">Serving Sidhi since 2009 with excellence</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <a 
                href="https://www.instagram.com/dushyant_furniture_mart/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-pink-500/20 hover:scale-105 transition-all active:scale-95"
              >
                <Instagram size={18} />
                Shop on Instagram
              </a>
              
              <div className="flex gap-4">
                 <a 
                   href="https://www.indiamart.com/dushyant-furniture-mart" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="px-4 h-11 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-sm font-bold text-xs"
                   title="IndiaMART Profile"
                 >
                   <ExternalLink size={16} />
                   IndiaMART
                 </a>
                 <a 
                   href="https://www.google.com/maps?daddr=45,+Sidhi,+Madhya+Pradesh+486661" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="px-4 h-11 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center gap-2 hover:bg-green-600 hover:text-white transition-all shadow-sm font-bold text-xs"
                   title="Visit Us"
                 >
                   <MapPin size={16} />
                   Visit Shop
                 </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
          50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite;
        }
      `}} />
    </section>
  );
};

export default SisterCompany;
