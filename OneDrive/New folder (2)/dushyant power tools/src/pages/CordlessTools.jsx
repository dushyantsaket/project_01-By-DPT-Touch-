import React from 'react';
import { motion } from 'framer-motion';
import { cordlessData } from '../data/cordlessData';
import { ChevronRight, Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const CordlessTools = () => {
  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img 
          src={cordlessData.heroImage} 
          alt={cordlessData.pageTitle} 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center px-8 md:px-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter max-w-2xl"
          >
            {cordlessData.pageTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-200 mt-6 max-w-xl text-lg font-medium leading-relaxed"
          >
            {cordlessData.categoryDescription}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumbs */}
        <nav className="flex mb-12 text-sm font-bold uppercase tracking-widest text-gray-400">
          <Link to="/" className="hover:text-industrial-red">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-industrial-dark">{cordlessData.pageTitle}</span>
        </nav>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cordlessData.products.map((product, idx) => (
            <motion.div
              key={product.productId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-industrial-red/30 transition-all duration-500 flex flex-col"
            >
              <div className="relative h-48 bg-gray-50 p-4 flex items-center justify-center overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                />
                {product.tags && product.tags.map((tag, tIdx) => (
                  <div key={tIdx} className={`absolute top-4 ${tIdx === 0 ? 'left-4' : 'left-auto right-4'} bg-industrial-red text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest`}>
                    {tag}
                  </div>
                ))}
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-sm font-black text-industrial-dark mb-2 group-hover:text-industrial-red transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">
                  {product.productId}
                </p>
                
                <div className="flex flex-col gap-2 mb-6 text-xs font-bold text-gray-600">
                  {product.description.voltage && (
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>Voltage:</span> <span className="text-industrial-dark">{product.description.voltage}</span>
                    </div>
                  )}
                  {product.description.noLoadSpeed && (
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>Speed:</span> <span className="text-industrial-dark line-clamp-1 truncate w-24 text-right">{product.description.noLoadSpeed}</span>
                    </div>
                  )}
                  {product.description.spec && (
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>Spec:</span> <span className="text-industrial-dark line-clamp-1 truncate w-24 text-right">{product.description.spec}</span>
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between">
                  <Link 
                    to={product.url}
                    className="text-[10px] font-black uppercase tracking-widest text-industrial-red hover:text-red-700"
                  >
                    View Details
                  </Link>
                  <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-industrial-red hover:text-white transition-colors">
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQs */}
        {cordlessData.faq && cordlessData.faq.length > 0 && (
          <div className="mt-20">
            <h3 className="text-2xl font-black text-industrial-dark uppercase tracking-tighter mb-8">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {cordlessData.faq.map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-industrial-dark">{item.question}</h4>
                  {item.answer && <p className="text-gray-500 text-sm mt-2">{item.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CordlessTools;
