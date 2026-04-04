import React from 'react';
import { ChevronRight, PhoneCall, Shield, Zap, Settings } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative bg-industrial-dark text-white min-h-screen flex items-center overflow-hidden">
      {/* Solid Background Elements */}
      <div className="absolute inset-0 z-0 bg-black">
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://bscpowertools.com/wp-content/uploads/2024/04/Chainsaw-2-2-scaled.jpg"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://bscpowertools.com/wp-content/uploads/2024/02/BSC-7200-Chainsaw.mp4#t=5" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Very subtle overlay only for text legibility */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex items-center gap-3 bg-industrial-dark/80 border border-white/20 px-6 py-2.5 rounded-full text-sm font-bold mb-8 shadow-xl shadow-black/40 self-start transition-colors w-max">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-industrial-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-industrial-red"></span>
            </span>
            <span className="text-white tracking-wider uppercase text-xs">Top Rated Industrial Supplier in MP</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-[1.1] text-white">
            Unleash <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-industrial-red to-red-600 drop-shadow-[0_2px_10px_rgba(220,38,38,0.5)]">
               Ultimate Power
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white mb-10 max-w-xl leading-relaxed font-bold bg-industrial-dark/40 p-2 rounded-lg">
            Equip your workshop with heavy-duty tools, premium spare parts, and unbreakable diamond blades engineered for professional contractors.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mb-12">
            <a href="#products" className="group bg-industrial-red hover:bg-red-700 text-white px-8 py-4.5 rounded-xl font-black text-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-[0_8px_20px_rgba(220,38,38,0.4)]">
              Explore Catalog
              <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="tel:+919399357998" className="bg-white text-industrial-dark hover:bg-gray-100 border border-white px-8 py-4.5 rounded-xl font-black text-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-xl">
              <PhoneCall size={22} className="text-industrial-red" />
              Contact Sales
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-8 pt-6 border-t border-white/30">
            <div className="flex items-center gap-2">
              <Shield className="text-industrial-red shrink-0" size={24} />
              <div className="text-sm font-bold text-white">Certified<br/>Original Parts</div>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="text-industrial-red shrink-0" size={24} />
              <div className="text-sm font-bold text-white">Heavy Duty<br/>Performance</div>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="text-industrial-red shrink-0" size={24} />
              <div className="text-sm font-bold text-white">Expert<br/>Repair Support</div>
            </div>
          </div>
        </div>



      </div>
    </section>
  );
};

export default Hero;
