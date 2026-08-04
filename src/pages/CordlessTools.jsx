import React from 'react';
import { motion } from 'framer-motion';
import { cordlessData } from '../data/cordlessData';
import { ChevronRight, ShoppingCart, ShieldCheck, Zap, Battery } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/CordlessTools.css';

// Official INGCO India prices (sale / original)
const INGCO_PRICES = {
  CMLI20228:   { sale: 5217,  original: 7672,  discount: 32 },
  FBLI20011:   { sale: 1867,  original: 2746,  discount: 32 },
  CIWLI2085:   { sale: 14954, original: 21778, discount: 31 },
  CABLI203235: { sale: 5160,  original: 7036,  discount: 27 },
  CIDLI20668:  { sale: 7622,  original: 10889, discount: 30 },
  CDLI12428:   { sale: 2151,  original: 2933,  discount: 27 },
  CRHLI201681: { sale: 6755,  original: 9649,  discount: 30 },
  CRHLI201881: { sale: 7725,  original: 11035, discount: 30 },
  CSDLI08025:  { sale: 2668,  original: 3923,  discount: 32 },
  CIWLI2050:   { sale: 11315, original: 16478, discount: 31 },
  CSDLI0442:   { sale: 1277,  original: 1825,  discount: 30 },
  CDLI1228:    { sale: 4011,  original: 5899,  discount: 32 },
  CDRLI2060152:{ sale: 7505,  original: 10721, discount: 30 },
  CSDLI04425:  { sale: 1695,  original: 2312,  discount: 27 },
  CIDLI201452: { sale: 7422,  original: 10602, discount: 30 },
  FCLI20411:   { sale: 1885,  original: 2571,  discount: 27 },
  CWLI20258:   { sale: 5527,  original: 8127,  discount: 32 },
  CGTLI20018:  { sale: 3044,  original: 4151,  discount: 27 },
  CIWLI2035:   { sale: 7846,  original: 11209, discount: 30 },
  CIDLI20768:  { sale: 8500,  original: 12260, discount: 31 },
  COSLI23048:  { sale: 9957,  original: 14361, discount: 31 },
  CIDLI12206:  { sale: 3312,  original: 4870,  discount: 32 },
  CDLI122061:  { sale: 2121,  original: 3119,  discount: 32 },
  CSDLI04062:  { sale: 2026,  original: 2979,  discount: 32 },
  CIDLI20868:  { sale: 10928, original: 15762, discount: 31 },
  CDLI20602:   { sale: 7153,  original: 10219, discount: 30 },
  CDLI205582:  { sale: 4287,  original: 6305,  discount: 32 },
  CIDLI20558:  { sale: 6551,  original: 9634,  discount: 32 },
  CKLI20275:   { sale: 10945, original: 15939, discount: 31 },
  CKLI20277:   { sale: 10945, original: 15939, discount: 31 },
  CPWLI20362:  { sale: 5002,  original: 7356,  discount: 32 },
  FBLI20021:   { sale: 3088,  original: 4540,  discount: 32 },
  CIDLI20968:  { sale: 11785, original: 17163, discount: 31 },
  CIDLI209686: { sale: 11785, original: 17163, discount: 31 },
  CDLI12456:   { sale: 1620,  original: 2382,  discount: 32 },
  FBCPK2425:   { sale: 10838, original: 15631, discount: 31 },
  CIDLI205581: { sale: 3217,  original: 4730,  discount: 32 },
  CIWLI20351:  { sale: 5694,  original: 8373,  discount: 32 },
  COSLI250281: { sale: 26677, original: 39231, discount: 32 },
  HKTHP31521:  { sale: 17864, original: 26270, discount: 32 },
  CMGLI0801:   { sale: 2916,  original: 4289,  discount: 32 },
  CHTLI20461:  { sale: 6119,  original: 8999,  discount: 32 },
  COSLI23056:  { sale: 8743,  original: 12610, discount: 31 },
  CIWLI20236:  { sale: 8743,  original: 12610, discount: 31 },
  CAGLI2210032:{ sale: 12026, original: 17514, discount: 31 },
  CIWLI2040:   { sale: 8711,  original: 12564, discount: 31 },
  COSLI250586: { sale: 16435, original: 24169, discount: 32 },
  CAGLI211041: { sale: 12026, original: 17514, discount: 31 },
  AP140016:    { sale: 5737,  original: 8437,  discount: 32 },
};

