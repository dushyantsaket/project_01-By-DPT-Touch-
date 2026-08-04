import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Phone, Building2, MapPin, Handshake, ShieldAlert, ArrowLeft } from "lucide-react";

const DealerRegister = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 20px 40px" }}>
      <div style={{ maxWidth: "560px", width: "100%", background: "#fff", borderRadius: "24px", overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.4)" }}>
        
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #dc2626 100%)", padding: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "48px", height: "48px", background: "rgba(255,255,255,0.15)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Handshake size={24} color="#fff" />
            </div>
            <div>
              <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: "800", margin: "0 0 4px" }}>Dealership Application</h2>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", margin: 0 }}>Dushyant Power Tools Partner Program</p>
            </div>
          </div>
        </div>

        {/* Notice Content */}
        <div style={{ padding: "40px 32px", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", background: "#fef3c7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <ShieldAlert size={32} color="#d97706" />
          </div>

          <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#1e293b", marginBottom: "12px" }}>Registration Closed Online</h3>
          <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6", marginBottom: "28px" }}>
            Online dealer self-registration is currently closed. To ensure authenticity and maintain premium standards, all new dealer accounts must be authorized and registered manually by DPT Admin.
          </p>

          {/* Contact Details */}
          <div style={{ background: "#f8fafc", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0", marginBottom: "32px", display: "flex", flexDirection: "column", gap: "12px", textAlign: "left" }}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
              Contact DPT Admin to Register:
            </div>
            
            <a href="tel:+919754015503" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", color: "#334155", fontSize: "14px", fontWeight: "600" }}>
              <div style={{ width: "32px", height: "32px", background: "#e0f2fe", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Phone size={15} color="#0284c7" />
              </div>
              +91 97540 15503
            </a>

            <a href="mailto:dushyantpowertools@gmail.com" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", color: "#334155", fontSize: "14px", fontWeight: "600" }}>
              <div style={{ width: "32px", height: "32px", background: "#fee2e2", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Mail size={15} color="#dc2626" />
              </div>
              dushyantpowertools@gmail.com
            </a>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#334155", fontSize: "14px", fontWeight: "600" }}>
              <div style={{ width: "32px", height: "32px", background: "#ecfdf5", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MapPin size={15} color="#059669" />
              </div>
              Sidhi, Madhya Pradesh, India
            </div>
          </div>

          {/* Navigation Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button 
              onClick={() => navigate("/login/dealer")}
              style={{ width: "100%", padding: "14px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "12px", fontSize: "14px", fontWeight: "700", cursor: "pointer", transition: "background 0.2s" }}
            >
              Sign In to Existing Partner Account
            </button>
            <Link to="/login" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "#64748b", textDecoration: "none", fontSize: "13px", fontWeight: "600", marginTop: "8px" }}>
              <ArrowLeft size={14} /> Back to Portal Selection
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DealerRegister;
