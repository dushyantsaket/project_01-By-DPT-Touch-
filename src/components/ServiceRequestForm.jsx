import React, { useState } from 'react';
import { Settings, Wrench, Shield, CheckCircle } from 'lucide-react';

const inputStyle = { width: '100%', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px 16px', color: '#111', fontSize: '13px', fontWeight: 600, outline: 'none', transition: 'border-color 0.3s' };
const labelStyle = { fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', display: 'block', marginBottom: '6px' };

const ServiceRequestForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    machineModel: '',
    issueType: '',
    comments: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      id: "SRQ-" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString(),
      status: 'Pending',
      ...formData
    };
    const existingRequests = JSON.parse(localStorage.getItem('serviceRequests') || '[]');
    localStorage.setItem('serviceRequests', JSON.stringify([newRequest, ...existingRequests]));
    setSubmitted(true);
    setFormData({ fullName: '', email: '', phone: '', city: '', machineModel: '', issueType: '', comments: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="service-form" style={{ padding: '64px 0', background: '#f3f4f6' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexWrap: 'wrap', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
          
          {/* Left Info Panel */}
          <div style={{ flex: '1 1 400px', background: '#111', color: '#fff', padding: 'clamp(32px, 5vw, 64px)', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{ width: '40px', height: '40px', background: '#dc2626', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wrench size={20} />
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Dushyant Power Tools</h3>
            </div>
            
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '24px' }}>
              Authorize <span style={{ color: '#dc2626' }}>Repair &</span> Services Request
            </h2>
            
            <p style={{ fontSize: '14px', color: '#9ca3af', fontWeight: 600, marginBottom: '32px', lineHeight: 1.6 }}>
              Are you facing an issue with your power tool? Submit a service request to our dedicated technical team. We ensure high-quality craftsmanship, genuine spare parts, and quick resolution.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Shield style={{ color: '#dc2626', shrink: 0 }} size={20} />
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Genuine Parts</h4>
                  <p style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>Only certified and authentic technical parts for replacements to ensure long-lasting durability.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Settings style={{ color: '#dc2626', shrink: 0 }} size={20} />
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Expert Diagnostics</h4>
                  <p style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>Qualified technicians provide fast and accurate analysis before starting any repair work.</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #1f2937' }}>
              <h5 style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#dc2626', marginBottom: '12px' }}>Direct Contact</h5>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#d1d5db', marginBottom: '4px' }}>Call: <a href="tel:+919754015503" style={{ color: '#fff', textDecoration: 'none' }}>+91 97540 15503</a></p>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#d1d5db' }}>Email: <a href="mailto:service@dushyantpowertools.com" style={{ color: '#fff', textDecoration: 'none' }}>service@dushyantpowertools.com</a></p>
            </div>
          </div>

          {/* Right Form Panel */}
          <div style={{ flex: '1 1 400px', padding: 'clamp(32px, 5vw, 64px)', background: '#fff' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ width: '64px', height: '64px', background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#22c55e' }}>
                  <CheckCircle size={32} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#111', marginBottom: '8px' }}>Request Submitted</h3>
                <p style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>We will analyze the issue and contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#111', marginBottom: '4px' }}>Request Service Evaluation</h4>
                <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, marginBottom: '16px' }}>Fill out the details below so our team can contact you immediately.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone No. *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>City *</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Machine Model *</label>
                    <input type="text" name="machineModel" value={formData.machineModel} onChange={handleChange} required placeholder="e.g. Angle Grinder 4 inch" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Issue Category</label>
                    <select name="issueType" value={formData.issueType} onChange={handleChange} style={inputStyle}>
                      <option value="">Select option</option>
                      <option value="Not Starting">Not Starting</option>
                      <option value="Overheating">Overheating</option>
                      <option value="Strange Noise">Strange Noise</option>
                      <option value="Broken Part">Broken Part</option>
                      <option value="Warranty">Warranty Claim</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Describe Problem *</label>
                  <textarea name="comments" value={formData.comments} onChange={handleChange} required style={{ ...inputStyle, height: '100px', resize: 'none' }} placeholder="Please elaborate..." />
                </div>

                <button type="submit" style={{ width: '100%', background: '#dc2626', color: '#fff', border: 'none', padding: '16px', borderRadius: '8px', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer', marginTop: '8px' }}>
                  Submit Service Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceRequestForm;
