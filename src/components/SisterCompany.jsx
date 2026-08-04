import React from 'react';

const SisterCompany = () => {
  return (
    <section style={{ padding: '48px 0', background: '#f9fafb' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#dc2626', display: 'block', marginBottom: '8px' }}>Sister Company</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#111', textTransform: 'uppercase', letterSpacing: '-0.04em' }}>
            Dushyant <span style={{ color: '#dc2626' }}>Furniture Mart</span>
          </h2>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', marginTop: '8px', maxWidth: '500px', margin: '8px auto 0' }}>
            Since 2009, crafting premium wooden furniture for homes and offices in Sidhi. Quality craftsmanship meets modern design.
          </p>
        </div>

        {/* Store Card */}
        <div style={{ background: '#fff', borderRadius: '0', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <div style={{ height: '220px', background: '#e5e7eb', position: 'relative', overflow: 'hidden' }}>
            <img
              src="https://lh3.googleusercontent.com/p/AF1QipPAohHJhIvCxhqzZsLqJleZs9yvMQsW-wn0KOk7=s680-w680-h510"
              alt="Dushyant Furniture Mart Storefront"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
            <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '6px 12px', borderRadius: '0', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Since 2009</div>
            <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', color: '#facc15', padding: '6px 12px', borderRadius: '0', fontSize: '11px', fontWeight: 700 }}>★★★★★ 4.8</div>
          </div>

          <div style={{ padding: '28px' }}>
            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.7, marginBottom: '24px', fontStyle: 'italic' }}>
              "Best quality products and service in Sidhi. Premium furniture for every home."
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              <div style={{ background: '#f9fafb', borderRadius: '0', padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '20px', fontWeight: 900, color: '#dc2626' }}>1000+</p>
                <p style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af' }}>Products Delivered</p>
              </div>
              <div style={{ background: '#f9fafb', borderRadius: '0', padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '20px', fontWeight: 900, color: '#dc2626' }}>15+</p>
                <p style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af' }}>Years Experience</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <a href="https://www.instagram.com/dushyant_furniture_mart/" target="_blank" rel="noopener noreferrer"
                style={{ flex: '1 1 140px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#111', color: '#fff', padding: '12px', borderRadius: '0', fontWeight: 800, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none' }}>
                Instagram
              </a>
              <a href="https://maps.app.goo.gl/XyZ" target="_blank" rel="noopener noreferrer"
                style={{ flex: '1 1 140px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#dc2626', color: '#fff', padding: '12px', borderRadius: '0', fontWeight: 800, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none' }}>
                View on Map
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SisterCompany;
