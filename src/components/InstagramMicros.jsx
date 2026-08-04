// // import React from 'react';
// // import { Instagram, Heart, MessageCircle, ExternalLink, Building2, MapPin, Phone, ShieldCheck } from 'lucide-react';

// // const InstagramMicrosSection = () => {
// //   const instagramPosts = [
// //     {
// //       id: 1,
// //       image: "https://bynder.sbdinc.com/m/6c3ec0550bd57a44/Drupal_Medium-DCH733B_A7.jpg",
// //       likes: "2.4k",
// //       comments: "142",
// //       caption: "DeWalt SDS MAX Brushless hammer in extreme conditions. 🛠️ #DeWalt #PowerTools"
// //     },
// //     {
// //       id: 2,
// //       video: "https://dongcheng.obs.ap-southeast-1.myhuaweicloud.com/cms/2025/5/10/1749540301287/video.mp4",
// //       isVideo: true,
// //       likes: "5.8k",
// //       comments: "321",
// //       caption: "Precision in motion. Industrial performance showcase. ⚡ #Industrial #Precision"
// //     },
// //     {
// //       id: 3,
// //       image: "https://bynder.sbdinc.com/m/4cf9ca3edbb8c6a1/Drupal_Medium-DCH614B_A2.jpg",
// //       likes: "1.9k",
// //       comments: "86",
// //       caption: "SDS MAX Brushless combination rotary hammer performance. 💪 #Hammer #Construction"
// //     },
// //     {
// //       id: 4,
// //       image: "https://bynder.sbdinc.com/m/3de38f37cc83dcf1/Drupal_Large-DCH293X2_A1.jpg",
// //       likes: "3.2k",
// //       comments: "198",
// //       caption: "Cordless SDS PLUS L-shape rotary hammer. Ultimate mobility. 🏗️ #Cordless #RotaryHammer"
// //     },
// //     {
// //       id: 5,
// //       image: "https://bscpowertools.com/wp-content/uploads/2023/12/BSC-KS-350-min.jpg",
// //       likes: "2.1k",
// //       comments: "94",
// //       caption: "High-capacity knapsack sprayers for professional forestry. Excellence by BSC Power. 🌲 #Sprayer #Forestry"
// //     },
// //     {
// //       id: 6,
// //       image: "https://bscpowertools.com/wp-content/uploads/2023/12/BSC-BS-20L-min.jpg",
// //       likes: "1.5k",
// //       comments: "112",
// //       caption: "Our Trusted Platform for verified industrial gear. Quality you can build on. 🏗️ #Trusted #Engineering"
// //     }
// //   ];

// //   return (
// //     <section style={{ padding: '64px 0', background: '#f9fafb' }}>
// //       <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

// //         {/* Header Section */}
// //         <div style={{ textAlign: 'center', marginBottom: '48px' }}>
// //           <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#111', color: '#fff', padding: '8px 24px', borderRadius: '0', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
// //             <ShieldCheck size={14} style={{ color: '#dc2626' }} />
// //             <span>Certified Industrial Marketplace</span>
// //           </div>

// //           <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#111', textTransform: 'uppercase', letterSpacing: '-0.04em', marginBottom: '24px' }}>
// //             TRUSTED <span style={{ color: '#dc2626' }}>TRADING HUB</span>
// //           </h2>

// //           <div style={{ maxWidth: '700px', margin: '0 auto', background: '#fff', padding: '24px', borderRadius: '0', border: '1px solid #f0f0f0', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
// //             <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#111', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
// //                Our <span style={{ color: '#dc2626' }}>Trusted Platform</span> where you can <br />
// //                <span style={{ background: '#dc2626', color: '#fff', padding: '2px 8px', borderRadius: '0', margin: '0 4px', display: 'inline-block' }}>BUY & SELL</span> any Industrial Equipment <br />
// //                with <span style={{ color: '#dc2626', textDecoration: 'underline', textUnderlineOffset: '6px' }}>100% CONFIDENCE.</span>
// //             </p>
// //           </div>
// //         </div>

// //         {/* Instagram Grid */}
// //         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', marginBottom: '48px' }}>
// //           {instagramPosts.map((post) => (
// //             <a
// //               key={post.id}
// //               href="https://www.instagram.com/dushyant_power_tools_sidhi/"
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               style={{ position: 'relative', aspectRatio: '1/1', borderRadius: '0', overflow: 'hidden', display: 'block', textDecoration: 'none' }}
// //             >
// //               {post.isVideo ? (
// //                 <video src={post.video} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
// //               ) : (
// //                 <img src={post.image} alt={post.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
// //               )}
// //               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)', display: 'flex', flexDirection: 'column', justifyContent: 'end', padding: '12px' }}>
// //                 <p style={{ color: '#fff', fontSize: '9px', fontWeight: 600, marginBottom: '6px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{post.caption}</p>
// //                 <div style={{ display: 'flex', gap: '10px', color: 'rgba(255,255,255,0.8)', fontSize: '9px', fontWeight: 700 }}>
// //                   <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Heart size={10} /> {post.likes}</span>
// //                   <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MessageCircle size={10} /> {post.comments}</span>
// //                 </div>
// //               </div>
// //             </a>
// //           ))}
// //         </div>

// //         {/* Company Feature Cards */}
// //         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
// //           {/* Card 1 */}
// //           <div style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', borderRadius: '0', padding: '32px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
// //             <div style={{ position: 'relative', zIndex: 1 }}>
// //               <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
// //                 <div style={{ width: '56px', height: '56px', background: 'rgba(255,255,255,0.2)', borderRadius: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.3)' }}>
// //                   <Building2 size={24} />
// //                 </div>
// //                 <div>
// //                   <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '2px', textTransform: 'uppercase' }}>Dushyant Power Tools</h3>
// //                   <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', fontWeight: 700, textTransform: 'uppercase' }}>Industrial Equipment Supplier</p>
// //                 </div>
// //               </div>
// //               <p style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '24px', fontWeight: 600 }}>Your trusted partner for professional power tools, industrial equipment, and genuine spare parts in Sidhi, MP.</p>
// //               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>
// //                 <MapPin size={12} /> <span>45, Sidhi, Madhya Pradesh 486661</span>
// //               </div>
// //               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
// //                 <a href="https://www.instagram.com/dushyant_power_tools_sidhi/" style={{ background: '#fff', color: '#dc2626', padding: '10px 16px', borderRadius: '0', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
// //                   <Instagram size={14} /> Follow @sidhi
// //                 </a>
// //                 <a href="tel:+919754015503" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '10px 16px', borderRadius: '0', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(255,255,255,0.3)' }}>
// //                   <Phone size={14} /> Call Now
// //                 </a>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Card 2 */}
// //           <div style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)', borderRadius: '0', padding: '32px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
// //             <div style={{ position: 'relative', zIndex: 1 }}>
// //               <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
// //                 <div style={{ width: '56px', height: '56px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.3)' }}>
// //                   <Building2 size={24} />
// //                 </div>
// //                 <div>
// //                   <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '2px', textTransform: 'uppercase' }}>Dushyant Furniture Mart</h3>
// //                   <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', fontWeight: 700, textTransform: 'uppercase' }}>Premium Home & Office Furniture</p>
// //                 </div>
// //               </div>
// //               <p style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '24px', fontWeight: 600 }}>Since 2009, crafting premium wooden furniture for homes and offices in Sidhi. Quality craftsmanship meets modern design.</p>
// //               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>
// //                 <MapPin size={12} /> <span>45, Sidhi, Madhya Pradesh 486661</span>
// //               </div>
// //               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
// //                 <a href="https://www.instagram.com/dushyant_furniture_mart/" style={{ background: '#fff', color: '#ea580c', padding: '10px 16px', borderRadius: '8px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
// //                   <Instagram size={14} /> Follow @furniture
// //                 </a>
// //                 <a href="tel:+919754015503" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '10px 16px', borderRadius: '8px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(255,255,255,0.3)' }}>
// //                   <Phone size={14} /> Call Now
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Global Follow Button */}
// //         <div style={{ textAlign: 'center' }}>
// //           <a href="https://www.instagram.com/dushyant_power_tools_sidhi/" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'linear-gradient(to r, #833ab4, #fd1d1d, #fcb045)', color: '#fff', padding: '16px 40px', borderRadius: '0', fontWeight: 900, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', boxShadow: '0 10px 30px rgba(253, 29, 29, 0.2)' }}>
// //             <Instagram size={24} /> Follow All Instagram Pages
// //           </a>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default InstagramMicrosSection;

