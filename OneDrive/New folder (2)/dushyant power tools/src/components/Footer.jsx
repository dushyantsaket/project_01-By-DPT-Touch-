import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Hammer, Smartphone } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Instagram', path: '/instagram' },
    { name: 'Facebook', path: '/facebook' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-industrial-dark text-white pt-20 pb-10 border-t-4 border-industrial-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-white border-b-2 border-industrial-red pb-1 inline-block">
                <span className="text-industrial-red">Dushyant</span> Power Tools
              </h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
              Your trusted partner for professional power tools, high-quality industrial equipment, genuine spare parts, and reliable repair services in Sidhi, MP.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.instagram.com/dushyant_power_tools_sidhi/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-industrial-red hover:text-white transition-all shadow-md" title="Instagram - Power Tools">
                <Instagram size={18} />
              </a>
              <a href="https://www.instagram.com/dushyant_furniture_mart/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-industrial-red hover:text-white transition-all shadow-md" title="Instagram - Furniture Mart">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-industrial-red hover:text-white transition-all shadow-md" title="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://wa.me/919504391391" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-industrial-red hover:text-white transition-all shadow-md" title="WhatsApp">
                <Smartphone size={18} />
              </a>
              <a href="https://www.google.com/maps?daddr=45,+Sidhi,+Madhya+Pradesh+486661" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-industrial-red hover:text-white transition-all shadow-md" title="Our Location">
                <MapPin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-white tracking-wide uppercase">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-gray-400 hover:text-industrial-red transition-colors text-sm font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-industrial-red"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-white tracking-wide uppercase">Our Services</h3>
            <ul className="space-y-3">
              {['Power Tool Sales', 'Expert Repair', 'Spare Parts Supply', 'Industrial Equipment', 'Warranty Support'].map((item, i) => (
                <li key={i}>
                  <a href="#services" className="text-gray-400 hover:text-industrial-red transition-colors text-sm font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-industrial-red"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-white tracking-wide uppercase">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-industrial-red flex-shrink-0 mt-0.5" />
                <a href="https://www.google.com/maps?daddr=45,+Sidhi,+Madhya+Pradesh+486661" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                  45, Sidhi, Madhya Pradesh 486661
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-industrial-red flex-shrink-0" />
                <span className="text-gray-400 text-sm font-medium">+91 93993 57998</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-industrial-red flex-shrink-0" />
                <span className="text-gray-400 text-sm font-medium">info@dushyantpowertools.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm font-medium text-center md:text-left">
            &copy; 2026 Dushyant Power Tools. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
            <Hammer size={16} className="text-industrial-red" />
            <span>Built for Professionals</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
