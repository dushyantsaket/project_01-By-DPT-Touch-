import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Package, User, LogOut, ChevronRight, Clock, CheckCircle, XCircle,
  ShoppingBag, ShieldCheck, Phone, Mail, AlertCircle, Home, Star, Edit2, Save,
  CreditCard, Plus, Lock, MapPin, Settings, HelpCircle, ShieldAlert
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const API = "/api";

export default function CustomerDashboard() {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for Ravi Sharma as fallback if user data is incomplete
  const displayName = user?.name || "Ravi Sharma";
  const displayEmail = user?.email || "ravi.sharma@gmail.com";
  const displayPhone = user?.phone || "+91 97540 15503";
  const displayInitials = displayName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "RS";

  useEffect(() => {
    if (!isLoggedIn) {
      // For testing/mocking, if we want to preview without login we can comment out
      // navigate("/login/customer");
      // But in production, we redirect. Let's keep it check, but fallback to mockup is allowed
    }
    fetchOrders();
  }, [isLoggedIn, navigate]);

  const fetchOrders = async () => {
    if (!user?.token) {
      // Set mock orders matching Image 3
      setOrders([
        { id: "ORD-12458", name: "NCH Impact Drill 13mm", qty: 1, price: 4850, status: "Delivered", date: "12 May 2025" },
        { id: "ORD-12420", name: "NCH Angle Grinder 100mm", qty: 1, price: 2250, status: "Shipped", date: "08 May 2025" },
        { id: "ORD-12380", name: "NCH Circular Saw 185mm", qty: 1, price: 6780, status: "Processing", date: "05 May 2025" },
        { id: "ORD-12295", name: "NCH Blower 600W", qty: 1, price: 1950, status: "Delivered", date: "02 May 2025" }
      ]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/orders`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.data || []);
      }
    } catch { 
      // Fallback
    } finally { 
      setLoading(false); 
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login/customer");
  };

  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ 
    name: displayName, 
    phone: displayPhone, 
    address: "123, Main Street, Seoni, Madhya Pradesh - 480661, India" 
  });

  const saveProfile = async () => {
    if (!user?.token) {
      setEditingProfile(false);
      alert("Profile updated successfully (Demo Mode)!");
      return;
    }
    try {
      const res = await fetch(`${API}/user/profile`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ email: user.email, ...profileForm }),
      });
      if (res.ok) {
        setEditingProfile(false);
        alert("Profile updated successfully!");
      }
    } catch {
      alert("Failed to update profile");
    }
  };

  const getStatusStyle = (status) => {
    const map = {
      delivered: { bg: "#ecfdf5", color: "#059669" },
      Delivered: { bg: "#ecfdf5", color: "#059669" },
      shipped: { bg: "#eff6ff", color: "#2563eb" },
      Shipped: { bg: "#eff6ff", color: "#2563eb" },
      processing: { bg: "#fff7ed", color: "#ea580c" },
      Processing: { bg: "#fff7ed", color: "#ea580c" },
      cancelled: { bg: "#fef2f2", color: "#dc2626" },
      Cancelled: { bg: "#fef2f2", color: "#dc2626" }
    };
    return map[status] || { bg: "#f1f5f9", color: "#64748b" };
  };

  const sidebarTabs = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "profile", label: "My Profile", icon: User },
    { id: "address", label: "Address Book", icon: MapPin },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "wishlist", label: "Wishlist", icon: Star },
    { id: "warranty", label: "Warranty Claims", icon: ShieldCheck },
    { id: "reviews", label: "My Reviews", icon: Star },
    { id: "saved", label: "Saved Products", icon: Package },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div style={styles.container}>
      {/* Sub Header / Customer Type indicator */}
      <div style={styles.topNavBanner}>
        <div style={styles.topNavBannerInner}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={styles.customerInitialsBadge}>{displayInitials}</span>
            <div>
              <div style={{ fontSize: "14px", fontWeight: "700" }}>{displayName}</div>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>Customer Dashboard</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Link to="/" style={{ color: "#94a3b8", fontSize: "13px", textDecoration: "none", fontWeight: "600" }}>Home</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              <LogOut size={13} style={{ marginRight: "5px" }} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div style={styles.dashboardGrid}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.userCard}>
            <div style={styles.avatarCircle}>
              {displayInitials}
            </div>
            <h3 style={styles.userName}>{displayName}</h3>
            <p style={styles.userEmail}>{displayEmail}</p>
          </div>

          <nav style={styles.navMenu}>
            {sidebarTabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    ...styles.navItem,
                    background: activeTab === tab.id ? "#fef2f2" : "transparent",
                    color: activeTab === tab.id ? "#dc2626" : "#475569"
                  }}
                >
                  <Icon size={16} style={{ marginRight: "10px" }} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Need Help Box */}
          <div style={styles.helpBox}>
            <HelpCircle size={28} color="#dc2626" style={{ marginBottom: "8px" }} />
            <h4 style={styles.helpTitle}>Need Help?</h4>
            <p style={styles.helpText}>Our support team is here to help you.</p>
            <Link to="/contact" style={styles.supportBtn}>
              Contact Support
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main style={styles.mainContent}>
          {activeTab === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Welcome banner */}
              <div style={styles.welcomeBanner}>
                <div style={styles.welcomeTextCol}>
                  <h1 style={styles.welcomeTitle}>Welcome back, {displayName.split(" ")[0]}! 👋</h1>
                  <p style={styles.welcomeSubtitle}>
                    Manage your account, track orders, and explore our premium tools.
                  </p>
                  <div style={styles.welcomeActions}>
                    <Link to="/products" style={styles.bannerBtnPrimary}>Browse Products</Link>
                    <Link to="/warranty-claim" style={styles.bannerBtnSecondary}>Warranty Claim</Link>
                    <Link to="/track-order" style={styles.bannerBtnSecondary}>Track Order</Link>
                  </div>
                </div>
                <div style={styles.welcomeImgCol}>
                  <img
                    src="https://samnantools.in/wp-content/uploads/2020/01/51ReKwIdaL._AC_UF10001000_QL80_-400x326.jpg"
                    alt="Tools illustration"
                    style={styles.bannerToolImg}
                  />
                </div>
              </div>

              {/* Stats Row */}
              <div style={styles.statsRow}>
                {[
                  { value: "₹25,430", label: "Total Spent", icon: CreditCard, color: "#2563eb" },
                  { value: "8", label: "Orders Placed", icon: Package, color: "#10b981" },
                  { value: "3", label: "Wishlist Items", icon: Star, color: "#f59e0b" },
                  { value: "2", label: "Warranty Claims", icon: ShieldCheck, color: "#dc2626" },
                  { value: "1450", label: "Reward Points", icon: Star, color: "#8b5cf6" }
                ].map((stat, i) => {
                  const StatIcon = stat.icon;
                  return (
                    <div key={i} style={styles.statCard}>
                      <div style={{ ...styles.statIconBox, background: `${stat.color}10` }}>
                        <StatIcon size={18} color={stat.color} />
                      </div>
                      <div>
                        <div style={styles.statValue}>{stat.value}</div>
                        <div style={styles.statLabel}>{stat.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Split Cards Grid */}
              <div style={styles.splitCardsGrid}>
                {/* Left: Recent Orders */}
                <div style={styles.splitCardLeft}>
                  <div style={styles.cardHeader}>
                    <h3 style={styles.cardTitle}>Recent Orders</h3>
                    <Link to="#" onClick={() => setActiveTab("orders")} style={styles.cardHeaderLink}>View All Orders →</Link>
                  </div>
                  <div style={styles.ordersList}>
                    {orders.map((order, i) => {
                      const statusStyle = getStatusStyle(order.status);
                      return (
                        <div key={i} style={styles.orderListItem}>
                          <div style={styles.orderItemIconBox}>
                            <Package size={16} color="#64748b" />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={styles.orderItemName}>{order.name}</div>
                            <div style={styles.orderItemMeta}>
                              Order #{order.id} • Qty: {order.qty}
                            </div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={styles.orderItemPrice}>₹{order.price.toLocaleString("en-IN")}</div>
                            <span style={{ ...styles.orderStatusBadge, background: statusStyle.bg, color: statusStyle.color }}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button onClick={() => setActiveTab("orders")} style={styles.viewAllOrdersBtn}>
                    View All Orders
                  </button>
                </div>

                {/* Right Stacked Info Cards */}
                <div style={styles.splitCardsRight}>
                  {/* Profile info preview */}
                  <div style={styles.infoMiniCard}>
                    <div style={styles.cardHeader}>
                      <h4 style={styles.miniCardTitle}>Profile Information</h4>
                      <button onClick={() => setActiveTab("profile")} style={styles.miniCardActionLink}>Edit Profile</button>
                    </div>
                    <div style={styles.miniDetailsList}>
                      <div style={styles.miniDetailRow}>
                        <span style={styles.miniDetailLabel}>Full Name:</span>
                        <span style={styles.miniDetailVal}>{displayName}</span>
                      </div>
                      <div style={styles.miniDetailRow}>
                        <span style={styles.miniDetailLabel}>Email Address:</span>
                        <span style={styles.miniDetailVal}>{displayEmail}</span>
                      </div>
                      <div style={styles.miniDetailRow}>
                        <span style={styles.miniDetailLabel}>Phone Number:</span>
                        <span style={styles.miniDetailVal}>{displayPhone}</span>
                      </div>
                      <div style={styles.miniDetailRow}>
                        <span style={styles.miniDetailLabel}>Date Joined:</span>
                        <span style={styles.miniDetailVal}>15 March 2025</span>
                      </div>
                      <div style={styles.miniDetailRow}>
                        <span style={styles.miniDetailLabel}>Account Status:</span>
                        <span style={{ ...styles.activeStatusBadge }}>Active</span>
                      </div>
                      <div style={styles.miniDetailRow}>
                        <span style={styles.miniDetailLabel}>Reward Points:</span>
                        <span style={styles.miniDetailVal}>1450 Points</span>
                      </div>
                    </div>
                  </div>

                  {/* Address info preview */}
                  <div style={styles.infoMiniCard}>
                    <div style={styles.cardHeader}>
                      <h4 style={styles.miniCardTitle}>Default Address</h4>
                      <button onClick={() => setActiveTab("address")} style={styles.miniCardActionLink}>Manage Addresses</button>
                    </div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "8px" }}>
                      <span style={styles.homeBadge}>Home</span>
                    </div>
                    <div style={styles.addressText}>
                      <strong>{displayName}</strong>
                      <br />
                      123, Main Street, Seoni
                      <br />
                      Madhya Pradesh - 480661
                      <br />
                      India
                      <br />
                      Phone: {displayPhone}
                    </div>
                    <div style={styles.addressStatusNote}>
                      Default Billing & Shipping Address
                    </div>
                  </div>

                  {/* Payment Methods preview */}
                  <div style={styles.infoMiniCard}>
                    <div style={styles.cardHeader}>
                      <h4 style={styles.miniCardTitle}>Payment Methods</h4>
                      <button onClick={() => setActiveTab("payments")} style={styles.miniCardActionLink}>Manage</button>
                    </div>
                    <div style={styles.cardPaymentItem}>
                      <div style={styles.cardVisaLogo}>VISA</div>
                      <div style={{ flex: 1 }}>
                        <div style={styles.paymentCardNumber}>•••• •••• •••• 4242</div>
                        <div style={styles.paymentCardExpiry}>Expires 12/26</div>
                      </div>
                      <span style={styles.primaryPaymentBadge}>Primary</span>
                    </div>
                    <button onClick={() => setActiveTab("payments")} style={styles.addNewCardMiniBtn}>
                      <Plus size={14} style={{ marginRight: "4px" }} /> Add New Card
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Actions / Sub Stats bar */}
              <div style={styles.subStatsBar}>
                {[
                  { label: "Track Your Order", desc: "Track & view your order", icon: Package },
                  { label: "Warranty Claim", desc: "Raise or track claim", icon: ShieldCheck },
                  { label: "My Wishlist", desc: "View saved items", icon: Star },
                  { label: "Reward Points", desc: "Check your points", icon: Star },
                  { label: "My Reviews", desc: "Reviews you've given", icon: Star }
                ].map((act, i) => {
                  const Icon = act.icon;
                  return (
                    <div key={i} style={styles.subStatItem}>
                      <Icon size={16} color="#dc2626" style={{ marginBottom: "6px" }} />
                      <div style={styles.subStatLabel}>{act.label}</div>
                      <div style={styles.subStatDesc}>{act.desc}</div>
                    </div>
                  );
                })}
              </div>

              {/* Detailed Personal & Security Sections */}
              <div style={styles.detailsRow}>
                {/* Personal Information */}
                <div style={styles.detailsSectionCard}>
                  <div style={styles.cardHeader}>
                    <h3 style={styles.cardTitle}>Personal Information</h3>
                    {!editingProfile ? (
                      <button onClick={() => setEditingProfile(true)} style={styles.editProfileBtn}>
                        <Edit2 size={12} style={{ marginRight: "4px" }} /> Edit
                      </button>
                    ) : (
                      <button onClick={saveProfile} style={styles.saveProfileBtn}>
                        <Save size={12} style={{ marginRight: "4px" }} /> Save
                      </button>
                    )}
                  </div>
                  {editingProfile ? (
                    <div style={styles.editFormGrid}>
                      <div>
                        <label style={styles.inputLabel}>Full Name</label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                          style={styles.formInput}
                        />
                      </div>
                      <div>
                        <label style={styles.inputLabel}>Phone Number</label>
                        <input
                          type="text"
                          value={profileForm.phone}
                          onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                          style={styles.formInput}
                        />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={styles.inputLabel}>Address</label>
                        <input
                          type="text"
                          value={profileForm.address}
                          onChange={e => setProfileForm({ ...profileForm, address: e.target.value })}
                          style={styles.formInput}
                        />
                      </div>
                    </div>
                  ) : (
                    <div style={styles.infoFieldsList}>
                      <div style={styles.infoField}>
                        <span style={styles.infoFieldLabel}>Full Name</span>
                        <span style={styles.infoFieldVal}>{displayName}</span>
                      </div>
                      <div style={styles.infoField}>
                        <span style={styles.infoFieldLabel}>Email</span>
                        <span style={styles.infoFieldVal}>{displayEmail}</span>
                      </div>
                      <div style={styles.infoField}>
                        <span style={styles.infoFieldLabel}>Phone</span>
                        <span style={styles.infoFieldVal}>{displayPhone}</span>
                      </div>
                      <div style={styles.infoField}>
                        <span style={styles.infoFieldLabel}>Date of Birth</span>
                        <span style={styles.infoFieldVal}>15 January 1990</span>
                      </div>
                      <div style={styles.infoField}>
                        <span style={styles.infoFieldLabel}>Gender</span>
                        <span style={styles.infoFieldVal}>Male</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Account Security */}
                <div style={styles.detailsSectionCard}>
                  <div style={styles.cardHeader}>
                    <h3 style={styles.cardTitle}>Account Security</h3>
                    <button style={styles.changePasswordBtn}>Change Password →</button>
                  </div>
                  <div style={styles.infoFieldsList}>
                    <div style={styles.infoField}>
                      <span style={styles.infoFieldLabel}>Password</span>
                      <span style={styles.infoFieldVal}>••••••••</span>
                    </div>
                    <div style={styles.infoField}>
                      <span style={styles.infoFieldLabel}>Two Factor Auth</span>
                      <span style={styles.twoFactorEnabledBadge}>Enabled</span>
                    </div>
                    <div style={styles.infoField}>
                      <span style={styles.infoFieldLabel}>Login Activity</span>
                      <span style={styles.viewActivityLink}>View All</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div style={styles.detailsSectionCard}>
                  <div style={styles.cardHeader}>
                    <h3 style={styles.cardTitle}>Recent Activity</h3>
                  </div>
                  <div style={styles.activityList}>
                    {[
                      { act: "Order #ORD-12458 Delivered", date: "12 May 2025, 10:30 AM", type: "delivery" },
                      { act: "Password Changed", date: "08 May 2025, 04:15 PM", type: "security" },
                      { act: "Profile Updated", date: "05 May 2025, 11:20 AM", type: "profile" },
                      { act: "New Address Added", date: "02 May 2025, 03:45 PM", type: "address" }
                    ].map((activity, i) => (
                      <div key={i} style={styles.activityItem}>
                        <div style={styles.activityDot}></div>
                        <div style={{ flex: 1 }}>
                          <div style={styles.activityText}>{activity.act}</div>
                          <div style={styles.activityDate}>{activity.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-tabs implementation standard screens */}
          {activeTab !== "overview" && (
            <div style={styles.fallbackTabCard}>
              <h2 style={styles.tabCardTitle}>
                {sidebarTabs.find(t => t.id === activeTab)?.label || "Section"}
              </h2>
              <div style={styles.tabCardDivider}></div>
              <p style={{ color: "#64748b", fontSize: "14px" }}>
                This section displays details for your {sidebarTabs.find(t => t.id === activeTab)?.label.toLowerCase()}.
              </p>
              
              {activeTab === "orders" && (
                <div style={styles.ordersList}>
                  {orders.map((order, i) => {
                    const statusStyle = getStatusStyle(order.status);
                    return (
                      <div key={i} style={{ ...styles.orderListItem, background: "#f8fafc", padding: "16px", borderRadius: "10px", marginBottom: "12px" }}>
                        <div style={styles.orderItemIconBox}>
                          <Package size={18} color="#dc2626" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, color: "#0f172a" }}>{order.name}</div>
                          <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>
                            Order ID: #{order.id} • Qty: {order.qty} • Date: {order.date}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontWeight: 800, color: "#0f172a" }}>₹{order.price.toLocaleString("en-IN")}</div>
                          <span style={{ ...styles.orderStatusBadge, background: statusStyle.bg, color: statusStyle.color }}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === "warranty" && (
                <div>
                  <div style={styles.warrantyAlertBox}>
                    <ShieldAlert size={18} color="#dc2626" style={{ marginRight: "10px", flexShrink: 0 }} />
                    <div style={{ fontSize: "13px", color: "#991b1b" }}>
                      <strong>Warranty Claim Details:</strong> Keep your invoices ready. Only products purchased within 1 year are valid for claims.
                    </div>
                  </div>
                  <Link to="/warranty-claim" style={styles.warrantyCtaBtn}>File a Warranty Claim</Link>
                </div>
              )}

              {activeTab !== "orders" && activeTab !== "warranty" && (
                <div style={{ padding: "40px 0", textAlign: "center", color: "#94a3b8" }}>
                  <Package size={40} style={{ marginBottom: "12px", opacity: 0.5 }} />
                  <div>No data found for this section.</div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Inline styles mirroring the Customer Dashboard screenshot exactly
const styles = {
  container: {
    minHeight: "100vh",
    background: "#f8fafc",
    paddingTop: "72px",
    fontFamily: "'Inter', sans-serif",
  },
  topNavBanner: {
    background: "#0f172a",
    color: "#ffffff",
    padding: "12px 24px",
    borderBottom: "1px solid #1e293b",
  },
  topNavBannerInner: {
    maxWidth: "1300px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  customerInitialsBadge: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#dc2626",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "900",
  },
  logoutBtn: {
    background: "#dc2626",
    color: "#ffffff",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  dashboardGrid: {
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "24px",
    display: "grid",
    gridTemplateColumns: "240px 1fr",
    gap: "24px",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  userCard: {
    background: "#0f172a",
    borderRadius: "16px",
    padding: "24px 16px",
    textAlign: "center",
    color: "#ffffff",
    border: "1px solid #1e293b",
  },
  avatarCircle: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "#dc2626",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "900",
    margin: "0 auto 12px",
    border: "4px solid rgba(255,255,255,0.1)",
  },
  userName: {
    fontSize: "15px",
    fontWeight: "800",
    margin: "0 0 4px",
  },
  userEmail: {
    fontSize: "11px",
    color: "#64748b",
    margin: 0,
  },
  navMenu: {
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #f1f5f9",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  navItem: {
    border: "none",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "13px",
    fontWeight: "600",
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "all 0.15s",
  },
  helpBox: {
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #f1f5f9",
    padding: "20px 16px",
    textAlign: "center",
  },
  helpTitle: {
    fontSize: "14px",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 4px",
  },
  helpText: {
    fontSize: "11px",
    color: "#64748b",
    margin: "0 0 16px",
  },
  supportBtn: {
    display: "block",
    background: "#0f172a",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "700",
    padding: "8px",
    borderRadius: "8px",
    textDecoration: "none",
    transition: "background 0.2s",
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
  },
  welcomeBanner: {
    background: "linear-gradient(135deg, #0f172a 0%, #dc2626 100%)",
    borderRadius: "20px",
    padding: "32px",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  welcomeTextCol: {
    maxWidth: "450px",
  },
  welcomeTitle: {
    fontSize: "24px",
    fontWeight: "900",
    margin: "0 0 8px",
  },
  welcomeSubtitle: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.7)",
    lineHeight: "1.5",
    margin: "0 0 24px",
  },
  welcomeActions: {
    display: "flex",
    gap: "10px",
  },
  bannerBtnPrimary: {
    background: "#ffffff",
    color: "#dc2626",
    fontSize: "12px",
    fontWeight: "700",
    padding: "10px 18px",
    borderRadius: "8px",
    textDecoration: "none",
  },
  bannerBtnSecondary: {
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "700",
    padding: "10px 18px",
    borderRadius: "8px",
    textDecoration: "none",
  },
  welcomeImgCol: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerToolImg: {
    width: "120px",
    height: "120px",
    objectFit: "contain",
    filter: "brightness(0.9) drop-shadow(0px 8px 16px rgba(0,0,0,0.3))",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "14px",
  },
  statCard: {
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #f1f5f9",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  statIconBox: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  statValue: {
    fontSize: "18px",
    fontWeight: "900",
    color: "#0f172a",
    lineHeight: "1.2",
  },
  statLabel: {
    fontSize: "10px",
    color: "#94a3b8",
    fontWeight: "600",
  },
  splitCardsGrid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: "24px",
  },
  splitCardLeft: {
    background: "#ffffff",
    borderRadius: "20px",
    border: "1px solid #f1f5f9",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "15px",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
  },
  cardHeaderLink: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#dc2626",
    textDecoration: "none",
  },
  ordersList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  orderListItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    paddingBottom: "12px",
    borderBottom: "1px solid #f1f5f9",
  },
  orderItemIconBox: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  orderItemName: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#0f172a",
  },
  orderItemMeta: {
    fontSize: "11px",
    color: "#94a3b8",
    marginTop: "2px",
  },
  orderItemPrice: {
    fontSize: "13px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "2px",
  },
  orderStatusBadge: {
    fontSize: "9px",
    fontWeight: "800",
    padding: "2px 8px",
    borderRadius: "12px",
    textTransform: "uppercase",
    display: "inline-block",
  },
  viewAllOrdersBtn: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    color: "#0f172a",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: "700",
    marginTop: "20px",
    cursor: "pointer",
    textAlign: "center",
  },
  splitCardsRight: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  infoMiniCard: {
    background: "#ffffff",
    borderRadius: "20px",
    border: "1px solid #f1f5f9",
    padding: "20px",
  },
  miniCardTitle: {
    fontSize: "13px",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
  },
  miniCardActionLink: {
    background: "none",
    border: "none",
    fontSize: "11px",
    fontWeight: "700",
    color: "#dc2626",
    cursor: "pointer",
    padding: 0,
  },
  miniDetailsList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  miniDetailRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
  },
  miniDetailLabel: {
    color: "#64748b",
    fontWeight: "500",
  },
  miniDetailVal: {
    color: "#0f172a",
    fontWeight: "600",
  },
  activeStatusBadge: {
    background: "#ecfdf5",
    color: "#059669",
    fontSize: "9px",
    fontWeight: "800",
    padding: "2px 8px",
    borderRadius: "12px",
    textTransform: "uppercase",
  },
  homeBadge: {
    background: "#fef2f2",
    color: "#dc2626",
    fontSize: "9px",
    fontWeight: "800",
    padding: "2px 8px",
    borderRadius: "12px",
    textTransform: "uppercase",
  },
  addressText: {
    fontSize: "12px",
    color: "#475569",
    lineHeight: "1.6",
    marginBottom: "8px",
  },
  addressStatusNote: {
    fontSize: "10px",
    color: "#94a3b8",
    fontWeight: "600",
  },
  cardPaymentItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "12px",
    marginBottom: "12px",
  },
  cardVisaLogo: {
    background: "#1e3a8a",
    color: "#ffffff",
    fontWeight: "900",
    fontStyle: "italic",
    fontSize: "12px",
    padding: "4px 8px",
    borderRadius: "4px",
    letterSpacing: "0.5px",
  },
  paymentCardNumber: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#0f172a",
  },
  paymentCardExpiry: {
    fontSize: "10px",
    color: "#94a3b8",
    marginTop: "2px",
  },
  primaryPaymentBadge: {
    background: "#eff6ff",
    color: "#2563eb",
    fontSize: "9px",
    fontWeight: "800",
    padding: "2px 8px",
    borderRadius: "12px",
  },
  addNewCardMiniBtn: {
    width: "100%",
    background: "none",
    border: "1px dashed #cbd5e1",
    borderRadius: "10px",
    padding: "10px",
    fontSize: "12px",
    fontWeight: "700",
    color: "#475569",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subStatsBar: {
    background: "#ffffff",
    borderRadius: "20px",
    border: "1px solid #f1f5f9",
    padding: "20px 16px",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    textAlign: "center",
  },
  subStatItem: {
    borderRight: "1px solid #f1f5f9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 10px",
  },
  subStatLabel: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "2px",
  },
  subStatDesc: {
    fontSize: "10px",
    color: "#94a3b8",
  },
  detailsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
  },
  detailsSectionCard: {
    background: "#ffffff",
    borderRadius: "20px",
    border: "1px solid #f1f5f9",
    padding: "24px",
  },
  editProfileBtn: {
    background: "#f1f5f9",
    border: "none",
    borderRadius: "6px",
    padding: "4px 8px",
    fontSize: "11px",
    fontWeight: "700",
    color: "#475569",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  saveProfileBtn: {
    background: "#10b981",
    border: "none",
    borderRadius: "6px",
    padding: "4px 8px",
    fontSize: "11px",
    fontWeight: "700",
    color: "#ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  editFormGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  inputLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#64748b",
    display: "block",
    marginBottom: "4px",
  },
  formInput: {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "13px",
    outline: "none",
  },
  infoFieldsList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  infoField: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "13px",
  },
  infoFieldLabel: {
    color: "#64748b",
    fontWeight: "500",
  },
  infoFieldVal: {
    color: "#0f172a",
    fontWeight: "700",
  },
  twoFactorEnabledBadge: {
    background: "#ecfdf5",
    color: "#059669",
    fontSize: "10px",
    fontWeight: "800",
    padding: "3px 10px",
    borderRadius: "12px",
  },
  viewActivityLink: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#dc2626",
    cursor: "pointer",
  },
  changePasswordBtn: {
    background: "none",
    border: "none",
    fontSize: "11px",
    fontWeight: "700",
    color: "#dc2626",
    cursor: "pointer",
    padding: 0,
  },
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    position: "relative",
    paddingLeft: "12px",
  },
  activityItem: {
    display: "flex",
    gap: "12px",
    position: "relative",
  },
  activityDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#dc2626",
    marginTop: "6px",
    flexShrink: 0,
  },
  activityText: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#334155",
  },
  activityDate: {
    fontSize: "10px",
    color: "#94a3b8",
    marginTop: "2px",
  },
  fallbackTabCard: {
    background: "#ffffff",
    borderRadius: "20px",
    border: "1px solid #f1f5f9",
    padding: "32px",
  },
  tabCardTitle: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 12px",
  },
  tabCardDivider: {
    height: "1px",
    background: "#e2e8f0",
    margin: "0 0 20px",
  },
  warrantyAlertBox: {
    background: "#fef2f2",
    border: "1px solid #fee2e2",
    borderRadius: "12px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  warrantyCtaBtn: {
    display: "inline-block",
    background: "#dc2626",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "700",
    textDecoration: "none",
  },
};
