// // import React, { useState } from 'react';
// // import '../styles/TrackOrder.css';
// // import { motion } from 'framer-motion';
// // import { Truck, MapPin, Search, ChevronRight, Package, CheckCircle2, Navigation, Clock, Zap, ShoppingCart } from 'lucide-react';
// // import { inventoryData } from '../data/inventory';
// // import { useNavigate } from 'react-router-dom';

// // const TrackOrder = () => {
// //   const navigate = useNavigate();
// //   const [orderId, setOrderId] = useState('');
// //   const [isTracked, setIsTracked] = useState(false);

// //   const handleTrack = (e) => {
// //     e.preventDefault();
// //     if (orderId.trim()) {
// //       setIsTracked(true);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-white pt-32 pb-16 px-4 selection:bg-industrial-red selection:text-white font-['Inter']">
// //       <div className="max-w-4xl mx-auto">

// //         {/* Entrance Section */}
// //         <div className="text-center mb-16 px-4">
// //            <motion.span
// //              initial={{ opacity: 0, y: 10 }}
// //              animate={{ opacity: 1, y: 0 }}
// //              className="text-industrial-red font-black tracking-widest uppercase text-xs mb-4 block"
// //            >
// //              Logistics Intelligence
// //            </motion.span>
// //            <motion.h1
// //              initial={{ opacity: 0, y: 10 }}
// //              animate={{ opacity: 1, y: 0 }}
// //              transition={{ delay: 0.1 }}
// //              className="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase leading-tight"
// //            >
// //              Track Your <span className="text-industrial-red underline decoration-transparent group-hover:decoration-industrial-red transition-all">Procurement</span>
// //            </motion.h1>
// //            <p className="mt-8 text-gray-400 font-bold uppercase tracking-widest text-xs">Real-Time Distance Monitoring & Coordinates Reporting</p>
// //         </div>

// //         {/* Tracking Input */}
// //         <div className="bg-white rounded-0 p-8 md:p-12 border-2 border-black mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
// //            <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
// //               <div className="relative flex-1 group">
// //                  <Package className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 transition-colors group-focus-within:text-industrial-red" />
// //                  <input
// //                    type="text"
// //                    value={orderId}
// //                    onChange={(e) => setOrderId(e.target.value)}
// //                    className="w-full bg-white border-2 border-gray-200 rounded-0 py-6 pl-16 pr-6 text-sm font-black outline-none focus:border-industrial-red transition-all uppercase tracking-widest"
// //                    placeholder="ENTER SHIPMENT ID (e.g. DT-482012)"
// //                    required
// //                  />
// //               </div>
// //               <button
// //                 type="submit"
// //                 className="bg-industrial-dark hover:bg-black text-white px-10 py-6 rounded-0 font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-all"
// //               >
// //                  START TRACKING
// //                  <Search size={22} className="animate-pulse" />
// //               </button>
// //            </form>
// //         </div>

// //         {/* Tracking Results */}
// //         {isTracked && (
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             className="space-y-10"
// //           >
// //              {/* Status Card */}
// //              <div className="bg-white rounded-0 shadow-[8px_8px_0px_0px_rgba(220,38,38,0.1)] overflow-hidden border-2 border-black">
// //                 <div className="p-8 md:p-12">
// //                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">

// //                       {/* Left Block */}
// //                       <div className="space-y-8 flex-1">
// //                          <div className="space-y-2">
// //                             <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
// //                                <Navigation size={14} className="text-industrial-red" />
// //                                Strategic Location
// //                             </label>
// //                             <h2 className="text-2xl font-black text-black tracking-tight uppercase">Bhilai Hub • Sector 6 Crossing</h2>
// //                             <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Chhattisgarh, IN • Lat 21.1873, Long 81.3854</p>
// //                          </div>

// //                          <div className="grid grid-cols-2 gap-8">
// //                             <div className="bg-gray-50 p-6 rounded-0 border border-gray-200">
// //                                <Clock className="text-industrial-red mb-3" size={20} />
// //                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">ETA Arrival</p>
// //                                <p className="text-lg font-black text-black mt-1 uppercase underline decoration-industrial-red decoration-2 underline-offset-4">32 Minutes</p>
// //                             </div>
// //                             <div className="bg-gray-50 p-6 rounded-0 border border-gray-200">
// //                                <MapPin className="text-industrial-red mb-3" size={20} />
// //                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Distance</p>
// //                                <p className="text-lg font-black text-black mt-1 uppercase underline decoration-industrial-red decoration-2 underline-offset-4">12.8 KM Left</p>
// //                             </div>
// //                          </div>
// //                       </div>

// //                       {/* Right Block: Live Status */}
// //                       <div className="md:w-1/3 space-y-4">
// //                          <div className="bg-industrial-dark text-white p-8 rounded-0 relative overflow-hidden group">
// //                              <div className="absolute -right-4 -bottom-4 text-industrial-red opacity-10 group-hover:scale-110 transition-transform duration-500">
// //                                 <Truck size={120} />
// //                              </div>
// //                              <p className="text-[10px] font-black uppercase tracking-widest text-industrial-red mb-2">Current Operation</p>
// //                              <p className="text-xl font-black leading-tight uppercase tracking-tighter">Out for Strategic Delivery</p>
// //                              <div className="mt-8 flex items-center justify-between text-xs font-bold uppercase tracking-widest border-t border-white/10 pt-6">
// //                                 <span>Batch Alpha</span>
// //                                 <div className="flex space-x-1">
// //                                    <div className="w-2 h-2 rounded-0 bg-industrial-red animate-ping" />
// //                                    <div className="w-2 h-2 rounded-0 bg-industrial-red" />
// //                                 </div>
// //                              </div>
// //                          </div>
// //                       </div>
// //                    </div>
// //                 </div>

// //                 {/* Timeline */}
// //                 <div className="bg-white p-8 md:p-12 border-t-2 border-black overflow-x-auto">
// //                    <div className="flex items-center min-w-[800px] gap-4">
// //                       {[
// //                         { title: 'Order Processed', location: 'Indore Warehouse', date: '21 Mar, 08:30', status: 'done' },
// //                         { title: 'Logistics Handover', location: 'BlueDart Gateway', date: '21 Mar, 14:15', status: 'done' },
// //                         { title: 'Transit En-Route', location: 'Bhopal Hub', date: '22 Mar, 11:20', status: 'done' },
// //                         { title: 'Arrival Bhilai', location: 'Delivery Station', date: '23 Mar, 04:50', status: 'active' },
// //                         { title: 'Product Reached', location: 'Destination', date: 'TBD', status: 'pending' },
// //                       ].map((evt, idx) => (
// //                         <div key={idx} className="flex-1 relative">
// //                            {idx !== 4 && <div className={`absolute top-5 left-10 right-0 h-1 z-0 ${evt.status === 'done' ? 'bg-industrial-red' : 'bg-gray-200'}`}></div>}
// //                            <div className="flex flex-col items-center relative z-10 text-center">
// //                               <div className={`w-10 h-10 rounded-0 flex items-center justify-center shadow-none transition-all ${
// //                                 evt.status === 'done' ? 'bg-industrial-red text-white' : evt.status === 'active' ? 'bg-white text-industrial-red border-2 border-industrial-red' : 'bg-white text-gray-300 border border-gray-200'
// //                               }`}>
// //                                  {evt.status === 'done' ? <CheckCircle2 size={18} /> : <span className="font-black italic">{idx + 1}</span>}
// //                               </div>
// //                               <p className={`mt-4 text-[11px] font-black uppercase tracking-widest ${evt.status === 'pending' ? 'text-gray-400' : 'text-black'}`}>{evt.title}</p>
// //                               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mt-1">{evt.location}</p>
// //                               <p className="text-[9px] font-bold text-industrial-red mt-2">{evt.date}</p>
// //                            </div>
// //                         </div>
// //                       ))}
// //                    </div>
// //                 </div>
// //              </div>
// //           </motion.div>
// //         )}

// //         {/* Recommended Industrial Solutions */}
// //         <div className="mt-24">
// //            <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
// //               <div>
// //                  <span className="text-industrial-red font-black tracking-widest uppercase text-[10px] block mb-1">Stock Availability</span>
// //                  <h2 className="text-2xl font-black tracking-tighter uppercase">Related Procurements</h2>
// //               </div>
// //               <ChevronRight className="text-industrial-red" size={24} />
// //            </div>

// //            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
// //               {inventoryData.slice(0, 4).map((product, idx) => (
// //                 <div
// //                    key={idx}
// //                    onClick={() => navigate(`/product/${product.id}`)}
// //                    className="bg-white border-2 border-black rounded-0 p-5 hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] transition-all group cursor-pointer"
// //                 >
// //                    <div className="aspect-square bg-gray-50 flex items-center justify-center mb-6 relative overflow-hidden border border-gray-100">
// //                       <img src={product.image} alt={product.name} className="w-2/3 h-2/3 object-contain group-hover:scale-110 transition-transform duration-500" />
// //                       <div className="absolute top-0 right-0 bg-industrial-red text-white text-[8px] font-black px-3 py-1 uppercase italic">
// //                          In Stock
// //                       </div>
// //                    </div>
// //                    <div className="space-y-1">
// //                       <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{product.brand || 'Industrial Grade'}</p>
// //                       <h4 className="text-xs font-black uppercase tracking-tight line-clamp-1 group-hover:text-industrial-red transition-colors">{product.name}</h4>
// //                       <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
// //                          <span className="text-sm font-black text-black">₹{(product.price_inr || 1499).toLocaleString()}</span>
// //                          <div className="bg-black text-white p-2 rounded-0 group-hover:bg-industrial-red transition-colors">
// //                             <ShoppingCart size={14} />
// //                          </div>
// //                       </div>
// //                    </div>
// //                 </div>
// //               ))}
// //            </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TrackOrder;

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
//   AreaChart,
//   Area,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Radar,
//   ComposedChart,
//   Scatter,
//   Treemap,
// } from "recharts";

// // ============================================================
// // 1. MOCK DATA
// // ============================================================

// const COLORS = [
//   "#3b82f6",
//   "#10b981",
//   "#f59e0b",
//   "#ef4444",
//   "#8b5cf6",
//   "#ec4899",
//   "#14b8a6",
//   "#f97316",
// ];

// const KPI_DATA = {
//   todayOrders: 47,
//   todayRevenue: 2845000,
//   todayExpense: 1892000,
//   todayProfit: 953000,
//   netProfit: 12580000,
//   pendingOrders: 23,
//   processingOrders: 41,
//   deliveredOrders: 892,
//   cancelledOrders: 18,
//   returnedOrders: 12,
//   lowStock: 34,
//   inventoryValue: 45600000,
//   warehouseCapacity: 78,
//   regularCustomers: 156,
//   vipCustomers: 43,
//   suppliers: 28,
//   outstandingPayments: 5600000,
//   totalProducts: 1247,
//   totalWarehouses: 6,
//   monthlyGrowth: 12.4,
// };

// const ORDER_DATA = [
//   {
//     id: "ORD-1001",
//     invoice: "INV-2024-001",
//     customer: "Dushyant Hardware",
//     type: "VIP",
//     products: 4,
//     qty: 12,
//     warehouse: "Delhi WH",
//     employee: "Rajesh Kumar",
//     date: "2024-12-18",
//     expected: "2024-12-20",
//     payment: "Paid",
//     status: "Delivered",
//     courier: "DTDC",
//     tracking: "DTDC123456",
//     amount: 12500,
//     profit: 1850,
//   },
//   {
//     id: "ORD-1002",
//     invoice: "INV-2024-002",
//     customer: "ABC Traders",
//     type: "Regular",
//     products: 2,
//     qty: 5,
//     warehouse: "Mumbai WH",
//     employee: "Priya Sharma",
//     date: "2024-12-18",
//     expected: "2024-12-22",
//     payment: "Pending",
//     status: "Processing",
//     courier: "Delhivery",
//     tracking: "DEL456789",
//     amount: 6700,
//     profit: 980,
//   },
//   {
//     id: "ORD-1003",
//     invoice: "INV-2024-003",
//     customer: "XYZ Enterprises",
//     type: "Regular",
//     products: 6,
//     qty: 18,
//     warehouse: "Bangalore WH",
//     employee: "Amit Patel",
//     date: "2024-12-17",
//     expected: "2024-12-21",
//     payment: "Paid",
//     status: "Shipped",
//     courier: "Bluedart",
//     tracking: "BLU789012",
//     amount: 25900,
//     profit: 4200,
//   },
//   {
//     id: "ORD-1004",
//     invoice: "INV-2024-004",
//     customer: "Singh Electricals",
//     type: "VIP",
//     products: 3,
//     qty: 8,
//     warehouse: "Delhi WH",
//     employee: "Rajesh Kumar",
//     date: "2024-12-17",
//     expected: "2024-12-19",
//     payment: "Paid",
//     status: "Delivered",
//     courier: "FedEx",
//     tracking: "FED345678",
//     amount: 18400,
//     profit: 3100,
//   },
//   {
//     id: "ORD-1005",
//     invoice: "INV-2024-005",
//     customer: "Gupta Distributors",
//     type: "Regular",
//     products: 5,
//     qty: 25,
//     warehouse: "Chennai WH",
//     employee: "Sneha Reddy",
//     date: "2024-12-16",
//     expected: "2024-12-23",
//     payment: "Partial",
//     status: "Processing",
//     courier: "DTDC",
//     tracking: "DTDC901234",
//     amount: 45200,
//     profit: 7200,
//   },
//   {
//     id: "ORD-1006",
//     invoice: "INV-2024-006",
//     customer: "Bharat Traders",
//     type: "Regular",
//     products: 1,
//     qty: 3,
//     warehouse: "Mumbai WH",
//     employee: "Priya Sharma",
//     date: "2024-12-16",
//     expected: "2024-12-18",
//     payment: "Paid",
//     status: "Delivered",
//     courier: "Bluedart",
//     tracking: "BLU567890",
//     amount: 3200,
//     profit: 450,
//   },
//   {
//     id: "ORD-1007",
//     invoice: "INV-2024-007",
//     customer: "Kumar Hardware Store",
//     type: "VIP",
//     products: 7,
//     qty: 30,
//     warehouse: "Delhi WH",
//     employee: "Rajesh Kumar",
//     date: "2024-12-15",
//     expected: "2024-12-25",
//     payment: "Pending",
//     status: "Pending",
//     courier: "Delhivery",
//     tracking: "DEL123456",
//     amount: 78900,
//     profit: 12500,
//   },
//   {
//     id: "ORD-1008",
//     invoice: "INV-2024-008",
//     customer: "Mohan Electronics",
//     type: "Regular",
//     products: 2,
//     qty: 4,
//     warehouse: "Bangalore WH",
//     employee: "Amit Patel",
//     date: "2024-12-15",
//     expected: "2024-12-19",
//     payment: "Paid",
//     status: "Cancelled",
//     courier: "FedEx",
//     tracking: "FED890123",
//     amount: 5400,
//     profit: -200,
//   },
//   {
//     id: "ORD-1009",
//     invoice: "INV-2024-009",
//     customer: "Sharma Agencies",
//     type: "Regular",
//     products: 4,
//     qty: 15,
//     warehouse: "Chennai WH",
//     employee: "Sneha Reddy",
//     date: "2024-12-14",
//     expected: "2024-12-20",
//     payment: "Paid",
//     status: "Returned",
//     courier: "DTDC",
//     tracking: "DTDC567890",
//     amount: 21600,
//     profit: 3400,
//   },
//   {
//     id: "ORD-1010",
//     invoice: "INV-2024-010",
//     customer: "Dushyant Hardware",
//     type: "VIP",
//     products: 3,
//     qty: 9,
//     warehouse: "Delhi WH",
//     employee: "Rajesh Kumar",
//     date: "2024-12-14",
//     expected: "2024-12-16",
//     payment: "Paid",
//     status: "Delivered",
//     courier: "Bluedart",
//     tracking: "BLU901234",
//     amount: 15800,
//     profit: 2400,
//   },
// ];

