import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-industrial-red transform translate-x-4 translate-y-4 rounded-lg"></div>
            <img
              src="https://lh3.googleusercontent.com/gps-cs-s/AHVAweqlU_4KbabcR3bC52eil-Xkq_X5PxQvPE_x-_n0q_OjOGPi3rRLzIMefGe7dDLMO_TqLAxmIYE2uCSLsZKptDuvg7aBGsPItZ42bTtGrJBO5hWKUi_-JbeQGMzZgxhNP56pPjjZKuA6S3_o=s1360-w1360-h1020-rw"
              alt="Dushyant Power Tools Storefront"
              className="relative z-10 w-full rounded-lg shadow-2xl object-cover h-[500px]"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold text-industrial-dark mb-6 uppercase tracking-wider">
              About <span className="text-industrial-red">Us</span>
            </h2>
            <div className="w-24 h-1 bg-industrial-red mb-8"></div>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Dushyant Power Tools is a trusted supplier of power tools and industrial equipment in Sidhi, Madhya Pradesh. We provide high-performance tools, spare parts, and repair services for contractors, mechanics, workshops, and hardware professionals.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our goal is to deliver durable, reliable, and affordable tools while maintaining excellent customer service. With over 10 years of experience, we are the go-to destination for all your hardware needs.
            </p>
            
            <div className="space-y-4">
              {[
                'Authorized Dealer for Top Brands',
                'Expert Repair & Maintenance',
                'Genuine Spare Parts Guaranteed',
                'Competitive Wholesale Pricing'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="text-industrial-red flex-shrink-0" size={24} />
                  <span className="text-gray-800 font-bold">{item}</span>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
