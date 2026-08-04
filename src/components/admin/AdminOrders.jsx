import React, { useState, useEffect } from "react";
import {
  Package, User, MapPin, Phone, Mail, Truck, Clock,
  CreditCard, CheckCircle, XCircle, Search, Eye, Trash2, ChevronDown
} from "lucide-react";

const API = "/api";

const STATUS_OPTIONS = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

const STATUS_STYLE = {
  pending: { bg: "#fffbeb", color: "#d97706", label: "Pending" },
  confirmed: { bg: "#eff6ff", color: "#1d4ed8", label: "Confirmed" },
  processing: { bg: "#f0f9ff", color: "#0284c7", label: "Processing" },
  shipped: { bg: "#ecfdf5", color: "#059669", label: "Shipped" },
  delivered: { bg: "#dcfce7", color: "#16a34a", label: "Delivered" },
  cancelled: { bg: "#fef2f2", color: "#dc2626", label: "Cancelled" },
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => { loadOrders(); }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/orders`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${API}/admin/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
      if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
    } catch {
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    try {
      await fetch(`${API}/admin/orders/${id}`, { method: "DELETE" });
      setOrders(prev => prev.filter(o => o.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch {
      alert("Failed to delete");
    }
  };

  const formatTime = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const filtered = orders.filter(o => {
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    const s = search.toLowerCase();
    const matchSearch = !s ||
      o.customerInfo?.name?.toLowerCase().includes(s) ||
      o.customerInfo?.email?.toLowerCase().includes(s) ||
      o.orderId?.toLowerCase().includes(s) ||
      o.customerInfo?.phone?.includes(s);
    return matchStatus && matchSearch;
  });

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>Orders Manager</h2>
        <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>All customer orders with full details and status management</p>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px", marginBottom: "24px" }}>
        {[
          { label: "Total", value: orders.length, color: "#6b7280" },
          { label: "Pending", value: orders.filter(o => o.status === "pending").length, color: "#d97706" },
          { label: "Delivered", value: orders.filter(o => o.status === "delivered").length, color: "#16a34a" },
          { label: "Cancelled", value: orders.filter(o => o.status === "cancelled").length, color: "#dc2626" },
          { label: "COD Orders", value: orders.filter(o => o.paymentMethod === "COD").length, color: "#3b82f6" },
        ].map(c => (
          <div key={c.label} style={{ background: "#fff", borderRadius: "12px", padding: "14px", border: "1px solid #e2e8f0", textAlign: "center" }}>
            <div style={{ fontSize: "22px", fontWeight: "800", color: c.color }}>{c.value}</div>
            <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "600" }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: "300px" }}>
          <Search size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders..."
            style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {["all", ...STATUS_OPTIONS].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              style={{ padding: "8px 14px", borderRadius: "8px", border: `1px solid ${statusFilter === s ? "#0f172a" : "#e2e8f0"}`, background: statusFilter === s ? "#0f172a" : "#fff", color: statusFilter === s ? "#fff" : "#374151", fontSize: "12px", fontWeight: "600", cursor: "pointer", textTransform: "capitalize" }}>
              {s === "all" ? "All" : STATUS_STYLE[s]?.label || s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
          <div style={{ width: "32px", height: "32px", border: "3px solid #e2e8f0", borderTop: "3px solid #dc2626", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          Loading orders...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
          <Package size={40} color="#e2e8f0" style={{ margin: "0 auto 12px" }} />
          <p style={{ fontSize: "16px", fontWeight: "600" }}>No orders found</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 400px" : "1fr", gap: "20px" }}>
          {/* Orders List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {filtered.map(order => {
              const st = STATUS_STYLE[order.status] || STATUS_STYLE.pending;
              const firstItem = order.items?.[0];
              return (
                <div key={order.id} onClick={() => setSelected(order.id === selected?.id ? null : order)}
                  style={{ background: "#fff", borderRadius: "14px", border: `1px solid ${selected?.id === order.id ? "#dc2626" : "#e2e8f0"}`, padding: "16px", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    {/* Product Image */}
                    <div style={{ width: "56px", height: "56px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
                      {firstItem?.image ? (
                        <img src={firstItem.image} alt={firstItem.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
                      ) : (
                        <Package size={22} color="#cbd5e1" />
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "700", color: "#0f172a" }}>{order.orderId || order.id}</span>
                        <span style={{ background: st.bg, color: st.color, fontSize: "10px", fontWeight: "700", padding: "2px 8px", borderRadius: "6px" }}>{st.label}</span>
                        {order.paymentMethod === "COD" && (
                          <span style={{ background: "#eff6ff", color: "#1d4ed8", fontSize: "10px", fontWeight: "700", padding: "2px 8px", borderRadius: "6px" }}>COD</span>
                        )}
                      </div>
                      <div style={{ fontSize: "14px", color: "#374151", fontWeight: "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {order.customerInfo?.name} — {(order.items || []).map(i => i.name).join(", ")}
                      </div>
                      <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                        <span style={{ fontSize: "12px", color: "#94a3b8" }}><Clock size={11} color="#94a3b8" style={{ display: "inline", marginRight: "3px" }} />{formatTime(order.createdAt)}</span>
                        {order.pricing?.grandTotal && <span style={{ fontSize: "12px", color: "#10b981", fontWeight: "700" }}>₹{Number(order.pricing.grandTotal).toLocaleString("en-IN")}</span>}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "6px" }}>
                      <select value={order.status} onChange={e => { e.stopPropagation(); updateStatus(order.id, e.target.value); }}
                        disabled={updatingId === order.id}
                        onClick={e => e.stopPropagation()}
                        style={{ padding: "6px 10px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px", fontWeight: "600", cursor: "pointer", outline: "none", background: "#f8fafc" }}>
                        {STATUS_OPTIONS.map(s => (
                          <option key={s} value={s}>{STATUS_STYLE[s]?.label || s}</option>
                        ))}
                      </select>
                      <button onClick={e => { e.stopPropagation(); deleteOrder(order.id); }}
                        style={{ padding: "6px 10px", background: "#fef2f2", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                        <Trash2 size={14} color="#dc2626" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail Panel */}
          {selected && (
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "20px", height: "fit-content", position: "sticky", top: "80px", maxHeight: "80vh", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", margin: "0 0 2px" }}>Order Details</h3>
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>{selected.orderId}</span>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "20px" }}>×</button>
              </div>

              {/* Items */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", marginBottom: "8px" }}>Ordered Items</div>
                {(selected.items || []).map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", padding: "10px", background: "#f8fafc", borderRadius: "10px", marginBottom: "8px" }}>
                    <div style={{ width: "50px", height: "50px", borderRadius: "8px", background: "#fff", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {item.image ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} /> : <Package size={20} color="#cbd5e1" />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>{item.name}</div>
                      <div style={{ fontSize: "11px", color: "#94a3b8" }}>ID: {item.id || item._id || "—"} | Qty: {item.quantity || 1}</div>
                      <div style={{ fontSize: "12px", color: "#10b981", fontWeight: "700" }}>₹{Number(item.price || 0).toLocaleString("en-IN")}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Details */}
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", marginBottom: "8px" }}>Customer Info</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                {[
                  { icon: User, label: "Name", value: selected.customerInfo?.name },
                  { icon: Mail, label: "Email", value: selected.customerInfo?.email, link: `mailto:${selected.customerInfo?.email}` },
                  { icon: Phone, label: "Phone", value: selected.customerInfo?.phone, link: `tel:${selected.customerInfo?.phone}` },
                  { icon: MapPin, label: "Address", value: selected.customerInfo?.address },
                  { icon: MapPin, label: "City", value: `${selected.customerInfo?.city || ""} ${selected.customerInfo?.pincode || ""}` },
                  { icon: Truck, label: "Payment", value: selected.paymentMethod },
                ].filter(f => f.value).map(({ icon: Icon, label, value, link }) => (
                  <div key={label} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <Icon size={13} color="#64748b" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <span style={{ fontSize: "10px", color: "#94a3b8", display: "block" }}>{label}</span>
                      {link ? (
                        <a href={link} style={{ fontSize: "13px", color: "#3b82f6", textDecoration: "none", fontWeight: "500" }}>{value}</a>
                      ) : (
                        <span style={{ fontSize: "13px", color: "#374151", fontWeight: "500" }}>{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              {selected.pricing && (
                <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "12px", marginBottom: "16px" }}>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", marginBottom: "8px" }}>Pricing</div>
                  {[
                    { label: "Subtotal", value: selected.pricing.subtotal },
                    { label: "Tax", value: selected.pricing.taxAmount },
                    { label: "Delivery", value: selected.pricing.deliveryFee },
                    { label: "Grand Total", value: selected.pricing.grandTotal, bold: true },
                  ].filter(p => p.value !== undefined).map(p => (
                    <div key={p.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px", fontWeight: p.bold ? "800" : "500", color: p.bold ? "#0f172a" : "#374151" }}>
                      <span>{p.label}</span>
                      <span style={{ color: p.bold ? "#dc2626" : "inherit" }}>₹{Number(p.value).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Contact Actions */}
              <div style={{ display: "flex", gap: "8px" }}>
                {selected.customerInfo?.email && (
                  <a href={`mailto:${selected.customerInfo.email}`} style={{ flex: 1, padding: "10px", background: "#3b82f6", color: "#fff", borderRadius: "10px", textDecoration: "none", textAlign: "center", fontSize: "13px", fontWeight: "700" }}>
                    Email
                  </a>
                )}
                {selected.customerInfo?.phone && (
                  <a href={`tel:${selected.customerInfo.phone}`} style={{ flex: 1, padding: "10px", background: "#10b981", color: "#fff", borderRadius: "10px", textDecoration: "none", textAlign: "center", fontSize: "13px", fontWeight: "700" }}>
                    Call
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

export default AdminOrders;