// const CUSTOMER_DATA = [
//   {
//     id: 1,
//     name: "Dushyant Hardware",
//     type: "VIP",
//     phone: "+91 98765 43210",
//     email: "info@dushyanthardware.com",
//     gst: "27AABCD1234D1ZP",
//     address: "Plot 42, Industrial Area, Delhi",
//     orders: 152,
//     revenue: 12800000,
//     profit: 2150000,
//     outstanding: 25000,
//     creditLimit: 200000,
//     status: "Active",
//     rating: 4.9,
//     lastOrder: "2024-12-18",
//   },
//   {
//     id: 2,
//     name: "ABC Traders",
//     type: "Regular",
//     phone: "+91 87654 32109",
//     email: "contact@abctraders.in",
//     gst: "27XYZ7890E1ZP",
//     address: "Shop 15, Main Market, Mumbai",
//     orders: 96,
//     revenue: 8200000,
//     profit: 1380000,
//     outstanding: 0,
//     creditLimit: 100000,
//     status: "Active",
//     rating: 4.7,
//     lastOrder: "2024-12-18",
//   },
//   {
//     id: 3,
//     name: "XYZ Enterprises",
//     type: "Regular",
//     phone: "+91 76543 21098",
//     email: "info@xyzenterprise.com",
//     gst: "29PQR4567F1ZP",
//     address: "Tech Park, Bangalore",
//     orders: 78,
//     revenue: 6800000,
//     profit: 1120000,
//     outstanding: 45000,
//     creditLimit: 150000,
//     status: "Active",
//     rating: 4.5,
//     lastOrder: "2024-12-17",
//   },
//   {
//     id: 4,
//     name: "Singh Electricals",
//     type: "VIP",
//     phone: "+91 65432 10987",
//     email: "singh@electricals.in",
//     gst: "08LMN3210G1ZP",
//     address: "Electronics City, Delhi",
//     orders: 124,
//     revenue: 10500000,
//     profit: 1780000,
//     outstanding: 0,
//     creditLimit: 250000,
//     status: "Active",
//     rating: 4.8,
//     lastOrder: "2024-12-17",
//   },
//   {
//     id: 5,
//     name: "Gupta Distributors",
//     type: "Regular",
//     phone: "+91 54321 09876",
//     email: "gupta@distributors.com",
//     gst: "22JKL7890H1ZP",
//     address: "Distribution Center, Chennai",
//     orders: 67,
//     revenue: 5600000,
//     profit: 890000,
//     outstanding: 120000,
//     creditLimit: 200000,
//     status: "Active",
//     rating: 4.3,
//     lastOrder: "2024-12-16",
//   },
//   {
//     id: 6,
//     name: "Bharat Traders",
//     type: "Regular",
//     phone: "+91 43210 98765",
//     email: "bharat@traders.in",
//     gst: "19RST3456I1ZP",
//     address: "Trading Complex, Mumbai",
//     orders: 45,
//     revenue: 3800000,
//     profit: 620000,
//     outstanding: 0,
//     creditLimit: 80000,
//     status: "Inactive",
//     rating: 4.1,
//     lastOrder: "2024-10-15",
//   },
//   {
//     id: 7,
//     name: "Kumar Hardware Store",
//     type: "VIP",
//     phone: "+91 32109 87654",
//     email: "kumar@hardware.in",
//     gst: "07UVW9012J1ZP",
//     address: "Main Road, Delhi",
//     orders: 203,
//     revenue: 18200000,
//     profit: 3150000,
//     outstanding: 75000,
//     creditLimit: 300000,
//     status: "Active",
//     rating: 4.9,
//     lastOrder: "2024-12-15",
//   },
//   {
//     id: 8,
//     name: "Mohan Electronics",
//     type: "Regular",
//     phone: "+91 21098 76543",
//     email: "mohan@electronics.in",
//     gst: "15EFG5678K1ZP",
//     address: "Electronic Market, Bangalore",
//     orders: 34,
//     revenue: 2900000,
//     profit: 480000,
//     outstanding: 0,
//     creditLimit: 50000,
//     status: "Active",
//     rating: 4.0,
//     lastOrder: "2024-12-15",
//   },
// ];

// const SUPPLIER_DATA = [
//   {
//     id: 1,
//     name: "Bosch India",
//     gst: "06HIJ2345L1ZP",
//     phone: "+91 98765 11111",
//     email: "supply@bosch.in",
//     warehouse: "Delhi WH",
//     products: 43,
//     purchaseOrders: 320,
//     outstanding: 280000,
//     paymentTerms: "Net 30",
//     deliveryPerf: 4.8,
//     avgDelivery: 2,
//     rating: 4.9,
//     totalPurchases: 45600000,
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Tata Steel",
//     gst: "13KLM6789M1ZP",
//     phone: "+91 87654 22222",
//     email: "procure@tatasteel.com",
//     warehouse: "Mumbai WH",
//     products: 28,
//     purchaseOrders: 195,
//     outstanding: 450000,
//     paymentTerms: "Net 45",
//     deliveryPerf: 4.5,
//     avgDelivery: 3,
//     rating: 4.7,
//     totalPurchases: 32800000,
//     status: "Active",
//   },
//   {
//     id: 3,
//     name: "Reliance Industries",
//     gst: "21NOP0123N1ZP",
//     phone: "+91 76543 33333",
//     email: "supply@ril.com",
//     warehouse: "Bangalore WH",
//     products: 56,
//     purchaseOrders: 247,
//     outstanding: 320000,
//     paymentTerms: "Net 30",
//     deliveryPerf: 4.6,
//     avgDelivery: 2.5,
//     rating: 4.8,
//     totalPurchases: 38900000,
//     status: "Active",
//   },
//   {
//     id: 4,
//     name: "Larsen & Toubro",
//     gst: "09QRS4567O1ZP",
//     phone: "+91 65432 44444",
//     email: "procurement@lnt.com",
//     warehouse: "Chennai WH",
//     products: 34,
//     purchaseOrders: 178,
//     outstanding: 190000,
//     paymentTerms: "Net 60",
//     deliveryPerf: 4.3,
//     avgDelivery: 4,
//     rating: 4.4,
//     totalPurchases: 26700000,
//     status: "Active",
//   },
//   {
//     id: 5,
//     name: "ITC Limited",
//     gst: "16TUV8901P1ZP",
//     phone: "+91 54321 55555",
//     email: "supply@itc.in",
//     warehouse: "Delhi WH",
//     products: 19,
//     purchaseOrders: 89,
//     outstanding: 0,
//     paymentTerms: "Net 30",
//     deliveryPerf: 4.9,
//     avgDelivery: 1.5,
//     rating: 4.9,
//     totalPurchases: 15600000,
//     status: "Active",
//   },
// ];

// const PRODUCT_DATA = [
//   {
//     id: 1,
//     name: "Cordless Drill",
//     sku: "DRL-001",
//     category: "Power Tools",
//     brand: "Bosch",
//     warehouse: "Delhi WH",
//     rack: "A-12",
//     shelf: "3",
//     bin: "A-12-3-01",
//     stock: 47,
//     reserved: 8,
//     available: 39,
//     minStock: 15,
//     maxStock: 100,
//     purchasePrice: 1200,
//     sellingPrice: 1850,
//     mrp: 2200,
//     gst: 18,
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Hammer 500g",
//     sku: "HMR-002",
//     category: "Hand Tools",
//     brand: "Tata",
//     warehouse: "Mumbai WH",
//     rack: "B-05",
//     shelf: "2",
//     bin: "B-05-2-03",
//     stock: 120,
//     reserved: 12,
//     available: 108,
//     minStock: 30,
//     maxStock: 200,
//     purchasePrice: 180,
//     sellingPrice: 299,
//     mrp: 350,
//     gst: 12,
//     status: "Active",
//   },
//   {
//     id: 3,
//     name: "Safety Gloves",
//     sku: "SFT-003",
//     category: "Safety",
//     brand: "3M",
//     warehouse: "Delhi WH",
//     rack: "C-08",
//     shelf: "1",
//     bin: "C-08-1-02",
//     stock: 250,
//     reserved: 25,
//     available: 225,
//     minStock: 50,
//     maxStock: 500,
//     purchasePrice: 85,
//     sellingPrice: 150,
//     mrp: 180,
//     gst: 5,
//     status: "Active",
//   },
//   {
//     id: 4,
//     name: 'Cutting Disc 4"',
//     sku: "CUT-004",
//     category: "Abrasives",
//     brand: "Bosch",
//     warehouse: "Bangalore WH",
//     rack: "D-15",
//     shelf: "4",
//     bin: "D-15-4-01",
//     stock: 65,
//     reserved: 10,
//     available: 55,
//     minStock: 20,
//     maxStock: 150,
//     purchasePrice: 45,
//     sellingPrice: 89,
//     mrp: 110,
//     gst: 18,
//     status: "Active",
//   },
//   {
//     id: 5,
//     name: "Plywood 4x8",
//     sku: "PLY-005",
//     category: "Building Material",
//     brand: "Century",
//     warehouse: "Delhi WH",
//     rack: "E-22",
//     shelf: "1",
//     bin: "E-22-1-05",
//     stock: 180,
//     reserved: 30,
//     available: 150,
//     minStock: 40,
//     maxStock: 300,
//     purchasePrice: 1250,
//     sellingPrice: 1890,
//     mrp: 2200,
//     gst: 18,
//     status: "Active",
//   },
//   {
//     id: 6,
//     name: "Grinder Angle",
//     sku: "GRN-006",
//     category: "Power Tools",
//     brand: "Makita",
//     warehouse: "Mumbai WH",
//     rack: "F-10",
//     shelf: "2",
//     bin: "F-10-2-01",
//     stock: 32,
//     reserved: 6,
//     available: 26,
//     minStock: 10,
//     maxStock: 80,
//     purchasePrice: 1800,
//     sellingPrice: 2800,
//     mrp: 3400,
//     gst: 18,
//     status: "Active",
//   },
//   {
//     id: 7,
//     name: "Measuring Tape 5m",
//     sku: "MTR-007",
//     category: "Measuring",
//     brand: "Stanley",
//     warehouse: "Chennai WH",
//     rack: "G-03",
//     shelf: "3",
//     bin: "G-03-3-02",
//     stock: 85,
//     reserved: 5,
//     available: 80,
//     minStock: 15,
//     maxStock: 150,
//     purchasePrice: 120,
//     sellingPrice: 199,
//     mrp: 250,
//     gst: 12,
//     status: "Active",
//   },
//   {
//     id: 8,
//     name: "LED Flood Light",
//     sku: "LGT-008",
//     category: "Lighting",
//     brand: "Philips",
//     warehouse: "Bangalore WH",
//     rack: "H-18",
//     shelf: "1",
//     bin: "H-18-1-03",
//     stock: 42,
//     reserved: 8,
//     available: 34,
//     minStock: 12,
//     maxStock: 100,
//     purchasePrice: 650,
//     sellingPrice: 1050,
//     mrp: 1300,
//     gst: 18,
//     status: "Active",
//   },
// ];

// const WAREHOUSE_DATA = [
//   {
//     id: 1,
//     name: "Delhi WH",
//     code: "DEL-01",
//     address: "Plot 42, Industrial Area, Delhi",
//     manager: "Rajesh Kumar",
//     capacity: 85,
//     occupied: 72,
//     available: 13,
//     status: "Active",
//     lat: 28.7041,
//     lng: 77.1025,
//     products: 324,
//     orders: 456,
//     revenue: 45600000,
//   },
//   {
//     id: 2,
//     name: "Mumbai WH",
//     code: "BOM-01",
//     address: "Warehouse District, Mumbai",
//     manager: "Priya Sharma",
//     capacity: 70,
//     occupied: 58,
//     available: 12,
//     status: "Active",
//     lat: 19.076,
//     lng: 72.8777,
//     products: 256,
//     orders: 389,
//     revenue: 32800000,
//   },
//   {
//     id: 3,
//     name: "Bangalore WH",
//     code: "BLR-01",
//     address: "Electronic City, Bangalore",
//     manager: "Amit Patel",
//     capacity: 60,
//     occupied: 45,
//     available: 15,
//     status: "Active",
//     lat: 12.9716,
//     lng: 77.5946,
//     products: 198,
//     orders: 302,
//     revenue: 25600000,
//   },
//   {
//     id: 4,
//     name: "Chennai WH",
//     code: "CHE-01",
//     address: "Industrial Estate, Chennai",
//     manager: "Sneha Reddy",
//     capacity: 50,
//     occupied: 38,
//     available: 12,
//     status: "Active",
//     lat: 13.0827,
//     lng: 80.2707,
//     products: 167,
//     orders: 245,
//     revenue: 18900000,
//   },
//   {
//     id: 5,
//     name: "Hyderabad WH",
//     code: "HYD-01",
//     address: "Hi-Tech City, Hyderabad",
//     manager: "Vikram Singh",
//     capacity: 45,
//     occupied: 32,
//     available: 13,
//     status: "Active",
//     lat: 17.385,
//     lng: 78.4867,
//     products: 142,
//     orders: 198,
//     revenue: 14500000,
//   },
//   {
//     id: 6,
//     name: "Kolkata WH",
//     code: "KOL-01",
//     address: "Salt Lake City, Kolkata",
//     manager: "Arjun Das",
//     capacity: 40,
//     occupied: 28,
//     available: 12,
//     status: "Under Construction",
//     lat: 22.5726,
//     lng: 88.3639,
//     products: 98,
//     orders: 156,
//     revenue: 9800000,
//   },
// ];

// const REVENUE_DATA = [
//   { month: "Jan", revenue: 3200000, expense: 2100000, profit: 1100000 },
//   { month: "Feb", revenue: 3500000, expense: 2250000, profit: 1250000 },
//   { month: "Mar", revenue: 3800000, expense: 2400000, profit: 1400000 },
//   { month: "Apr", revenue: 4200000, expense: 2650000, profit: 1550000 },
//   { month: "May", revenue: 4500000, expense: 2800000, profit: 1700000 },
//   { month: "Jun", revenue: 4800000, expense: 2950000, profit: 1850000 },
//   { month: "Jul", revenue: 5100000, expense: 3100000, profit: 2000000 },
//   { month: "Aug", revenue: 4900000, expense: 3050000, profit: 1850000 },
//   { month: "Sep", revenue: 5200000, expense: 3200000, profit: 2000000 },
//   { month: "Oct", revenue: 5600000, expense: 3400000, profit: 2200000 },
//   { month: "Nov", revenue: 5800000, expense: 3500000, profit: 2300000 },
//   { month: "Dec", revenue: 6100000, expense: 3700000, profit: 2400000 },
// ];

// const ORDER_STATUS_DATA = [
//   { name: "Delivered", value: 892 },
//   { name: "Processing", value: 41 },
//   { name: "Pending", value: 23 },
//   { name: "Cancelled", value: 18 },
//   { name: "Returned", value: 12 },
// ];

// const TOP_PRODUCTS_DATA = [
//   { name: "Cordless Drill", sales: 234 },
//   { name: "Hammer 500g", sales: 189 },
//   { name: "Safety Gloves", sales: 156 },
//   { name: "Grinder Angle", sales: 134 },
//   { name: "Plywood 4x8", sales: 112 },
//   { name: "LED Flood Light", sales: 98 },
// ];

// const SUPPLIER_PERFORMANCE_DATA = [
//   { name: "Bosch", deliveries: 320, quality: 4.9, time: 4.8 },
//   { name: "Tata", deliveries: 195, quality: 4.7, time: 4.5 },
//   { name: "Reliance", deliveries: 247, quality: 4.8, time: 4.6 },
//   { name: "L&T", deliveries: 178, quality: 4.4, time: 4.3 },
//   { name: "ITC", deliveries: 89, quality: 4.9, time: 4.9 },
// ];

// const CUSTOMER_ANALYTICS_DATA = [
//   { name: "Dushyant", orders: 152, revenue: 12800000 },
//   { name: "Singh", orders: 124, revenue: 10500000 },
//   { name: "Kumar", orders: 203, revenue: 18200000 },
//   { name: "ABC", orders: 96, revenue: 8200000 },
//   { name: "XYZ", orders: 78, revenue: 6800000 },
// ];

// const EXPENSE_BREAKDOWN = [
//   { name: "Purchase Cost", value: 65 },
//   { name: "Courier Charges", value: 12 },
//   { name: "Employee Salary", value: 8 },
//   { name: "Warehouse Rent", value: 6 },
//   { name: "Packing Materials", value: 4 },
//   { name: "Taxes", value: 3 },
//   { name: "Others", value: 2 },
// ];

