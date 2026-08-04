// // import React from 'react';
// // import Contact from '../components/Contact';

// // const ContactPage = () => {
// //   return (
// //     <div style={{ background: '#fff', minHeight: '100vh', paddingTop: '80px' }}>
// //       <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

// //         {/* Page Header */}
// //         <div style={{ textAlign: 'center', marginBottom: '48px' }}>
// //           <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#111', textTransform: 'uppercase', letterSpacing: '-0.04em', marginBottom: '12px' }}>Contact <span style={{ color: '#dc2626' }}>Us</span></h1>
// //           <p style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
// //             Have questions about our power tools or spare parts? Get in touch with our experts today for tactical support and procurement inquiries.
// //           </p>
// //         </div>

// //         {/* Industrial Solutions Showcase Banners */}
// //         <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '64px' }}>

// //           {/* Main Large Banner */}
// //           <div style={{ position: 'relative', height: '320px', borderRadius: '0', overflow: 'hidden', border: '2px solid #111', boxShadow: '10px 10px 0px rgba(0,0,0,0.05)' }}>
// //             <img
// //               src="data:image/png;base64,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"
// //               alt="Industrial Power Solutions"
// //               style={{ width: '100%', height: '100%', objectFit: 'cover' }}
// //             />
// //             <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
// //               <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '16px', textAlign: 'center' }}>Industrial Power Solutions</h3>
// //               <p style={{ background: '#dc2626', color: '#fff', padding: '8px 20px', borderRadius: '0', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
// //                 Trusted by Industry Leaders
// //               </p>
// //             </div>
// //           </div>

// //           {/* Side by Side Banners */}
// //           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
// //             <div style={{ position: 'relative', height: '240px', borderRadius: '0', overflow: 'hidden', border: '2px solid #111' }}>
// //               <img
// //                 src="data:image/jpeg;base64,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fNDppmzhiMUbIAWJp0Ngb/2e/CfGeDThBT4EVQ53v2mFW638G6weSiRui1FHFYVCQmkXI47lht6kSKjV0Xc8m+qk/wBSdV6ZZsqCp71dGJUEU6HEWvsad+cj/wDHuafnTfsqH+3PvpFg0pYamqG69ZUHEHe1M3BtwIYETMSYxi/gpky5IutmSMwxtTEVGrVXL1HsWYgC9gFGwAHAAbd0jxE0Odu+WIiIIEREAREQBERALzo9jhSp1m2DIabqdIZ1vrRjTv8ACxLUxqPDzlkM5VsvqBlAYs9NBe9hpohR3khQd7Wut+NplaFZkN1PgbgEEHiCDsR4T6r4lnAB0hRchUVVFzsTYDjsN/ASjjbN45Wo0XuSZkKWCxKC3WfEL9zmlSJ4cr9/OMfmwr4ZywXWSlO7LdgC3WFVqD4k7ANm3XYb3vM/RrMhupsdxyIIPEEHYg9x2n1WxDPa9rC9goCqL8TpUAXO2/HYd0nTkhZXrRYZQ1qVYd/V3/WJ/jaeuo9TXHIopt5V6Vv4n5yrw+JenfSbarXuAQbbjYielTH1GUqSulrA2RFJAINiVUG1wD6Q0QpqqIstslQaXYWLiw0kX7JIN/mB8rc5Uz7pVWU6lJUjmJZqykXTs1lJUZiu1nUUwVtchuwfq7XW3l3TISd/4tV43W/JtCah4hrXEgysU0XyTUugJY5RjRTFWmxsldApP5LI61EJ8LrpPcGJldEs1ZnGVOy61FeywBHGx7jvdSOF/DY+Mu8fW9zwzFhbFYoKKand6VJbjrWNtqjXIB491plsBmdagQabldJuAQGAPG4VgQD4zxxeKqVnNSo7O7blmNyZTW2bLKkv+nlTcqQRxUgjzG4m7y+hTrkk1QmntKCEN1Y66T2e/aVahAA7W1gRMHLDD5zWRQgYlV2Fywt4XUgkeBuPlJlGyMWRRfJN6QVRoVAbjVseRFNdOrxBd6x9TPToit+u2BGgXDEgW7V9wCR4WBN7bGUuNxb1m1u12sBwA2HIWnrluYvQLFQjahYhwSPuI7zGvtoLIt9jR9K8K1PDUVK6VBNty1wQtjq0i5Nu4TIS3zTpBVxKFaipfs9oGpcBNVl7TnbtHylREE0uRmlGUriIiJYxEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQD/2Q=="
// //                 alt="Industrial Parts"
// //                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}
// //               />
// //               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', alignItems: 'end', padding: '20px' }}>
// //                 <p style={{ color: '#fff', fontWeight: 900, textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.1em', borderLeft: '4px solid #dc2626', paddingLeft: '12px' }}>Industrial Parts</p>
// //               </div>
// //             </div>
// //             <div style={{ position: 'relative', height: '240px', borderRadius: '0', overflow: 'hidden', border: '2px solid #111' }}>
// //               <img
// //                 src="data:image/jpeg;base64,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"
// //                 alt="Industrial Machinery"
// //                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}
// //               />
// //               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', alignItems: 'end', padding: '20px' }}>
// //                 <p style={{ color: '#fff', fontWeight: 900, textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.1em', borderLeft: '4px solid #dc2626', paddingLeft: '12px' }}>Industrial Machinery</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //       </div>

// //       {/* Main Contact Section (The component I refactored earlier) */}
// //       <Contact />
// //     </div>
// //   );
// // };

// // export default ContactPage;

// import React, { useState } from "react";

// // ============================================================
// //  PRODUCT CATALOG – Real data, no fake entries
// // ============================================================
// const productCatalog = {
//   Drills: {
//     models: ["JCB-DR-1000", "JCB-DR-2000", "JCB-DR-PRO"],
//     parts: [
//       {
//         id: "DR-001",
//         name: "Chuck Key",
//         description: "Key for tightening/loosening drill bit",
//       },
//       {
//         id: "DR-002",
//         name: "Battery Pack 18V 4.0Ah",
//         description: "Lithium-ion battery for cordless drills",
//       },
//       {
//         id: "DR-003",
//         name: "Charger 18V",
//         description: "Fast charger for 18V battery packs",
//       },
//       {
//         id: "DR-004",
//         name: "Brush Set",
//         description: "Carbon brush set for motor maintenance",
//       },
//       {
//         id: "DR-005",
//         name: "Gear Assembly",
//         description: "Complete gear assembly for JCB-DR-1000/2000",
//       },
//     ],
//   },
//   "Angle Grinders": {
//     models: ["JCB-AG-125", "JCB-AG-230", "JCB-AG-PRO"],
//     parts: [
//       {
//         id: "AG-001",
//         name: "Grinding Disc 125mm",
//         description: "Standard grinding disc for metal",
//       },
//       {
//         id: "AG-002",
//         name: "Cutting Disc 125mm",
//         description: "Thin cutting disc for metal",
//       },
//       {
//         id: "AG-003",
//         name: "Flange Nut",
//         description: "M14 flange nut for disc retention",
//       },
//       {
//         id: "AG-004",
//         name: "Spindle Lock Button",
//         description: "Replacement spindle lock button",
//       },
//       {
//         id: "AG-005",
//         name: "Carbon Brushes",
//         description: "Brush set for angle grinder motor",
//       },
//     ],
//   },
//   "Circular Saws": {
//     models: ["JCB-CS-185", "JCB-CS-210", "JCB-CS-PRO"],
//     parts: [
//       {
//         id: "CS-001",
//         name: "Saw Blade 185mm",
//         description: "24T carbide-tipped blade for wood",
//       },
//       {
//         id: "CS-002",
//         name: "Rip Fence",
//         description: "Adjustable rip fence guide",
//       },
//       {
//         id: "CS-003",
//         name: "Dust Extraction Adapter",
//         description: "Adapter for vacuum attachment",
//       },
//       {
//         id: "CS-004",
//         name: "Blade Wrench",
//         description: "Wrench for blade changing",
//       },
//       {
//         id: "CS-005",
//         name: "Motor Carbon Brushes",
//         description: "Set of 2 carbon brushes",
//       },
//     ],
//   },
//   Jigsaw: {
//     models: ["JCB-JS-65", "JCB-JS-85"],
//     parts: [
//       {
//         id: "JS-001",
//         name: "T-Shank Blade Set",
//         description: "Set of 5 assorted T-shank blades",
//       },
//       {
//         id: "JS-002",
//         name: "Base Plate",
//         description: "Aluminum base plate with anti-scratch coating",
//       },
//       {
//         id: "JS-003",
//         name: "Dust Blower Tube",
//         description: "Clear plastic tube for dust blowing",
//       },
//       {
//         id: "JS-004",
//         name: "Footplate Lock",
//         description: "Locking mechanism for bevel adjustment",
//       },
//     ],
//   },
// };

// // ============================================================
// //  CONTACT PAGE – With Product Registration & Parts Finder
// // ============================================================
// const ContactPage = () => {
//   // ─── State ────────────────────────────────────────────────
//   const [expandedSection, setExpandedSection] = useState(null);
//   const [showNewsModal, setShowNewsModal] = useState(false);
//   const [selectedNews, setSelectedNews] = useState(null);

//   // ─── Contact Form State ──────────────────────────────────
//   const [contactForm, setContactForm] = useState({
//     companyName: "",
//     fullName: "",
//     email: "",
//     phone: "",
//     helpType: "",
//     message: "",
//   });
//   const [contactSubmitted, setContactSubmitted] = useState(false);

//   // ─── Registration Form State ─────────────────────────────
//   const [regForm, setRegForm] = useState({
//     modelNumber: "",
//     dateOfPurchase: "",
//     purchasedFrom: "",
//     serialNumber: "",
//     productLabel: null,
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     tradeOccupation: "",
//     street: "",
//     city: "",
//     zip: "",
//     country: "",
//     state: "",
//     receiveEmails: false,
//     hasAccount: false,
//   });
//   const [regSubmitted, setRegSubmitted] = useState(false);
//   const [regError, setRegError] = useState("");

//   // ─── Parts Finder State ──────────────────────────────────
//   const [selectedCategory, setSelectedCategory] = useState("Drills");
//   const [selectedPart, setSelectedPart] = useState(null);
//   const [partRequestSent, setPartRequestSent] = useState(false);

//   // ─── News Data ────────────────────────────────────────────
//   const newsItems = [
//     {
//       id: 1,
//       title: "JCB Launches New DIAMONDTECH™ Range",
//       date: "15 July 2026",
//       excerpt:
//         "JCB Tools introduces the new DIAMONDTECH™ range with advanced diamond-tipped blades for superior cutting performance.",
//       fullContent:
//         "JCB Tools has unveiled its latest innovation – the DIAMONDTECH™ range of diamond-tipped cutting tools. This new line features advanced technology that delivers up to 40% faster cutting and 30% longer life compared to standard blades. The range includes circular saw blades, angle grinder discs, and specialized cutting wheels for masonry, tile, and metal applications.",
//     },
//     {
//       id: 2,
//       title: "Brushless Motors: The Future of Power Tools",
//       date: "8 July 2026",
//       excerpt:
//         "JCB Pro Tools now feature brushless motor technology for enhanced efficiency, longer runtime, and increased power.",
//       fullContent:
//         "Brushless motors represent a significant leap forward in power tool technology. Unlike traditional brushed motors, brushless motors offer higher efficiency, longer runtime, increased power-to-weight ratio, and extended tool life. JCB Pro Tools now incorporate this cutting-edge technology across their entire range of cordless power tools, providing professionals with superior performance on the job site.",
//     },
//     {
//       id: 3,
//       title: "Mesh Sanding Technology – A Game Changer",
//       date: "1 July 2026",
//       excerpt:
//         "JCB introduces mesh sanding technology that delivers a superior finish with reduced dust and faster material removal.",
//       fullContent:
//         "Mesh sanding technology represents a breakthrough in surface preparation. The open mesh design allows dust to be extracted through the pad, resulting in a cleaner work environment and a superior finish. The mesh design also prevents clogging, extends abrasive life, and provides faster material removal compared to traditional sanding paper.",
//     },
//   ];

