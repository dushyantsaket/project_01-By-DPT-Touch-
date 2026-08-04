import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Battery,
  ChevronLeft,
  ChevronRight,
  FilterX,
  Leaf,
  Package,
  Search,
  ShieldCheck,
  ShoppingCart,
  Wrench,
  Zap,
} from "lucide-react";
import { useInventory } from "../context/useInventory";
import { useCart } from "../context/CartContext";
import { resolveCategoryConfig } from "../data/categoryCatalogConfig";
import {
  buildCatalogFacets,
  filterCatalogProducts,
  getCategoryProducts,
  getNumericPrice,
  paginateCatalogProducts,
} from "../utils/catalog/queryCatalog";
import "../styles/CategoryDetail.css";

const PAGE_SIZE = 12;

const highlightIcons = {
  battery: Battery,
  leaf: Leaf,
  package: Package,
  shield: ShieldCheck,
  wrench: Wrench,
  zap: Zap,
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const buildPageNumbers = (currentPage, totalPages) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) return [1, 2, 3, 4, totalPages];
  if (currentPage >= totalPages - 2) {
    return [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
};

const getProductSpecRows = (product) => {
  const rows = [];

  if (product.voltage || product.power) {
    rows.push({ label: "Power", value: product.voltage || product.power });
  }

  if (product.noLoadSpeed || product.speed || product.maxFlow) {
    rows.push({
      label: "Performance",
      value: product.noLoadSpeed || product.speed || product.maxFlow,
    });
  }

  if (product.spec || product.sub_category || product.subCategory) {
    rows.push({
      label: "Type",
      value: product.spec || product.sub_category || product.subCategory,
    });
  }

  if (rows.length < 3 && product.brand) {
    rows.push({ label: "Brand", value: product.brand });
  }

  return rows.slice(0, 3);
};

const getBadgeLabels = (product, index) => {
  const labels = [];
  const normalizedTags = Array.isArray(product.tags)
    ? product.tags.map((tag) => String(tag).toUpperCase())
    : [];

  if (normalizedTags.includes("HOT")) labels.push("Hot");
  if (normalizedTags.includes("NEW")) labels.push("New");
  if (!labels.length && product.regular_price > getNumericPrice(product))
    labels.push("On Sale");
  if (!labels.length && index < 4) labels.push("Featured");

  return labels.slice(0, 2);
};

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { products: allProducts } = useInventory();
  const { addToCart } = useCart();

  const category = useMemo(
    () => resolveCategoryConfig(categoryId),
    [categoryId],
  );

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("all");
  const [subCategory, setSubCategory] = useState("all");
  const [sort, setSort] = useState(category.defaultSort);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [priceCap, setPriceCap] = useState(0);
  const deferredSearch = useDeferredValue(search);

  const localCategoryProducts = useMemo(
    () => getCategoryProducts(allProducts, category),
    [allProducts, category],
  );

  const localFacets = useMemo(
    () => buildCatalogFacets(localCategoryProducts),
    [localCategoryProducts],
  );

  useEffect(() => {
    setSearch("");
    setBrand("all");
    setSubCategory("all");
    setSort(category.defaultSort);
    setInStockOnly(false);
    setPage(1);
  }, [category.id, category.defaultSort]);

  useEffect(() => {
    setPriceCap(localFacets.priceMax || 0);
  }, [category.id, localFacets.priceMax]);

  useEffect(() => {
    setPage(1);
  }, [deferredSearch, brand, subCategory, sort, inStockOnly, priceCap]);

  const localFilteredProducts = useMemo(
    () =>
      filterCatalogProducts(localCategoryProducts, {
        search: deferredSearch,
        brand,
        subCategory,
        inStock: inStockOnly ? "true" : "all",
        maxPrice: priceCap || Number.POSITIVE_INFINITY,
        sort,
      }),
    [
      localCategoryProducts,
      deferredSearch,
      brand,
      subCategory,
      inStockOnly,
      priceCap,
      sort,
    ],
  );

  const localPagination = useMemo(
    () => paginateCatalogProducts(localFilteredProducts, page, PAGE_SIZE),
    [localFilteredProducts, page],
  );

  const [remoteCatalog, setRemoteCatalog] = useState(null);
  const [apiStatus, setApiStatus] = useState("idle");

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      page: String(page),
      limit: String(PAGE_SIZE),
      sort,
    });

    if (deferredSearch) params.set("search", deferredSearch);
    if (brand !== "all") params.set("brand", brand);
    if (subCategory !== "all") params.set("subCategory", subCategory);
    if (inStockOnly) params.set("inStock", "true");
    if (priceCap > 0) params.set("maxPrice", String(priceCap));

    const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";
    setApiStatus("loading");

    fetch(`${apiBase}/api/catalog/${category.id}?${params.toString()}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Catalog API unavailable");
        }

        const payload = await response.json();
        setRemoteCatalog(payload);
        setApiStatus("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setRemoteCatalog(null);
          setApiStatus("fallback");
        }
      });

    return () => controller.abort();
  }, [
    category.id,
    page,
    sort,
    deferredSearch,
    brand,
    subCategory,
    inStockOnly,
    priceCap,
  ]);

  const facets = remoteCatalog?.facets || localFacets;
  const pagination = remoteCatalog?.pagination || localPagination;
  const displayProducts = remoteCatalog?.products || localPagination.items;
  const totalProducts = pagination.total ?? localFilteredProducts.length;
  const maxPrice = facets.priceMax || 0;

  const pageNumbers = useMemo(
    () => buildPageNumbers(pagination.page, pagination.totalPages),
    [pagination.page, pagination.totalPages],
  );

  const resetFilters = () => {
    setSearch("");
    setBrand("all");
    setSubCategory("all");
    setSort(category.defaultSort);
    setInStockOnly(false);
    setPriceCap(maxPrice || 0);
    setPage(1);
  };

  const handleAddToCart = (event, product) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="catalog-page">
      <section className="catalog-hero">
        <div className="catalog-shell">
          <button
            className="catalog-back-btn"
            onClick={() => navigate("/categories")}
          >
            <ArrowLeft size={14} />
            <span>Back to Catalog</span>
          </button>

          <div className="catalog-hero-copy">
            <p className="catalog-label">{category.collectionLabel}</p>
            <h1>{category.name}</h1>
            <p className="catalog-description">{category.description}</p>
          </div>

          <div className="catalog-hero-metrics">
            <div className="catalog-metric-card">
              <span className="catalog-metric-value">{totalProducts}</span>
              <span className="catalog-metric-label">Products</span>
            </div>
            <div className="catalog-metric-card">
              <span className="catalog-metric-value">
                {facets.brands.length}
              </span>
              <span className="catalog-metric-label">Brands</span>
            </div>
            <div className="catalog-metric-card">
              <span className="catalog-metric-value">
                {facets.subCategories.length}
              </span>
              <span className="catalog-metric-label">Types</span>
            </div>
          </div>
        </div>
      </section>

      <section className="catalog-highlights">
        <div className="catalog-shell catalog-highlights-grid">
          {category.featureHighlights.map((highlight) => {
            const Icon = highlightIcons[highlight.icon] || Package;
            return (
              <div
                className="catalog-highlight-card"
                key={`${category.id}-${highlight.title}`}
              >
                <div className="catalog-highlight-icon">
                  <Icon size={18} />
                </div>
                <div>
                  <h3>{highlight.title}</h3>
                  <p>{highlight.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="catalog-content">
        <div className="catalog-shell catalog-layout">
          <aside className="catalog-sidebar">
            <div className="catalog-filter-panel">
              <div className="catalog-filter-heading">
                <h2>Refine Catalog</h2>
                <button
                  type="button"
                  className="catalog-reset-btn"
                  onClick={resetFilters}
                >
                  <FilterX size={14} />
                  <span>Reset</span>
                </button>
              </div>

              <label className="catalog-filter-group">
                <span>Search by name or brand</span>
                <div className="catalog-search-box">
                  <Search size={16} />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search products..."
                  />
                </div>
              </label>

              <label className="catalog-filter-group">
                <span>Brand</span>
                <select
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                >
                  <option value="all">All Brands</option>
                  {facets.brands.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="catalog-filter-group">
                <span>Product Type</span>
                <select
                  value={subCategory}
                  onChange={(event) => setSubCategory(event.target.value)}
                >
                  <option value="all">All Types</option>
                  {facets.subCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <div className="catalog-filter-group">
                <span>Price Ceiling</span>
                <div className="catalog-range-wrap">
                  <input
                    type="range"
                    min="0"
                    max={maxPrice || 1}
                    step="100"
                    value={priceCap || maxPrice || 0}
                    onChange={(event) =>
                      setPriceCap(Number(event.target.value))
                    }
                    disabled={maxPrice <= 0}
                  />
                  <div className="catalog-range-values">
                    <span>{formatCurrency(0)}</span>
                    <span>
                      {maxPrice > 0
                        ? formatCurrency(priceCap || maxPrice)
                        : "Flexible"}
                    </span>
                  </div>
                </div>
              </div>

              <label className="catalog-checkbox">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(event) => setInStockOnly(event.target.checked)}
                />
                <span>Show in-stock products only</span>
              </label>
            </div>
          </aside>

          <div className="catalog-main">
            <div className="catalog-toolbar">
              <div>
                <h2>{category.name} Collection</h2>
                <p>
                  Showing {pagination.start || 0}-{pagination.end || 0} of{" "}
                  {totalProducts} products
                </p>
              </div>

              <div className="catalog-toolbar-actions">
                <span
                  className={`catalog-source-badge catalog-source-badge--${apiStatus}`}
                >
                  {apiStatus === "ready"
                    ? "API Synced"
                    : "Local Inventory Mode"}
                </span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="popular">Most Reviewed</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {displayProducts.length === 0 ? (
              <div className="catalog-empty-state">
                <Package size={34} />
                <h3>No matching products found</h3>
                <p>Try changing the filters or resetting the current search.</p>
                <button
                  type="button"
                  className="catalog-primary-btn"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="catalog-grid">
                  {displayProducts.map((product, index) => {
                    const price = getNumericPrice(product);
                    const regularPrice = Number(
                      product.regular_price || product.mrp || 0,
                    );
                    const specRows = getProductSpecRows(product);
                    const badgeLabels = getBadgeLabels(product, index);
                    const isOutOfStock =
                      Number(product.stock_quantity ?? 0) <= 0;

                    return (
                      <article
                        key={product.id}
                        className="catalog-card"
                        role="button"
                        tabIndex={0}
                        onClick={() => navigate(`/product/${product.id}`)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            navigate(`/product/${product.id}`);
                          }
                        }}
                      >
                        <div className="catalog-card-topline">
                          <span>{product.sku || product.id}</span>
                          {isOutOfStock && (
                            <span className="catalog-stock-tag">
                              Out of Stock
                            </span>
                          )}
                        </div>

                        <div className="catalog-card-media">
                          <div className="catalog-card-badges">
                            {badgeLabels.map((label) => (
                              <span
                                key={`${product.id}-${label}`}
                                className="catalog-card-badge"
                              >
                                {label}
                              </span>
                            ))}
                          </div>
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                          />
                        </div>

                        <div className="catalog-card-body">
                          <h3>{product.name}</h3>

                          <div className="catalog-card-specs">
                            {specRows.map((row) => (
                              <div
                                key={`${product.id}-${row.label}`}
                                className="catalog-card-spec-row"
                              >
                                <span>{row.label}</span>
                                <strong>{row.value}</strong>
                              </div>
                            ))}
                          </div>

                          <div className="catalog-card-footer">
                            <div>
                              {price > 0 ? (
                                <div className="catalog-price-block">
                                  <span className="catalog-price-current">
                                    {formatCurrency(price)}
                                  </span>
                                  {regularPrice > price && (
                                    <>
                                      <span className="catalog-price-compare">
                                        {formatCurrency(regularPrice)}
                                      </span>
                                      <span className="catalog-price-discount">
                                        {Math.round(
                                          ((regularPrice - price) /
                                            regularPrice) *
                                            100,
                                        )}
                                        % OFF
                                      </span>
                                    </>
                                  )}
                                </div>
                              ) : (
                                <button
                                  className="catalog-login-price"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate("/login");
                                  }}
                                >
                                  LOGIN FOR PRICE &rarr;
                                </button>
                              )}
                            </div>

                            <div className="catalog-card-actions">
                              <button
                                type="button"
                                className="catalog-primary-btn"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  navigate(`/product/${product.id}`);
                                }}
                              >
                                View Details
                              </button>
                              <button
                                type="button"
                                className="catalog-icon-btn"
                                onClick={(event) =>
                                  handleAddToCart(event, product)
                                }
                                disabled={isOutOfStock}
                                aria-label={`Add ${product.name} to cart`}
                              >
                                <ShoppingCart size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {pagination.totalPages > 1 && (
                  <div className="catalog-pagination">
                    <button
                      type="button"
                      className="catalog-pagination-btn"
                      onClick={() =>
                        setPage((current) => Math.max(1, current - 1))
                      }
                      disabled={pagination.page === 1}
                    >
                      <ChevronLeft size={16} />
                      <span>Prev</span>
                    </button>

                    <div className="catalog-pagination-pages">
                      {pageNumbers.map((pageNumber, index) => {
                        const previous = pageNumbers[index - 1];
                        const needsGap = previous && pageNumber - previous > 1;

                        return (
                          <React.Fragment key={`${pageNumber}-${index}`}>
                            {needsGap && (
                              <span className="catalog-pagination-gap">
                                ...
                              </span>
                            )}
                            <button
                              type="button"
                              className={`catalog-page-number ${
                                pageNumber === pagination.page
                                  ? "is-active"
                                  : ""
                              }`}
                              onClick={() => setPage(pageNumber)}
                            >
                              {pageNumber}
                            </button>
                          </React.Fragment>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      className="catalog-pagination-btn"
                      onClick={() =>
                        setPage((current) =>
                          Math.min(pagination.totalPages, current + 1),
                        )
                      }
                      disabled={pagination.page === pagination.totalPages}
                    >
                      <span>Next</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryDetail;
