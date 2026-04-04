import React from 'react';
import Contact from '../components/Contact';
import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <div className="pt-20 bg-industrial-dark min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 text-center">Contact Us</h1>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Have questions about our power tools or spare parts? Get in touch with our experts today.
          </p>

          {/* Professional Power Solutions Showcase */}
          <div className="mt-16 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl group border border-white/10">
               <img 
                 src="https://www.stihl.com/content/dam/stihl/media/globalvu/2026_100years_anniversary/STIHL_100Years_MS_AW_AEM-WEBSITE-TEASER_5120x1710_EN_HQ_P_2025-10_00001.jpg" 
                 alt="Professional Industrial Solutions" 
                 className="w-full h-full object-cover brightness-75 group-hover:brightness-50 transition-all duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center ring-1 ring-white/20 rounded-3xl m-4">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Industrial Power Solutions</h3>
                  <button className="w-20 h-20 bg-industrial-red rounded-full flex items-center justify-center shadow-2xl shadow-red-500/40 transform group-hover:scale-110 transition-all duration-500">
                    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <p className="text-white font-bold text-xs uppercase tracking-widest mt-6 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm shadow-xl">
                    Trusted by Industry Leaders
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl border border-white/10 group">
                  <img 
                    src="https://www.stihl.com/en/campaign/one-time-campaigns/100-years-stihl/_jcr_content/root/container/container/columncontrol_copy/column1/image.coreimg.jpeg/1767809002366/140205.jpeg" 
                    alt="Industrial Parts" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-bottom p-6">
                    <p className="text-white font-black uppercase text-sm mt-auto tracking-widest border-l-4 border-industrial-red pl-4">Premium Components</p>
                  </div>
               </div>
               <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl border border-white/10 group">
                  <img 
                    src="https://www.stihl.com/content/dam/stihl/mediapool/marketing/general-and-other-images/image-pictures/Cashback_Teaser_1298x974_Startseite.jpg" 
                    alt="Industrial Machinery" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-bottom p-6">
                    <p className="text-white font-black uppercase text-sm mt-auto tracking-widest border-l-4 border-industrial-red pl-4">Power Tools Innovation</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
        <Contact />
      </motion.div>
    </div>
  );
};

export default ContactPage;
