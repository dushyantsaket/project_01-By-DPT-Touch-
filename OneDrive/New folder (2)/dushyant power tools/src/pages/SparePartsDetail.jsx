import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft, ShoppingCart, Info, Search, Package } from 'lucide-react';

const sparePartsInventory = {
   grinder: [
      { id: 'g1', name: 'GWS 600 Motor Housing', partNo: '1 619 P09 772', price: 850, image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=200' },
      { id: 'g2', name: 'GWS 600 Armature', partNo: '1 604 010 626', price: 1250, image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=200' },
      { id: 'g3', name: 'GWS 750 Switch', partNo: '1 607 200 31V', price: 450, image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=200' },
   ],
   hammer: [
      { id: 'h1', name: 'GBH 2-20 Field', partNo: '1 616 B10 269', price: 1100, image: 'https://images.unsplash.com/photo-1590236170131-4f8e969bfbf0?auto=format&fit=crop&q=80&w=200' },
      { id: 'h2', name: 'GBH 200 Power Cord', partNo: '1 604 460 72W', price: 350, image: 'https://images.unsplash.com/photo-1590236170131-4f8e969bfbf0?auto=format&fit=crop&q=80&w=200' },
      { id: 'h3', name: 'GSH 500 Armature', partNo: '1 619 P15 112', price: 2400, image: 'https://images.unsplash.com/photo-1590236170131-4f8e969bfbf0?auto=format&fit=crop&q=80&w=200' },
   ],
   cutter: [
      { id: 'c1', name: 'GCO 220 Armature', partNo: '1 609 B03 639', price: 3500, image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=200' },
      { id: 'c2', name: 'TCT Saw Blade Premium', partNo: 'XP-TCT-4', price: 180, image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=200' },
   ],
   welding: [
      { id: 'w1', name: 'Inverter Board Alpha', partNo: 'WLD-INV-A1', price: 4200, image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=200' },
   ]
};

const SparePartsDetail = () => {
   const { id } = useParams();
   const [items, setItems] = useState([]);
   const sectionName = id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Spare Parts';

   useEffect(() => {
      if (id && sparePartsInventory[id]) {
         setItems(sparePartsInventory[id]);
      } else {
         setItems(Object.values(sparePartsInventory).flat());
      }
   }, [id]);

   return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-16 selection:bg-industrial-red selection:text-white">
         <div className="container mx-auto px-4">

            {/* Navigation Head */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
               <div className="flex items-center gap-4">
                  <Link to="/" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 hover:text-industrial-red hover:shadow-xl transition-all border border-gray-100 shadow-sm">
                     <ArrowLeft size={20} />
                  </Link>
                  <div>
                     <h1 className="text-3xl font-black text-black tracking-tighter uppercase">{sectionName} Ecosystem</h1>
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Strategic Component Procurement Hub</p>
                  </div>
               </div>

               <div className="relative max-w-sm w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                     type="text"
                     className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold outline-none focus:border-industrial-red transition-all shadow-sm"
                     placeholder="SEARCH COMPONENT PART NO..."
                  />
               </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {items.map((item, idx) => (
                  <motion.div
                     key={item.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.05 }}
                     className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
                  >
                     <div className="aspect-square bg-gray-50 p-8 overflow-hidden relative">
                        <img
                           src={item.image}
                           alt={item.name}
                           className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-industrial-dark text-white px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest">
                           ORIGINAL ASSET
                        </div>
                     </div>

                     <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-lg font-black text-black tracking-tight mb-2 uppercase group-hover:text-industrial-red transition-colors min-h-[3rem]">
                           {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-6">
                           <div className="w-1.5 h-1.5 rounded-full bg-industrial-red" />
                           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Part No: {item.partNo}</span>
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Unit Price</span>
                              <span className="text-xl font-black text-black">₹{item.price.toLocaleString()}</span>
                           </div>
                           <Link to="/cart">
                              <button className="w-12 h-12 rounded-2xl bg-industrial-dark text-white flex items-center justify-center hover:bg-industrial-red transition-all shadow-lg active:scale-90">
                                 <ShoppingCart size={20} />
                              </button>
                           </Link>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>

            {/* Support Banner */}
            <div className="mt-20 p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-industrial-red mb-6 shadow-xl">
                  <Package size={32} />
               </div>
               <h2 className="text-2xl font-black text-black tracking-tighter uppercase mb-4">Can't Find Your Component?</h2>
               <p className="text-gray-400 font-bold uppercase tracking-widest text-xs max-w-lg leading-relaxed mb-8">
                  We hold inventory for thousands of parts beyond our digital catalog. Connect with our procurement desk.
               </p>
               <Link
                  to="/contact"
                  className="bg-industrial-dark text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-black transition-all shadow-xl"
               >
                  ENQUIRE NOW
               </Link>
            </div>

         </div>
      </div>
   );
};

export default SparePartsDetail;
