export function requireRole(roles = []) {
  return (req, res, next) => {
    const user = req.user || req.currentUser || req.customer;
    if (!user) return res.status(401).json({ error: "Not authenticated" });
    if (!Array.isArray(roles) || roles.length === 0) return next();
    if (roles.includes(user.role) || roles.includes(user?.role?.toLowerCase()))
      return next();
    return res.status(403).json({ error: "Insufficient permissions" });
  };
}

export function preventSelfAction(paramId = "id") {
  return (req, res, next) => {
    const user = req.user || req.currentUser || req.customer;
    if (!user) return res.status(401).json({ error: "Not authenticated" });
    if (
      req.params[paramId] &&
      user._id &&
      req.params[paramId].toString() === user._id.toString()
    ) {
      return res
        .status(400)
        .json({ error: "You cannot perform this action on your own account" });
    }
    return next();
  };
}
