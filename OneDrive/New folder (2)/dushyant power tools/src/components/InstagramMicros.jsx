import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle, Share2, ExternalLink, Building2, MapPin, Phone, ShieldCheck } from 'lucide-react';

const InstagramMicrosSection = () => {
  const instagramPosts = [
    {
      id: 1,
      image: "https://bynder.sbdinc.com/m/6c3ec0550bd57a44/Drupal_Medium-DCH733B_A7.jpg",
      likes: "2.4k",
      comments: "142",
      caption: "DeWalt SDS MAX Brushless hammer in extreme conditions. 🛠️ #DeWalt #PowerTools"
    },
    {
      id: 2,
      video: "https://dongcheng.obs.ap-southeast-1.myhuaweicloud.com/cms/2025/5/10/1749540301287/video.mp4",
      isVideo: true,
      likes: "5.8k",
      comments: "321",
      caption: "Precision in motion. Industrial performance showcase. ⚡ #Industrial #Precision"
    },
    {
      id: 3,
      image: "https://bynder.sbdinc.com/m/4cf9ca3edbb8c6a1/Drupal_Medium-DCH614B_A2.jpg",
      likes: "1.9k",
      comments: "86",
      caption: "SDS MAX Brushless combination rotary hammer performance. 💪 #Hammer #Construction"
    },
    {
      id: 4,
      image: "https://bynder.sbdinc.com/m/3de38f37cc83dcf1/Drupal_Large-DCH293X2_A1.jpg",
      likes: "3.2k",
      comments: "198",
      caption: "Cordless SDS PLUS L-shape rotary hammer. Ultimate mobility. 🏗️ #Cordless #RotaryHammer"
    },
    {
      id: 5,
      image: "https://bscpowertools.com/wp-content/uploads/2023/12/BSC-KS-350-min.jpg",
      likes: "2.1k",
      comments: "94",
      caption: "High-capacity knapsack sprayers for professional forestry. Excellence by BSC Power. 🌲 #Sprayer #Forestry"
    },
    {
      id: 6,
      image: "https://bscpowertools.com/wp-content/uploads/2023/12/BSC-BS-20L-min.jpg",
      likes: "1.5k",
      comments: "112",
      caption: "Our Trusted Platform for verified industrial gear. Quality you can build on. 🏗️ #Trusted #Engineering"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 bg-industrial-dark text-white px-8 py-3 rounded-full text-sm font-black mb-8 shadow-2xl border border-white/10"
          >
            <ShieldCheck size={18} className="text-industrial-red" />
            <span className="tracking-[0.2em] uppercase text-[10px]">Certified Industrial Marketplace</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 uppercase tracking-tighter leading-tight">
            TRUSTED <span className="text-industrial-red">TRADING HUB</span>
          </h2>
          
          <div className="max-w-3xl mx-auto bg-white/50 backdrop-blur-md p-8 rounded-[2.5rem] border border-gray-100 shadow-xl relative z-10">
            <p className="text-xl md:text-2xl text-industrial-dark font-black uppercase tracking-tighter leading-tight">
               Our <span className="text-industrial-red">Trusted Platform</span> where you can <br />
               <span className="bg-industrial-red text-white px-4 py-1 inline-block -skew-x-6">BUY & SELL</span> any Industrial Equipment <br />
               with <span className="text-industrial-red underline decoration-4 underline-offset-8">100% CONFIDENCE.</span>
            </p>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-6 opacity-40">
             <div className="h-[1px] w-12 bg-industrial-dark"></div>
             <Instagram size={20} />
             <div className="h-[1px] w-12 bg-industrial-dark"></div>
          </div>
        </div>

        {/* Instagram Feed Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {instagramPosts.map((post) => (
            <a 
              key={post.id}
              href="https://www.instagram.com/dushyant_power_tools_sidhi/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
            >
              {post.isVideo ? (
                <video 
                  src={post.video} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              ) : (
                <img 
                  src={post.image} 
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              )}
              {post.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                   </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-xs font-medium mb-2 line-clamp-2">{post.caption}</p>
                  <div className="flex items-center gap-4 text-white/80 text-xs">
                    <span className="flex items-center gap-1">
                      <Heart size={12} />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={12} />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ExternalLink size={14} className="text-white" />
              </div>
            </a>
          ))}
        </div>

        {/* Company Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Power Tools Instagram Card */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <Building2 size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-1">Dushyant Power Tools</h3>
                  <p className="text-white/80 text-sm font-medium">Industrial Equipment Supplier</p>
                </div>
              </div>
              
              <p className="text-white/90 text-sm leading-relaxed mb-6 font-medium">
                Your trusted partner for professional power tools, industrial equipment, and genuine spare parts in Sidhi, MP.
              </p>
              
              <div className="flex items-center gap-3 mb-6 text-white/80 text-sm">
                <MapPin size={14} />
                <span>45, Sidhi, Madhya Pradesh 486661</span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://www.instagram.com/dushyant_power_tools_sidhi/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white text-purple-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all"
                >
                  <Instagram size={16} />
                  Follow @dushyant_power_tools_sidhi
                </a>
                <a 
                  href="tel:+919399357998" 
                  className="flex items-center gap-2 bg-white/20 backdrop-blur text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/30 transition-all"
                >
                  <Phone size={16} />
                  Call Now
                </a>
              </div>
            </div>
          </div>

          {/* Furniture Mart Instagram Card */}
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-3xl p-8 text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <Building2 size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-1">Dushyant Furniture Mart</h3>
                  <p className="text-white/80 text-sm font-medium">Premium Home & Office Furniture</p>
                </div>
              </div>
              
              <p className="text-white/90 text-sm leading-relaxed mb-6 font-medium">
                Since 2009, crafting premium wooden furniture for homes and offices in Sidhi. Quality craftsmanship meets modern design.
              </p>
              
              <div className="flex items-center gap-3 mb-6 text-white/80 text-sm">
                <MapPin size={14} />
                <span>45, Sidhi, Madhya Pradesh 486661</span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://www.instagram.com/dushyant_furniture_mart/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white text-orange-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all"
                >
                  <Instagram size={16} />
                  Follow @dushyant_furniture_mart
                </a>
                <a 
                  href="tel:+919399357998" 
                  className="flex items-center gap-2 bg-white/20 backdrop-blur text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/30 transition-all"
                >
                  <Phone size={16} />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Follow Button */}
        <div className="text-center mt-12">
          <a 
            href="https://www.instagram.com/dushyant_power_tools_sidhi/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-500 transform hover:-translate-y-1"
          >
            <Instagram size={24} />
            Follow All Our Instagram Pages
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramMicrosSection;