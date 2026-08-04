import React, { useState, useEffect, useCallback } from "react";
import {
  Users,
  User,
  Building2,
  Store,
  Search,
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  Trash2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Shield,
  Plus,
  X,
  Lock,
  FileCheck,
} from "lucide-react";

const API = "/api";

const AdminUsers = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all"); // all, customer, dealer, shopkeeper
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [revoking, setRevoking] = useState(null);

  // Add User Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUserRole, setNewUserRole] = useState("dealer"); // default to dealer
  const [addForm, setAddForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    companyName: "",
    gstNumber: "",
    location: "",
    shopName: "",
  });
  const [addFormError, setAddFormError] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const getHeaders = useCallback(() => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
  }, [token]);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/users`, { headers: getHeaders() });
      const result = await res.json();
      setUsers(Array.isArray(result.data) ? result.data : []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  const loadSessions = useCallback(async () => {
    try {
      const res = await fetch(`${API}/admin/user-sessions`, {
        headers: getHeaders(),
      });
      const result = await res.json();
      setSessions(Array.isArray(result.data) ? result.data : []);
    } catch {
      setSessions([]);
    }
  }, [getHeaders]);

  useEffect(() => {
    loadUsers();
    loadSessions();
  }, [loadUsers, loadSessions]);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`${API}/admin/users/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => String(u._id) !== String(id)));
        setSessions((prev) =>
          prev.filter((session) => String(session.userId) !== String(id)),
        );
      } else {
        alert("Failed to delete user");
      }
    } catch {
      alert("Delete failed");
    } finally {
      setDeleting(null);
    }
  };

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    setAddFormError("");

    // Validate fields
    if (
      !addForm.name.trim() ||
      !addForm.email.trim() ||
      !addForm.password.trim()
    ) {
      setAddFormError("Name, Email and Password are required.");
      return;
    }

    if (newUserRole === "dealer") {
      if (!addForm.companyName.trim() || !addForm.location.trim()) {
        setAddFormError("Company Name and Location are required for Dealers.");
        return;
      }
    }

    if (newUserRole === "shopkeeper") {
      if (!addForm.shopName.trim() || !addForm.location.trim()) {
        setAddFormError("Shop Name and Location are required for Shopkeepers.");
        return;
      }
    }

    setAddLoading(true);
    try {
      let endpoint = `${API}/auth/register`;
      let body = {
        name: addForm.name,
        phone: addForm.phone,
        email: addForm.email.toLowerCase(),
        password: addForm.password,
      };

      if (newUserRole === "dealer") {
        endpoint = `${API}/auth/dealer/register`;
        body = {
          ...body,
          companyName: addForm.companyName,
          gstNumber: addForm.gstNumber,
          location: addForm.location,
        };
      } else if (newUserRole === "shopkeeper") {
        endpoint = `${API}/auth/shopkeeper/register`;
        body = {
          ...body,
          shopName: addForm.shopName,
          location: addForm.location,
        };
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to register user");
      }

      // Reset form and reload users
      setAddForm({
        name: "",
        phone: "",
        email: "",
        password: "",
        companyName: "",
        gstNumber: "",
        location: "",
        shopName: "",
      });
      setShowAddModal(false);
      loadUsers();
      alert("User added successfully!");
    } catch (err) {
      setAddFormError(err.message || "An error occurred");
    } finally {
      setAddLoading(false);
    }
  };

  const filtered = users.filter((u) => {
    const matchTab =
      tab === "all" ||
      u.role === tab ||
      (tab === "shopkeeper" && u.role === "shopkeeper");
    const s = search.toLowerCase();
    const matchSearch =
      !s ||
      u.name?.toLowerCase().includes(s) ||
      u.email?.toLowerCase().includes(s) ||
      (u.phone || "").includes(s);
    return matchTab && matchSearch;
  });

  const getUserSessions = (userId) =>
    sessions.filter((session) => String(session.userId) === String(userId));

  const revokeSession = async (sessionId) => {
    if (!window.confirm("Logout this session?")) return;
    setRevoking(sessionId);
    try {
      const res = await fetch(`${API}/admin/sessions/${sessionId}/revoke`, {
        method: "POST",
        headers: getHeaders(),
      });
      if (res.ok) {
        setSessions((prev) =>
          prev.filter((session) => String(session._id) !== String(sessionId)),
        );
      } else {
        alert("Failed to logout session");
      }
    } catch {
      alert("Failed to logout session");
    } finally {
      setRevoking(null);
    }
  };

  const logoutUserSessions = async (userId) => {
    if (!window.confirm("Logout all active sessions for this user?")) return;
    try {
      const res = await fetch(`${API}/admin/users/${userId}/logout-all`, {
        method: "POST",
        headers: getHeaders(),
      });
      if (res.ok) {
        setSessions((prev) =>
          prev.filter((session) => String(session.userId) !== String(userId)),
        );
      } else {
        alert("Failed to logout user sessions");
      }
    } catch {
      alert("Failed to logout user sessions");
    }
  };

  const counts = {
    all: users.length,
    customer: users.filter((u) => u.role === "customer").length,
    dealer: users.filter((u) => u.role === "dealer").length,
    shopkeeper: users.filter((u) => u.role === "shopkeeper").length,
    users: users.length,
  };

  const getRoleIcon = (type) => {
    if (type === "dealer") return <Building2 size={14} color="#dc2626" />;
    if (type === "shopkeeper") return <Store size={14} color="#10b981" />;
    if (type === "admin") return <Shield size={14} color="#0369a1" />;
    return <User size={14} color="#3b82f6" />;
  };

  const getRoleBadge = (type) => {
    const styles = {
      customer: { bg: "#eff6ff", color: "#1d4ed8", label: "Customer" },
      dealer: { bg: "#fef2f2", color: "#dc2626", label: "Dealer" },
      shopkeeper: { bg: "#ecfdf5", color: "#059669", label: "Shopkeeper" },
      manager: { bg: "#fef7dd", color: "#b45309", label: "Manager" },
      admin: { bg: "#e0f2fe", color: "#0369a1", label: "Admin" },
    };
    const s = styles[type] || styles.customer;
    return (
      <span
        style={{
          background: s.bg,
          color: s.color,
          fontSize: "10px",
          fontWeight: "700",
          padding: "3px 8px",
          borderRadius: "6px",
          textTransform: "uppercase",
        }}
      >
        {s.label}
      </span>
    );
  };

  const formatTime = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const TABS = [
    { id: "all", label: "All Users", icon: Users },
    { id: "customer", label: "Customers", icon: User },
    { id: "dealer", label: "Dealers", icon: Building2 },
    { id: "shopkeeper", label: "Shopkeepers", icon: Store },
    { id: "manager", label: "Managers", icon: Shield },
  ];

  return (
    <div>
      {/* Header */}
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "800",
              color: "#0f172a",
              margin: "0 0 4px",
            }}
          >
            User Management
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Manage all registered users — customers, dealers and shopkeepers
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 18px",
            background: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(220,38,38,0.2)",
          }}
        >
          <Plus size={16} /> Add New User / Dealer
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {TABS.map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "10px",
                border: `1px solid ${isActive ? "#0f172a" : "#e2e8f0"}`,
                background: isActive ? "#0f172a" : "#fff",
                color: isActive ? "#fff" : "#374151",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              <Icon size={14} />
              {t.label}
              <span
                style={{
                  background: isActive ? "rgba(255,255,255,0.2)" : "#f1f5f9",
                  color: isActive ? "#fff" : "#64748b",
                  padding: "1px 6px",
                  borderRadius: "10px",
                  fontSize: "11px",
                  fontWeight: "700",
                }}
              >
                {counts[t.id]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div
        style={{
          position: "relative",
          marginBottom: "20px",
          maxWidth: "400px",
        }}
      >
        <Search
          size={15}
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#94a3b8",
          }}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, phone..."
          style={{
            width: "100%",
            padding: "10px 12px 10px 36px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* List */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              border: "3px solid #e2e8f0",
              borderTop: "3px solid #dc2626",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 12px",
            }}
          />
          Loading users...
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#94a3b8",
          }}
        >
          <Users size={40} color="#e2e8f0" style={{ margin: "0 auto 12px" }} />
          <p style={{ fontSize: "16px", fontWeight: "600" }}>No users found</p>
          <p style={{ fontSize: "13px" }}>
            {search
              ? "Try a different search term"
              : `No ${tab === "all" ? "registered users" : tab + "s"} yet`}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((user) => {
            const isExpanded = expandedId === user._id;
            return (
              <div
                key={user._id}
                style={{
                  background: "#fff",
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                {/* Row */}
                <div
                  style={{
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background:
                        user.role === "dealer"
                          ? "#fef2f2"
                          : user.role === "shopkeeper"
                            ? "#ecfdf5"
                            : user.role === "admin"
                              ? "#e0f2fe"
                              : "#eff6ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {getRoleIcon(user.role)}
                  </div>

                  {/* Main Info */}
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "2px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: "700",
                          color: "#0f172a",
                        }}
                      >
                        {user.name}
                      </span>
                      {getRoleBadge(user.role)}
                    </div>
                    <div
                      style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
                    >
                      <a
                        href={`mailto:${user.email}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                          color: "#3b82f6",
                          textDecoration: "none",
                        }}
                      >
                        <Mail size={11} /> {user.email}
                      </a>
                      {user.phone && (
                        <a
                          href={`tel:${user.phone}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "12px",
                            color: "#10b981",
                            textDecoration: "none",
                          }}
                        >
                          <Phone size={11} /> {user.phone}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Login Time */}
                  <div style={{ textAlign: "right", minWidth: "150px" }}>
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#94a3b8",
                        fontWeight: "600",
                        marginBottom: "2px",
                      }}
                    >
                      LAST LOGIN
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "12px",
                        color: "#374151",
                        fontWeight: "500",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Clock size={12} color="#dc2626" />{" "}
                      {formatTime(user.lastLogin)}
                    </div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#94a3b8",
                        marginTop: "2px",
                      }}
                    >
                      Joined: {formatTime(user.createdAt)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : user._id)
                      }
                      style={{
                        padding: "6px 12px",
                        background: "#f1f5f9",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {isExpanded ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                      {isExpanded ? "Less" : "More"}
                    </button>
                    <a
                      href={`mailto:${user.email}`}
                      style={{
                        padding: "6px 12px",
                        background: "#eff6ff",
                        color: "#1d4ed8",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "600",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Mail size={12} /> Contact
                    </a>
                    {user.phone && (
                      <a
                        href={`tel:${user.phone}`}
                        style={{
                          padding: "6px 12px",
                          background: "#ecfdf5",
                          color: "#059669",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "600",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Phone size={12} /> Call
                      </a>
                    )}
                    <button
                      onClick={() => deleteUser(user._id)}
                      disabled={deleting === user._id}
                      style={{
                        padding: "6px 10px",
                        background: "#fef2f2",
                        color: "#dc2626",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div
                    style={{
                      borderTop: "1px solid #f1f5f9",
                      padding: "16px 20px",
                      background: "#f8fafc",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "12px",
                      }}
                    >
                      <InfoRow
                        icon={Shield}
                        label="User ID"
                        value={user._id || user.id}
                      />
                      <InfoRow
                        icon={Calendar}
                        label="Registered"
                        value={formatTime(user.createdAt)}
                      />
                      {user.role && (
                        <InfoRow icon={Shield} label="Role" value={user.role} />
                      )}
                      {user.location && (
                        <InfoRow
                          icon={MapPin}
                          label="Location"
                          value={user.location}
                        />
                      )}
                      {user.companyName && (
                        <InfoRow
                          icon={Building2}
                          label="Company"
                          value={user.companyName}
                        />
                      )}
                      {user.gstNumber && (
                        <InfoRow
                          icon={ExternalLink}
                          label="GST Number"
                          value={user.gstNumber}
                        />
                      )}
                      {user.shopName && (
                        <InfoRow
                          icon={Store}
                          label="Shop Name"
                          value={user.shopName}
                        />
                      )}
                    </div>
                    <div
                      style={{
                        marginTop: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "700",
                            color: "#475569",
                          }}
                        >
                          Session Controls
                        </div>
                        <div style={{ fontSize: "12px", color: "#64748b" }}>
                          Logout the user from all active sessions.
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => logoutUserSessions(user._id)}
                        style={{
                          padding: "10px 16px",
                          background: "#dc2626",
                          color: "#fff",
                          border: "none",
                          borderRadius: "12px",
                          cursor: "pointer",
                          fontWeight: "700",
                        }}
                      >
                        Logout All Sessions
                      </button>
                    </div>
                    {getUserSessions(user._id).length > 0 && (
                      <div style={{ marginTop: "18px" }}>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "700",
                            color: "#64748b",
                            marginBottom: "8px",
                            textTransform: "uppercase",
                          }}
                        >
                          Active Sessions ({getUserSessions(user._id).length})
                        </div>
                        <div style={{ display: "grid", gap: "10px" }}>
                          {getUserSessions(user._id).map((session) => (
                            <div
                              key={session._id}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                background: "#fff",
                                border: "1px solid #e2e8f0",
                                borderRadius: "12px",
                                padding: "10px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "4px",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    color: "#0f172a",
                                  }}
                                >
                                  {session.browser || "Browser unknown"} ·{" "}
                                  {session.os || "OS unknown"}
                                </span>
                                <span
                                  style={{ fontSize: "11px", color: "#6b7280" }}
                                >
                                  {session.device || "Unknown device"} ·{" "}
                                  {session.ip || "No IP"}
                                </span>
                                <span
                                  style={{ fontSize: "11px", color: "#6b7280" }}
                                >
                                  Last activity:{" "}
                                  {formatTime(session.lastActivity)}
                                </span>
                              </div>
                              <button
                                onClick={() => revokeSession(session._id)}
                                disabled={revoking === session._id}
                                style={{
                                  padding: "7px 12px",
                                  background: "#fef2f2",
                                  color: "#dc2626",
                                  border: "none",
                                  borderRadius: "10px",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                  fontWeight: "700",
                                }}
                              >
                                {revoking === session._id
                                  ? "Revoking..."
                                  : "Logout"}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ─── ADD USER MODAL ─── */}
      {showAddModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(15,23,42,0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "#0f172a",
                padding: "20px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: "800",
                  margin: 0,
                }}
              >
                Register New User / Partner
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#94a3b8",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Body */}
            <form
              onSubmit={handleAddUserSubmit}
              style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {addFormError && (
                <div
                  style={{
                    background: "#fef2f2",
                    border: "1px solid #fca5a5",
                    color: "#b91c1c",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    fontSize: "13px",
                  }}
                >
                  ⚠ {addFormError}
                </div>
              )}

              {/* Role Selection */}
              <div>
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#475569",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Account Type
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[
                    { id: "customer", label: "Customer", color: "#3b82f6" },
                    {
                      id: "dealer",
                      label: "Dealer (Admin Register)",
                      color: "#dc2626",
                    },
                    { id: "shopkeeper", label: "Shopkeeper", color: "#10b981" },
                  ].map((r) => (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => {
                        setNewUserRole(r.id);
                        setAddFormError("");
                      }}
                      style={{
                        flex: 1,
                        padding: "8px 4px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: "700",
                        cursor: "pointer",
                        border: `2px solid ${newUserRole === r.id ? r.color : "#e2e8f0"}`,
                        background:
                          newUserRole === r.id ? `${r.color}10` : "#fff",
                        color: newUserRole === r.id ? r.color : "#64748b",
                      }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "#475569",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Full Name *
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #e2e8f0",
                      borderRadius: "10px",
                      padding: "8px 12px",
                    }}
                  >
                    <User
                      size={15}
                      color="#94a3b8"
                      style={{ marginRight: "8px" }}
                    />
                    <input
                      type="text"
                      value={addForm.name}
                      onChange={(e) =>
                        setAddForm({ ...addForm, name: e.target.value })
                      }
                      placeholder="e.g. Ram"
                      style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        fontSize: "13px",
                      }}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "#475569",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Phone *
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #e2e8f0",
                      borderRadius: "10px",
                      padding: "8px 12px",
                    }}
                  >
                    <Phone
                      size={15}
                      color="#94a3b8"
                      style={{ marginRight: "8px" }}
                    />
                    <input
                      type="tel"
                      value={addForm.phone}
                      onChange={(e) =>
                        setAddForm({ ...addForm, phone: e.target.value })
                      }
                      placeholder="9876543210"
                      style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        fontSize: "13px",
                      }}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email & Password */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "#475569",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Email *
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #e2e8f0",
                      borderRadius: "10px",
                      padding: "8px 12px",
                    }}
                  >
                    <Mail
                      size={15}
                      color="#94a3b8"
                      style={{ marginRight: "8px" }}
                    />
                    <input
                      type="email"
                      value={addForm.email}
                      onChange={(e) =>
                        setAddForm({ ...addForm, email: e.target.value })
                      }
                      placeholder="user@gmail.com"
                      style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        fontSize: "13px",
                      }}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "#475569",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Password *
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #e2e8f0",
                      borderRadius: "10px",
                      padding: "8px 12px",
                    }}
                  >
                    <Lock
                      size={15}
                      color="#94a3b8"
                      style={{ marginRight: "8px" }}
                    />
                    <input
                      type="text"
                      value={addForm.password}
                      onChange={(e) =>
                        setAddForm({ ...addForm, password: e.target.value })
                      }
                      placeholder="password"
                      style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        fontSize: "13px",
                      }}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Dealer-specific fields */}
              {newUserRole === "dealer" && (
                <>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#475569",
                          display: "block",
                          marginBottom: "6px",
                        }}
                      >
                        Company Name *
                      </label>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #e2e8f0",
                          borderRadius: "10px",
                          padding: "8px 12px",
                        }}
                      >
                        <Building2
                          size={15}
                          color="#94a3b8"
                          style={{ marginRight: "8px" }}
                        />
                        <input
                          type="text"
                          value={addForm.companyName}
                          onChange={(e) =>
                            setAddForm({
                              ...addForm,
                              companyName: e.target.value,
                            })
                          }
                          placeholder="Company Name"
                          style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            fontSize: "13px",
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#475569",
                          display: "block",
                          marginBottom: "6px",
                        }}
                      >
                        GST Number
                      </label>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #e2e8f0",
                          borderRadius: "10px",
                          padding: "8px 12px",
                        }}
                      >
                        <FileCheck
                          size={15}
                          color="#94a3b8"
                          style={{ marginRight: "8px" }}
                        />
                        <input
                          type="text"
                          value={addForm.gstNumber}
                          onChange={(e) =>
                            setAddForm({
                              ...addForm,
                              gstNumber: e.target.value.toUpperCase(),
                            })
                          }
                          placeholder="22AAAAA0000A1Z5"
                          style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            fontSize: "13px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "#475569",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Location *
                    </label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #e2e8f0",
                        borderRadius: "10px",
                        padding: "8px 12px",
                      }}
                    >
                      <MapPin
                        size={15}
                        color="#94a3b8"
                        style={{ marginRight: "8px" }}
                      />
                      <input
                        type="text"
                        value={addForm.location}
                        onChange={(e) =>
                          setAddForm({ ...addForm, location: e.target.value })
                        }
                        placeholder="Sidhi, Madhya Pradesh"
                        style={{
                          flex: 1,
                          border: "none",
                          outline: "none",
                          fontSize: "13px",
                        }}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Shopkeeper-specific fields */}
              {newUserRole === "shopkeeper" && (
                <>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#475569",
                          display: "block",
                          marginBottom: "6px",
                        }}
                      >
                        Shop Name *
                      </label>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #e2e8f0",
                          borderRadius: "10px",
                          padding: "8px 12px",
                        }}
                      >
                        <Store
                          size={15}
                          color="#94a3b8"
                          style={{ marginRight: "8px" }}
                        />
                        <input
                          type="text"
                          value={addForm.shopName}
                          onChange={(e) =>
                            setAddForm({ ...addForm, shopName: e.target.value })
                          }
                          placeholder="Shop Name"
                          style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            fontSize: "13px",
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#475569",
                          display: "block",
                          marginBottom: "6px",
                        }}
                      >
                        Location *
                      </label>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #e2e8f0",
                          borderRadius: "10px",
                          padding: "8px 12px",
                        }}
                      >
                        <MapPin
                          size={15}
                          color="#94a3b8"
                          style={{ marginRight: "8px" }}
                        />
                        <input
                          type="text"
                          value={addForm.location}
                          onChange={(e) =>
                            setAddForm({ ...addForm, location: e.target.value })
                          }
                          placeholder="Sidhi, Madhya Pradesh"
                          style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            fontSize: "13px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={addLoading}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: addLoading ? "#94a3b8" : "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "700",
                  cursor: addLoading ? "not-allowed" : "pointer",
                  marginTop: "10px",
                }}
              >
                {addLoading ? "Saving User..." : "Register User / Dealer"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => {
  const Icon = icon;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "8px",
          background: "#fff",
          border: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={13} color="#64748b" />
      </div>
      <div>
        <div
          style={{
            fontSize: "10px",
            fontWeight: "600",
            color: "#94a3b8",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "13px",
            color: "#374151",
            fontWeight: "500",
            wordBreak: "break-all",
          }}
        >
          {value || "—"}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