// import React, { useState, useEffect, useRef } from "react";
// import {
//   Home,
//   Users,
//   Star,
//   Phone,
//   MapPin,
//   Award,
//   Shield,
//   Lock, // ✅ added
//   Truck,
//   Clock,
//   CheckCircle,
//   ChevronRight,
//   ChevronLeft,
//   X,
//   ExternalLink,
//   Mail,
//   Globe,
//   ThumbsUp,
//   MessageCircle,
//   ShoppingCart,
//   Eye,
//   Heart,
//   TrendingUp,
//   Search,
//   Filter,
//   Menu,
//   Layers,
//   Settings,
//   Wrench,
//   Zap,
//   AlertCircle,
//   User,
//   Briefcase,
//   Building,
//   Calendar,
//   FileText,
//   Video,
//   Image,
//   Link,
//   ArrowRight,
//   ArrowLeft,
//   Play,
//   Download,
//   Share2,
//   BookOpen,
//   Clipboard,
//   LifeBuoy,
//   Package,
//   Percent,
//   Headphones,
//   Instagram, // <-- added
//   Youtube, // also used
//   Facebook,
// } from "lucide-react";

// // ------------------------------------------------------------
// // MOCK DATA
// // ------------------------------------------------------------
// const categories = [
//   { id: 1, name: "Power Tools", icon: Wrench, color: "#dc2626" },
//   { id: 2, name: "Industrial Machinery", icon: Settings, color: "#2563eb" },
//   { id: 3, name: "Spare Parts", icon: Package, color: "#16a34a" },
//   { id: 4, name: "Construction Equipment", icon: Building, color: "#7c3aed" },
//   { id: 5, name: "Electrical Tools", icon: Zap, color: "#f59e0b" },
//   { id: 6, name: "Agriculture Equipment", icon: Truck, color: "#14b8a6" },
//   // { id: 7, name: "Hand Tools", icon: Tool, color: "#ef4444" },
//   { id: 8, name: "Safety Equipment", icon: Shield, color: "#8b5cf6" },
// ];

// const products = [
//   {
//     id: 1,
//     name: "DeWalt SDS MAX Brushless Hammer",
//     brand: "DeWalt",
//     rating: 4.9,
//     reviews: 124,
//     views: 12400,
//     price: "₹24,500 – ₹32,000",
//     image: "https://via.placeholder.com/300x200?text=DeWalt+Hammer",
//     verified: true,
//     warranty: "3 years",
//     inStock: true,
//     seller: "ProTool Solutions",
//     applications: ["Concrete drilling", "Demolition", "Chiseling"],
//     specs: { power: "1200W", maxImpact: "5.0J", speed: "850 rpm" },
//     description:
//       "High-performance rotary hammer with brushless motor for extended runtime and durability.",
//   },
//   {
//     id: 2,
//     name: "Hilti Cordless Rotary Hammer",
//     brand: "Hilti",
//     rating: 4.8,
//     reviews: 89,
//     views: 8900,
//     price: "₹45,000 – ₹52,000",
//     image: "https://via.placeholder.com/300x200?text=Hilti+Rotary",
//     verified: true,
//     warranty: "5 years",
//     inStock: true,
//     seller: "Hilti India",
//     applications: ["Rebar drilling", "Anchor setting"],
//     specs: { battery: "22V", impact: "4.5J", weight: "3.2kg" },
//     description:
//       "Cordless hammer with active vibration reduction for comfortable all-day use.",
//   },
//   {
//     id: 3,
//     name: "Makita Impact Drill",
//     brand: "Makita",
//     rating: 4.7,
//     reviews: 210,
//     views: 15600,
//     price: "₹12,000 – ₹18,500",
//     image: "https://via.placeholder.com/300x200?text=Makita+Drill",
//     verified: true,
//     warranty: "2 years",
//     inStock: true,
//     seller: "Makita Dealer",
//     applications: ["Woodworking", "Metal drilling", "Screw driving"],
//     specs: { rpm: "0-2200", torque: "40Nm", battery: "18V" },
//     description:
//       "Compact impact drill with high torque and variable speed control.",
//   },
//   {
//     id: 4,
//     name: "Bosch GSB 1800-LI Professional",
//     brand: "Bosch",
//     rating: 4.6,
//     reviews: 340,
//     views: 20200,
//     price: "₹8,900 – ₹11,200",
//     image: "https://via.placeholder.com/300x200?text=Bosch+GSB",
//     verified: true,
//     warranty: "2 years",
//     inStock: true,
//     seller: "Bosch Professional",
//     applications: ["Drilling", "Screwdriving", "Light hammering"],
//     specs: { rpm: "0-1900", torque: "30Nm", weight: "1.4kg" },
//     description:
//       "Versatile 2‑speed drill with Electronic Cell Protection for longer battery life.",
//   },
// ];

// const companies = [
//   {
//     id: 1,
//     name: "Dushyant Power Tools",
//     logo: "https://via.placeholder.com/80x80?text=DPT",
//     rating: 4.9,
//     reviews: 342,
//     since: 2014,
//     type: "Industrial Supplier",
//     productsCount: 500,
//     customers: 1200,
//     gst: true,
//     location: "Indore, Madhya Pradesh",
//     phone: "+91 98765 43210",
//     email: "info@dushyanttools.in",
//     website: "dushyanttools.in",
//     about:
//       "Dushyant Power Tools is a leading supplier of industrial power tools and equipment in Central India. With over a decade of experience, we serve contractors, workshops, and manufacturing units with genuine products and competitive prices.",
//     history:
//       "Founded in 2014 by Mr. Dushyant Singh, we started as a small retail shop and have grown into a trusted name with a wide distribution network.",
//     owner: "Mr. Dushyant Singh",
//     mission:
//       "To empower Indian industries with reliable, high-performance tools at affordable prices.",
//     vision: "To be the most preferred industrial tool partner in India.",
//     certifications: ["GST Verified", "MSME Registered", "ISO 9001:2015"],
//     brands: ["Makita", "DeWalt", "Bosch", "Hilti"],
//     categories: ["Power Tools", "Hand Tools", "Spare Parts"],
//     gallery: ["image1.jpg", "image2.jpg", "image3.jpg"],
//     team: ["Mr. Dushyant Singh (Owner)", "Mr. Ravi Gupta (Sales Head)"],
//     reviewsList: [
//       {
//         user: "Rajesh Patel",
//         rating: 5,
//         comment: "Best Power Tools Supplier in MP.",
//       },
//       { user: "Amit Singh", rating: 5, comment: "Genuine Products." },
//       { user: "Rohit Sharma", rating: 5, comment: "Excellent Support." },
//     ],
//     faqs: [
//       {
//         q: "Do you provide warranty?",
//         a: "Yes, we provide manufacturer warranty on all products.",
//       },
//       {
//         q: "Do you deliver pan-India?",
//         a: "Yes, we ship across India with reliable logistics.",
//       },
//     ],
//     social: {
//       facebook: "fb.com/dushyanttools",
//       instagram: "insta.com/dushyanttools",
//     },
//     hours: "Mon-Sat 9:00 AM – 7:00 PM",
//     map: "https://maps.google.com/maps?q=Indore",
//   },
//   {
//     id: 2,
//     name: "Dushyant Furniture Mart",
//     logo: "https://via.placeholder.com/80x80?text=DFM",
//     rating: 4.7,
//     reviews: 215,
//     since: 2016,
//     type: "Furniture Manufacturer",
//     productsCount: 200,
//     customers: 800,
//     gst: true,
//     location: "Bhopal, Madhya Pradesh",
//     phone: "+91 98765 43211",
//     email: "info@dushyantfurniture.in",
//     website: "dushyantfurniture.in",
//     about:
//       "Dushyant Furniture Mart manufactures high-quality office and home furniture with modern designs.",
//     history:
//       "Established in 2016, we have grown from a small workshop to a full-fledged manufacturing unit.",
//     owner: "Mr. Dushyant Sharma",
//     mission: "To craft furniture that combines aesthetics with durability.",
//     vision: "To be a national leader in furniture innovation.",
//     certifications: ["GST Verified", "MSME Registered"],
//     brands: ["Dushyant", "RoyalOak"],
//     categories: ["Office Furniture", "Home Furniture", "Cabinets"],
//     gallery: ["furniture1.jpg", "furniture2.jpg"],
//     team: ["Mr. Dushyant Sharma (Owner)", "Mrs. Priya Sharma (Design Head)"],
//     reviewsList: [
//       { user: "Sunil Kumar", rating: 5, comment: "Excellent craftsmanship." },
//       {
//         user: "Anita Reddy",
//         rating: 4,
//         comment: "Good quality, delivery on time.",
//       },
//     ],
//     faqs: [
//       {
//         q: "Do you customise?",
//         a: "Yes, we offer custom designs as per client requirements.",
//       },
//     ],
//     social: { facebook: "fb.com/dushyantfurniture" },
//     hours: "Mon-Sat 10:00 AM – 6:00 PM",
//     map: "https://maps.google.com/maps?q=Bhopal",
//   },
// ];

