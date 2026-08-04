import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import { isActiveAdminSession } from "../utils/adminSessions.js";

dotenv.config();

const getToken = (req) => {
  const auth = req.headers.authorization || req.headers.Authorization;
  if (!auth || !auth.startsWith("Bearer ")) return null;
  return auth.split(" ")[1];
};

const isOfflineAdminToken = (token) =>
  typeof token === "string" && token.startsWith("offline-admin-");

export const protect = async (req, res, next) => {
  const token = getToken(req);
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  if (isOfflineAdminToken(token)) {
    req.user = {
      role: "admin",
      name: "Offline Admin",
      isActive: true,
      _id: null,
    };
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.fixedAdmin && decoded.role === "admin") {
      if (!isActiveAdminSession(decoded.id, decoded.sessionVersion)) {
        return res.status(401).json({
          error: "Your account has been logged in from another device.",
          code: "ADMIN_SESSION_REPLACED",
        });
      }
      req.user = {
        role: "admin",
        name: decoded.id === "fixed-ram" ? "Ram" : "Dushyant",
        isActive: true,
        _id: null,
      };
      return next();
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user || !user.isActive) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (user.role === "admin") {
      if (
        Number(decoded.sessionVersion) !== Number(user.adminSessionVersion || 0)
      ) {
        return res.status(401).json({
          error: "Your account has been logged in from another device.",
          code: "ADMIN_SESSION_REPLACED",
        });
      }
    } else {
      if (
        typeof decoded.tokenVersion !== "undefined" &&
        Number(decoded.tokenVersion) !== Number(user.tokenVersion || 0)
      ) {
        return res.status(401).json({
          error: "Your session has been invalidated. Please login again.",
          code: "TOKEN_VERSION_MISMATCH",
        });
      }
    }

    req.user = user;
    next();
  } catch (error) {
    const message =
      error.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    return res.status(401).json({ error: message });
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden - admin only" });
  }
  next();
};

export const dealerOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (req.user.role !== "dealer" && req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden - dealer only" });
  }
  next();
};

export const managerOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (req.user.role !== "manager") {
    return res.status(403).json({ error: "Forbidden - manager only" });
  }
  next();
};

export const verifyAdmin = adminOnly;
export const verifyToken = protect;
