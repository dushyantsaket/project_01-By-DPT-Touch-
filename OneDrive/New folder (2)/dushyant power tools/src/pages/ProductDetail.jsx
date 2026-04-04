import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { powerToolsData } from '../data/powerTools';
import { safetyData } from '../data/safetyData';
import { industrialExpansionData } from '../data/industrialExpansionData';
import { agricultureGardenData } from '../data/agricultureGardenData';
import { storageData } from '../data/storageData';
import { handToolsData } from '../data/handToolsData';
import { bladesData } from '../data/blades';
import { angleGrindersData } from '../data/angleGrindersData';
import { gcWheelsData } from '../data/gcWheelsData';
import { spannersWrenchesData } from '../data/spannersWrenchesData';
import { 
  ChevronRight, Star, ShoppingCart, Heart, 
  ArrowLeft, ArrowRight, Info, CheckCircle,
  Truck, Shield, RotateCw, MessageCircle
} from 'lucide-react';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const allProducts = [
      ...powerToolsData,
      ...safetyData,
      ...industrialExpansionData,
      ...agricultureGardenData,
      ...storageData,
      ...handToolsData,
      ...bladesData,
      ...angleGrindersData,
      ...gcWheelsData,
      ...spannersWrenchesData
    ];
    
    // Support finding by string ID or numeric ID
    const foundProduct = allProducts.find(p => String(p.id) === String(productId) || String(p.sku) === String(productId));
    
    if (foundProduct) {
      // Map industrial fields if they exist
      const productWithStandardFields = {
        ...foundProduct,
        image: foundProduct.image || foundProduct.image_url,
        price_inr: foundProduct.price_inr || (foundProduct.sale_price ? parseFloat(String(foundProduct.sale_price).replace(/[^\d.]/g, '')) : 0),
        category: foundProduct.category || 'general'
      };
      
      setProduct(productWithStandardFields);
      setSelectedImage(productWithStandardFields.image);
      
      // Get related products (same category, excluding current)
      const related = allProducts
        .filter(p => p.category === foundProduct.category && String(p.id) !== String(foundProduct.id))
        .slice(0, 4)
        .map(p => ({
          ...p,
          image: p.image || p.image_url,
          price_inr: p.price_inr || (p.sale_price ? parseFloat(String(p.sale_price).replace(/[^\d.]/g, '')) : 0)
        }));
      setRelatedProducts(related);
    } else {
      // Handle 404
      // navigate('/products');
    }
    window.scrollTo(0, 0);
  }, [productId, navigate]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-industrial-red"></div>
    </div>
  );

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specs', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews (4)' }
  ];

  const handleWhatsAppInquiry = () => {
    const message = `Hi, I'm interested in the ${product.name}. Could you provide more details?`;
    window.open(`https://wa.me/919504391391?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-gray-50 pt-24 pb-16 min-h-screen selection:bg-industrial-red selection:text-white">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 mb-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap pb-2">
          <Link to="/" className="hover:text-industrial-red transition-colors flex items-center">
            Home
          </Link>
          <ChevronRight className="flex-shrink-0" />
          <Link to="/categories" className="hover:text-industrial-red transition-colors">
            Our Shop
          </Link>
          <ChevronRight className="flex-shrink-0" />
          <Link to={`/categories/${product.category}`} className="hover:text-industrial-red transition-colors capitalize">
            {product.category.replace('-', ' ')}
          </Link>
          <ChevronRight className="flex-shrink-0" />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left: Image Gallery */}
            <div className="lg:w-1/2 p-6 md:p-10 bg-white">
              <div className="relative group aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 mb-6">
                <motion.img 
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={selectedImage} 
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-industrial-red text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                  {product.sub_category}
                </div>
              </div>
              
              {/* Thumbnails (Simulated) */}
              <div className="flex space-x-4">
                {[product.image, product.image, product.image].map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-xl border-2 transition-all overflow-hidden bg-gray-50 ${selectedImage === img ? 'border-industrial-red shadow-md scale-105' : 'border-transparent hover:border-gray-200'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply p-1" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Summary */}
            <div className="lg:w-1/2 p-6 md:p-10 lg:border-l border-gray-100 flex flex-col justify-center">
              <div className="mb-2">
                <div className="flex items-center space-x-1 text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill="currentColor" stroke="none" className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'} />
                  ))}
                  <span className="text-gray-400 text-xs ml-2 font-medium">(4 Customer Reviews)</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-baseline space-x-3 mb-6">
                {isLoggedIn ? (
                  (product.price_inr || product.sale_price) ? (
                    <>
                      <span className="text-3xl font-extrabold text-industrial-red">
                        {(() => {
                          const p = product.sale_price || product.price_inr;
                          if (typeof p === 'string' && p.includes('₹')) return p;
                          return `₹${p?.toLocaleString?.('en-IN') || p}`;
                        })()}
                      </span>
                      {product.regular_price && product.regular_price !== product.sale_price && (
                        <span className="text-lg text-gray-400 line-through">
                          {product.regular_price}
                        </span>
                      )}
                      {!product.regular_price && product.price_inr && (
                        <span className="text-lg text-gray-400 line-through">
                          ₹{(parseFloat(product.price_inr) * 1.2).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                        </span>
                      )}
                      <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-0.5 rounded ml-2">
                        {product.sale_price ? 'ON SALE' : '20% OFF'}
                      </span>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-gray-500 italic">Price on Request</span>
                  )
                ) : (
                  <span 
                    onClick={() => navigate('/login')}
                    className="text-2xl font-extrabold text-industrial-red underline cursor-pointer hover:text-industrial-dark transition-colors"
                  >
                    Login to See Price
                  </span>
                )}
              </div>

              <div className="prose prose-sm text-gray-600 mb-8 max-w-none border-t border-b border-gray-100 py-6">
                <p className="leading-relaxed text-base">
                  {product.description}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 mt-4 text-sm font-medium">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="text-green-500 mr-2" /> Power: {product.power}
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="text-green-500 mr-2" /> Professional Series
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="text-green-500 mr-2" /> High Durability
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="text-green-500 mr-2" /> Industrial Grade
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden shadow-sm h-14">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-2 hover:bg-gray-100 text-gray-600 transition-colors h-full"
                  >-</button>
                  <span className="px-6 py-2 font-bold text-gray-900 min-w-[50px] text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-5 py-2 hover:bg-gray-100 text-gray-600 transition-colors h-full"
                  >+</button>
                </div>
                
                <Link to="/cart" className="flex-1 h-14 bg-industrial-dark text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg hover:bg-black transition-all group overflow-hidden relative">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <ShoppingCart className="text-xl group-hover:scale-110 transition-transform" />
                  <span>ADD TO PROCUREMENT</span>
                </Link>
              </div>

              {/* Stock Status */}
              <div className="mb-8 flex items-center gap-4 bg-gray-50 border border-gray-100 p-4 rounded-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5 text-industrial-red">
                    <CheckCircle size={40} />
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500 shadow-sm border border-green-100">
                    <CheckCircle size={20} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Inventory Status</p>
                    <p className="text-sm font-black text-black uppercase tracking-tight">Active Asset • 50 Strategic Units Available</p>
                 </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <button 
                  onClick={handleWhatsAppInquiry}
                  className="flex-1 h-14 bg-green-600 text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg hover:bg-green-700 transition-all active:scale-95"
                >
                  <MessageCircle className="text-xl" />
                  <span>WHATSAPP INQUIRY</span>
                </button>
                
                <button 
                  onClick={() => {
                    alert(`Inquiry Request Sent for ${product.name}! \n\nOur technical team will contact you within 24 hours with strategic pricing and availability.`);
                  }}
                  className="flex-1 h-14 bg-industrial-red text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg hover:bg-red-700 transition-all active:scale-95 uppercase tracking-widest text-[10px]"
                >
                  <Info className="text-lg" />
                  <span>Send Quick Enquiry</span>
                </button>
                
                <button className="h-14 w-14 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-industrial-red hover:border-industrial-red hover:bg-red-50 transition-all shadow-sm">
                  <Heart className="text-xl" />
                </button>
              </div>

              {/* Product Meta Data */}
              <div className="py-4 border-t border-gray-100 text-sm font-medium text-gray-600 flex flex-col gap-2">
                <div><span className="text-gray-900 font-bold">SKU:</span> {product.id}-XX</div>
                <div><span className="text-gray-900 font-bold">Categories:</span> <Link className="text-industrial-red hover:underline capitalize" to={`/categories/${product.category}`}>{product.category.replace('-', ' ')}</Link>, <span className="text-industrial-red hover:underline cursor-pointer">All Products</span></div>
                <div><span className="text-gray-900 font-bold">Brand:</span> {product.brand || 'Dushyant Power Tools'}</div>
              </div>

              {/* Share Icons */}
              <div className="py-4 flex items-center gap-3">
                 <span className="text-sm font-bold text-gray-900 mr-2">Share:</span>
                 {['#whatsapp', '#facebook', '#twitter', '#linkedin'].map((link, idx) => (
                    <a key={idx} href={link} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-industrial-red hover:text-white transition-colors cursor-pointer text-gray-600">
                      <Heart size={14} />
                    </a>
                 ))}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 py-6 border-t border-gray-100">
                <div className="flex flex-col items-center text-center">
                  <Truck className="text-xl text-industrial-red mb-2" />
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-tighter">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center border-x border-gray-100">
                  <RotateCw className="text-xl text-industrial-red mb-2" />
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-tighter">7-Day Replacement</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="text-xl text-industrial-red mb-2" />
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-tighter">Brand Warranty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Info Tabs */}
          <div className="border-t border-gray-100">
            <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-5 font-bold text-sm uppercase tracking-wider transition-all relative flex-shrink-0 ${activeTab === tab.id ? 'text-industrial-red' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-industrial-red"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="p-8 md:p-12 min-h-[300px]">
              <AnimatePresence mode="wait">
                {activeTab === 'description' && (
                  <motion.div
                    key="desc"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="prose prose-lg text-gray-600 max-w-4xl"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Unleash Professional Performance</h3>
                    <p className="mb-6 leading-relaxed">
                      The {product.name} is engineered for the most demanding cutting tasks. 
                      Crafted with high-precision components and a robust engine, this tool offers 
                      unparalleled performance for forestry, construction, and heavy-duty professional work.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 mt-10">
                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <h4 className="text-gray-900 font-bold mb-3 flex items-center">
                          <span className="w-8 h-8 rounded-full bg-industrial-red/10 text-industrial-red flex items-center justify-center mr-3">1</span>
                          High-Performance Engine
                        </h4>
                        <p className="text-sm">Delivers massive torque and speed for effortless cutting through the hardest materials.</p>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <h4 className="text-gray-900 font-bold mb-3 flex items-center">
                          <span className="w-8 h-8 rounded-full bg-industrial-red/10 text-industrial-red flex items-center justify-center mr-3">2</span>
                          Ergonomic Design
                        </h4>
                        <p className="text-sm">Reduced vibration and perfectly balanced weight distribution to prevent user fatigue.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'specs' && (
                  <motion.div
                    key="specs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="max-w-4xl"
                  >
                    <table className="w-full border-collapse">
                      <tbody>
                        {[
                          ['Brand', product.brand || 'Dushyant Power Tools'],
                          ['Type Of Product', product.sub_category || 'Industrial Tool'],
                          ['Spare Part For', product.name],
                          ['Power Source', 'Petrol / Electric (Dependent on Model)'],
                          ['Output Power', product.power || 'N/A'],
                          ['Warranty', 'No / Official Warranty (Varies)'],
                          ['Country Of Origin', 'China / India'],
                          ['In The Box', `1pc ${product.name}`]
                        ].map(([key, val], idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="py-4 px-6 font-bold text-gray-900 w-1/3 border-b border-gray-100">{key}</td>
                            <td className="py-4 px-6 text-gray-600 border-b border-gray-100">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="max-w-4xl"
                  >
                    <div className="flex items-center mb-10 border-b border-gray-100 pb-8">
                      <div className="text-6xl font-black text-industrial-red mr-8">5.0</div>
                      <div className="flex flex-col">
                        <div className="flex text-yellow-400 mb-1">
                          {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" stroke="none" className="text-2xl" />)}
                        </div>
                        <span className="text-gray-500 font-medium">Based on 4 reviews</span>
                      </div>
                    </div>

                    <div className="space-y-10">
                      {[
                        { name: 'Arun Sharma', date: 'March 15, 2024', comment: 'Extremely powerful machine. I used it for a large construction project and it never disappointed. Service support from Dushyant Power Tools is also very good.' },
                        { name: 'Vikram Singh', date: 'February 28, 2024', comment: 'Best in class. Worth every penny. The build quality is solid and it feels very premium in hand.' }
                      ].map((rev, idx) => (
                        <div key={idx} className="bg-white border-l-4 border-industrial-red pl-6 py-2">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-bold text-gray-900">{rev.name}</h5>
                            <span className="text-xs text-gray-400">{rev.date}</span>
                          </div>
                          <div className="flex text-yellow-400 mb-3 text-xs">
                            {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" stroke="none" />)}
                          </div>
                          <p className="text-gray-600 italic">"{rev.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-10 border-b border-gray-200 pb-4">
            <h2 className="text-3xl font-bold text-gray-900">Related Products</h2>
            <Link to={`/categories/${product.category}`} className="text-industrial-red font-bold hover:underline flex items-center">
              View All <ArrowRight className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(item => (
              <Link 
                key={item.id} 
                to={`/product/${item.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                <div className="aspect-square bg-gray-50 p-6 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 p-2"
                  />
                  <div className="absolute top-3 left-3 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-industrial-dark">
                    {item.sub_category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex text-yellow-400 mb-2 scale-75 origin-left">
                    {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" stroke="none" />)}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-industrial-red transition-colors">
                    {item.name}
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    {isLoggedIn ? (
                      item.price_inr ? (
                        <span className="text-xl font-black text-industrial-red">₹{item.price_inr.toLocaleString('en-IN')}</span>
                      ) : (
                        <span className="text-sm font-bold text-gray-500 italic">Price on Request</span>
                      )
                    ) : (
                      <span 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate('/login'); }}
                        className="text-sm font-bold text-industrial-red underline cursor-pointer hover:text-red-700 transition"
                      >
                        Login to See Price
                      </span>
                    )}
                    <button className="w-10 h-10 rounded-full bg-industrial-dark text-white flex items-center justify-center group-hover:bg-industrial-red transition-colors shadow-lg">
                      <ArrowRight />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
