import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Award, Calendar, Package } from 'lucide-react';
import { brands } from '../components/BrandCollaboration';

const BrandDetail = () => {
  const { id } = useParams();
  
  const brand = useMemo(() => {
    return brands.find(b => b.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id);
  }, [id]);

  if (!brand) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-black uppercase text-industrial-dark mb-4">Brand Partnership Not Found</h2>
        <Link to="/" className="text-industrial-red font-bold hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </div>
    );
  }

  // Generate a deterministic number of years based on the brand's name length to persist cleanly
  const partnershipYears = (brand.name.length % 15) + 5; 

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24">
      {/* Background graphic */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-industrial-red/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Navigation */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-industrial-red font-bold uppercase tracking-widest text-xs mb-10 transition-colors">
          <ArrowLeft size={16} /> Backward Reference
        </Link>

        {/* Content Block */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Brand Visual Identity */}
          <div className="lg:w-2/5 bg-gray-50 p-12 lg:p-20 flex flex-col items-center justify-center relative border-b lg:border-b-0 lg:border-r border-gray-100 z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_100%)] pointer-events-none"></div>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="w-48 h-48 sm:w-64 sm:h-64 bg-white rounded-3xl shadow-xl flex items-center justify-center p-8 relative z-20"
            >
               <img 
                 src={brand.logo} 
                 alt={brand.alt || brand.name} 
                 className="max-w-full max-h-full object-contain drop-shadow-sm" 
                 onError={(e) => {
                   e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(brand.name)}&background=f3f4f6&color=374151&bold=true`;
                 }}
               />
            </motion.div>
          </div>

          {/* Brand Data */}
          <div className="lg:w-3/5 p-10 lg:p-16 flex flex-col justify-center relative z-20">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                 <div className="h-1.5 w-8 bg-industrial-red rounded-full"></div>
                 <span className="text-industrial-red font-black tracking-widest uppercase text-[10px]">Official Global Partner</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black tracking-tighter uppercase mb-6 leading-none">
                {brand.name}
              </h1>
              
              <p className="text-gray-500 font-medium text-lg leading-relaxed mb-10 max-w-lg">
                {brand.description || "A premier manufacturer of professional grade industrial tools, collaborating closely with our technical deployment teams to deliver world-class infrastructure solutions."}
              </p>

              {/* Partnership Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-full bg-red-50 text-industrial-red flex items-center justify-center flex-shrink-0">
                      <Calendar size={24} />
                   </div>
                   <div>
                      <p className="text-2xl font-black text-industrial-dark leading-none mb-1">{partnershipYears}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-tight">Years Active<br/>Bonding With Us</p>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                      <Award size={24} />
                   </div>
                   <div>
                      <p className="text-2xl font-black text-industrial-dark leading-none mb-1">Tier 1</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-tight">Supplier<br/>Classification Rating</p>
                   </div>
                </div>
              </div>
              
              {/* Product CTA */}
              <div className="mt-10 pt-10 border-t border-gray-100 flex items-center gap-6">
                 <Link to="/products" className="bg-industrial-dark hover:bg-black text-white px-8 py-4 rounded-full font-black text-xs tracking-widest uppercase shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
                    <Package size={18} />
                    View Associated Inventory
                 </Link>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDetail;