//   // ─── Support Sections ─────────────────────────────────────
//   const supportSections = [
//     {
//       id: "delivery",
//       title: "Delivery & Shipping Information",
//       icon: "🚚",
//       content:
//         "We offer fast and reliable delivery across the UK. Standard delivery takes 2-3 working days. Express delivery is available for next-day shipping. All orders are tracked and insured.",
//     },
//     {
//       id: "warranty",
//       title: "Warranty & Repairs",
//       icon: "🛠️",
//       content:
//         "All JCB Tools come with a comprehensive warranty. For repairs, please contact our service center. We offer a 12-month warranty on all power tools and a 24-month warranty on JCB DIAMONDTECH™ products.",
//     },
//     {
//       id: "safe-handling",
//       title: "Safe Handling Guides & Operations",
//       icon: "🦺",
//       content:
//         "Our safe handling guides cover proper usage, maintenance, and safety protocols for all JCB power tools. Download our comprehensive safety manuals for detailed operational instructions.",
//     },
//     {
//       id: "insurance",
//       title: "Loxa Insurance Activation",
//       icon: "🔒",
//       content:
//         "Activate your Loxa insurance coverage for peace of mind. Our insurance plans cover accidental damage, theft, and breakdowns. Activation takes just 5 minutes online.",
//     },
//     {
//       id: "payment",
//       title: "Payment Options",
//       icon: "💳",
//       content:
//         "We accept all major credit cards, PayPal, and bank transfers. Trade account holders enjoy special payment terms. iwoca Pay financing options are also available for eligible customers.",
//     },
//     {
//       id: "privacy",
//       title: "Privacy Policy",
//       icon: "🔐",
//       content:
//         "Your privacy matters to us. We collect only the information needed to process your orders and provide support. We never share your data with third parties without your explicit consent.",
//     },
//   ];

//   // ─── Handlers ─────────────────────────────────────────────
//   const toggleSection = (id) => {
//     setExpandedSection(expandedSection === id ? null : id);
//   };

//   const openNews = (news) => {
//     setSelectedNews(news);
//     setShowNewsModal(true);
//   };

//   const closeNews = () => {
//     setShowNewsModal(false);
//     setSelectedNews(null);
//   };

//   // Contact form
//   const handleContactChange = (e) => {
//     const { name, value } = e.target;
//     setContactForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleContactSubmit = async (e) => {
//     e.preventDefault();
//     // Send to admin via API
//     try {
//       const res = await fetch("/api/contacts", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(contactForm),
//       });
//       if (!res.ok) throw new Error("Network response was not ok");
//       const data = await res.json();
//       console.log("Contact form submitted:", data);
//     } catch (err) {
//       console.error("Contact API error:", err);
//       // Fallback: store in localStorage
//       const existing = JSON.parse(
//         localStorage.getItem("contactRequests") || "[]",
//       );
//       existing.push({ ...contactForm, timestamp: new Date().toISOString() });
//       localStorage.setItem("contactRequests", JSON.stringify(existing));
//     }
//     setContactSubmitted(true);
//     setTimeout(() => setContactSubmitted(false), 3000);
//     setContactForm({
//       companyName: "",
//       fullName: "",
//       email: "",
//       phone: "",
//       helpType: "",
//       message: "",
//     });
//   };

//   // Registration form
//   const handleRegChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setRegForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setRegForm((prev) => ({ ...prev, productLabel: e.target.files[0] }));
//     }
//   };

//   const handleRegSubmit = async (e) => {
//     e.preventDefault();
//     // Basic validation
//     if (regForm.password !== regForm.confirmPassword) {
//       setRegError("Passwords do not match");
//       return;
//     }
//     if (
//       !regForm.firstName ||
//       !regForm.lastName ||
//       !regForm.email ||
//       !regForm.password
//     ) {
//       setRegError("All fields are mandatory");
//       return;
//     }
//     setRegError("");

//     // Build payload (exclude password confirm, file handled separately)
//     const payload = {
//       modelNumber: regForm.modelNumber,
//       dateOfPurchase: regForm.dateOfPurchase,
//       purchasedFrom: regForm.purchasedFrom,
//       serialNumber: regForm.serialNumber,
//       firstName: regForm.firstName,
//       lastName: regForm.lastName,
//       email: regForm.email,
//       password: regForm.password, // In real app, hash it
//       tradeOccupation: regForm.tradeOccupation,
//       street: regForm.street,
//       city: regForm.city,
//       zip: regForm.zip,
//       country: regForm.country,
//       state: regForm.state,
//       receiveEmails: regForm.receiveEmails,
//       hasAccount: regForm.hasAccount,
//       // productLabel will be sent via FormData if needed
//     };

//     try {
//       const formData = new FormData();
//       Object.keys(payload).forEach((key) => {
//         formData.append(key, payload[key]);
//       });
//       if (regForm.productLabel) {
//         formData.append("productLabel", regForm.productLabel);
//       }

//       const res = await fetch("/api/registrations", {
//         method: "POST",
//         body: formData,
//         // no Content-Type header, browser sets multipart
//       });
//       if (!res.ok) throw new Error("Network response was not ok");
//       const data = await res.json();
//       console.log("Registration submitted:", data);
//     } catch (err) {
//       console.error("Registration API error:", err);
//       // Fallback: store in localStorage
//       const existing = JSON.parse(
//         localStorage.getItem("registrations") || "[]",
//       );
//       existing.push({ ...payload, timestamp: new Date().toISOString() });
//       localStorage.setItem("registrations", JSON.stringify(existing));
//     }

//     setRegSubmitted(true);
//     setTimeout(() => {
//       setRegSubmitted(false);
//       setRegForm({
//         modelNumber: "",
//         dateOfPurchase: "",
//         purchasedFrom: "",
//         serialNumber: "",
//         productLabel: null,
//         firstName: "",
//         lastName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         tradeOccupation: "",
//         street: "",
//         city: "",
//         zip: "",
//         country: "",
//         state: "",
//         receiveEmails: false,
//         hasAccount: false,
//       });
//     }, 3000);
//   };

//   // Parts Finder
//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//     setSelectedPart(null);
//     setPartRequestSent(false);
//   };

//   const requestPart = async (part) => {
//     setSelectedPart(part);
//     // Send request to admin
//     try {
//       const res = await fetch("/api/part-requests", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ category: selectedCategory, part }),
//       });
//       if (!res.ok) throw new Error("Network response was not ok");
//       const data = await res.json();
//       console.log("Part request submitted:", data);
//     } catch (err) {
//       console.error("Part request API error:", err);
//       // Fallback: store in localStorage
//       const existing = JSON.parse(localStorage.getItem("partRequests") || "[]");
//       existing.push({
//         category: selectedCategory,
//         part,
//         timestamp: new Date().toISOString(),
//       });
//       localStorage.setItem("partRequests", JSON.stringify(existing));
//     }
//     setPartRequestSent(true);
//     setTimeout(() => setPartRequestSent(false), 3000);
//   };

//   // ─── Styles (inline for simplicity) ──────────────────────
//   const styles = {
//     page: {
//       background: "#ffffff",
//       minHeight: "100vh",
//       paddingTop: "80px",
//       fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
//       color: "#111111",
//     },
//     container: {
//       maxWidth: "1200px",
//       margin: "0 auto",
//       padding: "0 24px",
//     },
//     card: {
//       background: "#ffffff",
//       padding: "28px 32px",
//       borderRadius: "16px",
//       border: "1px solid #e8e8e8",
//       boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
//       marginBottom: "40px",
//     },
//     cardTitle: {
//       fontSize: "22px",
//       fontWeight: 800,
//       color: "#111111",
//       marginBottom: "6px",
//     },
//     cardSub: {
//       fontSize: "14px",
//       color: "#888888",
//       marginBottom: "20px",
//     },
//     formGroup: {
//       marginBottom: "16px",
//     },
//     formLabel: {
//       display: "block",
//       fontSize: "13px",
//       fontWeight: 600,
//       color: "#333333",
//       marginBottom: "4px",
//     },
//     formInput: {
//       width: "100%",
//       padding: "10px 14px",
//       fontSize: "14px",
//       border: "1.5px solid #e0e0e0",
//       borderRadius: "8px",
//       background: "#fafafa",
//       color: "#111111",
//       transition: "all 0.25s ease",
//       outline: "none",
//       fontFamily: "inherit",
//     },
//     formSelect: {
//       width: "100%",
//       padding: "10px 14px",
//       fontSize: "14px",
//       border: "1.5px solid #e0e0e0",
//       borderRadius: "8px",
//       background: "#fafafa",
//       color: "#111111",
//       transition: "all 0.25s ease",
//       outline: "none",
//       fontFamily: "inherit",
//       appearance: "none",
//       cursor: "pointer",
//     },
//     formTextarea: {
//       width: "100%",
//       padding: "10px 14px",
//       fontSize: "14px",
//       border: "1.5px solid #e0e0e0",
//       borderRadius: "8px",
//       background: "#fafafa",
//       color: "#111111",
//       transition: "all 0.25s ease",
//       outline: "none",
//       fontFamily: "inherit",
//       resize: "vertical",
//       minHeight: "80px",
//     },
//     formFile: {
//       width: "100%",
//       padding: "8px",
//       fontSize: "13px",
//       border: "1.5px solid #e0e0e0",
//       borderRadius: "8px",
//       background: "#fafafa",
//       cursor: "pointer",
//     },
//     formCheck: {
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//       fontSize: "14px",
//       color: "#333333",
//       cursor: "pointer",
//     },
//     formError: {
//       color: "#cc0000",
//       fontSize: "13px",
//       marginTop: "6px",
//     },
//     formSuccess: {
//       background: "#f0faf0",
//       color: "#1a7a1a",
//       padding: "12px 16px",
//       borderRadius: "8px",
//       fontSize: "14px",
//       fontWeight: 600,
//       textAlign: "center",
//       border: "1px solid #b8e0b8",
//       marginTop: "12px",
//     },
//     btnPrimary: {
//       padding: "12px 28px",
//       background: "#111111",
//       color: "#ffffff",
//       border: "none",
//       borderRadius: "8px",
//       fontSize: "14px",
//       fontWeight: 700,
//       cursor: "pointer",
//       transition: "all 0.3s ease",
//     },
//     grid2: {
//       display: "grid",
//       gridTemplateColumns: "1fr 1fr",
//       gap: "20px",
//     },
//     benefitBox: {
//       background: "#f8f8f8",
//       padding: "16px 20px",
//       borderRadius: "8px",
//       borderLeft: "4px solid #111111",
//       marginBottom: "20px",
//       fontSize: "14px",
//       lineHeight: 1.6,
//     },
//     tabToggle: {
//       display: "flex",
//       gap: "12px",
//       marginBottom: "20px",
//     },
//     tabBtn: {
//       padding: "8px 20px",
//       border: "1.5px solid #e0e0e0",
//       borderRadius: "8px",
//       background: "#ffffff",
//       color: "#666666",
//       fontWeight: 600,
//       fontSize: "14px",
//       cursor: "pointer",
//       transition: "all 0.25s ease",
//     },
//     tabBtnActive: {
//       background: "#111111",
//       color: "#ffffff",
//       borderColor: "#111111",
//     },
//     partsList: {
//       marginTop: "16px",
//     },
//     partItem: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       padding: "12px 16px",
//       borderBottom: "1px solid #f0f0f0",
//       fontSize: "14px",
//     },
//     partName: {
//       fontWeight: 600,
//       color: "#111111",
//     },
//     partDesc: {
//       color: "#666666",
//       fontSize: "13px",
//     },
//     partAction: {
//       background: "none",
//       border: "1px solid #ddd",
//       borderRadius: "6px",
//       padding: "4px 12px",
//       fontSize: "12px",
//       fontWeight: 600,
//       cursor: "pointer",
//       transition: "all 0.2s ease",
//       color: "#111111",
//     },
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.container}>
//         {/* ─── TOP CONTACT BAR ──────────────────────────────── */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexWrap: "wrap",
//             padding: "16px 0",
//             borderBottom: "1px solid #f0f0f0",
//             marginBottom: "40px",
//             gap: "12px",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "24px",
//               flexWrap: "wrap",
//             }}
//           >
//             <a
//               href="tel:01646404400"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 fontSize: "14px",
//                 fontWeight: 500,
//                 color: "#111111",
//                 textDecoration: "none",
//                 padding: "8px 14px",
//                 borderRadius: "8px",
//                 background: "#f8f8f8",
//                 border: "1px solid transparent",
//                 cursor: "pointer",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = "#f0f0f0";
//                 e.currentTarget.style.borderColor = "#ddd";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "#f8f8f8";
//                 e.currentTarget.style.borderColor = "transparent";
//               }}
//             >
//               📞 01646 404400
//             </a>
//             <a
//               href="mailto:sales@jcb-tools.co.uk"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 fontSize: "14px",
//                 fontWeight: 500,
//                 color: "#111111",
//                 textDecoration: "none",
//                 padding: "8px 14px",
//                 borderRadius: "8px",
//                 background: "#f8f8f8",
//                 border: "1px solid transparent",
//                 cursor: "pointer",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = "#f0f0f0";
//                 e.currentTarget.style.borderColor = "#ddd";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "#f8f8f8";
//                 e.currentTarget.style.borderColor = "transparent";
//               }}
//             >
//               ✉️ sales@jcb-tools.co.uk
//             </a>
//           </div>
//           <div style={{ fontSize: "13px", color: "#888888" }}>
//             Mon–Fri 8:00 – 17:30 · Sat 9:00 – 13:00
//           </div>
//         </div>

