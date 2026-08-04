// import React from 'react';
// import { Instagram, Building2, MapPin, Phone, Mail, ExternalLink, Award, Users, Clock, ShoppingBag, Heart, MessageCircle, Zap } from 'lucide-react';
// import { InstagramCompanyCard } from '../components/CompanyDetails';

// const InstagramPage = () => {
//   const companies = [
//     {
//       name: "Dushyant Power Tools",
//       tagline: "Leading Industrial Equipment Supplier in Sidhi, MP",
//       description: "Your trusted partner for professional power tools, high-quality industrial equipment, genuine spare parts, and reliable repair services. Follow us on Instagram for product showcases, offers, and industrial tips.",
//       established: "2019",
//       phone: "+91 97540 15503",
//       email: "info@dushyantpowertools.com",
//       address: "45, Sidhi, Madhya Pradesh 486661",
//       instagram: "https://www.instagram.com/dushyant_power_tools_sidhi/",
//       facebook: "https://www.facebook.com/dushyantpowertools",
//       website: "https://dushyantpowertools.com",
//       featuredImage: "https://www.stihl.com/content/dam/stihl/media/pr---hr-category/corporate-communications/company/dealer/36828.jpg"
//     },
//     {
//       name: "Dushyant Furniture Mart",
//       tagline: "Premium Home & Office Furniture Since 2009",
//       description: "Established in October 2009, we are the premier destination for premium home and office decor in Sidhi. Follow us on Instagram for furniture inspiration, new arrivals, and exclusive offers.",
//       established: "2009",
//       phone: "+91 93993 57998",
//       email: "info@dushyantfurnituremart.com",
//       address: "45, Sidhi, Madhya Pradesh 486661",
//       instagram: "https://www.instagram.com/dushyant_furniture_mart/",
//       facebook: "https://www.facebook.com/dushyantfurnituremart",
//       website: "https://dushyantfurnituremart.com",
//       featuredImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600"
//     }
//   ];

//   const instagramHighlights = [
//     { name: "Power Tools", icon: "🔧", posts: "150+" },
//     { name: "Furniture", icon: "🛋️", posts: "200+" },
//     { name: "Reviews", icon: "⭐", posts: "50+" },
//     { name: "Offers", icon: "🎉", posts: "30+" },
//     { name: "Workshop", icon: "🏭", posts: "80+" },
//     { name: "Team", icon: "👥", posts: "40+" }
//   ];

//   return (
//     <div style={{ minHeight: '100vh', background: '#fff' }}>

//       {/* Hero Section */}
//       <section style={{ paddingTop: '120px', paddingBottom: '64px', background: '#111', color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
//         <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 2 }}>
//           <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '100px', marginBottom: '24px' }}>
//             <Instagram size={14} style={{ color: '#dc2626' }} />
//             <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Social Presence</span>
//           </div>
//           <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '24px' }}>
//             Instagram <span style={{ color: '#dc2626' }}>Hub</span>
//           </h1>
//           <p style={{ fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 600, color: 'rgba(255,255,255,0.7)', maxWidth: '700px', margin: '0 auto 40px', lineHeight: 1.6 }}>
//             Follow our journey across our industrial and home decor segments. Join thousands of professionals for daily updates and exclusive offers.
//           </p>

//           <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
//             <a href="https://www.instagram.com/dushyant_power_tools_sidhi/" target="_blank" rel="noopener noreferrer" style={{ background: '#dc2626', color: '#fff', padding: '16px 32px', borderRadius: '12px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)' }}>
//               <Instagram size={18} /> @dushyant_power_tools
//             </a>
//             <a href="https://www.instagram.com/dushyant_furniture_mart/" target="_blank" rel="noopener noreferrer" style={{ background: '#fff', color: '#111', padding: '16px 32px', borderRadius: '12px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <Instagram size={18} /> @dushyant_furniture_mart
//             </a>
//           </div>
//         </div>

//         {/* Background Decorative Text */}
//         <div style={{ position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)', fontSize: '15vw', fontWeight: 900, color: 'rgba(255,255,255,0.02)', textTransform: 'uppercase', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
//           SOCIAL CONNECT
//         </div>
//       </section>

