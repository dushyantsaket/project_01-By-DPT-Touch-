// import React from 'react';
// import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

// const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '14px 16px', color: '#fff', fontSize: '13px', fontWeight: 600, outline: 'none' };
// const labelStyle = { fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#6b7280', display: 'block', marginBottom: '6px' };

// const Contact = () => {
//   return (
//     <section id="contact" style={{ padding: '48px 0', background: '#fff' }}>
//       <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>

//         {/* Header */}
//         <div style={{ textAlign: 'center', marginBottom: '32px' }}>
//           <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#dc2626', display: 'block', marginBottom: '8px' }}>Tactical Communications</span>
//           <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.04em', color: '#111', marginBottom: '8px' }}>
//             Get In <span style={{ color: '#dc2626' }}>Touch</span>
//           </h2>
//           <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', maxWidth: '500px', margin: '0 auto' }}>
//             Connect with our technical support centers for procurement inquiries or strategic tool maintenance.
//           </p>
//         </div>

//         {/* WhatsApp Banner */}
//         <a href="https://wa.me/919754015503?text=Hello%20Dushyant%20Power%20Tools%2C%20I%20would%20like%20to%20enquire%20about%20your%20products."
//           target="_blank" rel="noopener noreferrer"
//           style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', background: '#25D366', borderRadius: '12px', padding: '16px 24px', marginBottom: '24px', textDecoration: 'none' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//             <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><MessageCircle size={20} /></div>
//             <div>
//               <p style={{ color: '#fff', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Chat With Us on WhatsApp</p>
//               <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '10px' }}>Instant replies · Mon–Sat · 9AM – 7PM</p>
//             </div>
//           </div>
//           <div style={{ background: '#fff', color: '#25D366', fontWeight: 800, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '10px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
//             <MessageCircle size={14} /> START CHAT NOW
//           </div>
//         </a>

//         {/* Two Column Layout */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>

//           {/* Contact Info */}
//           <div style={{ background: '#f9fafb', borderRadius: '14px', padding: '28px', border: '1px solid #e5e7eb' }}>
//             <h3 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#111', marginBottom: '24px' }}>Command Center Coordinates</h3>

//             <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//               {[
//                 { icon: MapPin, title: 'HQ Location', lines: ['45, Sidhi, Madhya Pradesh 486661'] },
//                 { icon: Phone, title: 'Direct Line', lines: ['+91 97540 15503'], hrefs: ['tel:+919754015503'] },
//                 { icon: Mail, title: 'Email Gateway', lines: ['info@dushyantpowertools.com'], hrefs: ['mailto:info@dushyantpowertools.com'] },
//               ].map((item, i) => (
//                 <div key={i} style={{ display: 'flex', gap: '12px' }}>
//                   <div style={{ width: '40px', height: '40px', background: '#fff', color: '#dc2626', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #f0f0f0' }}>
//                     <item.icon size={18} />
//                   </div>
//                   <div>
//                     <p style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', marginBottom: '4px' }}>{item.title}</p>
//                     {item.lines.map((line, j) => (
//                       item.hrefs ? (
//                         <a key={j} href={item.hrefs[j]} style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#111', textDecoration: 'none', marginBottom: '2px' }}>{line}</a>
//                       ) : (
//                         <p key={j} style={{ fontSize: '13px', fontWeight: 800, color: '#111' }}>{line}</p>
//                       )
//                     ))}
//                   </div>
//                 </div>
//               ))}

//               {/* WhatsApp */}
//               <div style={{ display: 'flex', gap: '12px' }}>
//                 <a href="https://wa.me/919754015503" target="_blank" rel="noopener noreferrer"
//                   style={{ width: '40px', height: '40px', background: '#25D366', color: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//                   <MessageCircle size={18} />
//                 </a>
//                 <div>
//                   <p style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', marginBottom: '4px' }}>WhatsApp Chat</p>
//                   <a href="https://wa.me/919754015503" target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#111', textDecoration: 'none' }}>+91 97540 15503</a>
//                   <span style={{ fontSize: '9px', fontWeight: 600, color: '#9ca3af' }}>Tap to open WhatsApp directly</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div style={{ background: '#111', borderRadius: '14px', padding: '28px', color: '#fff' }}>
//             <h3 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '4px' }}>Strategic Message</h3>
//             <p style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b7280', marginBottom: '24px' }}>Submit Personnel Identification for Response Protocol</p>