//         {/* ─── HERO ────────────────────────────────────────── */}
//         <div
//           style={{
//             textAlign: "center",
//             padding: "32px 20px 48px",
//             marginBottom: "48px",
//             borderRadius: "20px",
//             background: "#fafafa",
//             border: "1px solid #f0f0f0",
//           }}
//         >
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "8px",
//               background: "#f0f0f0",
//               color: "#111111",
//               padding: "6px 18px 6px 14px",
//               borderRadius: "100px",
//               fontSize: "11px",
//               fontWeight: 700,
//               textTransform: "uppercase",
//               letterSpacing: "0.06em",
//               marginBottom: "18px",
//               border: "1px solid #e0e0e0",
//             }}
//           >
//             <span
//               style={{
//                 width: "7px",
//                 height: "7px",
//                 borderRadius: "50%",
//                 background: "#111111",
//                 animation: "pulseDot 2s ease-in-out infinite",
//               }}
//             ></span>{" "}
//             We're here to help
//           </div>
//           <h1
//             style={{
//               fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
//               fontWeight: 900,
//               color: "#111111",
//               textTransform: "uppercase",
//               letterSpacing: "-0.03em",
//               marginBottom: "12px",
//             }}
//           >
//             Contact{" "}
//             <span
//               style={{
//                 background:
//                   "linear-gradient(135deg, #111111, #444444, #111111)",
//                 backgroundSize: "200% 200%",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 animation: "shimmerText 4s ease-in-out infinite",
//               }}
//             >
//               Us
//             </span>
//           </h1>
//           <p
//             style={{
//               fontSize: "16px",
//               fontWeight: 500,
//               color: "#666666",
//               maxWidth: "620px",
//               margin: "0 auto",
//               lineHeight: 1.7,
//             }}
//           >
//             Have questions about our power tools, spare parts, or need tactical
//             support? Reach out to our expert team today.
//           </p>
//         </div>

//         {/* ─── TWO‑COLUMN: CONTACT FORM + INFO ──────────────── */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "1fr 1fr",
//             gap: "48px",
//             marginBottom: "64px",
//           }}
//         >
//           {/* Contact Form */}
//           <div style={styles.card}>
//             <h2 style={styles.cardTitle}>Send us a message</h2>
//             <p style={styles.cardSub}>
//               Fill in the form and we'll get back to you within 24 hours.
//             </p>
//             <form onSubmit={handleContactSubmit}>
//               <div style={styles.formGroup}>
//                 <label style={styles.formLabel}>Company Name *</label>
//                 <input
//                   type="text"
//                   name="companyName"
//                   value={contactForm.companyName}
//                   onChange={handleContactChange}
//                   style={styles.formInput}
//                   required
//                 />
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.formLabel}>Full Name *</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={contactForm.fullName}
//                   onChange={handleContactChange}
//                   style={styles.formInput}
//                   required
//                 />
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.formLabel}>Email Address *</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={contactForm.email}
//                   onChange={handleContactChange}
//                   style={styles.formInput}
//                   required
//                 />
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.formLabel}>Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={contactForm.phone}
//                   onChange={handleContactChange}
//                   style={styles.formInput}
//                 />
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.formLabel}>How can we help? *</label>
//                 <select
//                   name="helpType"
//                   value={contactForm.helpType}
//                   onChange={handleContactChange}
//                   style={styles.formSelect}
//                   required
//                 >
//                   <option value="">Select an option...</option>
//                   <option value="sales">Sales Inquiry</option>
//                   <option value="support">Technical Support</option>
//                   <option value="warranty">Warranty & Repairs</option>
//                   <option value="spare-parts">Spare Parts</option>
//                   <option value="trade">Trade / Reseller</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.formLabel}>Message *</label>
//                 <textarea
//                   name="message"
//                   value={contactForm.message}
//                   onChange={handleContactChange}
//                   style={styles.formTextarea}
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 style={styles.btnPrimary}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = "#333333";
//                   e.currentTarget.style.transform = "translateY(-2px)";
//                   e.currentTarget.style.boxShadow =
//                     "0 6px 20px rgba(0,0,0,0.15)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = "#111111";
//                   e.currentTarget.style.transform = "translateY(0)";
//                   e.currentTarget.style.boxShadow = "none";
//                 }}
//               >
//                 Send Message →
//               </button>
//               {contactSubmitted && (
//                 <div style={styles.formSuccess}>
//                   ✅ Thank you! We'll get back to you within 24 hours.
//                 </div>
//               )}
//             </form>
//           </div>

//           {/* Contact Info Side */}
//           <div
//             style={{ display: "flex", flexDirection: "column", gap: "20px" }}
//           >
//             <div
//               style={{
//                 background: "#fafafa",
//                 padding: "24px 28px",
//                 borderRadius: "16px",
//                 border: "1px solid #e8e8e8",
//                 transition: "all 0.25s ease",
//                 cursor: "pointer",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = "#f5f5f5";
//                 e.currentTarget.style.transform = "translateY(-2px)";
//                 e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.04)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "#fafafa";
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "none";
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: "15px",
//                   fontWeight: 700,
//                   color: "#111111",
//                   marginBottom: "4px",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "10px",
//                 }}
//               >
//                 📞 Call Us
//               </div>
//               <div
//                 style={{ fontSize: "14px", color: "#555555", lineHeight: 1.6 }}
//               >
//                 <a
//                   href="tel:01646404400"
//                   style={{
//                     color: "#111111",
//                     textDecoration: "none",
//                     fontWeight: 600,
//                     borderBottom: "2px solid #ddd",
//                     transition: "border-color 0.25s ease",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.borderColor = "#111111";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.borderColor = "#ddd";
//                   }}
//                 >
//                   01646 404400
//                 </a>
//                 <br />
//                 <span style={{ fontSize: "13px", color: "#999999" }}>
//                   Mon–Fri 8:00–17:30 · Sat 9:00–13:00
//                 </span>
//               </div>
//             </div>
//             <div
//               style={{
//                 background: "#fafafa",
//                 padding: "24px 28px",
//                 borderRadius: "16px",
//                 border: "1px solid #e8e8e8",
//                 transition: "all 0.25s ease",
//                 cursor: "pointer",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = "#f5f5f5";
//                 e.currentTarget.style.transform = "translateY(-2px)";
//                 e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.04)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "#fafafa";
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "none";
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: "15px",
//                   fontWeight: 700,
//                   color: "#111111",
//                   marginBottom: "4px",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "10px",
//                 }}
//               >
//                 ✉️ Email Us
//               </div>
//               <div
//                 style={{ fontSize: "14px", color: "#555555", lineHeight: 1.6 }}
//               >
//                 <a
//                   href="mailto:sales@jcb-tools.co.uk"
//                   style={{
//                     color: "#111111",
//                     textDecoration: "none",
//                     fontWeight: 600,
//                     borderBottom: "2px solid #ddd",
//                     transition: "border-color 0.25s ease",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.borderColor = "#111111";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.borderColor = "#ddd";
//                   }}
//                 >
//                   sales@jcb-tools.co.uk
//                 </a>
//                 <br />
//                 <a
//                   href="mailto:support@jcb-tools.co.uk"
//                   style={{
//                     color: "#666666",
//                     textDecoration: "none",
//                     fontWeight: 600,
//                     borderBottom: "2px solid #ddd",
//                     fontSize: "13px",
//                     transition: "border-color 0.25s ease",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.borderColor = "#111111";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.borderColor = "#ddd";
//                   }}
//                 >
//                   support@jcb-tools.co.uk
//                 </a>
//               </div>
//             </div>
//             <div
//               style={{
//                 background: "#fafafa",
//                 padding: "24px 28px",
//                 borderRadius: "16px",
//                 border: "1px solid #e8e8e8",
//                 transition: "all 0.25s ease",
//                 cursor: "pointer",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = "#f5f5f5";
//                 e.currentTarget.style.transform = "translateY(-2px)";
//                 e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.04)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "#fafafa";
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "none";
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: "15px",
//                   fontWeight: 700,
//                   color: "#111111",
//                   marginBottom: "4px",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "10px",
//                 }}
//               >
//                 📍 Visit Us
//               </div>
//               <div
//                 style={{ fontSize: "14px", color: "#555555", lineHeight: 1.6 }}
//               >
//                 <strong>Genpower Ltd</strong>
//                 <br />
//                 Isaac Way, London Road,
//                 <br />
//                 Pembroke Dock, Pembrokeshire,
//                 <br />
//                 SA72 4RW, United Kingdom
//               </div>
//             </div>
//             <div
//               style={{
//                 background: "#fafafa",
//                 padding: "24px 28px",
//                 borderRadius: "16px",
//                 border: "1px solid #e8e8e8",
//                 transition: "all 0.25s ease",
//                 cursor: "pointer",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = "#f5f5f5";
//                 e.currentTarget.style.transform = "translateY(-2px)";
//                 e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.04)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "#fafafa";
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "none";
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: "15px",
//                   fontWeight: 700,
//                   color: "#111111",
//                   marginBottom: "4px",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "10px",
//                 }}
//               >
//                 📋 Trade Account
//               </div>
//               <div
//                 style={{ fontSize: "14px", color: "#555555", lineHeight: 1.6 }}
//               >
//                 <p style={{ marginBottom: "8px" }}>
//                   Apply for a trade account to access exclusive pricing, bulk
//                   discounts, and special payment terms.
//                 </p>
//                 <a
//                   href="#trade"
//                   style={{
//                     color: "#111111",
//                     textDecoration: "none",
//                     fontWeight: 600,
//                     borderBottom: "2px solid #ddd",
//                     fontSize: "13px",
//                     transition: "border-color 0.25s ease",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.borderColor = "#111111";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.borderColor = "#ddd";
//                   }}
//                 >
//                   Register as a Trade Partner →
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ─── PRODUCT REGISTRATION SECTION ──────────────────── */}
//         <div style={styles.card}>
//           <h2 style={styles.cardTitle}>🔧 Product Registration</h2>
//           <p style={styles.cardSub}>
//             Register your JCB tool to activate warranty, get support, and
//             receive updates.
//           </p>

