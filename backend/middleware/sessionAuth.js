import Session from "../models/Session.js";
import User from "../models/User.js";

export async function requireSession(req, res, next) {
  try {
    if (req.session && req.session.userId) {
      const user = await User.findById(req.session.userId).select("-password");
      if (!user)
        return res.status(401).json({ error: "Session user not found" });
      req.user = user;
      // Update last activity
      await Session.findOneAndUpdate(
        { sessionId: req.session.id },
        { lastActivity: new Date() },
      );
      return next();
    }
    return res.status(401).json({ error: "Not authenticated" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function optionalSession(req, res, next) {
  try {
    if (req.session && req.session.userId) {
      const user = await User.findById(req.session.userId).select("-password");
      if (user) req.user = user;
    }
    return next();
  } catch (err) {
    return next();
  }
}