// const brands = [
//   "Makita",
//   "Bosch",
//   "DeWalt",
//   "Hilti",
//   "Stanley",
//   "Ingco",
//   "BSC",
//   "Hitachi",
// ];

// const featuresList = [
//   { icon: ShoppingCart, label: "Buy Equipment" },
//   // { icon: RefreshCw, label: "Sell Used Tools" },
//   { icon: Wrench, label: "Repair Services" },
//   { icon: Truck, label: "Rental Equipment" },
//   { icon: FileText, label: "Request Quotation" },
//   { icon: Package, label: "Bulk Orders" },
//   { icon: Users, label: "Dealer Network" },
//   { icon: Building, label: "Contractor Directory" },
// ];

// const resources = [
//   "Buying Guide",
//   "Maintenance Guide",
//   "Safety Tips",
//   "How-to Videos",
//   "Industrial News",
//   "Product Comparison",
// ];

// const trustBadges = [
//   { icon: Shield, label: "GST Registered" },
//   { icon: Shield, label: "Verified Seller" },
//   { icon: Lock, label: "Secure Payments" },
//   { icon: CheckCircle, label: "100% Genuine Products" },
//   { icon: Truck, label: "Fast Delivery" },
//   { icon: Award, label: "Warranty Support" },
//   // { icon: RefreshCw, label: "Easy Returns" },
//   { icon: Award, label: "ISO Certified" },
// ];

// // ------------------------------------------------------------
// // ANIMATED COUNTER HOOK
// // ------------------------------------------------------------
// const useCounter = (end, duration = 2000) => {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const hasAnimated = useRef(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !hasAnimated.current) {
//           hasAnimated.current = true;
//           let start = 0;
//           const increment = end / (duration / 16);
//           const timer = setInterval(() => {
//             start += increment;
//             if (start >= end) {
//               setCount(end);
//               clearInterval(timer);
//             } else {
//               setCount(Math.floor(start));
//             }
//           }, 16);
//           return () => clearInterval(timer);
//         }
//       },
//       { threshold: 0.5 },
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [end, duration]);

//   return [count, ref];
// };

// // ------------------------------------------------------------
// // MAIN COMPONENT
// // ------------------------------------------------------------
// const IndustrialMarketplace = () => {
//   // ---------- State ----------
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedCompany, setSelectedCompany] = useState(null);
//   const [brandIndex, setBrandIndex] = useState(0);
//   const [activeTab, setActiveTab] = useState("overview"); // for product modal
//   const [companyTab, setCompanyTab] = useState("about");

//   // Counters
//   const [verifiedProducts] = useCounter(25000);
//   const [contractors] = useCounter(2100);
//   const [suppliers] = useCounter(500);
//   const [states] = useCounter(18);
//   const [rating] = useCounter(4.9);
//   const [support] = useCounter(24);

//   // ---------- Handlers ----------
//   const openProductModal = (product) => {
//     setSelectedProduct(product);
//     setActiveTab("overview");
//     document.body.style.overflow = "hidden";
//   };
//   const closeProductModal = () => {
//     setSelectedProduct(null);
//     document.body.style.overflow = "auto";
//   };

//   const openCompanyModal = (company) => {
//     setSelectedCompany(company);
//     setCompanyTab("about");
//     document.body.style.overflow = "hidden";
//   };
//   const closeCompanyModal = () => {
//     setSelectedCompany(null);
//     document.body.style.overflow = "auto";
//   };

//   const nextBrand = () => {
//     setBrandIndex((prev) => (prev + 4 >= brands.length ? 0 : prev + 1));
//   };
//   const prevBrand = () => {
//     setBrandIndex((prev) =>
//       prev - 1 < 0 ? Math.max(0, brands.length - 4) : prev - 1,
//     );
//   };

//   // ---------- Render ----------
//   return (
//     <div style={{ fontFamily: "Inter, sans-serif", background: "#f8fafc" }}>
//       {/* ========== HERO SECTION ========== */}
//       <section
//         style={{
//           padding: "60px 0 40px",
//           background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
//           color: "#fff",
//         }}
//       >
//         <div
//           style={{
//             maxWidth: "1200px",
//             margin: "0 auto",
//             padding: "0 24px",
//             textAlign: "center",
//           }}
//         >
//           <div
//             style={{
//               display: "inline-block",
//               background: "rgba(220, 38, 38, 0.2)",
//               padding: "6px 20px",
//               borderRadius: "100px",
//               marginBottom: "16px",
//             }}
//           >
//             <span
//               style={{
//                 fontSize: "12px",
//                 fontWeight: 700,
//                 textTransform: "uppercase",
//                 letterSpacing: "0.06em",
//                 color: "#dc2626",
//               }}
//             >
//               🏭 Certified Industrial Marketplace
//             </span>
//           </div>
//           <h1
//             style={{
//               fontSize: "clamp(2rem, 5vw, 3.2rem)",
//               fontWeight: 900,
//               lineHeight: 1.2,
//               marginBottom: "16px",
//             }}
//           >
//             India's Trusted Digital Marketplace for Professional Tools,
//             <br />
//             <span style={{ color: "#dc2626" }}>
//               Industrial Equipment & Verified Suppliers
//             </span>
//           </h1>
//           <p
//             style={{
//               fontSize: "1.2rem",
//               color: "#cbd5e1",
//               maxWidth: "700px",
//               margin: "0 auto 32px",
//             }}
//           >
//             Buy • Sell • Repair • Connect — All in One Trusted Platform
//           </p>

//           {/* Stats */}
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               justifyContent: "center",
//               gap: "24px 48px",
//               marginTop: "32px",
//             }}
//           >
//             <StatItem
//               label="Verified Products"
//               value={verifiedProducts + "+"}
//             />
//             <StatItem label="Verified Contractors" value={contractors + "+"} />
//             <StatItem label="Trusted Suppliers" value={suppliers + "+"} />
//             <StatItem label="States Served" value={states + "+"} />
//             <StatItem label="Average Rating" value={rating + "★"} />
//             <StatItem label="24/7 Support" value="24/7" />
//           </div>
//         </div>
//       </section>