// const NOTIFICATIONS = [
//   {
//     id: 1,
//     type: "Low Stock",
//     message: "Cordless Drill stock is below minimum level (15 units remaining)",
//     time: "5 mins ago",
//     read: false,
//     priority: "High",
//   },
//   {
//     id: 2,
//     type: "Payment",
//     message: "Payment of ₹45,000 received from ABC Traders for order ORD-1002",
//     time: "15 mins ago",
//     read: false,
//     priority: "Medium",
//   },
//   {
//     id: 3,
//     type: "Order",
//     message: "New order ORD-1011 placed by Kumar Hardware Store for ₹78,900",
//     time: "32 mins ago",
//     read: false,
//     priority: "High",
//   },
//   {
//     id: 4,
//     type: "Return",
//     message:
//       "Return request for ORD-1009 from Sharma Agencies awaiting approval",
//     time: "1 hour ago",
//     read: false,
//     priority: "Medium",
//   },
//   {
//     id: 5,
//     type: "Supplier",
//     message:
//       "Bosch India delivery for purchase order PO-2024-045 is delayed by 2 days",
//     time: "2 hours ago",
//     read: true,
//     priority: "Low",
//   },
//   {
//     id: 6,
//     type: "Warehouse",
//     message: "Delhi WH is at 85% capacity. Consider optimizing storage.",
//     time: "3 hours ago",
//     read: true,
//     priority: "Medium",
//   },
// ];

// const RECENT_ACTIVITIES = [
//   {
//     id: 1,
//     user: "Rajesh Kumar",
//     action: "Picked product Cordless Drill for ORD-1001",
//     time: "10 mins ago",
//     type: "Picking",
//   },
//   {
//     id: 2,
//     user: "Priya Sharma",
//     action: "Packed order ORD-1002 for ABC Traders",
//     time: "25 mins ago",
//     type: "Packing",
//   },
//   {
//     id: 3,
//     user: "Amit Patel",
//     action: "Shipped ORD-1003 via Bluedart tracking BLU789012",
//     time: "45 mins ago",
//     type: "Shipping",
//   },
//   {
//     id: 4,
//     user: "Sneha Reddy",
//     action: "Received new stock of Grinder Angle (32 units)",
//     time: "1 hour ago",
//     type: "Inventory",
//   },
//   {
//     id: 5,
//     user: "Vikram Singh",
//     action: "Return processed for ORD-1009 - refund initiated",
//     time: "2 hours ago",
//     type: "Return",
//   },
// ];

// // ============================================================
// // 2. UTILITY FUNCTIONS
// // ============================================================

// const formatCurrency = (value) => {
//   if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`;
//   if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
//   if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
//   return `₹${value.toFixed(0)}`;
// };

// const formatCurrencyFull = (value) => {
//   return `₹${value.toLocaleString("en-IN")}`;
// };

// const getStatusColor = (status) => {
//   const map = {
//     Delivered:
//       "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
//     Processing:
//       "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
//     Pending:
//       "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
//     Shipped:
//       "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
//     Cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
//     Returned:
//       "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
//     Active:
//       "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
//     Inactive:
//       "bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300",
//     "Under Construction":
//       "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
//     VIP: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
//     Regular: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
//     Paid: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
//     Partial:
//       "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
//     High: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
//     Medium:
//       "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
//     Low: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
//   };
//   return (
//     map[status] ||
//     "bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300"
//   );
// };

// const getInitials = (name) => {
//   return name
//     .split(" ")
//     .map((word) => word[0])
//     .join("")
//     .toUpperCase()
//     .slice(0, 2);
// };

// // ============================================================
// // 3. MAIN COMPONENT
// // ============================================================

// const OrderManagementSystem = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [activeSubTab, setActiveSubTab] = useState("all");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [selectedSupplier, setSelectedSupplier] = useState(null);
//   const [selectedWarehouse, setSelectedWarehouse] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalContent, setModalContent] = useState(null);
//   const [notificationPanel, setNotificationPanel] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [currentView, setCurrentView] = useState("dashboard");

//   // Toggle theme
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   // Handle escape key
//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === "Escape") {
//         setDrawerOpen(false);
//         setModalOpen(false);
//         setNotificationPanel(false);
//       }
//     };
//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, []);

//   // Filter orders based on search and sub tab
//   const filteredOrders = useMemo(() => {
//     let result = ORDER_DATA;
//     if (searchQuery) {
//       const q = searchQuery.toLowerCase();
//       result = result.filter(
//         (o) =>
//           o.id.toLowerCase().includes(q) ||
//           o.customer.toLowerCase().includes(q) ||
//           o.invoice.toLowerCase().includes(q) ||
//           o.tracking.toLowerCase().includes(q),
//       );
//     }
//     if (activeSubTab !== "all") {
//       result = result.filter(
//         (o) => o.status.toLowerCase() === activeSubTab.toLowerCase(),
//       );
//     }
//     return result;
//   }, [searchQuery, activeSubTab]);

//   // Filter customers
//   const filteredCustomers = useMemo(() => {
//     let result = CUSTOMER_DATA;
//     if (searchQuery) {
//       const q = searchQuery.toLowerCase();
//       result = result.filter(
//         (c) =>
//           c.name.toLowerCase().includes(q) ||
//           c.phone.includes(q) ||
//           c.email.toLowerCase().includes(q) ||
//           c.gst.toLowerCase().includes(q),
//       );
//     }
//     return result;
//   }, [searchQuery]);

//   // Filter suppliers
//   const filteredSuppliers = useMemo(() => {
//     let result = SUPPLIER_DATA;
//     if (searchQuery) {
//       const q = searchQuery.toLowerCase();
//       result = result.filter(
//         (s) =>
//           s.name.toLowerCase().includes(q) ||
//           s.phone.includes(q) ||
//           s.email.toLowerCase().includes(q) ||
//           s.gst.toLowerCase().includes(q),
//       );
//     }
//     return result;
//   }, [searchQuery]);

//   // Filter products
//   const filteredProducts = useMemo(() => {
//     let result = PRODUCT_DATA;
//     if (searchQuery) {
//       const q = searchQuery.toLowerCase();
//       result = result.filter(
//         (p) =>
//           p.name.toLowerCase().includes(q) ||
//           p.sku.toLowerCase().includes(q) ||
//           p.brand.toLowerCase().includes(q) ||
//           p.category.toLowerCase().includes(q),
//       );
//     }
//     return result;
//   }, [searchQuery]);

//   // Sidebar menu items
//   const menuItems = [
//     { id: "overview", label: "Overview", icon: "📊" },
//     { id: "orders", label: "Orders", icon: "📦" },
//     { id: "customers", label: "Customers", icon: "👤" },
//     { id: "suppliers", label: "Suppliers", icon: "🏭" },
//     { id: "products", label: "Products", icon: "📱" },
//     { id: "inventory", label: "Inventory", icon: "📋" },
//     { id: "warehouses", label: "Warehouses", icon: "🏚️" },
//     { id: "analytics", label: "Analytics", icon: "📈" },
//     { id: "expenses", label: "Expenses", icon: "💰" },
//     { id: "reports", label: "Reports", icon: "📄" },
//     { id: "settings", label: "Settings", icon: "⚙️" },
//   ];

//   // ============================================================
//   // 4. RENDER FUNCTIONS FOR EACH TAB
//   // ============================================================

//   // 4.1 OVERVIEW DASHBOARD
//   const renderOverview = () => {
//     const kpiCards = [
//       {
//         label: "Today's Orders",
//         value: KPI_DATA.todayOrders,
//         icon: "📦",
//         color: "bg-blue-500",
//       },
//       {
//         label: "Today's Revenue",
//         value: formatCurrency(KPI_DATA.todayRevenue),
//         icon: "💰",
//         color: "bg-green-500",
//       },
//       {
//         label: "Today's Expense",
//         value: formatCurrency(KPI_DATA.todayExpense),
//         icon: "💳",
//         color: "bg-red-500",
//       },
//       {
//         label: "Today's Profit",
//         value: formatCurrency(KPI_DATA.todayProfit),
//         icon: "📈",
//         color: "bg-purple-500",
//       },
//       {
//         label: "Net Profit",
//         value: formatCurrency(KPI_DATA.netProfit),
//         icon: "🏆",
//         color: "bg-indigo-500",
//       },
//       {
//         label: "Pending Orders",
//         value: KPI_DATA.pendingOrders,
//         icon: "⏳",
//         color: "bg-yellow-500",
//       },
//       {
//         label: "Delivered Orders",
//         value: KPI_DATA.deliveredOrders,
//         icon: "✅",
//         color: "bg-emerald-500",
//       },
//       {
//         label: "Low Stock",
//         value: KPI_DATA.lowStock,
//         icon: "⚠️",
//         color: "bg-orange-500",
//       },
//       {
//         label: "VIP Customers",
//         value: KPI_DATA.vipCustomers,
//         icon: "👑",
//         color: "bg-pink-500",
//       },
//       {
//         label: "Total Warehouses",
//         value: KPI_DATA.totalWarehouses,
//         icon: "🏚️",
//         color: "bg-cyan-500",
//       },
//       {
//         label: "Outstanding",
//         value: formatCurrency(KPI_DATA.outstandingPayments),
//         icon: "💸",
//         color: "bg-rose-500",
//       },
//       {
//         label: "Monthly Growth",
//         value: `${KPI_DATA.monthlyGrowth}%`,
//         icon: "🚀",
//         color: "bg-teal-500",
//       },
//     ];

//     return (
//       <div className="space-y-6">
//         {/* KPI Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//           {kpiCards.map((card, idx) => (
//             <div
//               key={idx}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-start justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                     {card.label}
//                   </p>
//                   <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
//                     {card.value}
//                   </p>
//                 </div>
//                 <div
//                   className={`${card.color} w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl`}
//                 >
//                   {card.icon}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Charts Row 1 */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Revenue vs Expense Chart */}
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
//               Revenue vs Expense
//             </h3>
//             <ResponsiveContainer width="100%" height={280}>
//               <ComposedChart data={REVENUE_DATA}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                 <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
//                 <YAxis
//                   stroke="#6b7280"
//                   fontSize={11}
//                   tickFormatter={(v) => `₹${v / 1000}K`}
//                 />
//                 <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
//                 <Legend />
//                 <Bar
//                   dataKey="revenue"
//                   fill="#3b82f6"
//                   name="Revenue"
//                   barSize={20}
//                   radius={[4, 4, 0, 0]}
//                 />
//                 <Bar
//                   dataKey="expense"
//                   fill="#ef4444"
//                   name="Expense"
//                   barSize={20}
//                   radius={[4, 4, 0, 0]}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="profit"
//                   stroke="#10b981"
//                   name="Profit"
//                   strokeWidth={3}
//                   dot={{ r: 4 }}
//                 />
//               </ComposedChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Order Status Pie Chart */}
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
//               Order Status Distribution
//             </h3>
//             <ResponsiveContainer width="100%" height={280}>
//               <PieChart>
//                 <Pie
//                   data={ORDER_STATUS_DATA}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={100}
//                   paddingAngle={3}
//                   dataKey="value"
//                   label={({ name, percent }) =>
//                     `${name} ${(percent * 100).toFixed(0)}%`
//                   }
//                   labelLine={{ stroke: "#6b7280" }}
//                 >
//                   {ORDER_STATUS_DATA.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(v) => `${v} orders`} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Charts Row 2 */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Top Selling Products */}
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
//               Top Selling Products
//             </h3>
//             <ResponsiveContainer width="100%" height={220}>
//               <BarChart data={TOP_PRODUCTS_DATA} layout="vertical">
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                 <XAxis type="number" stroke="#6b7280" fontSize={11} />
//                 <YAxis
//                   type="category"
//                   dataKey="name"
//                   stroke="#6b7280"
//                   fontSize={11}
//                   tick={{ fontSize: 10 }}
//                   width={80}
//                 />
//                 <Tooltip formatter={(v) => `${v} units`} />
//                 <Bar
//                   dataKey="sales"
//                   fill="#8b5cf6"
//                   radius={[0, 4, 4, 0]}
//                   barSize={16}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Supplier Performance Radar */}
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
//               Supplier Performance
//             </h3>
//             <ResponsiveContainer width="100%" height={220}>
//               <RadarChart data={SUPPLIER_PERFORMANCE_DATA}>
//                 <PolarGrid stroke="#e5e7eb" />
//                 <PolarAngleAxis dataKey="name" stroke="#6b7280" fontSize={10} />
//                 <PolarRadiusAxis
//                   stroke="#6b7280"
//                   fontSize={10}
//                   domain={[0, 5]}
//                   tickCount={6}
//                 />
//                 <Radar
//                   name="Quality"
//                   dataKey="quality"
//                   stroke="#3b82f6"
//                   fill="#3b82f6"
//                   fillOpacity={0.3}
//                 />
//                 <Radar
//                   name="Delivery"
//                   dataKey="time"
//                   stroke="#10b981"
//                   fill="#10b981"
//                   fillOpacity={0.3}
//                 />
//                 <Tooltip />
//                 <Legend />
//               </RadarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Expense Breakdown */}
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
//               Expense Breakdown
//             </h3>
//             <ResponsiveContainer width="100%" height={220}>
//               <PieChart>
//                 <Pie
//                   data={EXPENSE_BREAKDOWN}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={50}
//                   outerRadius={80}
//                   paddingAngle={2}
//                   dataKey="value"
//                   label={({ name, percent }) =>
//                     `${name} ${(percent * 100).toFixed(0)}%`
//                   }
//                   labelLine={{ stroke: "#6b7280" }}
//                 >
//                   {EXPENSE_BREAKDOWN.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(v) => `${v}%`} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Recent Activity & Notifications */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
//               Recent Activity
//             </h3>
//             <div className="space-y-3">
//               {RECENT_ACTIVITIES.map((activity) => (
//                 <div
//                   key={activity.id}
//                   className="flex items-start gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg transition-colors"
//                 >
//                   <div
//                     className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold
//                                         ${
//                                           activity.type === "Picking"
//                                             ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
//                                             : activity.type === "Packing"
//                                               ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
//                                               : activity.type === "Shipping"
//                                                 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
//                                                 : activity.type === "Inventory"
//                                                   ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
//                                                   : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
//                                         }`}
//                   >
//                     {getInitials(activity.user)}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm text-gray-800 dark:text-gray-200">
//                       {activity.action}
//                     </p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       {activity.user} • {activity.time}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
//               Notifications
//             </h3>
//             <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin">
//               {NOTIFICATIONS.slice(0, 5).map((notif) => (
//                 <div
//                   key={notif.id}
//                   className={`p-3 rounded-lg border ${notif.read ? "border-gray-200 dark:border-gray-700" : "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10"} transition-colors`}
//                 >
//                   <div className="flex items-start justify-between gap-2">
//                     <div>
//                       <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
//                         {notif.message}
//                       </p>
//                       <div className="flex items-center gap-2 mt-1">
//                         <span
//                           className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(notif.priority)}`}
//                         >
//                           {notif.priority}
//                         </span>
//                         <span className="text-xs text-gray-500 dark:text-gray-400">
//                           {notif.time}
//                         </span>
//                       </div>
//                     </div>
//                     {!notif.read && (
//                       <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5"></span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // 4.2 ORDERS TAB
//   const renderOrders = () => {
//     const statusTabs = [
//       "all",
//       "pending",
//       "processing",
//       "shipped",
//       "delivered",
//       "cancelled",
//       "returned",
//     ];

//     return (
//       <div className="space-y-4">
//         {/* Sub-tabs */}
//         <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-3">
//           {statusTabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveSubTab(tab)}
//               className={`px-4 py-2 text-sm font-medium rounded-lg transition-all capitalize
//                                 ${
//                                   activeSubTab === tab
//                                     ? "bg-blue-600 text-white shadow-md"
//                                     : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
//                                 }`}
//             >
//               {tab}
//               {tab === "all" && (
//                 <span className="ml-1 text-xs opacity-70">
//                   ({ORDER_DATA.length})
//                 </span>
//               )}
//               {tab !== "all" && (
//                 <span className="ml-1 text-xs opacity-70">
//                   (
//                   {
//                     ORDER_DATA.filter((o) => o.status.toLowerCase() === tab)
//                       .length
//                   }
//                   )
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>

//         {/* Orders Table */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
//                 <tr>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
//                     Order ID
//                   </th>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
//                     Customer
//                   </th>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
//                     Amount
//                   </th>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
//                     Status
//                   </th>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
//                     Payment
//                   </th>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
//                     Date
//                   </th>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                 {filteredOrders.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan="7"
//                       className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
//                     >
//                       No orders found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredOrders.map((order) => (
//                     <tr
//                       key={order.id}
//                       className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer"
//                       onClick={() => {
//                         setSelectedOrder(order);
//                         setDrawerOpen(true);
//                       }}
//                     >
//                       <td className="px-4 py-3 font-mono text-xs font-medium text-gray-900 dark:text-white">
//                         {order.id}
//                       </td>
//                       <td className="px-4 py-3">
//                         <div>
//                           <p className="font-medium text-gray-800 dark:text-gray-200">
//                             {order.customer}
//                           </p>
//                           <span
//                             className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(order.type)}`}
//                           >
//                             {order.type}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
//                         {formatCurrencyFull(order.amount)}
//                       </td>
//                       <td className="px-4 py-3">
//                         <span
//                           className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}
//                         >
//                           {order.status}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3">
//                         <span
//                           className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(order.payment)}`}
//                         >
//                           {order.payment}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">
//                         {order.date}
//                       </td>
//                       <td className="px-4 py-3">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setSelectedOrder(order);
//                             setDrawerOpen(true);
//                           }}
//                           className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
//                         >
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // 4.3 CUSTOMERS TAB
//   const renderCustomers = () => {
//     const customerTabs = ["all", "vip", "regular", "inactive"];

