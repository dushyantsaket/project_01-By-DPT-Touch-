import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, User, ShoppingCart, Search, Package } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/categories' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Latest News', path: '/latest-news' },
    { name: 'Instagram', path: '/instagram' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${(isScrolled || !isHomePage)
      ? 'bg-white shadow-xl py-2 border-b border-gray-100'
      : 'bg-transparent py-6 border-b border-white/5'
      } uppercase tracking-tighter`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="group flex items-center gap-4">
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full p-0.5 overflow-hidden shadow-lg transition-all duration-500 scale-100 group-hover:scale-105 ${(isScrolled || !isHomePage) ? 'bg-industrial-dark' : 'bg-white/10 backdrop-blur-md border border-white/20'
                }`}>
                <img
                  src="data:image/png;base64,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"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <h1 className={`text-xl md:text-2xl font-black tracking-tighter flex items-center leading-none transition-colors duration-500 ${(isScrolled || !isHomePage) ? 'text-black' : 'text-white'
                  }`}>
                  <span className="text-industrial-red">DUSHYANT</span>
                </h1>
                <span className={`text-[10px] md:text-[12px] font-black tracking-[0.2em] transition-colors duration-500 ${(isScrolled || !isHomePage) ? 'text-gray-400 group-hover:text-black' : 'text-white/60 group-hover:text-white'
                  }`}>POWER TOOLS</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-6">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-1 py-2 font-black text-[11px] tracking-widest transition-all duration-500 decoration-2 underline-offset-8 hover:underline hover:decoration-industrial-red ${(isScrolled || !isHomePage)
                    ? (location.pathname === link.path ? 'text-industrial-red underline decoration-industrial-red' : 'text-industrial-dark hover:text-industrial-red')
                    : (location.pathname === link.path ? 'text-industrial-red underline decoration-industrial-red' : 'text-white hover:text-industrial-red')
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Action Icons */}
          <div className="hidden lg:flex items-center space-x-5">
            <button className={`transition-colors duration-500 ${(isScrolled || !isHomePage) ? 'text-industrial-dark' : 'text-white hover:text-industrial-red'}`}>
              <Search size={20} />
            </button>
            <Link to="/cart" className={`relative group transition-colors duration-500 ${(isScrolled || !isHomePage) ? 'text-industrial-dark' : 'text-white hover:text-industrial-red'}`}>
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-industrial-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">0</span>
            </Link>
            <Link to="/admin-login" className={`flex items-center gap-2 transition-all border px-4 py-2 rounded-full font-black text-[10px] tracking-widest ${(isScrolled || !isHomePage)
              ? 'text-industrial-dark border-gray-200 hover:border-industrial-red hover:text-industrial-red'
              : 'text-white border-white/20 hover:bg-white hover:text-industrial-dark'
              }`}>
              <User size={14} />
              <span>ADMIN</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-4">
            <Link to="/cart" className={`relative transition-colors duration-500 ${(isScrolled || !isHomePage) ? 'text-industrial-dark' : 'text-white'}`}>
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-industrial-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-colors duration-500 ${(isScrolled || !isHomePage) ? 'text-industrial-dark' : 'text-white'}`}
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-8 space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-4 py-4 rounded-xl text-[11px] font-black tracking-[0.2em] border border-transparent uppercase ${location.pathname === link.path ? 'bg-red-50 text-industrial-red border-red-100' : 'text-industrial-dark active:bg-gray-50'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 grid grid-cols-2 gap-3">
              <Link
                to="/admin-login"
                className="flex items-center justify-center gap-2 bg-gray-100 text-industrial-dark px-4 py-5 rounded-xl font-black text-[10px] tracking-widest uppercase"
                onClick={() => setIsOpen(false)}
              >
                <User size={18} />
                ADMIN
              </Link>
              <a
                href="tel:+919399357998"
                className="flex items-center justify-center gap-2 bg-industrial-red text-white px-4 py-5 rounded-xl font-black text-[10px] tracking-widest uppercase shadow-lg shadow-industrial-red/20"
              >
                <Phone size={18} />
                CALL
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
