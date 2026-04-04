import React from 'react';
import { Phone, MessageCircle, Instagram, MapPin } from 'lucide-react';

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-[9999]">
      
      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/919504391391" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_rgba(34,197,94,0.4)] hover:shadow-[0_8px_30px_rgba(34,197,94,0.6)] hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
      >
        <span className="absolute inset-0 rounded-full animate-ping bg-green-500 opacity-20"></span>
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap transition-all duration-300 pointer-events-none shadow-lg">
          WHATSAPP
        </span>
      </a>

      {/* Instagram Button */}
      <a 
        href="https://www.instagram.com/dushyant_power_tools_sidhi/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative w-14 h-14 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 transform hover:scale-110"
      >
        <Instagram size={24} />
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap transition-all duration-300 pointer-events-none shadow-lg">
          INSTAGRAM
        </span>
      </a>

      {/* GPS Button */}
      <a 
        href="https://www.google.com/maps?daddr=45,+Sidhi,+Madhya+Pradesh+486661" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 transform hover:scale-110"
      >
        <MapPin size={24} />
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap transition-all duration-300 pointer-events-none shadow-lg">
          SHOP LOCATION
        </span>
      </a>

      {/* Call Button */}
      <a 
        href="tel:+919399357998" 
        className="group relative w-14 h-14 bg-industrial-red rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_rgba(220,38,38,0.4)] hover:shadow-[0_8px_30px_rgba(220,38,38,0.6)] hover:bg-red-700 transition-all duration-300 transform hover:scale-110"
      >
        <Phone size={24} />
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap transition-all duration-300 pointer-events-none shadow-lg">
          DIRECT CALL
        </span>
      </a>

    </div>
  );
};

export default FloatingButtons;