//       {/* ========== CATEGORIES ========== */}
//       <section style={{ padding: "60px 0", background: "#fff" }}>
//         <div
//           style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
//         >
//           <h2
//             style={{
//               fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
//               fontWeight: 800,
//               textAlign: "center",
//               marginBottom: "8px",
//             }}
//           >
//             Marketplace Categories
//           </h2>
//           <p
//             style={{
//               textAlign: "center",
//               color: "#64748b",
//               marginBottom: "40px",
//             }}
//           >
//             Find the right tools and equipment for your industry
//           </p>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
//               gap: "20px",
//             }}
//           >
//             {categories.map((cat) => {
//               const Icon = cat.icon;
//               return (
//                 <div
//                   key={cat.id}
//                   style={{
//                     background: "#f8fafc",
//                     padding: "24px 16px",
//                     borderRadius: "12px",
//                     textAlign: "center",
//                     cursor: "pointer",
//                     transition: "all 0.3s",
//                     border: "1px solid transparent",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = "translateY(-6px)";
//                     e.currentTarget.style.boxShadow =
//                       "0 12px 24px rgba(0,0,0,0.06)";
//                     e.currentTarget.style.borderColor = cat.color;
//                     e.currentTarget.style.background = "#fff";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "translateY(0)";
//                     e.currentTarget.style.boxShadow = "none";
//                     e.currentTarget.style.borderColor = "transparent";
//                     e.currentTarget.style.background = "#f8fafc";
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "inline-flex",
//                       padding: "12px",
//                       borderRadius: "50%",
//                       background: "#eef2ff",
//                       color: cat.color,
//                       marginBottom: "12px",
//                     }}
//                   >
//                     <Icon size={28} />
//                   </div>
//                   <h3
//                     style={{
//                       fontSize: "0.95rem",
//                       fontWeight: 600,
//                       color: "#0f172a",
//                     }}
//                   >
//                     {cat.name}
//                   </h3>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ========== INDUSTRIAL FEED (Products) ========== */}
//       <section style={{ padding: "60px 0", background: "#f1f5f9" }}>
//         <div
//           style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "32px",
//             }}
//           >
//             <h2
//               style={{
//                 fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
//                 fontWeight: 800,
//               }}
//             >
//               Industrial Feed
//             </h2>
//             <button
//               style={{
//                 background: "none",
//                 border: "none",
//                 color: "#dc2626",
//                 fontWeight: 600,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "4px",
//                 cursor: "pointer",
//               }}
//             >
//               View All <ChevronRight size={18} />
//             </button>
//           </div>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//               gap: "24px",
//             }}
//           >
//             {products.map((product) => (
//               <div
//                 key={product.id}
//                 style={{
//                   background: "#fff",
//                   borderRadius: "16px",
//                   overflow: "hidden",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
//                   cursor: "pointer",
//                   transition: "transform 0.2s",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.transform = "translateY(-4px)")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.transform = "translateY(0)")
//                 }
//                 onClick={() => openProductModal(product)}
//               >
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   style={{ width: "100%", height: "180px", objectFit: "cover" }}
//                 />
//                 <div style={{ padding: "16px 20px" }}>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       marginBottom: "6px",
//                     }}
//                   >
//                     <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>
//                       {product.name}
//                     </h3>
//                     {product.verified && (
//                       <span
//                         style={{
//                           background: "#dc2626",
//                           color: "#fff",
//                           fontSize: "10px",
//                           fontWeight: 700,
//                           padding: "2px 8px",
//                           borderRadius: "100px",
//                         }}
//                       >
//                         Verified
//                       </span>
//                     )}
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "6px",
//                       marginBottom: "4px",
//                     }}
//                   >
//                     <span style={{ color: "#f59e0b" }}>★★★★★</span>
//                     <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
//                       ({product.reviews})
//                     </span>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       fontSize: "0.85rem",
//                       color: "#475569",
//                     }}
//                   >
//                     <span>{product.views.toLocaleString()} Views</span>
//                     <span style={{ color: "#16a34a", fontWeight: 600 }}>
//                       {product.inStock ? "Available" : "Out of Stock"}
//                     </span>
//                   </div>
//                   <div
//                     style={{
//                       marginTop: "12px",
//                       display: "flex",
//                       gap: "8px",
//                       flexWrap: "wrap",
//                     }}
//                   >
//                     <span
//                       style={{
//                         background: "#eef2ff",
//                         padding: "4px 10px",
//                         borderRadius: "100px",
//                         fontSize: "0.75rem",
//                         fontWeight: 600,
//                       }}
//                     >
//                       Learn More
//                     </span>
//                     {product.warranty && (
//                       <span
//                         style={{
//                           background: "#fef2f2",
//                           padding: "4px 10px",
//                           borderRadius: "100px",
//                           fontSize: "0.75rem",
//                           fontWeight: 600,
//                           color: "#dc2626",
//                         }}
//                       >
//                         {product.warranty}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ========== BUSINESS DIRECTORY ========== */}
//       <section style={{ padding: "60px 0", background: "#fff" }}>
//         <div
//           style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
//         >
//           <h2
//             style={{
//               fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
//               fontWeight: 800,
//               textAlign: "center",
//               marginBottom: "8px",
//             }}
//           >
//             Business Directory
//           </h2>
//           <p
//             style={{
//               textAlign: "center",
//               color: "#64748b",
//               marginBottom: "40px",
//             }}
//           >
//             Trusted suppliers and contractors across India
//           </p>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
//               gap: "24px",
//             }}
//           >
//             {companies.map((company) => (
//               <div
//                 key={company.id}
//                 style={{
//                   background: "#f8fafc",
//                   borderRadius: "16px",
//                   padding: "24px",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
//                   cursor: "pointer",
//                   transition: "transform 0.2s",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.transform = "translateY(-4px)")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.transform = "translateY(0)")
//                 }
//                 onClick={() => openCompanyModal(company)}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "16px",
//                     marginBottom: "16px",
//                   }}
//                 >
//                   <img
//                     src={company.logo}
//                     alt={company.name}
//                     style={{
//                       width: "64px",
//                       height: "64px",
//                       borderRadius: "12px",
//                       objectFit: "cover",
//                     }}
//                   />
//                   <div>
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "8px",
//                       }}
//                     >
//                       <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
//                         {company.name}
//                       </h3>
//                       <span
//                         style={{
//                           background: "#16a34a",
//                           color: "#fff",
//                           fontSize: "10px",
//                           fontWeight: 700,
//                           padding: "2px 8px",
//                           borderRadius: "100px",
//                         }}
//                       >
//                         Verified
//                       </span>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "4px",
//                         color: "#f59e0b",
//                       }}
//                     >
//                       <span>★★★★★</span>
//                       <span style={{ color: "#64748b", fontSize: "0.85rem" }}>
//                         ({company.reviews})
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div style={{ fontSize: "0.9rem", color: "#475569" }}>
//                   <div>🏢 {company.type}</div>
//                   <div>📅 Since {company.since}</div>
//                   <div>📦 {company.productsCount}+ Products</div>
//                   <div>👥 {company.customers}+ Customers</div>
//                   <div>📍 {company.location}</div>
//                 </div>
//                 <div
//                   style={{
//                     marginTop: "16px",
//                     display: "flex",
//                     gap: "8px",
//                     flexWrap: "wrap",
//                   }}
//                 >
//                   <span
//                     style={{
//                       background: "#dbeafe",
//                       padding: "4px 12px",
//                       borderRadius: "100px",
//                       fontSize: "0.75rem",
//                       fontWeight: 600,
//                     }}
//                   >
//                     GST Verified
//                   </span>
//                   <span
//                     style={{
//                       background: "#fef2f2",
//                       padding: "4px 12px",
//                       borderRadius: "100px",
//                       fontSize: "0.75rem",
//                       fontWeight: 600,
//                       color: "#dc2626",
//                     }}
//                   >
//                     Follow
//                   </span>
//                   <span
//                     style={{
//                       background: "#dcfce7",
//                       padding: "4px 12px",
//                       borderRadius: "100px",
//                       fontSize: "0.75rem",
//                       fontWeight: 600,
//                       color: "#16a34a",
//                     }}
//                   >
//                     Call
//                   </span>
//                   <span
//                     style={{
//                       background: "#f3e8ff",
//                       padding: "4px 12px",
//                       borderRadius: "100px",
//                       fontSize: "0.75rem",
//                       fontWeight: 600,
//                       color: "#7c3aed",
//                     }}
//                   >
//                     WhatsApp
//                   </span>
//                   <span
//                     style={{
//                       background: "#fce7f3",
//                       padding: "4px 12px",
//                       borderRadius: "100px",
//                       fontSize: "0.75rem",
//                       fontWeight: 600,
//                       color: "#db2777",
//                     }}
//                   >
//                     View Store
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ========== TRUST SECTION ========== */}
//       <section style={{ padding: "48px 0", background: "#f1f5f9" }}>
//         <div
//           style={{
//             maxWidth: "1200px",
//             margin: "0 auto",
//             padding: "0 24px",
//             textAlign: "center",
//           }}
//         >
//           <h2
//             style={{
//               fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
//               fontWeight: 800,
//               marginBottom: "32px",
//             }}
//           >
//             Trusted by Industry Professionals
//           </h2>
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               justifyContent: "center",
//               gap: "24px 40px",
//             }}
//           >
//             {trustBadges.map((item, idx) => {
//               const Icon = item.icon;
//               return (
//                 <div
//                   key={idx}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                     fontSize: "0.95rem",
//                     fontWeight: 500,
//                   }}
//                 >
//                   <Icon size={20} color="#dc2626" />
//                   <span>{item.label}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ========== POPULAR BRANDS CAROUSEL ========== */}
//       <section style={{ padding: "48px 0", background: "#fff" }}>
//         <div
//           style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
//         >
//           <h2
//             style={{
//               fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
//               fontWeight: 800,
//               textAlign: "center",
//               marginBottom: "32px",
//             }}
//           >
//             Popular Brands
//           </h2>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: "16px",
//             }}
//           >
//             <button
//               onClick={prevBrand}
//               style={{
//                 background: "#e2e8f0",
//                 border: "none",
//                 borderRadius: "50%",
//                 width: "40px",
//                 height: "40px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 cursor: "pointer",
//               }}
//             >
//               <ChevronLeft size={20} />
//             </button>
//             <div
//               style={{
//                 display: "flex",
//                 gap: "24px",
//                 overflow: "hidden",
//                 flex: 1,
//                 justifyContent: "center",
//               }}
//             >
//               {brands.slice(brandIndex, brandIndex + 4).map((brand, idx) => (
//                 <div
//                   key={idx}
//                   style={{
//                     background: "#f8fafc",
//                     padding: "16px 32px",
//                     borderRadius: "12px",
//                     fontWeight: 700,
//                     fontSize: "1.2rem",
//                     color: "#0f172a",
//                     border: "1px solid #e2e8f0",
//                   }}
//                 >
//                   {brand}
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={nextBrand}
//               style={{
//                 background: "#e2e8f0",
//                 border: "none",
//                 borderRadius: "50%",
//                 width: "40px",
//                 height: "40px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 cursor: "pointer",
//               }}
//             >
//               <ChevronRight size={20} />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ========== MARKETPLACE FEATURES ========== */}
//       <section style={{ padding: "48px 0", background: "#f8fafc" }}>
//         <div
//           style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
//         >
//           <h2
//             style={{
//               fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
//               fontWeight: 800,
//               textAlign: "center",
//               marginBottom: "32px",
//             }}
//           >
//             Marketplace Features
//           </h2>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
//               gap: "16px",
//             }}
//           >
//             {featuresList.map((item, idx) => {
//               const Icon = item.icon;
//               return (
//                 <div
//                   key={idx}
//                   style={{
//                     background: "#fff",
//                     padding: "20px 12px",
//                     borderRadius: "12px",
//                     textAlign: "center",
//                     boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
//                     border: "1px solid transparent",
//                     transition: "all 0.2s",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.borderColor = "#dc2626";
//                     e.currentTarget.style.transform = "translateY(-4px)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.borderColor = "transparent";
//                     e.currentTarget.style.transform = "translateY(0)";
//                   }}
//                 >
//                   <Icon
//                     size={28}
//                     color="#dc2626"
//                     style={{ marginBottom: "8px" }}
//                   />
//                   <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>
//                     {item.label}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ========== INTERACTIVE MAP (placeholder) ========== */}
//       <section style={{ padding: "48px 0", background: "#fff" }}>
//         <div
//           style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
//         >
//           <h2
//             style={{
//               fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
//               fontWeight: 800,
//               textAlign: "center",
//               marginBottom: "8px",
//             }}
//           >
//             Suppliers Across India
//           </h2>
//           <p
//             style={{
//               textAlign: "center",
//               color: "#64748b",
//               marginBottom: "24px",
//             }}
//           >
//             Click on a state to find suppliers
//           </p>
//           <div
//             style={{
//               background: "#e2e8f0",
//               borderRadius: "16px",
//               padding: "60px 20px",
//               textAlign: "center",
//               color: "#475569",
//               minHeight: "200px",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <MapPin size={48} color="#dc2626" />
//             <p style={{ marginTop: "12px" }}>Interactive Map (Placeholder)</p>
//             <p style={{ fontSize: "0.9rem" }}>
//               States: Madhya Pradesh, Delhi, Maharashtra, Gujarat, Punjab,
//               Rajasthan, and more.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ========== RESOURCES ========== */}
//       <section style={{ padding: "48px 0", background: "#f8fafc" }}>
//         <div
//           style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
//         >
//           <h2
//             style={{
//               fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
//               fontWeight: 800,
//               textAlign: "center",
//               marginBottom: "32px",
//             }}
//           >
//             Resources
//           </h2>
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               justifyContent: "center",
//               gap: "12px",
//             }}
//           >
//             {resources.map((item, idx) => (
//               <span
//                 key={idx}
//                 style={{
//                   background: "#fff",
//                   padding: "10px 24px",
//                   borderRadius: "100px",
//                   boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
//                   fontWeight: 500,
//                   cursor: "pointer",
//                   transition: "background 0.2s",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.background = "#dc2626")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.background = "#fff")
//                 }
//                 style={{
//                   background: "#fff",
//                   padding: "10px 24px",
//                   borderRadius: "100px",
//                   boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
//                   fontWeight: 500,
//                   cursor: "pointer",
//                   transition: "background 0.2s, color 0.2s",
//                   color: "#0f172a",
//                 }}
//               >
//                 {item}
//               </span>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ========== COMMUNITY ========== */}
//       <section style={{ padding: "48px 0", background: "#fff" }}>
//         <div
//           style={{
//             maxWidth: "1200px",
//             margin: "0 auto",
//             padding: "0 24px",
//             textAlign: "center",
//           }}
//         >
//           <h2
//             style={{
//               fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
//               fontWeight: 800,
//               marginBottom: "24px",
//             }}
//           >
//             Community
//           </h2>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               gap: "32px",
//               flexWrap: "wrap",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 cursor: "pointer",
//               }}
//             >
//               <Instagram size={28} color="#dc2626" /> Latest Instagram
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 cursor: "pointer",
//               }}
//             >
//               <Youtube size={28} color="#dc2626" /> YouTube Videos
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 cursor: "pointer",
//               }}
//             >
//               <Facebook size={28} color="#dc2626" /> Facebook Updates
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 cursor: "pointer",
//               }}
//             >
//               <Users size={28} color="#dc2626" /> Customer Stories
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ========== WHY CHOOSE US (integrated) ========== */}
//       <section style={{ padding: "60px 0", background: "#f1f5f9" }}>
//         <div
//           style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
//         >
//           <div style={{ textAlign: "center", marginBottom: "48px" }}>
//             <span
//               style={{
//                 fontSize: "10px",
//                 fontWeight: 800,
//                 textTransform: "uppercase",
//                 letterSpacing: "0.16em",
//                 color: "#dc2626",
//                 display: "block",
//                 marginBottom: "8px",
//               }}
//             >
//               Core Advantages
//             </span>
//             <h2
//               style={{
//                 fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
//                 fontWeight: 900,
//                 textTransform: "uppercase",
//                 letterSpacing: "-0.04em",
//                 color: "#111",
//               }}
//             >
//               Why <span style={{ color: "#dc2626" }}>Choose Us</span>
//             </h2>
//             <div
//               style={{
//                 width: "48px",
//                 height: "4px",
//                 background: "#dc2626",
//                 borderRadius: "0",
//                 margin: "16px auto 0",
//               }}
//             ></div>
//           </div>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//               gap: "16px",
//             }}
//           >
//             {[
//               { name: "High-quality professional tools", icon: Wrench },
//               // { name: "Affordable prices", icon: IndianRupee },
//               { name: "Reliable repair services", icon: Settings },
//               { name: "Trusted by local contractors", icon: Users },
//               { name: "Fast customer support", icon: Headphones },
//             ].map((item, idx) => {
//               const Icon = item.icon;
//               return (
//                 <div
//                   key={idx}
//                   style={{
//                     background: "#fff",
//                     padding: "32px 24px",
//                     borderRadius: "0",
//                     border: "2px solid #111",
//                     borderBottom: "6px solid #dc2626",
//                     textAlign: "center",
//                     transition: "transform 0.2s",
//                     boxShadow: "8px 8px 0px #111",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = "translateY(-4px)";
//                     e.currentTarget.style.boxShadow =
//                       "0 10px 25px rgba(0,0,0,0.05)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "translateY(0)";
//                     e.currentTarget.style.boxShadow = "none";
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: "56px",
//                       height: "56px",
//                       background: "#111",
//                       color: "#dc2626",
//                       borderRadius: "0",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       margin: "0 auto 24px",
//                       border: "2px solid #dc2626",
//                     }}
//                   >
//                     <Icon size={24} />
//                   </div>
//                   <h3
//                     style={{
//                       fontSize: "12px",
//                       fontWeight: 800,
//                       textTransform: "uppercase",
//                       letterSpacing: "0.05em",
//                       color: "#111",
//                       lineHeight: 1.4,
//                     }}
//                   >
//                     {item.name}
//                   </h3>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ========== CTA ========== */}
//       <section
//         style={{
//           padding: "60px 0",
//           background: "#0f172a",
//           color: "#fff",
//           textAlign: "center",
//         }}
//       >
//         <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 24px" }}>
//           <h2
//             style={{
//               fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
//               fontWeight: 900,
//               marginBottom: "16px",
//             }}
//           >
//             Ready to Grow Your Business?
//           </h2>
//           <p
//             style={{
//               fontSize: "1.1rem",
//               color: "#94a3b8",
//               marginBottom: "32px",
//             }}
//           >
//             Join India's Trusted Industrial Marketplace.
//           </p>
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               justifyContent: "center",
//               gap: "16px",
//             }}
//           >
//             <button
//               style={{
//                 background: "#dc2626",
//                 color: "#fff",
//                 border: "none",
//                 padding: "14px 32px",
//                 borderRadius: "100px",
//                 fontWeight: 700,
//                 fontSize: "1rem",
//                 cursor: "pointer",
//                 transition: "transform 0.2s",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.transform = "scale(1.05)")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.transform = "scale(1)")
//               }
//             >
//               Become a Verified Seller
//             </button>
//             <button
//               style={{
//                 background: "transparent",
//                 color: "#fff",
//                 border: "2px solid #fff",
//                 padding: "14px 32px",
//                 borderRadius: "100px",
//                 fontWeight: 700,
//                 fontSize: "1rem",
//                 cursor: "pointer",
//                 transition: "background 0.2s",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.background = "transparent")
//               }
//             >
//               Request a Quote
//             </button>
//             <button
//               style={{
//                 background: "#3b82f6",
//                 color: "#fff",
//                 border: "none",
//                 padding: "14px 32px",
//                 borderRadius: "100px",
//                 fontWeight: 700,
//                 fontSize: "1rem",
//                 cursor: "pointer",
//               }}
//             >
//               Explore Products
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ========== PRODUCT MODAL ========== */}
//       {selectedProduct && (
//         <Modal onClose={closeProductModal} title={selectedProduct.name}>
//           <div
//             style={{ display: "flex", flexDirection: "column", gap: "20px" }}
//           >
//             <img
//               src={selectedProduct.image}
//               alt={selectedProduct.name}
//               style={{
//                 width: "100%",
//                 maxHeight: "300px",
//                 objectFit: "cover",
//                 borderRadius: "12px",
//               }}
//             />
//             <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
//               <span
//                 style={{
//                   background: "#f1f5f9",
//                   padding: "4px 12px",
//                   borderRadius: "100px",
//                   fontSize: "0.85rem",
//                 }}
//               >
//                 {selectedProduct.brand}
//               </span>
//               <span
//                 style={{
//                   background: "#fef2f2",
//                   padding: "4px 12px",
//                   borderRadius: "100px",
//                   fontSize: "0.85rem",
//                   color: "#dc2626",
//                 }}
//               >
//                 ★★★★★ {selectedProduct.rating}
//               </span>
//               <span
//                 style={{
//                   background: "#dcfce7",
//                   padding: "4px 12px",
//                   borderRadius: "100px",
//                   fontSize: "0.85rem",
//                   color: "#16a34a",
//                 }}
//               >
//                 {selectedProduct.views.toLocaleString()} views
//               </span>
//             </div>
//             <p>
//               <strong>Price:</strong> {selectedProduct.price}
//             </p>
//             <p>
//               <strong>Warranty:</strong> {selectedProduct.warranty}
//             </p>
//             <p>
//               <strong>Applications:</strong>{" "}
//               {selectedProduct.applications.join(", ")}
//             </p>
//             <div>
//               <strong>Specifications:</strong>
//               <ul style={{ marginTop: "4px" }}>
//                 {Object.entries(selectedProduct.specs).map(([k, v]) => (
//                   <li key={k}>
//                     {k}: {v}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <p>{selectedProduct.description}</p>
//             <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
//               <button
//                 style={{
//                   background: "#dc2626",
//                   color: "#fff",
//                   border: "none",
//                   padding: "10px 24px",
//                   borderRadius: "100px",
//                   fontWeight: 600,
//                   cursor: "pointer",
//                 }}
//               >
//                 Request Quote
//               </button>
//               <button
//                 style={{
//                   background: "#3b82f6",
//                   color: "#fff",
//                   border: "none",
//                   padding: "10px 24px",
//                   borderRadius: "100px",
//                   fontWeight: 600,
//                   cursor: "pointer",
//                 }}
//               >
//                 Contact Seller
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* ========== COMPANY MODAL ========== */}
//       {selectedCompany && (
//         <Modal
//           onClose={closeCompanyModal}
//           title={selectedCompany.name}
//           size="lg"
//         >
//           <div
//             style={{ display: "flex", flexDirection: "column", gap: "20px" }}
//           >
//             <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//               <img
//                 src={selectedCompany.logo}
//                 alt={selectedCompany.name}
//                 style={{ width: "80px", height: "80px", borderRadius: "12px" }}
//               />
//               <div>
//                 <h3 style={{ fontSize: "1.4rem", fontWeight: 800 }}>
//                   {selectedCompany.name}
//                 </h3>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                     color: "#f59e0b",
//                   }}
//                 >
//                   <span>★★★★★</span>
//                   <span style={{ color: "#64748b" }}>
//                     ({selectedCompany.reviews} reviews)
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
//               {[
//                 "About",
//                 "History",
//                 "Owner",
//                 "Certifications",
//                 "Brands",
//                 "Products",
//                 "Gallery",
//                 "Reviews",
//                 "FAQs",
//                 "Map",
//               ].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setCompanyTab(tab.toLowerCase())}
//                   style={{
//                     background:
//                       companyTab === tab.toLowerCase() ? "#dc2626" : "#f1f5f9",
//                     color:
//                       companyTab === tab.toLowerCase() ? "#fff" : "#0f172a",
//                     border: "none",
//                     padding: "6px 16px",
//                     borderRadius: "100px",
//                     fontWeight: 600,
//                     fontSize: "0.8rem",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
//             <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "16px" }}>
//               {companyTab === "about" && <p>{selectedCompany.about}</p>}
//               {companyTab === "history" && <p>{selectedCompany.history}</p>}
//               {companyTab === "owner" && (
//                 <p>
//                   <strong>Owner:</strong> {selectedCompany.owner}
//                 </p>
//               )}
//               {companyTab === "certifications" && (
//                 <ul>
//                   {selectedCompany.certifications.map((c, i) => (
//                     <li key={i}>{c}</li>
//                   ))}
//                 </ul>
//               )}
//               {companyTab === "brands" && (
//                 <div style={{ display: "flex", gap: "8px" }}>
//                   {selectedCompany.brands.map((b, i) => (
//                     <span
//                       key={i}
//                       style={{
//                         background: "#e2e8f0",
//                         padding: "4px 12px",
//                         borderRadius: "100px",
//                       }}
//                     >
//                       {b}
//                     </span>
//                   ))}
//                 </div>
//               )}
//               {companyTab === "products" && (
//                 <span>{selectedCompany.productsCount} products</span>
//               )}
//               {companyTab === "gallery" && (
//                 <div style={{ display: "flex", gap: "8px" }}>
//                   {selectedCompany.gallery.map((g, i) => (
//                     <img
//                       key={i}
//                       src={`https://via.placeholder.com/100x100?text=${g}`}
//                       alt="gallery"
//                       style={{
//                         width: "100px",
//                         height: "100px",
//                         objectFit: "cover",
//                         borderRadius: "8px",
//                       }}
//                     />
//                   ))}
//                 </div>
//               )}
//               {companyTab === "reviews" && (
//                 <div>
//                   {selectedCompany.reviewsList.map((r, i) => (
//                     <div
//                       key={i}
//                       style={{
//                         background: "#f8fafc",
//                         padding: "12px",
//                         borderRadius: "8px",
//                         marginBottom: "8px",
//                       }}
//                     >
//                       <strong>{r.user}</strong>{" "}
//                       <span style={{ color: "#f59e0b" }}>
//                         {"★".repeat(r.rating)}
//                       </span>
//                       <p>{r.comment}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               {companyTab === "faqs" && (
//                 <div>
//                   {selectedCompany.faqs.map((f, i) => (
//                     <div key={i}>
//                       <strong>Q: {f.q}</strong>
//                       <p>A: {f.a}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               {companyTab === "map" && (
//                 <div
//                   style={{
//                     background: "#e2e8f0",
//                     padding: "40px",
//                     textAlign: "center",
//                   }}
//                 >
//                   Map placeholder: {selectedCompany.location}
//                 </div>
//               )}
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 gap: "12px",
//                 flexWrap: "wrap",
//                 marginTop: "12px",
//               }}
//             >
//               <button
//                 style={{
//                   background: "#16a34a",
//                   color: "#fff",
//                   border: "none",
//                   padding: "10px 20px",
//                   borderRadius: "100px",
//                   fontWeight: 600,
//                   cursor: "pointer",
//                 }}
//               >
//                 Call {selectedCompany.phone}
//               </button>
//               <button
//                 style={{
//                   background: "#25D366",
//                   color: "#fff",
//                   border: "none",
//                   padding: "10px 20px",
//                   borderRadius: "100px",
//                   fontWeight: 600,
//                   cursor: "pointer",
//                 }}
//               >
//                 WhatsApp
//               </button>
//               <button
//                 style={{
//                   background: "#dc2626",
//                   color: "#fff",
//                   border: "none",
//                   padding: "10px 20px",
//                   borderRadius: "100px",
//                   fontWeight: 600,
//                   cursor: "pointer",
//                 }}
//               >
//                 Follow
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// // ---------- Helper Components ----------
// const StatItem = ({ label, value }) => (
//   <div style={{ textAlign: "center" }}>
//     <div
//       style={{
//         fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)",
//         fontWeight: 900,
//         color: "#dc2626",
//       }}
//     >
//       {value}
//     </div>
//     <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>{label}</div>
//   </div>
// );

