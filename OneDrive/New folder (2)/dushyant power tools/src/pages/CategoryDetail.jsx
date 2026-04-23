import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { powerToolsData } from '../data/powerTools';
import { categoriesData } from '../data/categories';
import { safetyData } from '../data/safetyData';
import { industrialExpansionData } from '../data/industrialExpansionData';
import { agricultureGardenData } from '../data/agricultureGardenData';
import { storageData } from '../data/storageData';
import { handToolsData } from '../data/handToolsData';
import { bladesData } from '../data/blades';
import { angleGrindersData } from '../data/angleGrindersData';
import { gcWheelsData } from '../data/gcWheelsData';
import { sandPaperData } from '../data/sandPaperData';
import { polishingPadsData } from '../data/polishingPadsData';
import { spannersWrenchesData } from '../data/spannersWrenchesData';
import { Filter, ChevronRight, Star, ShoppingCart, Info, Wrench, Shield, Zap, RotateCw, Heart } from 'lucide-react';

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const [activePowerFilter, setActivePowerFilter] = useState('All');

  // Likes Local Storage State
  const [likes, setLikes] = useState(() => {
    try {
      const stored = localStorage.getItem("galleryLikes");
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  });

  const handleLike = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setLikes(prev => {
      const newLikes = { ...prev, [id]: (prev[id] || 0) + 1 };
      localStorage.setItem("galleryLikes", JSON.stringify(newLikes));
      return newLikes;
    });
  };

  const category = categoriesData.find(c => c.id === categoryId) || { name: 'Category Not Found' };
  
  const products = useMemo(() => {
    let allData = [...powerToolsData ,  storageData];
    
    if (categoryId === 'safety-ppe') allData = safetyData;
    else if (categoryId === 'welding-tools') allData = industrialExpansionData;
    else if (categoryId === 'agriculture-tools') allData = agricultureGardenData;
    else if (categoryId === 'tool-storage') allData = storageData;
    else if (categoryId === 'hand-tools') allData = [...handToolsData, ...spannersWrenchesData];
    else if (categoryId === 'diamond-tech') allData = bladesData;
    else if (categoryId === 'angle-grinders') allData = angleGrindersData;
    else if (categoryId === 'abrasives') allData = [...gcWheelsData, ...sandPaperData, ...polishingPadsData];

    let filtered = allData;
    if (categoryId !== 'safety-ppe' && categoryId !== 'welding-tools' && categoryId !== 'agriculture-tools' && categoryId !== 'tool-storage') {
       filtered = allData.filter(p => p.category === categoryId);
    }
    
    if (activePowerFilter !== 'All') {
      filtered = filtered.filter(p => (p.power === activePowerFilter) || (p.sub_category === activePowerFilter));
    }
    return filtered;
  }, [categoryId, activePowerFilter]);

  const powerFilters = useMemo(() => {
    let allData = [...powerToolsData];
    if (categoryId === 'safety-ppe') allData = safetyData;
    else if (categoryId === 'welding-tools') allData = industrialExpansionData;
    else if (categoryId === 'agriculture-tools') allData = agricultureGardenData;
    else if (categoryId === 'tool-storage') allData = storageData;

    const dataForFilters = (categoryId === 'safety-ppe' || categoryId === 'welding-tools' || categoryId === 'agriculture-tools' || categoryId === 'tool-storage') 
      ? allData 
      : allData.filter(p => p.category === categoryId);

    const filters = new Set();
    dataForFilters.forEach(p => {
      if (p.power) filters.add(p.power);
      if (p.sub_category) filters.add(p.sub_category);
    });
    
    return ['All', ...Array.from(filters)].sort();
  }, [categoryId]);

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm font-bold uppercase tracking-widest text-gray-400">
          <Link to="/" className="hover:text-industrial-red">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/" className="hover:text-industrial-red">Categories</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-industrial-dark">{category.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 sticky top-28">
              <div className="flex items-center gap-2 mb-8 text-industrial-dark">
                <Filter size={20} />
                <h3 className="text-xl font-black uppercase tracking-tight">Filters</h3>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest text-gray-500 mb-4">Rated input power</h4>
                  <div className="space-y-2">
                    {powerFilters.map(filter => (
                      <button
                        key={filter}
                        onClick={() => setActivePowerFilter(filter)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                          activePowerFilter === filter
                            ? 'bg-industrial-red text-white'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
              <h1 className="text-3xl font-black text-industrial-dark uppercase tracking-tight">
                {category.name} <span className="text-industrial-red ml-2">{products.length} Products</span>
              </h1>
            </div>

            {categoryId === 'heavy-duty' && (
              <div className="mb-12 bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 overflow-hidden flex flex-col items-center gap-8">
                <div className="w-full shadow-2xl rounded-3xl overflow-hidden bg-black mx-auto">
                  <div style={{ aspectRatio: '1.77725 / 1' }}>
                    <iframe 
                      className="w-full h-full"
                      src="https://www.youtube-nocookie.com/embed/GDGr3lHeix8?feature=oembed&autoplay=1&mute=1&modestbranding=1&loop=1&rel=0&playlist=GDGr3lHeix8&iv_load_policy=3&color=white&controls=1&cc_load_policy=1" 
                      title="TOTAL Tools 20V Cordless Battery Products" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen 
                    />
                  </div>
                </div>
                <div className="text-center max-w-3xl mx-auto">
                  <h3 className="text-3xl md:text-5xl font-black text-industrial-dark uppercase tracking-tight mb-4">Operate 360+ Products with same battery</h3>
                  <p className="text-gray-500 font-medium leading-relaxed mb-6 text-lg">
                    Stop wasting money on multiple batteries and avoid the hassle of carrying heavy batteries around! With Total Tools, one powerful battery pack works with over 360+ power tools, giving you the ultimate convenience and saving you from unnecessary expenses. Invest in efficiency, versatility, and ease with Total Tools.
                  </p>
                  <Link 
                    to="/cordless-tools" 
                    className="inline-flex items-center justify-center gap-2 bg-industrial-dark text-white py-4 px-8 rounded-full font-black text-xs tracking-widest uppercase hover:bg-industrial-red transition-colors shadow-lg active:scale-95"
                  >
                    Shop Batteries
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            )}

            {products.length === 0 ? (
              <div className="py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <Wrench size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">No products found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="image-card bg-white rounded-[28px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_36px_-12px_rgba(0,0,0,0.2)] shadow-[0_12px_28px_-8px_rgba(0,0,0,0.1)] border border-gray-100/50 backdrop-blur-sm group flex flex-col relative h-full"
                  >
                    <Link to={`/product/${product.id}`} className="relative h-[220px] bg-gray-50/50 p-6 flex items-center justify-center overflow-hidden border-b border-gray-50">
                      <div className="absolute inset-0 bg-gradient-to-tr from-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-400 relative z-10"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1542382156909-92c2a47ff992?auto=format&fit=crop&q=80&w=400";
                        }}
                      />
                      <span className="absolute top-3.5 left-3.5 bg-black/65 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest z-20 flex items-center gap-1.5">
                        <Filter size={10} /> {product.sub_category}
                      </span>
                      
                      {/* Hover Specs */}
                      <div className="absolute bottom-3 left-3 flex gap-1.5 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                        <div className="bg-white/90 backdrop-blur text-industrial-dark text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1 border border-gray-100">
                          <Shield size={10} className="text-green-600" /> Verify
                        </div>
                        {product.power && (
                          <div className="bg-white/90 backdrop-blur text-industrial-dark text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1 border border-gray-100">
                            <Zap size={10} className="text-yellow-500" /> {product.power}
                          </div>
                        )}
                      </div>
                    </Link>
                    
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-xl font-black text-gray-900 mb-1.5 leading-tight group-hover:text-industrial-red transition-colors flex justify-between items-start gap-2">
                        <span className="line-clamp-2">{product.name}</span>
                      </h3>

                      <div className="flex items-center gap-1 text-yellow-500 mb-3">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(product.rating || 5) ? 'currentColor' : 'none'} />)}
                        <span className="text-xs text-gray-400 font-bold ml-1">{product.rating || '5.0'}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-gray-50/80 p-2 rounded-xl">
                          <p className="text-[9px] uppercase font-black tracking-widest text-gray-400">Power</p>
                          <p className="text-xs font-bold text-industrial-dark line-clamp-1">{product.power || 'N/A'}</p>
                        </div>
                        <div className="bg-gray-50/80 p-2 rounded-xl">
                          <p className="text-[9px] uppercase font-black tracking-widest text-gray-400">Speed</p>
                          <p className="text-xs font-bold text-industrial-dark line-clamp-1">{product.speed || 'N/A'}</p>
                        </div>
                      </div>

                      <div className="mt-auto">
                        {product.price_inr ? (
                           <div className="flex flex-col mb-4">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-black text-industrial-dark">
                                ₹{product.price_inr.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Ex-GST Price</span>
                            </div>
                           </div>
                        ) : (
                           <div className="mb-4">
                            <Link to={`/product/${product.id}`} className="text-industrial-red font-black text-sm underline tracking-widest hover:text-red-700 transition">Login to See Price</Link>
                           </div>
                        )}
                        
                        {/* Like Section & Cart */}
                        <div className="pt-4 border-t border-gray-100/80 flex items-center justify-between">
                          <button 
                            onClick={(e) => handleLike(e, product.id)}
                            className="bg-gray-50/80 border border-gray-100 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-gray-500 py-1.5 px-3.5 rounded-full font-bold text-[11px] uppercase tracking-widest flex items-center gap-1.5 transition-all w-max group/btn"
                          >
                            <Heart className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform group-hover/btn:fill-red-600" />
                            <span className="text-gray-900 group-hover/btn:text-red-600">{likes[product.id] || 0}</span> Likes
                          </button>

                          <div className="flex items-center gap-2">
                            <button className="bg-industrial-dark text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-industrial-red hover:shadow-lg transition-all shadow-md">
                              <ShoppingCart size={15} />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
