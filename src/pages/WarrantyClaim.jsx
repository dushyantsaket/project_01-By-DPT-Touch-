// import React, { useState } from 'react';
// import { ShieldCheck, FileText, Calendar, Send, CheckCircle, AlertCircle, Camera, QrCode, ClipboardList, Info, ChevronRight, ShieldAlert, BadgeCheck, Clock, Mail, Smartphone } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const inputStyle = { width: '100%', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px 14px', fontSize: '13px', fontWeight: 600, color: '#111', outline: 'none' };
// const labelStyle = { fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', display: 'block', marginBottom: '6px' };

// const WarrantyClaim = () => {
//   const { isLoggedIn, user: authUser } = useAuth();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('policies');
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [claimForm, setClaimForm] = useState({
//     productName: '', modelNo: '', purchaseDate: '', invoiceNo: '#DPT-INV-',
//     mainIssue: '', description: '', severity: 'Medium', reasons: [],
//     hasWarrantyCard: 'yes',
//     photos: { problem: [], warranty: null, invoice: null, serial: null }
//   });

//   const policies = [
//     { title: "Standard Warranty", duration: "12 Months", accent: '#3b82f6', bg: '#eff6ff', icon: ShieldCheck, coverage: ["Manufacturing Defects", "Software Issues", "Performance Issues"], notCovered: ["Physical Damage", "Water Damage", "Normal Wear & Tear"], eligibility: "Valid GST invoice and warranty card required." },
//     { title: "Extended Warranty", duration: "24-36 Months", accent: '#22c55e', bg: '#f0fdf4', icon: BadgeCheck, coverage: ["Everything in Standard", "Component Failures", "Free Servicing"], notCovered: ["Intentional Damage", "Theft", "Unauthorized Repairs"], eligibility: "Must register within 30 days of purchase." }
//   ];

//   const commonReasons = ["Manufacturing Defect", "Overheating", "Motor Failure", "Power Issue", "Unusual Noise", "Broken Part", "Vibration Issue"];

//   const handleFileChange = (e, type, isMultiple = false) => {
//     const files = Array.from(e.target.files);
//     if (isMultiple) {
//       setClaimForm(prev => ({ ...prev, photos: { ...prev.photos, [type]: [...prev.photos[type], ...files].slice(0, 5) } }));
//     } else {
//       setClaimForm(prev => ({ ...prev, photos: { ...prev.photos, [type]: files[0] } }));
//     }
//   };

//   const handleClaimSubmit = async (e) => {
//     e.preventDefault();
//     if (!isLoggedIn) { alert('Please login to continue'); return; }
//     setIsLoading(true);
//     const claimData = { ...claimForm, id: `WARR-${Date.now().toString().slice(-6)}`, customerEmail: authUser.email, status: 'Pending', submittedAt: new Date().toISOString(), photoCount: Object.values(claimForm.photos).flat().filter(Boolean).length };
//     const existingClaims = JSON.parse(localStorage.getItem('warrantyClaims') || '[]');
//     localStorage.setItem('warrantyClaims', JSON.stringify([...existingClaims, claimData]));
//     setTimeout(() => { setIsLoading(false); setIsSubmitted(true); }, 1500);
//   };

//   const toggleReason = (reason) => {
//     setClaimForm(prev => ({ ...prev, reasons: prev.reasons.includes(reason) ? prev.reasons.filter(r => r !== reason) : [...prev.reasons, reason] }));
//   };

//   if (isSubmitted) {
//     return (
//       <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 20px 60px' }}>
//         <div style={{ maxWidth: '400px', width: '100%', background: '#fff', borderRadius: '14px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', padding: '40px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
//           <div style={{ width: '64px', height: '64px', background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#22c55e' }}><CheckCircle size={32} /></div>
//           <h2 style={{ fontSize: '22px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.03em', color: '#111', marginBottom: '10px' }}>Request Logged!</h2>
//           <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.7, marginBottom: '28px' }}>Your warranty claim has been received. Our team will review within 24-48 business hours.</p>
//           <button onClick={() => navigate('/')} style={{ width: '100%', background: '#111', color: '#fff', border: 'none', borderRadius: '8px', padding: '14px', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer' }}>BACK TO HOME</button>
//         </div>
//       </div>
//     );
//   }

//   const tabs = [
//     { id: 'policies', label: 'Warranty Policies', icon: ClipboardList },
//     { id: 'claim', label: 'Submit Claim', icon: FileText },
//     { id: 'extended', label: 'Extended Warranty', icon: QrCode }
//   ];

//   return (
//     <div style={{ minHeight: '100vh', background: '#f9fafb', paddingTop: '100px', paddingBottom: '60px' }}>
//       <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>

//         {/* Header */}
//         <div style={{ background: '#111', color: '#fff', padding: 'clamp(28px, 4vw, 48px)', borderRadius: '14px', marginBottom: '20px' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
//             <ShieldCheck size={16} style={{ color: '#dc2626' }} />
//             <span style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.6)' }}>Support Portal</span>
//           </div>
//           <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: '12px' }}>
//             Warranty <span style={{ color: '#dc2626' }}>Hub</span>
//           </h1>
//           <p style={{ maxWidth: '480px', color: '#6b7280', fontSize: '13px', lineHeight: 1.7 }}>Protect your tools with our comprehensive after-sales service. Register for extended warranty, claim standard repairs, or view our global policies.</p>
//         </div>

//         {/* Tabs */}
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px', background: '#fff', padding: '6px', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
//           {tabs.map(tab => (
//             <button key={tab.id} onClick={() => setActiveTab(tab.id)}
//               style={{ flex: '1 1 140px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '12px 8px', fontWeight: 800, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', borderRadius: '8px', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
//                 background: activeTab === tab.id ? '#111' : 'transparent', color: activeTab === tab.id ? '#fff' : '#9ca3af' }}>
//               <tab.icon size={14} /> {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Policies Tab */}
//         {activeTab === 'policies' && (
//           <div>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '20px' }}>
//               {policies.map((p, i) => (
//                 <div key={i} style={{ background: '#fff', borderRadius: '12px', border: `2px solid ${p.accent}`, padding: '28px' }}>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
//                     <div style={{ width: '48px', height: '48px', background: p.bg, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.accent }}><p.icon size={22} /></div>
//                     <div style={{ textAlign: 'right' }}>
//                       <span style={{ fontSize: '8px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', display: 'block' }}>Duration</span>
//                       <span style={{ fontSize: '16px', fontWeight: 900, color: '#111' }}>{p.duration}</span>
//                     </div>
//                   </div>
//                   <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#111', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '16px' }}>{p.title}</h3>

//                   <div style={{ marginBottom: '12px' }}>
//                     <p style={{ fontSize: '9px', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>What's Covered</p>
//                     {p.coverage.map((c, idx) => (
//                       <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
//                         <CheckCircle size={14} style={{ color: '#22c55e' }} /> {c}
//                       </div>
//                     ))}
//                   </div>
//                   <div style={{ marginBottom: '20px' }}>
//                     <p style={{ fontSize: '9px', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Not Covered</p>
//                     {p.notCovered.map((c, idx) => (
//                       <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#9ca3af', marginBottom: '6px' }}>
//                         <AlertCircle size={14} style={{ color: '#ef4444' }} /> {c}
//                       </div>
//                     ))}
//                   </div>

//                   <div style={{ paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
//                     <p style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', marginBottom: '14px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
//                       <Info size={14} style={{ color: '#3b82f6', flexShrink: 0, marginTop: '2px' }} /> {p.eligibility}
//                     </p>
//                     <button onClick={() => setActiveTab('claim')} style={{ width: '100%', padding: '12px', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', fontWeight: 800, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#111' }}>
//                       PROCEED TO CLAIM <ChevronRight size={12} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Terms */}
//             <div style={{ background: '#111', color: '#fff', padding: '28px', borderRadius: '12px' }}>
//               <h3 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                 <ShieldAlert size={18} style={{ color: '#dc2626' }} /> Terms & Conditions
//               </h3>
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
//                 {[
//                   { n: '01', t: 'Valid GST invoice with stamp and signature is mandatory for all claims.' },
//                   { n: '02', t: 'Product must not have been repaired by unauthorized personnel at any stage.' },
//                   { n: '03', t: 'Warranty is limited to repair or replacement of defective parts only.' }
//                 ].map((item, i) => (
//                   <div key={i}>
//                     <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', fontWeight: 900, fontSize: '12px', marginBottom: '8px' }}>{item.n}</div>
//                     <p style={{ fontSize: '11px', fontWeight: 600, lineHeight: 1.7 }}>{item.t}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Claim Tab */}
//         {activeTab === 'claim' && (
//           <form onSubmit={handleClaimSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//             <div style={{ background: '#fff', padding: '28px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
//               <h3 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f0f0f0' }}>1. Product Identification</h3>
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
//                 <div><label style={labelStyle}>Product Name</label><input required value={claimForm.productName} onChange={e => setClaimForm({...claimForm, productName: e.target.value})} style={inputStyle} placeholder="AG-4 Grinder" /></div>
//                 <div><label style={labelStyle}>Serial No.</label><input required value={claimForm.modelNo} onChange={e => setClaimForm({...claimForm, modelNo: e.target.value})} style={inputStyle} placeholder="DPT-902-831" /></div>
//                 <div><label style={labelStyle}>Purchase Date</label><input type="date" required value={claimForm.purchaseDate} onChange={e => setClaimForm({...claimForm, purchaseDate: e.target.value})} style={inputStyle} /></div>
//               </div>
//             </div>

//             <div style={{ background: '#fff', padding: '28px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
//               <h3 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f0f0f0' }}>2. Problem Details</h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
//                 <div><label style={labelStyle}>Main Issue</label><input required value={claimForm.mainIssue} onChange={e => setClaimForm({...claimForm, mainIssue: e.target.value})} style={inputStyle} placeholder="e.g. Motor Heating" /></div>
//                 <div>
//                   <label style={labelStyle}>Severity</label>
//                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
//                     {['Low', 'Medium', 'High', 'Critical'].map(s => (
//                       <button key={s} type="button" onClick={() => setClaimForm({...claimForm, severity: s})}
//                         style={{ padding: '10px', borderRadius: '6px', fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid', cursor: 'pointer',
//                           background: claimForm.severity === s ? '#111' : '#f9fafb', color: claimForm.severity === s ? '#fff' : '#9ca3af', borderColor: claimForm.severity === s ? '#111' : '#e5e7eb' }}>{s}</button>
//                     ))}
//                   </div>
//                 </div>
//                 <div>
//                   <label style={labelStyle}>Reasons</label>
//                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
//                     {commonReasons.map(r => (
//                       <button key={r} type="button" onClick={() => toggleReason(r)}
//                         style={{ padding: '6px 12px', borderRadius: '100px', fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', border: '1px solid', cursor: 'pointer',
//                           background: claimForm.reasons.includes(r) ? '#dc2626' : '#fff', color: claimForm.reasons.includes(r) ? '#fff' : '#9ca3af', borderColor: claimForm.reasons.includes(r) ? '#dc2626' : '#e5e7eb' }}>{r}</button>
//                     ))}
//                   </div>
//                 </div>
//                 <div><label style={labelStyle}>Detailed Description</label><textarea required rows={3} value={claimForm.description} onChange={e => setClaimForm({...claimForm, description: e.target.value})} style={{...inputStyle, resize: 'none'}} placeholder="Explain the problem..." /></div>
//               </div>
//             </div>

//             <div style={{ background: '#fff', padding: '28px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
//               <h3 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f0f0f0' }}>3. Photo Evidence</h3>
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
//                 {[
//                   { id: 'problem', label: 'Problem', icon: Camera, multiple: true },
//                   { id: 'warranty', label: 'Warranty Card', icon: ShieldCheck },
//                   { id: 'invoice', label: 'Invoice', icon: FileText },
//                   { id: 'serial', label: 'Serial Label', icon: QrCode }
//                 ].map(item => (
//                   <label key={item.id} style={{ cursor: 'pointer' }}>
//                     <div style={{ border: '2px dashed #e5e7eb', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', textAlign: 'center' }}>
//                       <item.icon size={24} style={{ color: '#d1d5db' }} />
//                       <p style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', color: '#9ca3af' }}>{item.label}</p>
//                       <input type="file" style={{ display: 'none' }} multiple={item.multiple} onChange={e => handleFileChange(e, item.id, item.multiple)} />
//                     </div>
//                     {claimForm.photos[item.id] && (Array.isArray(claimForm.photos[item.id]) ? claimForm.photos[item.id].length > 0 : true) && (
//                       <p style={{ fontSize: '9px', color: '#22c55e', fontWeight: 700, textAlign: 'center', marginTop: '4px' }}>✓ Selected</p>
//                     )}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <button type="submit" disabled={isLoading} style={{ width: '100%', background: '#111', color: '#fff', border: 'none', padding: '16px', borderRadius: '10px', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer' }}>
//               {isLoading ? 'PROCESSING...' : 'SUBMIT WARRANTY CLAIM'}
//             </button>
//           </form>
//         )}

//         {/* Extended Tab */}
//         {activeTab === 'extended' && (
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
//             <div style={{ background: '#111', color: '#fff', padding: '32px', borderRadius: '14px' }}>
//               <h3 style={{ fontSize: '22px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.03em', marginBottom: '24px', lineHeight: 1.1 }}>
//                 Elite Plus<br/><span style={{ color: '#22c55e' }}>Protection</span>
//               </h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
//                 {[
//                   { icon: Clock, label: 'Instant Registration', desc: 'Scan QR to start' },
//                   { icon: Smartphone, label: 'SMS Notification', desc: 'Real-time alert' },
//                   { icon: Mail, label: 'Email Confirmation', desc: 'Get your digital certificate' }
//                 ].map((item, i) => (
//                   <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                     <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e', flexShrink: 0 }}><item.icon size={18} /></div>
//                     <div>
//                       <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}>{item.label}</p>
//                       <p style={{ fontSize: '9px', color: '#6b7280', fontWeight: 600 }}>{item.desc}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div style={{ background: '#fff', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                 <QrCode size={56} style={{ color: '#111', marginBottom: '6px' }} />
//                 <p style={{ color: '#111', fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.14em' }}>SCAN FOR EWR</p>
//               </div>
//             </div>

//             <div style={{ background: '#fff', padding: '32px', borderRadius: '14px', border: '1px solid #e5e7eb' }}>
//               <h3 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '20px' }}>EWR Registration</h3>
//               <form style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                 <div><label style={labelStyle}>Full Name</label><input required style={inputStyle} /></div>
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//                   <div><label style={labelStyle}>Mobile No.</label><input required type="tel" style={inputStyle} /></div>
//                   <div><label style={labelStyle}>Serial No.</label><input required style={inputStyle} /></div>
//                 </div>
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//                   <div><label style={labelStyle}>Purchase Date</label><input required type="date" style={inputStyle} /></div>
//                   <div><label style={labelStyle}>Invoice File</label><input required type="file" style={inputStyle} /></div>
//                 </div>
//                 <button type="button" style={{ width: '100%', background: '#22c55e', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 800, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer', marginTop: '8px' }}>REGISTER NOW</button>
//               </form>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default WarrantyClaim;

import React, { useState } from "react";
import {
  ShieldCheck,
  FileText,
  Calendar,
  Send,
  CheckCircle,
  AlertCircle,
  Camera,
  QrCode,
  ClipboardList,
  Info,
  ChevronRight,
  Clock,
  Mail,
  Smartphone,
  Package,
  Truck,
  Receipt,
  CreditCard,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API = "/api";

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, type: file.type, dataUrl: reader.result });
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const WarrantyClaim = () => {
  const { isLoggedIn, user: authUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("claim"); // 'claim', 'terms', 'supply'
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [claimForm, setClaimForm] = useState({
    productName: "",
    modelNo: "",
    purchaseDate: "",
    invoiceNo: "#DPT-INV-",
    mainIssue: "",
    description: "",
    severity: "Medium",
    reasons: [],
    photos: { problem: [], warranty: null, invoice: null, serial: null },
  });

  // 20+ terms and conditions
  const termsList = [
    "Valid GST invoice with stamp and signature is mandatory for all claims.",
    "Product must not have been repaired by unauthorized personnel at any stage.",
    "Warranty is limited to repair or replacement of defective parts only.",
    "The warranty period starts from the date of invoice.",
    "Original warranty card must be presented along with the product.",
    "Damage caused by misuse, negligence, or accident is not covered.",
    "Normal wear and tear, including blades, belts, and batteries, are excluded.",
    "The company reserves the right to inspect the product before approving any claim.",
    "Transportation costs for sending the product to the service centre are borne by the customer.",
    "Return shipping costs for repaired products are covered by the company only if the claim is valid.",
    "No cash refunds will be issued; at our discretion, we may replace or repair.",
    "Products with tampered or missing serial numbers will not be serviced under warranty.",
    "Software or firmware issues are covered only if caused by manufacturing defects.",
    "Loss of data or personal information stored on the device is not covered.",
    "Water damage, fire damage, or any external force damage voids the warranty.",
    "Unauthorised modifications or use of non‑standard parts will void the warranty.",
    "The warranty is non‑transferable and applies only to the original purchaser.",
    "Service turnaround time is 7–14 business days after receipt of the product.",
    "In case of discontinued models, we may offer a comparable replacement.",
    "International purchases are not covered under this warranty.",
    "Claims must be submitted within 30 days of discovering the defect.",
    "Falsifying information or providing fraudulent documents will result in claim rejection and possible legal action.",
  ];

  const commonReasons = [
    "Manufacturing Defect",
    "Overheating",
    "Motor Failure",
    "Power Issue",
    "Unusual Noise",
    "Broken Part",
    "Vibration Issue",
  ];

  const handleFileChange = (e, type, isMultiple = false) => {
    const files = Array.from(e.target.files);
    if (isMultiple) {
      setClaimForm((prev) => ({
        ...prev,
        photos: {
          ...prev.photos,
          [type]: [...prev.photos[type], ...files].slice(0, 5),
        },
      }));
    } else {
      setClaimForm((prev) => ({
        ...prev,
        photos: { ...prev.photos, [type]: files[0] },
      }));
    }
  };

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please login to continue");
      return;
    }
    setIsLoading(true);
    try {
      const photos = {
        problem: await Promise.all((claimForm.photos.problem || []).map(fileToDataUrl)),
        warranty: await fileToDataUrl(claimForm.photos.warranty),
        invoice: await fileToDataUrl(claimForm.photos.invoice),
        serial: await fileToDataUrl(claimForm.photos.serial),
      };
      const claimData = {
        ...claimForm,
        photos,
        customerEmail: authUser.email,
        customerName: authUser.name || authUser.email,
        status: "Pending",
        submittedAt: new Date().toISOString(),
        photoCount: Object.values(photos).flat().filter(Boolean).length,
      };
      const response = await fetch(`${API}/warranty/claims`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(claimData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Warranty claim failed");

      const existingClaims = JSON.parse(localStorage.getItem("warrantyClaims") || "[]");
      localStorage.setItem("warrantyClaims", JSON.stringify([...existingClaims, data.data]));
      setIsSubmitted(true);
    } catch (error) {
      alert(error.message || "Warranty claim submit nahi hua.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleReason = (reason) => {
    setClaimForm((prev) => ({
      ...prev,
      reasons: prev.reasons.includes(reason)
        ? prev.reasons.filter((r) => r !== reason)
        : [...prev.reasons, reason],
    }));
  };

  if (isSubmitted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "400px",
            width: "100%",
            background: "#fff",
            borderRadius: "16px",
            padding: "40px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              background: "#e6f7e6",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              color: "#22c55e",
            }}
          >
            <CheckCircle size={32} />
          </div>
          <h2
            style={{ fontSize: "22px", fontWeight: 700, marginBottom: "10px" }}
          >
            Claim Submitted
          </h2>
          <p
            style={{ fontSize: "14px", color: "#64748b", marginBottom: "28px" }}
          >
            We'll review your request within 24-48 hours.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              width: "100%",
              background: "#0f172a",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        paddingTop: "80px",
        paddingBottom: "60px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}
          >
            Warranty & Support
          </h1>
          <p style={{ fontSize: "14px", color: "#64748b" }}>
            Submit a claim, read our policies, or see what you need to provide.
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "32px",
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: "12px",
          }}
        >
          {[
            { id: "claim", label: "File a Claim", icon: FileText },
            { id: "terms", label: "Terms & Conditions", icon: ClipboardList },
            { id: "supply", label: "What to Supply", icon: Package },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 20px",
                fontSize: "14px",
                fontWeight: activeTab === tab.id ? "600" : "400",
                border: "none",
                background: "none",
                cursor: "pointer",
                color: activeTab === tab.id ? "#0f172a" : "#64748b",
                borderBottom:
                  activeTab === tab.id ? "2px solid #dc2626" : "none",
              }}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Claim Form Tab */}
        {activeTab === "claim" && (
          <form
            onSubmit={handleClaimSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {/* Product Details */}
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #e2e8f0",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Package size={18} /> Product Details
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      marginBottom: "4px",
                      display: "block",
                    }}
                  >
                    Product Name *
                  </label>
                  <input
                    required
                    value={claimForm.productName}
                    onChange={(e) =>
                      setClaimForm({
                        ...claimForm,
                        productName: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                    placeholder="e.g. AG-4 Grinder"
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      marginBottom: "4px",
                      display: "block",
                    }}
                  >
                    Model / Serial No. *
                  </label>
                  <input
                    required
                    value={claimForm.modelNo}
                    onChange={(e) =>
                      setClaimForm({ ...claimForm, modelNo: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                    placeholder="DPT-902-831"
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      marginBottom: "4px",
                      display: "block",
                    }}
                  >
                    Purchase Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={claimForm.purchaseDate}
                    onChange={(e) =>
                      setClaimForm({
                        ...claimForm,
                        purchaseDate: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Issue Details */}
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #e2e8f0",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  marginBottom: "20px",
                }}
              >
                Issue Details
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      marginBottom: "4px",
                      display: "block",
                    }}
                  >
                    Main Issue *
                  </label>
                  <input
                    required
                    value={claimForm.mainIssue}
                    onChange={(e) =>
                      setClaimForm({ ...claimForm, mainIssue: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                    placeholder="e.g. Motor not starting"
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    Severity
                  </label>
                  <div
                    style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                  >
                    {["Low", "Medium", "High", "Critical"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() =>
                          setClaimForm({ ...claimForm, severity: s })
                        }
                        style={{
                          padding: "6px 16px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "500",
                          border: "1px solid",
                          cursor: "pointer",
                          background:
                            claimForm.severity === s ? "#0f172a" : "#fff",
                          color: claimForm.severity === s ? "#fff" : "#475569",
                          borderColor:
                            claimForm.severity === s ? "#0f172a" : "#e2e8f0",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      marginBottom: "4px",
                      display: "block",
                    }}
                  >
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={claimForm.description}
                    onChange={(e) =>
                      setClaimForm({
                        ...claimForm,
                        description: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "14px",
                      resize: "vertical",
                    }}
                    placeholder="Please describe the problem in detail..."
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    Possible Reason (select all that apply)
                  </label>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                  >
                    {commonReasons.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => toggleReason(r)}
                        style={{
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          border: "1px solid",
                          cursor: "pointer",
                          background: claimForm.reasons.includes(r)
                            ? "#dc2626"
                            : "#fff",
                          color: claimForm.reasons.includes(r)
                            ? "#fff"
                            : "#64748b",
                          borderColor: claimForm.reasons.includes(r)
                            ? "#dc2626"
                            : "#e2e8f0",
                        }}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Evidence */}
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #e2e8f0",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  marginBottom: "20px",
                }}
              >
                Supporting Documents
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "12px",
                }}
              >
                {[
                  { id: "problem", label: "Problem Photo", multiple: true },
                  { id: "warranty", label: "Warranty Card", multiple: false },
                  { id: "invoice", label: "Invoice Copy", multiple: false },
                  { id: "serial", label: "Serial Number", multiple: false },
                ].map((item) => (
                  <label key={item.id} style={{ cursor: "pointer" }}>
                    <div
                      style={{
                        border: "1px dashed #cbd5e1",
                        borderRadius: "8px",
                        padding: "16px",
                        textAlign: "center",
                      }}
                    >
                      <Camera
                        size={20}
                        style={{ color: "#94a3b8", marginBottom: "8px" }}
                      />
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          margin: 0,
                        }}
                      >
                        {item.label}
                      </p>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        multiple={item.multiple}
                        onChange={(e) =>
                          handleFileChange(e, item.id, item.multiple)
                        }
                      />
                    </div>
                    {claimForm.photos[item.id] &&
                      (Array.isArray(claimForm.photos[item.id])
                        ? claimForm.photos[item.id].length > 0
                        : true) && (
                        <p
                          style={{
                            fontSize: "11px",
                            color: "#22c55e",
                            textAlign: "center",
                            marginTop: "6px",
                          }}
                        >
                          ✓ Uploaded
                        </p>
                      )}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                background: "#0f172a",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "14px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {isLoading ? "Submitting..." : "Submit Claim"}
            </button>
          </form>
        )}

        {/* Terms & Conditions Tab - 20+ items */}
        {activeTab === "terms" && (
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <ShieldCheck size={20} color="#dc2626" /> Warranty Terms &
              Conditions
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#64748b",
                marginBottom: "20px",
                paddingBottom: "12px",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              Please read the following terms carefully before submitting a
              warranty claim.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "12px",
              }}
            >
              {termsList.map((term, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    fontSize: "13px",
                    color: "#334155",
                  }}
                >
                  <span
                    style={{
                      color: "#dc2626",
                      fontWeight: "bold",
                      minWidth: "24px",
                    }}
                  >
                    {idx + 1}.
                  </span>
                  <span>{term}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What to Supply Tab */}
        {activeTab === "supply" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {/* Required Documents */}
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #e2e8f0",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Receipt size={18} /> Required Documents
              </h3>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  color: "#334155",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                <li>Original GST invoice (with stamp & signature)</li>
                <li>Warranty card (filled & stamped)</li>
                <li>Product serial number / batch number</li>
                <li>Proof of purchase (bank statement / order confirmation)</li>
                <li>Photo/video evidence of the defect</li>
              </ul>
            </div>

            {/* What to Send */}
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #e2e8f0",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Package size={18} /> Items to Send
              </h3>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  color: "#334155",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                <li>
                  The defective product (in original packaging if possible)
                </li>
                <li>
                  All accessories that came with the product (charger, bits,
                  etc.)
                </li>
                <li>A printed copy of the claim acknowledgement (email)</li>
                <li>A note with your name, order ID, and contact number</li>
              </ul>
            </div>

            {/* Shipping & Logistics */}
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #e2e8f0",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Truck size={18} /> Shipping Instructions
              </h3>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  color: "#334155",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                <li>Use a reliable courier service with tracking.</li>
                <li>
                  Customer is responsible for shipping costs to our service
                  centre.
                </li>
                <li>If claim is approved, we will cover return shipping.</li>
                <li>
                  Address: DP Tools Service Centre, A-123, Industrial Area,
                  Jaipur - 302001
                </li>
                <li>Write “Warranty Claim – [Claim ID]” on the package.</li>
              </ul>
            </div>

            {/* Payment & Refunds */}
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #e2e8f0",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <CreditCard size={18} /> Payment & Refunds
              </h3>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  color: "#334155",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                <li>No cash refunds – we repair or replace.</li>
                <li>
                  If replacement is not available, a store credit will be
                  issued.
                </li>
                <li>
                  Refund processing takes 7–10 business days after approval.
                </li>
                <li>Shipping charges are non‑refundable.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WarrantyClaim;