// const Modal = ({ onClose, title, children, size = "md" }) => (
//   <div
//     style={{
//       position: "fixed",
//       inset: 0,
//       zIndex: 1000,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "20px",
//       background: "rgba(0,0,0,0.6)",
//       backdropFilter: "blur(6px)",
//       animation: "fadeIn 0.25s ease",
//     }}
//     onClick={onClose}
//   >
//     <div
//       style={{
//         background: "#fff",
//         borderRadius: "20px",
//         maxWidth: size === "lg" ? "900px" : "600px",
//         width: "100%",
//         maxHeight: "90vh",
//         overflowY: "auto",
//         padding: "32px 28px",
//         position: "relative",
//         boxShadow: "0 40px 80px rgba(0,0,0,0.25)",
//         animation: "slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//       }}
//       onClick={(e) => e.stopPropagation()}
//     >
//       <button
//         onClick={onClose}
//         style={{
//           position: "absolute",
//           top: "16px",
//           right: "20px",
//           background: "#f1f5f9",
//           border: "none",
//           borderRadius: "50%",
//           width: "40px",
//           height: "40px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           cursor: "pointer",
//         }}
//       >
//         <X size={20} />
//       </button>
//       <h3
//         style={{
//           fontSize: "1.6rem",
//           fontWeight: 800,
//           marginBottom: "16px",
//           paddingRight: "40px",
//         }}
//       >
//         {title}
//       </h3>
//       {children}
//     </div>
//     <style>{`
//       @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//       @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
//     `}</style>
//   </div>
// );

