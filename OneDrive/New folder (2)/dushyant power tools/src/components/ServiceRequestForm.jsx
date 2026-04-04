import React, { useState } from 'react';
import { Settings, Wrench, Shield, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceRequestForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    machineModel: '',
    issueType: '',
    comments: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new request object
    const newRequest = {
      id: "SRQ-" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString(),
      status: 'Pending',
      ...formData
    };

    // Save to localStorage
    const existingRequests = JSON.parse(localStorage.getItem('serviceRequests') || '[]');
    localStorage.setItem('serviceRequests', JSON.stringify([newRequest, ...existingRequests]));

    setSubmitted(true);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      city: '',
      machineModel: '',
      issueType: '',
      comments: ''
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden" id="service-form">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-industrial-red/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Content Area (Matches the HTML structure requested) */}
          <div className="lg:w-1/2 bg-industrial-dark p-10 md:p-16 text-white relative">
            <div className="absolute inset-0 bg-gradient-to-br from-industrial-dark to-black opacity-90 z-0"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-industrial-red flex items-center justify-center text-white">
                  <Wrench size={24} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-widest text-white">Dushyant Power Tools</h3>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-tight">
                Authorize <span className="text-industrial-red">Repair &</span> Services Request
              </h2>
              
              <p className="text-gray-400 font-medium mb-8 text-lg">
                Are you facing an issue with your power tool? Submit a service request to our dedicated technical team. We ensure high-quality craftsmanship, genuine spare parts, and quick resolution for your tools.
              </p>

              <div className="space-y-6 flex-grow">
                <div className="flex items-start gap-4">
                  <Shield className="text-industrial-red mt-1 shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-lg uppercase tracking-wider mb-1">Genuine Parts</h4>
                    <p className="text-gray-400 text-sm">We only use certified and authentic technical parts for replacements to ensure long-lasting durability.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Settings className="text-industrial-red mt-1 shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-lg uppercase tracking-wider mb-1">Expert Diagnostics</h4>
                    <p className="text-gray-400 text-sm">Our qualified technicians provide fast and accurate analysis of the issue before starting any repair work.</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10">
                <h5 className="font-bold uppercase tracking-widest text-sm mb-4 text-industrial-red">Direct Contact</h5>
                <p className="mb-2 text-gray-300"><strong>Call Support: </strong><a href="tel:+919399357998" className="hover:text-white transition">+91 93993 57998</a></p>
                <p className="text-gray-300"><strong>Email Desk: </strong><a href="mailto:service@dushyantpowertools.com" className="hover:text-white transition">service@dushyantpowertools.com</a></p>
              </div>
            </div>
          </div>

          {/* Right Form Area */}
          <div className="lg:w-1/2 p-10 md:p-16 bg-white relative">
            <h4 className="text-2xl font-black uppercase tracking-tight text-industrial-dark mb-2">Request Service Evaluation</h4>
            <p className="text-gray-500 font-medium text-sm mb-8">Fill out the details below so our admin team can analyze the problem and contact you immediately.</p>
            
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center h-[400px]"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="text-green-600" size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-green-800 uppercase tracking-tight mb-2">Request Submitted</h3>
                  <p className="text-green-700 font-medium">Your service request has been sent to our admin team. We will analyze the issue and contact you shortly.</p>
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Full Name *</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-industrial-red focus:bg-white transition-all text-sm font-bold text-gray-900" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Phone No. *</label>
                      <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-industrial-red focus:bg-white transition-all text-sm font-bold text-gray-900" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Email Address *</label>
                      <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-industrial-red focus:bg-white transition-all text-sm font-bold text-gray-900" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">City *</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-industrial-red focus:bg-white transition-all text-sm font-bold text-gray-900" id="city" name="city" value={formData.city} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="machineModel" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Machine Name/Model *</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-industrial-red focus:bg-white transition-all text-sm font-bold text-gray-900" id="machineModel" name="machineModel" placeholder="e.g. Angle Grinder 4 inch" value={formData.machineModel} onChange={handleChange} required />
                    </div>
                    <div>
                      <label htmlFor="issueType" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Issue Category</label>
                      <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-industrial-red focus:bg-white transition-all text-sm font-bold text-gray-900 appearance-none" id="issueType" name="issueType" value={formData.issueType} onChange={handleChange}>
                        <option value="">Select an option</option>
                        <option value="Not Starting">Not Starting</option>
                        <option value="Overheating">Overheating</option>
                        <option value="Making Strange Noise">Making Strange Noise</option>
                        <option value="Broken Part">Broken Part</option>
                        <option value="Warranty Claim">Warranty Claim</option>
                        <option value="Other">Other Maintenance</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="comments" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Describe Your Problem *</label>
                    <textarea className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-industrial-red focus:bg-white transition-all text-sm font-bold text-gray-900 resize-none h-32" id="comments" name="comments" placeholder="Please elaborate on the issue you are facing..." value={formData.comments} onChange={handleChange} required></textarea>
                  </div>

                  <button type="submit" className="w-full bg-industrial-red text-white rounded-xl py-4 font-black uppercase tracking-widest text-sm hover:bg-black transition-all shadow-lg shadow-industrial-red/20 hover:shadow-xl mt-4">
                    Submit Service Request
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceRequestForm;
