// SearchPage.js – client‑side filtering
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/products`,
        );
        const data = await res.json();
        setAllProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Filter on every render based on query
  const filtered = query.trim()
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="search-page">
      <h1>Search Results for "{query}"</h1>
      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="search-results-grid">
          {filtered.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