// // // Additional icons used
// // const IndianRupee = ({ size, ...props }) => (
// //   <span style={{ fontSize: size }}>₹</span>
// // );
// // const RefreshCw = ({ size, ...props }) => (
// //   <span style={{ fontSize: size }}>⟳</span>
// // );
// // const Lock = ({ size, ...props }) => <span style={{ fontSize: size }}>🔒</span>;
// // // const Headphones = ({ size, ...props }) => (
// //   <span style={{ fontSize: size }}>🎧</span>
// // );

// export default IndustrialMarketplace;

import React, { useState } from "react";
import {
  Wrench,
  Settings,
  Users,
  Headphones,
  ChevronRight,
  ChevronLeft,
  X,
  Shield,
  Award,
  Star,
  FileText,
  Truck,
  Clock,
  CheckCircle,
} from "lucide-react";

// ---------- Data ----------
const featureData = {
  "high-quality-tools": {
    id: "high-quality-tools",
    name: "High Quality Tools",
    icon: Wrench,
    description:
      "Our tools are designed for industrial, construction, and professional applications.",
    subTopics: [
      {
        id: "durability",
        label: "Durability",
        description:
          "Built to last with heavy-duty steel body, heat and rust resistant, shock proof.",
        details: [
          "Heavy-duty steel body",
          "Heat resistant up to 300°C",
          "Rust resistant coating",
          "Shock resistant design",
          "Industrial grade materials",
          "Tested under extreme conditions",
        ],
        expectedLife: "5–10 Years",
        applications: ["Construction", "Fabrication", "Mining", "Workshop"],
        reviews: [
          {
            user: "Rajesh K.",
            rating: 5,
            comment: "Unmatched durability – survived a year of daily use.",
          },
        ],
        relatedProducts: ["Hammer", "Drill", "Angle Grinder"],
        brochure: "/brochure-durability.pdf",
      },
      {
        id: "premium-materials",
        label: "Premium Materials",
        description:
          "Aerospace-grade aluminium and hardened steel alloys for lightweight strength.",
        details: [
          "Chromium-vanadium steel",
          "TPE ergonomic grips",
          "Precision-machined components",
        ],
        expectedLife: "8–12 Years",
        applications: ["Precision work", "Heavy-duty operations"],
        reviews: [
          {
            user: "Anil M.",
            rating: 5,
            comment: "The grip is fantastic – no slipping.",
          },
        ],
        relatedProducts: ["Screwdriver Set", "Pliers"],
        brochure: "/brochure-materials.pdf",
      },
      {
        id: "industrial-testing",
        label: "Industrial Testing",
        description:
          "Every tool undergoes rigorous testing to meet international standards.",
        details: [
          "Impact Test",
          "Drop Test",
          "Heat Test",
          "Dust Test",
          "Water Resistance",
          "Continuous Operation",
        ],
        expectedLife: "N/A",
        applications: ["Quality assurance", "Compliance"],
        reviews: [],
        relatedProducts: ["Test Kits"],
        brochure: "/brochure-testing.pdf",
      },
      {
        id: "warranty-support",
        label: "Warranty & Support",
        description: "5-year limited warranty and 24/7 technical support.",
        details: [
          "5-year limited warranty",
          "Free replacement for defects",
          "24/7 technical support",
        ],
        expectedLife: "N/A",
        applications: ["All users"],
        reviews: [
          {
            user: "Meera D.",
            rating: 5,
            comment: "Amazing support – replaced within 48 hours.",
          },
        ],
        relatedProducts: ["Extended Service Plans"],
        brochure: "/brochure-warranty.pdf",
      },
      {
        id: "safety-standards",
        label: "Safety Standards",
        description: "CE, UL, and OSHA certified for maximum protection.",
        details: [
          "Insulated handles for electrical safety",
          "Non-sparking materials",
          "Overload protection",
        ],
        expectedLife: "N/A",
        applications: ["Electrical work", "Oil & gas", "Mining"],
        reviews: [
          {
            user: "Vikram P.",
            rating: 5,
            comment: "I feel safe using these near live wires.",
          },
        ],
        relatedProducts: ["Insulated Screwdrivers", "Safety Gloves"],
        brochure: "/brochure-safety.pdf",
      },
    ],
  },
  "repair-services": {
    id: "repair-services",
    name: "Repair Services",
    icon: Settings,
    description:
      "Fast, reliable repair for all industrial equipment with certified technicians.",
    subTopics: [
      {
        id: "motor-repair",
        label: "Motor Repair",
        description: "Complete motor rewinding and overhaul services.",
        details: ["Rewinding", "Bearing replacement", "Dynamic balancing"],
        expectedLife: "Extended motor life",
        applications: ["Industrial motors", "Pumps"],
        reviews: [
          {
            user: "Suresh R.",
            rating: 5,
            comment: "They fixed my compressor in record time.",
          },
        ],
        relatedProducts: ["Motor parts"],
        brochure: "/brochure-motor.pdf",
      },
      // add more sub-topics as needed
    ],
  },
  "verified-suppliers": {
    id: "verified-suppliers",
    name: "Verified Suppliers",
    icon: Users,
    description:
      "Trusted partners with verified credentials and quality assurance.",
    subTopics: [
      {
        id: "supplier-network",
        label: "Supplier Network",
        description: "2,100+ active contractors and suppliers across India.",
        details: ["GST verified", "ISO certified", "Pan-India delivery"],
        expectedLife: "N/A",
        applications: ["B2B procurement", "Bulk orders"],
        reviews: [
          {
            user: "Vijay M.",
            rating: 5,
            comment: "They understand our needs perfectly.",
          },
        ],
        relatedProducts: ["Contractor Kits"],
        brochure: "/brochure-suppliers.pdf",
      },
    ],
  },
  "customer-support": {
    id: "customer-support",
    name: "Customer Support",
    icon: Headphones,
    description: "24/7 support via phone, email, chat, and WhatsApp.",
    subTopics: [
      {
        id: "support-channels",
        label: "Support Channels",
        description: "Reach us through multiple channels for quick resolution.",
        details: ["Phone", "Email", "Live Chat", "WhatsApp", "Telegram"],
        expectedLife: "N/A",
        applications: ["All customers"],
        reviews: [
          {
            user: "Deepa N.",
            rating: 5,
            comment: "They resolved my issue at 2 AM – incredible.",
          },
        ],
        relatedProducts: ["Premium Support Plans"],
        brochure: "/brochure-support.pdf",
      },
    ],
  },
};

