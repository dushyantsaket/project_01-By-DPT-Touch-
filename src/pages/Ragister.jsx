import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const CustomerLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("customerUsers") || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) {
      setError("Invalid email or password");
      return;
    }
    login({ ...user, userType: "customer" });
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          background: "#fff",
          borderRadius: "24px",
          boxShadow: "0 20px 35px -10px rgba(0,0,0,0.1)",
          padding: "32px",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: "8px",
          }}
        >
          Customer Login
        </h2>
        <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "28px" }}>
          Welcome back
        </p>
        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#b91c1c",
              padding: "12px",
              borderRadius: "10px",
              fontSize: "13px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                fontSize: "12px",
                fontWeight: "600",
                marginBottom: "6px",
                display: "block",
              }}
            >
              Email
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "10px 14px",
              }}
            >
              <Mail size={16} color="#94a3b8" style={{ marginRight: "10px" }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  fontSize: "14px",
                }}
                required
              />
            </div>
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                fontSize: "12px",
                fontWeight: "600",
                marginBottom: "6px",
                display: "block",
              }}
            >
              Password
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "10px 14px",
              }}
            >
              <Lock size={16} color="#94a3b8" style={{ marginRight: "10px" }} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  fontSize: "14px",
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#0f172a",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "12px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "13px",
            color: "#64748b",
          }}
        >
          New user?{" "}
          <Link
            to="/customer-register"
            style={{
              color: "#dc2626",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