//     return (
//       <div className="space-y-4">
//         <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-3">
//           {customerTabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveSubTab(tab)}
//               className={`px-4 py-2 text-sm font-medium rounded-lg transition-all capitalize
//                                 ${
//                                   activeSubTab === tab
//                                     ? "bg-blue-600 text-white shadow-md"
//                                     : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
//                                 }`}
//             >
//               {tab}
//               <span className="ml-1 text-xs opacity-70">
//                 (
//                 {tab === "all"
//                   ? CUSTOMER_DATA.length
//                   : tab === "vip"
//                     ? CUSTOMER_DATA.filter((c) => c.type === "VIP").length
//                     : tab === "regular"
//                       ? CUSTOMER_DATA.filter((c) => c.type === "Regular").length
//                       : CUSTOMER_DATA.filter((c) => c.status === "Inactive")
//                           .length}
//                 )
//               </span>
//             </button>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredCustomers.map((customer) => (
//             <div
//               key={customer.id}
//               onClick={() => {
//                 setSelectedCustomer(customer);
//                 setModalOpen(true);
//                 setModalContent("customer");
//               }}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all cursor-pointer"
//             >
//               <div className="flex items-start gap-4">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
//                   {getInitials(customer.name)}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2">
//                     <p className="font-semibold text-gray-900 dark:text-white truncate">
//                       {customer.name}
//                     </p>
//                     <span
//                       className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(customer.type)}`}
//                     >
//                       {customer.type}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     {customer.phone}
//                   </p>
//                   <div className="flex items-center gap-3 mt-2 text-xs">
//                     <span className="text-gray-600 dark:text-gray-400">
//                       Orders:{" "}
//                       <strong className="text-gray-900 dark:text-white">
//                         {customer.orders}
//                       </strong>
//                     </span>
//                     <span className="text-gray-600 dark:text-gray-400">
//                       Revenue:{" "}
//                       <strong className="text-green-600 dark:text-green-400">
//                         {formatCurrency(customer.revenue)}
//                       </strong>
//                     </span>
//                     {customer.outstanding > 0 && (
//                       <span className="text-red-600 dark:text-red-400">
//                         Due: {formatCurrency(customer.outstanding)}
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex items-center gap-2 mt-1">
//                     <span
//                       className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(customer.status)}`}
//                     >
//                       {customer.status}
//                     </span>
//                     <span className="text-xs text-gray-500 dark:text-gray-400">
//                       ⭐ {customer.rating}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // 4.4 SUPPLIERS TAB
//   const renderSuppliers = () => {
//     return (
//       <div className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredSuppliers.map((supplier) => (
//             <div
//               key={supplier.id}
//               onClick={() => {
//                 setSelectedSupplier(supplier);
//                 setModalOpen(true);
//                 setModalContent("supplier");
//               }}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all cursor-pointer"
//             >
//               <div className="flex items-start gap-4">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
//                   {getInitials(supplier.name)}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="font-semibold text-gray-900 dark:text-white truncate">
//                     {supplier.name}
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     {supplier.phone}
//                   </p>
//                   <div className="flex items-center gap-3 mt-2 text-xs flex-wrap">
//                     <span className="text-gray-600 dark:text-gray-400">
//                       Orders:{" "}
//                       <strong className="text-gray-900 dark:text-white">
//                         {supplier.purchaseOrders}
//                       </strong>
//                     </span>
//                     <span className="text-gray-600 dark:text-gray-400">
//                       Rating:{" "}
//                       <strong className="text-yellow-600 dark:text-yellow-400">
//                         ⭐{supplier.rating}
//                       </strong>
//                     </span>
//                     <span
//                       className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(supplier.status)}`}
//                     >
//                       {supplier.status}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-3 mt-1 text-xs">
//                     <span className="text-gray-500 dark:text-gray-400">
//                       Delivery: {supplier.avgDelivery} days
//                     </span>
//                     {supplier.outstanding > 0 && (
//                       <span className="text-red-600 dark:text-red-400">
//                         Due: {formatCurrency(supplier.outstanding)}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // 4.5 PRODUCTS TAB
//   const renderProducts = () => {
//     return (
//       <div className="space-y-4">
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
//                 <tr>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
//                     Product
//                   </th>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
//                     SKU
//                   </th>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
//                     Category
//                   </th>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
//                     Warehouse
//                   </th>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
//                     Stock
//                   </th>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
//                     Price
//                   </th>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                 {filteredProducts.map((product) => (
//                   <tr
//                     key={product.id}
//                     className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer"
//                     onClick={() => {
//                       setSelectedProduct(product);
//                       setModalOpen(true);
//                       setModalContent("product");
//                     }}
//                   >
//                     <td className="px-4 py-3">
//                       <div>
//                         <p className="font-medium text-gray-800 dark:text-gray-200">
//                           {product.name}
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">
//                           {product.brand}
//                         </p>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-300">
//                       {product.sku}
//                     </td>
//                     <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">
//                       {product.category}
//                     </td>
//                     <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">
//                       {product.warehouse}
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-2">
//                         <span className="font-medium text-gray-900 dark:text-white">
//                           {product.available}
//                         </span>
//                         <span className="text-xs text-gray-500 dark:text-gray-400">
//                           / {product.maxStock}
//                         </span>
//                         {product.available < product.minStock && (
//                           <span className="text-xs text-red-600 dark:text-red-400 font-medium">
//                             ⚠️ Low
//                           </span>
//                         )}
//                       </div>
//                       <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
//                         <div
//                           className="h-1.5 bg-blue-600 rounded-full"
//                           style={{
//                             width: `${(product.available / product.maxStock) * 100}%`,
//                           }}
//                         ></div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div>
//                         <p className="font-medium text-green-600 dark:text-green-400">
//                           {formatCurrencyFull(product.sellingPrice)}
//                         </p>
//                         <p className="text-xs text-gray-400 line-through">
//                           {formatCurrencyFull(product.mrp)}
//                         </p>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3">
//                       <span
//                         className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(product.status)}`}
//                       >
//                         {product.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // 4.6 INVENTORY TAB
//   const renderInventory = () => {
//     const totalStock = PRODUCT_DATA.reduce((sum, p) => sum + p.stock, 0);
//     const totalReserved = PRODUCT_DATA.reduce((sum, p) => sum + p.reserved, 0);
//     const totalAvailable = PRODUCT_DATA.reduce(
//       (sum, p) => sum + p.available,
//       0,
//     );

//     return (
//       <div className="space-y-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Total Stock
//             </p>
//             <p className="text-2xl font-bold text-gray-900 dark:text-white">
//               {totalStock}
//             </p>
//           </div>
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Reserved Stock
//             </p>
//             <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
//               {totalReserved}
//             </p>
//           </div>
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Available Stock
//             </p>
//             <p className="text-2xl font-bold text-green-600 dark:text-green-400">
//               {totalAvailable}
//             </p>
//           </div>
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Inventory Value
//             </p>
//             <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
//               {formatCurrency(KPI_DATA.inventoryValue)}
//             </p>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//           <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
//             Stock Levels by Product
//           </h3>
//           <div className="space-y-3">
//             {PRODUCT_DATA.map((product) => (
//               <div key={product.id}>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-700 dark:text-gray-300">
//                     {product.name}
//                   </span>
//                   <span className="text-gray-600 dark:text-gray-400">
//                     {product.available} / {product.maxStock}
//                   </span>
//                 </div>
//                 <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
//                   <div
//                     className={`h-2 rounded-full transition-all ${product.available < product.minStock ? "bg-red-500" : product.available < product.maxStock * 0.3 ? "bg-yellow-500" : "bg-green-500"}`}
//                     style={{
//                       width: `${(product.available / product.maxStock) * 100}%`,
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // 4.7 WAREHOUSES TAB
//   const renderWarehouses = () => {
//     return (
//       <div className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {WAREHOUSE_DATA.map((wh) => (
//             <div
//               key={wh.id}
//               onClick={() => {
//                 setSelectedWarehouse(wh);
//                 setModalOpen(true);
//                 setModalContent("warehouse");
//               }}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all cursor-pointer"
//             >
//               <div className="flex items-start justify-between">
//                 <div>
//                   <p className="font-semibold text-gray-900 dark:text-white">
//                     {wh.name}
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     {wh.code}
//                   </p>
//                 </div>
//                 <span
//                   className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(wh.status)}`}
//                 >
//                   {wh.status}
//                 </span>
//               </div>
//               <div className="mt-3 space-y-2 text-sm">
//                 <p className="text-gray-600 dark:text-gray-300">
//                   Manager:{" "}
//                   <span className="text-gray-900 dark:text-white font-medium">
//                     {wh.manager}
//                   </span>
//                 </p>
//                 <p className="text-gray-600 dark:text-gray-300">
//                   Capacity:{" "}
//                   <span className="text-gray-900 dark:text-white font-medium">
//                     {wh.occupied}%
//                   </span>
//                 </p>
//                 <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
//                   <div
//                     className={`h-2 rounded-full transition-all ${wh.occupied > 80 ? "bg-red-500" : wh.occupied > 60 ? "bg-yellow-500" : "bg-green-500"}`}
//                     style={{ width: `${wh.occupied}%` }}
//                   ></div>
//                 </div>
//                 <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
//                   <span>Products: {wh.products}</span>
//                   <span>Orders: {wh.orders}</span>
//                   <span>{formatCurrency(wh.revenue)}</span>
//                 </div>
//               </div>
//               <div className="mt-2 text-xs text-gray-400 truncate">
//                 {wh.address}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Map visualization */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//           <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
//             Warehouse Locations
//           </h3>
//           <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="text-center text-gray-500 dark:text-gray-400">
//                 <div className="text-6xl mb-2">🗺️</div>
//                 <p>Google Maps Integration</p>
//                 <p className="text-sm">6 warehouses across India</p>
//               </div>
//             </div>
//             {/* Simulated map markers */}
//             {WAREHOUSE_DATA.map((wh, idx) => (
//               <div
//                 key={wh.id}
//                 className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer"
//                 style={{
//                   left: `${15 + idx * 14}%`,
//                   top: `${20 + (idx % 3) * 25}%`,
//                   backgroundColor:
//                     wh.status === "Active"
//                       ? "#10b981"
//                       : wh.status === "Under Construction"
//                         ? "#3b82f6"
//                         : "#ef4444",
//                   transform: "translate(-50%, -50%)",
//                 }}
//                 title={wh.name}
//               >
//                 <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 text-xs bg-gray-900 text-white px-2 py-0.5 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
//                   {wh.name}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // 4.8 ANALYTICS TAB
//   const renderAnalytics = () => {
//     return (
//       <div className="space-y-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
//               Revenue, Expense & Profit Trend
//             </h3>
//             <ResponsiveContainer width="100%" height={280}>
//               <AreaChart data={REVENUE_DATA}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                 <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
//                 <YAxis
//                   stroke="#6b7280"
//                   fontSize={11}
//                   tickFormatter={(v) => `₹${v / 1000}K`}
//                 />
//                 <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
//                 <Legend />
//                 <Area
//                   type="monotone"
//                   dataKey="revenue"
//                   stackId="1"
//                   stroke="#3b82f6"
//                   fill="#3b82f6"
//                   fillOpacity={0.3}
//                   name="Revenue"
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="expense"
//                   stackId="1"
//                   stroke="#ef4444"
//                   fill="#ef4444"
//                   fillOpacity={0.3}
//                   name="Expense"
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="profit"
//                   stroke="#10b981"
//                   name="Profit"
//                   strokeWidth={3}
//                   dot={{ r: 4 }}
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
//               Customer Analytics
//             </h3>
//             <ResponsiveContainer width="100%" height={280}>
//               <BarChart data={CUSTOMER_ANALYTICS_DATA}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                 <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
//                 <YAxis
//                   stroke="#6b7280"
//                   fontSize={11}
//                   tickFormatter={(v) => `₹${v / 1000}K`}
//                 />
//                 <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
//                 <Legend />
//                 <Bar
//                   dataKey="revenue"
//                   fill="#8b5cf6"
//                   name="Revenue"
//                   radius={[4, 4, 0, 0]}
//                   barSize={30}
//                 />
//                 <Bar
//                   dataKey="orders"
//                   fill="#f59e0b"
//                   name="Orders"
//                   radius={[4, 4, 0, 0]}
//                   barSize={30}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
//               Warehouse Performance
//             </h3>
//             <ResponsiveContainer width="100%" height={220}>
//               <BarChart data={WAREHOUSE_DATA}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                 <XAxis
//                   dataKey="name"
//                   stroke="#6b7280"
//                   fontSize={10}
//                   tick={{ fontSize: 10 }}
//                 />
//                 <YAxis
//                   stroke="#6b7280"
//                   fontSize={11}
//                   tickFormatter={(v) => `₹${v / 1000}K`}
//                 />
//                 <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
//                 <Legend />
//                 <Bar
//                   dataKey="revenue"
//                   fill="#3b82f6"
//                   name="Revenue"
//                   radius={[4, 4, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
//               Top Products Performance
//             </h3>
//             <ResponsiveContainer width="100%" height={220}>
//               <BarChart data={TOP_PRODUCTS_DATA}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                 <XAxis
//                   dataKey="name"
//                   stroke="#6b7280"
//                   fontSize={10}
//                   tick={{ fontSize: 10 }}
//                 />
//                 <YAxis stroke="#6b7280" fontSize={11} />
//                 <Tooltip formatter={(v) => `${v} units`} />
//                 <Legend />
//                 <Bar
//                   dataKey="sales"
//                   fill="#10b981"
//                   name="Sales"
//                   radius={[4, 4, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // 4.9 EXPENSES TAB
//   const renderExpenses = () => {
//     return (
//       <div className="space-y-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Total Expenses
//             </p>
//             <p className="text-2xl font-bold text-red-600 dark:text-red-400">
//               {formatCurrency(KPI_DATA.todayExpense * 30)}
//             </p>
//           </div>
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Today's Expense
//             </p>
//             <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
//               {formatCurrency(KPI_DATA.todayExpense)}
//             </p>
//           </div>
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Avg Daily Expense
//             </p>
//             <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
//               {formatCurrency(KPI_DATA.todayExpense)}
//             </p>
//           </div>
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Monthly Expense
//             </p>
//             <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
//               {formatCurrency(KPI_DATA.todayExpense * 30)}
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
//               Expense Breakdown
//             </h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={EXPENSE_BREAKDOWN}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={70}
//                   outerRadius={110}
//                   paddingAngle={2}
//                   dataKey="value"
//                   label={({ name, percent }) =>
//                     `${name} ${(percent * 100).toFixed(0)}%`
//                   }
//                   labelLine={{ stroke: "#6b7280" }}
//                 >
//                   {EXPENSE_BREAKDOWN.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(v) => `${v}%`} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//             <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
//               Monthly Expense Trend
//             </h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={REVENUE_DATA}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                 <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
//                 <YAxis
//                   stroke="#6b7280"
//                   fontSize={11}
//                   tickFormatter={(v) => `₹${v / 1000}K`}
//                 />
//                 <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="expense"
//                   stroke="#ef4444"
//                   name="Expense"
//                   strokeWidth={3}
//                   dot={{ r: 4 }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="revenue"
//                   stroke="#3b82f6"
//                   name="Revenue"
//                   strokeWidth={2}
//                   dot={{ r: 3 }}
//                   strokeDasharray="5 5"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // 4.10 REPORTS TAB
//   const renderReports = () => {
//     const reports = [
//       {
//         name: "Inventory Report",
//         icon: "📋",
//         desc: "Complete inventory status with stock levels",
//         color: "bg-blue-500",
//       },
//       {
//         name: "Warehouse Report",
//         icon: "🏚️",
//         desc: "Warehouse capacity and utilization metrics",
//         color: "bg-emerald-500",
//       },
//       {
//         name: "Customer Report",
//         icon: "👤",
//         desc: "Customer analytics and purchase history",
//         color: "bg-purple-500",
//       },
//       {
//         name: "Supplier Report",
//         icon: "🏭",
//         desc: "Supplier performance and purchase trends",
//         color: "bg-orange-500",
//       },
//       {
//         name: "Revenue Report",
//         icon: "💰",
//         desc: "Revenue breakdown by product and region",
//         color: "bg-green-500",
//       },
//       {
//         name: "Expense Report",
//         icon: "💳",
//         desc: "Detailed expense analysis and trends",
//         color: "bg-red-500",
//       },
//       {
//         name: "Profit Report",
//         icon: "📈",
//         desc: "Profit analysis by order and customer",
//         color: "bg-indigo-500",
//       },
//       {
//         name: "Sales Report",
//         icon: "🛒",
//         desc: "Sales performance and order analytics",
//         color: "bg-pink-500",
//       },
//       {
//         name: "Return Report",
//         icon: "↩️",
//         desc: "Return analysis and refund metrics",
//         color: "bg-rose-500",
//       },
//       {
//         name: "Employee Report",
//         icon: "👨‍💼",
//         desc: "Employee performance and productivity",
//         color: "bg-cyan-500",
//       },
//     ];

