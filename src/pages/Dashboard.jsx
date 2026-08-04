import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Edit3,
  Eye,
  EyeOff,
  FileText,
  Home,
  Image as ImageIcon,
  LogOut,
  MessageSquare,
  Package,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Trash2,
  User,
  Users,
  CreditCard,
  PackageOpen,
  X,
  TrendingUp,
  TrendingDown,
  Clock,
  Calendar,
  DollarSign,
  Wallet,
  Truck,
  ClipboardList,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminProductForm from "../components/AdminProductForm";
import NotificationSettings from "../components/NotificationSettings";
import { useInventory } from "../context/useInventory";
import PhotosWorkspace from "../components/PhotosWorkspace";
import PartiesWorkspace from "../components/admin/PartiesWorkspace";
import BillingWorkspace from "../components/admin/BillingWorkspace";
import PurchasesWorkspace from "../components/admin/PurchasesWorkspace";
import ExpensesWorkspace from "../components/admin/ExpensesWorkspace";
import GodownWorkspace from "../components/admin/GodownWorkspace";
import AnalyticsDashboard from "../components/admin/AnalyticsDashboard";
import DispatchManagement from "../components/admin/DispatchManagement";
import AdminDealerOrders from "../components/admin/AdminDealerOrders";
import AdminWarranty from "../components/admin/AdminWarranty";
import AdminNews from "../components/admin/AdminNews";
import AdminUsers from "../components/admin/AdminUsers";
import EmployeeManagementWorkspace from "../components/admin/EmployeeSection/EmployeeManagementWorkspace";
import "../styles/Dashboard.css";

const API = "/api";
const LOGO = "/images/image.png";

const money = (value) => `Rs ${Number(value || 0).toLocaleString("en-IN")}`;
const date = (value) =>
  value ? new Date(value).toLocaleDateString("en-IN") : "Today";
const time = (value) =>
  value ? new Date(value).toLocaleTimeString("en-IN") : "Now";
const productImage = (product) => product?.image || product?.images?.[0] || "";

