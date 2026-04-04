import React from 'react';
import { ShieldCheck, IndianRupee, Wrench, Users, HeadphonesIcon } from 'lucide-react';

const features = [
  { name: 'High-quality professional tools', icon: ShieldCheck },
  { name: 'Affordable prices', icon: IndianRupee },
  { name: 'Reliable repair services', icon: Wrench },
  { name: 'Trusted by local contractors', icon: Users },
  { name: 'Fast customer support', icon: HeadphonesIcon },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-industrial-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-industrial-dark mb-4 uppercase tracking-wider">
            Why Choose Us
          </h2>
          <div className="w-24 h-1 bg-industrial-red mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-xl hover:-translate-y-2 transition-transform duration-300 border-b-4 border-industrial-red text-center group">
              <div className="w-16 h-16 mx-auto bg-industrial-dark text-industrial-red rounded-full flex items-center justify-center mb-6 group-hover:bg-industrial-red group-hover:text-white transition-colors duration-300">
                <feature.icon size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-industrial-red transition-colors duration-300">
                {feature.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
