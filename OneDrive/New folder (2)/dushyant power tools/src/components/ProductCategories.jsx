import React from 'react';
import { motion } from 'framer-motion';
import { categoriesData } from '../data/categories';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCategories = () => {
  return (
    <section id="categories" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-industrial-red font-bold tracking-widest uppercase mb-2 flex items-center gap-3">
              <span className="w-12 h-0.5 bg-industrial-red"></span>
              Inventory Categories
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-industrial-dark tracking-tight uppercase">
              Professional <br />
              <span className="text-industrial-red">Power Solutions</span>
            </h2>
          </div>
          <p className="text-lg text-gray-500 font-medium max-w-sm md:text-right leading-relaxed">
            Engineered for high-performing professionals who demand results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoriesData.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link 
                to={`/categories/${category.id}`} 
                onClick={() => window.scrollTo(0, 0)}
                className="group h-full bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col justify-between hover:bg-white hover:border-industrial-red hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div>
                  <div className="relative mb-8 bg-white rounded-xl overflow-hidden aspect-video flex items-center justify-center p-4 shadow-sm group-hover:shadow-md transition-shadow">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-industrial-dark text-white text-[10px] font-bold uppercase rounded">
                      {category.type}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-industrial-dark group-hover:text-industrial-red transition-colors mb-3">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 font-medium">
                    {category.description}
                  </p>
                </div>
                
                <div className="mt-8 flex items-center gap-2 text-industrial-dark group-hover:text-industrial-red font-bold uppercase tracking-widest text-xs transition-colors">
                  View Range
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* YouTube Short - Inventory Highlight */}
        <div className="mt-20 bg-gray-50 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 overflow-hidden flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3 max-w-[300px] flex-shrink-0 shadow-2xl rounded-3xl overflow-hidden bg-black mx-auto md:mx-0">
            <div style={{ aspectRatio: '0.562667 / 1' }}>
              <iframe 
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/9aUNFW43xFU?feature=oembed&autoplay=1&mute=1&modestbranding=1&loop=1&rel=0&playlist=9aUNFW43xFU&iv_load_policy=3&color=white&controls=1&cc_load_policy=1" 
                title="total cordless drill 1080 ytshorts savetube me" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
              />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-3xl md:text-5xl font-black text-industrial-dark uppercase tracking-tight mb-6">Total Cordless Drills</h3>
            <p className="text-gray-500 font-medium leading-relaxed mb-8 max-w-2xl text-lg mx-auto md:mx-0">
              Total Cordless Drills – designed for efficiency and versatility. With a high torque motor and a fast 1-hour charge time, these tools are perfect for tackling a variety of tasks. Equipped with an auto-lock keyless chuck for quick bit changes and a torque setting up to 23+1+1, it ensures precision and ease of use. The drills includes essential accessories like CR-V and HSS drill bits, masonry bits, and a sturdy carrying case, making it the perfect companion for both professional and DIY projects.
            </p>
            <Link 
              to="/cordless-tools" 
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center justify-center gap-2 bg-industrial-red text-white py-4 px-8 rounded-full font-black text-xs tracking-widest uppercase hover:bg-industrial-dark transition-colors shadow-lg active:scale-95"
            >
              Explore Cordless Tools
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductCategories;
