import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ChevronRight, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@dushyant.com' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/dashboard');
    } else {
      alert('Invalid credentials! (Try admin@dushyant.com / admin123)');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24 pb-12 px-4 selection:bg-industrial-red selection:text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-8 md:p-12">
          
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="text-industrial-red w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black text-black tracking-tighter uppercase mb-2">Admin Portal</h1>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Dushyant Power Tools</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:bg-white focus:border-industrial-red outline-none transition-all font-medium"
                  placeholder="admin@dushyant.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Secret Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:bg-white focus:border-industrial-red outline-none transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-industrial-dark hover:bg-black text-white rounded-2xl py-5 font-black text-sm tracking-widest flex items-center justify-center gap-2 group transition-all shadow-xl shadow-gray-200"
            >
              SECURE LOGIN
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-10 text-center text-xs text-gray-400 font-bold uppercase tracking-tighter">
            Authorized Personnel Only • IP Registered
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
