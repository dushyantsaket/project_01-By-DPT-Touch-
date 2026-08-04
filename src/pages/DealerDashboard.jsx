import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  Package,
  ShoppingCart,
  ShieldCheck,
  Truck,
  User,
  LogOut,
  Clock,
  CreditCard,
  FileText,
  MapPin,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const API = "/api";

const DealerDashboard = () => {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState(0);
  const [pending, setPending] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const displayName = user?.name || "Dealer";
  const displayEmail = user?.email || "dealer@example.com";
  const displayInitials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  useEffect(() => {
    if (!isLoggedIn || user?.userType !== "dealer") {
      navigate("/dealer-login");
      return;
    }
    fetchDealerOrders();
  }, [isLoggedIn, user, navigate]);

  const fetchDealerOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/dealer/orders`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setOrders(data.data);
        setSales(
          data.data.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
        );
        setPending(
          data.data.filter((order) => order.status !== "delivered").length,
        );
      }
    } catch (err) {
      console.error("Dealer orders fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("isDealer");
    navigate("/dealer-login");
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Dealer Dashboard</h1>
          <p style={styles.subtitle}>
            Manage orders, track sales, and update your partner account.
          </p>
        </div>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <Home size={18} />
          </div>
          <div>
            <div style={styles.statValue}>Welcome</div>
            <div style={styles.statLabel}>{displayName}</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <CreditCard size={18} />
          </div>
          <div>
            <div style={styles.statValue}>₹{sales.toLocaleString("en-IN")}</div>
            <div style={styles.statLabel}>Total Sales</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <Truck size={18} />
          </div>
          <div>
            <div style={styles.statValue}>{pending}</div>
            <div style={styles.statLabel}>Open Orders</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <Package size={18} />
          </div>
          <div>
            <div style={styles.statValue}>{orders.length}</div>
            <div style={styles.statLabel}>Total Orders</div>
          </div>
        </div>
      </div>

      <div style={styles.grid}>
        <aside style={styles.sidebar}>
          <div style={styles.profileCard}>
            <div style={styles.avatar}>{displayInitials}</div>
            <div>
              <h2 style={styles.profileName}>{displayName}</h2>
              <p style={styles.profileEmail}>{displayEmail}</p>
            </div>
          </div>
          <nav style={styles.navList}>
            {[
              { id: "overview", label: "Overview", icon: Home },
              { id: "orders", label: "Dealer Orders", icon: ShoppingCart },
              { id: "billing", label: "Billing History", icon: FileText },
              { id: "profile", label: "Profile", icon: User },
              { id: "address", label: "Address", icon: MapPin },
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={styles.navButton(activeTab === item.id)}
                >
                  <IconComp size={16} style={{ marginRight: 8 }} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main style={styles.main}>
          {activeTab === "overview" && (
            <>
              <div style={styles.panel}>
                <div style={styles.panelHeader}>
                  <h2>Overview</h2>
                  <p>Quick snapshot of your dealer account.</p>
                </div>
                <div style={styles.overviewCards}>
                  <div style={styles.overviewCard}>
                    <ShieldCheck size={18} />
                    <div>
                      <h3>{orders.length}</h3>
                      <p>Orders Received</p>
                    </div>
                  </div>
                  <div style={styles.overviewCard}>
                    <CreditCard size={18} />
                    <div>
                      <h3>₹{sales.toLocaleString("en-IN")}</h3>
                      <p>Revenue</p>
                    </div>
                  </div>
                  <div style={styles.overviewCard}>
                    <Clock size={18} />
                    <div>
                      <h3>{pending}</h3>
                      <p>Pending Shipments</p>
                    </div>
                  </div>
                </div>
              </div>
              <div style={styles.panel}>
                <div style={styles.panelHeader}>
                  <h2>Recent Orders</h2>
                  <span style={styles.badge}>
                    {loading ? "Loading..." : `${orders.length} orders`}
                  </span>
                </div>
                <div style={styles.ordersTable}>
                  <div style={styles.ordersRow(true)}>
                    <span>Order</span>
                    <span>Status</span>
                    <span>Total</span>
                    <span>Customer</span>
                  </div>
                  {orders.slice(0, 6).map((order) => (
                    <div key={order._id || order.id} style={styles.ordersRow()}>
                      <span>{order.orderNumber || order.id || "-"}</span>
                      <span>{order.status || "Pending"}</span>
                      <span>
                        ₹{(order.totalAmount || 0).toLocaleString("en-IN")}
                      </span>
                      <span>
                        {order.customerName || order.customer?.name || "-"}
                      </span>
                    </div>
                  ))}
                  {!orders.length && (
                    <div style={styles.emptyState}>No orders found yet.</div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === "orders" && (
            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <h2>Dealer Orders</h2>
                <p>Track and manage all current orders.</p>
              </div>
              <div style={styles.ordersTable}>
                <div style={styles.ordersRow(true)}>
                  <span>Order</span>
                  <span>Status</span>
                  <span>Total</span>
                  <span>Date</span>
                </div>
                {orders.map((order) => (
                  <div key={order._id || order.id} style={styles.ordersRow()}>
                    <span>{order.orderNumber || order.id || "-"}</span>
                    <span>{order.status || "Pending"}</span>
                    <span>
                      ₹{(order.totalAmount || 0).toLocaleString("en-IN")}
                    </span>
                    <span>
                      {new Date(
                        order.createdAt || order.createdAt || Date.now(),
                      ).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                ))}
                {!orders.length && (
                  <div style={styles.emptyState}>No orders available.</div>
                )}
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <h2>Billing History</h2>
                <p>Recent invoices and payment records.</p>
              </div>
              <div style={styles.emptyState}>
                Billing history is not connected yet. Add dealer billing
                endpoints to fetch live data.
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <h2>Profile</h2>
                <p>Manage your account and contact details.</p>
              </div>
              <div style={styles.profileGrid}>
                <div style={styles.profileField}>
                  <label>Name</label>
                  <p>{displayName}</p>
                </div>
                <div style={styles.profileField}>
                  <label>Email</label>
                  <p>{displayEmail}</p>
                </div>
                <div style={styles.profileField}>
                  <label>Role</label>
                  <p>Dealer</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "address" && (
            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <h2>Address Book</h2>
                <p>Your primary billing and shipping details.</p>
              </div>
              <div style={styles.emptyState}>
                Add dealer address management in the backend to store your
                address here.
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "24px",
    maxWidth: "1320px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "24px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 800,
    margin: 0,
  },
  subtitle: {
    color: "#475569",
    marginTop: "8px",
  },
  logoutBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 18px",
    borderRadius: "999px",
    border: "none",
    background: "#ef4444",
    color: "#ffffff",
    cursor: "pointer",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "18px",
    marginBottom: "24px",
  },
  statCard: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  statIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "16px",
    background: "#f8fafc",
    display: "grid",
    placeItems: "center",
  },
  statValue: {
    fontSize: "1.4rem",
    fontWeight: 700,
    margin: 0,
  },
  statLabel: {
    color: "#64748b",
    marginTop: "6px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    gap: "24px",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  profileCard: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "22px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "18px",
    background: "#fde68a",
    color: "#92400e",
    display: "grid",
    placeItems: "center",
    fontWeight: 800,
    fontSize: "1.25rem",
  },
  profileName: {
    fontSize: "1rem",
    margin: 0,
  },
  profileEmail: {
    color: "#64748b",
    marginTop: "4px",
    fontSize: "0.9rem",
  },
  navList: {
    display: "grid",
    gap: "10px",
  },
  navButton: (active) => ({
    width: "100%",
    background: active ? "#fef2f2" : "#ffffff",
    border: active ? "1px solid #fecaca" : "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    textAlign: "left",
    color: active ? "#b91c1c" : "#334155",
    fontWeight: active ? 700 : 600,
  }),
  main: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  panel: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "center",
    marginBottom: "20px",
  },
  badge: {
    background: "#eef2ff",
    color: "#1d4ed8",
    padding: "8px 12px",
    borderRadius: "999px",
    fontWeight: 700,
    fontSize: "0.85rem",
  },
  overviewCards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "16px",
  },
  overviewCard: {
    background: "#f8fafc",
    borderRadius: "20px",
    padding: "18px",
    display: "flex",
    gap: "14px",
    alignItems: "center",
  },
  ordersTable: {
    display: "grid",
    gap: "10px",
  },
  ordersRow: (header = false) => ({
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
    gap: "12px",
    alignItems: "center",
    padding: header ? "12px 16px" : "14px 16px",
    borderRadius: "16px",
    background: header ? "#f8fafc" : "#ffffff",
    fontWeight: header ? 700 : 500,
    color: header ? "#334155" : "#475569",
  }),
  emptyState: {
    padding: "30px",
    borderRadius: "20px",
    background: "#f8fafc",
    textAlign: "center",
    color: "#64748b",
  },
  profileGrid: {
    display: "grid",
    gap: "16px",
  },
  profileField: {
    background: "#f8fafc",
    borderRadius: "18px",
    padding: "18px",
  },
};

export default DealerDashboard;