//       {/* Highlights */}
//       <section style={{ padding: '64px 0', borderBottom: '1px solid #f0f0f0' }}>
//         <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
//           <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '32px' }}>
//             {instagramHighlights.map((hl, idx) => (
//               <div key={idx} style={{ textAlign: 'center', cursor: 'pointer' }}>
//                 <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#f9fafb', border: '2px solid #dc2626', padding: '4px', marginBottom: '12px', transition: 'transform 0.3s' }}>
//                   <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{hl.icon}</div>
//                 </div>
//                 <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#111' }}>{hl.name}</p>
//                 <p style={{ fontSize: '9px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>{hl.posts} Posts</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Business Pages */}
//       <section style={{ padding: '80px 0', background: '#f9fafb' }}>
//         <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
//           <div style={{ textAlign: 'center', marginBottom: '48px' }}>
//             <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#dc2626', display: 'block', marginBottom: '8px' }}>Our Network</span>
//             <h2 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.04em', color: '#111' }}>Business <span style={{ color: '#dc2626' }}>Instagram</span> Channels</h2>
//           </div>

//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
//             {companies.map((company, index) => (
//               <InstagramCompanyCard key={index} company={company} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Post Grid Preview */}
//       <section style={{ padding: '80px 0' }}>
//         <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
//            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
//              <h2 style={{ fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.04em', color: '#111' }}>Recent <span style={{ color: '#dc2626' }}>Deployments</span></h2>
//              <p style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280', marginTop: '8px' }}>Visual documentation of our latest hardware and furniture installations.</p>
//            </div>

//            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
//               {[1, 2, 3].map(post => (
//                  <div key={post} style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '350px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
//                     <img src={`https://images.unsplash.com/photo-${1504917595217 + post * 1000}?w=600&q=80`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                     <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', opacity: 0, transition: 'opacity 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', color: '#fff' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
//                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Heart size={20} fill="#fff" /> <span style={{ fontWeight: 900 }}>1.2k</span></div>
//                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MessageCircle size={20} fill="#fff" /> <span style={{ fontWeight: 900 }}>89</span></div>
//                     </div>
//                  </div>
//               ))}
//            </div>

//            <div style={{ textAlign: 'center', marginTop: '48px' }}>
//               <a href="https://www.instagram.com/dushyant_power_tools_sidhi/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#111', color: '#fff', padding: '16px 32px', borderRadius: '12px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none' }}>
//                  <Instagram size={18} /> Load External Gallery
//               </a>
//            </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section style={{ padding: '80px 20px', background: '#dc2626', color: '#fff', textAlign: 'center' }}>
//         <div style={{ maxWidth: '700px', margin: '0 auto' }}>
//           <h2 style={{ fontSize: '36px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '-0.04em' }}>Join Our Community</h2>
//           <p style={{ fontSize: '16px', fontWeight: 600, marginBottom: '32px', opacity: 0.9 }}>Be the first to see new asset arrivals and exclusive industrial repair walkthroughs.</p>
//           <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
//             <a href="https://www.instagram.com/dushyant_power_tools_sidhi/" target="_blank" rel="noopener noreferrer" style={{ background: '#fff', color: '#dc2626', padding: '16px 32px', borderRadius: '12px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none' }}>Follow Power Tools</a>
//             <a href="https://www.instagram.com/dushyant_furniture_mart/" target="_blank" rel="noopener noreferrer" style={{ background: '#111', color: '#fff', padding: '16px 32px', borderRadius: '12px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none' }}>Follow Furniture Mart</a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default InstagramPage;

import React from "react";
import {
  Instagram,
  Building2,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Award,
  Users,
  Clock,
  ShoppingBag,
  Heart,
  MessageCircle,
  Zap,
  ArrowRight,
} from "lucide-react";

// ============================================================
// SUB-COMPONENTS
// ============================================================