// ---------- Helper Components ----------
const StarRating = ({ rating }) => (
  <div style={{ display: "flex", gap: "2px" }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        size={16}
        fill={i <= rating ? "#f59e0b" : "none"}
        color={i <= rating ? "#f59e0b" : "#d1d5db"}
        strokeWidth={1.5}
      />
    ))}
  </div>
);

// ---------- Main Component ----------
const WhyChooseUsWithDrawer = () => {
  // Navigation stack: array of objects { type: 'feature' | 'subTopic', id: string }
  const [navStack, setNavStack] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Current items based on stack
  const getCurrentItems = () => {
    if (navStack.length === 0) {
      // Home level: show all features
      return Object.values(featureData).map((f) => ({
        type: "feature",
        id: f.id,
        label: f.name,
        icon: f.icon,
        description: f.description,
        data: f,
      }));
    } else if (navStack.length === 1) {
      // Feature level: show sub-topics
      const featureId = navStack[0].id;
      const feature = featureData[featureId];
      return feature.subTopics.map((st) => ({
        type: "subTopic",
        id: st.id,
        label: st.label,
        description: st.description,
        data: st,
        parentFeatureId: featureId,
      }));
    } else {
      // Detail level: show related items or details (we'll just show details)
      // For simplicity, we show details of the last sub-topic with related products etc.
      const last = navStack[navStack.length - 1];
      const featureId = navStack[0].id;
      const feature = featureData[featureId];
      const subTopic = feature.subTopics.find((st) => st.id === last.id);
      if (!subTopic) return [];
      // Return a special "detail" view
      return [{ type: "detail", data: subTopic }];
    }
  };

  const currentItems = getCurrentItems();

  const handleItemClick = (item) => {
    if (item.type === "feature") {
      setNavStack([{ type: "feature", id: item.id }]);
      setIsPanelOpen(true);
    } else if (item.type === "subTopic") {
      setNavStack([...navStack, { type: "subTopic", id: item.id }]);
    }
    // If type is 'detail', we don't navigate further; show details.
  };

  const handleBack = () => {
    if (navStack.length === 0) {
      setIsPanelOpen(false);
    } else {
      setNavStack(navStack.slice(0, -1));
    }
  };

  const handleClose = () => {
    setIsPanelOpen(false);
    setNavStack([]);
  };

  // Render breadcrumb
  const renderBreadcrumb = () => {
    const items = [
      { label: "Home", onClick: handleClose },
      {
        label: "Why Choose Us",
        onClick: () => {
          setNavStack([]);
        },
      },
    ];
    // Add feature name if stack >=1
    if (navStack.length >= 1) {
      const featureId = navStack[0].id;
      const feature = featureData[featureId];
      items.push({
        label: feature.name,
        onClick: () => {
          setNavStack([{ type: "feature", id: featureId }]);
        },
      });
    }
    if (navStack.length >= 2) {
      const last = navStack[navStack.length - 1];
      const featureId = navStack[0].id;
      const feature = featureData[featureId];
      const sub = feature.subTopics.find((st) => st.id === last.id);
      if (sub) items.push({ label: sub.label, onClick: () => {} });
    }
    return items;
  };

  const breadcrumb = renderBreadcrumb();

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* Main page */}
      <section style={{ padding: "60px 0" }}>
        <div
          style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}
        >
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#dc2626",
              }}
            >
              Core Advantages
            </span>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                color: "#111",
              }}
            >
              Why <span style={{ color: "#dc2626" }}>Choose Us</span>
            </h2>
            <div
              style={{
                width: "48px",
                height: "4px",
                background: "#dc2626",
                margin: "16px auto 0",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {Object.values(featureData).map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  onClick={() => {
                    setNavStack([{ type: "feature", id: feature.id }]);
                    setIsPanelOpen(true);
                  }}
                  style={{
                    background: "#fff",
                    padding: "32px 20px",
                    borderRadius: "12px",
                    border: "2px solid #111",
                    borderBottom: "6px solid #dc2626",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    boxShadow: "8px 8px 0px #111",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      background: "#111",
                      color: "#dc2626",
                      borderRadius: "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 24px",
                      border: "2px solid #dc2626",
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "#111",
                    }}
                  >
                    {feature.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#64748b",
                      marginTop: "8px",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Slide-over Panel */}
      {isPanelOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            justifyContent: "flex-end",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
            animation: "fadeIn 0.25s ease",
          }}
          onClick={handleClose}
        >
          <div
            style={{
              width: "600px",
              maxWidth: "90vw",
              height: "100%",
              background: "#fff",
              boxShadow: "-10px 0 40px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              animation: "slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Close, Back, Breadcrumb */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={handleClose}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                }}
              >
                <X size={20} />
              </button>
              {navStack.length > 0 && (
                <button
                  onClick={handleBack}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#64748b",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <ChevronLeft size={18} /> Back
                </button>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.8rem",
                  color: "#475569",
                  flexWrap: "wrap",
                  marginLeft: "auto",
                }}
              >
                {breadcrumb.map((item, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <ChevronRight size={14} color="#94a3b8" />}
                    <span
                      onClick={item.onClick}
                      style={{
                        cursor: item.onClick ? "pointer" : "default",
                        fontWeight: idx === breadcrumb.length - 1 ? 700 : 400,
                        color:
                          idx === breadcrumb.length - 1 ? "#0f172a" : "#64748b",
                      }}
                    >
                      {item.label}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
              {currentItems.length === 0 ? (
                <p>No content</p>
              ) : currentItems[0].type === "detail" ? (
                // Detail view of a sub-topic
                (() => {
                  const detail = currentItems[0].data;
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "1.8rem",
                          fontWeight: 800,
                          color: "#0f172a",
                        }}
                      >
                        {detail.label}
                      </h3>
                      <p style={{ fontSize: "1rem", color: "#475569" }}>
                        {detail.description}
                      </p>
                      {detail.details && (
                        <div>
                          <h4 style={{ fontWeight: 700, marginBottom: "8px" }}>
                            Key Features
                          </h4>
                          <ul
                            style={{
                              listStyle: "none",
                              padding: 0,
                              display: "flex",
                              flexDirection: "column",
                              gap: "6px",
                            }}
                          >
                            {detail.details.map((item, i) => (
                              <li
                                key={i}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                }}
                              >
                                <CheckCircle size={16} color="#dc2626" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {detail.expectedLife && (
                        <div>
                          <strong>Expected Life:</strong> {detail.expectedLife}
                        </div>
                      )}
                      {detail.applications && (
                        <div>
                          <h4 style={{ fontWeight: 700, marginBottom: "8px" }}>
                            Applications
                          </h4>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "8px",
                            }}
                          >
                            {detail.applications.map((app, i) => (
                              <span
                                key={i}
                                style={{
                                  background: "#f1f5f9",
                                  padding: "4px 12px",
                                  borderRadius: "100px",
                                  fontSize: "0.85rem",
                                }}
                              >
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {detail.reviews && detail.reviews.length > 0 && (
                        <div>
                          <h4 style={{ fontWeight: 700, marginBottom: "8px" }}>
                            Customer Reviews
                          </h4>
                          {detail.reviews.map((r, i) => (
                            <div
                              key={i}
                              style={{
                                background: "#f8fafc",
                                padding: "12px",
                                borderRadius: "8px",
                                marginBottom: "8px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <strong>{r.user}</strong>{" "}
                                <StarRating rating={r.rating} />
                              </div>
                              <p style={{ marginTop: "4px" }}>{r.comment}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {detail.relatedProducts &&
                        detail.relatedProducts.length > 0 && (
                          <div>
                            <h4
                              style={{ fontWeight: 700, marginBottom: "8px" }}
                            >
                              Related Products
                            </h4>
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "8px",
                              }}
                            >
                              {detail.relatedProducts.map((p, i) => (
                                <span
                                  key={i}
                                  style={{
                                    background: "#dc2626",
                                    color: "#fff",
                                    padding: "4px 16px",
                                    borderRadius: "100px",
                                    fontSize: "0.85rem",
                                  }}
                                >
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      {detail.brochure && (
                        <a
                          href={detail.brochure}
                          download
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            background: "#111",
                            color: "#fff",
                            padding: "10px 20px",
                            borderRadius: "0",
                            textDecoration: "none",
                            fontWeight: 600,
                            width: "fit-content",
                          }}
                        >
                          <FileText size={18} /> Download Brochure
                        </a>
                      )}
                    </div>
                  );
                })()
              ) : (
                // List of items (features or sub-topics)
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {currentItems.map((item) => {
                    const isFeature = item.type === "feature";
                    const Icon = isFeature
                      ? item.icon
                      : item.icon || ChevronRight;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          padding: "16px 20px",
                          background: "#f8fafc",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "background 0.2s, transform 0.2s",
                          border: "1px solid #e5e7eb",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f1f5f9";
                          e.currentTarget.style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#f8fafc";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        {Icon && <Icon size={24} color="#dc2626" />}
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: "1rem" }}>
                            {item.label}
                          </div>
                          {item.description && (
                            <div
                              style={{ fontSize: "0.85rem", color: "#64748b" }}
                            >
                              {item.description}
                            </div>
                          )}
                        </div>
                        <ChevronRight size={18} color="#94a3b8" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default WhyChooseUsWithDrawer;