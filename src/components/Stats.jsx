import React from 'react';

const stats = [
  { value: '500+', label: 'Products Available' },
  { value: '10+', label: 'Years Experience' },
  { value: '50+', label: 'Brands Available' },
  { value: '10K+', label: 'Happy Customers' },
];

const Stats = () => {
  return (
    <section style={{ background: '#111', padding: '48px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px', textAlign: 'center' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ padding: '20px 0' }}>
            <p style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#dc2626', letterSpacing: '-0.04em', lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#6b7280', marginTop: '8px' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
