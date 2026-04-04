import React from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Navigation, Clock, ShieldCheck, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden selection:bg-industrial-red selection:text-white">
      {/* Strategic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
         <div className="absolute top-1/4 left-10 w-64 h-64 border border-industrial-red rounded-full"></div>
         <div className="absolute bottom-1/4 right-10 w-96 h-96 border-4 border-industrial-red rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-industrial-red font-black tracking-widest uppercase text-xs mb-4 block"
          >
            Tactical Communications
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black mb-6"
          >
            Get In <span className="text-industrial-red underline decoration-transparent group-hover:decoration-industrial-red transition-all">Touch</span>
          </motion.h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs max-w-2xl mx-auto leading-relaxed">
            Connect with our technical support centers for procurement inquiries or strategic tool maintenance.
          </p>
        </div>

        {/* ── WhatsApp Direct Chat Banner ── */}
        <motion.a
          href="https://wa.me/919399357998?text=Hello%20Dushyant%20Power%20Tools%2C%20I%20would%20like%20to%20enquire%20about%20your%20products."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="group flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#25D366] hover:bg-[#1ebe5d] transition-all duration-300 rounded-[2rem] px-8 py-7 shadow-[0_8px_30px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.5)] mb-16 cursor-pointer"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-all">
              <MessageCircle size={28} className="text-white" />
            </div>
            <div>
              <p className="text-white font-black uppercase tracking-widest text-sm">Chat With Us on WhatsApp</p>
              <p className="text-white/70 font-bold uppercase tracking-widest text-[10px] mt-0.5">Instant replies · Mon–Sat · 9AM – 7PM</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white text-[#25D366] font-black text-[11px] uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-lg group-hover:scale-105 transition-transform flex-shrink-0">
            <MessageCircle size={16} />
            START CHAT NOW
          </div>
        </motion.a>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Contact Details & Map */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-8"
          >
            <div className="bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 relative overflow-hidden group h-full">
              <div className="absolute top-0 right-0 p-8 text-industrial-red opacity-10 flex gap-1 items-end animate-pulse">
                 <div className="w-1 h-3 bg-current"></div>
                 <div className="w-1 h-6 bg-current"></div>
                 <div className="w-1 h-4 bg-current"></div>
              </div>
              
              <h3 className="text-2xl font-black mb-10 text-black uppercase tracking-tighter">Command Center Coordinates</h3>
              
              <div className="space-y-10">
                <div className="flex items-start gap-6 group/item">
                  <div className="w-14 h-14 bg-white text-industrial-red rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover/item:bg-industrial-red group-hover/item:text-white transition-all duration-500">
                    <MapPin size={26} />
                  </div>
                  <div>
                    <h4 className="font-black text-black uppercase tracking-widest text-[10px] mb-2 text-gray-400">HQ Location</h4>
                    <p className="text-base font-black text-black uppercase tracking-tight">45, Sidhi, Madhya Pradesh 486661</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group/item">
                  <div className="w-14 h-14 bg-white text-industrial-red rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover/item:bg-industrial-red group-hover/item:text-white transition-all duration-500">
                    <Phone size={26} />
                  </div>
                  <div>
                    <h4 className="font-black text-black uppercase tracking-widest text-[10px] mb-2 text-gray-400">Direct Lines</h4>
                    <a href="tel:+919399357998" className="text-base font-black text-black uppercase tracking-tight hover:text-industrial-red transition-colors block">+91 93993 57998</a>
                    <a href="tel:+918427990176" className="text-base font-black text-black uppercase tracking-tight hover:text-industrial-red transition-colors block mt-1">+91 84279 90176</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group/item">
                  <div className="w-14 h-14 bg-white text-industrial-red rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover/item:bg-industrial-red group-hover/item:text-white transition-all duration-500">
                    <Mail size={26} />
                  </div>
                  <div>
                    <h4 className="font-black text-black uppercase tracking-widest text-[10px] mb-2 text-gray-400">Email Gateway</h4>
                    <a href="mailto:info@dushyantpowertools.com" className="text-base font-black text-black uppercase tracking-tight hover:text-industrial-red transition-colors">info@dushyantpowertools.com</a>
                  </div>
                </div>

                {/* WhatsApp Direct */}
                <div className="flex items-start gap-6 group/item">
                  <a
                    href="https://wa.me/919399357998?text=Hello%20Dushyant%20Power%20Tools%2C%20I%20would%20like%20to%20enquire%20about%20your%20products."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg hover:bg-[#1ebe5d] transition-all duration-300"
                  >
                    <MessageCircle size={26} />
                  </a>
                  <div>
                    <h4 className="font-black text-black uppercase tracking-widest text-[10px] mb-2 text-gray-400">WhatsApp Chat</h4>
                    <a
                      href="https://wa.me/919399357998?text=Hello%20Dushyant%20Power%20Tools%2C%20I%20would%20like%20to%20enquire%20about%20your%20products."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-black text-black uppercase tracking-tight hover:text-[#25D366] transition-colors block"
                    >
                      +91 93993 57998
                    </a>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tap to open WhatsApp directly</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-12 pt-10 border-t border-gray-200 flex gap-4">
                {[
                  { icon: MessageCircle, url: 'https://wa.me/919399357998?text=Hello%20Dushyant%20Power%20Tools%2C%20I%20would%20like%20to%20enquire%20about%20your%20products.', color: 'hover:bg-[#25D366]' },
                  { icon: Instagram, url: 'https://www.instagram.com/dushyant_power_tools_sidhi/', color: 'hover:bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' },
                  { icon: Navigation, url: 'https://www.google.com/maps?daddr=45,+Sidhi,+Madhya+Pradesh+486661', color: 'hover:bg-blue-600' },
                  { icon: ShieldCheck, url: '#', color: 'hover:bg-green-600' }
                ].map((s, idx) => (
                  <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer" className={`w-12 h-12 bg-white text-gray-400 rounded-2xl flex items-center justify-center transition-all shadow-sm hover:text-white hover:shadow-xl hover:-translate-y-1 ${s.color}`}>
                    <s.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Google Map Iframe */}
            <div className="h-64 rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 grayscale hover:grayscale-0 transition-all duration-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14614.99616238612!2d81.8745!3d24.4172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398687a7a7a7a7a7%3A0x7a7a7a7a7a7a7a7a!2sSidhi%2C%20Madhya%20Pradesh%20486661!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Google Maps Location"
              ></iframe>
            </div>
          </motion.div>

          {/* Strategic Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-industrial-dark p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-white/5"
          >
            <div className="absolute top-0 right-0 p-12 text-industrial-red opacity-10">
               <Send size={240} className="rotate-12" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-2 text-white uppercase tracking-tighter">Strategic Message</h3>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-12">Submit Personnel Identification for Response Protocol</p>
              
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 pl-1">Personnel Identification</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-sm font-bold placeholder-gray-700 focus:bg-white/10 focus:border-industrial-red focus:outline-none transition-all" placeholder="FULL NAME" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 pl-1">Communication Gateway</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-sm font-bold placeholder-gray-700 focus:bg-white/10 focus:border-industrial-red focus:outline-none transition-all" placeholder="EMAIL ADDRESS" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 pl-1">Inquiry Parameters</label>
                  <textarea rows="5" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-sm font-bold placeholder-gray-700 focus:bg-white/10 focus:border-industrial-red focus:outline-none transition-all resize-none" placeholder="DECLARE YOUR REQUIREMENTS..."></textarea>
                </div>
                
                <button type="submit" className="w-full bg-industrial-red hover:bg-red-700 text-white font-black text-xs tracking-widest uppercase py-6 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-red-500/20 active:scale-95">
                  <Send size={18} />
                  DEPLOY MESSAGE
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