//             <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
//                 <div>
//                   <label style={labelStyle}>Personnel Identification</label>
//                   <input type="text" placeholder="FULL NAME" style={inputStyle} />
//                 </div>
//                 <div>
//                   <label style={labelStyle}>Communication Gateway</label>
//                   <input type="email" placeholder="EMAIL ADDRESS" style={inputStyle} />
//                 </div>
//               </div>
//               <div>
//                 <label style={labelStyle}>Inquiry Parameters</label>
//                 <textarea rows={4} placeholder="DECLARE YOUR REQUIREMENTS..." style={{...inputStyle, resize: 'none'}} />
//               </div>
//               <button type="submit" style={{ width: '100%', background: '#dc2626', color: '#fff', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 800, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
//                 <Send size={14} /> DEPLOY MESSAGE
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  padding: "14px 16px",
  color: "#fff",
  fontSize: "13px",
  fontWeight: 600,
  outline: "none",
};
const labelStyle = {
  fontSize: "9px",
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "#6b7280",
  display: "block",
  marginBottom: "6px",
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    type: null, // 'success' or 'error'
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear status when user starts typing
    if (formStatus.type) {
      setFormStatus({ type: null, message: "" });
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormStatus({ type: "error", message: "Please enter your full name" });
      return false;
    }
    if (!formData.email.trim()) {
      setFormStatus({
        type: "error",
        message: "Please enter your email address",
      });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      return false;
    }
    if (!formData.message.trim()) {
      setFormStatus({ type: "error", message: "Please enter your message" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    // Simulate API call - Replace with actual backend integration
    try {
      // This is where you would send data to your backend
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network request

      setFormStatus({
        type: "success",
        message:
          "Message deployed successfully! Our team will contact you shortly.",
      });
      setFormData({ name: "", email: "", message: "" }); // Reset form

      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus((prev) =>
          prev.type === "success" ? { type: null, message: "" } : prev,
        );
      }, 5000);
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" style={{ padding: "60px 0", background: "#fff" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "#dc2626",
              display: "block",
              marginBottom: "12px",
            }}
          >
            Tactical Communications
          </span>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              color: "#111",
              marginBottom: "12px",
            }}
          >
            Get In <span style={{ color: "#dc2626" }}>Touch</span>
          </h2>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#6b7280",
              maxWidth: "550px",
              margin: "0 auto",
            }}
          >
            Connect with our technical support centers for procurement inquiries
            or strategic tool maintenance.
          </p>
        </div>

        {/* WhatsApp Banner */}
        <a
          href="https://wa.me/919754015503?text=Hello%20Dushyant%20Power%20Tools%2C%20I%20would%20like%20to%20enquire%20about%20your%20products."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            background: "#25D366",
            borderRadius: "16px",
            padding: "20px 28px",
            marginBottom: "40px",
            textDecoration: "none",
            transition: "transform 0.2s, box-shadow 0.2s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 8px 20px rgba(37, 211, 102, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <MessageCircle size={24} />
            </div>
            <div>
              <p
                style={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "15px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "4px",
                }}
              >
                Chat With Us on WhatsApp
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontWeight: 600,
                  fontSize: "11px",
                }}
              >
                Instant replies · Mon–Sat · 9AM – 7PM
              </p>
            </div>
          </div>
          <div
            style={{
              background: "#fff",
              color: "#25D366",
              fontWeight: 800,
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "12px 24px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "transform 0.2s",
            }}
          >
            <MessageCircle size={16} /> START CHAT NOW
          </div>
        </a>

        {/* Two Column Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "32px",
          }}
        >
          {/* Contact Info */}
          <div
            style={{
              background: "#f9fafb",
              borderRadius: "20px",
              padding: "32px",
              border: "1px solid #e5e7eb",
              transition: "box-shadow 0.2s",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                color: "#111",
                marginBottom: "28px",
              }}
            >
              Command Center Coordinates
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "28px" }}
            >
              {/* Location */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "#fff",
                    color: "#dc2626",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "#9ca3af",
                      marginBottom: "6px",
                    }}
                  >
                    HQ Location
                  </p>
                  <p
                    style={{ fontSize: "14px", fontWeight: 800, color: "#111" }}
                  >
                    45, Sidhi, Madhya Pradesh 486661
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "#fff",
                    color: "#dc2626",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <Phone size={20} />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "#9ca3af",
                      marginBottom: "6px",
                    }}
                  >
                    Direct Line
                  </p>
                  <a
                    href="tel:+919754015503"
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#111",
                      textDecoration: "none",
                      marginBottom: "2px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#dc2626")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#111")}
                  >
                    +91 97540 15503
                  </a>
                </div>
              </div>

              {/* Email */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "#fff",
                    color: "#dc2626",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "#9ca3af",
                      marginBottom: "6px",
                    }}
                  >
                    Email Gateway
                  </p>
                  <a
                    href="mailto:info@dushyantpowertools.com"
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#111",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#dc2626")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#111")}
                  >
                    info@dushyantpowertools.com
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <a
                  href="https://wa.me/919754015503"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "#25D366",
                    color: "#fff",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <MessageCircle size={20} />
                </a>
                <div>
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "#9ca3af",
                      marginBottom: "6px",
                    }}
                  >
                    WhatsApp Chat
                  </p>
                  <a
                    href="https://wa.me/919754015503"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#111",
                      textDecoration: "none",
                      marginBottom: "4px",
                    }}
                  >
                    +91 97540 15503
                  </a>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "#9ca3af",
                    }}
                  >
                    Tap to open WhatsApp directly
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            style={{
              background: "#111",
              borderRadius: "20px",
              padding: "32px",
              color: "#fff",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                marginBottom: "4px",
              }}
            >
              Strategic Message
            </h3>
            <p
              style={{
                fontSize: "10px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#6b7280",
                marginBottom: "28px",
              }}
            >
              Submit Personnel Identification for Response Protocol
            </p>

            {/* Status Messages */}
            {formStatus.type && (
              <div
                style={{
                  marginBottom: "20px",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background:
                    formStatus.type === "success"
                      ? "rgba(34, 197, 94, 0.15)"
                      : "rgba(239, 68, 68, 0.15)",
                  border: `1px solid ${formStatus.type === "success" ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {formStatus.type === "success" ? (
                  <CheckCircle size={18} color="#22c55e" />
                ) : (
                  <AlertCircle size={18} color="#ef4444" />
                )}
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color:
                      formStatus.type === "success" ? "#22c55e" : "#ef4444",
                  }}
                >
                  {formStatus.message}
                </span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div>
                  <label style={labelStyle}>Personnel Identification</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="FULL NAME"
                    style={inputStyle}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Communication Gateway</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="EMAIL ADDRESS"
                    style={inputStyle}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Inquiry Parameters</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="DECLARE YOUR REQUIREMENTS..."
                  style={{ ...inputStyle, resize: "none" }}
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "14px",
                  borderRadius: "10px",
                  fontWeight: 800,
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  opacity: isSubmitting ? 0.7 : 1,
                  transition: "background 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  !isSubmitting &&
                  (e.currentTarget.style.background = "#b91c1c")
                }
                onMouseLeave={(e) =>
                  !isSubmitting &&
                  (e.currentTarget.style.background = "#dc2626")
                }
              >
                <Send size={14} />{" "}
                {isSubmitting ? "DEPLOYING..." : "DEPLOY MESSAGE"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