//           <div style={styles.benefitBox}>
//             <strong>✅ BENEFITS OF REGISTRATION</strong>
//             <br />
//             Efficient Product support – Our customer service team can quickly
//             identify you for product support.
//           </div>

//           <form onSubmit={handleRegSubmit}>
//             <div style={{ marginBottom: "20px" }}>
//               <h3
//                 style={{
//                   fontSize: "16px",
//                   fontWeight: 700,
//                   marginBottom: "10px",
//                 }}
//               >
//                 ADD YOUR PRODUCT INFORMATION
//               </h3>
//               <div style={styles.grid2}>
//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>Model Number *</label>
//                   <input
//                     type="text"
//                     name="modelNumber"
//                     value={regForm.modelNumber}
//                     onChange={handleRegChange}
//                     style={styles.formInput}
//                     required
//                   />
//                 </div>
//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>Date of Purchase *</label>
//                   <input
//                     type="date"
//                     name="dateOfPurchase"
//                     value={regForm.dateOfPurchase}
//                     onChange={handleRegChange}
//                     style={styles.formInput}
//                     required
//                   />
//                 </div>
//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>Purchased from</label>
//                   <input
//                     type="text"
//                     name="purchasedFrom"
//                     value={regForm.purchasedFrom}
//                     onChange={handleRegChange}
//                     style={styles.formInput}
//                   />
//                 </div>
//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>Serial Number *</label>
//                   <input
//                     type="text"
//                     name="serialNumber"
//                     value={regForm.serialNumber}
//                     onChange={handleRegChange}
//                     style={styles.formInput}
//                     required
//                   />
//                 </div>
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.formLabel}>Product label</label>
//                 <input
//                   type="file"
//                   name="productLabel"
//                   onChange={handleFileChange}
//                   style={styles.formFile}
//                   accept="image/*"
//                 />
//                 <span style={{ fontSize: "12px", color: "#999999" }}>
//                   No file chosen
//                 </span>
//               </div>
//             </div>

//             <div>
//               <h3
//                 style={{
//                   fontSize: "16px",
//                   fontWeight: 700,
//                   marginBottom: "10px",
//                 }}
//               >
//                 CONTACT INFORMATION
//               </h3>
//               <div style={styles.tabToggle}>
//                 <button
//                   type="button"
//                   style={{
//                     ...styles.tabBtn,
//                     ...(!regForm.hasAccount ? styles.tabBtnActive : {}),
//                   }}
//                   onClick={() =>
//                     setRegForm((prev) => ({ ...prev, hasAccount: false }))
//                   }
//                 >
//                   Create new account
//                 </button>
//                 <button
//                   type="button"
//                   style={{
//                     ...styles.tabBtn,
//                     ...(regForm.hasAccount ? styles.tabBtnActive : {}),
//                   }}
//                   onClick={() =>
//                     setRegForm((prev) => ({ ...prev, hasAccount: true }))
//                   }
//                 >
//                   I have an account
//                 </button>
//               </div>
//               <div
//                 style={{
//                   fontSize: "13px",
//                   color: "#999999",
//                   marginBottom: "12px",
//                 }}
//               >
//                 NOTE: All fields are mandatory
//               </div>
//               <div style={styles.grid2}>
//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>First name *</label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={regForm.firstName}
//                     onChange={handleRegChange}
//                     style={styles.formInput}
//                     required
//                   />
//                 </div>
//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>Last name *</label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={regForm.lastName}
//                     onChange={handleRegChange}
//                     style={styles.formInput}
//                     required
//                   />
//                 </div>
//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>Email Address *</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={regForm.email}
//                     onChange={handleRegChange}
//                     style={styles.formInput}
//                     required
//                   />
//                 </div>
//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>Password *</label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={regForm.password}
//                     onChange={handleRegChange}
//                     style={styles.formInput}
//                     required
//                   />
//                 </div>
//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>Confirm Password *</label>
//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     value={regForm.confirmPassword}
//                     onChange={handleRegChange}
//                     style={styles.formInput}
//                     required
//                   />
//                 </div>
//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>Trade/Occupation</label>
//                   <input
//                     type="text"
//                     name="tradeOccupation"
//                     value={regForm.tradeOccupation}
//                     onChange={handleRegChange}
//                     style={styles.formInput}
//                   />
//                 </div>
//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>Street Address *</label>
//                   <input
//                     type="text"
//                     name="street"
//                     value={regForm.street}
//                     onChange={handleRegChange}
//                     style={styles.formInput}
//                     required
//                   />
//                 </div>
//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>City *</label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={regForm.city}
//                     onChange={handleRegChange}
//                     style={styles.formInput}
//                     required
//                   />
//                 </div>
//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>Zip / Postal Code *</label>
//                   <input
//                     type="text"
//                     name="zip"
//                     value={regForm.zip}
//                     onChange={handleRegChange}
//                     style={styles.formInput}
//                     required
//                   />
//                 </div>
//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>Country *</label>
//                   <input
//                     type="text"
//                     name="country"
//                     value={regForm.country}
//                     onChange={handleRegChange}
//                     style={styles.formInput}
//                     required
//                   />
//                 </div>
//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>
//                     State/Province/Territory
//                   </label>
//                   <input
//                     type="text"
//                     name="state"
//                     value={regForm.state}
//                     onChange={handleRegChange}
//                     style={styles.formInput}
//                   />
//                 </div>
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.formCheck}>
//                   <input
//                     type="checkbox"
//                     name="receiveEmails"
//                     checked={regForm.receiveEmails}
//                     onChange={handleRegChange}
//                   />
//                   I WOULD LIKE TO RECEIVE INFORMATION ABOUT CAT® PRODUCTS AND
//                   PROMOTIONS BY EMAIL
//                 </label>
//               </div>
//             </div>

//             {regError && <div style={styles.formError}>{regError}</div>}
//             <button
//               type="submit"
//               style={styles.btnPrimary}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = "#333333";
//                 e.currentTarget.style.transform = "translateY(-2px)";
//                 e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "#111111";
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "none";
//               }}
//             >
//               Register Product
//             </button>
//             {regSubmitted && (
//               <div style={styles.formSuccess}>
//                 ✅ Registration submitted! We'll process your request and notify
//                 the admin.
//               </div>
//             )}
//           </form>
//         </div>

//         {/* ─── PARTS FINDER SECTION ──────────────────────────── */}
//         <div style={styles.card}>
//           <h2 style={styles.cardTitle}>🔩 Parts Finder</h2>
//           <p style={styles.cardSub}>
//             Select your product category and find the exact part you need.
//             Request it and our team will assist.
//           </p>

//           <div style={styles.formGroup}>
//             <label style={styles.formLabel}>Choose Product Category</label>
//             <select
//               value={selectedCategory}
//               onChange={handleCategoryChange}
//               style={styles.formSelect}
//             >
//               {Object.keys(productCatalog).map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div style={styles.partsList}>
//             <h4
//               style={{
//                 fontSize: "15px",
//                 fontWeight: 600,
//                 marginBottom: "10px",
//               }}
//             >
//               Available Parts for {selectedCategory}
//             </h4>
//             {productCatalog[selectedCategory]?.parts.map((part) => (
//               <div key={part.id} style={styles.partItem}>
//                 <div>
//                   <div style={styles.partName}>{part.name}</div>
//                   <div style={styles.partDesc}>
//                     {part.description} (ID: {part.id})
//                   </div>
//                 </div>
//                 <button
//                   style={styles.partAction}
//                   onClick={() => requestPart(part)}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = "#111111";
//                     e.currentTarget.style.color = "#ffffff";
//                     e.currentTarget.style.borderColor = "#111111";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = "none";
//                     e.currentTarget.style.color = "#111111";
//                     e.currentTarget.style.borderColor = "#ddd";
//                   }}
//                 >
//                   Request this part
//                 </button>
//               </div>
//             ))}
//           </div>
//           {partRequestSent && (
//             <div style={styles.formSuccess}>
//               ✅ Your part request has been sent to our support team. We'll
//               contact you shortly.
//             </div>
//           )}
//         </div>

