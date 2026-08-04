import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone, Mail, Hammer, Smartphone, Clock, ExternalLink } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  const quickLinks = [
    { name: 'Home',         path: '/' },
    { name: 'About Us',     path: '/about' },
    { name: 'Products',     path: '/categories' },
    { name: 'Services',     path: '/services' },
    { name: 'Contact',      path: '/contact' },
    { name: 'Track Order',  path: '/track-order' },
  ];

  const services = [
    'Power Tool Sales',
    'Expert Repair',
    'Spare Parts Supply',
    'Industrial Equipment',
    'Warranty Support',
  ];

  return (
    <footer className="footer-container">
      <div className="footer-inner">

        {/* ── Map + Info Banner ────────────────────────────── */}
        <div className="footer-map-section">
          <div className="footer-map-embed">
            <iframe
              title="Dushyant Power Tools Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3636.123456789!2d81.8836!3d24.4123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDI0JzQ0LjMiTiA4McKwNTMnMDEuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="footer-map-info">
            <div className="footer-map-info__logo">
              <img 
                src="/dpt-logo.png" 
                alt="Dushyant Power Tools" 
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div>
                <h3 className="footer-map-info__name">Dushyant Power Tools</h3>
                <p className="footer-map-info__tagline">Sawmill Service • Est. 1998</p>
              </div>
            </div>
            <div className="footer-map-info__details">
              <div className="footer-map-info__row">
                <MapPin size={16} className="footer-map-info__icon" />
                <span>Gopal Das Rd, Sidhi, Jamodi Khurd, Madhya Pradesh 486661</span>
              </div>
              <div className="footer-map-info__row">
                <Phone size={16} className="footer-map-info__icon" />
                <a href="tel:+919754015503">+91 97540 15503</a>
              </div>
              <div className="footer-map-info__row">
                <Clock size={16} className="footer-map-info__icon" />
                <span>Mon–Sat: 10:00 AM – 8:59 PM</span>
              </div>
              <div className="footer-map-info__row">
                <Mail size={16} className="footer-map-info__icon" />
                <span>info@dushyantpowertools.com</span>
              </div>
            </div>
            <div className="footer-map-info__badges">
              <span className="footer-map-info__badge footer-map-info__badge--green">
                <span className="footer-map-info__dot"></span> Open Now
              </span>
              <span className="footer-map-info__badge">
                ⭐ 5.0 · 17 Google Reviews
              </span>
            </div>
            <a 
              href="https://www.google.com/maps/dir//Gopal+Das+Rd,+Sidhi,+Jamodi+Khurd,+Madhya+Pradesh+486661" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-map-info__directions-btn"
            >
              <MapPin size={14} /> Get Directions <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* ── Main Grid ───────────────────────────────────── */}
        <div className="footer-top">

          {/* Brand col */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img 
                src="/dpt-logo.png" 
                alt="DPT" 
                onError={(e) => { 
                  e.target.style.display = 'none'; 
                }}
              />
              <span className="footer-logo-name">Dushyant Power Tools</span>
            </div>
            <p>
              Your trusted partner for professional power tools, industrial equipment,
              genuine spare parts, and reliable repair services since 1998. Located at Gandhi Chowk, Sidhi (M.P).
            </p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/dushyant_power_tools_sidhi/" target="_blank" rel="noopener noreferrer" className="social-circle" title="Instagram – Power Tools">
                <Instagram size={17} />
              </a>
              <a href="https://www.instagram.com/dushyant_furniture_mart/" target="_blank" rel="noopener noreferrer" className="social-circle" title="Instagram – Furniture Mart">
                <Instagram size={17} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-circle" title="Facebook">
                <Facebook size={17} />
              </a>
              <a href="https://wa.me/919754015503" target="_blank" rel="noopener noreferrer" className="social-circle" title="WhatsApp">
                <Smartphone size={17} />
              </a>
              <a href="https://www.google.com/maps/dir//Gopal+Das+Rd,+Sidhi,+Jamodi+Khurd,+Madhya+Pradesh+486661" target="_blank" rel="noopener noreferrer" className="social-circle" title="Location">
                <MapPin size={17} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="footer-col-title">Quick Links</h3>
            {quickLinks.map(l => (
              <Link key={l.path} to={l.path} className="footer-link">{l.name}</Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <h3 className="footer-col-title">Our Services</h3>
            {services.map(s => (
              <a key={s} href="#services" className="footer-link">{s}</a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h3 className="footer-col-title">Contact Info</h3>
            <div className="footer-contact-item">
              <MapPin size={16} className="footer-contact-icon" />
              <span>Gopal Das Rd, Sidhi, Jamodi Khurd, M.P. 486661</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} className="footer-contact-icon" />
              <a href="tel:+919754015503" style={{ color: 'inherit', textDecoration: 'none' }}>+91 97540 15503</a>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} className="footer-contact-icon" />
              <span>info@dushyantpowertools.com</span>
            </div>
            <div className="footer-contact-item">
              <Clock size={16} className="footer-contact-icon" />
              <span>Mon–Sat: 10 AM – 9 PM</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="footer-disclaimer">
          <p>
            <strong>Disclaimer:</strong> Despite every effort to provide accurate images of product color, design, and packaging, actual items may vary slightly due to screen settings and manufacturing differences. We do not accept responsibility for non-factory variations. By purchasing, you accept this minor risk.
          </p>
        </div>

        <div className="footer-divider"></div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© 2026 Dushyant Power Tools Pvt. Ltd. All Rights Reserved.</p>
          <p className="footer-bottom-tagline">
            <Hammer size={14} />
            Built for <span>Professionals</span> · Powered by Dushyant India
          </p>
          <div className="footer-bottom-links">
            <Link to="/about">Terms & Conditions</Link>
            <Link to="/about">Privacy Policy</Link>
            <Link to="/contact">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
