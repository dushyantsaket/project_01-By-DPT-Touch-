import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Search, ChevronRight, Package, CheckCircle2, Navigation, Clock } from 'lucide-react';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [isTracked, setIsTracked] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      setIsTracked(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16 px-4 selection:bg-industrial-red selection:text-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Entrance Section */}
        <div className="text-center mb-16 px-4">
           <motion.span 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-industrial-red font-black tracking-widest uppercase text-xs mb-4 block"
           >
             Logistics Intelligence
           </motion.span>
           <motion.h1 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase leading-tight"
           >
             Track Your <span className="text-industrial-red underline decoration-transparent group-hover:decoration-industrial-red transition-all">Procurement</span>
           </motion.h1>
           <p className="mt-8 text-gray-400 font-bold uppercase tracking-widest text-xs">Real-Time Distance Monitoring & Coordinates Reporting</p>
        </div>

        {/* Tracking Input */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-gray-100 mb-12">
           <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                 <Package className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 transition-colors group-focus-within:text-industrial-red" />
                 <input 
                   type="text" 
                   value={orderId}
                   onChange={(e) => setOrderId(e.target.value)}
                   className="w-full bg-gray-50 border-2 border-transparent border-gray-100 rounded-3xl py-6 pl-16 pr-6 text-sm font-black outline-none focus:bg-white focus:border-industrial-red transition-all uppercase tracking-widest"
                   placeholder="ENTER SHIPMENT ID (e.g. DT-482012)"
                   required
                 />
              </div>
              <button 
                type="submit" 
                className="bg-industrial-dark hover:bg-black text-white px-10 py-6 rounded-3xl font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-xl transition-all"
              >
                 START TRACKING
                 <Search size={22} className="animate-pulse" />
              </button>
           </form>
        </div>

        {/* Tracking Results */}
        {isTracked && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
             {/* Status Card */}
             <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
                <div className="p-8 md:p-12">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                      
                      {/* Left Block */}
                      <div className="space-y-8 flex-1">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                               <Navigation size={14} className="text-industrial-red" />
                               Strategic Location
                            </label>
                            <h2 className="text-2xl font-black text-black tracking-tight uppercase">Bhilai Hub • Sector 6 Crossing</h2>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Chhattisgarh, IN • Lat 21.1873, Long 81.3854</p>
                         </div>

                         <div className="grid grid-cols-2 gap-8">
                            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                               <Clock className="text-industrial-red mb-3" size={20} />
                               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">ETA Arrival</p>
                               <p className="text-lg font-black text-black mt-1 uppercase underline decoration-industrial-red decoration-2 underline-offset-4">32 Minutes</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                               <MapPin className="text-industrial-red mb-3" size={20} />
                               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Distance</p>
                               <p className="text-lg font-black text-black mt-1 uppercase underline decoration-industrial-red decoration-2 underline-offset-4">12.8 KM Left</p>
                            </div>
                         </div>
                      </div>

                      {/* Right Block: Live Status */}
                      <div className="md:w-1/3 space-y-4">
                         <div className="bg-industrial-dark text-white p-8 rounded-[2rem] relative overflow-hidden group">
                             <div className="absolute -right-4 -bottom-4 text-industrial-red opacity-10 group-hover:scale-110 transition-transform duration-500">
                                <Truck size={120} />
                             </div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-industrial-red mb-2">Current Operation</p>
                             <p className="text-xl font-black leading-tight uppercase tracking-tighter">Out for Strategic Delivery</p>
                             <div className="mt-8 flex items-center justify-between text-xs font-bold uppercase tracking-widest border-t border-white/10 pt-6">
                                <span>Batch Alpha</span>
                                <div className="flex space-x-1">
                                   <div className="w-1.5 h-1.5 rounded-full bg-industrial-red animate-ping" />
                                   <div className="w-1.5 h-1.5 rounded-full bg-industrial-red" />
                                </div>
                             </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Timeline */}
                <div className="bg-gray-50 p-8 md:p-12 border-t border-gray-100 overflow-x-auto">
                   <div className="flex items-center min-w-[800px] gap-4">
                      {[
                        { title: 'Order Processed', location: 'Indore Warehouse', date: '21 Mar, 08:30', status: 'done' },
                        { title: 'Logistics Handover', location: 'BlueDart Gateway', date: '21 Mar, 14:15', status: 'done' },
                        { title: 'Transit En-Route', location: 'Bhopal Hub', date: '22 Mar, 11:20', status: 'done' },
                        { title: 'Arrival Bhilai', location: 'Delivery Station', date: '23 Mar, 04:50', status: 'active' },
                        { title: 'Product Reached', location: 'Destination', date: 'TBD', status: 'pending' },
                      ].map((evt, idx) => (
                        <div key={idx} className="flex-1 relative">
                           {idx !== 4 && <div className={`absolute top-5 left-10 right-0 h-1 z-0 ${evt.status === 'done' ? 'bg-industrial-red' : 'bg-gray-200'}`}></div>}
                           <div className="flex flex-col items-center relative z-10 text-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
                                evt.status === 'done' ? 'bg-industrial-red text-white' : evt.status === 'active' ? 'bg-white text-industrial-red border-2 border-industrial-red' : 'bg-white text-gray-300 border border-gray-200'
                              }`}>
                                 {evt.status === 'done' ? <CheckCircle2 size={18} /> : <span>{idx + 1}</span>}
                              </div>
                              <p className={`mt-4 text-[11px] font-black uppercase tracking-widest ${evt.status === 'pending' ? 'text-gray-400' : 'text-black'}`}>{evt.title}</p>
                              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mt-1">{evt.location}</p>
                              <p className="text-[9px] font-bold text-industrial-red mt-2">{evt.date}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