//     return (
//       <div className="space-y-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//           {reports.map((report, idx) => (
//             <div
//               key={idx}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all cursor-pointer"
//             >
//               <div className="flex items-start gap-3">
//                 <div
//                   className={`${report.color} w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0`}
//                 >
//                   {report.icon}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900 dark:text-white text-sm">
//                     {report.name}
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                     {report.desc}
//                   </p>
//                   <button className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline">
//                     Generate Report →
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // 4.11 SETTINGS TAB
//   const renderSettings = () => {
//     return (
//       <div className="space-y-6 max-w-3xl">
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Appearance
//           </h3>
//           <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
//             <div>
//               <p className="font-medium text-gray-800 dark:text-gray-200">
//                 Dark Mode
//               </p>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 Toggle between light and dark theme
//               </p>
//             </div>
//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className={`w-12 h-7 rounded-full transition-all ${darkMode ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"} relative flex-shrink-0`}
//             >
//               <div
//                 className={`w-5 h-5 rounded-full bg-white shadow-md transition-all absolute top-1 ${darkMode ? "right-1" : "left-1"}`}
//               ></div>
//             </button>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             General Settings
//           </h3>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
//               <div>
//                 <p className="font-medium text-gray-800 dark:text-gray-200">
//                   Company Name
//                 </p>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Your Business Name
//                 </p>
//               </div>
//               <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
//                 Edit
//               </button>
//             </div>
//             <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
//               <div>
//                 <p className="font-medium text-gray-800 dark:text-gray-200">
//                   GST Number
//                 </p>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   27AABCD1234D1ZP
//                 </p>
//               </div>
//               <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
//                 Edit
//               </button>
//             </div>
//             <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
//               <div>
//                 <p className="font-medium text-gray-800 dark:text-gray-200">
//                   Default Currency
//                 </p>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Indian Rupee (₹)
//                 </p>
//               </div>
//               <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
//                 Change
//               </button>
//             </div>
//             <div className="flex items-center justify-between py-2">
//               <div>
//                 <p className="font-medium text-gray-800 dark:text-gray-200">
//                   Time Zone
//                 </p>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Asia/Kolkata (UTC+5:30)
//                 </p>
//               </div>
//               <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
//                 Change
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Security
//           </h3>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
//               <div>
//                 <p className="font-medium text-gray-800 dark:text-gray-200">
//                   Two-Factor Authentication
//                 </p>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Add an extra layer of security
//                 </p>
//               </div>
//               <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
//                 Enable
//               </button>
//             </div>
//             <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
//               <div>
//                 <p className="font-medium text-gray-800 dark:text-gray-200">
//                   Session Timeout
//                 </p>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Auto logout after inactivity
//                 </p>
//               </div>
//               <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
//                 30 mins
//               </button>
//             </div>
//             <div className="flex items-center justify-between py-2">
//               <div>
//                 <p className="font-medium text-gray-800 dark:text-gray-200">
//                   Audit Logs
//                 </p>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Track all system activities
//                 </p>
//               </div>
//               <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
//                 View Logs
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ============================================================
//   // 5. DRAWER COMPONENT - Order Detail
//   // ============================================================
//   const renderOrderDrawer = () => {
//     if (!selectedOrder) return null;

//     const order = selectedOrder;
//     const timelineItems = [
//       {
//         label: "Order Placed",
//         time: order.date,
//         status: "completed",
//         icon: "📝",
//       },
//       {
//         label: "Payment Verified",
//         time: order.date,
//         status: order.payment === "Paid" ? "completed" : "pending",
//         icon: "💳",
//       },
//       {
//         label: "Inventory Reserved",
//         time: order.date,
//         status: "completed",
//         icon: "📦",
//       },
//       {
//         label: "Picked",
//         time: order.date,
//         status:
//           order.status === "Processing" ||
//           order.status === "Shipped" ||
//           order.status === "Delivered"
//             ? "completed"
//             : "pending",
//         icon: "🔄",
//       },
//       {
//         label: "Packed",
//         time: order.date,
//         status:
//           order.status === "Shipped" || order.status === "Delivered"
//             ? "completed"
//             : "pending",
//         icon: "📦",
//       },
//       {
//         label: "Shipped",
//         time: order.expected,
//         status:
//           order.status === "Shipped" || order.status === "Delivered"
//             ? "completed"
//             : "pending",
//         icon: "🚚",
//       },
//       {
//         label: "Delivered",
//         time: order.expected,
//         status:
//           order.status === "Delivered"
//             ? "completed"
//             : order.status === "Returned"
//               ? "cancelled"
//               : "pending",
//         icon: "✅",
//       },
//     ];

//     return (
//       <div
//         className="fixed inset-y-0 right-0 w-full sm:w-[480px] md:w-[560px] bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto border-l border-gray-200 dark:border-gray-700"
//         style={{ transform: drawerOpen ? "translateX(0)" : "translateX(100%)" }}
//       >
//         {/* Drawer Header */}
//         <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
//           <div>
//             <h2 className="text-lg font-bold text-gray-900 dark:text-white">
//               Order Details
//             </h2>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               {order.id} • {order.invoice}
//             </p>
//           </div>
//           <button
//             onClick={() => {
//               setDrawerOpen(false);
//               setSelectedOrder(null);
//             }}
//             className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="p-5 space-y-6">
//           {/* Order Status */}
//           <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
//             <span
//               className={`text-sm font-medium px-3 py-1.5 rounded-full ${getStatusColor(order.status)}`}
//             >
//               {order.status}
//             </span>
//             <span className="text-sm text-gray-500 dark:text-gray-400">
//               {order.date}
//             </span>
//             <span className="ml-auto text-sm text-gray-600 dark:text-gray-300">
//               {formatCurrencyFull(order.amount)}
//             </span>
//           </div>

//           {/* Customer Info */}
//           <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
//             <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//               Customer
//             </h3>
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
//                 {getInitials(order.customer)}
//               </div>
//               <div>
//                 <p className="font-medium text-gray-900 dark:text-white">
//                   {order.customer}
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   {order.type} • {order.payment}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Timeline */}
//           <div>
//             <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
//               Order Timeline
//             </h3>
//             <div className="space-y-0">
//               {timelineItems.map((item, idx) => (
//                 <div key={idx} className="flex items-start gap-3">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
//                                             ${
//                                               item.status === "completed"
//                                                 ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
//                                                 : item.status === "cancelled"
//                                                   ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
//                                                   : "bg-gray-100 text-gray-400 dark:bg-gray-700/50 dark:text-gray-500"
//                                             }`}
//                     >
//                       {item.icon}
//                     </div>
//                     {idx < timelineItems.length - 1 && (
//                       <div
//                         className={`w-0.5 h-8 ${item.status === "completed" ? "bg-green-400 dark:bg-green-600" : "bg-gray-300 dark:bg-gray-600"}`}
//                       ></div>
//                     )}
//                   </div>
//                   <div className="pt-1 pb-4">
//                     <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
//                       {item.label}
//                     </p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       {item.time}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Financial Summary */}
//           <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800/30">
//             <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//               Financial Summary
//             </h3>
//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   Revenue
//                 </p>
//                 <p className="text-lg font-bold text-gray-900 dark:text-white">
//                   {formatCurrencyFull(order.amount)}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   Expense
//                 </p>
//                 <p className="text-lg font-bold text-red-600 dark:text-red-400">
//                   {formatCurrencyFull(order.amount - order.profit)}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   Profit
//                 </p>
//                 <p
//                   className={`text-lg font-bold ${order.profit > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
//                 >
//                   {formatCurrencyFull(order.profit)}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   Margin
//                 </p>
//                 <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
//                   {((order.profit / order.amount) * 100).toFixed(1)}%
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Shipping Info */}
//           <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
//             <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//               Shipping
//             </h3>
//             <div className="grid grid-cols-2 gap-2 text-sm">
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   Courier
//                 </p>
//                 <p className="font-medium text-gray-800 dark:text-gray-200">
//                   {order.courier}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   Tracking
//                 </p>
//                 <p className="font-medium text-gray-800 dark:text-gray-200 font-mono text-xs">
//                   {order.tracking}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   Warehouse
//                 </p>
//                 <p className="font-medium text-gray-800 dark:text-gray-200">
//                   {order.warehouse}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   Employee
//                 </p>
//                 <p className="font-medium text-gray-800 dark:text-gray-200">
//                   {order.employee}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Products */}
//           <div>
//             <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//               Products
//             </h3>
//             <div className="space-y-2">
//               {PRODUCT_DATA.slice(0, order.products).map((p, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
//                 >
//                   <div>
//                     <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
//                       {p.name}
//                     </p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       {p.sku} × {Math.floor(order.qty / order.products) || 1}
//                     </p>
//                   </div>
//                   <p className="text-sm font-semibold text-gray-900 dark:text-white">
//                     {formatCurrencyFull(p.sellingPrice)}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
//             <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors">
//               📄 Invoice
//             </button>
//             <button className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2.5 rounded-lg transition-colors">
//               🖨️ Print
//             </button>
//             <button className="px-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors">
//               📧
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ============================================================
//   // 6. MODAL COMPONENT
//   // ============================================================
//   const renderModal = () => {
//     if (!modalOpen || !modalContent) return null;

//     let content = null;

//     if (modalContent === "customer" && selectedCustomer) {
//       const c = selectedCustomer;
//       content = (
//         <div className="space-y-4">
//           <div className="flex items-start gap-4">
//             <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-2xl flex-shrink-0">
//               {getInitials(c.name)}
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                 {c.name}
//               </h2>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 <span
//                   className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(c.type)}`}
//                 >
//                   {c.type}
//                 </span>
//                 <span
//                   className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(c.status)}`}
//                 >
//                   {c.status}
//                 </span>
//                 <span className="text-xs text-gray-500 dark:text-gray-400">
//                   ⭐ {c.rating}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-3 text-sm">
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">Phone</span>
//               <br />
//               <span className="text-gray-900 dark:text-white font-medium">
//                 {c.phone}
//               </span>
//             </div>
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">Email</span>
//               <br />
//               <span className="text-gray-900 dark:text-white font-medium">
//                 {c.email}
//               </span>
//             </div>
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">GST</span>
//               <br />
//               <span className="text-gray-900 dark:text-white font-mono text-xs">
//                 {c.gst}
//               </span>
//             </div>
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">
//                 Credit Limit
//               </span>
//               <br />
//               <span className="text-gray-900 dark:text-white font-medium">
//                 {formatCurrencyFull(c.creditLimit)}
//               </span>
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">Orders</p>
//               <p className="text-lg font-bold text-gray-900 dark:text-white">
//                 {c.orders}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Revenue
//               </p>
//               <p className="text-lg font-bold text-green-600 dark:text-green-400">
//                 {formatCurrency(c.revenue)}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Outstanding
//               </p>
//               <p
//                 className={`text-lg font-bold ${c.outstanding > 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
//               >
//                 {formatCurrency(c.outstanding)}
//               </p>
//             </div>
//           </div>

//           <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
//             <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
//             <p className="text-sm text-gray-800 dark:text-gray-200 mt-1">
//               {c.address}
//             </p>
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors">
//               View Orders
//             </button>
//             <button className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2.5 rounded-lg transition-colors">
//               View Ledger
//             </button>
//           </div>
//         </div>
//       );
//     } else if (modalContent === "supplier" && selectedSupplier) {
//       const s = selectedSupplier;
//       content = (
//         <div className="space-y-4">
//           <div className="flex items-start gap-4">
//             <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-semibold text-2xl flex-shrink-0">
//               {getInitials(s.name)}
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                 {s.name}
//               </h2>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 <span
//                   className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(s.status)}`}
//                 >
//                   {s.status}
//                 </span>
//                 <span className="text-xs text-yellow-600 dark:text-yellow-400">
//                   ⭐ {s.rating}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-3 text-sm">
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">Phone</span>
//               <br />
//               <span className="text-gray-900 dark:text-white font-medium">
//                 {s.phone}
//               </span>
//             </div>
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">Email</span>
//               <br />
//               <span className="text-gray-900 dark:text-white font-medium">
//                 {s.email}
//               </span>
//             </div>
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">GST</span>
//               <br />
//               <span className="text-gray-900 dark:text-white font-mono text-xs">
//                 {s.gst}
//               </span>
//             </div>
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">
//                 Warehouse
//               </span>
//               <br />
//               <span className="text-gray-900 dark:text-white font-medium">
//                 {s.warehouse}
//               </span>
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">POs</p>
//               <p className="text-lg font-bold text-gray-900 dark:text-white">
//                 {s.purchaseOrders}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Products
//               </p>
//               <p className="text-lg font-bold text-gray-900 dark:text-white">
//                 {s.products}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Outstanding
//               </p>
//               <p
//                 className={`text-lg font-bold ${s.outstanding > 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
//               >
//                 {formatCurrency(s.outstanding)}
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-3 text-sm bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">
//                 Delivery Performance
//               </span>
//               <br />
//               <span className="text-gray-900 dark:text-white font-medium">
//                 {s.deliveryPerf}/5
//               </span>
//             </div>
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">
//                 Avg Delivery
//               </span>
//               <br />
//               <span className="text-gray-900 dark:text-white font-medium">
//                 {s.avgDelivery} days
//               </span>
//             </div>
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors">
//               View POs
//             </button>
//             <button className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2.5 rounded-lg transition-colors">
//               Contact
//             </button>
//           </div>
//         </div>
//       );
//     } else if (modalContent === "product" && selectedProduct) {
//       const p = selectedProduct;
//       content = (
//         <div className="space-y-4">
//           <div>
//             <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//               {p.name}
//             </h2>
//             <div className="flex flex-wrap gap-2 mt-1">
//               <span
//                 className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(p.status)}`}
//               >
//                 {p.status}
//               </span>
//               <span className="text-xs text-gray-500 dark:text-gray-400">
//                 {p.brand}
//               </span>
//               <span className="text-xs text-gray-500 dark:text-gray-400">
//                 {p.category}
//               </span>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-3 text-sm">
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">SKU</span>
//               <br />
//               <span className="text-gray-900 dark:text-white font-mono text-xs">
//                 {p.sku}
//               </span>
//             </div>
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">
//                 Warehouse
//               </span>
//               <br />
//               <span className="text-gray-900 dark:text-white font-medium">
//                 {p.warehouse}
//               </span>
//             </div>
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">Rack</span>
//               <br />
//               <span className="text-gray-900 dark:text-white font-medium">
//                 {p.rack}
//               </span>
//             </div>
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">
//                 Shelf/Bin
//               </span>
//               <br />
//               <span className="text-gray-900 dark:text-white font-medium">
//                 {p.shelf} / {p.bin}
//               </span>
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">Stock</p>
//               <p className="text-lg font-bold text-gray-900 dark:text-white">
//                 {p.stock}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Reserved
//               </p>
//               <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
//                 {p.reserved}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Available
//               </p>
//               <p
//                 className={`text-lg font-bold ${p.available < p.minStock ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
//               >
//                 {p.available}
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Purchase Price
//               </p>
//               <p className="text-lg font-bold text-gray-900 dark:text-white">
//                 {formatCurrencyFull(p.purchasePrice)}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Selling Price
//               </p>
//               <p className="text-lg font-bold text-green-600 dark:text-green-400">
//                 {formatCurrencyFull(p.sellingPrice)}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">MRP</p>
//               <p className="text-lg font-bold text-gray-400 line-through">
//                 {formatCurrencyFull(p.mrp)}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors">
//               Edit Stock
//             </button>
//             <button className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2.5 rounded-lg transition-colors">
//               View History
//             </button>
//           </div>
//         </div>
//       );
//     } else if (modalContent === "warehouse" && selectedWarehouse) {
//       const w = selectedWarehouse;
//       content = (
//         <div className="space-y-4">
//           <div className="flex items-start justify-between">
//             <div>
//               <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                 {w.name}
//               </h2>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 {w.code}
//               </p>
//             </div>
//             <span
//               className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(w.status)}`}
//             >
//               {w.status}
//             </span>
//           </div>

