import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Wrench, ChevronRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const industrialTools = [
  {
    id: 'air-blower',
    name: 'Industrial Air Blower',
    desc: 'High-performance 600W blower for dust extraction.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1542382156909-92c2a47ff992?auto=format&fit=crop&q=80&w=400',
    color: 'bg-red-600'
  },
  {
    id: 'heat-gun',
    name: 'Heavy Duty Heat Gun',
    desc: '2000W professional hot air gun with variable settings.',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=400',
    color: 'bg-industrial-dark'
  },
  {
    id: 'welding-machine',
    name: 'IGBT Inverter Welding',
    desc: 'Professional arc welding solution for industrial use.',
    icon: Settings,
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=400',
    color: 'bg-industrial-red'
  },
  {
    id: 'cordless-drill',
    name: '20V Cordless Brushless Drill',
    desc: 'Maximum freedom with high-torque motor technology.',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1504148455328-497c5ae69495?auto=format&fit=crop&q=80&w=400',
    color: 'bg-gray-800'
  }
];

const IndustrialFeatured = () => {
  return (
    <section className="py-24 bg-industrial-dark text-white relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-industrial-red/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-0.5 w-12 bg-industrial-red"></span>
            <span className="text-industrial-red font-black uppercase tracking-[0.3em] text-xs">Core Implements</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
            Main Industrial <br /><span className="text-industrial-red">Toolbox</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg font-medium">
            From blowers to heavy-duty welding gear, we provide the essential armament for modern industrial infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industrialTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-all duration-500 overflow-hidden"
            >
              {/* Image Reveal on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <img src={tool.image} alt="" className="w-full h-full object-cover grayscale" />
              </div>

              <div className={`w-14 h-14 ${tool.color} rounded-2xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform`}>
                <tool.icon size={28} className="text-white" />
              </div>

              <h3 className="text-2xl font-black mb-4 tracking-wide group-hover:text-industrial-red transition-colors capitalize">
                {tool.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                {tool.desc}
              </p>

              <Link 
                to="/categories/welding-tools"
                className="inline-flex items-center gap-2 text-white font-black uppercase tracking-widest text-[10px] hover:text-industrial-red transition-colors"
              >
                View Collection <ChevronRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Secondary Services Row */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-40 h-40 bg-industrial-red rounded-[2.5rem] flex-shrink-0 flex items-center justify-center shadow-3xl shadow-industrial-red/20">
                    <Settings size={60} className="text-white animate-spin-slow" />
                </div>
                <div>
                   <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Tool Storage & Org</h3>
                   <p className="text-gray-400 font-medium mb-6">Industrial toolboxes, cabinets, and pipe wrenches for organized workshops.</p>
                   <Link to="/categories/tool-storage" className="bg-white text-industrial-dark px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-industrial-red hover:text-white transition-all shadow-xl">Browse Storage</Link>
                </div>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-40 h-40 bg-industrial-dark border border-white/10 rounded-[2.5rem] flex-shrink-0 flex items-center justify-center shadow-3xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1504148455328-497c5ae69495?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-50" alt="" />
                </div>
                <div>
                   <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Agri & Garden Gear</h3>
                   <p className="text-gray-400 font-medium mb-6">Petrol tillers, brush cutters, and sprayers for intensive farming.</p>
                   <Link to="/categories/agriculture-tools" className="bg-industrial-red text-white px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-industrial-dark transition-all shadow-xl">Explore Agriculture</Link>
                </div>
            </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />
    </section>
  );
};

export default IndustrialFeatured;
