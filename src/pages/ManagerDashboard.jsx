import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Users, LogOut, Mail, Phone, Clock, ShieldCheck } from "lucide-react";

const API = "/api";

export default function ManagerDashboard() {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn || user?.userType !== "manager") {
      navigate("/");
      return;
    }
    fetchAssignedCustomers();
  }, [isLoggedIn, user, navigate]);

  const fetchAssignedCustomers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/auth/manager/customers`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Unable to load assigned customers");
      }
      const data = await res.json();
      setCustomers(data.data || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load assigned customers.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ minHeight: "100vh", padding: "24px", background: "#f8fafc" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                margin: 0,
                color: "#0f172a",
              }}
            >
              Manager Dashboard
            </h1>
            <p
              style={{ margin: "8px 0 0", color: "#475569", fontSize: "1rem" }}
            >
              Manage customers assigned to you and monitor recent activity.
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "12px 18px",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <Card
            title="Assigned Customers"
            value={customers.length}
            icon={<Users size={20} color="#f59e0b" />}
          />
          <Card
            title="My Name"
            value={user?.name || "Manager"}
            icon={<ShieldCheck size={20} color="#0f172a" />}
          />
          <Card
            title="Email"
            value={user?.email || "—"}
            icon={<Mail size={20} color="#2563eb" />}
          />
          <Card
            title="Last login"
            value={
              user?.loginTime ? new Date(user.loginTime).toLocaleString() : "—"
            }
            icon={<Clock size={20} color="#10b981" />}
          />
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
            overflow: "hidden",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                Assigned Customers
              </h2>
              <p
                style={{
                  margin: "6px 0 0",
                  color: "#64748b",
                  fontSize: "0.95rem",
                }}
              >
                Customers created or assigned under your manager account.
              </p>
            </div>
            {loading && (
              <span style={{ color: "#0f172a", fontWeight: 700 }}>
                Loading…
              </span>
            )}
          </div>

          {error ? (
            <div style={{ padding: "32px", color: "#b91c1c", fontWeight: 600 }}>
              {error}
            </div>
          ) : customers.length === 0 ? (
            <div style={{ padding: "36px", color: "#64748b" }}>
              No customers assigned yet. Check back after your first assignment.
            </div>
          ) : (
            <div style={{ width: "100%", overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "720px",
                }}
              >
                <thead>
                  <tr style={{ textAlign: "left", background: "#f8fafc" }}>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Phone</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr
                      key={customer.id}
                      style={{ borderBottom: "1px solid #e5e7eb" }}
                    >
                      <td style={tdStyle}>
                        {customer.name || customer.email.split("@")[0]}
                      </td>
                      <td style={tdStyle}>{customer.email}</td>
                      <td style={tdStyle}>{customer.phone || "—"}</td>
                      <td style={tdStyle}>
                        {customer.isActive ? "Active" : "Disabled"}
                      </td>
                      <td style={tdStyle}>
                        {customer.createdAt
                          ? new Date(customer.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const Card = ({ title, value, icon }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: "18px",
      border: "1px solid #e5e7eb",
      padding: "20px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      minHeight: "130px",
    }}
  >
    <div
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "16px",
        background: "#fef3c7",
        display: "grid",
        placeItems: "center",
      }}
    >
      {icon}
    </div>
    <div>
      <div
        style={{
          fontSize: "0.85rem",
          fontWeight: 700,
          color: "#475569",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: "6px",
          fontSize: "1.3rem",
          fontWeight: 800,
          color: "#0f172a",
        }}
      >
        {value}
      </div>
    </div>
  </div>
);

const thStyle = {
  padding: "16px 14px",
  color: "#475569",
  fontSize: "0.9rem",
  fontWeight: 700,
};

const tdStyle = {
  padding: "16px 14px",
  color: "#334155",
  fontSize: "0.95rem",
};