const InstagramCompanyCard = ({ company }) => {
  return (
    <div className="instagram-card">
      <div
        className="card-image"
        style={{ backgroundImage: `url(${company.featuredImage})` }}
      >
        <div className="card-overlay">
          <div className="card-badge">
            <Instagram size={14} color="#fff" />
            <span>@{company.name.split(" ")[0].toLowerCase()}</span>
          </div>
        </div>
      </div>
      <div className="card-body">
        <h3>{company.name}</h3>
        <p className="tagline">{company.tagline}</p>
        <p className="description">{company.description}</p>
        <div className="card-meta">
          <span>
            <Award size={14} /> Est. {company.established}
          </span>
          <span>
            <Users size={14} /> 1.2k+ Followers
          </span>
        </div>
        <div className="card-contact">
          <a href={`tel:${company.phone}`}>
            <Phone size={14} /> {company.phone}
          </a>
          <a href={`mailto:${company.email}`}>
            <Mail size={14} /> {company.email}
          </a>
        </div>
        <div className="card-actions">
          <a
            href={company.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-instagram"
          >
            <Instagram size={16} /> Follow
          </a>
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <ExternalLink size={16} /> Visit
          </a>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

const InstagramPage = () => {
  const companies = [
    {
      name: "Dushyant Power Tools",
      tagline: "Leading Industrial Equipment Supplier in Sidhi, MP",
      description:
        "Your trusted partner for professional power tools, high-quality industrial equipment, genuine spare parts, and reliable repair services. Follow us on Instagram for product showcases, offers, and industrial tips.",
      established: "2019",
      phone: "+91 97540 15503",
      email: "info@dushyantpowertools.com",
      address: "45, Sidhi, Madhya Pradesh 486661",
      instagram: "https://www.instagram.com/dushyant_power_tools_sidhi/",
      facebook: "https://www.facebook.com/dushyantpowertools",
      website: "https://dushyantpowertools.com",
      featuredImage:
        "https://images.unsplash.com/photo-1504917595217-4d1d3e3e0f9a?w=600&q=80",
    },
    {
      name: "Dushyant Furniture Mart",
      tagline: "Premium Home & Office Furniture Since 2009",
      description:
        "Established in October 2009, we are the premier destination for premium home and office decor in Sidhi. Follow us on Instagram for furniture inspiration, new arrivals, and exclusive offers.",
      established: "2009",
      phone: "+91 93993 57998",
      email: "info@dushyantfurnituremart.com",
      address: "45, Sidhi, Madhya Pradesh 486661",
      instagram: "https://www.instagram.com/dushyant_furniture_mart/",
      facebook: "https://www.facebook.com/dushyantfurnituremart",
      website: "https://dushyantfurnituremart.com",
      featuredImage:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80",
    },
  ];

  const instagramHighlights = [
    { name: "Power Tools", icon: "🔧", posts: "150+" },
    { name: "Furniture", icon: "🛋️", posts: "200+" },
    { name: "Reviews", icon: "⭐", posts: "50+" },
    { name: "Offers", icon: "🎉", posts: "30+" },
    { name: "Workshop", icon: "🏭", posts: "80+" },
    { name: "Team", icon: "👥", posts: "40+" },
  ];

  return (
    <div className="instagram-page">
      {/* ========== HERO ========== */}
      <section className="hero">
        <div className="hero-bg">
          <div className="gradient-orb orb1" />
          <div className="gradient-orb orb2" />
          <div className="gradient-orb orb3" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <Instagram size={14} />
            <span>Social Presence</span>
          </div>
          <h1>
            Instagram <span>Hub</span>
          </h1>
          <p>
            Follow our journey across our industrial and home decor segments.
            Join thousands of professionals for daily updates and exclusive
            offers.
          </p>
          <div className="hero-actions">
            <a
              href="https://www.instagram.com/dushyant_power_tools_sidhi/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Instagram size={18} /> @dushyant_power_tools
            </a>
            <a
              href="https://www.instagram.com/dushyant_furniture_mart/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Instagram size={18} /> @dushyant_furniture_mart
            </a>
          </div>
        </div>
        <div className="hero-deco">SOCIAL CONNECT</div>
      </section>

      {/* ========== HIGHLIGHTS ========== */}
      <section className="highlights">
        <div className="container">
          <div className="section-header">
            <span>Engagement</span>
            <h2>
              Instagram <span>Highlights</span>
            </h2>
          </div>
          <div className="highlights-grid">
            {instagramHighlights.map((hl, idx) => (
              <div key={idx} className="highlight-item">
                <div className="highlight-icon">{hl.icon}</div>
                <h4>{hl.name}</h4>
                <p>{hl.posts} Posts</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BUSINESS CARDS ========== */}
      <section className="business-cards">
        <div className="container">
          <div className="section-header">
            <span>Our Network</span>
            <h2>
              Business <span>Instagram</span> Channels
            </h2>
          </div>
          <div className="cards-grid">
            {companies.map((company, index) => (
              <InstagramCompanyCard key={index} company={company} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== POST GRID ========== */}
      <section className="post-grid">
        <div className="container">
          <div className="section-header">
            <span>Visual Stories</span>
            <h2>
              Recent <span>Deployments</span>
            </h2>
          </div>
          <div className="posts-grid">
            {[1, 2, 3, 4, 5, 6].map((post) => (
              <div key={post} className="post-card">
                <img
                  src={`https://images.unsplash.com/photo-${1504917595217 + post * 1000}?w=600&q=80`}
                  alt=""
                />
                <div className="post-overlay">
                  <div className="post-stats">
                    <span>
                      <Heart size={16} fill="#fff" /> 1.2k
                    </span>
                    <span>
                      <MessageCircle size={16} fill="#fff" /> 89
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="post-cta">
            <a
              href="https://www.instagram.com/dushyant_power_tools_sidhi/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-lg"
            >
              <Instagram size={18} /> Load External Gallery
            </a>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="cta">
        <div className="container">
          <h2>Join Our Community</h2>
          <p>
            Be the first to see new asset arrivals and exclusive industrial
            repair walkthroughs.
          </p>
          <div className="cta-actions">
            <a
              href="https://www.instagram.com/dushyant_power_tools_sidhi/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white"
            >
              Follow Power Tools
            </a>
            <a
              href="https://www.instagram.com/dushyant_furniture_mart/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark"
            >
              Follow Furniture Mart
            </a>
          </div>
        </div>
      </section>

      {/* ========== STYLES ========== */}
      <style jsx>{`
        /* ─── RESET & BASE ─── */
        .instagram-page {
          font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            sans-serif;
          color: #111;
          background: #fafafa;
          overflow-x: hidden;
          min-height: 100vh;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .section-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .section-header span {
          display: inline-block;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #dc2626;
          background: rgba(220, 38, 38, 0.08);
          padding: 4px 14px;
          border-radius: 100px;
          margin-bottom: 12px;
        }
        .section-header h2 {
          font-size: 32px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.04em;
          color: #111;
        }
        .section-header h2 span {
          color: #dc2626;
        }

        /* ─── HERO ─── */
        .hero {
          position: relative;
          padding: 120px 24px 80px;
          background: #111;
          color: #fff;
          text-align: center;
          overflow: hidden;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.6;
          animation: float 8s ease-in-out infinite alternate;
        }
        .orb1 {
          width: 400px;
          height: 400px;
          background: #dc2626;
          top: -100px;
          right: -100px;
        }
        .orb2 {
          width: 300px;
          height: 300px;
          background: #f97316;
          bottom: -50px;
          left: -50px;
          animation-delay: 2s;
        }
        .orb3 {
          width: 200px;
          height: 200px;
          background: #8b5cf6;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 4s;
        }
        @keyframes float {
          0% {
            transform: translate(0, 0) scale(1);
          }
          100% {
            transform: translate(30px, -30px) scale(1.1);
          }
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 6px 18px;
          border-radius: 100px;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 24px;
        }
        .hero-badge svg {
          color: #dc2626;
        }
        .hero h1 {
          font-size: clamp(2.8rem, 8vw, 5.5rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 24px;
        }
        .hero h1 span {
          color: #dc2626;
          background: linear-gradient(135deg, #dc2626, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero p {
          font-size: clamp(14px, 2vw, 18px);
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto 40px;
          line-height: 1.7;
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
        }
        .hero-actions a {
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }
        .btn-primary {
          background: #dc2626;
          color: #fff;
          box-shadow: 0 8px 24px rgba(220, 38, 38, 0.35);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(220, 38, 38, 0.5);
        }
        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .hero-deco {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12vw;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.03);
          text-transform: uppercase;
          pointer-events: none;
          white-space: nowrap;
          letter-spacing: 0.1em;
        }

        /* ─── HIGHLIGHTS ─── */
        .highlights {
          padding: 64px 0;
          background: #fff;
          border-bottom: 1px solid #f0f0f0;
        }
        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 24px;
          justify-items: center;
        }
        .highlight-item {
          text-align: center;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .highlight-item:hover {
          transform: translateY(-6px);
        }
        .highlight-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f9fafb, #fff);
          border: 2px solid #dc2626;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin: 0 auto 12px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }
        .highlight-item:hover .highlight-icon {
          box-shadow: 0 8px 24px rgba(220, 38, 38, 0.15);
          transform: scale(1.05);
        }
        .highlight-item h4 {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          margin: 0 0 2px;
        }
        .highlight-item p {
          font-size: 10px;
          font-weight: 700;
          color: #9ca3af;
          text-transform: uppercase;
          margin: 0;
        }

        /* ─── BUSINESS CARDS ─── */
        .business-cards {
          padding: 80px 0;
          background: #f9fafb;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
        }

        /* Individual Card */
        .instagram-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border: 1px solid rgba(0, 0, 0, 0.04);
        }
        .instagram-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
        }
        .card-image {
          height: 200px;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 16px;
        }
        .card-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(6px);
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 10px;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
        }
        .card-body {
          padding: 24px;
        }
        .card-body h3 {
          font-size: 20px;
          font-weight: 900;
          margin: 0 0 4px;
        }
        .card-body .tagline {
          font-size: 13px;
          font-weight: 600;
          color: #dc2626;
          margin: 0 0 10px;
        }
        .card-body .description {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.6;
          margin: 0 0 16px;
        }
        .card-meta {
          display: flex;
          gap: 16px;
          font-size: 11px;
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 16px;
        }
        .card-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .card-contact {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 12px;
          margin-bottom: 16px;
        }
        .card-contact a {
          color: #111;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .card-contact a:hover {
          color: #dc2626;
        }
        .card-actions {
          display: flex;
          gap: 12px;
        }
        .card-actions a {
          padding: 8px 20px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
        }
        .btn-instagram {
          background: #dc2626;
          color: #fff;
        }
        .btn-instagram:hover {
          background: #b91c1c;
        }
        .btn-outline {
          border: 1px solid #d1d5db;
          color: #111;
        }
        .btn-outline:hover {
          border-color: #dc2626;
          color: #dc2626;
        }

        /* ─── POST GRID ─── */
        .post-grid {
          padding: 80px 0;
          background: #fff;
        }
        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .post-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          height: 280px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
          transition: all 0.3s ease;
        }
        .post-card:hover {
          transform: scale(1.02);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
        }
        .post-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .post-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .post-card:hover .post-overlay {
          opacity: 1;
        }
        .post-stats {
          display: flex;
          gap: 24px;
          color: #fff;
          font-weight: 700;
        }
        .post-stats span {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
        }
        .post-cta {
          text-align: center;
          margin-top: 40px;
        }
        .btn-outline-lg {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          border: 2px solid #111;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          color: #111;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .btn-outline-lg:hover {
          background: #111;
          color: #fff;
        }

        /* ─── CTA ─── */
        .cta {
          padding: 80px 24px;
          background: #dc2626;
          color: #fff;
          text-align: center;
        }
        .cta h2 {
          font-size: 36px;
          font-weight: 900;
          text-transform: uppercase;
          margin: 0 0 16px;
          letter-spacing: -0.04em;
        }
        .cta p {
          font-size: 16px;
          font-weight: 500;
          opacity: 0.9;
          margin: 0 auto 32px;
          max-width: 600px;
        }
        .cta-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
        }
        .cta-actions a {
          padding: 14px 32px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .btn-white {
          background: #fff;
          color: #dc2626;
        }
        .btn-white:hover {
          background: #f3f4f6;
          transform: translateY(-2px);
        }
        .btn-dark {
          background: #111;
          color: #fff;
        }
        .btn-dark:hover {
          background: #1f2937;
          transform: translateY(-2px);
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.8rem;
          }
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }
          .hero-actions a {
            width: 100%;
            justify-content: center;
          }
          .highlights-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
          .cards-grid {
            grid-template-columns: 1fr;
          }
          .posts-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .cta h2 {
            font-size: 28px;
          }
          .cta-actions {
            flex-direction: column;
            align-items: center;
          }
          .cta-actions a {
            width: 100%;
            justify-content: center;
          }
        }
        @media (max-width: 480px) {
          .hero {
            padding: 100px 16px 60px;
            min-height: auto;
          }
          .highlights-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .posts-grid {
            grid-template-columns: 1fr;
          }
          .post-card {
            height: 220px;
          }
          .card-body {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default InstagramPage;
