import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Hammer, Scissors, Zap, ChevronRight, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const spareParts = [
  { id: 'grinder', name: 'Grinder Spare Parts', count: 120, icon: Settings, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'hammer', name: 'Demolition Hammer Spare', count: 85, icon: Hammer, color: 'text-industrial-red', bg: 'bg-red-50' },
  { id: 'cutter', name: 'Cutter Spare Parts', count: 64, icon: Scissors, color: 'text-green-500', bg: 'bg-green-50' },
  { id: 'welding', name: 'Welding Machine Spare', count: 42, icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
];

const SparePartsSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-16 px-4 max-w-2xl mx-auto">
           <motion.span 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="text-industrial-red font-black tracking-widest uppercase text-xs mb-4 block"
           >
             Component Ecosystem
           </motion.span>
           <motion.h2 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-5xl font-black tracking-tighter text-black uppercase leading-[1.1]"
           >
             Strategic <span className="text-industrial-red underline decoration-transparent group-hover:decoration-industrial-red transition-all">Spare Parts</span> Range
           </motion.h2>
           <p className="mt-8 text-gray-400 font-bold uppercase tracking-widest text-xs leading-relaxed">
              We provide original components for all major brands ensuring maximum tool lifespan.
           </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {spareParts.map((part, idx) => (
             <motion.div 
               key={part.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               className="group relative bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-gray-200 transition-all cursor-pointer overflow-hidden border-b-4 hover:border-b-industrial-red active:scale-95 duration-500"
             >
                <div className={`w-16 h-16 ${part.bg} rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform`}>
                   <part.icon size={28} className={part.color} />
                </div>
                
                <h3 className="text-xl font-black text-black tracking-tighter uppercase mb-2 group-hover:text-industrial-red transition-colors">{part.name}</h3>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-10">{part.count}+ Original SKU Assets</p>

                <Link 
                  to={`/spare-parts/${part.id}`} 
                  className="flex items-center gap-3 text-industrial-red font-black text-xs tracking-widest uppercase group/link"
                >
                   EXPLORE RANGE
                   <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
                </Link>

                <div className="absolute top-8 right-8 text-gray-100 opacity-20 transform -rotate-12 group-hover:rotate-0 transition-transform">
                   <Package size={80} />
                </div>
             </motion.div>
           ))}
        </div>

        {/* Brand Banner */}
        <div className="mt-20 p-8 md:p-12 bg-industrial-dark rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-industrial-red opacity-5 transform -rotate-45 -translate-y-1/2 -translate-x-1/2 scale-150"></div>
           <div className="relative z-10 flex items-center gap-6">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-industrial-red shadow-lg">
                 <Settings size={32} className="animate-spin duration-[10s]" />
              </div>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase max-w-sm">
                 Seeking a Specific Component? Connect with Our <span className="text-industrial-red underline decoration-transparent group-hover:decoration-industrial-red transition-all">Support Desk</span>
              </h4>
           </div>
           <Link 
             to="/contact" 
             className="relative z-10 bg-white text-black px-10 py-5 rounded-pull rounded-full font-black text-xs tracking-widest uppercase hover:bg-industrial-red hover:text-white transition-all shadow-xl active:scale-95 flex items-center gap-3"
           >
              GET TECHNICAL SUPPORT
              <ChevronRight size={18} />
           </Link>
        </div>

      </div>
    </section>
  );
};

export default SparePartsSection;