//         {/* ─── SUPPORT SECTIONS (Accordion) ───────────────────── */}
//         <h2
//           style={{
//             fontSize: "22px",
//             fontWeight: 800,
//             color: "#111111",
//             marginBottom: "18px",
//           }}
//         >
//           Support & Information
//         </h2>
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//             gap: "16px",
//             marginBottom: "56px",
//           }}
//         >
//           {supportSections.map((section) => (
//             <div
//               key={section.id}
//               style={{
//                 background: "#fafafa",
//                 border: "1px solid #e8e8e8",
//                 borderRadius: "12px",
//                 overflow: "hidden",
//                 transition: "all 0.3s ease",
//                 cursor: "pointer",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.borderColor = "#cccccc";
//                 e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.04)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.borderColor = "#e8e8e8";
//                 e.currentTarget.style.boxShadow = "none";
//               }}
//               onClick={() => toggleSection(section.id)}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   padding: "16px 20px",
//                   fontWeight: 600,
//                   fontSize: "14px",
//                   color: "#111111",
//                   background: "#ffffff",
//                   borderBottom: "1px solid #e8e8e8",
//                 }}
//               >
//                 <span
//                   style={{ display: "flex", alignItems: "center", gap: "10px" }}
//                 >
//                   <span style={{ fontSize: "18px" }}>{section.icon}</span>
//                   {section.title}
//                 </span>
//                 <span
//                   style={{
//                     fontSize: "14px",
//                     color: "#999999",
//                     transition: "transform 0.3s ease",
//                     transform:
//                       expandedSection === section.id
//                         ? "rotate(180deg)"
//                         : "rotate(0)",
//                   }}
//                 >
//                   ▼
//                 </span>
//               </div>
//               <div
//                 style={{
//                   padding:
//                     expandedSection === section.id
//                       ? "16px 20px 20px"
//                       : "0 20px",
//                   maxHeight: expandedSection === section.id ? "300px" : "0",
//                   overflow: "hidden",
//                   transition: "all 0.4s ease",
//                   color: "#555555",
//                   fontSize: "14px",
//                   lineHeight: 1.7,
//                 }}
//               >
//                 {section.content}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ─── NEWS SECTION ───────────────────────────────────── */}
//         <div style={{ marginBottom: "56px" }}>
//           <div
//             style={{
//               fontSize: "24px",
//               fontWeight: 800,
//               color: "#111111",
//               marginBottom: "20px",
//               display: "flex",
//               alignItems: "center",
//               gap: "12px",
//             }}
//           >
//             📰 Latest News
//             <span
//               style={{ fontSize: "13px", fontWeight: 500, color: "#999999" }}
//             >
//               Click any card to read more
//             </span>
//           </div>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//               gap: "20px",
//             }}
//           >
//             {newsItems.map((news) => (
//               <div
//                 key={news.id}
//                 style={{
//                   background: "#fafafa",
//                   border: "1px solid #e8e8e8",
//                   borderRadius: "12px",
//                   padding: "22px 24px",
//                   transition: "all 0.3s ease",
//                   cursor: "pointer",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.borderColor = "#111111";
//                   e.currentTarget.style.transform = "translateY(-4px)";
//                   e.currentTarget.style.boxShadow =
//                     "0 8px 24px rgba(0,0,0,0.06)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.borderColor = "#e8e8e8";
//                   e.currentTarget.style.transform = "translateY(0)";
//                   e.currentTarget.style.boxShadow = "none";
//                 }}
//                 onClick={() => openNews(news)}
//               >
//                 <div
//                   style={{
//                     fontSize: "11px",
//                     fontWeight: 600,
//                     color: "#999999",
//                     textTransform: "uppercase",
//                     letterSpacing: "0.04em",
//                     marginBottom: "4px",
//                   }}
//                 >
//                   {news.date}
//                 </div>
//                 <div
//                   style={{
//                     fontSize: "17px",
//                     fontWeight: 700,
//                     color: "#111111",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   {news.title}
//                 </div>
//                 <div
//                   style={{
//                     fontSize: "14px",
//                     color: "#666666",
//                     lineHeight: 1.5,
//                   }}
//                 >
//                   {news.excerpt}
//                 </div>
//                 <div
//                   style={{
//                     display: "inline-block",
//                     marginTop: "10px",
//                     fontSize: "13px",
//                     fontWeight: 600,
//                     color: "#111111",
//                     borderBottom: "2px solid #ddd",
//                     transition: "border-color 0.25s ease",
//                   }}
//                 >
//                   Read more →
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ─── FOOTER ─────────────────────────────────────────── */}
//         <footer
//           style={{
//             borderTop: "1px solid #e8e8e8",
//             paddingTop: "40px",
//             marginTop: "16px",
//           }}
//         >
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
//               gap: "32px",
//               marginBottom: "32px",
//             }}
//           >
//             <div
//               style={{ display: "flex", flexDirection: "column", gap: "6px" }}
//             >
//               <div
//                 style={{
//                   fontSize: "13px",
//                   fontWeight: 700,
//                   color: "#111111",
//                   textTransform: "uppercase",
//                   letterSpacing: "0.04em",
//                   marginBottom: "6px",
//                 }}
//               >
//                 Company
//               </div>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 About Us
//               </button>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 News
//               </button>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 Careers
//               </button>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 Modern Slavery Statement
//               </button>
//             </div>
//             <div
//               style={{ display: "flex", flexDirection: "column", gap: "6px" }}
//             >
//               <div
//                 style={{
//                   fontSize: "13px",
//                   fontWeight: 700,
//                   color: "#111111",
//                   textTransform: "uppercase",
//                   letterSpacing: "0.04em",
//                   marginBottom: "6px",
//                 }}
//               >
//                 Support
//               </div>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 Delivery Information
//               </button>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 Warranty & Repairs
//               </button>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 Safe Handling Guides
//               </button>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 Product Manuals
//               </button>
//             </div>
//             <div
//               style={{ display: "flex", flexDirection: "column", gap: "6px" }}
//             >
//               <div
//                 style={{
//                   fontSize: "13px",
//                   fontWeight: 700,
//                   color: "#111111",
//                   textTransform: "uppercase",
//                   letterSpacing: "0.04em",
//                   marginBottom: "6px",
//                 }}
//               >
//                 Legal
//               </div>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 Privacy Policy
//               </button>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 Cookie Policy
//               </button>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 Website Terms of Use
//               </button>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 Consumer Terms of Sale
//               </button>
//             </div>
//             <div
//               style={{ display: "flex", flexDirection: "column", gap: "6px" }}
//             >
//               <div
//                 style={{
//                   fontSize: "13px",
//                   fontWeight: 700,
//                   color: "#111111",
//                   textTransform: "uppercase",
//                   letterSpacing: "0.04em",
//                   marginBottom: "6px",
//                 }}
//               >
//                 Trade
//               </div>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 Become a Registered Retailer
//               </button>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 Trade Registration
//               </button>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 Trade / Reseller Terms
//               </button>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 iwoca Pay Terms
//               </button>
//             </div>
//             <div
//               style={{ display: "flex", flexDirection: "column", gap: "6px" }}
//             >
//               <div
//                 style={{
//                   fontSize: "13px",
//                   fontWeight: 700,
//                   color: "#111111",
//                   textTransform: "uppercase",
//                   letterSpacing: "0.04em",
//                   marginBottom: "6px",
//                 }}
//               >
//                 Products
//               </div>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 JCB DIAMONDTECH™
//               </button>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 JCB Pro Tools
//               </button>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 Brushless Motors
//               </button>
//               <button
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   textDecoration: "none",
//                   padding: "3px 0",
//                   transition: "color 0.2s ease",
//                   cursor: "pointer",
//                   background: "none",
//                   border: "none",
//                   textAlign: "left",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
//               >
//                 Mesh Sanding
//               </button>
//             </div>
//             <div
//               style={{ display: "flex", flexDirection: "column", gap: "6px" }}
//             >
//               <div
//                 style={{
//                   fontSize: "13px",
//                   fontWeight: 700,
//                   color: "#111111",
//                   textTransform: "uppercase",
//                   letterSpacing: "0.04em",
//                   marginBottom: "6px",
//                 }}
//               >
//                 Address
//               </div>
//               <div
//                 style={{
//                   fontSize: "13px",
//                   color: "#666666",
//                   lineHeight: 1.7,
//                   marginTop: "4px",
//                 }}
//               >
//                 <strong>Genpower Ltd</strong>
//                 <br />
//                 Isaac Way, London Road,
//                 <br />
//                 Pembroke Dock,
//                 <br />
//                 Pembrokeshire, SA72 4RW
//                 <br />
//                 <br />
//                 <strong>📞</strong> 01646 404400
//                 <br />
//                 <strong>✉️</strong> sales@jcb-tools.co.uk
//               </div>
//             </div>
//           </div>
//           <div
//             style={{
//               borderTop: "1px solid #e8e8e8",
//               paddingTop: "20px",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexWrap: "wrap",
//               gap: "12px",
//               fontSize: "12px",
//               color: "#999999",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "12px",
//                 fontSize: "14px",
//                 fontWeight: 700,
//                 color: "#111111",
//               }}
//             >
//               <span style={{ fontSize: "20px" }}>🔧</span> JCB Tools
//             </div>
//             <div>Company Reg No. 5758983 &nbsp;·&nbsp; VAT No. 869 8911 50</div>
//             <div>© 2026 Genpower Ltd. All rights reserved.</div>
//           </div>
//         </footer>
//       </div>

//       {/* ─── NEWS MODAL ────────────────────────────────────── */}
//       {showNewsModal && selectedNews && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             background: "rgba(0,0,0,0.5)",
//             backdropFilter: "blur(6px)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 1000,
//             padding: "24px",
//             animation: "fadeIn 0.3s ease",
//           }}
//           onClick={closeNews}
//         >
//           <div
//             style={{
//               background: "#ffffff",
//               borderRadius: "20px",
//               maxWidth: "640px",
//               width: "100%",
//               padding: "40px",
//               maxHeight: "80vh",
//               overflowY: "auto",
//               boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
//               animation: "slideUp 0.35s ease",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               style={{
//                 float: "right",
//                 background: "none",
//                 border: "none",
//                 fontSize: "24px",
//                 color: "#999999",
//                 cursor: "pointer",
//                 padding: "4px 8px",
//                 transition: "color 0.25s ease",
//               }}
//               onClick={closeNews}
//               onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
//               onMouseLeave={(e) => (e.currentTarget.style.color = "#999999")}
//             >
//               ✕
//             </button>
//             <div
//               style={{
//                 fontSize: "26px",
//                 fontWeight: 800,
//                 color: "#111111",
//                 marginBottom: "6px",
//               }}
//             >
//               {selectedNews.title}
//             </div>
//             <div
//               style={{
//                 fontSize: "13px",
//                 color: "#999999",
//                 marginBottom: "16px",
//               }}
//             >
//               {selectedNews.date}
//             </div>
//             <div
//               style={{ fontSize: "15px", color: "#444444", lineHeight: 1.8 }}
//             >
//               {selectedNews.fullContent}
//             </div>
//             <div style={{ marginTop: "20px", textAlign: "right" }}>
//               <button
//                 onClick={closeNews}
//                 style={{
//                   padding: "10px 28px",
//                   background: "#111111",
//                   color: "#ffffff",
//                   border: "none",
//                   borderRadius: "8px",
//                   fontSize: "14px",
//                   fontWeight: 600,
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = "#333333";
//                   e.currentTarget.style.transform = "translateY(-2px)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = "#111111";
//                   e.currentTarget.style.transform = "translateY(0)";
//                 }}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ─── Global Keyframes ──────────────────────────────── */}
//       <style>{`
//         @keyframes shimmerText {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
//         @keyframes pulseDot {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.4; transform: scale(0.7); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(30px) scale(0.97); }
//           to { opacity: 1; transform: translateY(0) scale(1); }
//         }
//         @media (max-width: 768px) {
//           .two-col { grid-template-columns: 1fr !important; gap: 24px !important; }
//           .contact-bar { flex-direction: column; align-items: stretch; gap: 8px; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ContactPage;

import React, { useState } from "react";

// ─── Tool Catalog ──────────────────────────────────────────
const toolCatalog = {
  Drills: ["JCB-DR-1000", "JCB-DR-2000", "JCB-DR-PRO"],
  "Angle Grinders": ["JCB-AG-125", "JCB-AG-230", "JCB-AG-PRO"],
  "Circular Saws": ["JCB-CS-185", "JCB-CS-210", "JCB-CS-PRO"],
  Jigsaw: ["JCB-JS-65", "JCB-JS-85"],
};

const allTools = Object.values(toolCatalog).flat();

// ─── News Data ──────────────────────────────────────────────
const newsItems = [
  {
    id: 1,
    title: "JCB Launches New DIAMONDTECH™ Range",
    date: "15 July 2026",
    excerpt:
      "JCB Tools introduces the new DIAMONDTECH™ range with advanced diamond-tipped blades for superior cutting performance.",
    fullContent:
      "JCB Tools has unveiled its latest innovation – the DIAMONDTECH™ range of diamond-tipped cutting tools. This new line features advanced technology that delivers up to 40% faster cutting and 30% longer life compared to standard blades. The range includes circular saw blades, angle grinder discs, and specialized cutting wheels for masonry, tile, and metal applications.",
    image: "https://cdn-icons-png.flaticon.com/128/10845/10845567.png",
    category: "Product Launch",
  },
  {
    id: 2,
    title: "Brushless Motors: The Future of Power Tools",
    date: "8 July 2026",
    excerpt:
      "JCB Pro Tools now feature brushless motor technology for enhanced efficiency, longer runtime, and increased power.",
    fullContent:
      "Brushless motors represent a significant leap forward in power tool technology. Unlike traditional brushed motors, brushless motors offer higher efficiency, longer runtime, increased power-to-weight ratio, and extended tool life. JCB Pro Tools now incorporate this cutting-edge technology across their entire range of cordless power tools, providing professionals with superior performance on the job site.",
    image: "https://cdn-icons-png.flaticon.com/128/15412/15412741.png",
    category: "Technology",
  },
  {
    id: 3,
    title: "Mesh Sanding Technology – A Game Changer",
    date: "1 July 2026",
    excerpt:
      "JCB introduces mesh sanding technology that delivers a superior finish with reduced dust and faster material removal.",
    fullContent:
      "Mesh sanding technology represents a breakthrough in surface preparation. The open mesh design allows dust to be extracted through the pad, resulting in a cleaner work environment and a superior finish. The mesh design also prevents clogging, extends abrasive life, and provides faster material removal compared to traditional sanding paper.",
    image: "https://cdn-icons-png.flaticon.com/128/2203/2203124.png",
    category: "Innovation",
  },
];