const CordlessTools = () => {
  const navigate = useNavigate();
  return (
    <div className="cordless-page">
      {/* Hero Section */}
      <section className="cordless-hero">
        <img 
          src={cordlessData.heroImage} 
          alt={cordlessData.pageTitle} 
          className="cordless-hero-img"
        />
        <div className="cordless-hero-overlay"></div>
        <div className="cordless-hero-content">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {cordlessData.pageTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {cordlessData.categoryDescription}
          </motion.p>
        </div>
      </section>

      <div className="cordless-container">
        {/* Breadcrumbs */}
        <nav className="breadcrumb-nav">
          <Link to="/">Home</Link>
          <ChevronRight size={12} />
          <span className="current">{cordlessData.pageTitle}</span>
        </nav>

        {/* Features Row */}
        <div className="flex flex-wrap gap-8 mb-16">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-industrial-red" size={24} />
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-tighter text-industrial-dark">INDUSTRIAL GRADE</h4>
              <p className="text-[10px] font-bold text-gray-400">Extreme Durability</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Zap className="text-industrial-red" size={24} />
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-tighter text-industrial-dark">BRUSHLESS TECH</h4>
              <p className="text-[10px] font-bold text-gray-400">Maximum Efficiency</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Battery className="text-industrial-red" size={24} />
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-tighter text-industrial-dark">SMART P20S</h4>
              <p className="text-[10px] font-bold text-gray-400">Universal Battery</p>
            </div>
          </div>
        </div>

        {/* Sidebar + Main Layout */}
        <div className="cordless-layout">
          {/* Sidebar */}
          <aside className="cordless-sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-heading">Categories</h3>
              <ul className="sidebar-links">
                <li><Link to="/cordless-tools" className="sidebar-link active-link">Cordless Tools</Link></li>
                <li><Link to="/categories/power-tools" className="sidebar-link">Professional Power Solutions</Link></li>
                <li><Link to="/categories/hand-tools" className="sidebar-link">Industrial Hub</Link></li>
                <li><Link to="/categories/hardware" className="sidebar-link">Hardware Solutions</Link></li>
              </ul>
            </div>
            <div className="sidebar-section">
              <h3 className="sidebar-heading">Company</h3>
              <ul className="sidebar-links">
                <li><Link to="/about" className="sidebar-link">About</Link></li>
                <li><Link to="/services" className="sidebar-link">Services</Link></li>
                <li><Link to="/contact" className="sidebar-link">Contact</Link></li>
              </ul>
            </div>
            <div className="sidebar-section">
              <h3 className="sidebar-heading">Support Portal</h3>
              <ul className="sidebar-links">
                <li><Link to="/track-order" className="sidebar-link">Track Order</Link></li>
                <li><Link to="/dealer-login" className="sidebar-link">Dealer Login</Link></li>
              </ul>
            </div>
            <div className="sidebar-warranty">
              <h3 className="sidebar-warranty-title">Warranty Hub</h3>
              <p className="sidebar-warranty-text">Protect your tools with our comprehensive after-sales service. Register for hassle-free warranty claims.</p>
              <Link to="/warranty-claim" className="sidebar-warranty-btn">Register Now</Link>
            </div>
          </aside>

          {/* Main Content */}
          <div className="cordless-main">

            {/* Product Grid */}
            <div className="cordless-grid">
          {cordlessData.products.map((product, idx) => (
            <motion.div
              key={`${product.productId}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="cordless-card"
            >
              <div className="cordless-card-img">
                <img src={product.image} alt={product.name} />
                <div className="cordless-badge-wrap">
                  {product.tags && product.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="cordless-badge">{tag}</span>
                  ))}
                </div>
              </div>
              
              <div className="cordless-card-body">
                <span className="model-no">{product.productId}</span>
                <h3>{product.name}</h3>
                
                <div className="cordless-specs">
                  {product.description.voltage && (
                    <div className="spec-row">
                      <span className="spec-label">Voltage</span> 
                      <span className="spec-value">{product.description.voltage}</span>
                    </div>
                  )}
                  {product.description.noLoadSpeed && (
                    <div className="spec-row">
                      <span className="spec-label">Speed</span> 
                      <span className="spec-value truncate ml-2">{product.description.noLoadSpeed}</span>
                    </div>
                  )}
                  {product.description.spec && (
                    <div className="spec-row">
                      <span className="spec-label">Capacity</span> 
                      <span className="spec-value truncate ml-2">{product.description.spec}</span>
                    </div>
                  )}
                </div>

                <div className="cordless-card-footer">
                  {(() => {
                    const p = INGCO_PRICES[product.productId];
                    return p ? (
                      <div className="cordless-price-block">
                        <div className="cordless-price-row">
                          <span className="cordless-sale-price">₹{p.sale.toLocaleString('en-IN')}</span>
                          <span className="cordless-orig-price">₹{p.original.toLocaleString('en-IN')}</span>
                          <span className="cordless-discount-badge">{p.discount}% OFF</span>
                        </div>
                      </div>
                    ) : (
                      <span className="cordless-price-login" onClick={() => navigate('/login')}>
                        Login for Price →
                      </span>
                    );
                  })()}
                  <div className="cordless-btn-row">
                    <Link to={`/product/${product.productId}`} className="view-btn">View Details</Link>
                    <button className="cart-icon-btn">
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
            </div>

            {/* Marketing Banner */}
            <div className="marketing-banner">
              <div className="banner-content">
                <h2>One Battery For All</h2>
                <p>Power over 100+ Ingco tools with the same Lithium-Ion battery. Save money and reduces clutter with the P20S system.</p>
              </div>
              <Link to="/brand/INGCO" className="banner-cta">Explore P20S Series</Link>
            </div>

            {/* FAQs */}
            {cordlessData.faq && cordlessData.faq.length > 0 && (
              <div className="cordless-faq">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-grid">
                  {cordlessData.faq.map((item, idx) => {
                    const defaultAnswers = {
                      "Can INGCO 20V Cordless Tools work on same battery?": "Yes, INGCO features the P20S platform where one 20V Lithium-Ion battery works across more than 100 different tools, from drills to blowers.",
                      "Can INGCO P20S Cordless Tools cover the functions of power tools and hand tools?": "Absolutely. Our P20S range includes heavy-duty impact wrenches, rotary hammers, and high-precision saws that match corded performance while providing cordless freedom."
                    };
                    return (
                      <div key={idx} className="faq-card">
                        <h4>{item.question}</h4>
                        <p>{item.answer || defaultAnswers[item.question] || "Contact our support for more technical details about our cordless tool range."}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CordlessTools;
