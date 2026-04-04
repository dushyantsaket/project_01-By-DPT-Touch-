import React from 'react';
import { motion } from 'framer-motion';
import {
   Wrench, ShieldCheck, ChevronRight,
   RotateCw, Hammer, Clock, Shield, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandCollaboration from './BrandCollaboration';

const constructionEquipment = [
  {
    id: 'vib-850',
    name: 'Akari 850W Concrete Vibrator 35Mm',
    type: 'Concrete Vibrator',
    image: 'https://unboxtools.com/wp-content/uploads/2024/08/850-1-300x300.jpg',
    url: 'https://unboxtools.com/product/akari-850w-vibrator-35mm-armature/',
    power: '850W',
    desc: 'High-frequency internal vibrator for concrete compaction. Ideal for slabs and columns.'
  },
  {
    id: 'vib-900',
    name: 'Akari 900W Concrete Vibrator 35Mm',
    type: 'Concrete Vibrator',
    image: 'https://unboxtools.com/wp-content/uploads/2024/12/900W-1-300x300.jpg',
    url: 'https://unboxtools.com/product/akari-900w-vibrator-35mm-armature/',
    power: '900W',
    desc: 'Professional 900W vibrator for consistent concrete densification on construction sites.'
  },
  {
    id: 'vib-1400',
    name: 'Akari 1400W Concrete Vibrator 50Mm',
    type: 'Concrete Vibrator',
    image: 'https://unboxtools.com/wp-content/uploads/2024/12/1400W-1-300x300.jpg',
    url: 'https://unboxtools.com/product/akari-1400w-vibrator-50mm-armature/',
    power: '1400W',
    desc: '1400W heavy-duty vibrator with 50mm needle for large pour applications.'
  },
  {
    id: 'vib-2200',
    name: 'Akari 2200W Concrete Vibrator 50Mm',
    type: 'Concrete Vibrator',
    image: 'https://unboxtools.com/wp-content/uploads/2024/12/ev2200-1-300x300.jpg',
    url: 'https://unboxtools.com/product/akari-2200w-vibrator-50mm-armature/',
    power: '2200W',
    desc: 'Industrial 2200W vibrator for deep concrete foundation work and retaining walls.'
  },
  {
    id: 'vib-frame',
    name: 'Akari 2400W Frame Vibrator 50Mm',
    type: 'Frame Vibrator',
    image: 'https://unboxtools.com/wp-content/uploads/2024/12/Akari-2400W-Frame-Vibrator-50Mm-Armature-1-300x300.png',
    url: 'https://unboxtools.com/product/akari-2400w-frame-vibrator-50mm-armature/',
    power: '2400W',
    desc: 'External frame vibrator designed for precast panels, tunnel linings, and mould vibration.'
  },
  {
    id: 'mixer-ff160',
    name: 'Akari FF160 Paint & Mortar Mixer',
    type: 'Mixer',
    image: 'https://unboxtools.com/wp-content/uploads/2024/07/FF160-1-300x300.jpg',
    url: 'https://unboxtools.com/product/akari-ff160-paint-mixer-armature/',
    power: 'Electric',
    desc: 'Heavy-duty electric mixer for paint, plaster, mortar, and adhesive compounds.'
  }
];

const serviceBrands = [
   { company: 'BSCPOWER', logoText: 'BSC | BSCPOWER | BEST POWER TOOLS' },
   { company: 'KEIL', logoText: 'KEIL | R | Chainsaw' },
   { company: 'BOSCH', logoText: 'BOSCH | Invented for life' },
   { company: 'ROBOT POWER', logoText: 'ROBOT | POWER | Make the World' },
   { company: 'GAOCHENG', logoText: 'GAOCHENG | POWER TOOLS' },
   { company: 'R IDEAL', logoText: 'R ideal | POWERTOOLS' },
   { company: 'ENDICO', logoText: 'We think differently | ENDICO | R | POWER TOOLS (INDIA)' },
   { company: 'TOTAL', logoText: 'TOTAL | One-Stop Tools Station' },
   { company: 'HIGGO', logoText: '# HIGGO | Make the World in Your Hands' },
   { company: 'SMART ENGINEERING', logoText: 'SMART ENGINEERING' },
   { company: 'GAOCHENG BETTER PERFORMANCE', logoText: 'POWER | Better Performance Series By Gaocheng' }
];

const serviceCards = [
   { 
      id: 1, 
      title: 'Tool Sales', 
      icon: Zap, 
      desc: 'Premium industrial equipment procurement with full warranty support.', 
      link: '/products',
      img: 'https://bscpowertools.com/wp-content/uploads/2023/12/BSC-7200-Chainsaw-min.jpg' 
   },
   { 
      id: 2, 
      title: 'Strategic Repair', 
      icon: Wrench, 
      desc: 'Expert restoration of professional power tools across all major brands.', 
      link: '/services',
      img: 'https://bscpowertools.com/wp-content/uploads/2023/12/BSC-KS-350-min.jpg'
   },
   { 
      id: 3, 
      title: 'Component Replacement', 
      icon: Hammer, 
      desc: 'Original spare parts integration for extended lifespan.', 
      link: '/categories',
      img: 'https://bscpowertools.com/wp-content/uploads/2023/12/BSC-BS-20L-min.jpg' 
   }
];

const ServicesSection = () => {
   return (
      <section className="py-24 bg-gray-50 overflow-hidden px-4">
         <div className="container mx-auto">

            {/* Entrance Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-10">
               <div className="max-w-2xl">
                  <motion.span
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     className="text-industrial-red font-black tracking-widest uppercase text-xs mb-4 block"
                  >
                     Service Intelligence
                  </motion.span>
                  <motion.h2
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1 }}
                     className="text-4xl md:text-5xl font-black tracking-tighter text-black uppercase leading-[1.1]"
                  >
                     We Provide <span className="text-industrial-red">Service For All</span> Major Brands
                  </motion.h2>
                  <div className="mt-8 relative rounded-3xl overflow-hidden shadow-2xl border-4 border-industrial-red/20 group aspect-video lg:aspect-auto lg:h-48 mb-8">
                     <video 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                        src="https://bscpowertools.com/wp-content/uploads/2024/02/BSC-7200-Chainsaw.mp4#t=5" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                     />
                     <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-8">
                        <p className="text-white font-black uppercase tracking-widest text-[10px] bg-industrial-red px-3 py-1.5 rounded-full inline-flex items-center gap-2">
                           <RotateCw size={12} className="animate-spin" /> High-Torque Performance Support
                        </p>
                     </div>
                  </div>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs leading-relaxed max-w-lg">
                     Our technical command centers are equipped to handle complex repairs and maintenance for industrial-grade armaments.
                  </p>
               </div>
               <Link
                  to="/contact"
                  className="bg-industrial-red text-white px-10 py-5 rounded-full font-black text-xs tracking-widest uppercase flex items-center justify-center gap-3 shadow-xl hover:bg-red-700 transition-all hover:scale-105 active:scale-95"
               >
                  BOOK SERVICE APPOINTMENT
                  <RotateCw size={18} className="animate-spin duration-[5s]" />
               </Link>
            </div>

            {/* Brand Grid Banner */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100 mb-20 overflow-hidden relative">
               <div className="absolute top-0 right-0 p-8 text-gray-50 opacity-10">
                  <Shield size={200} />
               </div>
               <div className="relative z-10">
                  <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-8 pb-4 border-b border-gray-50">Authorized Support Ecosystem</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                     {serviceBrands.map((brand, idx) => (
                        <div key={idx} className="flex flex-col gap-1 px-4 py-3 bg-gray-50 rounded-xl hover:bg-red-50 hover:text-industrial-red transition-all cursor-crosshair min-w-0">
                           <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-industrial-red flex-shrink-0" />
                              <span className="text-[11px] font-black uppercase tracking-widest truncate">{brand.company}</span>
                           </div>
                           <span className="text-[9px] font-bold text-gray-400 truncate mt-1 uppercase pl-3">{brand.logoText}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Brand Collaboration Marquee */}
            <div className="mb-20 rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 bg-white">
               <BrandCollaboration />
            </div>

            {/* Service Core Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {serviceCards.map((card, idx) => (
                  <motion.div
                     key={card.id}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     className="group p-10 bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all border border-transparent hover:border-industrial-red cursor-pointer overflow-hidden relative"
                     onClick={() => window.location.href = card.link}
                  >
                     <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity">
                        <img src={card.img} alt="" className="w-full h-full object-cover" />
                     </div>
                     <div className="relative z-10">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mb-10 group-hover:bg-red-50 group-hover:text-industrial-red transition-all">
                           <card.icon size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-black tracking-tighter uppercase mb-4 transition-colors group-hover:text-industrial-red">{card.title}</h3>
                        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest leading-relaxed mb-10">
                           {card.desc}
                        </p>
                        <Link
                           to={card.link}
                           className="w-full bg-industrial-dark text-white py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl active:scale-95"
                        >
                           {card.id === 1 ? 'VISIT SALES SHOWROOM' : 'VIEW SERVICE PROTOCOLS'}
                           <ChevronRight size={14} />
                        </Link>
                     </div>
                  </motion.div>
               ))}
            </div>

            {/* DEWALT IMPACT CONNECT Innovation Section */}
            <div className="mt-20 rounded-[3rem] bg-industrial-dark overflow-hidden relative group">
               <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-12 lg:p-20 flex flex-col justify-center relative z-10">
                     <span className="text-industrial-red font-black tracking-widest uppercase text-xs mb-6 block">Innovation Spotlight</span>
                     <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
                        DEWALT® <br />
                        <span className="text-industrial-red">IMPACT CONNECT™</span>
                     </h2>
                     <p className="text-gray-400 font-bold uppercase tracking-widest text-xs leading-relaxed mb-12 max-w-md">
                        Revolutionizing the jobsite with the next generation of power tool connectivity and efficiency. Professional grade solutions for elite craftsmen.
                     </p>
                     <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-industrial-red/20 flex items-center justify-center text-industrial-red">
                              <Zap size={20} />
                           </div>
                           <span className="text-white text-[10px] font-black uppercase tracking-widest">High Torque</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-industrial-red/20 flex items-center justify-center text-industrial-red">
                              <ShieldCheck size={20} />
                           </div>
                           <span className="text-white text-[10px] font-black uppercase tracking-widest">Pro Warranty</span>
                        </div>
                     </div>
                  </div>
                  <div className="relative h-[400px] lg:h-auto">
                     <video 
                        className="absolute inset-0 w-full h-full object-cover"
                        src="https://bynder.sbdinc.com/m/41fac8df89bf6894/original/DW_IMPACT-CONNECT-91sec-16x9-EN_VIV1.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                     />
                     <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-industrial-dark lg:to-transparent"></div>
                  </div>
               </div>
            </div>

            {/* Professional DCA Showcase */}
            <div className="mt-40">
               <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
                  <div className="max-w-xl">
                     <span className="text-industrial-red font-black tracking-widest uppercase text-xs mb-3 block">Global Partnership</span>
                     <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-black uppercase leading-tight">
                        Authorized <span className="text-industrial-red">DCA Showcase</span>
                     </h3>
                     <p className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-xs leading-relaxed">
                        Industry-leading performance powered by Dongcheng engineering. Providing Global Standard solutions for the Indian market.
                     </p>
                  </div>
               </div>
               
               <div className="relative rounded-[3rem] overflow-hidden bg-black aspect-video lg:h-[500px] border-8 border-gray-50 shadow-2xl group mb-20">
                  <video 
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2000ms]"
                     src="https://dongcheng.obs.ap-southeast-1.myhuaweicloud.com/cms/2024/7/27/1724728225802/DCA网页视频13 8.19.mp4"
                     autoPlay
                     loop
                     muted
                     playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center p-12">
                     <div className="text-center transform translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
                        <img 
                           src="https://www.stihl.com/content/dam/stihl/media/pr---hr-category/corporate-communications/company/dealer/36828.jpg" 
                           alt="Professional Dealer" 
                           className="w-24 h-24 rounded-full border-4 border-industrial-red mx-auto mb-6 object-cover shadow-2xl"
                        />
                        <h4 className="text-white font-black text-3xl md:text-5xl uppercase tracking-tighter mb-4">Trusted Industrial Partner</h4>
                        <p className="text-industrial-red font-black tracking-[0.2em] uppercase text-xs">AUTHORIZED DEALER & SERVICE CENTER</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* ── Small Construction Equipment ── */}
            <div className="mt-20">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
                <div>
                  <span className="text-industrial-red font-black tracking-widest uppercase text-xs mb-3 block">Equipment Catalog</span>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-black uppercase leading-tight">
                    Small Construction <span className="text-industrial-red">Equipments</span>
                  </h3>
                  <p className="mt-3 text-gray-400 font-bold uppercase tracking-widest text-[10px] max-w-md">
                    Compactors, concrete vibrators, and mixers — built for the site.
                  </p>
                </div>
                <Link
                  to="/products"
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-industrial-red hover:text-red-700 transition-colors"
                >
                  VIEW ALL EQUIPMENT <ChevronRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {constructionEquipment.map((item, idx) => (
                  <motion.a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="group bg-white rounded-[1.75rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-industrial-red transition-all overflow-hidden flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative bg-gray-50 flex items-center justify-center p-6 h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Type badge */}
                      <span className="absolute top-3 left-3 bg-industrial-dark text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                        {item.type}
                      </span>
                      {/* Power badge */}
                      <span className="absolute top-3 right-3 bg-industrial-red text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Zap size={9} /> {item.power}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="p-6 flex flex-col flex-1">
                      <h4 className="text-sm font-black uppercase tracking-tighter text-black group-hover:text-industrial-red transition-colors leading-tight mb-2">
                        {item.name}
                      </h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed flex-1">
                        {item.desc}
                      </p>
                      <div className="mt-5 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-industrial-red">
                        View Product <ChevronRight size={12} />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 opacity-60">
               <div className="flex items-center gap-4 group cursor-help">
                  <Clock size={32} className="text-gray-400 group-hover:text-industrial-red transition-colors" />
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-black">24-Hour TAT</p>
                     <p className="text-[9px] font-bold uppercase tracking-tighter text-gray-400">Response Guarantee</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 group cursor-help lg:border-l border-gray-200 lg:pl-8">
                  <ShieldCheck size={32} className="text-gray-400 group-hover:text-industrial-red transition-colors" />
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-black">Genuine Parts</p>
                     <p className="text-[9px] font-bold uppercase tracking-tighter text-gray-400">100% Original</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 group cursor-help lg:border-l border-gray-200 lg:pl-8">
                  <Hammer size={32} className="text-gray-400 group-hover:text-industrial-red transition-colors" />
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-black">Expert Techs</p>
                     <p className="text-[9px] font-bold uppercase tracking-tighter text-gray-400">Certified Workforce</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 group cursor-help lg:border-l border-gray-200 lg:pl-8">
                  <RotateCw size={32} className="text-gray-400 group-hover:text-industrial-red transition-colors text-industrial-red" />
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-black">Service Warranty</p>
                     <p className="text-[9px] font-bold uppercase tracking-tighter text-gray-400">Post-Repair Support</p>
                  </div>
               </div>
            </div>

         </div>
      </section>
   );
};

export default ServicesSection;