// ─── Support Sections ──────────────────────────────────────
const supportSections = [
  {
    id: "delivery",
    title: "Delivery & Shipping Information",
    icon: "https://cdn-icons-png.flaticon.com/128/891/891399.png",
    content:
      "We offer fast and reliable delivery across the UK. Standard delivery takes 2-3 working days. Express delivery is available for next-day shipping. All orders are tracked and insured.",
  },
  {
    id: "warranty",
    title: "Warranty & Repairs",
    icon: "https://cdn-icons-png.flaticon.com/128/15412/15412741.png",
    content:
      "All JCB Tools come with a comprehensive warranty. For repairs, please contact our service center. We offer a 12-month warranty on all power tools and a 24-month warranty on JCB DIAMONDTECH™ products.",
  },
  {
    id: "safe-handling",
    title: "Safe Handling Guides & Operations",
    icon: "https://cdn-icons-png.flaticon.com/128/10342/10342199.png",
    content:
      "Our safe handling guides cover proper usage, maintenance, and safety protocols for all JCB power tools. Download our comprehensive safety manuals for detailed operational instructions.",
  },
  {
    id: "insurance",
    title: "Loxa Insurance Activation",
    icon: "https://cdn-icons-png.flaticon.com/128/6008/6008167.png",
    content:
      "Activate your Loxa insurance coverage for peace of mind. Our insurance plans cover accidental damage, theft, and breakdowns. Activation takes just 5 minutes online.",
  },
  {
    id: "payment",
    title: "Payment Options",
    icon: "https://cdn-icons-png.flaticon.com/128/10290/10290596.png",
    content:
      "We accept all major credit cards, PayPal, and bank transfers. Trade account holders enjoy special payment terms. iwoca Pay financing options are also available for eligible customers.",
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    icon: "https://cdn-icons-png.flaticon.com/128/13191/13191289.png",
    content:
      "Your privacy matters to us. We collect only the information needed to process your orders and provide support. We never share your data with third parties without your explicit consent.",
  },
];

