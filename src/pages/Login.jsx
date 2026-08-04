import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { User, Lock, Mail, ChevronRight, ShieldCheck } from "lucide-react";

const API = "/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      login({
        userType: "customer",
        email: data.user.email,
        name: data.user.name,
        id: data.user.id,
        token: data.token,
        loginTime: new Date().toISOString(),
      });
      navigate("/customer-dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="login-card-wrapper"
      >
        <div className="login-card">
          <div className="login-card__header">
            <div className="login-card__icon-box">
              <User size={40} />
            </div>
            <h1 className="login-card__title">Customer Login</h1>
            <p className="login-card__subtitle">Industrial Power Portal</p>
          </div>

          {error && <div className="login-card__error">{error}</div>}

          <form onSubmit={handleLogin} className="login-form">
            <div className="login-form__group">
              <label className="login-form__label">Email Address</label>
              <div className="login-form__input-wrap">
                <Mail className="login-form__input-icon" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-form__input"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="login-form__group">
              <label className="login-form__label">Password</label>
              <div className="login-form__input-wrap">
                <Lock className="login-form__input-icon" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-form__input"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="login-form__submit"
              disabled={loading}
            >
              {loading ? "PLEASE WAIT..." : "LOGIN"}
              <ChevronRight size={20} />
            </button>
          </form>

          <div className="login-card__benefits">
            <div className="login-card__benefits-title">
              <ShieldCheck size={16} />
              <span>Login to unlock:</span>
            </div>
            <ul className="login-card__benefits-list">
              <li>View all product prices</li>
              <li>Add to cart and checkout</li>
              <li>Track orders and warranty</li>
              <li>Dealer-exclusive pricing</li>
            </ul>
          </div>

          <div className="login-card__divider-wrap">
            <div className="login-card__divider-line"></div>
            <span className="login-card__divider-text">
              Authorized Partner?
            </span>
            <div className="login-card__divider-line"></div>
          </div>
          <Link to="/dealer-login" className="login-card__dealer-link">
            Switch to Dealer Login Page
          </Link>

          <Link to="/register" className="login-card__dealer-link">
            Don't have an account? Register Here
          </Link>

          <p className="login-card__encryption">Secure Authentication</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
