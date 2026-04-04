import React from 'react';

const stats = [
  { value: '1000+', label: 'Tools & Accessories' },
  { value: '500+', label: 'Happy Customers' },
  { value: '10+', label: 'Years Experience' },
  { value: '100+', label: 'Brands Available' },
];

const Stats = () => {
  return (
    <section className="py-20 bg-industrial-dark text-white relative">
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-8 border border-white/10 bg-white/5 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors">
              <div className="text-4xl md:text-5xl font-black text-industrial-red mb-2 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                {stat.value}
              </div>
              <div className="text-gray-300 font-medium uppercase tracking-wide text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
