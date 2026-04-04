import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bladesData } from '../data/blades';
import { useAuth } from '../context/AuthContext';
import { Disc, Info, Tag, Layers, Droplet } from 'lucide-react';

const BladesCollection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  const categories = ['All', ...new Set(bladesData.map(b => b.category))];
  
  const filteredBlades = activeCategory === 'All' 
    ? bladesData 
    : bladesData.filter(b => b.category === activeCategory);

  return (
    <section id="blades-collection" className="py-24 bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-industrial-red/10 text-industrial-red mb-4">
              <Tag size={16} />
              <span className="font-black text-xs tracking-widest uppercase">Premium Accessories</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight text-industrial-dark leading-none">
              Professional <br /><span className="text-industrial-red">Blades</span> Collection
            </h2>
            <p className="max-w-2xl text-lg text-gray-600 leading-relaxed font-medium">
              Cut through the toughest materials with our high-grade diamond and TCT saw blades.
              Engineered for precision, speed, and extended service life in extreme environments.
            </p>
            <div className="w-24 h-1.5 bg-industrial-red mt-8 rounded-full hidden lg:block"></div>
          </div>
          
          <div className="w-full lg:w-[450px] relative">
            <div className="aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-industrial-red/20 group">
              <video 
                src="https://bscpowertools.com/wp-content/uploads/2024/02/BSC-7200-Chainsaw.mp4#t=5" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-700"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center ring-1 ring-white/10 rounded-[2.5rem]">
                 <div className="w-16 h-16 bg-industrial-red/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform mb-4">
                    <Disc className="text-white animate-spin-slow" size={32} />
                 </div>
                 <p className="text-white font-black uppercase text-[10px] tracking-widest bg-black/40 px-3 py-1.5 rounded-full">High-Speed Precision</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-sm border ${
                activeCategory === category
                  ? 'bg-industrial-red text-white border-industrial-red shadow-industrial-red/30 shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-industrial-red hover:text-industrial-red hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blades Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBlades.map((blade) => (
            <div key={blade.id} className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-industrial-red/50 hover:shadow-[0_10px_40px_rgba(220,38,38,0.15)] transition-all duration-300 group overflow-hidden flex flex-col">
              
              {/* Product Image Box */}
              <div className="relative h-64 bg-gray-50 p-6 flex justify-center items-center overflow-hidden border-b border-gray-100 group-hover:bg-gray-100/50 transition-colors">
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-industrial-dark border shadow-sm">
                  {blade.sku}
                </div>
                <img 
                  src={blade.image_url} 
                  alt={blade.name} 
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 will-change-transform"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=400";
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-bold text-industrial-red mb-2 uppercase tracking-wider">
                  {blade.sub_category}
                </div>
                <h3 className="text-xl font-black text-industrial-dark mb-3 line-clamp-1">
                  {blade.name}
                </h3>
                
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                  {blade.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Disc className="text-industrial-red" size={16} />
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold">Size</div>
                      <div className="text-sm font-semibold">{blade.blade_size}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="text-industrial-red" size={16} />
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold">{blade.grit ? 'Grit' : 'Teeth'}</div>
                      <div className="text-sm font-semibold">{blade.grit || blade.teeth_count}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex items-start gap-2 mb-4 bg-industrial-light p-3 rounded-lg">
                    <Info className="text-industrial-dark shrink-0 mt-0.5" size={14} />
                    <div className="text-xs font-medium text-gray-700">
                      <span className="font-bold">Application:</span> {blade.application}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      {isLoggedIn ? (
                        (blade.price_inr || blade.sale_price) && blade.price_inr !== "Login to See Price" ? (
                          <>
                            <div className="text-xs text-gray-500 font-bold uppercase mb-1">Price</div>
                            <div className="text-2xl font-black text-industrial-red">
                              {blade.sale_price || `₹${blade.price_inr}`}
                            </div>
                            {blade.regular_price && blade.regular_price !== blade.sale_price && (
                              <div className="text-xs text-gray-400 line-through font-bold">
                                {blade.regular_price}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-sm font-bold text-gray-500 italic mt-2">Price on Request</div>
                        )
                      ) : (
                        <div 
                          onClick={() => navigate('/login')}
                          className="text-sm font-bold text-industrial-red underline cursor-pointer mt-2 tracking-widest leading-tight hover:text-red-700 transition"
                        >
                          Login to<br/>See Price
                        </div>
                      )}
                    </div>
                    <button className="bg-industrial-dark text-white px-5 py-2.5 rounded-lg font-bold hover:bg-industrial-red transition-colors shadow-lg shadow-industrial-dark/20 flex items-center gap-2">
                      View Details
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BladesCollection;
