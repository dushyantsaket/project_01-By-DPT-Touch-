import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Calendar,
  Wrench,
  Image as ImageIcon,
  FileText,
  RefreshCw,
} from "lucide-react";

const API = "/api";

const STATUS_CONFIG = {
  pending: { color: "#f59e0b", bg: "#fffbeb", label: "Pending", icon: Clock },
  approved: {
    color: "#10b981",
    bg: "#ecfdf5",
    label: "Approved",
    icon: CheckCircle,
  },
  rejected: {
    color: "#ef4444",
    bg: "#fef2f2",
    label: "Rejected",
    icon: XCircle,
  },
  resolved: {
    color: "#8b5cf6",
    bg: "#f5f3ff",
    label: "Resolved",
    icon: CheckCircle,
  },
  completed: {
    color: "#2563eb",
    bg: "#eff6ff",
    label: "Completed",
    icon: CheckCircle,
  },
};

const normalizeStatus = (value) => {
  const raw = String(value || "Pending")
    .trim()
    .toLowerCase();
  if (raw === "approved" || raw === "approve") return "approved";
  if (raw === "rejected" || raw === "reject") return "rejected";
  if (raw === "resolved") return "resolved";
  if (raw === "completed") return "completed";
  return "pending";
};

const getClaimId = (claim) =>
  claim?._id || claim?.id || claim?.claimId || claim?.claimID;

const getPhotoSources = (claim) => {
  const sources = [];

  if (Array.isArray(claim?.photos?.problem)) {
    claim.photos.problem.forEach((photo) => {
      if (photo?.dataUrl) sources.push(photo.dataUrl);
      else if (typeof photo === "string") sources.push(photo);
    });
  }

  ["warranty", "invoice", "serial"].forEach((key) => {
    const photo = claim?.photos?.[key];
    if (photo?.dataUrl) sources.push(photo.dataUrl);
    else if (typeof photo === "string") sources.push(photo);
  });

  return sources.filter(Boolean);
};

