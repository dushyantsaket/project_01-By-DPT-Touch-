import React, { useState, useEffect, useMemo } from "react";
import {
  ShoppingCart,
  Plus,
  UploadCloud,
  Search,
  Package,
  IndianRupee,
  Clock,
  CheckCircle,
} from "lucide-react";

const API = "/api";

export default function PurchasesWorkspace({ token, showToast }) {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [billText, setBillText] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const res = await fetch(`${API}/purchases`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPurchases(data.data);
      } else {
        showToast("Failed to load purchases");
      }
    } catch (err) {
      showToast("Error fetching purchases");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkScan = async () => {
    // In a real app, this would open a file picker or a modal
    showToast(
      "📸 Bulk scan – upload bill image(s) to auto‑extract purchase data.",
    );
  };

  const handleAddPurchase = () => {
    // Placeholder – open a modal or navigate to add page
    showToast("➕ Add Purchase – open a form to create a new purchase order.");
  };

  // Compute statistics
  const stats = useMemo(() => {
    const total = purchases.length;
    const totalAmount = purchases.reduce(
      (sum, p) => sum + (p.grandTotal || 0),
      0,
    );
    const pending = purchases.filter(
      (p) => p.status?.toLowerCase() === "pending",
    ).length;
    const completed = purchases.filter(
      (p) =>
        p.status?.toLowerCase() === "completed" ||
        p.status?.toLowerCase() === "received",
    ).length;
    return { total, totalAmount, pending, completed };
  }, [purchases]);

  // Filter purchases by search term
  const filteredPurchases = useMemo(() => {
    if (!searchTerm.trim()) return purchases;
    const lower = searchTerm.toLowerCase();
    return purchases.filter(
      (p) =>
        p.purchaseNumber?.toLowerCase().includes(lower) ||
        p.supplier?.name?.toLowerCase().includes(lower) ||
        p.status?.toLowerCase().includes(lower),
    );
  }, [purchases, searchTerm]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="admin-card" style={{ padding: "24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "#e2e8f0",
                borderRadius: "8px",
              }}
            />
            <div
              style={{
                width: "180px",
                height: "24px",
                background: "#e2e8f0",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <div
              style={{
                width: "120px",
                height: "36px",
                background: "#e2e8f0",
                borderRadius: "8px",
              }}
            />
            <div
              style={{
                width: "120px",
                height: "36px",
                background: "#e2e8f0",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
        {/* Stats skeletons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                padding: "16px",
                background: "#f1f5f9",
                borderRadius: "12px",
                height: "80px",
              }}
            />
          ))}
        </div>
        {/* Table skeleton */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              height: "40px",
              background: "#f8fafc",
              borderRadius: "8px",
              marginBottom: "12px",
            }}
          />
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                height: "48px",
                background: "#f1f5f9",
                borderRadius: "4px",
                marginBottom: "8px",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="admin-card">
      <div className="admin-section-title">
        <div>
          <ShoppingCart size={19} />
          <strong>Purchases & Uploads</strong>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button type="button" onClick={handleBulkScan}>
            <UploadCloud size={16} /> Bulk Scan Bill
          </button>
          <button className="primary" type="button" onClick={handleAddPurchase}>
            <Plus size={16} /> Add Purchase
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "16px 20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{ fontSize: "14px", fontWeight: "500", color: "#64748b" }}
            >
              Total Purchases
            </span>
            <Package size={20} style={{ color: "#2563eb" }} />
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginTop: "8px",
              color: "#0f172a",
            }}
          >
            {stats.total}
          </div>
        </div>
        <div
          style={{
            background: "#fff",
            padding: "16px 20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{ fontSize: "14px", fontWeight: "500", color: "#64748b" }}
            >
              Total Amount
            </span>
            <IndianRupee size={20} style={{ color: "#16a34a" }} />
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginTop: "8px",
              color: "#0f172a",
            }}
          >
            ₹{stats.totalAmount.toLocaleString()}
          </div>
        </div>
        <div
          style={{
            background: "#fff",
            padding: "16px 20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{ fontSize: "14px", fontWeight: "500", color: "#64748b" }}
            >
              Pending
            </span>
            <Clock size={20} style={{ color: "#f59e0b" }} />
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginTop: "8px",
              color: "#0f172a",
            }}
          >
            {stats.pending}
          </div>
        </div>
        <div
          style={{
            background: "#fff",
            padding: "16px 20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{ fontSize: "14px", fontWeight: "500", color: "#64748b" }}
            >
              Completed
            </span>
            <CheckCircle size={20} style={{ color: "#22c55e" }} />
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginTop: "8px",
              color: "#0f172a",
            }}
          >
            {stats.completed}
          </div>
        </div>
      </div>

      {/* Search */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ position: "relative", width: "100%", maxWidth: "320px" }}>
          <Search
            size={18}
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
            placeholder="Search by bill no, supplier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 16px 10px 40px",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#2563eb")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
          />
        </div>
      </div>

      {/* Table or Empty State */}
      {filteredPurchases.length === 0 ? (
        <div
          className="admin-empty-state"
          style={{
            textAlign: "center",
            padding: "48px 20px",
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            color: "#64748b",
          }}
        >
          <Package
            size={48}
            style={{ marginBottom: "16px", color: "#cbd5e1" }}
          />
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              margin: "0 0 8px",
              color: "#0f172a",
            }}
          >
            No purchases found
          </h3>
          <p style={{ margin: "0" }}>
            {searchTerm
              ? "Try adjusting your search term."
              : "Start by adding your first purchase or scanning a bill."}
          </p>
        </div>
      ) : (
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <table
            className="admin-table"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f8fafc",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <th
                  style={{
                    padding: "14px 16px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#475569",
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    padding: "14px 16px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#475569",
                  }}
                >
                  Bill No
                </th>
                <th
                  style={{
                    padding: "14px 16px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#475569",
                  }}
                >
                  Supplier
                </th>
                <th
                  style={{
                    padding: "14px 16px",
                    textAlign: "right",
                    fontWeight: "600",
                    color: "#475569",
                  }}
                >
                  Amount
                </th>
                <th
                  style={{
                    padding: "14px 16px",
                    textAlign: "center",
                    fontWeight: "600",
                    color: "#475569",
                  }}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.map((purchase, index) => {
                const status = purchase.status?.toLowerCase() || "unknown";
                const statusColor =
                  status === "completed" || status === "received"
                    ? "#16a34a"
                    : status === "pending"
                      ? "#f59e0b"
                      : status === "cancelled"
                        ? "#dc2626"
                        : "#64748b";
                const bgColor = index % 2 === 0 ? "#ffffff" : "#fafbfc";
                return (
                  <tr
                    key={purchase._id || index}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      background: bgColor,
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f1f5f9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = bgColor)
                    }
                  >
                    <td style={{ padding: "14px 16px", color: "#0f172a" }}>
                      {purchase.date
                        ? new Date(purchase.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}
                    </td>
                    <td
                      style={{
                        padding: "14px 16px",
                        fontWeight: "500",
                        color: "#0f172a",
                      }}
                    >
                      {purchase.purchaseNumber || "—"}
                    </td>
                    <td style={{ padding: "14px 16px", color: "#0f172a" }}>
                      {purchase.supplier?.name || "-"}
                    </td>
                    <td
                      style={{
                        padding: "14px 16px",
                        textAlign: "right",
                        fontWeight: "600",
                        color: "#0f172a",
                      }}
                    >
                      ₹{(purchase.grandTotal || 0).toLocaleString()}
                    </td>
                    <td style={{ padding: "14px 16px", textAlign: "center" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 14px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600",
                          textTransform: "capitalize",
                          background:
                            status === "completed" || status === "received"
                              ? "#dcfce7"
                              : status === "pending"
                                ? "#fef9c3"
                                : status === "cancelled"
                                  ? "#fee2e2"
                                  : "#f1f5f9",
                          color: statusColor,
                        }}
                      >
                        {purchase.status || "—"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredPurchases.length > 10 && (
            <div
              style={{
                padding: "12px 16px",
                textAlign: "center",
                borderTop: "1px solid #e2e8f0",
                fontSize: "14px",
                color: "#64748b",
              }}
            >
              Showing {filteredPurchases.length} records
            </div>
          )}
        </div>
      )}
    </section>
  );
}