//           <div className="grid grid-cols-2 gap-3 text-sm">
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">Manager</span>
//               <br />
//               <span className="text-gray-900 dark:text-white font-medium">
//                 {w.manager}
//               </span>
//             </div>
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">Address</span>
//               <br />
//               <span className="text-gray-900 dark:text-white text-xs">
//                 {w.address}
//               </span>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600 dark:text-gray-300">Capacity</span>
//               <span className="text-gray-900 dark:text-white font-medium">
//                 {w.occupied}%
//               </span>
//             </div>
//             <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
//               <div
//                 className={`h-3 rounded-full transition-all ${w.occupied > 80 ? "bg-red-500" : w.occupied > 60 ? "bg-yellow-500" : "bg-green-500"}`}
//                 style={{ width: `${w.occupied}%` }}
//               ></div>
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Products
//               </p>
//               <p className="text-lg font-bold text-gray-900 dark:text-white">
//                 {w.products}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">Orders</p>
//               <p className="text-lg font-bold text-gray-900 dark:text-white">
//                 {w.orders}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Revenue
//               </p>
//               <p className="text-lg font-bold text-green-600 dark:text-green-400">
//                 {formatCurrency(w.revenue)}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors">
//               View Layout
//             </button>
//             <button className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2.5 rounded-lg transition-colors">
//               Manage Stock
//             </button>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div
//         className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
//         onClick={() => {
//           setModalOpen(false);
//           setSelectedCustomer(null);
//           setSelectedSupplier(null);
//           setSelectedProduct(null);
//           setSelectedWarehouse(null);
//         }}
//       >
//         <div
//           className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="flex justify-end">
//             <button
//               onClick={() => {
//                 setModalOpen(false);
//                 setSelectedCustomer(null);
//                 setSelectedSupplier(null);
//                 setSelectedProduct(null);
//                 setSelectedWarehouse(null);
//               }}
//               className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-500 dark:text-gray-400"
//             >
//               ✕
//             </button>
//           </div>
//           {content}
//         </div>
//       </div>
//     );
//   };

//   // ============================================================
//   // 7. NOTIFICATION PANEL
//   // ============================================================
//   const renderNotificationPanel = () => {
//     return (
//       <div
//         className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-gray-700 ${notificationPanel ? "translate-x-0" : "translate-x-full"}`}
//       >
//         <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
//           <h2 className="text-lg font-bold text-gray-900 dark:text-white">
//             Notifications
//           </h2>
//           <button
//             onClick={() => setNotificationPanel(false)}
//             className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
//           >
//             ✕
//           </button>
//         </div>
//         <div className="p-4 space-y-3 overflow-y-auto max-h-[calc(100vh-80px)]">
//           {NOTIFICATIONS.map((notif) => (
//             <div
//               key={notif.id}
//               className={`p-4 rounded-xl border ${notif.read ? "border-gray-200 dark:border-gray-700" : "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10"} transition-colors`}
//             >
//               <div className="flex items-start gap-3">
//                 <div
//                   className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notif.priority === "High" ? "bg-red-500" : notif.priority === "Medium" ? "bg-yellow-500" : "bg-blue-500"}`}
//                 ></div>
//                 <div>
//                   <p className="text-sm text-gray-800 dark:text-gray-200">
//                     {notif.message}
//                   </p>
//                   <div className="flex items-center gap-2 mt-1.5">
//                     <span
//                       className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(notif.type)}`}
//                     >
//                       {notif.type}
//                     </span>
//                     <span className="text-xs text-gray-500 dark:text-gray-400">
//                       {notif.time}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // ============================================================
//   // 8. MAIN RENDER
//   // ============================================================
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-200">
//       {/* Notification Panel */}
//       {renderNotificationPanel()}

//       {/* Order Drawer */}
//       {renderOrderDrawer()}

//       {/* Modal */}
//       {renderModal()}

//       {/* Main Layout */}
//       <div className="flex h-screen overflow-hidden">
//         {/* Sidebar */}
//         <div
//           className={`${sidebarCollapsed ? "w-16" : "w-64"} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-shrink-0 transition-all duration-300 flex flex-col h-full overflow-y-auto`}
//         >
//           {/* Logo */}
//           <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
//             <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
//               OMS
//             </div>
//             {!sidebarCollapsed && (
//               <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 OrderFlow
//               </span>
//             )}
//           </div>

//           {/* Menu */}
//           <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
//             {menuItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => {
//                   setActiveTab(item.id);
//                   setActiveSubTab("all");
//                   setSearchQuery("");
//                 }}
//                 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium
//                                     ${
//                                       activeTab === item.id
//                                         ? "bg-blue-600 text-white shadow-md"
//                                         : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
//                                     }`}
//               >
//                 <span className="text-lg flex-shrink-0">{item.icon}</span>
//                 {!sidebarCollapsed && <span>{item.label}</span>}
//               </button>
//             ))}
//           </nav>

//           {/* Bottom */}
//           <div className="p-3 border-t border-gray-200 dark:border-gray-800">
//             <button
//               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//               className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
//             >
//               {sidebarCollapsed ? "➡️" : "⬅️ Collapse"}
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col overflow-hidden">
//           {/* Header */}
//           <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between gap-4 flex-shrink-0">
//             <div className="flex items-center gap-4 flex-1 min-w-0">
//               <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
//                 {menuItems.find((m) => m.id === activeTab)?.label ||
//                   "Dashboard"}
//               </h1>
//               <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:inline">
//                 / {activeTab}
//               </span>
//             </div>

//             <div className="flex items-center gap-3 flex-shrink-0">
//               {/* Search */}
//               <div className="relative hidden md:block">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-48 lg:w-64 pl-9 pr-4 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 border border-transparent rounded-lg focus:border-blue-500 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
//                 />
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                   🔍
//                 </span>
//               </div>

//               {/* Notifications */}
//               <button
//                 onClick={() => setNotificationPanel(!notificationPanel)}
//                 className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
//               >
//                 🔔
//                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>

//               {/* Theme Toggle */}
//               <button
//                 onClick={() => setDarkMode(!darkMode)}
//                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-lg"
//               >
//                 {darkMode ? "☀️" : "🌙"}
//               </button>

//               {/* Profile */}
//               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
//                 A
//               </div>
//             </div>
//           </header>

//           {/* Content */}
//           <main className="flex-1 overflow-y-auto p-6">
//             <div className="max-w-7xl mx-auto">
//               {/* Render active tab */}
//               {activeTab === "overview" && renderOverview()}
//               {activeTab === "orders" && renderOrders()}
//               {activeTab === "customers" && renderCustomers()}
//               {activeTab === "suppliers" && renderSuppliers()}
//               {activeTab === "products" && renderProducts()}
//               {activeTab === "inventory" && renderInventory()}
//               {activeTab === "warehouses" && renderWarehouses()}
//               {activeTab === "analytics" && renderAnalytics()}
//               {activeTab === "expenses" && renderExpenses()}
//               {activeTab === "reports" && renderReports()}
//               {activeTab === "settings" && renderSettings()}
//             </div>
//           </main>
//         </div>
//       </div>

//       {/* Global styles for scrollbar */}
//       <style jsx>{`
//         .scrollbar-thin::-webkit-scrollbar {
//           width: 4px;
//         }
//         .scrollbar-thin::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .scrollbar-thin::-webkit-scrollbar-thumb {
//           background: #cbd5e1;
//           border-radius: 4px;
//         }
//         .dark .scrollbar-thin::-webkit-scrollbar-thumb {
//           background: #475569;
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default OrderManagementSystem;

import React, { useState, useMemo, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
} from "recharts";
import { motion } from "framer-motion";
import {
  Truck,
  MapPin,
  Search,
  ChevronRight,
  Package,
  CheckCircle2,
  Navigation,
  Clock,
  Zap,
  ShoppingCart,
  X,
  Plus,
} from "lucide-react";

// ============================================================
// 1. MOCK STATIC DATA (customers, products, etc.)
// ============================================================

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

const KPI_DATA = {
  todayOrders: 47,
  todayRevenue: 2845000,
  todayExpense: 1892000,
  todayProfit: 953000,
  netProfit: 12580000,
  pendingOrders: 23,
  processingOrders: 41,
  deliveredOrders: 892,
  cancelledOrders: 18,
  returnedOrders: 12,
  lowStock: 34,
  inventoryValue: 45600000,
  warehouseCapacity: 78,
  regularCustomers: 156,
  vipCustomers: 43,
  suppliers: 28,
  outstandingPayments: 5600000,
  totalProducts: 1247,
  totalWarehouses: 6,
  monthlyGrowth: 12.4,
};

const CUSTOMER_DATA = [
  {
    id: 1,
    name: "Dushyant Hardware",
    type: "VIP",
    phone: "+91 98765 43210",
    email: "info@dushyanthardware.com",
    gst: "27AABCD1234D1ZP",
    address: "Plot 42, Industrial Area, Delhi",
    orders: 152,
    revenue: 12800000,
    profit: 2150000,
    outstanding: 25000,
    creditLimit: 200000,
    status: "Active",
    rating: 4.9,
    lastOrder: "2024-12-18",
  },
  {
    id: 2,
    name: "ABC Traders",
    type: "Regular",
    phone: "+91 87654 32109",
    email: "contact@abctraders.in",
    gst: "27XYZ7890E1ZP",
    address: "Shop 15, Main Market, Mumbai",
    orders: 96,
    revenue: 8200000,
    profit: 1380000,
    outstanding: 0,
    creditLimit: 100000,
    status: "Active",
    rating: 4.7,
    lastOrder: "2024-12-18",
  },
  {
    id: 3,
    name: "XYZ Enterprises",
    type: "Regular",
    phone: "+91 76543 21098",
    email: "info@xyzenterprise.com",
    gst: "29PQR4567F1ZP",
    address: "Tech Park, Bangalore",
    orders: 78,
    revenue: 6800000,
    profit: 1120000,
    outstanding: 45000,
    creditLimit: 150000,
    status: "Active",
    rating: 4.5,
    lastOrder: "2024-12-17",
  },
  {
    id: 4,
    name: "Singh Electricals",
    type: "VIP",
    phone: "+91 65432 10987",
    email: "singh@electricals.in",
    gst: "08LMN3210G1ZP",
    address: "Electronics City, Delhi",
    orders: 124,
    revenue: 10500000,
    profit: 1780000,
    outstanding: 0,
    creditLimit: 250000,
    status: "Active",
    rating: 4.8,
    lastOrder: "2024-12-17",
  },
  {
    id: 5,
    name: "Gupta Distributors",
    type: "Regular",
    phone: "+91 54321 09876",
    email: "gupta@distributors.com",
    gst: "22JKL7890H1ZP",
    address: "Distribution Center, Chennai",
    orders: 67,
    revenue: 5600000,
    profit: 890000,
    outstanding: 120000,
    creditLimit: 200000,
    status: "Active",
    rating: 4.3,
    lastOrder: "2024-12-16",
  },
  {
    id: 6,
    name: "Bharat Traders",
    type: "Regular",
    phone: "+91 43210 98765",
    email: "bharat@traders.in",
    gst: "19RST3456I1ZP",
    address: "Trading Complex, Mumbai",
    orders: 45,
    revenue: 3800000,
    profit: 620000,
    outstanding: 0,
    creditLimit: 80000,
    status: "Inactive",
    rating: 4.1,
    lastOrder: "2024-10-15",
  },
  {
    id: 7,
    name: "Kumar Hardware Store",
    type: "VIP",
    phone: "+91 32109 87654",
    email: "kumar@hardware.in",
    gst: "07UVW9012J1ZP",
    address: "Main Road, Delhi",
    orders: 203,
    revenue: 18200000,
    profit: 3150000,
    outstanding: 75000,
    creditLimit: 300000,
    status: "Active",
    rating: 4.9,
    lastOrder: "2024-12-15",
  },
  {
    id: 8,
    name: "Mohan Electronics",
    type: "Regular",
    phone: "+91 21098 76543",
    email: "mohan@electronics.in",
    gst: "15EFG5678K1ZP",
    address: "Electronic Market, Bangalore",
    orders: 34,
    revenue: 2900000,
    profit: 480000,
    outstanding: 0,
    creditLimit: 50000,
    status: "Active",
    rating: 4.0,
    lastOrder: "2024-12-15",
  },
];

const SUPPLIER_DATA = [
  {
    id: 1,
    name: "Bosch India",
    gst: "06HIJ2345L1ZP",
    phone: "+91 98765 11111",
    email: "supply@bosch.in",
    warehouse: "Delhi WH",
    products: 43,
    purchaseOrders: 320,
    outstanding: 280000,
    paymentTerms: "Net 30",
    deliveryPerf: 4.8,
    avgDelivery: 2,
    rating: 4.9,
    totalPurchases: 45600000,
    status: "Active",
  },
  {
    id: 2,
    name: "Tata Steel",
    gst: "13KLM6789M1ZP",
    phone: "+91 87654 22222",
    email: "procure@tatasteel.com",
    warehouse: "Mumbai WH",
    products: 28,
    purchaseOrders: 195,
    outstanding: 450000,
    paymentTerms: "Net 45",
    deliveryPerf: 4.5,
    avgDelivery: 3,
    rating: 4.7,
    totalPurchases: 32800000,
    status: "Active",
  },
  {
    id: 3,
    name: "Reliance Industries",
    gst: "21NOP0123N1ZP",
    phone: "+91 76543 33333",
    email: "supply@ril.com",
    warehouse: "Bangalore WH",
    products: 56,
    purchaseOrders: 247,
    outstanding: 320000,
    paymentTerms: "Net 30",
    deliveryPerf: 4.6,
    avgDelivery: 2.5,
    rating: 4.8,
    totalPurchases: 38900000,
    status: "Active",
  },
  {
    id: 4,
    name: "Larsen & Toubro",
    gst: "09QRS4567O1ZP",
    phone: "+91 65432 44444",
    email: "procurement@lnt.com",
    warehouse: "Chennai WH",
    products: 34,
    purchaseOrders: 178,
    outstanding: 190000,
    paymentTerms: "Net 60",
    deliveryPerf: 4.3,
    avgDelivery: 4,
    rating: 4.4,
    totalPurchases: 26700000,
    status: "Active",
  },
  {
    id: 5,
    name: "ITC Limited",
    gst: "16TUV8901P1ZP",
    phone: "+91 54321 55555",
    email: "supply@itc.in",
    warehouse: "Delhi WH",
    products: 19,
    purchaseOrders: 89,
    outstanding: 0,
    paymentTerms: "Net 30",
    deliveryPerf: 4.9,
    avgDelivery: 1.5,
    rating: 4.9,
    totalPurchases: 15600000,
    status: "Active",
  },
];