const AdminWarranty = ({ token }) => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [updating, setUpdating] = useState(null);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/warranty`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const raw = await res.json();
      const arr = Array.isArray(raw)
        ? raw
        : Array.isArray(raw.data)
          ? raw.data
          : [];
      setClaims(arr);
    } catch {
      setClaims([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (claim, status) => {
    const claimId = getClaimId(claim);
    if (!claimId) return;

    setUpdating(`${claimId}-${status}`);
    try {
      const payload = {
        status,
        adminNotes: notes[claimId] ?? claim.adminNotes ?? claim.adminNote ?? "",
      };
      const res = await fetch(`${API}/admin/warranty/${claimId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const updated = await res.json().catch(() => null);
      if (res.ok && updated) {
        setClaims((prev) =>
          prev.map((item) => {
            const itemId = getClaimId(item);
            return itemId === claimId
              ? {
                  ...item,
                  status: updated.status || status,
                  adminNotes:
                    updated.adminNotes ||
                    updated.adminNote ||
                    item.adminNotes ||
                    item.adminNote,
                }
              : item;
          }),
        );
      }
    } catch {
      alert("Update failed");
    } finally {
      setUpdating(null);
    }
  };

  const deleteClaim = async (claim) => {
    const claimId = getClaimId(claim);
    if (!claimId) return;
    if (!window.confirm("Are you sure you want to delete this warranty claim?"))
      return;

    setUpdating(`${claimId}-delete`);
    try {
      const res = await fetch(`${API}/admin/warranty/${claimId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json().catch(() => null);
      if (res.ok) {
        setClaims((prev) =>
          prev.filter((item) => getClaimId(item) !== claimId),
        );
        if (expanded === claimId) setExpanded(null);
      } else {
        alert(result?.error || "Failed to delete claim");
      }
    } catch {
      alert("Delete failed");
    } finally {
      setUpdating(null);
    }
  };

  const fmt = (iso) =>
    iso
      ? new Date(iso).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

  const counts = {
    all: claims.length,
    pending: claims.filter(
      (claim) => normalizeStatus(claim.status) === "pending",
    ).length,
    approved: claims.filter(
      (claim) => normalizeStatus(claim.status) === "approved",
    ).length,
    rejected: claims.filter(
      (claim) => normalizeStatus(claim.status) === "rejected",
    ).length,
  };

  const filtered = claims.filter((claim) => {
    const normalizedStatus = normalizeStatus(claim.status);
    if (tab !== "all" && normalizedStatus !== tab) return false;
    const query = String(search || "")
      .trim()
      .toLowerCase();
    if (!query) return true;

    const fields = [
      claim.customerName,
      claim.name,
      claim.customerEmail,
      claim.email,
      claim.contactPhone,
      claim.phone,
      claim.modelNo,
      claim.machineModel,
      claim.model,
      claim.invoiceNo,
      claim.description,
      claim.status,
      claim.claimId,
      ...(Array.isArray(claim.reasons) ? claim.reasons : []),
    ];

    return fields.some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(query),
    );
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
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
            Warranty Claims
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Review and manage customer warranty requests
          </p>
        </div>
        <button
          onClick={load}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            background: "#f1f5f9",
            border: "none",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {[
          { id: "all", label: "All Claims" },
          { id: "pending", label: "Pending" },
          { id: "approved", label: "Approved" },
          { id: "rejected", label: "Rejected" },
        ].map((tabItem) => {
          const cfg = STATUS_CONFIG[tabItem.id] || {};
          const active = tab === tabItem.id;
          return (
            <button
              key={tabItem.id}
              onClick={() => setTab(tabItem.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "10px",
                border: `1px solid ${active ? "#0f172a" : "#e2e8f0"}`,
                background: active ? "#0f172a" : "#fff",
                color: active ? "#fff" : "#374151",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {tabItem.label}
              <span
                style={{
                  background: active
                    ? "rgba(255,255,255,0.2)"
                    : cfg.bg || "#f1f5f9",
                  color: active ? "#fff" : cfg.color || "#64748b",
                  padding: "1px 6px",
                  borderRadius: "10px",
                  fontSize: "11px",
                  fontWeight: "700",
                }}
              >
                {counts[tabItem.id]}
              </span>
            </button>
          );
        })}
      </div>

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
          placeholder="Search by name, email, model..."
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

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              border: "3px solid #e2e8f0",
              borderTop: "3px solid #f59e0b",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 12px",
            }}
          />
          Loading warranty claims...
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
          <ShieldCheck
            size={40}
            color="#e2e8f0"
            style={{ margin: "0 auto 12px" }}
          />
          <p style={{ fontWeight: "600", fontSize: "16px" }}>
            No warranty claims found
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((claim) => {
            const claimId = getClaimId(claim);
            const normalizedStatus = normalizeStatus(claim.status);
            const cfg =
              STATUS_CONFIG[normalizedStatus] || STATUS_CONFIG.pending;
            const StatusIcon = cfg.icon;
            const isOpen = expanded === claimId;
            const images = getPhotoSources(claim);
            const customerName = claim.customerName || claim.name || "Unknown";
            const customerEmail = claim.customerEmail || claim.email || "";
            const customerPhone = claim.contactPhone || claim.phone || "";
            const machineModel =
              claim.modelNo || claim.machineModel || claim.model || "—";
            const purchaseDate = claim.purchaseDate || claim.purchase || "";
            const problemDescription =
              claim.description || claim.problem || claim.mainIssue || "";
            const reasons = claim.reasons || [];
            const currentNote =
              notes[claimId] ?? claim.adminNotes ?? claim.adminNote ?? "";

            return (
              <div
                key={claimId}
                style={{
                  background: "#fff",
                  borderRadius: "14px",
                  border: `1px solid ${isOpen ? "#e2e8f0" : "#f1f5f9"}`,
                  overflow: "hidden",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    flexWrap: "wrap",
                    cursor: "pointer",
                  }}
                  onClick={() => setExpanded(isOpen ? null : claimId)}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: cfg.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <StatusIcon size={20} color={cfg.color} />
                  </div>

                  <div style={{ flex: 1, minWidth: "180px" }}>
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
                        {customerName}
                      </span>
                      <span
                        style={{
                          background: cfg.bg,
                          color: cfg.color,
                          fontSize: "10px",
                          fontWeight: "700",
                          padding: "2px 8px",
                          borderRadius: "6px",
                          textTransform: "uppercase",
                        }}
                      >
                        {cfg.label}
                      </span>
                    </div>
                    <div
                      style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                    >
                      {customerEmail && (
                        <span style={{ fontSize: "12px", color: "#3b82f6" }}>
                          {customerEmail}
                        </span>
                      )}
                      {customerPhone && (
                        <span style={{ fontSize: "12px", color: "#10b981" }}>
                          {customerPhone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#94a3b8",
                        fontWeight: "600",
                        marginBottom: "2px",
                      }}
                    >
                      MODEL / SERIAL
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: "700",
                        color: "#374151",
                      }}
                    >
                      {machineModel}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#94a3b8",
                        fontWeight: "600",
                        marginBottom: "2px",
                      }}
                    >
                      SUBMITTED
                    </div>
                    <div style={{ fontSize: "12px", color: "#374151" }}>
                      {fmt(claim.createdAt)}
                    </div>
                    {images.length > 0 && (
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#f59e0b",
                          marginTop: "2px",
                        }}
                      >
                        {images.length} photo{images.length > 1 ? "s" : ""}
                      </div>
                    )}
                  </div>

                  <div style={{ color: "#9ca3af" }}>
                    {isOpen ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </div>
                </div>

                {isOpen && (
                  <div
                    style={{
                      borderTop: "1px solid #f1f5f9",
                      padding: "20px",
                      background: "#f8fafc",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "12px",
                        marginBottom: "20px",
                      }}
                    >
                      {[
                        { icon: Mail, label: "Email", value: customerEmail },
                        { icon: Phone, label: "Phone", value: customerPhone },
                        {
                          icon: Wrench,
                          label: "Model / Serial",
                          value: machineModel,
                        },
                        {
                          icon: Calendar,
                          label: "Purchase Date",
                          value: purchaseDate,
                        },
                        {
                          icon: FileText,
                          label: "Claim ID",
                          value: claim.claimId || claimId,
                        },
                        {
                          icon: Calendar,
                          label: "Submitted On",
                          value: fmt(claim.createdAt),
                        },
                      ]
                        .filter((entry) => entry.value)
                        .map(({ icon: Icon, label, value }) => (
                          <div
                            key={label}
                            style={{
                              display: "flex",
                              gap: "8px",
                              alignItems: "flex-start",
                            }}
                          >
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
                                {value}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    {problemDescription && (
                      <div
                        style={{
                          background: "#fff",
                          borderRadius: "10px",
                          padding: "14px",
                          border: "1px solid #e2e8f0",
                          marginBottom: "16px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "700",
                            color: "#94a3b8",
                            textTransform: "uppercase",
                            marginBottom: "6px",
                          }}
                        >
                          Issue Details
                        </div>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "#374151",
                            lineHeight: "1.6",
                            margin: 0,
                          }}
                        >
                          {problemDescription}
                        </p>
                      </div>
                    )}

                    {reasons.length > 0 && (
                      <div
                        style={{
                          background: "#fff",
                          borderRadius: "10px",
                          padding: "14px",
                          border: "1px solid #e2e8f0",
                          marginBottom: "16px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "700",
                            color: "#94a3b8",
                            textTransform: "uppercase",
                            marginBottom: "6px",
                          }}
                        >
                          Possible Reasons
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                          }}
                        >
                          {reasons.map((reason) => (
                            <span
                              key={reason}
                              style={{
                                background: "#f8fafc",
                                color: "#334155",
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "12px",
                              }}
                            >
                              {reason}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {images.length > 0 && (
                      <div style={{ marginBottom: "20px" }}>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "700",
                            color: "#94a3b8",
                            textTransform: "uppercase",
                            marginBottom: "10px",
                          }}
                        >
                          <ImageIcon
                            size={13}
                            style={{ display: "inline", marginRight: "4px" }}
                          />{" "}
                          Uploaded Photos ({images.length})
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                          }}
                        >
                          {images.map((img, index) => (
                            <div
                              key={`${claimId}-${index}`}
                              onClick={() => setLightboxImg(img)}
                              style={{
                                width: "90px",
                                height: "90px",
                                borderRadius: "10px",
                                overflow: "hidden",
                                border: "2px solid #e2e8f0",
                                cursor: "zoom-in",
                                background: "#f1f5f9",
                                flexShrink: 0,
                              }}
                            >
                              <img
                                src={img}
                                alt={`Claim photo ${index + 1}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ marginBottom: "16px" }}>
                      <label
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#374151",
                          display: "block",
                          marginBottom: "6px",
                        }}
                      >
                        Admin Note (optional)
                      </label>
                      <textarea
                        value={currentNote}
                        onChange={(e) =>
                          setNotes((prev) => ({
                            ...prev,
                            [claimId]: e.target.value,
                          }))
                        }
                        placeholder="Add a note for this decision..."
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: "10px",
                          border: "1px solid #e2e8f0",
                          fontSize: "13px",
                          outline: "none",
                          resize: "vertical",
                          minHeight: "70px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    <div
                      style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                    >
                      {["pending", "approved", "rejected"].map((status) => {
                        const sc = STATUS_CONFIG[status];
                        const isActive = normalizedStatus === status;
                        const isBusy = updating === `${claimId}-${status}`;
                        return (
                          <button
                            key={status}
                            onClick={() => updateStatus(claim, status)}
                            disabled={isBusy || isActive}
                            style={{
                              padding: "10px 20px",
                              borderRadius: "10px",
                              border: `2px solid ${isActive ? sc.color : "#e2e8f0"}`,
                              background: isActive ? sc.color : "#fff",
                              color: isActive ? "#fff" : sc.color,
                              fontSize: "13px",
                              fontWeight: "700",
                              cursor: isActive ? "default" : "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              opacity: isBusy ? 0.6 : 1,
                            }}
                          >
                            <sc.icon size={14} />
                            {isBusy
                              ? "Updating..."
                              : isActive
                                ? `✓ ${sc.label}`
                                : `Mark ${sc.label}`}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => deleteClaim(claim)}
                        disabled={updating === `${claimId}-delete`}
                        style={{
                          padding: "10px 20px",
                          borderRadius: "10px",
                          border: "2px solid #ef4444",
                          background: "#fff",
                          color: "#ef4444",
                          fontSize: "13px",
                          fontWeight: "700",
                          cursor:
                            updating === `${claimId}-delete`
                              ? "not-allowed"
                              : "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          opacity: updating === `${claimId}-delete` ? 0.6 : 1,
                        }}
                      >
                        <XCircle size={14} />
                        {updating === `${claimId}-delete`
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>

                    {(claim.adminNotes || claim.adminNote) && (
                      <div
                        style={{
                          marginTop: "12px",
                          background: "#fffbeb",
                          borderRadius: "8px",
                          padding: "10px 14px",
                          fontSize: "12px",
                          color: "#78350f",
                        }}
                      >
                        <strong>Previous note:</strong>{" "}
                        {claim.adminNotes || claim.adminNote}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            cursor: "zoom-out",
            padding: "20px",
          }}
        >
          <img
            src={lightboxImg}
            alt="Full view"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: "12px",
              objectFit: "contain",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AdminWarranty;
