import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Settings, Zap, RotateCw, Shield, ArrowRight, Wrench, ChevronRight, Filter, Eye, ShoppingCart, Disc, CheckCircle, Star, Heart } from 'lucide-react';
import { inventoryData } from '../data/inventory';
import { handToolsData as baseHandToolsData } from '../data/handToolsData';
import { allenKeysData } from '../data/allenKeysData';
import { chiselsPunchesData } from '../data/chiselsPunchesData';
import { clampsVicesData } from '../data/clampsVicesData';
import { filesData } from '../data/filesData';
import { diesTapsData } from '../data/diesTapsData';
import { greaseGunsPumpsData } from '../data/greaseGunsPumpsData';
import { hacksawFramesBladesData } from '../data/hacksawFramesBladesData';
import { toolKitsData } from '../data/toolKitsData';
import { planersData } from '../data/planersData';
import { pliersCuttersData } from '../data/pliersCuttersData';
import { ratchetSocketsData } from '../data/ratchetSocketsData';
import { spannersWrenchesData } from '../data/spannersWrenchesData';
import { bladesData as diamondBladesData } from '../data/blades';
import { safetyData } from '../data/safetyData';
import { industrialExpansionData } from '../data/industrialExpansionData';
import { agricultureGardenData } from '../data/agricultureGardenData';
import { storageData } from '../data/storageData';

const handToolsData = [
  ...baseHandToolsData,
  ...allenKeysData,
  ...chiselsPunchesData,
  ...clampsVicesData,
  ...filesData,
  ...diesTapsData,
  ...greaseGunsPumpsData,
  ...hacksawFramesBladesData,
  ...toolKitsData,
  ...planersData,
  ...pliersCuttersData,
  ...ratchetSocketsData,
  ...spannersWrenchesData,
];
import { powerToolsData } from '../data/powerTools';
import { angleGrindersData } from '../data/angleGrindersData';
import { gcWheelsData } from '../data/gcWheelsData';
import { sandPaperData } from '../data/sandPaperData';
import { polishingPadsData } from '../data/polishingPadsData';

const abrasivesData = [...gcWheelsData, ...sandPaperData, ...polishingPadsData];

// Extract Old Inventory Spare Parts
const uniquePartsMap = new Map();
inventoryData.forEach(item => {
  if (item['Spare part number'] && !uniquePartsMap.has(item['Spare part number'])) {
    uniquePartsMap.set(item['Spare part number'], {
      id: item['Spare part number'],
      name: item['Spare parts name'],
      image: item['Spare parts Picture'],
      suitableFor: item['Suitable for'] || [],
      partNumber: item['Spare part number'],
      category: "Spare Parts"
    });
  }
});
const partsList = Array.from(uniquePartsMap.values()).filter(p => p.name);

