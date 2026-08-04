import React, { useState, useEffect } from "react";
import {
  ShieldCheck, Search, Eye, CheckCircle, Clock, XCircle,
  ChevronDown, ChevronUp, Mail, Phone, Calendar, Wrench,
  Image as ImageIcon, FileText, AlertTriangle, RefreshCw
} from "lucide-react";

const API = "/api";

const STATUS_CONFIG = {
  pending:  { color: "#f59e0b", bg: "#fffbeb", label: "Pending",  icon: Clock },
  approved: { color: "#10b981", bg: "#ecfdf5", label: "Approved", icon: CheckCircle },
  rejected: { color: "#ef4444", bg: "#fef2f2", label: "Rejected", icon: XCircle },
};

const AdminWarranty = ({ token }) => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [updating, setUpdating] = useState(null);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [adminNote, setAdminNote] = useState("");

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/warranty`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const raw = await res.json();
      const arr = Array.isArray(raw) ? raw : (Array.isArray(raw.data) ? raw.data : []);
      setClaims(arr);
    } catch { setClaims([]); } finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    setUpdating(id + status);
    try {
      const res = await fetch(`${API}/admin/warranty/${id}/status`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, adminNote }),
      });
      if (res.ok) {
        setClaims(prev => prev.map(c => c.id === id ? { ...c, status, adminNote } : c));
        setAdminNote("");
      }
    } catch { alert("Update failed"); } finally { setUpdating(null); }
  };

  const filtered = claims.filter(c => {
    const matchTab = tab === "all" || c.status === tab;
    const s = search.toLowerCase();
    return matchTab && (!s || c.name?.toLowerCase().includes(s) || c.email?.toLowerCase().includes(s) || c.machineModel?.toLowerCase().includes(s));
  });

  const counts = {
    all: claims.length,
    pending: claims.filter(c => c.status === "pending").length,
    approved: claims.filter(c => c.status === "approved").length,
    rejected: claims.filter(c => c.status === "rejected").length,
  };

  const fmt = iso => iso ? new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>Warranty Claims</h2>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>Review and manage customer warranty requests</p>
        </div>
        <button onClick={load} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "#f1f5f9", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {[
          { id: "all", label: "All Claims" },
          { id: "pending", label: "Pending" },
          { id: "approved", label: "Approved" },
          { id: "rejected", label: "Rejected" },
        ].map(t => {
          const cfg = STATUS_CONFIG[t.id] || {};
          const active = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px",
              borderRadius: "10px", border: `1px solid ${active ? "#0f172a" : "#e2e8f0"}`,
              background: active ? "#0f172a" : "#fff", color: active ? "#fff" : "#374151",
              fontSize: "13px", fontWeight: "600", cursor: "pointer"
            }}>
              {t.label}
              <span style={{ background: active ? "rgba(255,255,255,0.2)" : (cfg.bg || "#f1f5f9"), color: active ? "#fff" : (cfg.color || "#64748b"), padding: "1px 6px", borderRadius: "10px", fontSize: "11px", fontWeight: "700" }}>
                {counts[t.id]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "20px", maxWidth: "400px" }}>
        <Search size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, model..."
          style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
      </div>

      {/* List */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
          <div style={{ width: "32px", height: "32px", border: "3px solid #e2e8f0", borderTop: "3px solid #f59e0b", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
          Loading warranty claims...
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
          <ShieldCheck size={40} color="#e2e8f0" style={{ margin: "0 auto 12px" }} />
          <p style={{ fontWeight: "600", fontSize: "16px" }}>No warranty claims found</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map(claim => {
            const cfg = STATUS_CONFIG[claim.status] || STATUS_CONFIG.pending;
            const StatusIcon = cfg.icon;
            const isOpen = expanded === claim.id;
            const images = [
              ...(claim.billImages || []),
              ...(claim.productImages || []),
            ];

            return (
              <div key={claim.id} style={{ background: "#fff", borderRadius: "14px", border: `1px solid ${isOpen ? "#e2e8f0" : "#f1f5f9"}`, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                {/* Summary row */}
                <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", cursor: "pointer" }} onClick={() => setExpanded(isOpen ? null : claim.id)}>
                  {/* Status badge */}
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <StatusIcon size={20} color={cfg.color} />
                  </div>

                  {/* Main info */}
                  <div style={{ flex: 1, minWidth: "180px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                      <span style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>{claim.name || "Unknown"}</span>
                      <span style={{ background: cfg.bg, color: cfg.color, fontSize: "10px", fontWeight: "700", padding: "2px 8px", borderRadius: "6px", textTransform: "uppercase" }}>{cfg.label}</span>
                    </div>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {claim.email && <span style={{ fontSize: "12px", color: "#3b82f6" }}>{claim.email}</span>}
                      {claim.phone && <span style={{ fontSize: "12px", color: "#10b981" }}>{claim.phone}</span>}
                    </div>
                  </div>

                  {/* Machine model */}
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "600", marginBottom: "2px" }}>MACHINE MODEL</div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "#374151" }}>{claim.machineModel || "—"}</div>
                  </div>

                  {/* Date */}
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "600", marginBottom: "2px" }}>SUBMITTED</div>
                    <div style={{ fontSize: "12px", color: "#374151" }}>{fmt(claim.createdAt)}</div>
                    {images.length > 0 && <div style={{ fontSize: "11px", color: "#f59e0b", marginTop: "2px" }}>{images.length} photo{images.length > 1 ? "s" : ""}</div>}
                  </div>

                  <div style={{ color: "#9ca3af" }}>{isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
                </div>

                {/* Expanded detail */}
                {isOpen && (
                  <div style={{ borderTop: "1px solid #f1f5f9", padding: "20px", background: "#f8fafc" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "20px" }}>
                      {[
                        { icon: Mail, label: "Email", value: claim.email },
                        { icon: Phone, label: "Phone", value: claim.phone },
                        { icon: Wrench, label: "Machine Model", value: claim.machineModel },
                        { icon: Calendar, label: "Purchase Date", value: claim.purchaseDate },
                        { icon: FileText, label: "Claim ID", value: claim.id },
                        { icon: Calendar, label: "Submitted On", value: fmt(claim.createdAt) },
                      ].map(({ icon: Icon, label, value }) => value && (
                        <div key={label} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#fff", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Icon size={13} color="#64748b" />
                          </div>
                          <div>
                            <div style={{ fontSize: "10px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase" }}>{label}</div>
                            <div style={{ fontSize: "13px", color: "#374151", fontWeight: "500", wordBreak: "break-all" }}>{value}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Problem description */}
                    {claim.problem && (
                      <div style={{ background: "#fff", borderRadius: "10px", padding: "14px", border: "1px solid #e2e8f0", marginBottom: "16px" }}>
                        <div style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", marginBottom: "6px" }}>Problem Description</div>
                        <p style={{ fontSize: "13px", color: "#374151", lineHeight: "1.6", margin: 0 }}>{claim.problem}</p>
                      </div>
                    )}

                    {/* Photos gallery */}
                    {images.length > 0 && (
                      <div style={{ marginBottom: "20px" }}>
                        <div style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", marginBottom: "10px" }}>
                          <ImageIcon size={13} style={{ display: "inline", marginRight: "4px" }} /> Uploaded Photos ({images.length})
                        </div>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                          {images.map((img, i) => (
                            <div key={i} onClick={() => setLightboxImg(img)}
                              style={{ width: "90px", height: "90px", borderRadius: "10px", overflow: "hidden", border: "2px solid #e2e8f0", cursor: "zoom-in", background: "#f1f5f9", flexShrink: 0 }}>
                              <img src={img} alt={`Claim photo ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Admin note */}
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Admin Note (optional)</label>
                      <textarea value={adminNote} onChange={e => setAdminNote(e.target.value)} placeholder="Add a note for this decision..."
                        style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "13px", outline: "none", resize: "vertical", minHeight: "70px", boxSizing: "border-box" }} />
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {["pending", "approved", "rejected"].map(s => {
                        const sc = STATUS_CONFIG[s];
                        const isActive = claim.status === s;
                        const isBusy = updating === claim.id + s;
                        return (
                          <button key={s} onClick={() => updateStatus(claim.id, s)} disabled={isBusy || isActive}
                            style={{
                              padding: "10px 20px", borderRadius: "10px", border: `2px solid ${isActive ? sc.color : "#e2e8f0"}`,
                              background: isActive ? sc.color : "#fff", color: isActive ? "#fff" : sc.color,
                              fontSize: "13px", fontWeight: "700", cursor: isActive ? "default" : "pointer",
                              display: "flex", alignItems: "center", gap: "6px", opacity: isBusy ? 0.6 : 1
                            }}>
                            <sc.icon size={14} />
                            {isBusy ? "Updating..." : (isActive ? `✓ ${sc.label}` : `Mark ${sc.label}`)}
                          </button>
                        );
                      })}
                    </div>

                    {/* Previous admin note */}
                    {claim.adminNote && (
                      <div style={{ marginTop: "12px", background: "#fffbeb", borderRadius: "8px", padding: "10px 14px", fontSize: "12px", color: "#78350f" }}>
                        <strong>Previous note:</strong> {claim.adminNote}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {lightboxImg && (
        <div onClick={() => setLightboxImg(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, cursor: "zoom-out", padding: "20px" }}>
          <img src={lightboxImg} alt="Full view" style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: "12px", objectFit: "contain" }} />
        </div>
      )}
    </div>
  );
};

export default AdminWarranty;