const PRODUCT_DATA = [
  {
    id: 1,
    name: "Cordless Drill",
    sku: "DRL-001",
    category: "Power Tools",
    brand: "Bosch",
    warehouse: "Delhi WH",
    rack: "A-12",
    shelf: "3",
    bin: "A-12-3-01",
    stock: 47,
    reserved: 8,
    available: 39,
    minStock: 15,
    maxStock: 100,
    purchasePrice: 1200,
    sellingPrice: 1850,
    mrp: 2200,
    gst: 18,
    status: "Active",
  },
  {
    id: 2,
    name: "Hammer 500g",
    sku: "HMR-002",
    category: "Hand Tools",
    brand: "Tata",
    warehouse: "Mumbai WH",
    rack: "B-05",
    shelf: "2",
    bin: "B-05-2-03",
    stock: 120,
    reserved: 12,
    available: 108,
    minStock: 30,
    maxStock: 200,
    purchasePrice: 180,
    sellingPrice: 299,
    mrp: 350,
    gst: 12,
    status: "Active",
  },
  {
    id: 3,
    name: "Safety Gloves",
    sku: "SFT-003",
    category: "Safety",
    brand: "3M",
    warehouse: "Delhi WH",
    rack: "C-08",
    shelf: "1",
    bin: "C-08-1-02",
    stock: 250,
    reserved: 25,
    available: 225,
    minStock: 50,
    maxStock: 500,
    purchasePrice: 85,
    sellingPrice: 150,
    mrp: 180,
    gst: 5,
    status: "Active",
  },
  {
    id: 4,
    name: 'Cutting Disc 4"',
    sku: "CUT-004",
    category: "Abrasives",
    brand: "Bosch",
    warehouse: "Bangalore WH",
    rack: "D-15",
    shelf: "4",
    bin: "D-15-4-01",
    stock: 65,
    reserved: 10,
    available: 55,
    minStock: 20,
    maxStock: 150,
    purchasePrice: 45,
    sellingPrice: 89,
    mrp: 110,
    gst: 18,
    status: "Active",
  },
  {
    id: 5,
    name: "Plywood 4x8",
    sku: "PLY-005",
    category: "Building Material",
    brand: "Century",
    warehouse: "Delhi WH",
    rack: "E-22",
    shelf: "1",
    bin: "E-22-1-05",
    stock: 180,
    reserved: 30,
    available: 150,
    minStock: 40,
    maxStock: 300,
    purchasePrice: 1250,
    sellingPrice: 1890,
    mrp: 2200,
    gst: 18,
    status: "Active",
  },
  {
    id: 6,
    name: "Grinder Angle",
    sku: "GRN-006",
    category: "Power Tools",
    brand: "Makita",
    warehouse: "Mumbai WH",
    rack: "F-10",
    shelf: "2",
    bin: "F-10-2-01",
    stock: 32,
    reserved: 6,
    available: 26,
    minStock: 10,
    maxStock: 80,
    purchasePrice: 1800,
    sellingPrice: 2800,
    mrp: 3400,
    gst: 18,
    status: "Active",
  },
  {
    id: 7,
    name: "Measuring Tape 5m",
    sku: "MTR-007",
    category: "Measuring",
    brand: "Stanley",
    warehouse: "Chennai WH",
    rack: "G-03",
    shelf: "3",
    bin: "G-03-3-02",
    stock: 85,
    reserved: 5,
    available: 80,
    minStock: 15,
    maxStock: 150,
    purchasePrice: 120,
    sellingPrice: 199,
    mrp: 250,
    gst: 12,
    status: "Active",
  },
  {
    id: 8,
    name: "LED Flood Light",
    sku: "LGT-008",
    category: "Lighting",
    brand: "Philips",
    warehouse: "Bangalore WH",
    rack: "H-18",
    shelf: "1",
    bin: "H-18-1-03",
    stock: 42,
    reserved: 8,
    available: 34,
    minStock: 12,
    maxStock: 100,
    purchasePrice: 650,
    sellingPrice: 1050,
    mrp: 1300,
    gst: 18,
    status: "Active",
  },
];

const WAREHOUSE_DATA = [
  {
    id: 1,
    name: "Delhi WH",
    code: "DEL-01",
    address: "Plot 42, Industrial Area, Delhi",
    manager: "Rajesh Kumar",
    capacity: 85,
    occupied: 72,
    available: 13,
    status: "Active",
    lat: 28.7041,
    lng: 77.1025,
    products: 324,
    orders: 456,
    revenue: 45600000,
  },
  {
    id: 2,
    name: "Mumbai WH",
    code: "BOM-01",
    address: "Warehouse District, Mumbai",
    manager: "Priya Sharma",
    capacity: 70,
    occupied: 58,
    available: 12,
    status: "Active",
    lat: 19.076,
    lng: 72.8777,
    products: 256,
    orders: 389,
    revenue: 32800000,
  },
  {
    id: 3,
    name: "Bangalore WH",
    code: "BLR-01",
    address: "Electronic City, Bangalore",
    manager: "Amit Patel",
    capacity: 60,
    occupied: 45,
    available: 15,
    status: "Active",
    lat: 12.9716,
    lng: 77.5946,
    products: 198,
    orders: 302,
    revenue: 25600000,
  },
  {
    id: 4,
    name: "Chennai WH",
    code: "CHE-01",
    address: "Industrial Estate, Chennai",
    manager: "Sneha Reddy",
    capacity: 50,
    occupied: 38,
    available: 12,
    status: "Active",
    lat: 13.0827,
    lng: 80.2707,
    products: 167,
    orders: 245,
    revenue: 18900000,
  },
  {
    id: 5,
    name: "Hyderabad WH",
    code: "HYD-01",
    address: "Hi-Tech City, Hyderabad",
    manager: "Vikram Singh",
    capacity: 45,
    occupied: 32,
    available: 13,
    status: "Active",
    lat: 17.385,
    lng: 78.4867,
    products: 142,
    orders: 198,
    revenue: 14500000,
  },
  {
    id: 6,
    name: "Kolkata WH",
    code: "KOL-01",
    address: "Salt Lake City, Kolkata",
    manager: "Arjun Das",
    capacity: 40,
    occupied: 28,
    available: 12,
    status: "Under Construction",
    lat: 22.5726,
    lng: 88.3639,
    products: 98,
    orders: 156,
    revenue: 9800000,
  },
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 3200000, expense: 2100000, profit: 1100000 },
  { month: "Feb", revenue: 3500000, expense: 2250000, profit: 1250000 },
  { month: "Mar", revenue: 3800000, expense: 2400000, profit: 1400000 },
  { month: "Apr", revenue: 4200000, expense: 2650000, profit: 1550000 },
  { month: "May", revenue: 4500000, expense: 2800000, profit: 1700000 },
  { month: "Jun", revenue: 4800000, expense: 2950000, profit: 1850000 },
  { month: "Jul", revenue: 5100000, expense: 3100000, profit: 2000000 },
  { month: "Aug", revenue: 4900000, expense: 3050000, profit: 1850000 },
  { month: "Sep", revenue: 5200000, expense: 3200000, profit: 2000000 },
  { month: "Oct", revenue: 5600000, expense: 3400000, profit: 2200000 },
  { month: "Nov", revenue: 5800000, expense: 3500000, profit: 2300000 },
  { month: "Dec", revenue: 6100000, expense: 3700000, profit: 2400000 },
];

const ORDER_STATUS_DATA = [
  { name: "Delivered", value: 892 },
  { name: "Processing", value: 41 },
  { name: "Pending", value: 23 },
  { name: "Cancelled", value: 18 },
  { name: "Returned", value: 12 },
];

const TOP_PRODUCTS_DATA = [
  { name: "Cordless Drill", sales: 234 },
  { name: "Hammer 500g", sales: 189 },
  { name: "Safety Gloves", sales: 156 },
  { name: "Grinder Angle", sales: 134 },
  { name: "Plywood 4x8", sales: 112 },
  { name: "LED Flood Light", sales: 98 },
];

const SUPPLIER_PERFORMANCE_DATA = [
  { name: "Bosch", deliveries: 320, quality: 4.9, time: 4.8 },
  { name: "Tata", deliveries: 195, quality: 4.7, time: 4.5 },
  { name: "Reliance", deliveries: 247, quality: 4.8, time: 4.6 },
  { name: "L&T", deliveries: 178, quality: 4.4, time: 4.3 },
  { name: "ITC", deliveries: 89, quality: 4.9, time: 4.9 },
];

const CUSTOMER_ANALYTICS_DATA = [
  { name: "Dushyant", orders: 152, revenue: 12800000 },
  { name: "Singh", orders: 124, revenue: 10500000 },
  { name: "Kumar", orders: 203, revenue: 18200000 },
  { name: "ABC", orders: 96, revenue: 8200000 },
  { name: "XYZ", orders: 78, revenue: 6800000 },
];

const EXPENSE_BREAKDOWN = [
  { name: "Purchase Cost", value: 65 },
  { name: "Courier Charges", value: 12 },
  { name: "Employee Salary", value: 8 },
  { name: "Warehouse Rent", value: 6 },
  { name: "Packing Materials", value: 4 },
  { name: "Taxes", value: 3 },
  { name: "Others", value: 2 },
];

const NOTIFICATIONS = [
  {
    id: 1,
    type: "Low Stock",
    message: "Cordless Drill stock is below minimum level (15 units remaining)",
    time: "5 mins ago",
    read: false,
    priority: "High",
  },
  {
    id: 2,
    type: "Payment",
    message: "Payment of ₹45,000 received from ABC Traders for order ORD-1002",
    time: "15 mins ago",
    read: false,
    priority: "Medium",
  },
  {
    id: 3,
    type: "Order",
    message: "New order ORD-1011 placed by Kumar Hardware Store for ₹78,900",
    time: "32 mins ago",
    read: false,
    priority: "High",
  },
  {
    id: 4,
    type: "Return",
    message:
      "Return request for ORD-1009 from Sharma Agencies awaiting approval",
    time: "1 hour ago",
    read: false,
    priority: "Medium",
  },
  {
    id: 5,
    type: "Supplier",
    message:
      "Bosch India delivery for purchase order PO-2024-045 is delayed by 2 days",
    time: "2 hours ago",
    read: true,
    priority: "Low",
  },
  {
    id: 6,
    type: "Warehouse",
    message: "Delhi WH is at 85% capacity. Consider optimizing storage.",
    time: "3 hours ago",
    read: true,
    priority: "Medium",
  },
];

const RECENT_ACTIVITIES = [
  {
    id: 1,
    user: "Rajesh Kumar",
    action: "Picked product Cordless Drill for ORD-1001",
    time: "10 mins ago",
    type: "Picking",
  },
  {
    id: 2,
    user: "Priya Sharma",
    action: "Packed order ORD-1002 for ABC Traders",
    time: "25 mins ago",
    type: "Packing",
  },
  {
    id: 3,
    user: "Amit Patel",
    action: "Shipped ORD-1003 via Bluedart tracking BLU789012",
    time: "45 mins ago",
    type: "Shipping",
  },
  {
    id: 4,
    user: "Sneha Reddy",
    action: "Received new stock of Grinder Angle (32 units)",
    time: "1 hour ago",
    type: "Inventory",
  },
  {
    id: 5,
    user: "Vikram Singh",
    action: "Return processed for ORD-1009 - refund initiated",
    time: "2 hours ago",
    type: "Return",
  },
];

// ============================================================
// 2. UTILITY FUNCTIONS
// ============================================================

