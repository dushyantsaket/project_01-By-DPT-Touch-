import React, { useState, useEffect, useMemo } from "react";
import {
  TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users,
  Package, Truck, ShieldCheck, Store, RefreshCw, Download,
  BarChart2, PieChart, Calendar, Filter, ChevronUp, ChevronDown, Star
} from "lucide-react";

const API = "/api";

// ─── Tiny Bar Chart ──────────────────────────────────────────────
const MiniBarChart = ({ data, color = "#3b82f6", height = 120 }) => {
  const vals = Object.values(data);
  const labels = Object.keys(data);
  const max = Math.max(...vals, 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: `${height}px`, padding: "0 4px" }}>
      {vals.map((v, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap: "4px" }}>
          <div style={{ fontSize: "9px", color: "#94a3b8", textAlign: "center" }}>{v > 0 ? `₹${(v / 1000).toFixed(0)}k` : ""}</div>
          <div title={`${labels[i]}: ₹${v.toLocaleString("en-IN")}`} style={{ width: "100%", background: color, borderRadius: "3px 3px 0 0", height: `${max > 0 ? (v / max) * (height - 40) : 4}px`, minHeight: "4px", transition: "height 0.4s ease" }} />
          <div style={{ fontSize: "8px", color: "#94a3b8", textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "32px" }}>{labels[i]}</div>
        </div>
      ))}
    </div>
  );
};

// ─── Donut Chart ─────────────────────────────────────────────────
const DonutChart = ({ segments, size = 120 }) => {
  const total = segments.reduce((s, g) => s + g.value, 0);
  let cumulative = 0;
  const r = (size / 2) - 10;
  const cx = size / 2;
  const cy = size / 2;

  const getArc = (start, end) => {
    const startAngle = (start / total) * 2 * Math.PI - Math.PI / 2;
    const endAngle = (end / total) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const large = end - start > total / 2 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
  };

  return (
    <svg width={size} height={size}>
      {segments.map((seg, i) => {
        const start = cumulative;
        cumulative += seg.value;
        return <path key={i} d={getArc(start, cumulative)} fill={seg.color} opacity={0.85} />;
      })}
      <circle cx={cx} cy={cy} r={r * 0.6} fill="#fff" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="#374151">{total}</text>
    </svg>
  );
};

