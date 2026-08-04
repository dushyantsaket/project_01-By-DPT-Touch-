import React, { useState, useEffect } from "react";
import {
  Store, MapPin, Package, Clock, CheckCircle, XCircle,
  ChevronDown, ChevronUp, Search, RefreshCw, Truck, Phone, Mail
} from "lucide-react";

const API = "/api";

const STATUS_CONFIG = {
  pending:    { color: "#f59e0b", bg: "#fffbeb", label: "Pending" },
  accepted:   { color: "#3b82f6", bg: "#eff6ff", label: "Accepted" },
  packed:     { color: "#8b5cf6", bg: "#f5f3ff", label: "Packed" },
  dispatched: { color: "#06b6d4", bg: "#ecfeff", label: "Dispatched" },
  delivered:  { color: "#10b981", bg: "#ecfdf5", label: "Delivered" },
  cancelled:  { color: "#ef4444", bg: "#fef2f2", label: "Cancelled" },
};

const AdminDealerOrders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [updating, setUpdating] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/dealer-orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const raw = await res.json();
      const arr = Array.isArray(raw) ? raw : (Array.isArray(raw.data) ? raw.data : []);
      setOrders(arr);
    } catch { setOrders([]); } finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    setUpdating(id + status);
    try {
      const res = await fetch(`${API}/admin/dealer-orders/${id}/status`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    } catch { alert("Update failed"); } finally { setUpdating(null); }
  };

  const filtered = orders.filter(o => {
    const matchTab = tab === "all" || o.status === tab;
    const s = search.toLowerCase();
    return matchTab && (!s || o.dealerName?.toLowerCase().includes(s) || o.shopName?.toLowerCase().includes(s) || o.location?.toLowerCase().includes(s));
  });

  const counts = {};
  ["all", "pending", "accepted", "packed", "dispatched", "delivered", "cancelled"].forEach(s => {
    counts[s] = s === "all" ? orders.length : orders.filter(o => o.status === s).length;
  });

  const fmt = iso => iso ? new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>Dealer Orders</h2>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>Manage bulk orders placed by authorized dealers</p>
        </div>
        <button onClick={load} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "#f1f5f9", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "10px", marginBottom: "24px" }}>
        {["pending", "accepted", "dispatched", "delivered"].map(s => {
          const cfg = STATUS_CONFIG[s];
          return (
            <div key={s} onClick={() => setTab(s)} style={{ background: cfg.bg, borderRadius: "12px", padding: "14px", border: `1px solid ${cfg.color}30`, textAlign: "center", cursor: "pointer" }}>
              <div style={{ fontSize: "22px", fontWeight: "900", color: cfg.color }}>{counts[s]}</div>
              <div style={{ fontSize: "10px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>{cfg.label}</div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {["all", "pending", "accepted", "packed", "dispatched", "delivered", "cancelled"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "7px 14px", borderRadius: "10px", border: `1px solid ${tab === t ? "#0f172a" : "#e2e8f0"}`,
            background: tab === t ? "#0f172a" : "#fff", color: tab === t ? "#fff" : "#374151",
            fontSize: "12px", fontWeight: "600", cursor: "pointer", textTransform: "capitalize"
          }}>{t} ({counts[t]})</button>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "20px", maxWidth: "380px" }}>
        <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search dealer, shop, location..."
          style={{ width: "100%", padding: "9px 12px 9px 34px", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ width: "32px", height: "32px", border: "3px solid #e2e8f0", borderTop: "3px solid #3b82f6", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
          Loading dealer orders...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
          <Store size={40} color="#e2e8f0" style={{ margin: "0 auto 12px" }} />
          <p style={{ fontWeight: "600", fontSize: "16px" }}>No dealer orders found</p>
          <p style={{ fontSize: "13px" }}>Dealer orders will appear here when placed via the dealer portal</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.map(order => {
            const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
            const isOpen = expanded === order.id;

            return (
              <div key={order.id} style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", cursor: "pointer" }} onClick={() => setExpanded(isOpen ? null : order.id)}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Store size={18} color={cfg.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: "140px" }}>
                    <div style={{ fontWeight: "700", fontSize: "14px", color: "#0f172a" }}>{order.shopName || order.dealerName || "Dealer"}</div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "2px" }}>
                      {order.location && (
                        <span style={{ fontSize: "11px", color: "#64748b", display: "flex", alignItems: "center", gap: "3px" }}>
                          <MapPin size={10} /> {order.location}
                        </span>
                      )}
                      <span style={{ fontSize: "11px", color: "#94a3b8" }}>{order.orderId || order.id}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "600" }}>ORDER VALUE</div>
                    <div style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a" }}>₹{(order.totalAmount || 0).toLocaleString("en-IN")}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "600" }}>ITEMS</div>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#374151" }}>{(order.items || []).length}</div>
                  </div>
                  <span style={{ background: cfg.bg, color: cfg.color, fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "8px" }}>{cfg.label}</span>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "11px", color: "#94a3b8" }}>{fmt(order.createdAt)}</div>
                  </div>
                  <div style={{ color: "#9ca3af" }}>{isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
                </div>

                {isOpen && (
                  <div style={{ borderTop: "1px solid #f1f5f9", padding: "20px", background: "#f8fafc" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "16px" }}>
                      {[
                        { label: "Dealer Name", value: order.dealerName },
                        { label: "Shop Name", value: order.shopName },
                        { label: "Phone", value: order.phone },
                        { label: "Email", value: order.email },
                        { label: "GST No.", value: order.gstNumber },
                        { label: "Location", value: order.location },
                        { label: "Payment Method", value: order.paymentMethod },
                        { label: "Dealer ID", value: order.dealerId },
                      ].map(({ label, value }) => value && (
                        <div key={label}>
                          <div style={{ fontSize: "10px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase" }}>{label}</div>
                          <div style={{ fontSize: "13px", color: "#374151", fontWeight: "500" }}>{value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Items */}
                    {(order.items || []).length > 0 && (
                      <div style={{ background: "#fff", borderRadius: "10px", padding: "14px", border: "1px solid #e2e8f0", marginBottom: "16px" }}>
                        <div style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "10px" }}>Ordered Items</div>
                        {(order.items || []).map((item, i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < order.items.length - 1 ? "1px solid #f1f5f9" : "none", fontSize: "13px" }}>
                            <span style={{ color: "#374151", fontWeight: "500" }}>{item.name}</span>
                            <span style={{ color: "#94a3b8" }}>×{item.quantity} — ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString("en-IN")}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {Object.entries(STATUS_CONFIG).map(([s, sc]) => {
                        const isActive = order.status === s;
                        return (
                          <button key={s} onClick={() => updateStatus(order.id, s)} disabled={isActive || !!updating}
                            style={{
                              padding: "8px 16px", borderRadius: "8px",
                              border: `2px solid ${isActive ? sc.color : "#e2e8f0"}`,
                              background: isActive ? sc.color : "#fff", color: isActive ? "#fff" : sc.color,
                              fontSize: "12px", fontWeight: "700", cursor: isActive ? "default" : "pointer",
                              opacity: updating && !isActive ? 0.6 : 1
                            }}>
                            {isActive ? `✓ ${sc.label}` : sc.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminDealerOrders;
