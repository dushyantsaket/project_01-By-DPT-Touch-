import React, { useState, useEffect } from "react";
import {
  Truck, Package, CheckCircle, Clock, MapPin, Hash, Calendar,
  RefreshCw, Search, Eye, ChevronDown, ChevronUp, Send
} from "lucide-react";

const API = "/api";

const STATUS_FLOW = ["pending", "processing", "dispatched", "delivered"];
const STATUS_CONFIG = {
  pending:    { color: "#f59e0b", bg: "#fffbeb", label: "Pending" },
  processing: { color: "#3b82f6", bg: "#eff6ff", label: "Processing" },
  dispatched: { color: "#8b5cf6", bg: "#f5f3ff", label: "Dispatched" },
  delivered:  { color: "#10b981", bg: "#ecfdf5", label: "Delivered" },
  cancelled:  { color: "#ef4444", bg: "#fef2f2", label: "Cancelled" },
};

const DispatchManagement = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [dispatching, setDispatching] = useState(null);
  const [dispatchData, setDispatchData] = useState({});

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const raw = await res.json();
      const arr = Array.isArray(raw) ? raw : (Array.isArray(raw.data) ? raw.data : []);
      setOrders(arr);
    } catch { setOrders([]); } finally { setLoading(false); }
  };

  const handleDispatch = async (orderId) => {
    setDispatching(orderId);
    const dd = dispatchData[orderId] || {};
    try {
      const res = await fetch(`${API}/admin/orders/${orderId}/dispatch`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          trackingId: dd.trackingId || "",
          deliveryPartner: dd.deliveryPartner || "DPT Delivery",
          estimatedDelivery: dd.estimatedDelivery || new Date(Date.now() + 5 * 86400000).toISOString().split("T")[0],
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setOrders(prev => prev.map(o =>
          (o.id === orderId || o.orderId === orderId) ? { ...o, ...updated.order } : o
        ));
        setExpanded(null);
      }
    } catch { alert("Dispatch failed"); } finally { setDispatching(null); }
  };

  const updateField = (orderId, field, value) => {
    setDispatchData(prev => ({ ...prev, [orderId]: { ...(prev[orderId] || {}), [field]: value } }));
  };

  const filtered = orders.filter(o => {
    const matchTab = tab === "all" || o.status === tab;
    const s = search.toLowerCase();
    return matchTab && (!s || o.customerInfo?.name?.toLowerCase().includes(s) || o.orderId?.toLowerCase().includes(s) || o.trackingId?.toLowerCase().includes(s));
  });

  const counts = {
    all: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    dispatched: orders.filter(o => o.status === "dispatched").length,
    delivered: orders.filter(o => o.status === "delivered").length,
  };

  const fmt = iso => iso ? new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>Dispatch Management</h2>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>Track and manage order dispatching from warehouse to customer</p>
        </div>
        <button onClick={load} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "#f1f5f9", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px", marginBottom: "24px" }}>
        {Object.entries(counts).filter(([k]) => k !== "all").map(([key, val]) => {
          const cfg = STATUS_CONFIG[key] || {};
          return (
            <div key={key} style={{ background: cfg.bg || "#f9fafb", borderRadius: "12px", padding: "16px", border: `1px solid ${cfg.color}30`, textAlign: "center", cursor: "pointer" }} onClick={() => setTab(key)}>
              <div style={{ fontSize: "24px", fontWeight: "900", color: cfg.color }}>{val}</div>
              <div style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>{cfg.label}</div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {["all", "pending", "processing", "dispatched", "delivered"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "8px 16px", borderRadius: "10px", border: `1px solid ${tab === t ? "#0f172a" : "#e2e8f0"}`,
            background: tab === t ? "#0f172a" : "#fff", color: tab === t ? "#fff" : "#374151",
            fontSize: "13px", fontWeight: "600", cursor: "pointer", textTransform: "capitalize"
          }}>{t} ({counts[t] ?? orders.length})</button>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "20px", maxWidth: "400px" }}>
        <Search size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, order ID, tracking..."
          style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
      </div>

      {/* Order list */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ width: "32px", height: "32px", border: "3px solid #e2e8f0", borderTop: "3px solid #8b5cf6", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
          Loading orders...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
          <Package size={40} color="#e2e8f0" style={{ margin: "0 auto 12px" }} />
          <p style={{ fontWeight: "600", fontSize: "16px" }}>No orders found</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.map(order => {
            const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
            const isOpen = expanded === order.id;
            const dd = dispatchData[order.id] || {};
            const canDispatch = order.status === "pending" || order.status === "processing";

            return (
              <div key={order.id} style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                {/* Row */}
                <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", cursor: "pointer" }} onClick={() => setExpanded(isOpen ? null : order.id)}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Truck size={18} color={cfg.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: "140px" }}>
                    <div style={{ fontWeight: "700", fontSize: "14px", color: "#0f172a" }}>{order.customerInfo?.name || "Customer"}</div>
                    <div style={{ fontSize: "12px", color: "#94a3b8" }}>{order.orderId || order.id}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "600" }}>AMOUNT</div>
                    <div style={{ fontSize: "14px", fontWeight: "800", color: "#0f172a" }}>₹{(order.pricing?.grandTotal || 0).toLocaleString("en-IN")}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "600" }}>PAYMENT</div>
                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#374151" }}>{order.paymentMethod || "—"}</div>
                  </div>
                  <div>
                    <span style={{ background: cfg.bg, color: cfg.color, fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "8px" }}>{cfg.label}</span>
                  </div>
                  <div style={{ textAlign: "right", minWidth: "80px" }}>
                    <div style={{ fontSize: "11px", color: "#94a3b8" }}>{fmt(order.createdAt)}</div>
                    {order.trackingId && <div style={{ fontSize: "10px", color: "#8b5cf6", fontWeight: "600" }}>{order.trackingId}</div>}
                  </div>
                  <div style={{ color: "#9ca3af" }}>{isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
                </div>

                {/* Expanded dispatch form */}
                {isOpen && (
                  <div style={{ borderTop: "1px solid #f1f5f9", padding: "20px", background: "#f8fafc" }}>
                    {/* Status progress bar */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                      {STATUS_FLOW.map((s, i) => {
                        const sc = STATUS_CONFIG[s];
                        const done = STATUS_FLOW.indexOf(order.status) >= i;
                        return (
                          <React.Fragment key={s}>
                            <div style={{ textAlign: "center", flex: "0 0 auto" }}>
                              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: done ? sc.color : "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                                {done ? <CheckCircle size={16} color="#fff" /> : <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#9ca3af" }} />}
                              </div>
                              <div style={{ fontSize: "9px", fontWeight: "600", color: done ? sc.color : "#9ca3af", marginTop: "4px", textTransform: "uppercase" }}>{s}</div>
                            </div>
                            {i < STATUS_FLOW.length - 1 && (
                              <div style={{ flex: 1, height: "2px", background: STATUS_FLOW.indexOf(order.status) > i ? sc.color : "#e2e8f0", margin: "0 4px 16px" }} />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>

                    {/* Order info */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "16px" }}>
                      {[
                        { label: "Customer", value: order.customerInfo?.name },
                        { label: "Phone", value: order.customerInfo?.phone },
                        { label: "Email", value: order.customerInfo?.email },
                        { label: "Address", value: [order.shipping?.address, order.shipping?.city, order.shipping?.state].filter(Boolean).join(", ") },
                        { label: "Items", value: (order.items || []).map(i => `${i.name} ×${i.quantity}`).join(", ") },
                        { label: "Payment", value: order.paymentMethod },
                      ].map(({ label, value }) => value && (
                        <div key={label}>
                          <div style={{ fontSize: "10px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase", marginBottom: "2px" }}>{label}</div>
                          <div style={{ fontSize: "13px", color: "#374151", fontWeight: "500", wordBreak: "break-all" }}>{value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Dispatch info (if already dispatched) */}
                    {order.dispatchedAt && (
                      <div style={{ background: "#f5f3ff", borderRadius: "10px", padding: "14px", marginBottom: "16px", border: "1px solid #ddd6fe" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                          {[
                            { label: "Tracking ID", value: order.trackingId },
                            { label: "Delivery Partner", value: order.deliveryPartner },
                            { label: "Est. Delivery", value: order.estimatedDelivery },
                          ].map(({ label, value }) => (
                            <div key={label}>
                              <div style={{ fontSize: "10px", fontWeight: "600", color: "#7c3aed", textTransform: "uppercase" }}>{label}</div>
                              <div style={{ fontSize: "13px", fontWeight: "700", color: "#374151" }}>{value || "—"}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Dispatch form */}
                    {canDispatch && (
                      <div style={{ background: "#fff", borderRadius: "12px", padding: "16px", border: "1px solid #e2e8f0" }}>
                        <div style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a", marginBottom: "14px" }}>🚀 Dispatch This Order</div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "14px" }}>
                          <div>
                            <label style={{ fontSize: "11px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "4px" }}>Tracking ID</label>
                            <input value={dd.trackingId || ""} onChange={e => updateField(order.id, "trackingId", e.target.value)} placeholder="e.g. TRK-001234"
                              style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                          </div>
                          <div>
                            <label style={{ fontSize: "11px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "4px" }}>Delivery Partner</label>
                            <select value={dd.deliveryPartner || "DPT Delivery"} onChange={e => updateField(order.id, "deliveryPartner", e.target.value)}
                              style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", outline: "none" }}>
                              {["DPT Delivery", "BlueDart", "Delhivery", "DTDC", "India Post", "Ecom Express", "Shiprocket"].map(p => <option key={p}>{p}</option>)}
                            </select>
                          </div>
                          <div>
                            <label style={{ fontSize: "11px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "4px" }}>Est. Delivery Date</label>
                            <input type="date" value={dd.estimatedDelivery || ""} onChange={e => updateField(order.id, "estimatedDelivery", e.target.value)}
                              style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                          </div>
                        </div>
                        <button onClick={() => handleDispatch(order.id)} disabled={dispatching === order.id}
                          style={{ padding: "10px 22px", background: dispatching === order.id ? "#94a3b8" : "#8b5cf6", color: "#fff", border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                          <Truck size={14} /> {dispatching === order.id ? "Dispatching..." : "Confirm Dispatch"}
                        </button>
                      </div>
                    )}
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

export default DispatchManagement;
