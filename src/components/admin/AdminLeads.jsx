import React, { useState, useEffect } from "react";
import {
  ShoppingCart, User, Package, Phone, Mail, Clock, Trash2, Search, Eye
} from "lucide-react";

const API = "/api";

const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/leads`);
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch {
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteLead = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    try {
      await fetch(`${API}/admin/leads/${id}`, { method: "DELETE" });
      setLeads(prev => prev.filter(l => l.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch {
      alert("Failed to delete lead");
    }
  };

  const formatTime = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const filtered = leads.filter(l => {
    const s = search.toLowerCase();
    return !s || l.customerName?.toLowerCase().includes(s) || l.customerEmail?.toLowerCase().includes(s) || l.productName?.toLowerCase().includes(s) || l.customerPhone?.includes(s);
  });

  const getLabelColor = (type) => {
    const map = { "add-to-cart": "#3b82f6", "order": "#10b981", "inquiry": "#f59e0b" };
    return map[type] || "#6b7280";
  };

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>Lead Manager</h2>
        <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>Track customer cart additions, inquiries and product interest</p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px", marginBottom: "24px" }}>
        {[
          { label: "Total Leads", value: leads.length, color: "#3b82f6", bg: "#eff6ff" },
          { label: "Cart Adds", value: leads.filter(l => l.type === "add-to-cart").length, color: "#f59e0b", bg: "#fffbeb" },
          { label: "Orders", value: leads.filter(l => l.type === "order").length, color: "#10b981", bg: "#ecfdf5" },
        ].map(card => (
          <div key={card.label} style={{ background: card.bg, borderRadius: "12px", padding: "16px", border: `1px solid ${card.color}20` }}>
            <div style={{ fontSize: "24px", fontWeight: "800", color: card.color }}>{card.value}</div>
            <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "20px", maxWidth: "400px" }}>
        <Search size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads..."
          style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
          <div style={{ width: "32px", height: "32px", border: "3px solid #e2e8f0", borderTop: "3px solid #dc2626", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          Loading leads...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
          <ShoppingCart size={40} color="#e2e8f0" style={{ margin: "0 auto 12px" }} />
          <p style={{ fontSize: "16px", fontWeight: "600" }}>No leads yet</p>
          <p style={{ fontSize: "13px" }}>Leads will appear when customers add products to cart or place orders</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 380px" : "1fr", gap: "20px" }}>
          {/* Leads List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {filtered.map(lead => (
              <div key={lead.id}
                onClick={() => setSelected(lead.id === selected?.id ? null : lead)}
                style={{
                  background: "#fff", borderRadius: "14px", border: `1px solid ${selected?.id === lead.id ? "#dc2626" : "#e2e8f0"}`,
                  padding: "16px", cursor: "pointer", transition: "all 0.2s",
                  boxShadow: selected?.id === lead.id ? "0 4px 12px rgba(220,38,38,0.1)" : "0 1px 4px rgba(0,0,0,0.04)",
                }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  {/* Product Image */}
                  <div style={{ width: "56px", height: "56px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
                    {lead.productImage ? (
                      <img src={lead.productImage} alt={lead.productName} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
                    ) : (
                      <Package size={24} color="#cbd5e1" />
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span style={{ background: getLabelColor(lead.type), color: "#fff", fontSize: "9px", fontWeight: "700", padding: "2px 8px", borderRadius: "6px", textTransform: "uppercase" }}>
                        {lead.type === "add-to-cart" ? "Cart Add" : lead.type || "Lead"}
                      </span>
                      <span style={{ fontSize: "11px", color: "#94a3b8" }}>{formatTime(lead.createdAt)}</span>
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", marginBottom: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {lead.productName || "Unknown Product"}
                    </div>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#374151" }}>
                        <User size={11} color="#64748b" /> {lead.customerName || "Guest"}
                      </span>
                      {lead.customerPhone && (
                        <a href={`tel:${lead.customerPhone}`} onClick={e => e.stopPropagation()}
                          style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#10b981", textDecoration: "none" }}>
                          <Phone size={11} /> {lead.customerPhone}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                    <button onClick={e => { e.stopPropagation(); setSelected(lead.id === selected?.id ? null : lead); }}
                      style={{ padding: "6px", background: "#f1f5f9", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                      <Eye size={14} color="#374151" />
                    </button>
                    <button onClick={e => { e.stopPropagation(); deleteLead(lead.id); }}
                      style={{ padding: "6px", background: "#fef2f2", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                      <Trash2 size={14} color="#dc2626" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detail Panel */}
          {selected && (
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "20px", height: "fit-content", position: "sticky", top: "80px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", margin: 0 }}>Lead Details</h3>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "18px" }}>×</button>
              </div>

              {/* Product */}
              <div style={{ background: "#f8fafc", borderRadius: "12px", padding: "14px", marginBottom: "16px" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "10px", background: "#fff", border: "1px solid #e2e8f0", margin: "0 auto 10px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {selected.productImage ? (
                    <img src={selected.productImage} alt={selected.productName} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
                  ) : (
                    <Package size={32} color="#cbd5e1" />
                  )}
                </div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", textAlign: "center", marginBottom: "4px" }}>{selected.productName || "Unknown"}</div>
                {selected.productId && <div style={{ fontSize: "11px", color: "#94a3b8", textAlign: "center" }}>ID: {selected.productId}</div>}
              </div>

              {/* Customer Details */}
              <div style={{ fontSize: "12px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", marginBottom: "10px" }}>Customer Info</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { icon: User, label: "Name", value: selected.customerName || "Guest" },
                  { icon: Mail, label: "Email", value: selected.customerEmail, link: `mailto:${selected.customerEmail}` },
                  { icon: Phone, label: "Phone", value: selected.customerPhone, link: `tel:${selected.customerPhone}` },
                  { icon: Clock, label: "Time", value: formatTime(selected.createdAt) },
                ].map(({ icon: Icon, label, value, link }) => value && (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Icon size={13} color="#64748b" />
                    <span style={{ fontSize: "11px", color: "#94a3b8", width: "50px" }}>{label}</span>
                    {link ? (
                      <a href={link} style={{ fontSize: "13px", color: "#3b82f6", textDecoration: "none", fontWeight: "500" }}>{value}</a>
                    ) : (
                      <span style={{ fontSize: "13px", color: "#374151", fontWeight: "500" }}>{value}</span>
                    )}
                  </div>
                ))}
              </div>

              {selected.quantity && (
                <div style={{ marginTop: "12px", background: "#fffbeb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", color: "#92400e", fontWeight: "600" }}>
                  Quantity: {selected.quantity} unit{selected.quantity > 1 ? "s" : ""}
                </div>
              )}

              <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                {selected.customerEmail && (
                  <a href={`mailto:${selected.customerEmail}`} style={{ flex: 1, padding: "10px", background: "#3b82f6", color: "#fff", borderRadius: "10px", textDecoration: "none", textAlign: "center", fontSize: "13px", fontWeight: "700" }}>
                    Send Email
                  </a>
                )}
                {selected.customerPhone && (
                  <a href={`tel:${selected.customerPhone}`} style={{ flex: 1, padding: "10px", background: "#10b981", color: "#fff", borderRadius: "10px", textDecoration: "none", textAlign: "center", fontSize: "13px", fontWeight: "700" }}>
                    Call Now
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminLeads;