// ─── KPI Card ────────────────────────────────────────────────────
const KpiCard = ({ icon: Icon, label, value, sub, color, trend }) => (
  <div style={{ background: "#fff", borderRadius: "14px", padding: "20px", border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
      <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={18} color={color} />
      </div>
      {trend !== undefined && (
        <div style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "12px", fontWeight: "600", color: trend >= 0 ? "#10b981" : "#ef4444" }}>
          {trend >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div style={{ fontSize: "24px", fontWeight: "900", color: "#0f172a", lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", marginTop: "4px" }}>{label}</div>
    {sub && <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>{sub}</div>}
  </div>
);

const DATE_FILTERS = [
  { id: "today", label: "Today" },
  { id: "7d", label: "Last 7 Days" },
  { id: "30d", label: "Last 30 Days" },
  { id: "all", label: "All Time" },
];

const AnalyticsDashboard = ({ token }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => { load(); }, [dateFilter]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/analytics?filter=${dateFilter}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const d = await res.json();
      if (d.error) throw new Error(d.error);
      setData(d.data || d);
    } catch { setData(null); } finally { setLoading(false); }
  };

  const fmt = n => typeof n === "number" ? n.toLocaleString("en-IN") : (n || "0");
  const fmtRs = n => `₹${fmt(n)}`;

  const aiInsights = useMemo(() => {
    if (!data) return [];
    const { summary, topProducts, orderStatuses } = data;
    const insights = [];
    if (summary.avgOrderValue > 0) insights.push(`📊 Average order value is ₹${fmt(summary.avgOrderValue)} — consider upselling bundles.`);
    if (summary.pendingOrders > 0) insights.push(`⏳ ${summary.pendingOrders} order${summary.pendingOrders > 1 ? "s" : ""} pending approval — take action today.`);
    if (topProducts?.[0]) insights.push(`🏆 Best selling product: "${topProducts[0].name}" with ${topProducts[0].count} units sold.`);
    if (summary.totalDealers > 0) insights.push(`🤝 ${summary.totalDealers} active dealer${summary.totalDealers > 1 ? "s" : ""} in your network.`);
    if (summary.codOrders > summary.onlineOrders) insights.push(`💵 ${summary.codOrders} COD orders vs ${summary.onlineOrders} online — majority prefer COD.`);
    if (summary.warrantyPending > 0) insights.push(`🔧 ${summary.warrantyPending} warranty claim${summary.warrantyPending > 1 ? "s" : ""} awaiting review.`);
    insights.push(`📈 Total revenue generated: ₹${fmt(summary.totalRevenue || 0)}`);
    return insights;
  }, [data]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px", color: "#94a3b8" }}>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ width: "40px", height: "40px", border: "3px solid #e2e8f0", borderTop: "3px solid #3b82f6", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ fontWeight: "600" }}>Loading Analytics...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ textAlign: "center", padding: "80px", color: "#94a3b8" }}>
        <BarChart2 size={40} color="#e2e8f0" style={{ margin: "0 auto 12px" }} />
        <p style={{ fontWeight: "600" }}>Could not load analytics data</p>
        <button onClick={load} style={{ padding: "10px 20px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "600", marginTop: "12px" }}>Retry</button>
      </div>
    );
  }

  const { summary, topProducts = [], monthlySales = {}, orderStatuses = {}, recentOrders = [] } = data;

  const orderDonut = [
    { label: "Pending", value: orderStatuses.pending || 0, color: "#f59e0b" },
    { label: "Processing", value: orderStatuses.processing || 0, color: "#3b82f6" },
    { label: "Dispatched", value: orderStatuses.dispatched || 0, color: "#8b5cf6" },
    { label: "Delivered", value: orderStatuses.delivered || 0, color: "#10b981" },
    { label: "Cancelled", value: orderStatuses.cancelled || 0, color: "#ef4444" },
  ].filter(s => s.value > 0);

  const csvExport = () => {
    const rows = [
      ["Metric", "Value"],
      ["Total Revenue", summary.totalRevenue],
      ["Total Orders", summary.totalOrders],
      ["COD Orders", summary.codOrders],
      ["Online Orders", summary.onlineOrders],
      ["Total Customers", summary.totalCustomers],
      ["Total Dealers", summary.totalDealers],
      ["Avg Order Value", summary.avgOrderValue],
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    a.download = "dpt_analytics_report.csv";
    a.click();
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>Analytics Dashboard</h2>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>Complete business overview — sales, orders, customers, and more</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={load} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: "#f1f5f9", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
            <RefreshCw size={13} /> Refresh
          </button>
          <button onClick={csvExport} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: "#10b981", color: "#fff", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
            <Download size={13} /> Export CSV
          </button>
        </div>
      </div>

      {/* Date filter */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {DATE_FILTERS.map(f => (
          <button key={f.id} onClick={() => setDateFilter(f.id)} style={{
            padding: "7px 16px", borderRadius: "8px", border: `1px solid ${dateFilter === f.id ? "#3b82f6" : "#e2e8f0"}`,
            background: dateFilter === f.id ? "#eff6ff" : "#fff", color: dateFilter === f.id ? "#3b82f6" : "#374151",
            fontSize: "12px", fontWeight: "600", cursor: "pointer"
          }}>{f.label}</button>
        ))}
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px", marginBottom: "28px" }}>
        <KpiCard icon={DollarSign} label="Total Revenue" value={fmtRs(summary.totalRevenue)} color="#10b981" trend={12} />
        <KpiCard icon={ShoppingBag} label="Total Orders" value={fmt(summary.totalOrders)} color="#3b82f6" sub={`${summary.codOrders} COD · ${summary.onlineOrders} Online`} />
        <KpiCard icon={TrendingUp} label="Avg Order Value" value={fmtRs(summary.avgOrderValue)} color="#8b5cf6" />
        <KpiCard icon={Users} label="Total Customers" value={fmt(summary.totalCustomers)} color="#f59e0b" />
        <KpiCard icon={Store} label="Active Dealers" value={fmt(summary.totalDealers)} color="#06b6d4" />
        <KpiCard icon={Package} label="Pending Orders" value={fmt(summary.pendingOrders)} color="#f97316" />
        <KpiCard icon={Truck} label="Dispatched/Delivered" value={fmt(summary.dispatchedOrders)} color="#10b981" />
        <KpiCard icon={ShieldCheck} label="Warranty Pending" value={fmt(summary.warrantyPending)} color="#ef4444" />
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        {/* Monthly Sales chart */}
        <div style={{ gridColumn: "span 2", background: "#fff", borderRadius: "14px", padding: "20px", border: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <div style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a" }}>Monthly Sales</div>
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>Revenue by month (₹)</div>
            </div>
            <BarChart2 size={20} color="#3b82f6" />
          </div>
          {Object.keys(monthlySales).length > 0 ? (
            <MiniBarChart data={monthlySales} color="#3b82f6" height={140} />
          ) : (
            <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8", fontSize: "13px" }}>No sales data yet — place your first order!</div>
          )}
        </div>

        {/* Order Status Donut */}
        <div style={{ background: "#fff", borderRadius: "14px", padding: "20px", border: "1px solid #f1f5f9" }}>
          <div style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "4px" }}>Orders by Status</div>
          <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "16px" }}>Distribution</div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
            {orderDonut.length > 0 ? <DonutChart segments={orderDonut} size={110} /> : (
              <div style={{ width: "110px", height: "110px", borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: "12px" }}>No data</div>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {orderDonut.map(seg => (
              <div key={seg.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: seg.color }} />
                  <span style={{ color: "#374151" }}>{seg.label}</span>
                </div>
                <span style={{ fontWeight: "700", color: "#0f172a" }}>{seg.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products + Payment Split */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        {/* Top Products */}
        <div style={{ background: "#fff", borderRadius: "14px", padding: "20px", border: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Star size={16} color="#f59e0b" />
            <div style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a" }}>Top Selling Products</div>
          </div>
          {topProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px", color: "#94a3b8", fontSize: "13px" }}>No product sales yet</div>
          ) : topProducts.slice(0, 8).map((p, i) => {
            const pct = topProducts[0].count > 0 ? (p.count / topProducts[0].count) * 100 : 0;
            return (
              <div key={i} style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                  <span style={{ fontWeight: "600", color: "#374151" }}>#{i + 1} {p.name}</span>
                  <span style={{ fontWeight: "700", color: "#0f172a" }}>{p.count} sold</span>
                </div>
                <div style={{ height: "5px", background: "#f1f5f9", borderRadius: "4px" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: i === 0 ? "#f59e0b" : "#3b82f6", borderRadius: "4px", transition: "width 0.5s ease" }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment & Order analytics */}
        <div style={{ background: "#fff", borderRadius: "14px", padding: "20px", border: "1px solid #f1f5f9" }}>
          <div style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>Payment & Order Analytics</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            {[
              { label: "COD Orders", value: summary.codOrders, color: "#f59e0b", icon: "💵" },
              { label: "Online Orders", value: summary.onlineOrders, color: "#3b82f6", icon: "💳" },
              { label: "Total Leads", value: summary.totalLeads, color: "#8b5cf6", icon: "📋" },
              { label: "Dispatched", value: summary.dispatchedOrders, color: "#10b981", icon: "🚚" },
            ].map(({ label, value, color, icon }) => (
              <div key={label} style={{ background: "#f8fafc", borderRadius: "10px", padding: "14px", border: `1px solid ${color}20` }}>
                <div style={{ fontSize: "20px", marginBottom: "4px" }}>{icon}</div>
                <div style={{ fontSize: "20px", fontWeight: "900", color }}>{value}</div>
                <div style={{ fontSize: "11px", fontWeight: "600", color: "#64748b" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Order status breakdown */}
          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", marginBottom: "10px" }}>Order Status Breakdown</div>
            {Object.entries(orderStatuses).map(([s, v]) => {
              const colors = { pending: "#f59e0b", processing: "#3b82f6", dispatched: "#8b5cf6", delivered: "#10b981", cancelled: "#ef4444" };
              return (
                <div key={s} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #f8fafc" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: colors[s] || "#94a3b8" }} />
                    <span style={{ fontSize: "13px", color: "#374151", textTransform: "capitalize" }}>{s}</span>
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>{v}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🤖</div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "800", color: "#fff" }}>AI Business Insights</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Auto-generated from your real data</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {aiInsights.map((insight, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: "10px", padding: "12px 16px", fontSize: "13px", color: "rgba(255,255,255,0.85)", lineHeight: "1.5", borderLeft: "3px solid rgba(255,255,255,0.2)" }}>
              {insight}
            </div>
          ))}
          {aiInsights.length === 0 && (
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>Place your first order to start generating insights.</div>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div style={{ background: "#fff", borderRadius: "14px", padding: "20px", border: "1px solid #f1f5f9" }}>
        <div style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>Recent Orders</div>
        {recentOrders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "30px", color: "#94a3b8", fontSize: "13px" }}>No orders yet</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                  {["Order ID", "Customer", "Amount", "Payment", "Status", "Date"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(o => {
                  const cfg = { pending: "#f59e0b", processing: "#3b82f6", dispatched: "#8b5cf6", delivered: "#10b981", cancelled: "#ef4444" };
                  return (
                    <tr key={o.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                      <td style={{ padding: "10px", color: "#64748b", fontWeight: "600" }}>{(o.orderId || o.id)?.substring(0, 12)}...</td>
                      <td style={{ padding: "10px", fontWeight: "600", color: "#0f172a" }}>{o.customerInfo?.name || "—"}</td>
                      <td style={{ padding: "10px", fontWeight: "700", color: "#10b981" }}>₹{(o.pricing?.grandTotal || 0).toLocaleString("en-IN")}</td>
                      <td style={{ padding: "10px", color: "#374151" }}>{o.paymentMethod || "—"}</td>
                      <td style={{ padding: "10px" }}>
                        <span style={{ background: `${cfg[o.status] || "#94a3b8"}15`, color: cfg[o.status] || "#94a3b8", fontSize: "11px", fontWeight: "700", padding: "2px 8px", borderRadius: "6px", textTransform: "capitalize" }}>{o.status || "pending"}</span>
                      </td>
                      <td style={{ padding: "10px", color: "#94a3b8" }}>{o.createdAt ? new Date(o.createdAt).toLocaleDateString("en-IN") : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
