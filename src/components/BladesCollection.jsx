import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bladesData } from '../data/blades';
import { useAuth } from '../context/AuthContext';
import { Disc, Info, Tag, Layers, Droplet } from 'lucide-react';
import '../styles/BladesCollection.css';

const BladesCollection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  const validBlades = bladesData.filter((blade) => blade?.name && (blade.id || blade.sku || blade.productId));
  const categories = ['All', ...new Set(validBlades.map(b => b.category).filter(Boolean))];
  
  const filteredBlades = activeCategory === 'All' 
    ? validBlades 
    : validBlades.filter(b => b.category === activeCategory);

  return (
    <section id="blades-collection" className="blades-section">
      <div className="blades-container">
        
        {/* Header Section */}
        <div className="blades-header">
          <div className="blades-header__text">
            <div className="blades-header__badge">
              <Tag size={16} />
              <span>Premium Accessories</span>
            </div>
            <h2 className="blades-header__title">
              Professional <br /><span className="blades-header__title-accent">Blades</span> Collection
            </h2>
            <p className="blades-header__desc">
              Cut through the toughest materials with our high-grade diamond and TCT saw blades.
              Engineered for precision, speed, and extended service life in extreme environments.
            </p>
            <div className="blades-header__line"></div>
          </div>
          
          <div className="blades-header__media">
            <div className="blades-header__video-wrap">
              <video 
                src="https://bscpowertools.com/wp-content/uploads/2024/02/BSC-7200-Chainsaw.mp4#t=5" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="blades-header__video"
              />
              <div className="blades-header__video-overlay">
                <div className="blades-header__video-icon">
                  <Disc className="blades-spin-slow" size={32} />
                </div>
                <p className="blades-header__video-label">High-Speed Precision</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="blades-filters">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`blades-filter-btn ${activeCategory === category ? 'blades-filter-btn--active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blades Grid */}
        <div className="blades-grid">
          {filteredBlades.map((blade, index) => {
            const bladeKey = `${blade.id || blade.sku || blade.productId}-${index}`;
            const bladeRouteId = blade.id || blade.productId || blade.sku;

            return (
            <div key={bladeKey} className="blade-card">
              
              {/* Product Image Box */}
              <div 
                className="blade-card__image"
                onClick={() => navigate(`/product/${bladeRouteId}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="blade-card__sku">{blade.sku}</div>
                <img 
                  src={blade.image_url} 
                  alt={blade.name} 
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=400";
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="blade-card__body">
                <div className="blade-card__sub-cat">{blade.sub_category}</div>
                <h3 className="blade-card__name">{blade.name}</h3>
                
                <p className="blade-card__desc">{blade.description}</p>

                {/* Specs Grid */}
                <div className="blade-card__specs">
                  <div className="blade-card__spec">
                    <Disc className="blade-card__spec-icon" size={16} />
                    <div>
                      <div className="blade-card__spec-label">Size</div>
                      <div className="blade-card__spec-value">{blade.blade_size}</div>
                    </div>
                  </div>
                  <div className="blade-card__spec">
                    <Layers className="blade-card__spec-icon" size={16} />
                    <div>
                      <div className="blade-card__spec-label">{blade.grit ? 'Grit' : 'Teeth'}</div>
                      <div className="blade-card__spec-value">{blade.grit || blade.teeth_count}</div>
                    </div>
                  </div>
                </div>

                <div className="blade-card__footer">
                  <div className="blade-card__application">
                    <Info size={14} className="blade-card__app-icon" />
                    <div className="blade-card__app-text">
                      <span className="blade-card__app-bold">Application:</span> {blade.application}
                    </div>
                  </div>

                  <div className="blade-card__actions">
                    <div className="blade-card__price-wrap">
                      {isLoggedIn ? (
                        (blade.price_inr || blade.sale_price) && blade.price_inr !== "Login to See Price" ? (
                          <>
                            <div className="blade-card__price-label">Price</div>
                            <div className="blade-card__price">
                              {blade.sale_price || `₹${blade.price_inr}`}
                            </div>
                            {blade.regular_price && blade.regular_price !== blade.sale_price && (
                              <div className="blade-card__price-old">{blade.regular_price}</div>
                            )}
                          </>
                        ) : (
                          <div className="blade-card__price-request">Price on Request</div>
                        )
                      ) : (
                        <div 
                          onClick={() => navigate('/login')}
                          className="blade-card__login-link"
                        >
                          Login to<br/>See Price
                        </div>
                      )}
                    </div>
                    <button 
                      className="blade-card__view-btn"
                      onClick={() => navigate(`/product/${bladeRouteId}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>

            </div>
          );
          })}
        </div>

      </div>
    </section>
  );
};

export default BladesCollection;
