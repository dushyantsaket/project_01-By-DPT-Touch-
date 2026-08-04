import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Rajesh Kumar',
    role: 'Construction Contractor',
    text: 'Dushyant Power Tools provides the most durable equipment I have ever used. Their rotary hammers and diamond blades are top-notch and have significantly improved our team\'s efficiency.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
  },
  {
    name: 'Amit Singh',
    role: 'Workshop Owner',
    text: 'Their spare parts inventory is unmatched in the region. Whenever I need something for my repairs, I know they have it. Excellent service and highly professional staff.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
  },
  {
    name: 'Vikram Patel',
    role: 'Fabrication Engineer',
    text: 'The angle grinders and TCT blades I purchased here have lasted longer than any other brand. They truly understand what industrial-grade means. Highly recommended for professionals.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
  },
];

const Reviews = () => {
  return (
    <section id="reviews" style={{ padding: '64px 0', background: '#fff' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#dc2626', marginBottom: '8px' }}>Testimonials</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.04em', color: '#111' }}>
            Hear from our <span style={{ color: '#dc2626' }}>Professionals</span>
          </h2>
          <div style={{ width: '48px', height: '4px', background: '#dc2626', borderRadius: '0', margin: '16px auto 0' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {reviews.map((review, index) => (
            <div key={index} style={{ background: '#f9fafb', border: '1px solid #f0f0f0', padding: '40px 32px 32px', borderRadius: '0', position: 'relative', marginTop: '32px' }}>
              
              {/* Avatar protruding from top */}
              <div style={{ position: 'absolute', top: '-32px', left: '32px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '0', border: '4px solid #fff', overflow: 'hidden', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
                  <img src={review.avatar} alt={review.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              
              <div style={{ position: 'absolute', top: '24px', right: '24px', color: '#dc2626', opacity: 0.1 }}>
                <Quote size={48} />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '2px', color: '#f59e0b', marginBottom: '16px' }}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                
                <p style={{ fontSize: '14px', color: '#4b5563', fontWeight: 600, fontStyle: 'italic', lineHeight: 1.7, marginBottom: '24px' }}>
                  "{review.text}"
                </p>
              </div>
              
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 900, color: '#111', textTransform: 'uppercase', marginBottom: '2px' }}>{review.name}</h4>
                <p style={{ fontSize: '10px', color: '#dc2626', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
