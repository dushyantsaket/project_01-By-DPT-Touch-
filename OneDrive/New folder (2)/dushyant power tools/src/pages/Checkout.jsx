import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, Truck, ShieldCheck, ChevronRight, 
  MapPin, Phone, Mail, User, CheckCircle2,
  Package, ArrowLeft, Smartphone, Trash2, Plus, Minus
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });
  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleInputChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate Razorpay Integration
    const options = {
      key: "rzp_test_yourkeyhere",
      amount: cartTotal * 100,
      currency: "INR",
      name: "Dushyant Power Tools",
      description: "Industrial Procurement Transaction",
      handler: function (response) {
        setIsProcessing(false);
        setStep(4);
        clearCart();
      },
      prefill: {
        name: customerInfo.name,
        email: customerInfo.email,
        contact: customerInfo.phone
      },
      theme: {
        color: "#DC2626"
      }
    };
    
    // Simulate successful payment after delay since we don't have real Keys
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4);
      localStorage.setItem('lastOrder', JSON.stringify({
        id: `DT-${Math.floor(100000 + Math.random() * 900000)}`,
        total: cartTotal,
        items: cartItems.length,
        date: new Date().toLocaleDateString()
      }));
      clearCart();
    }, 2000);
  };

  if (cartItems.length === 0 && step < 4) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-16 px-4 flex flex-col items-center justify-center text-center">
        <Package size={64} className="text-gray-300 mb-6" />
        <h2 className="text-3xl font-black text-industrial-dark uppercase tracking-tighter mb-4">Your Procurement Cart is Empty</h2>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-8">Initiate deployment of industrial assets to proceed.</p>
        <Link to="/products" className="bg-industrial-red text-white px-10 py-5 rounded-full font-black text-xs tracking-widest uppercase shadow-xl hover:bg-red-700 transition-all">
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16 px-4 selection:bg-industrial-red selection:text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Checkout Flow */}
        <div className="lg:col-span-2">        
        {/* Progress Header */}
        <div className="mb-12 flex items-center justify-between relative px-2 md:px-10">
           <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0 hidden md:block"></div>
           {[
             { label: 'Information', step: 1, icon: User },
             { label: 'Shipping', step: 2, icon: Truck },
             { label: 'Payment', step: 3, icon: CreditCard },
             { label: 'Success', step: 4, icon: CheckCircle2 }
           ].map((s, idx) => (
             <div key={idx} className="relative z-10 flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                   step >= s.step ? 'bg-industrial-red text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-200'
                }`}>
                   <s.icon size={20} />
                </div>
                <span className={`mt-3 text-[10px] font-black uppercase tracking-widest hidden md:block transition-all ${
                   step >= s.step ? 'text-industrial-red opacity-100' : 'text-gray-400 opacity-60'
                }`}>{s.label}</span>
             </div>
           ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="info"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100"
            >
               <h2 className="text-3xl font-black text-black tracking-tighter uppercase mb-2">Owner Information</h2>
               <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-10 pb-6 border-b border-gray-100">Customer Identification Details</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Full Name</label>
                     <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input name="name" onChange={handleInputChange} value={customerInfo.name} className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:border-industrial-red transition-all" placeholder="John Doe" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Email Address</label>
                     <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input name="email" onChange={handleInputChange} value={customerInfo.email} className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:border-industrial-red transition-all" placeholder="name@company.com" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Contact Number</label>
                     <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input name="phone" onChange={handleInputChange} value={customerInfo.phone} className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:border-industrial-red transition-all" placeholder="+91 00000 00000" />
                     </div>
                  </div>
               </div>

               <button 
                 onClick={handleNext}
                 disabled={!customerInfo.name || !customerInfo.email}
                 className="w-full bg-industrial-dark hover:bg-black disabled:bg-gray-300 text-white rounded-2xl py-5 font-black text-xs tracking-widest flex items-center justify-center gap-3 shadow-xl transition-all"
               >
                  PROCEED TO SHIPPING
                  <ChevronRight size={20} />
               </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="shipping"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100"
            >
               <h2 className="text-3xl font-black text-black tracking-tighter uppercase mb-2">Delivery Sector</h2>
               <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-10 pb-6 border-b border-gray-100">Establish Destination Coordinates</p>
               
               <div className="space-y-6 mb-10">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Street Address</label>
                     <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input name="address" onChange={handleInputChange} value={customerInfo.address} className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:border-industrial-red transition-all" placeholder="House/Flat No, Area, Landmark" />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">City/District</label>
                        <input name="city" onChange={handleInputChange} value={customerInfo.city} className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-4 text-sm font-bold outline-none focus:border-industrial-red transition-all" placeholder="Your City" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">PIN Code</label>
                        <input name="pincode" onChange={handleInputChange} value={customerInfo.pincode} className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-4 text-sm font-bold outline-none focus:border-industrial-red transition-all" placeholder="000000" />
                     </div>
                  </div>
               </div>

               <div className="flex gap-4">
                  <button 
                    onClick={handleBack}
                    className="flex-1 bg-gray-100 text-gray-600 rounded-2xl py-5 font-black text-xs tracking-widest uppercase hover:bg-gray-200 transition-all font-bold"
                  >
                     BACK
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={!customerInfo.address || !customerInfo.city}
                    className="flex-[2] bg-industrial-dark hover:bg-black disabled:bg-gray-300 text-white rounded-2xl py-5 font-black text-xs tracking-widest flex items-center justify-center gap-3 shadow-xl transition-all"
                  >
                     PAYMENT GATEWAY
                     <ChevronRight size={20} />
                  </button>
               </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100"
            >
               <h2 className="text-3xl font-black text-black tracking-tighter uppercase mb-2">Secure Payment</h2>
               <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-10 pb-6 border-b border-gray-100">Authorize Transaction Protocols via Razorpay</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <button onClick={handlePayment} className="flex flex-col items-center justify-center p-8 bg-industrial-dark text-white rounded-3xl border-2 border-industrial-dark group transition-all">
                     <Smartphone size={32} className="mb-4" />
                     <span className="font-black text-xs tracking-widest uppercase">UPI / GPay / Cards</span>
                     <span className="text-[10px] mt-2 opacity-60">RAZORPAY SECURE</span>
                  </button>
                  <div className="flex flex-col items-center justify-center p-8 bg-gray-50 text-gray-400 rounded-3xl border-2 border-transparent">
                     <Package size={32} className="mb-4" />
                     <span className="font-black text-xs tracking-widest uppercase">Pay on Delivery</span>
                     <span className="text-[10px] mt-2">COMING SOON</span>
                  </div>
               </div>

               <div className="flex gap-4">
                  <button 
                    onClick={handleBack}
                    className="flex-1 bg-gray-100 text-gray-600 rounded-2xl py-5 font-black text-xs tracking-widest uppercase hover:bg-gray-200 transition-all font-bold"
                    disabled={isProcessing}
                  >
                     BACK
                  </button>
                  <button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="flex-[2] bg-industrial-red hover:bg-red-700 text-white rounded-2xl py-5 font-black text-xs tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-red-200 transition-all relative overflow-hidden"
                  >
                     {isProcessing ? (
                       <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          PROCESSING...
                       </span>
                     ) : (
                       <span className="flex items-center gap-3">
                          AUTHORIZE ₹{cartTotal.toLocaleString()}
                          <ChevronRight size={20} />
                       </span>
                     )}
                  </button>
               </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-12 md:p-20 shadow-2xl border border-gray-100 text-center"
            >
               <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-lg border-2 border-green-100">
                  <CheckCircle2 size={48} className="animate-in zoom-in duration-500" />
               </div>
               <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter uppercase mb-4">Transaction Confirmed</h2>
               <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-12">Deployment of Your Inventory Assets Has Begun</p>
               
               <div className="max-w-sm mx-auto bg-gray-50 rounded-2xl p-6 mb-12 border border-gray-100 grid grid-cols-2 gap-4 text-left">
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Transaction ID</p>
                     <p className="text-sm font-black uppercase">#RZP_{Math.floor(Math.random()*1000000)}</p>
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Charged</p>
                     <p className="text-sm font-black uppercase text-industrial-red">₹{cartTotal.toLocaleString()}</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                  <Link to="/products" className="bg-industrial-dark text-white rounded-2xl py-5 font-black text-xs tracking-widest uppercase shadow-xl hover:bg-black transition-all">
                     CONTINUE PROCUREMENT
                  </Link>
                  <Link to="/track-order" className="bg-gray-100 text-gray-600 rounded-2xl py-5 font-black text-xs tracking-widest uppercase hover:bg-gray-200 transition-all font-bold">
                     TRACK SHIPMENT
                  </Link>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-center gap-6 text-gray-400 opacity-60">
           <div className="flex items-center gap-2">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">SSL Encrypted</span>
           </div>
           <div className="flex items-center gap-2 border-l border-gray-300 pl-6">
              <Smartphone size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Razorpay Protected</span>
           </div>
        </div>
        </div>

        {/* Right Column: Order Summary (Cart Section) */}
        {step < 4 && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 sticky top-32">
              <h3 className="text-xl font-black text-black tracking-tighter uppercase mb-6 flex items-center gap-2">
                Order Summary <span className="text-gray-400 text-xs">({cartItems.length} items)</span>
              </h3>
              
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 mb-6 thin-scrollbar">
                {cartItems.map((item, idx) => {
                  const rawPrice = item.sale_price || item.regular_price || item.price_inr || item.mrp || item.price || 0;
                  const unitPrice = typeof rawPrice === 'string' ? parseFloat(rawPrice.replace(/[^\d.]/g, '')) || 0 : rawPrice;
                  const lineTotal = unitPrice * item.quantity;
                  const hasPrice = unitPrice > 0;
                  return (
                  <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-industrial-red transition-all group relative">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-2 right-2 text-gray-300 hover:text-industrial-red p-1 bg-white rounded-full shadow-sm z-10"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="w-16 h-16 bg-white rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm overflow-hidden p-1">
                      <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <h4 className="text-xs font-bold text-gray-800 line-clamp-2 leading-tight pr-4">{item.name}</h4>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg h-7">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 hover:bg-gray-50 border-r border-gray-200"><Minus size={10} /></button>
                          <span className="px-3 text-[10px] font-black">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 hover:bg-gray-50 border-l border-gray-200"><Plus size={10} /></button>
                        </div>
                        {hasPrice ? (
                          <span className="text-sm font-black text-industrial-dark">₹{lineTotal.toLocaleString()}</span>
                        ) : (
                          <span className="text-[10px] font-black text-industrial-red uppercase tracking-widest bg-red-50 px-2 py-1 rounded">On Request</span>
                        )}
                      </div>
                    </div>
                  </div>
                  );
              })}
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                {(() => {
                  const inquiryItems = cartItems.filter(item => !(item.sale_price || item.regular_price || item.price_inr || item.mrp || item.price));
                  return (
                    <>
                      <div className="flex items-center justify-between text-sm font-bold text-gray-500">
                        <span>Subtotal</span>
                        {cartTotal > 0 ? (
                          <span className="text-gray-900 font-black">₹{cartTotal.toLocaleString()}</span>
                        ) : (
                          <span className="text-gray-400 italic text-xs">Prices on Request</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm font-bold text-gray-500">
                        <span>Shipping</span>
                        <span className="text-green-600 uppercase tracking-widest text-[10px] font-black">FREE DEPLOYMENT</span>
                      </div>
                      {inquiryItems.length > 0 && (
                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700 font-bold">
                          ⚠️ {inquiryItems.length} item{inquiryItems.length > 1 ? 's' : ''} require{inquiryItems.length === 1 ? 's' : ''} price inquiry. Our team will contact you.
                        </div>
                      )}
                      <div className="pt-4 border-t border-gray-100 border-dashed">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-lg font-black uppercase tracking-widest text-black">Total Amount</span>
                            <span className="text-[10px] font-bold text-gray-400">
                              {cartTotal > 0 ? 'INCLUDING ALL INDUSTRIAL TAXES' : 'QUOTATION BASED — TEAM WILL CONTACT'}
                            </span>
                          </div>
                          {cartTotal > 0 ? (
                            <span className="text-2xl font-black text-industrial-red">₹{cartTotal.toLocaleString()}</span>
                          ) : (
                            <span className="text-base font-black text-industrial-red uppercase tracking-widest">On Request</span>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>

              {step === 1 && (
                 <button 
                   onClick={handleNext}
                   className="w-full mt-6 bg-industrial-red text-white py-4 rounded-xl font-black text-xs tracking-widest uppercase hover:bg-red-700 transition-all shadow-xl shadow-red-100"
                 >
                    QUICK CHECKOUT
                 </button>
              )}
            </div>
          </div>
        )}

      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .thin-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
};

export default Checkout;
