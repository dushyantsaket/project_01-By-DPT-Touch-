import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Trash2,
  Newspaper,
  Tag,
  Image,
  Send,
  RefreshCw,
  Bell,
  Calendar,
  Eye,
} from "lucide-react";

const API = "/api";

const BRANDS = [
  "DPT Tools",
  "Auto Power",
  "Robot Power",
  "Yuri",
  "Total Tools",
  "Makita",
  "Bosch",
  "Ingco",
  "Eastman",
  "Stanley",
  "DeWalt",
  "VPT Tool Touch",
  "DFM Mart",
  "Dushyant Furniture Mart",
];

const AdminNews = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    brand: "DPT Tools",
    image: "",
    tags: "",
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/news`);
      const raw = await res.json();
      const arr = Array.isArray(raw)
        ? raw
        : Array.isArray(raw.data)
          ? raw.data
          : [];
      setPosts(arr);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        description: form.content,
        content: form.content,
        summary: form.summary || form.content.substring(0, 160),
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const res = await fetch(`${API}/admin/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || data?.error || "Failed to post news");
      }

      setForm({
        title: "",
        summary: "",
        content: "",
        brand: "DPT Tools",
        image: "",
        tags: "",
      });
      setShowForm(false);
      await load();
      alert(
        "News posted successfully. It is now available in the frontend news section.",
      );
    } catch (error) {
      alert(error.message || "Failed to post news");
    } finally {
      setSubmitting(false);
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm("Delete this news post?")) return;
    setDeleting(id);
    try {
      await fetch(`${API}/admin/news/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Delete failed");
    } finally {
      setDeleting(null);
    }
  };

  const fmt = (iso) =>
    iso
      ? new Date(iso).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "";

  return (
    <div>
      {/* Header */}
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
            News Manager
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Create brand news — automatically notifies all users
          </p>
        </div>
        <button
          onClick={() => setShowForm((f) => !f)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 18px",
            background: "#0f172a",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          <Plus size={16} /> {showForm ? "Cancel" : "Create News Post"}
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "800",
              color: "#0f172a",
              margin: "0 0 20px",
            }}
          >
            📰 New News Post
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
              marginBottom: "14px",
            }}
          >
            <div style={{ gridColumn: "1 / -1" }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#374151",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Title *
              </label>
              <input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="News headline..."
                required
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#374151",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Brand / Category
              </label>
              <select
                value={form.brand}
                onChange={(e) =>
                  setForm((f) => ({ ...f, brand: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  fontSize: "14px",
                  outline: "none",
                }}
              >
                {BRANDS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#374151",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Tags (comma separated)
              </label>
              <input
                value={form.tags}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tags: e.target.value }))
                }
                placeholder="sale, new arrival, discount..."
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#374151",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Short Summary (for notification)
              </label>
              <input
                value={form.summary}
                onChange={(e) =>
                  setForm((f) => ({ ...f, summary: e.target.value }))
                }
                placeholder="Brief one-liner for notification..."
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#374151",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Full Content *
              </label>
              <textarea
                value={form.content}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                placeholder="Full news article content..."
                required
                rows={5}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  fontSize: "14px",
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Image upload */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "#374151",
                display: "block",
                marginBottom: "8px",
              }}
            >
              News Image
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                style={{
                  padding: "8px 16px",
                  background: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Image size={14} /> Upload Image
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <input
                value={form.image}
                onChange={(e) =>
                  setForm((f) => ({ ...f, image: e.target.value }))
                }
                placeholder="or paste image URL..."
                style={{
                  flex: 1,
                  padding: "8px 14px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
            </div>
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                style={{
                  width: "120px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginTop: "10px",
                  border: "1px solid #e2e8f0",
                }}
              />
            )}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "12px 24px",
                background: submitting ? "#94a3b8" : "#dc2626",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Send size={14} />{" "}
              {submitting ? "Posting..." : "Post & Notify Users"}
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                color: "#94a3b8",
              }}
            >
              <Bell size={13} /> Notification will be sent to all users
            </div>
          </div>
        </form>
      )}

      {/* News List */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              border: "3px solid #e2e8f0",
              borderTop: "3px solid #dc2626",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 12px",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          Loading news...
        </div>
      ) : posts.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#94a3b8",
          }}
        >
          <Newspaper
            size={40}
            color="#e2e8f0"
            style={{ margin: "0 auto 12px" }}
          />
          <p style={{ fontWeight: "600", fontSize: "16px" }}>
            No news posts yet
          </p>
          <p style={{ fontSize: "13px" }}>
            Create your first news post to notify customers
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                background: "#fff",
                borderRadius: "14px",
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: "100%", height: "160px", objectFit: "cover" }}
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}
              <div style={{ padding: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      background: "#fef2f2",
                      color: "#dc2626",
                      fontSize: "10px",
                      fontWeight: "700",
                      padding: "2px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    {post.brand}
                  </span>
                  {(post.tags || []).slice(0, 2).map((t) => (
                    <span
                      key={t}
                      style={{
                        background: "#f1f5f9",
                        color: "#64748b",
                        fontSize: "10px",
                        fontWeight: "600",
                        padding: "2px 6px",
                        borderRadius: "6px",
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "11px",
                      color: "#94a3b8",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Calendar size={11} /> {fmt(post.createdAt)}
                  </span>
                </div>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#0f172a",
                    margin: "0 0 6px",
                    lineHeight: 1.4,
                  }}
                >
                  {post.title}
                </h4>
                {post.summary && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#64748b",
                      margin: "0 0 12px",
                      lineHeight: 1.5,
                    }}
                  >
                    {post.summary}
                  </p>
                )}
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => setPreview(post)}
                    style={{
                      flex: 1,
                      padding: "8px",
                      background: "#f1f5f9",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                    }}
                  >
                    <Eye size={13} /> Preview
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    disabled={deleting === post.id}
                    style={{
                      padding: "8px 12px",
                      background: "#fef2f2",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      color: "#dc2626",
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {preview && (
        <div
          onClick={() => setPreview(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "16px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            {preview.image && (
              <img
                src={preview.image}
                alt=""
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "16px 16px 0 0",
                }}
              />
            )}
            <div style={{ padding: "24px" }}>
              <span
                style={{
                  background: "#fef2f2",
                  color: "#dc2626",
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "2px 10px",
                  borderRadius: "6px",
                }}
              >
                {preview.brand}
              </span>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  margin: "12px 0 8px",
                }}
              >
                {preview.title}
              </h2>
              <p
                style={{
                  fontSize: "13px",
                  color: "#94a3b8",
                  marginBottom: "16px",
                }}
              >
                {fmt(preview.createdAt)}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#374151",
                  lineHeight: "1.7",
                  whiteSpace: "pre-wrap",
                }}
              >
                {preview.content}
              </p>
              <button
                onClick={() => setPreview(null)}
                style={{
                  marginTop: "16px",
                  padding: "10px 20px",
                  background: "#0f172a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNews;
