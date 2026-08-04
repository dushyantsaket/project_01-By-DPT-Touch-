import React, { useState } from "react";
import "../styles/DealerLogin.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Briefcase, MapPin, FileCheck, User, ChevronRight } from "lucide-react";

const DealerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDealerLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (data.user.role !== "dealer") {
        throw new Error("This account is not authorized as a dealer.");
      }

      login({
        userType: "dealer",
        ...data.user,
        token: data.token,
        loginTime: new Date().toISOString(),
      });
      navigate("/dealer-dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dealer-login-page">
      <div className="dealer-login-card">
        {/* Visual Side */}
        <div className="dealer-visual">
          <div>
            <Briefcase size={48} />
            <h2>Partner Portal</h2>
            <p>
              Join our network of certified industrial tool dealers across
              India.
            </p>
          </div>
          <div className="dealer-footer-text">Est. 1998 • DPT India</div>
        </div>

        {/* Form Side */}
        <div className="dealer-form-panel">
          <div>
            <h3 className="form-title">Dealer Authentication</h3>
            <p className="form-subtitle">Official Registration</p>
          </div>

          {error && <div className="dealer-error-box">{error}</div>}

          <form onSubmit={handleDealerLogin}>
            <div className="dealer-form-grid">
              <div className="dealer-form-group full-width">
                <label>Email Address</label>
                <div className="input-wrap">
                  <User size={15} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dealer@example.com"
                  />
                </div>
              </div>

              <div className="dealer-form-group full-width">
                <label>Password</label>
                <div className="input-wrap">
                  <Briefcase size={15} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="dealer-submit-btn"
              disabled={loading}
            >
              {loading ? "AUTHENTICATING..." : "AUTHORIZE PARTNER"}
              <ChevronRight size={18} />
            </button>

            <div
              className="dealer-links-row"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Link to="/dealer-register">Apply for Dealership</Link>
              <Link to="/login">Normal Customer Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DealerLogin;
