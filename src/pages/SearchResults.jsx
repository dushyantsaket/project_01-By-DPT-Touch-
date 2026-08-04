import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Package, ArrowRight, Filter, X } from "lucide-react";
import { buildInitialCatalog } from "../utils/catalog/buildCatalog";

const API = "/api";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [localQuery, setLocalQuery] = useState(query);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLocalQuery(query);
    if (query.trim()) {
      doSearch(query.trim());
    } else {
      setResults([]);
    }
  }, [query]);

  const doSearch = async (q) => {
    setLoading(true);
    const localResults = () => {
      const term = q.toLowerCase();
      return buildInitialCatalog().filter((p) =>
        [p.name, p.title, p.brand, p.category, p.sub_category, p.sku, p.description]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(term),
      );
    };
    try {
      const res = await fetch(`${API}/products?search=${encodeURIComponent(q)}&limit=100`);
      const data = await res.json();
      let items = [];
      if (Array.isArray(data)) items = data;
      else if (Array.isArray(data.products)) items = data.products;
      else if (Array.isArray(data.data)) items = data.data;
      if (items.length === 0) items = localResults();
      setResults(items);

      // extract unique categories
      const cats = [...new Set(items.map(p => p.category).filter(Boolean))];
      setCategories(cats);
    } catch (err) {
      // fallback - local inventory search
      try {
        const r2 = await fetch(`${API}/admin/products?limit=500&search=${encodeURIComponent(q)}`);
        const d2 = await r2.json();
        const items2 = Array.isArray(d2.data) ? d2.data : Array.isArray(d2) ? d2 : [];
        setResults(items2);
        const cats = [...new Set(items2.map(p => p.category || p.name).filter(Boolean))];
        setCategories(cats);
      } catch {
        const items = localResults();
        setResults(items);
        setCategories([...new Set(items.map(p => p.category || p.sub_category).filter(Boolean))]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchParams({ q: localQuery.trim() });
    }
  };

  const filtered = categoryFilter === "all"
    ? results
    : results.filter(p => p.category === categoryFilter);

  const getImage = (p) => p?.image || p?.images?.[0]?.url || p?.images?.[0] || "";
  const getPrice = (p) => p?.price_inr || p?.sellingPrice || p?.sale_price || p?.price || 0;
  const getMRP = (p) => p?.mrp_inr || p?.mrp || p?.regular_price || getPrice(p);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", paddingTop: "80px" }}>
      {/* Search Header */}
      <div style={{ background: "#0f172a", padding: "40px 20px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0", borderRadius: "12px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", background: "#fff", padding: "0 16px", gap: "10px" }}>
              <Search size={20} color="#94a3b8" />
              <input
                type="text"
                value={localQuery}
                onChange={e => setLocalQuery(e.target.value)}
                placeholder="Search power tools, brands, categories..."
                style={{ flex: 1, border: "none", outline: "none", fontSize: "16px", padding: "16px 0", fontFamily: "inherit" }}
                autoFocus
              />
              {localQuery && (
                <button type="button" onClick={() => { setLocalQuery(""); setSearchParams({}); setResults([]); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>
                  <X size={18} />
                </button>
              )}
            </div>
            <button type="submit" style={{ background: "#dc2626", color: "#fff", border: "none", padding: "0 28px", fontSize: "15px", fontWeight: "700", cursor: "pointer", letterSpacing: "0.05em" }}>
              SEARCH
            </button>
          </form>
          {query && (
            <p style={{ color: "#94a3b8", marginTop: "12px", fontSize: "14px" }}>
              {loading ? "Searching..." : `Found ${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`}
            </p>
          )}
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}>
        {/* No query state */}
        {!query && !loading && (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <Search size={64} color="#cbd5e1" style={{ margin: "0 auto 20px", display: "block" }} />
            <h2 style={{ fontSize: "24px", color: "#475569", margin: "0 0 10px" }}>Search for Power Tools</h2>
            <p style={{ color: "#94a3b8", fontSize: "15px" }}>Try searching for "angle grinder", "BOSCH", "drilling machine" etc.</p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "30px", flexWrap: "wrap" }}>
              {["Drill Machine", "Angle Grinder", "Circular Saw", "BOSCH", "Makita", "DeWalt", "Cordless"].map(tag => (
                <button key={tag} onClick={() => setSearchParams({ q: tag })} style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "8px 16px", borderRadius: "20px", fontSize: "13px", color: "#475569", cursor: "pointer", fontWeight: "500", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.target.style.background = "#0f172a"; e.target.style.color = "#fff"; }}
                  onMouseLeave={e => { e.target.style.background = "#fff"; e.target.style.color = "#475569"; }}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px" }}>
            <div style={{ width: "40px", height: "40px", border: "3px solid #e2e8f0", borderTop: "3px solid #dc2626", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto" }} />
            <p style={{ color: "#64748b", marginTop: "16px" }}>Searching products...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Results */}
        {!loading && query && results.length > 0 && (
          <div>
            {/* Filter bar */}
            {categories.length > 1 && (
              <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap", alignItems: "center" }}>
                <Filter size={16} color="#64748b" />
                <button
                  onClick={() => setCategoryFilter("all")}
                  style={{ padding: "6px 14px", borderRadius: "20px", border: "1px solid #e2e8f0", fontSize: "12px", fontWeight: "600", cursor: "pointer", background: categoryFilter === "all" ? "#0f172a" : "#fff", color: categoryFilter === "all" ? "#fff" : "#64748b" }}>
                  All ({results.length})
                </button>
                {categories.map(cat => (
                  <button key={cat} onClick={() => setCategoryFilter(cat)}
                    style={{ padding: "6px 14px", borderRadius: "20px", border: "1px solid #e2e8f0", fontSize: "12px", fontWeight: "600", cursor: "pointer", background: categoryFilter === cat ? "#dc2626" : "#fff", color: categoryFilter === cat ? "#fff" : "#64748b" }}>
                    {cat} ({results.filter(p => p.category === cat).length})
                  </button>
                ))}
              </div>
            )}

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
              {filtered.map((product, idx) => {
                const price = getPrice(product);
                const mrp = getMRP(product);
                const img = getImage(product);
                const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
                const pid = product._id || product.id || idx;

                return (
                  <Link
                    key={pid}
                    to={`/product/${pid}`}
                    style={{ textDecoration: "none", color: "inherit", background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", transition: "all 0.2s", display: "block" }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "none"; }}
                  >
                    <div style={{ height: "200px", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
                      {img ? (
                        <img src={img} alt={product.name || product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <Package size={48} color="#cbd5e1" />
                      )}
                      {discount > 0 && (
                        <span style={{ position: "absolute", top: "10px", right: "10px", background: "#dc2626", color: "#fff", fontSize: "10px", fontWeight: "700", padding: "3px 8px", borderRadius: "6px" }}>
                          -{discount}%
                        </span>
                      )}
                    </div>
                    <div style={{ padding: "16px" }}>
                      <p style={{ fontSize: "10px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
                        {product.brand || product.category || "Power Tools"}
                      </p>
                      <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a", marginBottom: "12px", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {product.name || product.title}
                      </h3>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                        <span style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>₹{Number(price).toLocaleString("en-IN")}</span>
                        {mrp > price && <span style={{ fontSize: "12px", color: "#94a3b8", textDecoration: "line-through" }}>₹{Number(mrp).toLocaleString("en-IN")}</span>}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "12px", color: "#dc2626", fontSize: "12px", fontWeight: "600" }}>
                        View Details <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* No results */}
        {!loading && query && results.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <Package size={64} color="#cbd5e1" style={{ margin: "0 auto 20px", display: "block" }} />
            <h2 style={{ fontSize: "24px", color: "#475569", margin: "0 0 10px" }}>No results for "{query}"</h2>
            <p style={{ color: "#94a3b8", fontSize: "15px", marginBottom: "30px" }}>Try different keywords or browse our categories</p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/products" style={{ background: "#0f172a", color: "#fff", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "14px" }}>
                Browse All Products
              </Link>
              <Link to="/categories" style={{ background: "#fff", color: "#0f172a", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "14px", border: "1px solid #e2e8f0" }}>
                View Categories
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