// ─── Main Component ─────────────────────────────────────────
const ContactPage = () => {
  // ─── State ────────────────────────────────────────────────

  // Contact Form
  const [contactForm, setContactForm] = useState({
    companyName: "",
    fullName: "",
    email: "",
    phone: "",
    helpType: "",
    message: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState("");

  // Registration – Products
  const [products, setProducts] = useState([
    {
      modelNumber: "",
      modelId: "",
      purchaseDate: "",
      purchasedFrom: "",
      serialNumber: "",
      file: null,
    },
  ]);
  const [regForm, setRegForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    trade: "",
    street: "",
    city: "",
    zip: "",
    country: "",
    state: "",
    subscribe: false,
    accountType: "new",
  });
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [regError, setRegError] = useState("");
  const [showReference, setShowReference] = useState(false);
  const [showToolModal, setShowToolModal] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  // Parts Finder
  const [selectedCategory, setSelectedCategory] = useState("Drills");
  const [partSearchTerm, setPartSearchTerm] = useState("");
  const [partRequestSent, setPartRequestSent] = useState(false);

  // News Modal
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  // Support Accordion
  const [expandedSection, setExpandedSection] = useState(null);

  // ─── Handlers ─────────────────────────────────────────────

  // Contact
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactError("");
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      if (!res.ok) throw new Error("Failed");
      setContactSubmitted(true);
      setTimeout(() => setContactSubmitted(false), 3000);
      setContactForm({
        companyName: "",
        fullName: "",
        email: "",
        phone: "",
        helpType: "",
        message: "",
      });
    } catch (err) {
      setContactError("Could not send message.");
      const existing = JSON.parse(
        localStorage.getItem("contactRequests") || "[]",
      );
      existing.push({ ...contactForm, timestamp: new Date().toISOString() });
      localStorage.setItem("contactRequests", JSON.stringify(existing));
      setContactSubmitted(true);
      setTimeout(() => setContactSubmitted(false), 3000);
    }
  };

  // Registration – Product rows
  const addProductRow = () => {
    setProducts((prev) => [
      ...prev,
      {
        modelNumber: "",
        modelId: "",
        purchaseDate: "",
        purchasedFrom: "",
        serialNumber: "",
        file: null,
      },
    ]);
  };

  const removeProductRow = (index) => {
    if (products.length === 1) return;
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const updateProduct = (index, field, value) => {
    setProducts((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    );
  };

  const handleFileChange = (index, e) => {
    if (e.target.files && e.target.files[0]) {
      updateProduct(index, "file", e.target.files[0]);
    }
  };

  // Tool modal
  const openToolModal = (index) => {
    setCurrentProductIndex(index);
    setShowToolModal(true);
  };

  const selectTool = (toolName) => {
    updateProduct(currentProductIndex, "modelNumber", toolName);
    updateProduct(currentProductIndex, "modelId", toolName);
    setShowToolModal(false);
  };

  // Reference image
  const toggleReference = () => setShowReference((prev) => !prev);

  // Registration – form fields
  const handleRegChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (regForm.accountType === "new") {
      if (regForm.password !== regForm.confirmPassword) {
        setRegError("Passwords do not match");
        return;
      }
      if (
        !regForm.firstName ||
        !regForm.lastName ||
        !regForm.email ||
        !regForm.password
      ) {
        setRegError("All fields are mandatory");
        return;
      }
    } else {
      if (!regForm.email || !regForm.password) {
        setRegError("Email and password required");
        return;
      }
    }
    setRegError("");

    const payload = {
      accountType: regForm.accountType,
      products: products.map((p) => ({
        modelNumber: p.modelNumber,
        modelId: p.modelId,
        purchaseDate: p.purchaseDate,
        purchasedFrom: p.purchasedFrom,
        serialNumber: p.serialNumber,
      })),
      firstName: regForm.firstName,
      lastName: regForm.lastName,
      email: regForm.email,
      password: regForm.password,
      trade: regForm.trade,
      street: regForm.street,
      city: regForm.city,
      zip: regForm.zip,
      country: regForm.country,
      state: regForm.state,
      subscribe: regForm.subscribe,
    };

    try {
      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        if (key === "products") {
          formData.append(key, JSON.stringify(payload[key]));
        } else {
          formData.append(key, payload[key]);
        }
      });
      products.forEach((p, idx) => {
        if (p.file) {
          formData.append(`file_${idx}`, p.file);
        }
      });

      const res = await fetch("/api/registrations", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Registration failed");
      const data = await res.json();
      console.log("Registration success:", data);
      setRegSubmitted(true);
      setTimeout(() => {
        setRegSubmitted(false);
        setProducts([
          {
            modelNumber: "",
            modelId: "",
            purchaseDate: "",
            purchasedFrom: "",
            serialNumber: "",
            file: null,
          },
        ]);
        setRegForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          trade: "",
          street: "",
          city: "",
          zip: "",
          country: "",
          state: "",
          subscribe: false,
          accountType: "new",
        });
      }, 3000);
    } catch (err) {
      console.error("Registration API error:", err);
      const existing = JSON.parse(
        localStorage.getItem("registrations") || "[]",
      );
      existing.push({ ...payload, timestamp: new Date().toISOString() });
      localStorage.setItem("registrations", JSON.stringify(existing));
      setRegSubmitted(true);
      setTimeout(() => setRegSubmitted(false), 3000);
    }
  };

  // Parts Finder
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setPartSearchTerm("");
  };

  const requestPart = async (part) => {
    try {
      const res = await fetch("/api/part-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: selectedCategory, part }),
      });
      if (!res.ok) throw new Error("Failed");
    } catch (err) {
      console.error("Part request error:", err);
      const existing = JSON.parse(localStorage.getItem("partRequests") || "[]");
      existing.push({
        category: selectedCategory,
        part,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("partRequests", JSON.stringify(existing));
    }
    setPartRequestSent(true);
    setTimeout(() => setPartRequestSent(false), 3000);
  };

  // News
  const openNews = (news) => {
    setSelectedNews(news);
    setShowNewsModal(true);
  };
  const closeNews = () => {
    setShowNewsModal(false);
    setSelectedNews(null);
  };

  // Support
  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  // ─── Render ──────────────────────────────────────────────
  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        paddingTop: "80px",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "#111",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
        }}
      >
        {/* Background images (watermark) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            backgroundImage: `url(https://www.catpowertools.com/upload/about/1764266983657846888.jpg), url(https://www.catpowertools.com/upload/about/1768262785880438031.jpg), url(https://www.catpowertools.com/upload/about/1770831062014238082.jpg), url(https://www.catpowertools.com/upload/about/1740531304824924879.jpg)`,
            backgroundSize: "contain, contain, contain, contain",
            backgroundPosition:
              "top left, top right, bottom left, bottom right",
            backgroundRepeat: "no-repeat",
            opacity: 0.06,
          }}
        />

        {/* Content container */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* ─── TOP CONTACT BAR ──────────────────────────────── */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              padding: "16px 0",
              borderBottom: "1px solid #f0f0f0",
              marginBottom: "40px",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                flexWrap: "wrap",
              }}
            >
              <a
                href="tel:01646404400"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#111",
                  textDecoration: "none",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  background: "#f8f8f8",
                  border: "1px solid transparent",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f0f0f0";
                  e.currentTarget.style.borderColor = "#ddd";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f8f8f8";
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10845/10845567.png"
                  alt="phone"
                  style={{ width: "20px", height: "20px" }}
                />{" "}
                01646 404400
              </a>
              <a
                href="mailto:sales@jcb-tools.co.uk"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#111",
                  textDecoration: "none",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  background: "#f8f8f8",
                  border: "1px solid transparent",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f0f0f0";
                  e.currentTarget.style.borderColor = "#ddd";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f8f8f8";
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/8898/8898833.png"
                  alt="email"
                  style={{ width: "20px", height: "20px" }}
                />{" "}
                sales@jcb-tools.co.uk
              </a>
            </div>
            <div style={{ fontSize: "13px", color: "#888" }}>
              Mon–Fri 8:00 – 17:30 · Sat 9:00 – 13:00
            </div>
          </div>
          {/* ─── HERO ────────────────────────────────────────── */}
          <div
            style={{
              textAlign: "center",
              padding: "32px 20px 48px",
              marginBottom: "48px",
              borderRadius: "20px",
              background: "#fafafa",
              border: "1px solid #f0f0f0",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#f0f0f0",
                color: "#111",
                padding: "6px 18px 6px 14px",
                borderRadius: "100px",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "18px",
                border: "1px solid #e0e0e0",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#111",
                  animation: "pulseDot 2s ease-in-out infinite",
                }}
              ></span>{" "}
              We're here to help
            </div>
            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 900,
                color: "#111",
                textTransform: "uppercase",
                letterSpacing: "-0.03em",
                marginBottom: "12px",
              }}
            >
              Contact{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #111, #444, #111)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmerText 4s ease-in-out infinite",
                }}
              >
                Us
              </span>
            </h1>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "#666",
                maxWidth: "620px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Have questions about our power tools, spare parts, or need
              tactical support? Reach out to our expert team today.
            </p>
          </div>
          {/* ─── TWO‑COLUMN: CONTACT FORM + INFO ──────────────── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "48px",
              marginBottom: "64px",
            }}
          >
            {/* Contact Form */}
            <div
              style={{
                background: "#fff",
                padding: "28px 32px",
                borderRadius: "16px",
                border: "1px solid #e8e8e8",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                marginBottom: "0",
              }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#111",
                  marginBottom: "6px",
                }}
              >
                Send us a message
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "#888",
                  marginBottom: "20px",
                }}
              >
                Fill in the form and we'll get back to you within 24 hours.
              </p>
              <form onSubmit={handleContactSubmit}>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#333",
                      marginBottom: "4px",
                    }}
                  >
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={contactForm.companyName}
                    onChange={handleContactChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: "14px",
                      border: "1.5px solid #e0e0e0",
                      borderRadius: "8px",
                      background: "#fafafa",
                      color: "#111",
                      outline: "none",
                    }}
                    required
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#333",
                      marginBottom: "4px",
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={contactForm.fullName}
                    onChange={handleContactChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: "14px",
                      border: "1.5px solid #e0e0e0",
                      borderRadius: "8px",
                      background: "#fafafa",
                      color: "#111",
                      outline: "none",
                    }}
                    required
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#333",
                      marginBottom: "4px",
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: "14px",
                      border: "1.5px solid #e0e0e0",
                      borderRadius: "8px",
                      background: "#fafafa",
                      color: "#111",
                      outline: "none",
                    }}
                    required
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#333",
                      marginBottom: "4px",
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: "14px",
                      border: "1.5px solid #e0e0e0",
                      borderRadius: "8px",
                      background: "#fafafa",
                      color: "#111",
                      outline: "none",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#333",
                      marginBottom: "4px",
                    }}
                  >
                    How can we help? *
                  </label>
                  <select
                    name="helpType"
                    value={contactForm.helpType}
                    onChange={handleContactChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: "14px",
                      border: "1.5px solid #e0e0e0",
                      borderRadius: "8px",
                      background: "#fafafa",
                      color: "#111",
                      outline: "none",
                      appearance: "none",
                      cursor: "pointer",
                    }}
                    required
                  >
                    <option value="">Select an option...</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="warranty">Warranty & Repairs</option>
                    <option value="spare-parts">Spare Parts</option>
                    <option value="trade">Trade / Reseller</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#333",
                      marginBottom: "4px",
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: "14px",
                      border: "1.5px solid #e0e0e0",
                      borderRadius: "8px",
                      background: "#fafafa",
                      color: "#111",
                      outline: "none",
                      resize: "vertical",
                      minHeight: "80px",
                    }}
                    required
                  />
                </div>
                {contactError && (
                  <div
                    style={{
                      color: "#cc0000",
                      fontSize: "13px",
                      marginTop: "6px",
                    }}
                  >
                    {contactError}
                  </div>
                )}
                <button
                  type="submit"
                  style={{
                    padding: "12px 28px",
                    background: "#111",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#333";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#111";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Send Message →
                </button>
                {contactSubmitted && (
                  <div
                    style={{
                      background: "#f0faf0",
                      color: "#1a7a1a",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: 600,
                      textAlign: "center",
                      border: "1px solid #b8e0b8",
                      marginTop: "12px",
                    }}
                  >
                    ✅ Thank you! We'll get back to you within 24 hours.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info Side */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div
                style={{
                  background: "#fafafa",
                  padding: "24px 28px",
                  borderRadius: "16px",
                  border: "1px solid #e8e8e8",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f5f5f5";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fafafa";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#111",
                    marginBottom: "4px",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/10845/10845567.png"
                    alt="phone"
                    style={{ width: "24px", height: "24px" }}
                  />{" "}
                  Call Us
                </div>
                <div
                  style={{ fontSize: "14px", color: "#555", lineHeight: 1.6 }}
                >
                  <a
                    href="tel:01646404400"
                    style={{
                      color: "#111",
                      textDecoration: "none",
                      fontWeight: 600,
                      borderBottom: "2px solid #ddd",
                      transition: "border-color 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#111";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#ddd";
                    }}
                  >
                    01646 404400
                  </a>
                  <br />
                  <span style={{ fontSize: "13px", color: "#999" }}>
                    Mon–Fri 8:00–17:30 · Sat 9:00–13:00
                  </span>
                </div>
              </div>
              <div
                style={{
                  background: "#fafafa",
                  padding: "24px 28px",
                  borderRadius: "16px",
                  border: "1px solid #e8e8e8",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f5f5f5";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fafafa";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#111",
                    marginBottom: "4px",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/8898/8898833.png"
                    alt="email"
                    style={{ width: "24px", height: "24px" }}
                  />{" "}
                  Email Us
                </div>
                <div
                  style={{ fontSize: "14px", color: "#555", lineHeight: 1.6 }}
                >
                  <a
                    href="mailto:sales@jcb-tools.co.uk"
                    style={{
                      color: "#111",
                      textDecoration: "none",
                      fontWeight: 600,
                      borderBottom: "2px solid #ddd",
                      transition: "border-color 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#111";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#ddd";
                    }}
                  >
                    sales@jcb-tools.co.uk
                  </a>
                  <br />
                  <a
                    href="mailto:support@jcb-tools.co.uk"
                    style={{
                      color: "#666",
                      textDecoration: "none",
                      fontWeight: 600,
                      borderBottom: "2px solid #ddd",
                      fontSize: "13px",
                      transition: "border-color 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#111";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#ddd";
                    }}
                  >
                    support@jcb-tools.co.uk
                  </a>
                </div>
              </div>
              <div
                style={{
                  background: "#fafafa",
                  padding: "24px 28px",
                  borderRadius: "16px",
                  border: "1px solid #e8e8e8",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f5f5f5";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fafafa";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#111",
                    marginBottom: "4px",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/11525/11525509.png"
                    alt="location"
                    style={{ width: "24px", height: "24px" }}
                  />{" "}
                  Visit Us
                </div>
                <div
                  style={{ fontSize: "14px", color: "#555", lineHeight: 1.6 }}
                >
                  <strong>Genpower Ltd</strong>
                  <br />
                  Isaac Way, London Road,
                  <br />
                  Pembroke Dock, Pembrokeshire,
                  <br />
                  SA72 4RW, United Kingdom
                </div>
              </div>
              <div
                style={{
                  background: "#fafafa",
                  padding: "24px 28px",
                  borderRadius: "16px",
                  border: "1px solid #e8e8e8",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f5f5f5";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fafafa";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#111",
                    marginBottom: "4px",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/19013/19013080.png"
                    alt="trade"
                    style={{ width: "24px", height: "24px" }}
                  />{" "}
                  Trade Account
                </div>
                <div
                  style={{ fontSize: "14px", color: "#555", lineHeight: 1.6 }}
                >
                  <p style={{ marginBottom: "8px" }}>
                    Apply for a trade account to access exclusive pricing, bulk
                    discounts, and special payment terms.
                  </p>
                  <a
                    href="#trade"
                    style={{
                      color: "#111",
                      textDecoration: "none",
                      fontWeight: 600,
                      borderBottom: "2px solid #ddd",
                      fontSize: "13px",
                      transition: "border-color 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#111";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#ddd";
                    }}
                  >
                    Register as a Trade Partner →
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* ─── REGISTRATION SECTION ──────────────────────────── */}
          <div
            style={{
              background: "#fff",
              padding: "28px 32px",
              borderRadius: "16px",
              border: "1px solid #e8e8e8",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              marginBottom: "40px",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#111" }}>
                BENEFITS OF REGISTRATION
              </h3>
              <p style={{ fontSize: "14px", color: "#555", marginTop: "4px" }}>
                Efficient Product support and Our customer service team can
                quickly identify you for product support
              </p>
            </div>

            {/* ADD YOUR PRODUCT INFORMATION */}
            <div style={{ marginBottom: "30px" }}>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#111",
                  marginBottom: "12px",
                }}
              >
                ADD YOUR PRODUCT INFORMATION
              </h3>
              <form onSubmit={handleRegSubmit}>
                {products.map((product, idx) => (
                  <div
                    key={idx}
                    style={{
                      borderBottom:
                        idx < products.length - 1 ? "1px solid #eee" : "none",
                      paddingBottom: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(200px, 1fr))",
                        gap: "12px",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#333",
                            marginBottom: "4px",
                          }}
                        >
                          Model Number:
                        </p>
                        <div style={{ display: "flex", gap: "4px" }}>
                          <input
                            type="text"
                            value={product.modelNumber}
                            readOnly
                            style={{
                              flex: 1,
                              padding: "8px 10px",
                              border: "1px solid #ddd",
                              borderRadius: "6px",
                              background: "#f5f5f5",
                              fontSize: "13px",
                            }}
                          />
                          <input type="hidden" value={product.modelId} />
                          <button
                            type="button"
                            onClick={() => openToolModal(idx)}
                            style={{
                              padding: "6px 12px",
                              background: "#111",
                              color: "#fff",
                              border: "none",
                              borderRadius: "6px",
                              fontSize: "11px",
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            SELECT TOOLS
                          </button>
                          {products.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeProductRow(idx)}
                              style={{
                                padding: "6px 10px",
                                background: "#dc2626",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "11px",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#333",
                            marginBottom: "4px",
                          }}
                        >
                          Date of Purchase:
                        </p>
                        <input
                          type="date"
                          value={product.purchaseDate}
                          onChange={(e) =>
                            updateProduct(idx, "purchaseDate", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "8px 10px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            background: "#fff",
                            fontSize: "13px",
                          }}
                        />
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#333",
                            marginBottom: "4px",
                          }}
                        >
                          Purchased from:
                        </p>
                        <input
                          type="text"
                          value={product.purchasedFrom}
                          onChange={(e) =>
                            updateProduct(idx, "purchasedFrom", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "8px 10px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            background: "#fff",
                            fontSize: "13px",
                          }}
                        />
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#333",
                            marginBottom: "4px",
                          }}
                        >
                          Serial Number:
                        </p>
                        <input
                          type="text"
                          value={product.serialNumber}
                          onChange={(e) =>
                            updateProduct(idx, "serialNumber", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "8px 10px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            background: "#fff",
                            fontSize: "13px",
                          }}
                        />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#333",
                            marginBottom: "4px",
                          }}
                        >
                          Product label:
                        </p>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <button
                              type="button"
                              style={{
                                padding: "6px 16px",
                                background: "#f0f0f0",
                                border: "1px solid #ddd",
                                borderRadius: "6px",
                                fontSize: "12px",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              UPLOAD
                            </button>
                            <input
                              type="file"
                              accept="image/jpeg,image/png"
                              onChange={(e) => handleFileChange(idx, e)}
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                width: "100%",
                                height: "100%",
                                opacity: 0,
                                cursor: "pointer",
                              }}
                            />
                          </div>
                          {product.file && (
                            <span
                              style={{ fontSize: "12px", color: "#1a7a1a" }}
                            >
                              {product.file.name}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={toggleReference}
                            style={{
                              padding: "6px 16px",
                              background: "#f0f0f0",
                              border: "1px solid #ddd",
                              borderRadius: "6px",
                              fontSize: "12px",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            REFERENCE
                          </button>
                          {showReference && (
                            <div style={{ marginLeft: "8px" }}>
                              <img
                                src="https://www.catpowertools.com/upload/about/1764266983657846888.jpg"
                                alt="reference"
                                style={{
                                  width: "100px",
                                  height: "auto",
                                  border: "1px solid #ddd",
                                  borderRadius: "4px",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                  <button
                    type="submit"
                    style={{
                      padding: "10px 24px",
                      background: "#111",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    SUBMIT
                  </button>
                  <button
                    type="button"
                    onClick={addProductRow}
                    style={{
                      padding: "10px 24px",
                      background: "#f0f0f0",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    ADD ANOTHER TOOL
                  </button>
                </div>
              </form>
            </div>

            {/* CONTACT INFORMATION */}
            <div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#111",
                  marginBottom: "12px",
                }}
              >
                CONTACT INFORMATION
              </h3>
              <div
                style={{ display: "flex", gap: "12px", marginBottom: "16px" }}
              >
                <button
                  onClick={() =>
                    setRegForm((prev) => ({ ...prev, accountType: "new" }))
                  }
                  style={{
                    padding: "8px 20px",
                    border: "1.5px solid #e0e0e0",
                    borderRadius: "6px",
                    background: regForm.accountType === "new" ? "#111" : "#fff",
                    color: regForm.accountType === "new" ? "#fff" : "#666",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Create new account
                </button>
                <button
                  onClick={() =>
                    setRegForm((prev) => ({ ...prev, accountType: "existing" }))
                  }
                  style={{
                    padding: "8px 20px",
                    border: "1.5px solid #e0e0e0",
                    borderRadius: "6px",
                    background:
                      regForm.accountType === "existing" ? "#111" : "#fff",
                    color: regForm.accountType === "existing" ? "#fff" : "#666",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  I have an account
                </button>
              </div>

              {regForm.accountType === "new" ? (
                <form onSubmit={handleRegSubmit}>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#999",
                      marginBottom: "12px",
                    }}
                  >
                    NOTE: All fields are mandatory
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        First name:
                      </p>
                      <input
                        type="text"
                        name="firstName"
                        value={regForm.firstName}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Last name:
                      </p>
                      <input
                        type="text"
                        name="lastName"
                        value={regForm.lastName}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Email Address:
                      </p>
                      <input
                        type="email"
                        name="email"
                        value={regForm.email}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Password:
                      </p>
                      <input
                        type="password"
                        name="password"
                        value={regForm.password}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Confirm Password:
                      </p>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={regForm.confirmPassword}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Trade/Occupation:
                      </p>
                      <input
                        type="text"
                        name="trade"
                        value={regForm.trade}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Street Address:
                      </p>
                      <input
                        type="text"
                        name="street"
                        value={regForm.street}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        City:
                      </p>
                      <input
                        type="text"
                        name="city"
                        value={regForm.city}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Zip / Postal Code:
                      </p>
                      <input
                        type="text"
                        name="zip"
                        value={regForm.zip}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Country:
                      </p>
                      <input
                        type="text"
                        name="country"
                        value={regForm.country}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        State/Province/Territory:
                      </p>
                      <input
                        type="text"
                        name="state"
                        value={regForm.state}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "16px" }}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#333",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        name="subscribe"
                        checked={regForm.subscribe}
                        onChange={handleRegChange}
                      />
                      I WOULD LIKE TO RECEIVE INFORMATION ABOUT CAT® PRODUCTS
                      AND PROMOTIONS BY EMAIL
                    </label>
                  </div>
                  <div style={{ marginTop: "16px" }}>
                    <button
                      type="submit"
                      style={{
                        padding: "10px 32px",
                        background: "#111",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Register
                    </button>
                  </div>
                  {regError && (
                    <div
                      style={{
                        color: "#cc0000",
                        fontSize: "13px",
                        marginTop: "8px",
                      }}
                    >
                      {regError}
                    </div>
                  )}
                  {regSubmitted && (
                    <div
                      style={{
                        background: "#f0faf0",
                        color: "#1a7a1a",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: 600,
                        textAlign: "center",
                        border: "1px solid #b8e0b8",
                        marginTop: "12px",
                      }}
                    >
                      ✅ Registration submitted! We'll process your request and
                      notify the admin.
                    </div>
                  )}
                </form>
              ) : (
                <form onSubmit={handleRegSubmit}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Email Address:
                      </p>
                      <input
                        type="email"
                        name="email"
                        value={regForm.email}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        placeholder="Email Address"
                        required
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: "4px",
                        }}
                      >
                        Password:
                      </p>
                      <input
                        type="password"
                        name="password"
                        value={regForm.password}
                        onChange={handleRegChange}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          background: "#fff",
                          fontSize: "13px",
                        }}
                        placeholder="Password"
                        required
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "16px" }}>
                    <button
                      type="submit"
                      style={{
                        padding: "10px 32px",
                        background: "#111",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      LOG IN
                    </button>
                  </div>
                  {regError && (
                    <div
                      style={{
                        color: "#cc0000",
                        fontSize: "13px",
                        marginTop: "8px",
                      }}
                    >
                      {regError}
                    </div>
                  )}
                  {regSubmitted && (
                    <div
                      style={{
                        background: "#f0faf0",
                        color: "#1a7a1a",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: 600,
                        textAlign: "center",
                        border: "1px solid #b8e0b8",
                        marginTop: "12px",
                      }}
                    >
                      ✅ Login successful! Redirecting...
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
          {/* ─── PARTS FINDER ──────────────────────────────────── */}
          <div
            style={{
              background: "#fff",
              padding: "28px 32px",
              borderRadius: "16px",
              border: "1px solid #e8e8e8",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              marginBottom: "40px",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#111",
                marginBottom: "6px",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/13191/13191289.png"
                alt="parts"
                style={{
                  width: "28px",
                  height: "28px",
                  marginRight: "10px",
                  verticalAlign: "middle",
                }}
              />
              Parts Finder
            </h2>
            <p
              style={{ fontSize: "14px", color: "#888", marginBottom: "20px" }}
            >
              Select your product category and find the exact part you need.
              Request it and our team will assist.
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                marginBottom: "16px",
              }}
            >
              <div style={{ flex: 1, minWidth: "200px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#333",
                    marginBottom: "4px",
                  }}
                >
                  Choose Product Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    fontSize: "14px",
                    border: "1.5px solid #e0e0e0",
                    borderRadius: "8px",
                    background: "#fafafa",
                    color: "#111",
                    outline: "none",
                    appearance: "none",
                    cursor: "pointer",
                  }}
                >
                  {Object.keys(toolCatalog).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 2, minWidth: "200px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#333",
                    marginBottom: "4px",
                  }}
                >
                  Search Parts
                </label>
                <input
                  type="text"
                  placeholder="Search by name, description, or ID"
                  value={partSearchTerm}
                  onChange={(e) => setPartSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    fontSize: "14px",
                    border: "1.5px solid #e0e0e0",
                    borderRadius: "8px",
                    background: "#fafafa",
                    color: "#111",
                    outline: "none",
                  }}
                />
              </div>
            </div>
            <div>
              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "10px",
                }}
              >
                Available Parts for {selectedCategory}
              </h4>
              {toolCatalog[selectedCategory]?.map((part) => (
                <div
                  key={part}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    borderBottom: "1px solid #f0f0f0",
                    fontSize: "14px",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: "#111" }}>{part}</div>
                    <div style={{ color: "#666", fontSize: "13px" }}>
                      Part ID: {part.replace(/\s/g, "-")}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      requestPart({ name: part, id: part.replace(/\s/g, "-") })
                    }
                    style={{
                      background: "none",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      padding: "4px 12px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      color: "#111",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#111";
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.borderColor = "#111";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "none";
                      e.currentTarget.style.color = "#111";
                      e.currentTarget.style.borderColor = "#ddd";
                    }}
                  >
                    Request this part
                  </button>
                </div>
              ))}
            </div>
            {partRequestSent && (
              <div
                style={{
                  background: "#f0faf0",
                  color: "#1a7a1a",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textAlign: "center",
                  border: "1px solid #b8e0b8",
                  marginTop: "12px",
                }}
              >
                ✅ Your part request has been sent to our support team.
              </div>
            )}
          </div>
          {/* ─── SUPPORT SECTIONS ────────────────────────────── */}
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#111",
              marginBottom: "18px",
            }}
          >
            Support & Information
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "16px",
              marginBottom: "56px",
            }}
          >
            {supportSections.map((section) => (
              <div
                key={section.id}
                style={{
                  background: "#fafafa",
                  border: "1px solid #e8e8e8",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ccc";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e8e8e8";
                  e.currentTarget.style.boxShadow = "none";
                }}
                onClick={() => toggleSection(section.id)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 20px",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#111",
                    background: "#fff",
                    borderBottom: "1px solid #e8e8e8",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={section.icon}
                      alt=""
                      style={{ width: "24px", height: "24px" }}
                    />{" "}
                    {section.title}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#999",
                      transition: "transform 0.3s ease",
                      transform:
                        expandedSection === section.id
                          ? "rotate(180deg)"
                          : "rotate(0)",
                    }}
                  >
                    ▼
                  </span>
                </div>
                <div
                  style={{
                    padding:
                      expandedSection === section.id
                        ? "16px 20px 20px"
                        : "0 20px",
                    maxHeight: expandedSection === section.id ? "300px" : "0",
                    overflow: "hidden",
                    transition: "all 0.4s ease",
                    color: "#555",
                    fontSize: "14px",
                    lineHeight: 1.7,
                  }}
                >
                  {section.content}
                </div>
              </div>
            ))}
          </div>
          {/* ─── NEWS SECTION ──────────────────────────────────── */}
          <div style={{ marginBottom: "56px" }}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#111",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/2203/2203124.png"
                alt="news"
                style={{ width: "28px", height: "28px" }}
              />
              Latest News
              <span
                style={{ fontSize: "13px", fontWeight: 500, color: "#999" }}
              >
                Click any card to read more
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {newsItems.map((news) => (
                <div
                  key={news.id}
                  style={{
                    background: "#fafafa",
                    border: "1px solid #e8e8e8",
                    borderRadius: "12px",
                    padding: "22px 24px",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#111";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e8e8e8";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  onClick={() => openNews(news)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "8px",
                    }}
                  >
                    <img
                      src={news.image}
                      alt=""
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#999",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {news.date}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#dc2626",
                        }}
                      >
                        {news.category}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#111",
                      marginBottom: "8px",
                    }}
                  >
                    {news.title}
                  </div>
                  <div
                    style={{ fontSize: "14px", color: "#666", lineHeight: 1.5 }}
                  >
                    {news.excerpt}
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#111",
                      borderBottom: "2px solid #ddd",
                      transition: "border-color 0.25s ease",
                    }}
                  >
                    Read more →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── TOOL SELECT MODAL ──────────────────────────────── */}
      {showToolModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "32px",
              borderRadius: "16px",
              maxWidth: "500px",
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 800,
                marginBottom: "16px",
              }}
            >
              Select a Tool
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {allTools.map((tool) => (
                <button
                  key={tool}
                  onClick={() => selectTool(tool)}
                  style={{
                    padding: "10px 16px",
                    background: "#f0f0f0",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 500,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#e0e0e0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#f0f0f0")
                  }
                >
                  {tool}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowToolModal(false)}
              style={{
                marginTop: "16px",
                padding: "8px 20px",
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ─── NEWS MODAL ────────────────────────────────────── */}
      {showNewsModal && selectedNews && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "24px",
            animation: "fadeIn 0.3s ease",
          }}
          onClick={closeNews}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              maxWidth: "640px",
              width: "100%",
              padding: "40px",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
              animation: "slideUp 0.35s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                float: "right",
                background: "none",
                border: "none",
                fontSize: "24px",
                color: "#999",
                cursor: "pointer",
                padding: "4px 8px",
                transition: "color 0.25s ease",
              }}
              onClick={closeNews}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
            >
              ✕
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <img
                src={selectedNews.image}
                alt=""
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />
              <div>
                <div
                  style={{ fontSize: "26px", fontWeight: 800, color: "#111" }}
                >
                  {selectedNews.title}
                </div>
                <div style={{ fontSize: "13px", color: "#999" }}>
                  {selectedNews.date} · {selectedNews.category}
                </div>
              </div>
            </div>
            <div style={{ fontSize: "15px", color: "#444", lineHeight: 1.8 }}>
              {selectedNews.fullContent}
            </div>
            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <button
                onClick={closeNews}
                style={{
                  padding: "10px 28px",
                  background: "#111",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#333";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#111";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Global Keyframes ──────────────────────────────── */}
      <style>{`
        @keyframes shimmerText { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes pulseDot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.7); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @media (max-width: 768px) { .two-col { grid-template-columns: 1fr !important; gap: 24px !important; } }
      `}</style>
    </div>
  );
};

export default ContactPage;
