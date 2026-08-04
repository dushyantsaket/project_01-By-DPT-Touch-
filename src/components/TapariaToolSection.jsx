import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Shield, Zap, Search, ChevronRight, Info, Settings, MousePointer2, ScanLine, Ruler } from 'lucide-react';
import TapariaToolsAPI from '../data/taparia-tools-api';

const TapariaToolSection = () => {
    const [activeCategory, setActiveCategory] = useState('miniPliers');
    const [selectedToolId, setSelectedToolId] = useState('1401');
    const [searchTerm, setSearchTerm] = useState('');
    const [hoveredSpec, setHoveredSpec] = useState(null);

    const categories = {
        miniPliers: {
            name: "Mini Pliers",
            icon: <MousePointer2 className="w-5 h-5" />,
            data: TapariaToolsAPI.getAllMiniPliers()
        },
        wheelSpanners: {
            name: "Wheel Spanners",
            icon: <Wrench className="w-5 h-5" />,
            data: TapariaToolsAPI.getAllWheelSpanners()
        },
        screwDriverBits: {
            name: "Bits & Sets",
            icon: <Settings className="w-5 h-5" />,
            data: TapariaToolsAPI.getAllScrewDriverBits()
        },
        sockets: {
            name: "Sockets",
            icon: <ScanLine className="w-5 h-5" />,
            data: TapariaToolsAPI.getAllSockets()
        },
        spiritLevels: {
            name: "Spirit Levels",
            icon: <Ruler className="w-5 h-5" />,
            data: TapariaToolsAPI.getAllSpiritLevels()
        },
        socketAccessories: {
            name: "Accessories",
            icon: <Zap className="w-5 h-5" />,
            data: TapariaToolsAPI.getAllSocketAccessories()
        }
    };





    const selectedTool = categories[activeCategory].data.find(t => t.id === selectedToolId) || categories[activeCategory].data[0];


    useEffect(() => {
        // Reset selected tool when category changes
        setSelectedToolId(categories[activeCategory].data[0].id);
    }, [activeCategory]);

    const filteredTools = categories[activeCategory].data.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (tool.prodNo && tool.prodNo.includes(searchTerm))
    );

    return (
        <section className="py-24 bg-[#0a0c10] text-white overflow-hidden relative">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-industrial-red/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 mb-4"
                        >
                            <div className="h-px w-12 bg-industrial-red"></div>
                            <span className="text-industrial-red font-bold tracking-[0.3em] uppercase text-xs">Technical Benchmarks</span>
                        </motion.div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6"
                        >
                            Taparia <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Precision Series</span>
                        </motion.h2>
                        
                        {/* New Promotional Banner */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative group/banner mb-8 overflow-hidden rounded-2xl border border-white/10"
                        >
                            <img 
                                src="images/product_banners/bits_sets.png" 
                                alt="Screw Driver Bits" 
                                className="w-full h-32 object-cover opacity-60 group-hover/banner:scale-105 transition-transform duration-700"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-industrial-red/80 to-transparent flex items-center px-8">
                                <div>
                                    <h4 className="text-white font-black uppercase tracking-widest text-lg">Screw Driver Bits & Sets</h4>
                                    <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Hardened to 56-60 HRC | Precision Machined Tips</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-gray-400 text-lg font-medium leading-relaxed"
                        >
                            Industrial Power Solutions: Authorized supplier for top international brands. Explore our premium range of Taparia high-grade carbon steel engineering.
                        </motion.p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex bg-[#12161c] p-1.5 rounded-2xl border border-white/5 shadow-2xl">
                            {Object.entries(categories).map(([key, cat]) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveCategory(key)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
                                        activeCategory === key 
                                        ? 'bg-industrial-red text-white shadow-lg' 
                                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {cat.icon}
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Interactive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Sidebar: Tool List */}
                    <div className="lg:col-span-3 space-y-4">
                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <input 
                                type="text" 
                                placeholder="Search tool by name or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[#12161c] border border-white/5 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-industrial-red/50 transition-colors placeholder:text-gray-600"
                            />
                        </div>

                        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            <AnimatePresence mode="popLayout">
                                {filteredTools.map((tool) => (
                                    <motion.button
                                        layout
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        key={tool.id}
                                        onClick={() => setSelectedToolId(tool.id)}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all group ${
                                            selectedToolId === tool.id 
                                            ? 'bg-gradient-to-r from-industrial-red to-red-700 border-transparent shadow-xl' 
                                            : 'bg-[#12161c] border-white/5 hover:border-white/10 text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        <div className="flex flex-col items-start">
                                            <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${selectedToolId === tool.id ? 'text-white/70' : 'text-industrial-red'}`}>
                                                {tool.prodNo || tool.id}
                                            </span>
                                            <span className="font-bold text-sm tracking-tight line-clamp-1">{tool.name}</span>
                                        </div>
                                        <ChevronRight className={`w-4 h-4 transition-transform ${selectedToolId === tool.id ? 'translate-x-1 opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                                    </motion.button>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Middle: Schematic Viewer */}
                    <div className="lg:col-span-6 relative group">
                        <div className="absolute -inset-4 bg-industrial-red/5 blur-3xl rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        
                        <div className="relative bg-[#12161c] border border-white/5 rounded-[40px] p-8 md:p-12 shadow-3xl overflow-hidden aspect-square flex items-center justify-center">
                            {/* Scanning Animation Line */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-industrial-red/30 shadow-[0_0_15px_rgba(220,38,38,0.5)] z-20 animate-scan"></div>
                            
                            {/* Subtle Grid Pattern */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                            
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedTool.id}
                                    initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                                    transition={{ duration: 0.5, ease: "circOut" }}
                                    className="w-full h-full relative z-10 flex items-center justify-center"
                                    dangerouslySetInnerHTML={{ __html: selectedTool.workingImage }}
                                />
                            </AnimatePresence>

                            {/* HUD Overlays */}
                            <div className="absolute top-8 left-8 flex flex-col gap-2 pointer-events-none">
                                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                                    <ScanLine className="w-3 h-3 text-industrial-red animate-pulse" />
                                    <span className="text-[9px] font-black tracking-[0.2em] uppercase text-white/80">Active Schematic</span>
                                </div>
                            </div>
                            
                            <div className="absolute bottom-8 right-8 text-right pointer-events-none">
                                <div className="text-[10px] font-black text-industrial-red uppercase tracking-widest mb-1">Scale 1:1.2</div>
                                <div className="text-gray-600 font-mono text-[9px] uppercase tracking-tighter">Vector Path Mapping: Verified</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar: Tech Specs */}
                    <div className="lg:col-span-3 space-y-6">
                        <motion.div 
                            key={selectedTool.id + "info"}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#12161c] border border-white/5 rounded-3xl p-6"
                        >
                            <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4 flex items-center gap-2">
                                <Info className="w-5 h-5 text-industrial-red" />
                                Details
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                                {selectedTool.description}
                            </p>

                            {selectedTool.details && (
                                <p className="text-[11px] text-industrial-red font-bold uppercase mb-4 italic">
                                    {selectedTool.details}
                                </p>
                            )}

                            {selectedTool.specifications ? (
                                <div className="space-y-3">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 underline decoration-industrial-red decoration-2 underline-offset-4">Technical Specs (mm)</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(selectedTool.specifications).map(([key, val]) => (
                                            <div 
                                                key={key}
                                                onMouseEnter={() => setHoveredSpec(key)}
                                                onMouseLeave={() => setHoveredSpec(null)}
                                                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                                                    hoveredSpec === key ? 'bg-industrial-red border-transparent scale-105 shadow-lg' : 'bg-black/20 border-white/5'
                                                }`}
                                            >
                                                <span className={`text-[10px] font-black uppercase ${hoveredSpec === key ? 'text-white' : 'text-gray-500'}`}>{key}</span>
                                                <span className={`font-mono text-sm ${hoveredSpec === key ? 'text-white' : 'text-industrial-red'}`}>{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : selectedTool.variants ? (
                                <div className="space-y-3">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Available Variants</h4>
                                    <div className="space-y-1.5">
                                        {selectedTool.variants.slice(0, 5).map((v, i) => (
                                            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/5 text-[11px]">
                                                <span className="text-gray-400 font-bold">{v.prodNo}</span>
                                                <span className="text-industrial-red font-black">{v.sizes}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </motion.div>

                        <div className="bg-gradient-to-br from-industrial-red/20 to-transparent border border-industrial-red/10 rounded-3xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-industrial-red flex items-center justify-center shrink-0 shadow-lg">
                                    <Shield className="text-white w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-tight text-white mb-1">ISI Certified</h4>
                                    <p className="text-[11px] text-gray-500 font-medium">Generally conforming to IS 2030-1989 standards for industrial usage.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Brand Verification */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-6 opacity-50">
                    <div className="flex items-center gap-8">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Digital twin verification</div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Oem compliance</div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Material grade: 45# CS</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-industrial-red" />
                        <span className="text-xs font-black uppercase tracking-widest">TAPARIA AUTHORIZED TOOLSET API v{TapariaToolsAPI.version}</span>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(220, 38, 38, 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(220, 38, 38, 0.5);
                }
                @keyframes scan {
                    0% { top: 0; opacity: 0; }
                    5% { opacity: 1; }
                    95% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                .animate-scan {
                    animation: scan 3s linear infinite;
                }
            `}} />
        </section>
    );
};

export default TapariaToolSection;
