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
    <section id="reviews" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="text-industrial-red font-bold tracking-widest uppercase mb-2">Testimonials</div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-industrial-dark mb-4">
            Hear from our <span className="text-industrial-red">Professionals</span>
          </h2>
          <div className="w-24 h-1.5 bg-industrial-red mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 border border-gray-100 p-8 rounded-2xl relative mt-8 hover:-translate-y-2 transition-transform duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] group">
              
              {/* Decorative Quote Icon Background */}
              <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all text-industrial-red">
                 <Quote size={80} strokeWidth={1} />
              </div>

              {/* Avatar protruding from top */}
              <div className="absolute -top-8 left-8">
                <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg overflow-hidden group-hover:scale-110 transition-transform">
                  <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="pt-8">
                <div className="flex text-yellow-400 mb-4 drop-shadow-sm">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" className="mr-0.5" />
                  ))}
                </div>
                
                <p className="text-gray-600 italic mb-8 mt-4 leading-relaxed relative z-10 text-base">
                  "{review.text}"
                </p>
                
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-bold text-lg text-industrial-dark">{review.name}</h4>
                  <p className="text-industrial-red text-sm font-bold uppercase tracking-wide">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