const Products = () => {
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Best Sellers');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeBrand, setActiveBrand] = useState('All');
  const [cartToast, setCartToast] = useState(null);

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

  const handleAddToCart = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item);
    setCartToast(item.name);
    setTimeout(() => setCartToast(null), 2500);
  };

  // Brand data for filtering UI
  const brands = useMemo(() => {
    const relevantData = 
      activeTab === 'Machines'       ? powerToolsData.filter(i => i.category !== 'hand-tools' && i.category !== 'spare-parts' && i.category !== 'abrasives') 
      : activeTab === 'Hand Tools'   ? handToolsData 
      : activeTab === 'Angle Grinders' ? angleGrindersData
      : activeTab === 'Abrasives'    ? abrasivesData
      : activeTab === 'Diamond Blades' ? diamondBladesData
      : [];
    const uniqueBrands = new Set(relevantData.map(item => item.brand).filter(Boolean));
    return ['All', ...Array.from(uniqueBrands)].sort();
  }, [activeTab]);

  // Derive categories dynamically based on tab
  const categories = useMemo(() => {
    if (activeTab === 'Machines') {
      const cats = new Set(powerToolsData.filter(item => item.category !== 'hand-tools' && item.category !== 'spare-parts' && item.category !== 'abrasives').map(item => item.category));
      return ['All', ...Array.from(cats)].sort();
    } else if (activeTab === 'Hand Tools') {
      const cats = new Set(handToolsData.map(item => item.sub_category));
      return ['All', ...Array.from(cats)].sort();
    } else if (activeTab === 'Angle Grinders') {
      return ['All', '4 Inch', '5 Inch', '7 Inch', '9 Inch'];
    } else if (activeTab === 'Abrasives') {
      return ['All', 'GC Wheel', 'WA Wheel', 'Sand Paper', 'Polishing Pads'];
    } else if (activeTab === 'Diamond Blades') {
      return ['All', '4 Inch', '5 Inch', '6 Inch', '7 Inch', '8 Inch', '10 Inch', '12 Inch', '14 Inch', '16 Inch', '20 Inch', '24 Inch', '32 Inch'];
    } else if (activeTab === 'Safety') {
      const cats = new Set(safetyData.map(item => item.sub_category));
      return ['All', ...Array.from(cats)].sort();
    } else if (activeTab === 'Welding') {
      const cats = new Set(industrialExpansionData.map(item => item.sub_category));
      return ['All', ...Array.from(cats)].sort();
    } else if (activeTab === 'Agriculture') {
      const cats = new Set(agricultureGardenData.map(item => item.sub_category));
      return ['All', ...Array.from(cats)].sort();
    } else if (activeTab === 'Storage') {
      const cats = new Set(storageData.map(item => item.sub_category));
      return ['All', ...Array.from(cats)].sort();
    } else {
      // Spare parts sub-categories
      return ['All', 'Armatures & Rotors', 'Stators & Fields', 'Switches & Buttons', 'Carbon Brushes', 'Gears & Pinions', 'Bearings'];
    }
  }, [activeTab]);

  // Handle Tab Switching properly
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setActiveCategory('All');
    setActiveBrand('All');
  };

  // Filter Active Items
  const filteredItems = useMemo(() => {
    let items = 
      activeTab === 'Best Sellers'     ? safetyData
      : activeTab === 'Featured'       ? agricultureGardenData
      : activeTab === 'Machines'       ? powerToolsData.filter(i => i.category !== 'hand-tools' && i.category !== 'spare-parts' && i.category !== 'abrasives')
      : activeTab === 'Hand Tools'     ? handToolsData
      : activeTab === 'Angle Grinders' ? angleGrindersData
      : activeTab === 'Abrasives'      ? abrasivesData
      : activeTab === 'Diamond Blades' ? diamondBladesData
      : activeTab === 'Safety'         ? safetyData
      : activeTab === 'Welding'        ? industrialExpansionData
      : activeTab === 'Agriculture'    ? agricultureGardenData
      : activeTab === 'Storage'        ? storageData
      : partsList;
    
    // Brand filter (Machines, Hand Tools, Angle Grinders, Abrasives)
    if (activeTab !== 'Spare Parts' && activeBrand !== 'All') {
      items = items.filter(item => item.brand === activeBrand);
    }

    if (activeCategory !== 'All') {
      if (activeTab === 'Machines') {
        items = items.filter(item => item.category === activeCategory);
      } else if (activeTab === 'Hand Tools') {
        items = items.filter(item => item.sub_category === activeCategory);
      } else if (activeTab === 'Angle Grinders') {
        const inchMap = { '4 Inch': '100', '5 Inch': '125', '7 Inch': '180', '9 Inch': '230' };
        const mm = inchMap[activeCategory];
        if (mm) items = items.filter(item => item.name.toLowerCase().includes(mm));
      } else if (activeTab === 'Abrasives') {
        items = items.filter(item => item.wheel_type === activeCategory.replace(' Wheel', '') || item.wheel_type === activeCategory);
      } else if (activeTab === 'Diamond Blades') {
        const inch = activeCategory.split(' ')[0];
        items = items.filter(item => item.name.toLowerCase().includes(inch + ' inch') || item.name.toLowerCase().includes(inch + '"'));
      } else if (activeTab === 'Safety' || activeTab === 'Welding' || activeTab === 'Agriculture' || activeTab === 'Storage') {
        items = items.filter(item => item.sub_category === activeCategory);
      } else {
        // Spare parts keyword map
        const filterKeywordsMap = {
          'Armatures & Rotors': ['rotor', 'armature'],
          'Stators & Fields': ['stator', 'field'],
          'Switches & Buttons': ['switch', 'button', 'knob'],
          'Carbon Brushes': ['brush'],
          'Gears & Pinions': ['gear', 'pinion', 'bevel'],
          'Bearings': ['bearing', 'bushing']
        };
        const keywords = filterKeywordsMap[activeCategory];
        if (keywords) {
          items = items.filter(item => 
            keywords.some(kw => item.name.toLowerCase().includes(kw))
          );
        }
      }
    }
    return items;
  }, [activeTab, activeCategory, activeBrand]);

  // Brand Badge Style Helper
  const getBrandStyle = (brand) => {
    const styles = {
      'BSC Power': 'border-industrial-red text-industrial-red bg-red-50',
      'KEIL': 'border-yellow-600 text-yellow-700 bg-yellow-50',
      'DPT': 'border-blue-600 text-blue-700 bg-blue-50',
      'SUN': 'border-orange-500 text-orange-600 bg-orange-50',
      'Powerbuild': 'border-green-600 text-green-700 bg-green-50',
      'Indigo': 'border-indigo-600 text-indigo-700 bg-indigo-50',
      'Asian': 'border-red-600 text-red-700 bg-red-50',
      'Tiger': 'border-orange-600 text-orange-700 bg-orange-50',
      'Armaduro': 'border-stone-600 text-stone-700 bg-stone-50',
      'Paragon': 'border-blue-500 text-blue-600 bg-blue-50',
      'Janmac': 'border-cyan-600 text-cyan-700 bg-cyan-50',
      'Ingco': 'border-yellow-500 text-yellow-800 bg-yellow-100',
      'iBELL': 'border-blue-500 text-blue-700 bg-blue-50',
      'Vormir': 'border-purple-600 text-purple-700 bg-purple-50',
      'JK Steel': 'border-slate-600 text-slate-700 bg-slate-50',
      'Ladwa': 'border-amber-600 text-amber-700 bg-amber-50',
      'Safe Pro': 'border-emerald-600 text-emerald-700 bg-emerald-50',
      'De Neers': 'border-blue-700 text-blue-800 bg-blue-50',
      'Wadfow': 'border-cyan-500 text-cyan-700 bg-cyan-50',
      'All': 'border-gray-200 text-gray-600 bg-gray-50'
    };
    return styles[brand] || 'border-gray-300 text-gray-700 bg-gray-50';
  };

  return (
    <section id="products" className="py-24 bg-gray-50 relative">
      
      {/* Background Stylings */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-industrial-red/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
      
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <span className="h-px w-8 bg-industrial-red"></span>
              <span className="text-industrial-red font-bold tracking-[0.2em] uppercase text-sm">Our Catalog</span>
              <span className="h-px w-8 bg-industrial-red lg:hidden"></span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-industrial-dark mb-6 leading-tight">
              Industrial <br /><span className="text-industrial-red">Power Solutions</span>
            </h2>
            <p className="text-gray-500 max-w-2xl font-medium text-lg mb-8">
              Authorized supplier for top international brands. Explore our premium range of professional tools and maintenance parts.
            </p>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-2 bg-industrial-red/10 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
               <video 
                 className="w-full h-full object-cover"
                 poster="https://bscpowertools.com/wp-content/uploads/2024/04/Chainsaw-2-2-scaled.jpg"
                 controls
                 autoPlay
                 muted
                 loop
                 playsInline
               >
                 <source src="https://bscpowertools.com/wp-content/uploads/2024/02/BSC-7200-Chainsaw.mp4#t=5" type="video/mp4" />
                 Your browser does not support the video tag.
               </video>
               <div className="absolute top-4 left-4">
                 <span className="bg-industrial-red text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                   Featured Demo
                 </span>
               </div>
            </div>
          </div>
        </div>

        {/* Top Level Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['Best Sellers', 'Featured', 'Machines', 'Angle Grinders', 'Abrasives', 'Diamond Blades', 'Safety', 'Welding', 'Agriculture', 'Storage', 'Hand Tools', 'Spare Parts'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabSwitch(tab)}
              className={`relative px-8 py-4 font-black uppercase tracking-widest text-sm transition-all duration-300 rounded-xl overflow-hidden group ${
                activeTab === tab 
                ? 'text-white shadow-[0_8px_25px_rgba(220,38,38,0.3)]' 
                : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-industrial-dark shadow-sm'
              }`}
            >
              {activeTab === tab && (
                <span className="absolute inset-0 bg-industrial-red"></span>
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab === 'Best Sellers' ? <CheckCircle size={18} />
                  : tab === 'Featured' ? <Star size={18} />
                  : tab === 'Machines' ? <Zap size={18} /> 
                  : tab === 'Hand Tools' ? <Wrench size={18} /> 
                  : tab === 'Diamond Blades' ? <Disc size={18} /> 
                  : tab === 'Safety' ? <Shield size={18} />
                  : tab === 'Welding' ? <Shield size={18} />
                  : tab === 'Agriculture' ? <Wrench size={18} />
                  : tab === 'Storage' ? <Filter size={18} />
                  : <Settings size={18} />}
                {tab === 'Safety' ? 'Safety PPE' : tab === 'Welding' ? 'Welding & Industrial' : tab === 'Storage' ? 'Tool Storage' : tab}
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs ml-1">
                  {tab === 'Best Sellers' ? safetyData.length
                    : tab === 'Featured' ? agricultureGardenData.length
                    : tab === 'Machines' ? powerToolsData.length 
                    : tab === 'Hand Tools' ? handToolsData.length 
                    : tab === 'Diamond Blades' ? diamondBladesData.length 
                    : tab === 'Safety' ? safetyData.length
                    : tab === 'Welding' ? industrialExpansionData.length
                    : tab === 'Agriculture' ? agricultureGardenData.length
                    : tab === 'Storage' ? storageData.length
                    : partsList.length}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Brand Filter Row */}
        {(activeTab === 'Machines' || activeTab === 'Hand Tools') && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="h-8 w-1 bg-industrial-red rounded-full"></div>
              <h3 className="text-xl font-bold text-industrial-dark uppercase tracking-wide">Browse by Manufacturer</h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={`
                    px-6 py-3 rounded-2xl border-2 font-black uppercase tracking-[0.1em] text-xs transition-all duration-300
                    hover:scale-105 active:scale-95
                    ${activeBrand === brand 
                      ? `${getBrandStyle(brand)} shadow-lg scale-105 border-current` 
                      : 'border-transparent bg-white text-gray-400 hover:border-gray-200 hover:text-gray-600'}
                  `}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* Side Filter Navigation - Only show if there's categories to filter */}
          <div className="w-full xl:w-64 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 xl:sticky xl:top-24 shrink-0">
            <div className="flex items-center gap-2 mb-6 text-industrial-dark font-black uppercase tracking-wide">
              <Filter size={18} className="text-industrial-red" />
              Categories
            </div>
            
            <div className="flex xl:flex-col gap-2 overflow-x-auto xl:overflow-visible pb-2 xl:pb-0 hide-scrollbar">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap xl:whitespace-normal flex justify-between items-center group ${
                    activeCategory === category
                      ? 'bg-industrial-red text-white shadow-md'
                      : 'bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-industrial-red'
                  }`}
                >
                  {category}
                  <ChevronRight size={14} className={`transition-transform ${activeCategory === category ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => {
                const isProductType = activeTab === 'Machines' || activeTab === 'Hand Tools';
                const linkUrl = isProductType ? `/product/${item.id}` : `/spare-parts/${item.id}`;
                return (
                <div 
                  key={item.id || index} 
                  onClick={() => navigate(linkUrl)}
                  className="image-card bg-white rounded-[28px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_36px_-12px_rgba(0,0,0,0.2)] shadow-[0_12px_28px_-8px_rgba(0,0,0,0.1)] cursor-pointer border border-gray-100/50 backdrop-blur-sm group flex flex-col h-full relative"
                >
                  {/* Image Wrapper */}
                  <div className="relative overflow-hidden bg-gray-50/50 h-[220px] flex items-center justify-center p-6 border-b border-gray-50">
                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-400 ease-out relative z-10"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1542382156909-92c2a47ff992?auto=format&fit=crop&q=80&w=400";
                      }}
                    />
                    
                    {/* Category Badge */}
                    <span className="absolute top-3.5 left-3.5 bg-black/65 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest text-white z-20 flex items-center gap-1.5">
                      <Filter size={10} /> {item.category}
                    </span>

                    {/* Brand Tag (Floating Corner - Right) */}
                    {item.brand && (
                      <div className="absolute top-0 right-0 z-20">
                        <div className={`px-3 py-1.5 rounded-bl-xl font-black text-[10px] uppercase tracking-widest border-l border-b border-white/20 shadow-sm ${getBrandStyle(item.brand)}`}>
                          {item.brand}
                        </div>
                      </div>
                    )}

                    {/* Hover floating spec badging */}
                    <div className="absolute bottom-3 left-3 flex gap-1.5 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                      <div className="bg-white/90 backdrop-blur text-industrial-dark text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1 border border-gray-100">
                        <Shield size={10} className="text-green-600" /> Verify
                      </div>
                      {item.power && (
                        <div className="bg-white/90 backdrop-blur text-industrial-dark text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1 border border-gray-100">
                          <Zap size={10} className="text-yellow-500" /> {item.power}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    
                    {/* Title */}
                    <h3 className="text-xl font-black text-gray-900 mb-1.5 leading-tight group-hover:text-industrial-red transition-colors flex justify-between items-start gap-2">
                      <span className="line-clamp-2">{item.name}</span>
                    </h3>

                    {/* Features Description */}
                    {item.description && (
                      <p className="text-gray-500 text-sm font-medium my-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    {/* Price */}
                    <div className="mt-3 mb-4">
                      {(item.price_inr || item.sale_price || item.regular_price || item.mrp || item.price) ? (
                        isLoggedIn ? (
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-black text-industrial-dark">
                                {(() => {
                                  const p = (item.price_inr || item.sale_price || item.price);
                                  if (typeof p === 'string' && p.includes('₹')) return p;
                                  return "₹" + (p?.toLocaleString?.() || p);
                                })()}
                              </span>
                              {(item.mrp || item.regular_price) && (
                                <span className="text-sm text-gray-400 line-through font-bold">
                                  {(() => {
                                    const p = (item.mrp || item.regular_price);
                                    if (typeof p === 'string' && p.includes('₹')) return p;
                                    return "₹" + (p?.toLocaleString?.() || p);
                                  })()}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Ex-GST</span>
                              {item.discount && (
                                <span className="text-[10px] bg-green-100 text-green-700 font-black px-2 py-0.5 rounded-full uppercase tracking-widest whitespace-nowrap">
                                  {item.discount}
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate('/login'); }}
                            className="text-industrial-red font-black text-sm underline cursor-pointer tracking-widest hover:text-red-700 transition"
                          >
                            Login to See Price
                          </span>
                        )
                      ) : !isLoggedIn && (
                        <span 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate('/login'); }}
                          className="text-industrial-red font-black text-sm underline cursor-pointer tracking-widest hover:text-red-700 transition"
                        >
                          Login to See Price
                        </span>
                      )}
                    </div>

                    {/* Like Section & Cart */}
                    <div className="mt-auto pt-4 border-t border-gray-100/80 flex items-center justify-between">
                      <button 
                        onClick={(e) => handleLike(e, item.id)}
                        className="bg-gray-50/80 border border-gray-100 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-gray-500 py-1.5 px-3.5 rounded-full font-bold text-[11px] uppercase tracking-widest flex items-center gap-1.5 transition-all w-max group/btn"
                      >
                        <Heart className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform group-hover/btn:fill-red-600" />
                        <span className="text-gray-900 group-hover/btn:text-red-600">{likes[item.id] || 0}</span> Likes
                      </button>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={(e) => handleAddToCart(e, item)}
                          className="bg-industrial-dark text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-industrial-red hover:shadow-lg transition-all shadow-md z-30 relative"
                          title="Add to Cart"
                        >
                          <ShoppingCart size={15} />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
                );
              })}
              
              {filteredItems.length === 0 && (
                <div className="col-span-full py-20 bg-white rounded-2xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
                  <Wrench size={48} className="text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Items Found</h3>
                  <p className="text-gray-500">No tools found for {activeBrand !== 'All' ? `${activeBrand} brand` : ''} in {activeCategory} category.</p>
                  <button onClick={() => { setActiveCategory('All'); setActiveBrand('All'); }} className="mt-6 text-industrial-red font-bold hover:underline">
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      
      {/* Cart Toast Notification */}
      {cartToast && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-industrial-dark text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-up border border-white/10">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-black text-xs uppercase tracking-widest text-green-400">Added to Cart</p>
            <p className="text-white/70 text-xs font-medium line-clamp-1">{cartToast}</p>
          </div>
          <button onClick={() => navigate('/cart')} className="ml-4 bg-industrial-red text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl hover:bg-red-700 transition-all flex-shrink-0">
            View Cart
          </button>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}} />
    </section>
  );
};

export default Products;