const MENU = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "profile", label: "Profile", icon: User },
  { id: "leadManager", label: "Lead Manager", icon: MessageSquare },
  { id: "parties", label: "Parties", icon: Users },
  { id: "billing", label: "Billing", icon: FileText },
  { id: "purchases", label: "Purchases", icon: ShoppingCart },
  { id: "expenses", label: "Expenses", icon: CreditCard },
  { id: "godown", label: "Inventory Tracker", icon: PackageOpen },
  { id: "products", label: "Products", icon: ShoppingCart },
  { id: "orders", label: "Orders", icon: Package },
  { id: "dealerOrders", label: "Dealer Orders", icon: Truck },
  { id: "dispatch", label: "Dispatch Management", icon: Truck },
  { id: "warranty", label: "Warranty Claims", icon: ClipboardList },
  { id: "news", label: "News & Alerts", icon: Bell }, // Corrected path below
  { id: "photos", label: "Photos & Docs", icon: ImageIcon },
  { id: "employeeManagement", label: "Employee Management", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

function BusinessPreview({
  orders = [],
  products = [],
  stats = {},
  setActiveTab,
  onViewAll,
}) {
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  // Calculate today's metrics with null checks
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayOrders = (orders || []).filter((o) => {
    if (!o?.createdAt) return false;
    const d = new Date(o.createdAt);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });

  const todaySales = todayOrders.reduce(
    (sum, o) => sum + (o?.totalAmount || 0),
    0,
  );
  const todayPending = todayOrders.filter(
    (o) => o?.status === "pending_approval",
  ).length;

  // Calculate cash balance
  const totalReceivables = (orders || [])
    .filter((o) => o?.status !== "cancelled" && o?.status !== "delivered")
    .reduce((sum, o) => sum + (o?.totalAmount || 0), 0);

  const totalPaid = (orders || [])
    .filter((o) => o?.status === "delivered")
    .reduce((sum, o) => sum + (o?.totalAmount || 0), 0);

  const cashBalance = totalPaid - totalReceivables;

  // Weekly sales data
  const getWeeklySales = () => {
    const weeks = [];
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - i * 7);
      weekStart.setHours(0, 0, 0, 0);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      const weekOrders = (orders || []).filter((o) => {
        if (!o?.createdAt) return false;
        const d = new Date(o.createdAt);
        return d >= weekStart && d <= weekEnd && o?.status === "delivered";
      });

      weeks.push({
        label: `Week ${4 - i}`,
        sales: weekOrders.reduce((sum, o) => sum + (o?.totalAmount || 0), 0),
        orders: weekOrders.length,
      });
    }
    return weeks.reverse();
  };

  const weeklyData = getWeeklySales();

  // Daily transactions
  const todayTransactions = todayOrders.map((o) => ({
    id: o?._id || o?.id || Math.random().toString(),
    customer: o?.customerId?.name || "Customer",
    amount: o?.totalAmount || 0,
    type: o?.status === "delivered" ? "Sale" : "Pending",
    time: time(o?.createdAt),
    status: o?.status || "Unknown",
  }));

  const cards = [
    {
      label: "Today's Sales",
      value: money(todaySales),
      icon: DollarSign,
      color: "#10b981",
      bg: "bg-green-50 dark:bg-green-900/20",
      onClick: () => setActiveTab?.("orders"),
      detail: `${todayOrders.length} orders today`,
    },
    {
      label: "Cash Balance",
      value: money(cashBalance),
      icon: Wallet,
      color: "#3b82f6",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      onClick: () => onViewAll?.("transactions"),
      detail: `${(orders || []).filter((o) => o?.status === "pending_approval").length} pending`,
    },
    {
      label: "Pending Orders",
      value: todayPending,
      icon: Clock,
      color: "#f59e0b",
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      onClick: () => setActiveTab?.("orders"),
      detail: `Total ${(orders || []).filter((o) => o?.status === "pending_approval").length} pending`,
    },
    {
      label: "Total Products",
      value: (products || []).length,
      icon: Package,
      color: "#8b5cf6",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      onClick: () => setActiveTab?.("products"),
      detail: `${(products || []).filter((p) => p?.stockStatus === "Out of Stock").length} out of stock`,
    },
  ];

  return (
    <div className="admin-business-preview">
      <div className="admin-preview-header">
        <div>
          <h3>📊 Business Preview</h3>
          <div className="admin-preview-time">
            <Clock size={14} />
            <span>Live: {new Date().toLocaleString("en-IN")}</span>
          </div>
        </div>
        <div className="admin-preview-actions">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="admin-period-select"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button
            className="admin-view-all-btn"
            onClick={() => setShowAllTransactions(true)}
          >
            See All Transactions <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="admin-preview-grid">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="admin-preview-card"
            onClick={card.onClick}
            style={{ cursor: "pointer" }}
          >
            <div
              className="admin-preview-card-icon"
              style={{ background: card.bg }}
            >
              <card.icon size={20} color={card.color} />
            </div>
            <div className="admin-preview-card-content">
              <span className="admin-preview-card-label">{card.label}</span>
              <strong className="admin-preview-card-value">{card.value}</strong>
              <small className="admin-preview-card-detail">{card.detail}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Sales Chart */}
      <div className="admin-preview-chart">
        <div className="admin-chart-header">
          <span>📈 Weekly Sales Trend</span>
          <div className="admin-chart-controls">
            <button className="active">Week</button>
            <button>Month</button>
            <button>Quarter</button>
          </div>
        </div>
        <div className="admin-chart-bars">
          {weeklyData.map((week, idx) => {
            const maxSales = Math.max(...weeklyData.map((w) => w.sales), 1);
            return (
              <div key={idx} className="admin-chart-bar-group">
                <div className="admin-chart-bar-wrapper">
                  <div
                    className="admin-chart-bar"
                    style={{
                      height: `${Math.max((week.sales / maxSales) * 100, 5)}%`,
                      background: week.sales > 0 ? "#3b82f6" : "#e5e7eb",
                    }}
                  />
                </div>
                <span className="admin-chart-label">{week.label}</span>
                <span className="admin-chart-value">{money(week.sales)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's Transactions */}
      {todayTransactions.length > 0 && (
        <div className="admin-preview-transactions">
          <div className="admin-transactions-header">
            <span>🔄 Today's Transactions</span>
            <small>{todayTransactions.length} transactions</small>
          </div>
          <div className="admin-transactions-list">
            {todayTransactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="admin-transaction-item">
                <div>
                  <strong>{tx.customer}</strong>
                  <span>{tx.time}</span>
                </div>
                <div>
                  <span
                    className={`tx-status ${tx.type === "Sale" ? "success" : "warning"}`}
                  >
                    {tx.type}
                  </span>
                  <strong>{money(tx.amount)}</strong>
                </div>
              </div>
            ))}
            {todayTransactions.length > 5 && (
              <button
                className="admin-show-more"
                onClick={() => setShowAllTransactions(true)}
              >
                +{todayTransactions.length - 5} more transactions
              </button>
            )}
          </div>
        </div>
      )}

      {/* All Transactions Modal */}
      {showAllTransactions && (
        <div
          className="admin-modal-overlay"
          onClick={() => setShowAllTransactions(false)}
        >
          <div
            className="admin-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h3>All Transactions</h3>
              <button onClick={() => setShowAllTransactions(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="admin-modal-body">
              {(orders || []).map((order) => (
                <div
                  key={order?._id || order?.id || Math.random().toString()}
                  className="admin-transaction-item full"
                >
                  <div>
                    <strong>{order?.customerId?.name || "Customer"}</strong>
                    <span>
                      {date(order?.createdAt)} at {time(order?.createdAt)}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`tx-status ${order?.status === "delivered" ? "success" : "warning"}`}
                    >
                      {order?.status || "Unknown"}
                    </span>
                    <strong>{money(order?.totalAmount || 0)}</strong>
                  </div>
                </div>
              ))}
              {(orders || []).length === 0 && (
                <p className="admin-empty-text">No transactions found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DashboardHome({
  stats = {},
  products = [],
  lowStockProducts = [],
  outStockProducts = [],
  pendingOrders = [],
  leads = [],
  orders = [],
  setActiveTab,
}) {
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  // Product counts with null checks
  const totalProducts = (products || []).length;
  const outOfStockCount = (outStockProducts || []).length;
  const lowStockCount = (lowStockProducts || []).length;

  // Lead counts
  const newLeads = (leads || []).filter((l) => l?.status === "New").length;
  const pendingLeads = (leads || []).filter(
    (l) => l?.status === "Pending",
  ).length;

  return (
    <div className="admin-stack">
      {/* Stock Alerts */}
      {(outStockProducts?.length > 0 || lowStockProducts?.length > 0) && (
        <div className="admin-alert-strip">
          <AlertTriangle size={20} />
          <div>
            <strong>Stock alert</strong>
            <span>
              {outStockProducts?.length || 0} out of stock,{" "}
              {lowStockProducts?.length || 0} low stock. Customer side par
              out-of-stock products buy nahi honge.
            </span>
          </div>
          <button type="button" onClick={() => setActiveTab?.("products")}>
            Fix Stock
          </button>
        </div>
      )}

      {/* Business Preview Section */}
      <BusinessPreview
        orders={orders || []}
        products={products || []}
        stats={stats || {}}
        setActiveTab={setActiveTab}
        onViewAll={(type) => {
          if (type === "transactions") setShowAllTransactions(true);
        }}
      />

      {/* Stats Grid */}
      <div className="admin-stat-grid">
        <Stat
          label="Total Products"
          value={totalProducts}
          note={`${(products || []).filter((p) => p?.isActive).length} live`}
          onClick={() => setActiveTab?.("products")}
        />
        <Stat
          label="Pending Orders"
          value={(pendingOrders || []).length}
          note="Customer requests"
          onClick={() => setActiveTab?.("orders")}
        />
        <Stat
          label="Low Stock"
          value={lowStockCount}
          note="Need restock"
          onClick={() => setActiveTab?.("products")}
        />
        <Stat
          label="Out of Stock"
          value={outOfStockCount}
          note="Blocked for buy"
          danger
          onClick={() => setActiveTab?.("products")}
        />
        <Stat
          label="New Leads"
          value={newLeads}
          note={`${pendingLeads} pending`}
          onClick={() => setActiveTab?.("leadManager")}
        />
      </div>

      {/* Two Column Layout */}
      <div className="admin-two-grid">
        {/* Order Requests */}
        <section className="admin-card">
          <SectionTitle
            icon={Package}
            title="Latest Order Requests"
            action={
              <button type="button" onClick={() => setActiveTab?.("orders")}>
                View All{" "}
                {(pendingOrders || []).length > 0 &&
                  `(${(pendingOrders || []).length})`}
              </button>
            }
          />
          {(pendingOrders || []).length === 0 ? (
            <Empty text="No pending order request." />
          ) : (
            (pendingOrders || [])
              .slice(0, 5)
              .map((order) => (
                <OrderRow
                  key={order?._id || order?.id || Math.random().toString()}
                  order={order}
                  compact
                />
              ))
          )}
        </section>

        {/* Lead Manager */}
        <section className="admin-card">
          <SectionTitle
            icon={MessageSquare}
            title="Lead Manager"
            action={
              <button
                type="button"
                onClick={() => setActiveTab?.("leadManager")}
              >
                View All {newLeads > 0 && `(${newLeads} new)`}
              </button>
            }
          />
          {(leads || []).length === 0 ? (
            <Empty text="No new lead." />
          ) : (
            (leads || []).slice(0, 5).map((lead) => (
              <div
                className="admin-list-row"
                key={lead?._id || lead?.id || Math.random().toString()}
              >
                <div>
                  <strong>{lead?.customer || "Customer"}</strong>
                  <span>
                    {lead?.product || "Product inquiry"} |{" "}
                    {lead?.phone || "No phone"}
                  </span>
                  {lead?.status === "New" && (
                    <span className="admin-badge-new">New</span>
                  )}
                </div>
                <b>{lead?.status || "Unknown"}</b>
              </div>
            ))
          )}
        </section>
      </div>

      {/* Products Needing Attention */}
      <section className="admin-card">
        <SectionTitle
          icon={AlertTriangle}
          title="Products Needing Attention"
          action={
            <button type="button" onClick={() => setActiveTab?.("products")}>
              Manage Products
            </button>
          }
        />
        {[...(outStockProducts || []), ...(lowStockProducts || [])].slice(0, 8)
          .length === 0 ? (
          <Empty text="All products are stocked." />
        ) : (
          <div className="admin-product-alert-grid">
            {[...(outStockProducts || []), ...(lowStockProducts || [])]
              .slice(0, 8)
              .map((product) => (
                <div
                  className="admin-stock-card"
                  key={product?._id || product?.id || Math.random().toString()}
                  onClick={() => setActiveTab?.("products")}
                  style={{ cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(0,0,0,0.1)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
                >
                  {productImage(product) ? (
                    <img src={productImage(product)} alt="" />
                  ) : (
                    <Package size={28} />
                  )}
                  <div>
                    <strong>{product?.name || "Unnamed Product"}</strong>
                    <span>
                      {product?.stockStatus || "Unknown"} | Qty{" "}
                      {product?.stock_quantity || 0}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>

      {/* All Transactions Modal */}
      {showAllTransactions && (
        <div
          className="admin-modal-overlay"
          onClick={() => setShowAllTransactions(false)}
        >
          <div
            className="admin-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h3>All Transactions</h3>
              <button onClick={() => setShowAllTransactions(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="admin-modal-body">
              {(orders || []).map((order) => (
                <div
                  key={order?._id || order?.id || Math.random().toString()}
                  className="admin-transaction-item full"
                >
                  <div>
                    <strong>{order?.customerId?.name || "Customer"}</strong>
                    <span>
                      {date(order?.createdAt)} at {time(order?.createdAt)}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`tx-status ${order?.status === "delivered" ? "success" : "warning"}`}
                    >
                      {order?.status || "Unknown"}
                    </span>
                    <strong>{money(order?.totalAmount || 0)}</strong>
                  </div>
                </div>
              ))}
              {(orders || []).length === 0 && (
                <p className="admin-empty-text">No transactions found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// STAT COMPONENT - FIXED
// ============================================
function Stat({ label, value, note, danger, onClick }) {
  return (
    <div
      className={`admin-stat ${danger ? "danger" : ""}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <span>{label}</span>
      <strong>{value ?? 0}</strong>
      <small>{note || ""}</small>
    </div>
  );
}

// ============================================
// SECTION TITLE COMPONENT
// ============================================
function SectionTitle({ icon, title, action }) {
  const IconComponent = icon;
  return (
    <div className="admin-section-title">
      <div>
        {IconComponent && <IconComponent size={19} />}
        <strong>{title}</strong>
      </div>
      {action}
    </div>
  );
}

// ============================================
// EMPTY COMPONENT
// ============================================
function Empty({ text }) {
  return (
    <div className="admin-empty">
      <FileText size={34} />
      <span>{text || "No data available."}</span>
    </div>
  );
}

// ============================================
// ORDER ROW COMPONENT
// ============================================
function OrderRow({ order, compact, onStatus }) {
  if (!order) return null;

  const product = order?.productId;
  const customer = order?.customerId;
  const stockStatus = product?.stockStatus || "Unknown";
  const inStock = product?.stock_quantity > 0 && stockStatus !== "Out of Stock";

  return (
    <article className="admin-order-row">
      <div>
        <strong>{product?.name || "Product request"}</strong>
        <span>
          Order: {order?._id || order?.id || "N/A"} | {date(order?.createdAt)}
        </span>
        <p>{order?.requestMessage || "No message"}</p>
      </div>
      <div>
        <small>Customer</small>
        <b>{customer?.name || "Customer"}</b>
        <span>
          {customer?.phone || "No mobile"} | {customer?.email || "No email"}
        </span>
      </div>
      <div>
        <small>Stock</small>
        <b className={inStock ? "ok" : "danger"}>{stockStatus}</b>
        <span>
          Qty {product?.stock_quantity ?? 0} | Requested {order?.quantity || 0}
        </span>
      </div>
      <div>
        <small>Total</small>
        <b>{money(order?.totalAmount)}</b>
        <span>{order?.status || "Unknown"}</span>
      </div>
      {!compact && onStatus && (
        <div className="admin-row-actions">
          {order?.status === "pending_approval" && (
            <button
              type="button"
              disabled={!inStock}
              onClick={() => onStatus(order, "approved")}
            >
              Approve
            </button>
          )}
          {order?.status !== "delivered" && order?.status !== "cancelled" && (
            <button type="button" onClick={() => onStatus(order, "delivered")}>
              Deliver
            </button>
          )}
          {order?.status !== "cancelled" && (
            <button
              type="button"
              className="danger"
              onClick={() => onStatus(order, "cancelled")}
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </article>
  );
}

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================
export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({});
  const {
    products: inventoryProducts = [],
    addProduct,
    updateProduct,
    deleteProduct: deleteInventoryProduct,
    toggleProductStatus,
  } = useInventory() || { products: [] };
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [leads, setLeads] = useState([]);
  const [warrantyClaims, setWarrantyClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productStatusFilter, setProductStatusFilter] = useState("all");

  const normalizeAdminProduct = useCallback((product) => {
    if (!product) return null;
    const stockQuantity = Number(
      product.stock_quantity ?? product.qty ?? product.quantity ?? 0,
    );
    const priceValue =
      Number(
        product.price_inr ??
          product.price ??
          product.mrp_inr ??
          product.regular_price ??
          product.regularPrice ??
          0,
      ) || 0;

    return {
      ...product,
      _id:
        product._id ||
        product.id ||
        product.sku ||
        product.productId ||
        `LOCAL-${String(Math.random()).slice(2)}`,
      id:
        product.id ||
        product._id ||
        product.sku ||
        product.productId ||
        `LOCAL-${String(Math.random()).slice(2)}`,
      price_inr: priceValue,
      stock_quantity: stockQuantity,
      stockStatus:
        product.stockStatus ||
        (stockQuantity <= 0
          ? "Out of Stock"
          : stockQuantity < 5
            ? "Low Stock"
            : "In Stock"),
      isActive: product.isActive ?? true,
    };
  }, []);

  useEffect(() => {
    if (inventoryProducts && inventoryProducts.length > 0) {
      setProducts(inventoryProducts.map(normalizeAdminProduct).filter(Boolean));
    } else {
      setProducts([]);
    }
  }, [inventoryProducts, normalizeAdminProduct]);

  const showToast = useCallback((message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 4000);
  }, []);

  const fetchData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [statsRes, productsRes, ordersRes, leadsRes, warrantyRes] =
        await Promise.all([
          fetch(`${API}/admin/stats`, { headers }),
          fetch(`${API}/admin/products?limit=2000`, { headers }),
          fetch(`${API}/admin/orders?limit=200`, { headers }),
          fetch(`${API}/admin/leads`, { headers }),
          fetch(`${API}/admin/warranty`, { headers }),
        ]);

      if (
        [statsRes, productsRes, ordersRes, leadsRes, warrantyRes].some(
          (res) => res.status === 401,
        )
      ) {
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminMode");
        showToast("Your account has been logged in from another device.");
        navigate("/admin-login");
        return;
      }

      if (statsRes.ok) setStats(await statsRes.json());
      if (productsRes.ok) {
        const fetched = await productsRes.json();
        const list = Array.isArray(fetched.data)
          ? fetched.data
          : Array.isArray(fetched.products)
            ? fetched.products
            : Array.isArray(fetched)
              ? fetched
              : [];
        if (list.length > 0) {
          setProducts(list.map(normalizeAdminProduct).filter(Boolean));
        }
      }
      if (ordersRes.ok) {
        const data = await ordersRes.json();
        setOrders(data.data || []);
      }
      if (leadsRes.ok) setLeads(await leadsRes.json());
      if (warrantyRes.ok) setWarrantyClaims(await warrantyRes.json());
    } catch (error) {
      console.error(error);
      showToast(
        "Backend connection check karo. Local catalog loaded for admin.",
      );
    } finally {
      setLoading(false);
    }
  }, [showToast, token, normalizeAdminProduct, navigate]);

  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (user?.userType && user.userType !== "admin") {
      navigate("/");
      return;
    }
    if (localStorage.getItem("isAdmin") !== "true" || !token) {
      navigate("/admin-login");
      return;
    }
    fetchData();
  }, [fetchData, navigate, token, user]);

  const lowStockProducts = (products || []).filter(
    (product) => product?.stockStatus === "Low Stock",
  );
  const outStockProducts = (products || []).filter(
    (product) => product?.stockStatus === "Out of Stock",
  );
  const pendingOrders = (orders || []).filter(
    (order) => order?.status === "pending_approval",
  );
  const unreadLeads = (leads || []).filter((lead) =>
    ["New", "Pending"].includes(lead?.status),
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (products || []).filter((product) => {
      if (!product) return false;
      const matchesSearch =
        !query ||
        product.name?.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query);
      const matchesStock =
        stockFilter === "all" || product.stockStatus === stockFilter;
      const matchesStatus =
        productStatusFilter === "all" ||
        (productStatusFilter === "live" && product.isActive) ||
        (productStatusFilter === "private" && !product.isActive);
      return matchesSearch && matchesStock && matchesStatus;
    });
  }, [products, search, stockFilter, productStatusFilter]);

  const counts = {
    dashboard:
      outStockProducts.length + lowStockProducts.length + pendingOrders.length,
    leadManager: unreadLeads.length,
    products: outStockProducts.length + lowStockProducts.length,
    orders: pendingOrders.length,
    warranty: warrantyClaims.filter((claim) => claim?.status === "Pending")
      .length,
  };

  const logout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminMode");
    navigate("/admin-login");
  };

  const saveProduct = (product, action) => {
    const id = product?.id || product?._id || String(Date.now());
    const normalized = normalizeAdminProduct({
      ...product,
      id,
      _id: product?._id || id,
    });
    if (!normalized) return;

    if (action === "added") {
      addProduct(normalized);
      setProducts((current) => [normalized, ...(current || [])]);
    } else {
      updateProduct(id, normalized);
      setProducts((current) =>
        (current || []).map((item) =>
          item?._id === normalized._id || item?.id === normalized.id
            ? normalized
            : item,
        ),
      );
    }

    setShowForm(false);
    setEditingProduct(null);
    showToast(`Product ${action}. Customer side par update ho gaya.`);
    fetchData();
  };

  const toggleProduct = async (product) => {
    if (!product) return;
    try {
      const response = await fetch(`${API}/products/${product._id}/toggle`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Request failed");
      const result = await response.json();
      toggleProductStatus(product.id || product._id);
      showToast(
        `${product.name} ${result.isActive ? "public/live" : "private/hidden"} ho gaya.`,
      );
      fetchData();
    } catch {
      toggleProductStatus(product.id || product._id);
      showToast("Product visibility updated locally.");
    }
  };

  const deleteProduct = async (product) => {
    if (!product) return;
    if (!window.confirm(`Delete "${product.name}"?`)) return;
    const targetId = product.id || product._id;
    try {
      const response = await fetch(`${API}/products/${product._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Request failed");
      deleteInventoryProduct(targetId);
      showToast(`${product.name} delete ho gaya.`);
      fetchData();
    } catch {
      deleteInventoryProduct(targetId);
      setProducts((current) =>
        (current || []).filter(
          (item) => item?.id !== targetId && item?._id !== targetId,
        ),
      );
      showToast("Product deleted locally.");
    }
  };

  // If the component is still loading or there's an issue, show loading state
  if (loading && products.length === 0) {
    return (
      <div className="admin-simple-shell">
        <div
          className="loading-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              className="spinner"
              style={{
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #3b82f6",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                animation: "spin 1s linear infinite",
                margin: "0 auto 16px",
              }}
            ></div>
            <p>Loading Dashboard...</p>
          </div>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-simple-shell">
      {toast && (
        <div className="admin-toast">
          <Bell size={16} />
          <span>{toast}</span>
          <button type="button" onClick={() => setToast("")} aria-label="Close">
            <X size={15} />
          </button>
        </div>
      )}

      <aside className="admin-simple-sidebar">
        <button
          type="button"
          className="admin-simple-brand"
          onClick={() => setActiveTab("dashboard")}
        >
          <img src={LOGO} alt="Dushyant Power Tools" />
          <span>DPT Admin</span>
        </button>

        <nav>
          {MENU.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`admin-simple-nav ${activeTab === item.id ? "active" : ""}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              {!!counts[item.id] && <b>{counts[item.id]}</b>}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="admin-simple-nav logout"
          onClick={logout}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      <main className="admin-simple-main">
        <header className="admin-simple-topbar">
          <div>
            <span>Admin Panel</span>
            <h1>
              {MENU.find((item) => item.id === activeTab)?.label || "Dashboard"}
            </h1>
          </div>
          <div className="admin-top-actions">
            {loading && <small>Refreshing...</small>}
            <button type="button" onClick={fetchData}>
              <Bell size={16} /> Refresh
            </button>
            <button
              type="button"
              className="primary"
              onClick={() => {
                setEditingProduct(null);
                setShowForm(true);
              }}
            >
              <Plus size={16} /> Add Product
            </button>
          </div>
        </header>

        <section className="admin-simple-content">
          {activeTab === "dashboard" && (
            <DashboardHome
              stats={stats}
              products={products || []}
              lowStockProducts={lowStockProducts || []}
              outStockProducts={outStockProducts || []}
              pendingOrders={pendingOrders || []}
              leads={unreadLeads || []}
              orders={orders || []}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === "profile" && <ProfileWorkspace />}
          {activeTab === "leadManager" && (
            <LeadManager
              leads={leads || []}
              token={token}
              onRefresh={fetchData}
              showToast={showToast}
            />
          )}
          {activeTab === "products" && (
            <ProductsWorkspace
              products={filteredProducts || []}
              allProducts={products || []}
              search={search}
              setSearch={setSearch}
              stockFilter={stockFilter}
              setStockFilter={setStockFilter}
              productStatusFilter={productStatusFilter}
              setProductStatusFilter={setProductStatusFilter}
              onAdd={() => {
                setEditingProduct(null);
                setShowForm(true);
              }}
              onEdit={(product) => {
                setEditingProduct(product);
                setShowForm(true);
              }}
              onToggle={toggleProduct}
              onDelete={deleteProduct}
            />
          )}
          {activeTab === "orders" && (
            <OrdersWorkspace
              orders={orders || []}
              token={token}
              onRefresh={fetchData}
              showToast={showToast}
            />
          )}
          {activeTab === "warranty" && (
            <WarrantyWorkspace
              claims={warrantyClaims || []}
              token={token}
              onRefresh={fetchData}
              showToast={showToast}
            />
          )}
          {activeTab === "parties" && (
            <PartiesWorkspace token={token} showToast={showToast} />
          )}
          {activeTab === "billing" && (
            <BillingWorkspace token={token} showToast={showToast} />
          )}
          {activeTab === "purchases" && (
            <PurchasesWorkspace token={token} showToast={showToast} />
          )}
          {activeTab === "expenses" && (
            <ExpensesWorkspace token={token} showToast={showToast} />
          )}
          {activeTab === "godown" && (
            <GodownWorkspace token={token} showToast={showToast} />
          )}
          {activeTab === "analytics" && <AnalyticsDashboard token={token} />}
          {activeTab === "users" && <AdminUsers token={token} />}
          {activeTab === "dispatch" && <DispatchManagement token={token} />}
          {activeTab === "dealerOrders" && <AdminDealerOrders token={token} />}
          {activeTab === "warranty" && <AdminWarranty token={token} />}
          {activeTab === "news" && <AdminNews token={token} />}
          {activeTab === "photos" && <PhotosWorkspace token={token} />}
          {activeTab === "employeeManagement" && (
            <EmployeeManagementWorkspace />
          )}
          {activeTab === "settings" && (
            <section className="admin-card">
              <SectionTitle icon={Settings} title="Settings" />
              <NotificationSettings />
            </section>
          )}
        </section>
      </main>

      {showForm && (
        <AdminProductForm
          editProduct={editingProduct}
          token={token}
          onSuccess={saveProduct}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

// ============================================
// PROFILE WORKSPACE
// ============================================
function ProfileWorkspace() {
  return (
    <section className="admin-card">
      <SectionTitle icon={User} title="Profile" />
      <div className="admin-profile-box">
        <img src={LOGO} alt="" />
        <div>
          <h2>Dushyant Power Tools</h2>
          <p>Sidhi, Madhya Pradesh</p>
          <p>Mobile: 9244526432</p>
          <p>Email: dushyantsaket20@gmail.com</p>
        </div>
        <ShieldCheck size={42} />
      </div>
    </section>
  );
}

// ============================================
// LEAD MANAGER
// ============================================
function LeadManager({ leads = [], token, onRefresh, showToast }) {
  const updateLead = async (lead, status) => {
    if (!lead?._id) return;
    try {
      const response = await fetch(`${API}/admin/leads/${lead._id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Request failed");
      showToast(`Lead ${status}.`);
      onRefresh();
    } catch {
      showToast("Lead update nahi hua.");
    }
  };

  return (
    <section className="admin-card">
      <SectionTitle icon={MessageSquare} title="Lead Manager" />
      {(leads || []).length === 0 ? (
        <Empty text="No lead found." />
      ) : (
        (leads || []).map((lead) => (
          <article
            className="admin-lead-row"
            key={lead?._id || lead?.id || Math.random().toString()}
          >
            <div>
              <strong>{lead?.customer || "Customer"}</strong>
              <span>
                {lead?.phone || "No mobile"} | {lead?.email || "No email"}
              </span>
              <p>
                {lead?.product || "Product inquiry"} |{" "}
                {lead?.address || "No address"}
              </p>
            </div>
            <b>{lead?.status || "Unknown"}</b>
            <div className="admin-row-actions">
              <button type="button" onClick={() => updateLead(lead, "Pending")}>
                Pending
              </button>
              <button type="button" onClick={() => updateLead(lead, "Closed")}>
                Close
              </button>
            </div>
          </article>
        ))
      )}
    </section>
  );
}

function WarrantyWorkspace({ claims = [], token, onRefresh, showToast }) {
  const updateClaim = async (claim, status) => {
    if (!claim?._id) return;
    try {
      const response = await fetch(
        `${API}/admin/warranty/${claim._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        },
      );
      if (!response.ok) throw new Error("Request failed");
      showToast(`Warranty claim ${status}.`);
      onRefresh();
    } catch {
      showToast("Warranty claim update nahi hua.");
    }
  };

  const fileTiles = (claim) =>
    [
      ...(claim?.photos?.problem || []).map((file, index) => ({
        ...file,
        label: `Problem ${index + 1}`,
      })),
      claim?.photos?.warranty && {
        ...claim.photos.warranty,
        label: "Warranty Card",
      },
      claim?.photos?.invoice && { ...claim.photos.invoice, label: "Invoice" },
      claim?.photos?.serial && { ...claim.photos.serial, label: "Serial No." },
    ].filter(Boolean);

  return (
    <section className="admin-card">
      <SectionTitle icon={ClipboardList} title="Warranty Claims" />
      {(claims || []).length === 0 ? (
        <Empty text="No warranty claim found." />
      ) : (
        (claims || []).map((claim) => (
          <article
            className="admin-warranty-row"
            key={claim?._id || claim?.claimId}
          >
            <div className="admin-warranty-main">
              <strong>
                {claim?.claimId || "Warranty Claim"} - {claim?.productName}
              </strong>
              <span>
                {claim?.customerName || "Customer"} |{" "}
                {claim?.contactPhone || claim?.customerEmail || "No contact"}
              </span>
              <p>
                {claim?.modelNo || "No serial"} |{" "}
                {claim?.invoiceNo || "No invoice"} |{" "}
                {claim?.description || "No description"}
              </p>
              <div className="admin-warranty-files">
                {fileTiles(claim).map((file) => (
                  <a
                    key={`${file.label}-${file.name}`}
                    href={file.dataUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {file.dataUrl?.startsWith("data:image") ? (
                      <img src={file.dataUrl} alt={file.label} />
                    ) : (
                      <FileText size={24} />
                    )}
                    <span>{file.label}</span>
                  </a>
                ))}
              </div>
            </div>
            <b>{claim?.status || "Pending"}</b>
            <div className="admin-row-actions">
              <button
                type="button"
                onClick={() => updateClaim(claim, "Approved")}
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => updateClaim(claim, "Completed")}
              >
                Complete
              </button>
              <button
                type="button"
                className="danger"
                onClick={() => updateClaim(claim, "Rejected")}
              >
                Reject
              </button>
            </div>
          </article>
        ))
      )}
    </section>
  );
}

// ============================================
// PAGINATED PRODUCTS TABLE
// ============================================
function ProductsTable({ products, onEdit, onToggle, onDelete }) {
  const PAGE_SIZE = 50;
  const [page, setPage] = React.useState(1);
  React.useEffect(() => {
    setPage(1);
  }, [products.length]);

  const total = (products || []).length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const visible = (products || []).slice(start, start + PAGE_SIZE);

  if (total === 0) return <Empty text="No products found." />;

  const NavBar = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      <span style={{ fontSize: "13px", color: "#6b7280" }}>
        Showing{" "}
        <strong>
          {start + 1}–{Math.min(start + PAGE_SIZE, total)}
        </strong>{" "}
        of <strong>{total}</strong> products
      </span>
      {totalPages > 1 && (
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            style={{
              padding: "4px 10px",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              background: page === 1 ? "#f3f4f6" : "#fff",
              cursor: page === 1 ? "default" : "pointer",
              fontSize: "12px",
            }}
          >
            «
          </button>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              padding: "4px 10px",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              background: page === 1 ? "#f3f4f6" : "#fff",
              cursor: page === 1 ? "default" : "pointer",
              fontSize: "12px",
            }}
          >
            ‹ Prev
          </button>
          <span
            style={{
              padding: "4px 14px",
              background: "#3b82f6",
              color: "#fff",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              padding: "4px 10px",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              background: page === totalPages ? "#f3f4f6" : "#fff",
              cursor: page === totalPages ? "default" : "pointer",
              fontSize: "12px",
            }}
          >
            Next ›
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            style={{
              padding: "4px 10px",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              background: page === totalPages ? "#f3f4f6" : "#fff",
              cursor: page === totalPages ? "default" : "pointer",
              fontSize: "12px",
            }}
          >
            »
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <NavBar />
      {visible.map((product) => (
        <ProductRow
          key={product?._id || product?.id || Math.random().toString()}
          product={product}
          onEdit={() => onEdit(product)}
          onToggle={() => onToggle(product)}
          onDelete={() => onDelete(product)}
        />
      ))}
      {totalPages > 1 && (
        <div style={{ marginTop: "12px" }}>
          <NavBar />
        </div>
      )}
    </div>
  );
}

// ============================================
// PRODUCTS WORKSPACE
// ============================================
function ProductsWorkspace({
  products = [],
  allProducts = [],
  search,
  setSearch,
  stockFilter,
  setStockFilter,
  productStatusFilter,
  setProductStatusFilter,
  onAdd,
  onEdit,
  onToggle,
  onDelete,
}) {
  const activeProducts = (allProducts || []).filter((p) => p?.isActive);
  const privateProducts = (allProducts || []).filter((p) => !p?.isActive);
  const outOfStock = (allProducts || []).filter(
    (p) => p?.stockStatus === "Out of Stock",
  );

  return (
    <div className="admin-stack">
      <div className="admin-toolbar">
        <label>
          <Search size={16} />
          <input
            value={search || ""}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products, brand, category"
          />
        </label>
        <select
          value={stockFilter || "all"}
          onChange={(event) => setStockFilter(event.target.value)}
        >
          <option value="all">All Stock</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        <button type="button" onClick={onAdd}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="admin-stat-grid compact">
        <Stat
          label="All Products"
          value={(allProducts || []).length}
          note="Admin catalog"
        />
        <Stat
          label="Live"
          value={activeProducts.length}
          note="Customer visible"
        />
        <Stat label="Private" value={privateProducts.length} note="Hidden" />
        <Stat
          label="Out of Stock"
          value={outOfStock.length}
          note="Buy blocked"
          danger
        />
      </div>

      <section className="admin-card">
        <SectionTitle icon={ShoppingCart} title="Products" />

        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "20px",
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => setProductStatusFilter("all")}
            style={{
              padding: "8px 16px",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              background: productStatusFilter === "all" ? "#111" : "#f3f4f6",
              color: productStatusFilter === "all" ? "#fff" : "#666",
            }}
          >
            All Products
          </button>
          <button
            type="button"
            onClick={() => setProductStatusFilter("live")}
            style={{
              padding: "8px 16px",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              background:
                productStatusFilter === "live" ? "#10b981" : "#f3f4f6",
              color: productStatusFilter === "live" ? "#fff" : "#666",
            }}
          >
            Live ({activeProducts.length})
          </button>
          <button
            type="button"
            onClick={() => setProductStatusFilter("private")}
            style={{
              padding: "8px 16px",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              background:
                productStatusFilter === "private" ? "#f59e0b" : "#f3f4f6",
              color: productStatusFilter === "private" ? "#fff" : "#666",
            }}
          >
            Private ({privateProducts.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setStockFilter("Low Stock");
              setProductStatusFilter("all");
            }}
            style={{
              padding: "8px 16px",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              background: stockFilter === "Low Stock" ? "#f59e0b" : "#f3f4f6",
              color: stockFilter === "Low Stock" ? "#fff" : "#666",
            }}
          >
            Low Stock
          </button>
          <button
            type="button"
            onClick={() => {
              setStockFilter("Out of Stock");
              setProductStatusFilter("all");
            }}
            style={{
              padding: "8px 16px",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              background:
                stockFilter === "Out of Stock" ? "#dc2626" : "#f3f4f6",
              color: stockFilter === "Out of Stock" ? "#fff" : "#666",
            }}
          >
            Out of Stock
          </button>
        </div>

        <ProductsTable
          products={products}
          onEdit={onEdit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      </section>
    </div>
  );
}

// ============================================
// PRODUCT ROW
// ============================================
function ProductRow({ product, onEdit, onToggle, onDelete }) {
  if (!product) return null;

  const isOut = product.stockStatus === "Out of Stock";
  const isLow = product.stockStatus === "Low Stock";

  return (
    <article
      className={`admin-product-row ${isOut ? "out" : isLow ? "low" : ""}`}
    >
      <div className="admin-product-photo">
        {productImage(product) ? (
          <img src={productImage(product)} alt={product.name || "Product"} />
        ) : (
          <Package size={42} />
        )}
      </div>
      <div
        className="admin-product-main"
        onClick={onEdit}
        style={{ cursor: "pointer" }}
      >
        <div>
          <strong>{product.name || "Unnamed Product"}</strong>
          <span>
            {product.brand || "DPT"} | {product.category || "No category"}
          </span>
        </div>
        <p>{product.description || "No description added."}</p>
      </div>
      <div className="admin-product-price">
        <strong>{money(product.price_inr || product.mrp_inr)}</strong>
        <span>MRP {money(product.mrp_inr)}</span>
      </div>
      <div className="admin-stock-pill">
        <b>{product.stockStatus || "Unknown"}</b>
        <span>Qty {product.stock_quantity || 0}</span>
      </div>
      <div className="admin-row-actions">
        <button type="button" onClick={onEdit}>
          <Edit3 size={15} /> Edit
        </button>
        <button type="button" onClick={onToggle}>
          {product.isActive ? <Eye size={15} /> : <EyeOff size={15} />}{" "}
          {product.isActive ? "Live" : "Private"}
        </button>
        <button type="button" className="danger" onClick={onDelete}>
          <Trash2 size={15} /> Delete
        </button>
      </div>
    </article>
  );
}

// ============================================
// ORDERS WORKSPACE
// ============================================
function OrdersWorkspace({ orders = [], token, onRefresh, showToast }) {
  const updateStatus = async (order, status) => {
    if (!order?._id) return;
    try {
      const response = await fetch(`${API}/admin/orders/${order._id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, note: `Admin marked ${status}` }),
      });
      if (!response.ok) throw new Error("Request failed");
      showToast(`Order ${status}.`);
      onRefresh();
    } catch {
      showToast("Order update nahi hua.");
    }
  };

  return (
    <section className="admin-card">
      <SectionTitle icon={Package} title="Orders" />
      {(orders || []).length === 0 ? (
        <Empty text="Customer order request yahan dikhegi." />
      ) : (
        (orders || []).map((order) => (
          <OrderRow
            key={order?._id || order?.id || Math.random().toString()}
            order={order}
            onStatus={updateStatus}
          />
        ))
      )}
    </section>
  );
}

// ============================================
// STYLES INJECTION
// ============================================
const styles = `
.admin-business-preview {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.dark .admin-business-preview {
  background: #1e293b;
  border-color: #334155;
}

.admin-preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.admin-preview-header h3 {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
}

.admin-preview-time {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6b7280;
}

.admin-preview-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.admin-period-select {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 12px;
  background: #f9fafb;
}

.admin-view-all-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border-radius: 8px;
  border: none;
  font-size: 12px;
  font-weight: 600;
  color: #3b82f6;
  background: #eff6ff;
  cursor: pointer;
  transition: all 0.2s;
}

.admin-view-all-btn:hover {
  background: #dbeafe;
}

.admin-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.admin-preview-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s;
}

.admin-preview-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
}

.admin-preview-card-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.admin-preview-card-content {
  flex: 1;
}

.admin-preview-card-label {
  font-size: 11px;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.admin-preview-card-value {
  font-size: 18px;
  font-weight: 800;
  display: block;
  margin: 2px 0;
}

.admin-preview-card-detail {
  font-size: 11px;
  color: #9ca3af;
}

.admin-preview-chart {
  background: #f9fafb;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.dark .admin-preview-chart {
  background: #0f172a;
}

.admin-chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.admin-chart-header span {
  font-size: 13px;
  font-weight: 600;
}

.admin-chart-controls {
  display: flex;
  gap: 4px;
}

.admin-chart-controls button {
  padding: 4px 12px;
  border-radius: 6px;
  border: none;
  font-size: 11px;
  font-weight: 500;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
}

.admin-chart-controls button.active {
  background: #3b82f6;
  color: #fff;
}

.admin-chart-bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 120px;
  gap: 8px;
}

.admin-chart-bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
}

.admin-chart-bar-wrapper {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: flex-end;
}

.admin-chart-bar {
  width: 100%;
  min-height: 4px;
  border-radius: 4px 4px 0 0;
  transition: height 0.5s;
}

.admin-chart-label {
  font-size: 9px;
  color: #6b7280;
}

.admin-chart-value {
  font-size: 9px;
  font-weight: 600;
  color: #111827;
}

.dark .admin-chart-value {
  color: #f1f5f9;
}

.admin-preview-transactions {
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
}

.dark .admin-preview-transactions {
  border-color: #334155;
}

.admin-transactions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.admin-transactions-header span {
  font-size: 13px;
  font-weight: 600;
}

.admin-transactions-header small {
  font-size: 12px;
  color: #6b7280;
}

.admin-transactions-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.admin-transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  background: #f9fafb;
}

.dark .admin-transaction-item {
  background: #0f172a;
}

.admin-transaction-item > div {
  display: flex;
  align-items: center;
  gap: 8px;
}

.admin-transaction-item strong {
  font-size: 13px;
}

.admin-transaction-item span {
  font-size: 12px;
  color: #6b7280;
}

.tx-status {
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.tx-status.success {
  background: #dcfce7;
  color: #166534;
}

.dark .tx-status.success {
  background: rgba(34, 197, 94, 0.2);
  color: #4ade80;
}

.tx-status.warning {
  background: #fef9c3;
  color: #854d0e;
}

.dark .tx-status.warning {
  background: rgba(234, 179, 8, 0.2);
  color: #facc15;
}

.admin-show-more {
  background: transparent;
  border: none;
  color: #3b82f6;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px;
  text-align: center;
}

.admin-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.admin-modal-content {
  background: #fff;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  padding: 24px;
}

.dark .admin-modal-content {
  background: #1e293b;
}

.admin-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.admin-modal-header h3 {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}

.admin-modal-header button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.admin-modal-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.admin-transaction-item.full {
  padding: 12px 16px;
}

.admin-badge-new {
  background: #3b82f6;
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 10px;
  margin-left: 6px;
  text-transform: uppercase;
}

.admin-empty-text {
  text-align: center;
  color: #9ca3af;
  padding: 20px;
}

.admin-stat {
  cursor: pointer;
  transition: all 0.2s;
}

.admin-stat:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
}
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleTag = document.getElementById("dashboard-styles");
  if (styleTag) {
    styleTag.textContent = styles;
  } else {
    const newStyleTag = document.createElement("style");
    newStyleTag.id = "dashboard-styles";
    newStyleTag.textContent = styles;
    document.head.appendChild(newStyleTag);
  }
}
