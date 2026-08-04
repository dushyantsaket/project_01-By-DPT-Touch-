const adminSessionVersions = new Map();

export const nextAdminSessionVersion = (adminId) => {
  const key = String(adminId);
  const next = (adminSessionVersions.get(key) || 0) + 1;
  adminSessionVersions.set(key, next);
  return next;
};

export const isActiveAdminSession = (adminId, sessionVersion) => {
  const current = adminSessionVersions.get(String(adminId));
  return !current || Number(sessionVersion) === current;
};