const formatCurrency = (value) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value.toFixed(0)}`;
};

const formatCurrencyFull = (value) => `₹${value.toLocaleString("en-IN")}`;

const getStatusColor = (status) => {
  const map = {
    Delivered:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    Processing:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    Pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    Shipped:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    Cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    Returned:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    Active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    Inactive:
      "bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300",
    "Under Construction":
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    VIP: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    Regular: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    Paid: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    Partial:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    High: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    Medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    Low: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  };
  return (
    map[status] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300"
  );
};

const getInitials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

// ============================================================
// 3. MAIN APP
// ============================================================

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // --- Orders State (Real data, editable) ---
  const [orders, setOrders] = useState(ORDER_DATA); // start with mock
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSubTab, setActiveSubTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null); // "newOrder" or "track"
  const [newOrderForm, setNewOrderForm] = useState({
    customer: "",
    amount: 0,
    products: 1,
    qty: 1,
    warehouse: "Delhi WH",
    employee: "Rajesh Kumar",
    courier: "DTDC",
    payment: "Pending",
  });
  const [trackOrderId, setTrackOrderId] = useState("");
  const [trackResult, setTrackResult] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationPanel, setNotificationPanel] = useState(false);

  // Toggle dark mode
  React.useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUsername === "RAM" && loginPassword === "dushyan") {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials. Use RAM / dushyan");
    }
  };

  // Generate unique order ID
  const generateOrderId = () => {
    const count = orders.length + 1;
    return `ORD-${String(count).padStart(4, "0")}`;
  };

  // Create new order
  const createOrder = () => {
    const newOrder = {
      id: generateOrderId(),
      invoice: `INV-2024-${String(orders.length + 1).padStart(3, "0")}`,
      customer: newOrderForm.customer || "New Customer",
      type: "Regular",
      products: newOrderForm.products || 1,
      qty: newOrderForm.qty || 1,
      warehouse: newOrderForm.warehouse || "Delhi WH",
      employee: newOrderForm.employee || "Rajesh Kumar",
      date: new Date().toISOString().slice(0, 10),
      expected: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10),
      payment: newOrderForm.payment || "Pending",
      status: "Pending",
      courier: newOrderForm.courier || "DTDC",
      tracking: `TRK${Math.floor(100000 + Math.random() * 900000)}`,
      amount: newOrderForm.amount || 0,
      profit: Math.round((newOrderForm.amount || 0) * 0.15),
    };
    setOrders([newOrder, ...orders]);
    setModalOpen(false);
    setNewOrderForm({
      customer: "",
      amount: 0,
      products: 1,
      qty: 1,
      warehouse: "Delhi WH",
      employee: "Rajesh Kumar",
      courier: "DTDC",
      payment: "Pending",
    });
  };

  // Update order status (triggers timeline update)
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return { ...o, status: newStatus };
        }
        return o;
      }),
    );
  };

  // Track order by ID
  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackOrderId.trim()) return;
    const found = orders.find((o) => o.id === trackOrderId);
    if (found) {
      setTrackResult(found);
    } else {
      setTrackResult(null);
      alert("Order not found!");
    }
  };

  // Compute timeline from order status (for tracking display)
  const getTimelineFromOrder = (order) => {
    if (!order) return [];
    const statusMap = {
      Pending: { title: "Order Placed", status: "done", date: order.date },
      Processing: { title: "Processing", status: "done", date: order.date },
      Shipped: { title: "Shipped", status: "done", date: order.expected },
      Delivered: { title: "Delivered", status: "done", date: order.expected },
      Cancelled: { title: "Cancelled", status: "cancelled", date: order.date },
    };
    const statuses = ["Pending", "Processing", "Shipped", "Delivered"];
    const currentIdx = statuses.indexOf(order.status);
    const timeline = statuses.map((s, i) => {
      const isDone = i <= currentIdx;
      const isActive =
        i === currentIdx &&
        order.status !== "Delivered" &&
        order.status !== "Cancelled";
      const status = isDone ? "done" : "pending";
      const date = i === 0 ? order.date : order.expected;
      return {
        title: s,
        location: order.warehouse || "Warehouse",
        date: date,
        status: status,
        active: isActive,
      };
    });
    if (order.status === "Cancelled") {
      timeline[timeline.length - 1].status = "cancelled";
    }
    return timeline;
  };

  // ============================================================
  // 4. RENDER COMPONENTS
  // ============================================================

  // --- Login Page ---
  if (!isLoggedIn) {
    return (
      <div
        className={`login-page ${darkMode ? "dark" : ""}`}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: darkMode ? "#0b1120" : "#f1f5f9",
        }}
      >
        <div
          className="login-card"
          style={{
            background: darkMode ? "#1e293b" : "#fff",
            padding: "40px 36px",
            borderRadius: "24px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h2
            style={{ fontSize: "24px", fontWeight: 800, marginBottom: "8px" }}
          >
            OrderFlow
          </h2>
          <p style={{ color: "#64748b", marginBottom: "28px" }}>
            Sign in to manage your orders
          </p>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 600,
                  marginBottom: "4px",
                }}
              >
                Username
              </label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1.5px solid #e2e8f0",
                  background: darkMode ? "#0f172a" : "#fff",
                  color: darkMode ? "#e2e8f0" : "#0f172a",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 600,
                  marginBottom: "4px",
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1.5px solid #e2e8f0",
                  background: darkMode ? "#0f172a" : "#fff",
                  color: darkMode ? "#e2e8f0" : "#0f172a",
                }}
              />
              <p
                style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}
              >
                Use: RAM / dushyan
              </p>
            </div>
            {loginError && (
              <p
                style={{
                  color: "#ef4444",
                  fontSize: "14px",
                  marginBottom: "12px",
                }}
              >
                {loginError}
              </p>
            )}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Main Dashboard ---
  const menuItems = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "orders", label: "Orders", icon: "📦" },
    { id: "track", label: "Track Order", icon: "🚚" },
    { id: "customers", label: "Customers", icon: "👤" },
    { id: "suppliers", label: "Suppliers", icon: "🏭" },
    { id: "products", label: "Products", icon: "📱" },
    { id: "inventory", label: "Inventory", icon: "📋" },
    { id: "warehouses", label: "Warehouses", icon: "🏚️" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "expenses", label: "Expenses", icon: "💰" },
    { id: "reports", label: "Reports", icon: "📄" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  // Filter orders for display
  const filteredOrders = useMemo(() => {
    let result = orders;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customer.toLowerCase().includes(q) ||
          o.invoice.toLowerCase().includes(q),
      );
    }
    if (activeSubTab !== "all") {
      result = result.filter(
        (o) => o.status.toLowerCase() === activeSubTab.toLowerCase(),
      );
    }
    return result;
  }, [orders, searchQuery, activeSubTab]);

  // ============================================================
  // 5. RENDER FUNCTIONS FOR EACH TAB
  // ============================================================

  const renderOverview = () => {
    const kpiCards = [
      {
        label: "Today's Orders",
        value: KPI_DATA.todayOrders,
        icon: "📦",
        color: "bg-blue-500",
      },
      {
        label: "Today's Revenue",
        value: formatCurrency(KPI_DATA.todayRevenue),
        icon: "💰",
        color: "bg-green-500",
      },
      {
        label: "Today's Expense",
        value: formatCurrency(KPI_DATA.todayExpense),
        icon: "💳",
        color: "bg-red-500",
      },
      {
        label: "Today's Profit",
        value: formatCurrency(KPI_DATA.todayProfit),
        icon: "📈",
        color: "bg-purple-500",
      },
      {
        label: "Net Profit",
        value: formatCurrency(KPI_DATA.netProfit),
        icon: "🏆",
        color: "bg-indigo-500",
      },
      {
        label: "Pending Orders",
        value: KPI_DATA.pendingOrders,
        icon: "⏳",
        color: "bg-yellow-500",
      },
      {
        label: "Delivered Orders",
        value: KPI_DATA.deliveredOrders,
        icon: "✅",
        color: "bg-emerald-500",
      },
      {
        label: "Low Stock",
        value: KPI_DATA.lowStock,
        icon: "⚠️",
        color: "bg-orange-500",
      },
      {
        label: "VIP Customers",
        value: KPI_DATA.vipCustomers,
        icon: "👑",
        color: "bg-pink-500",
      },
      {
        label: "Total Warehouses",
        value: KPI_DATA.totalWarehouses,
        icon: "🏚️",
        color: "bg-cyan-500",
      },
      {
        label: "Outstanding",
        value: formatCurrency(KPI_DATA.outstandingPayments),
        icon: "💸",
        color: "bg-rose-500",
      },
      {
        label: "Monthly Growth",
        value: `${KPI_DATA.monthlyGrowth}%`,
        icon: "🚀",
        color: "bg-teal-500",
      },
    ];
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {kpiCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {card.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {card.value}
                  </p>
                </div>
                <div
                  className={`${card.color} w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl`}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Revenue vs Expense
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
                <YAxis
                  stroke="#6b7280"
                  fontSize={11}
                  tickFormatter={(v) => `₹${v / 1000}K`}
                />
                <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
                <Legend />
                <Bar
                  dataKey="revenue"
                  fill="#3b82f6"
                  name="Revenue"
                  barSize={20}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expense"
                  fill="#ef4444"
                  name="Expense"
                  barSize={20}
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#10b981"
                  name="Profit"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Order Status
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={ORDER_STATUS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={{ stroke: "#6b7280" }}
                >
                  {ORDER_STATUS_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v} orders`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  // --- Orders Tab (with create & status update) ---
  const renderOrders = () => {
    const statusTabs = [
      "all",
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
      "returned",
    ];
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-700 pb-3">
          <div className="flex flex-wrap gap-2">
            {statusTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all capitalize ${activeSubTab === tab ? "bg-blue-600 text-white shadow-md" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"}`}
              >
                {tab}{" "}
                <span className="ml-1 text-xs opacity-70">
                  (
                  {tab === "all"
                    ? orders.length
                    : orders.filter((o) => o.status.toLowerCase() === tab)
                        .length}
                  )
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setModalOpen(true);
              setModalContent("newOrder");
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Plus size={18} /> New Order
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
                    Payment
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-xs font-medium text-gray-900 dark:text-white">
                        {order.id}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          {order.customer}
                        </p>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(order.type)}`}
                        >
                          {order.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                        {formatCurrencyFull(order.amount)}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value)
                          }
                          className={`text-xs px-3 py-1 rounded-full font-medium border-0 focus:ring-1 focus:ring-blue-500 ${getStatusColor(order.status)}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Returned">Returned</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(order.payment)}`}
                        >
                          {order.payment}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">
                        {order.date}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setDrawerOpen(true);
                          }}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 text-sm font-medium"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // --- Track Order Tab (using your original design) ---
  const renderTrackOrder = () => {
    const timeline = trackResult ? getTimelineFromOrder(trackResult) : [];
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-8 pb-16 px-4 selection:bg-industrial-red selection:text-white font-['Inter']">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-industrial-red font-black tracking-widest uppercase text-xs mb-4 block"
            >
              Logistics Intelligence
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tighter text-black dark:text-white uppercase leading-tight"
            >
              Track Your{" "}
              <span className="text-industrial-red underline decoration-transparent group-hover:decoration-industrial-red transition-all">
                Procurement
              </span>
            </motion.h1>
            <p className="mt-8 text-gray-400 font-bold uppercase tracking-widest text-xs">
              Real-Time Distance Monitoring & Coordinates Reporting
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-0 p-8 md:p-12 border-2 border-black dark:border-gray-600 mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
            <form
              onSubmit={handleTrack}
              className="flex flex-col md:flex-row gap-4"
            >
              <div className="relative flex-1 group">
                <Package className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 transition-colors group-focus-within:text-industrial-red" />
                <input
                  type="text"
                  value={trackOrderId}
                  onChange={(e) => setTrackOrderId(e.target.value)}
                  className="w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-0 py-6 pl-16 pr-6 text-sm font-black outline-none focus:border-industrial-red transition-all uppercase tracking-widest dark:text-white"
                  placeholder="ENTER SHIPMENT ID (e.g. ORD-1001)"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-industrial-dark hover:bg-black text-white px-10 py-6 rounded-0 font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-all"
              >
                START TRACKING <Search size={22} className="animate-pulse" />
              </button>
            </form>
          </div>

          {trackResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              <div className="bg-white dark:bg-gray-800 rounded-0 shadow-[8px_8px_0px_0px_rgba(220,38,38,0.1)] overflow-hidden border-2 border-black dark:border-gray-600">
                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                    <div className="space-y-8 flex-1">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                          <Navigation
                            size={14}
                            className="text-industrial-red"
                          />{" "}
                          Strategic Location
                        </label>
                        <h2 className="text-2xl font-black text-black dark:text-white tracking-tight uppercase">
                          {trackResult.customer} • {trackResult.warehouse}
                        </h2>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">
                          Order #{trackResult.id} • {trackResult.date}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-0 border border-gray-200 dark:border-gray-600">
                          <Clock
                            className="text-industrial-red mb-3"
                            size={20}
                          />
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                            ETA Arrival
                          </p>
                          <p className="text-lg font-black text-black dark:text-white mt-1 uppercase underline decoration-industrial-red decoration-2 underline-offset-4">
                            {trackResult.expected}
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-0 border border-gray-200 dark:border-gray-600">
                          <MapPin
                            className="text-industrial-red mb-3"
                            size={20}
                          />
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                            Total Distance
                          </p>
                          <p className="text-lg font-black text-black dark:text-white mt-1 uppercase underline decoration-industrial-red decoration-2 underline-offset-4">
                            12.8 KM Left
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/3 space-y-4">
                      <div className="bg-industrial-dark text-white p-8 rounded-0 relative overflow-hidden group">
                        <div className="absolute -right-4 -bottom-4 text-industrial-red opacity-10 group-hover:scale-110 transition-transform duration-500">
                          <Truck size={120} />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-industrial-red mb-2">
                          Current Operation
                        </p>
                        <p className="text-xl font-black leading-tight uppercase tracking-tighter">
                          {trackResult.status}
                        </p>
                        <div className="mt-8 flex items-center justify-between text-xs font-bold uppercase tracking-widest border-t border-white/10 pt-6">
                          <span>Batch Alpha</span>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 rounded-0 bg-industrial-red animate-ping" />
                            <div className="w-2 h-2 rounded-0 bg-industrial-red" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 md:p-12 border-t-2 border-black dark:border-gray-600 overflow-x-auto">
                  <div className="flex items-center min-w-[800px] gap-4">
                    {timeline.map((evt, idx) => (
                      <div key={idx} className="flex-1 relative">
                        {idx !== timeline.length - 1 && (
                          <div
                            className={`absolute top-5 left-10 right-0 h-1 z-0 ${evt.status === "done" ? "bg-industrial-red" : "bg-gray-200 dark:bg-gray-600"}`}
                          ></div>
                        )}
                        <div className="flex flex-col items-center relative z-10 text-center">
                          <div
                            className={`w-10 h-10 rounded-0 flex items-center justify-center shadow-none transition-all ${evt.status === "done" ? "bg-industrial-red text-white" : evt.status === "pending" ? "bg-white text-gray-300 border border-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600" : "bg-white text-industrial-red border-2 border-industrial-red dark:bg-gray-700"}`}
                          >
                            {evt.status === "done" ? (
                              <CheckCircle2 size={18} />
                            ) : (
                              <span className="font-black italic">
                                {idx + 1}
                              </span>
                            )}
                          </div>
                          <p
                            className={`mt-4 text-[11px] font-black uppercase tracking-widest ${evt.status === "pending" ? "text-gray-400" : "text-black dark:text-white"}`}
                          >
                            {evt.title}
                          </p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mt-1">
                            {evt.location}
                          </p>
                          <p className="text-[9px] font-bold text-industrial-red mt-2">
                            {evt.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  // ---- Other tabs (simplified for brevity) ----
  const renderCustomers = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {CUSTOMER_DATA.map((c) => (
        <div
          key={c.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
              {getInitials(c.name)}
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {c.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {c.phone}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs">
                <span>
                  Orders: <strong>{c.orders}</strong>
                </span>
                <span>
                  Revenue: <strong>{formatCurrency(c.revenue)}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  const renderSuppliers = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {SUPPLIER_DATA.map((s) => (
        <div
          key={s.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-semibold text-lg">
              {getInitials(s.name)}
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {s.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {s.phone}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs">
                <span>
                  Orders: <strong>{s.purchaseOrders}</strong>
                </span>
                <span>Rating: ⭐{s.rating}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  const renderProducts = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-700/50">
          <tr>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">SKU</th>
            <th className="px-4 py-3 text-left">Stock</th>
            <th className="px-4 py-3 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {PRODUCT_DATA.map((p) => (
            <tr
              key={p.id}
              className="border-t border-gray-200 dark:border-gray-700"
            >
              <td className="px-4 py-3">{p.name}</td>
              <td className="px-4 py-3">{p.sku}</td>
              <td className="px-4 py-3">
                {p.available}/{p.maxStock}
              </td>
              <td className="px-4 py-3">
                {formatCurrencyFull(p.sellingPrice)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  const renderInventory = () => <div>Inventory summary (static)</div>;
  const renderWarehouses = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {WAREHOUSE_DATA.map((w) => (
        <div
          key={w.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5"
        >
          <p className="font-semibold">{w.name}</p>
          <p className="text-sm text-gray-500">{w.address}</p>
          <p>Capacity: {w.occupied}%</p>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className={`h-2 rounded-full ${w.occupied > 80 ? "bg-red-500" : w.occupied > 60 ? "bg-yellow-500" : "bg-green-500"}`}
              style={{ width: `${w.occupied}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
  const renderAnalytics = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={REVENUE_DATA}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              fill="#3b82f6"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={CUSTOMER_ANALYTICS_DATA}>
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
  const renderExpenses = () => <div>Expense breakdown (static)</div>;
  const renderReports = () => <div>Report generation (static)</div>;
  const renderSettings = () => (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
        <span>Dark Mode</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-12 h-7 rounded-full transition-all ${darkMode ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"} relative`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transition-all absolute top-1 ${darkMode ? "right-1" : "left-1"}`}
          ></div>
        </button>
      </div>
    </div>
  );

  // ============================================================
  // 6. DRAWER & MODAL
  // ============================================================

  const renderOrderDrawer = () => {
    if (!selectedOrder) return null;
    return (
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto border-l border-gray-200 dark:border-gray-700 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Order Details</h2>
          <button
            onClick={() => {
              setDrawerOpen(false);
              setSelectedOrder(null);
            }}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            ✕
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3">
            <span
              className={`text-sm font-medium px-3 py-1.5 rounded-full ${getStatusColor(selectedOrder.status)}`}
            >
              {selectedOrder.status}
            </span>
            <span>{selectedOrder.date}</span>
          </div>
          <div>
            <p className="font-medium">{selectedOrder.customer}</p>
            <p className="text-sm text-gray-500">{selectedOrder.id}</p>
          </div>
          <div>
            <p>
              <strong>Amount:</strong>{" "}
              {formatCurrencyFull(selectedOrder.amount)}
            </p>
            <p>
              <strong>Profit:</strong>{" "}
              {formatCurrencyFull(selectedOrder.profit)}
            </p>
          </div>
          <div>
            <p>
              <strong>Courier:</strong> {selectedOrder.courier}
            </p>
            <p>
              <strong>Tracking:</strong> {selectedOrder.tracking}
            </p>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
            Close
          </button>
        </div>
      </div>
    );
  };

  const renderModal = () => {
    if (!modalOpen) return null;
    if (modalContent === "newOrder") {
      return (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Create New Order</h3>
              <button onClick={() => setModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="space-y-3">
              <input
                className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                placeholder="Customer Name"
                value={newOrderForm.customer}
                onChange={(e) =>
                  setNewOrderForm({ ...newOrderForm, customer: e.target.value })
                }
              />
              <input
                className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                type="number"
                placeholder="Amount (₹)"
                value={newOrderForm.amount}
                onChange={(e) =>
                  setNewOrderForm({
                    ...newOrderForm,
                    amount: parseFloat(e.target.value) || 0,
                  })
                }
              />
              <select
                className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                value={newOrderForm.warehouse}
                onChange={(e) =>
                  setNewOrderForm({
                    ...newOrderForm,
                    warehouse: e.target.value,
                  })
                }
              >
                <option>Delhi WH</option>
                <option>Mumbai WH</option>
                <option>Bangalore WH</option>
                <option>Chennai WH</option>
              </select>
              <button
                onClick={createOrder}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // ============================================================
  // 7. MAIN LAYOUT
  // ============================================================

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-200`}
    >
      {renderOrderDrawer()}
      {renderModal()}

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div
          className={`${sidebarCollapsed ? "w-16" : "w-64"} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-shrink-0 transition-all duration-300 flex flex-col h-full overflow-y-auto`}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              OMS
            </div>
            {!sidebarCollapsed && (
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                OrderFlow
              </span>
            )}
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setActiveSubTab("all");
                  setSearchQuery("");
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${activeTab === item.id ? "bg-blue-600 text-white shadow-md" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {sidebarCollapsed ? "➡️" : "⬅️ Collapse"}
            </button>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between gap-4 flex-shrink-0">
            <h1 className="text-lg font-semibold truncate">
              {menuItems.find((m) => m.id === activeTab)?.label || "Dashboard"}
            </h1>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 pl-9 pr-4 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 border border-transparent rounded-lg focus:border-blue-500 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none"
              />
              <button
                onClick={() => setNotificationPanel(!notificationPanel)}
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                🔔
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-lg"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                A
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              {activeTab === "overview" && renderOverview()}
              {activeTab === "orders" && renderOrders()}
              {activeTab === "track" && renderTrackOrder()}
              {activeTab === "customers" && renderCustomers()}
              {activeTab === "suppliers" && renderSuppliers()}
              {activeTab === "products" && renderProducts()}
              {activeTab === "inventory" && renderInventory()}
              {activeTab === "warehouses" && renderWarehouses()}
              {activeTab === "analytics" && renderAnalytics()}
              {activeTab === "expenses" && renderExpenses()}
              {activeTab === "reports" && renderReports()}
              {activeTab === "settings" && renderSettings()}
            </div>
          </main>
        </div>
      </div>

      <style jsx>{`
        .track-industrial-red {
          color: #dc2626;
        }
        .bg-industrial-red {
          background: #dc2626;
        }
        .bg-industrial-dark {
          background: #111;
        }
        .border-industrial-red {
          border-color: #dc2626;
        }
        .shadow-industrial {
          box-shadow: 8px 8px 0px 0px rgba(220, 38, 38, 0.1);
        }
        .dark .shadow-industrial {
          box-shadow: 8px 8px 0px 0px rgba(220, 38, 38, 0.3);
        }
        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
