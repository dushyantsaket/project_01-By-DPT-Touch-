import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Search, Package, MoreVertical, 
  Trash2, Edit3, Settings, LogOut, LayoutDashboard, Wrench, Menu, Bell, User, MessageSquare, Briefcase, FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { powerToolsData as initialData } from '../data/powerTools';
import { dashboardProducts } from '../data/dashboardProducts';
import NotificationSettings from '../components/NotificationSettings';

const Dashboard = () => {
  const [products, setProducts] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const navigate = useNavigate();
  const [serviceRequests, setServiceRequests] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('serviceRequests') || '[]');
    } catch {
      return [];
    }
  });

  // Redirect if not admin
  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin-login');
    }
  }, [navigate]);

  const [activeTab, setActiveTab] = useState('dashboard');

  const recentOrders = [
    { id: '#DT-92831', customer: 'Rajesh Kumar', items: 3, total: 12450, status: 'Shipped', date: 'Mar 28, 2026' },
    { id: '#DT-92832', customer: 'Amit Singh', items: 1, total: 4500, status: 'Processing', date: 'Mar 29, 2026' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin-login');
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col font-sans">
      
      {/* Top Header - Mimicking IndiaMART Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-[64px] flex items-center justify-between px-4 lg:px-8 shadow-sm">
         <div className="flex items-center gap-6">
            <button className="lg:hidden text-gray-500 hover:text-black">
               <Menu size={24} />
            </button>
            <div className="text-xl font-black text-[#2e3192] tracking-tighter cursor-pointer" onClick={() => navigate('/')}>
               IndiaMART <span className="text-gray-400 text-xs font-medium ml-2 uppercase tracking-widest hidden sm:inline-block">Seller Admin</span>
            </div>
            
            {/* Search Bar - Header */}
            <div className="hidden md:flex items-center bg-white border border-[#2e3192] rounded-md overflow-hidden h-[40px] ml-4 w-[400px]">
               <select className="bg-gray-50 border-r border-gray-200 text-gray-600 text-xs font-semibold h-full px-3 outline-none">
                  <option>Buy Leads</option>
                  <option>Products</option>
               </select>
               <input 
                  type="text" 
                  placeholder="Enter product / service to search" 
                  className="w-full text-sm px-3 h-full outline-none"
               />
               <button className="bg-[#2e3192] text-white px-5 h-full font-bold text-sm">Search</button>
            </div>
         </div>
         
         <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-5 text-xs font-semibold text-gray-600">
               <span className="cursor-pointer hover:text-[#2e3192] flex items-center gap-1"><MessageSquare size={16}/> Lead Manager</span>
               <span className="cursor-pointer hover:text-[#2e3192] flex items-center gap-1"><Briefcase size={16}/> BuyLeads</span>
               <span className="cursor-pointer hover:text-[#2e3192] flex items-center gap-1"><Package size={16}/> Products</span>
            </div>
            <div className="flex items-center gap-4 text-gray-500">
               <button className="relative hover:text-black">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1.5 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">2</span>
               </button>
               <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block"></div>
               <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-red-600 transition-colors">
                  <span className="hidden sm:inline-block">Hi Indian</span>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                     <User size={16} />
                  </div>
               </button>
            </div>
         </div>
      </header>

      <div className="flex flex-1 pt-[64px]">
        {/* Left Nav - Skinny Sidebar Mimic */}
        <aside className="w-[100px] bg-white border-r border-[#dde0e4] hidden lg:flex flex-col items-center py-6 gap-3 fixed h-[calc(100vh-64px)] overflow-y-auto no-scrollbar shadow-sm z-40">
           <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
           <SidebarItem icon={MessageSquare} label="Lead Manager" badge="2" active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} />
           <SidebarItem icon={Briefcase} label="BuyLeads" badge="10" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
           <SidebarItem icon={Package} label="Products" active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} />
           <SidebarItem icon={FileText} label="Photos & Docs" active={false} />
           <SidebarItem icon={Wrench} label="Service Logs" active={activeTab === 'services'} onClick={() => setActiveTab('services')} />
           <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 lg:ml-[100px] p-4 md:p-6 lg:p-8 overflow-x-hidden min-h-[calc(100vh-64px)]">
            
            {/* Conditional Rendering exactly like the original, but new skin for Dashboard */}
            {activeTab === 'dashboard' ? (
              <div className="max-w-7xl mx-auto space-y-6">
                 {/* Top Welcome Banner */}
                 <div className="bg-gradient-to-r from-[#2c3691] to-[#4b54b0] rounded-[4px] p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
                    <div className="flex items-center gap-6 relative z-10 w-full mb-4 md:mb-0">
                       <div className="bg-white/10 p-4 rounded-lg text-center min-w-[100px] border border-white/20">
                          <p className="text-3xl font-black text-[#ffbd41]">30</p>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-[#ffbd41]">Years</p>
                       </div>
                       <div>
                          <h2 className="text-2xl font-normal leading-tight">Celebrating <strong>IndiaMART</strong></h2>
                          <p className="text-blue-200 text-sm flex items-center gap-2 mt-1">
                             <span className="w-8 h-[1px] bg-blue-300"></span> Trusted since 1996
                          </p>
                       </div>
                    </div>
                    <div className="relative z-10 text-right w-full flex flex-col items-start md:items-end">
                       <p className="text-sm md:text-base font-medium mb-1">Currently <span className="text-[#ffbd41] font-bold">10 new buyers</span> from <span className="font-bold">Sidhi</span> are looking for your products.</p>
                       <p className="text-xs text-blue-200 mb-4 bg-white/10 px-3 py-1 rounded-full border border-white/10">Exclusive Offer. Ends Soon — Don't Miss Out!</p>
                       <button className="bg-[#ffbd41] text-[#2c3691] px-6 py-2 rounded font-bold text-sm hover:bg-white transition-colors shadow-lg shadow-[#ffbd41]/20">Claim Your Offer</button>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       
                       {/* Messages Card */}
                       <div className="bg-white rounded-[4px] border border-[#dde0e4] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                          <div className="px-5 py-4 border-b border-[#dde0e4] flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                <div className="text-[#2c3691]"><MessageSquare size={20}/></div>
                                <h3 className="font-bold text-[#333333] text-[15px]">Messages <span className="text-gray-500 font-normal">(2)</span></h3>
                             </div>
                          </div>
                          <div className="divide-y divide-gray-100">
                             <div className="p-4 flex items-start justify-between group hover:bg-gray-50 transition-colors cursor-pointer">
                                <div>
                                   <p className="text-[#1a4ab9] font-semibold text-sm">Ram Prasad</p>
                                   <p className="text-[11px] text-gray-500 mb-1">Dushyant Furniture Mart, Sidhi</p>
                                   <p className="text-[#333333] text-xs">I viewed your 'Catalog Page'</p>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                   <span className="text-[10px] text-gray-400 mb-2">29th Mar</span>
                                   <button className="text-[11px] border border-[#d8d8d8] bg-gray-50 px-4 py-1.5 rounded text-[#333333] font-medium hover:bg-gray-100">Reply</button>
                                </div>
                             </div>
                             <div className="p-4 flex items-start justify-between group hover:bg-gray-50 transition-colors cursor-pointer">
                                <div>
                                   <p className="text-[#1a4ab9] font-semibold text-sm">S K Tiwari</p>
                                   <p className="text-[11px] text-gray-500 mb-1">All Over India Transport Company, Bhopal</p>
                                   <p className="text-[#333333] text-xs">Call attempted for Sidhi to Mumbai Full Truck Load</p>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                   <span className="text-[10px] text-gray-400 mb-2">29th Mar</span>
                                   <button className="text-[11px] border border-[#d8d8d8] bg-gray-50 px-4 py-1.5 rounded text-[#333333] font-medium hover:bg-gray-100">Reply</button>
                                </div>
                             </div>
                          </div>
                          <div className="bg-[#f9fafc] border-t border-[#dde0e4] p-3 text-center rounded-b-[4px]">
                             <button className="text-[#1a4ab9] text-xs font-semibold hover:underline">View All</button>
                          </div>
                       </div>

                       {/* Relevant BuyLeads */}
                       <div className="bg-white rounded-[4px] border border-[#dde0e4] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                          <div className="px-5 py-4 border-b border-[#dde0e4] flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                <div className="text-[#2c3691]"><Briefcase size={20}/></div>
                                <h3 className="font-bold text-[#333333] text-[15px]">Relevant BuyLeads <span className="text-gray-500 font-normal">(10)</span></h3>
                             </div>
                          </div>
                          <div className="divide-y divide-gray-100">
                             <div className="p-4 flex items-start justify-between group hover:bg-gray-50 transition-colors cursor-pointer">
                                <div>
                                   <p className="text-[#1a4ab9] font-semibold text-sm">Brown Wood Sofa Set, Cotton</p>
                                   <p className="text-[11px] text-gray-500 mb-1">Satna, India</p>
                                   <p className="text-[#333333] text-xs"><strong>Quantity:</strong> 1 Set</p>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                   <span className="text-[10px] text-gray-400 mb-2">18 hr ago</span>
                                   <button className="text-[11px] bg-[#2c3691] text-white px-3 py-1.5 rounded font-medium hover:bg-[#1a2373]">Contact Buyer</button>
                                </div>
                             </div>
                             <div className="p-4 flex items-start justify-between group hover:bg-gray-50 transition-colors cursor-pointer">
                                <div>
                                   <p className="text-[#1a4ab9] font-semibold text-sm">Armature</p>
                                   <p className="text-[11px] text-gray-500 mb-1">Satna, India</p>
                                   <p className="text-[#333333] text-xs"><strong>Quantity:</strong> 3 Piece</p>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                   <span className="text-[10px] text-gray-400 mb-2">19 hr ago</span>
                                   <button className="text-[11px] bg-[#2c3691] text-white px-3 py-1.5 rounded font-medium hover:bg-[#1a2373]">Contact Buyer</button>
                                </div>
                             </div>
                          </div>
                          <div className="bg-[#f9fafc] border-t border-[#dde0e4] p-3 text-center rounded-b-[4px]">
                             <button className="text-[#1a4ab9] text-xs font-semibold hover:underline">View All</button>
                          </div>
                       </div>
                       {/* Recent BuyLeads (Orders/Services) */}
                       <div className="bg-white rounded-[4px] border border-[#dde0e4] shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col h-full">
                          <div className="px-5 py-4 border-b border-[#dde0e4] flex items-center justify-between shrink-0">
                             <div className="flex items-center gap-2">
                                <div className="text-[#2c3691]"><Briefcase size={20}/></div>
                                <h3 className="font-bold text-[#333333] text-[15px]">Recent BuyLeads <span className="text-gray-500 font-normal">(4)</span></h3>
                             </div>
                          </div>
                          <div className="divide-y divide-gray-100 flex-1">
                             <div className="p-4 flex items-start justify-between group hover:bg-gray-50 transition-colors cursor-pointer">
                                <div>
                                   <p className="text-[#1a4ab9] font-semibold text-sm">Cutter</p>
                                   <p className="text-[11px] text-gray-500 mb-1">Rewa, India</p>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                   <span className="text-[10px] text-gray-400 mb-2">Yesterday</span>
                                   <button className="text-[11px] bg-[#2c3691] text-white px-3 py-1.5 rounded font-medium hover:bg-[#1a2373]">Contact Buyer</button>
                                </div>
                             </div>
                             <div className="p-4 flex items-start justify-between group hover:bg-gray-50 transition-colors cursor-pointer">
                                <div>
                                   <p className="text-[#1a4ab9] font-semibold text-sm">Marble Cutter</p>
                                   <p className="text-[11px] text-gray-500 mb-1">Jaunpur, India</p>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                   <span className="text-[10px] text-gray-400 mb-2">29th Mar</span>
                                   <button className="text-[11px] bg-[#2c3691] text-white px-3 py-1.5 rounded font-medium hover:bg-[#1a2373]">Contact Buyer</button>
                                </div>
                             </div>
                          </div>
                          <div className="bg-[#f9fafc] border-t border-[#dde0e4] p-3 text-center rounded-b-[4px] shrink-0 mt-auto">
                             <button className="text-[#1a4ab9] text-xs font-semibold hover:underline">View All</button>
                          </div>
                       </div>

                    {/* Catalog Quality & Services Rows */}
                    <div className="space-y-6 mt-6 col-span-1 md:col-span-2 lg:col-span-3">
                       
                       {/* Catalog Quality */}
                       <div className="bg-white rounded-[4px] border border-[#dde0e4] shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-5">
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#dde0e4]">
                             <h3 className="font-bold text-[15px] text-[#333] flex items-center gap-2"><Settings size={18} className="text-[#2c3691]" /> Improve your Catalog Quality</h3>
                             <button className="text-[#1a4ab9] text-xs font-semibold hover:underline">View All Products</button>
                          </div>
                          <p className="text-sm font-semibold text-[#333333] mb-4">
                             You have {dashboardProducts.length} added products. <span className="font-normal text-gray-600">Ensure the details and prices are fully updated to attract more buyers.</span>
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                             {dashboardProducts.map((prod, index) => (
                               <div key={index} className="flex items-center gap-4 bg-[#f8f9fc] p-3 border border-gray-100 rounded-lg hover:border-[#2c3691] transition-colors cursor-pointer group">
                                  <div className="w-16 h-16 bg-white border border-gray-200 flex items-center justify-center p-1 rounded overflow-hidden shrink-0 group-hover:shadow-sm transition-all">
                                     <img src={prod.images[0]} alt={prod.title} className="object-contain w-full h-full mix-blend-multiply" />
                                  </div>
                                  <div className="flex-1 overflow-hidden">
                                     <p className="text-[#1a4ab9] text-xs font-bold mb-1 uppercase tracking-wider truncate" title={prod.title}>{prod.title}</p>
                                     <p className="text-gray-500 text-[10px] mb-1.5 opacity-80">{prod.sku} • {prod.brand}</p>
                                     <div className="flex items-center gap-2">
                                        <span className="text-gray-900 text-sm font-black">₹{prod.finalPrice}</span>
                                        <span className="text-gray-400 text-xs line-through">₹{prod.regularPrice}</span>
                                        <span className="text-green-600 text-[10px] font-bold bg-green-50 px-1 py-0.5 rounded border border-green-100">{prod.discountPercent}% Off</span>
                                     </div>
                                  </div>
                               </div>
                             ))}
                          </div>
                       </div>

                       {/* Active Services */}
                           <div className="flex">
                              <div className="w-full lg:w-2/3 bg-white rounded-[4px] border border-[#dde0e4] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                                 <div className="px-5 py-4 border-b border-[#dde0e4] flex flex-wrap items-center justify-between">
                                    <h3 className="font-bold text-[15px] text-[#333] flex items-center gap-2"><LayoutDashboard size={18} className="text-[#2c3691]" /> Active Services |</h3>
                                    <p className="text-xs font-semibold text-[#1a4ab9] truncate">Dushyant Furniture Mart</p>
                                 </div>
                                 <div className="p-0">
                                    <table className="w-full text-xs">
                                       <thead>
                                          <tr className="bg-[#f5f6f8] text-[#555] font-semibold text-left">
                                             <th className="px-5 py-3 border-b border-[#dde0e4]" colSpan="3">BuyLeads Service</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <tr>
                                             <td className="px-5 py-3 border-b border-gray-100 text-[#333] w-1/2">Available Leads Balance</td>
                                             <td className="px-5 py-3 border-b border-gray-100 text-[#ef4444] font-medium">Not Available</td>
                                             <td className="px-5 py-3 border-b border-gray-100 text-[#1a4ab9] text-right"><span className="cursor-pointer hover:underline">Subscribe Now</span></td>
                                          </tr>
                                       </tbody>
                                       <thead>
                                          <tr className="bg-[#f5f6f8] text-[#555] font-semibold text-left">
                                             <th className="px-5 py-3 border-b border-[#dde0e4]" colSpan="3">Additional Service</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <tr>
                                             <td className="px-5 py-3 border-b border-gray-100 text-[#333]">Preferred Number <b>+91-8047825271</b></td>
                                             <td className="px-5 py-3 border-b border-gray-100 text-green-600 font-medium">enabled</td>
                                             <td className="px-5 py-3 border-b border-gray-100 text-[#1a4ab9] text-right"><span className="cursor-pointer hover:underline" onClick={() => setActiveTab('settings')}>Settings</span></td>
                                          </tr>
                                          <tr>
                                             <td className="px-5 py-3 border-b border-gray-100 text-[#333]">Tender Alerts</td>
                                             <td className="px-5 py-3 border-b border-gray-100 text-green-600 font-medium">enabled</td>
                                             <td className="px-5 py-3 border-b border-gray-100 text-[#1a4ab9] text-right"><span className="cursor-pointer hover:underline" onClick={() => setActiveTab('settings')}>Settings</span></td>
                                          </tr>
                                          <tr>
                                             <td className="px-5 py-3 text-[#333]">BuyLeads Alert</td>
                                             <td className="px-5 py-3 text-green-600 font-medium">enabled</td>
                                             <td className="px-5 py-3 text-[#1a4ab9] text-right"><span className="cursor-pointer hover:underline" onClick={() => setActiveTab('settings')}>Settings</span></td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           </div>

                    </div>
                 </div>
              </div>
            ) : activeTab === 'inventory' ? (
              // The original inventory view...
              <div className="bg-white rounded-md shadow-sm border border-[#dde0e4] overflow-hidden">
                 {/* Inventory Content Simplified */}
                 <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-[#333]">Manage Products</h3>
                 </div>
                 <div className="p-5 overflow-x-auto">
                    <table className="w-full text-sm text-left">
                       <thead className="bg-[#f5f6f8] text-gray-600 font-semibold border-b border-gray-200">
                          <tr>
                             <th className="px-4 py-3">Product Name</th>
                             <th className="px-4 py-3">Category</th>
                             <th className="px-4 py-3">Price</th>
                             <th className="px-4 py-3 text-right">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100">
                           {products.slice(0, 10).map((p, idx) => (
                              <tr key={idx} className="hover:bg-gray-50">
                                 <td className="px-4 py-4 flex items-center gap-3">
                                    <div className="w-10 h-10 border border-gray-200 bg-white flex items-center justify-center p-1 rounded">
                                       <img src={p.image} className="w-full h-full object-contain mix-blend-multiply" alt=""/>
                                    </div>
                                    <span className="font-semibold text-[#1a4ab9]">{p.name}</span>
                                 </td>
                                 <td className="px-4 py-4 text-gray-600">{p.category}</td>
                                 <td className="px-4 py-4 font-bold text-[#333]">₹{p.price_inr}</td>
                                 <td className="px-4 py-4 text-right">
                                    <button className="text-gray-400 hover:text-[#1a4ab9] mx-1"><Edit3 size={16}/></button>
                                    <button className="text-gray-400 hover:text-red-500 mx-1"><Trash2 size={16}/></button>
                                 </td>
                              </tr>
                           ))}
                       </tbody>
                    </table>
                 </div>
              </div>
            ) : activeTab === 'services' ? (
              // The Service requests view...
              <div className="bg-white rounded-md shadow-sm border border-[#dde0e4] overflow-hidden">
                 <div className="p-5 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-[#333]">Service Logs</h3>
                 </div>
                 <div className="p-5 overflow-x-auto">
                    <table className="w-full text-sm text-left">
                       <thead className="bg-[#f5f6f8] text-gray-600 font-semibold border-b border-gray-200">
                          <tr>
                             <th className="px-4 py-3">Ticket ID</th>
                             <th className="px-4 py-3">Customer</th>
                             <th className="px-4 py-3">Machine</th>
                             <th className="px-4 py-3">Issue</th>
                             <th className="px-4 py-3 text-right">Action</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100">
                           {serviceRequests.length === 0 ? (
                              <tr><td colSpan="5" className="px-4 py-8 text-center text-gray-500">No service requests.</td></tr>
                           ) : (
                              serviceRequests.map((req, idx) => (
                                 <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 font-bold text-[#ef4444]">{req.id}</td>
                                    <td className="px-4 py-4">
                                       <p className="font-bold text-[#333]">{req.fullName}</p>
                                       <p className="text-xs text-gray-500">{req.phone}</p>
                                    </td>
                                    <td className="px-4 py-4 text-gray-600">{req.machineModel}</td>
                                    <td className="px-4 py-4 max-w-[200px] truncate text-gray-600">{req.comments}</td>
                                    <td className="px-4 py-4 text-right">
                                       <a href={`tel:${req.phone}`} className="inline-block bg-[#2c3691] text-white px-3 py-1.5 rounded text-xs hover:bg-black transition-colors">Call</a>
                                    </td>
                                 </tr>
                              ))
                           )}
                       </tbody>
                    </table>
                 </div>
              </div>
            ) : activeTab === 'settings' ? (
                // Notification Settings View 
                <div className="w-full max-w-4xl mx-auto pb-10">
                    <h2 className="text-2xl font-bold text-[#333] mb-6">Account Settings</h2>
                    <NotificationSettings />
                </div>
            ) : (
              // fallback for other tabs
              <div className="font-bold text-gray-400 py-20 text-center uppercase tracking-widest">Select a valid workspace</div>
            )}
        </main>
      </div>
    </div>
  );
};

/* Helper Component for Sidebar */
const SidebarItem = ({ icon: Icon, label, badge, active, onClick }) => {
   return (
      <div 
        onClick={onClick}
        className={`w-full flex flex-col items-center justify-center p-3 cursor-pointer border-l-4 transition-all
          ${active ? 'border-[#ffbd41] bg-[#f8f9fc] shadow-inner text-[#2c3691]' : 'border-transparent text-[#555] hover:bg-gray-50'}
        `}
      >
         <div className="relative mb-2">
            <Icon size={26} strokeWidth={active ? 2.5 : 1.5} className={active ? 'text-[#2c3691]' : 'text-gray-500'} />
            {badge && (
               <span className="absolute -top-1.5 -right-2.5 bg-red-500 text-white text-[9px] font-black w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {badge}
               </span>
            )}
         </div>
         <span className={`text-[10px] text-center w-full truncate px-1 transition-all ${active ? 'font-bold text-[#2c3691]' : 'font-medium'}`}>
            {label}
         </span>
      </div>
   );
};

export default Dashboard;
