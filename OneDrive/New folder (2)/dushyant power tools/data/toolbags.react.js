import React from 'react';

// Helper function to normalize product data from different sources
const normalizeProduct = (product, source) => {
  // Common fields with fallbacks
  const normalized = {
    id: product.id || product.variant_id || product.handle || Math.random().toString(),
    name: product.name || product.title || product.short_title || 'Unnamed Product',
    description: product.description || '',
    price: product.price || product.selling_price || product.price?.current || 0,
    originalPrice: product.original_price || product.price?.original || null,
    discountPercent: product.discount_percent || product.price?.discount_percent || null,
    discountText: product.discount || '',
    currency: product.currency || product.price?.currency || '₹',
    rating: product.rating || product.rating?.average || null,
    reviewCount: product.review_count || product.rating?.count || 0,
    inStock: product.in_stock ?? product.availability === 'In Stock' ?? true,
    imageUrl: getImageUrl(product),
    productUrl: product.product_url || product.url || '#',
    brand: product.brand || product.vendor || product.seller || '',
    tags: product.tags || [],
    etaDays: product.eta_days || null,
    madeInIndia: product.made_in_india || product.badges?.made_in_india || false,
    freeShipping: product.free_shipping || product.badges?.free_shipping || false,
  };

  // Calculate discount percent if not present but original price exists
  if (!normalized.discountPercent && normalized.originalPrice && normalized.price) {
    normalized.discountPercent = Math.round(((normalized.originalPrice - normalized.price) / normalized.originalPrice) * 100);
  }

  return normalized;
};

// Get the first available image URL
const getImageUrl = (product) => {
  if (product.images && product.images.length > 0) return product.images[0];
  if (product.image_url) return product.image_url;
  if (product.images?.thumbnail) return product.images.thumbnail;
  if (product.images?.medium) return product.images.medium;
  return 'https://via.placeholder.com/300?text=No+Image';
};

// Product Card Component
const ProductCard = ({ product, source = 'generic' }) => {
  const p = normalizeProduct(product, source);

  return (
    <div className="product-card">
      <a href={p.productUrl} target="_blank" rel="noopener noreferrer">
        <img src={p.imageUrl} alt={p.name} className="product-image" />
      </a>
      <div className="product-info">
        {p.brand && <span className="product-brand">{p.brand}</span>}
        <h3 className="product-title">
          <a href={p.productUrl} target="_blank" rel="noopener noreferrer">
            {p.name.length > 60 ? p.name.substring(0, 60) + '…' : p.name}
          </a>
        </h3>
        <div className="product-price">
          <span className="current-price">{p.currency}{p.price}</span>
          {p.originalPrice && (
            <>
              <span className="original-price">{p.currency}{p.originalPrice}</span>
              {p.discountPercent && <span className="discount">-{p.discountPercent}%</span>}
            </>
          )}
          {p.discountText && <span className="discount">{p.discountText}</span>}
        </div>
        {p.rating && (
          <div className="product-rating">
            {'★'.repeat(Math.floor(p.rating))}
            {p.rating % 1 !== 0 && '½'}
            {'☆'.repeat(5 - Math.ceil(p.rating))}
            <span className="rating-value">({p.rating})</span>
            {p.reviewCount > 0 && <span className="review-count">{p.reviewCount} reviews</span>}
          </div>
        )}
        <div className="product-meta">
          {p.inStock ? <span className="in-stock">In Stock</span> : <span className="out-of-stock">Out of Stock</span>}
          {p.etaDays && <span className="eta">Est. delivery: {p.etaDays}</span>}
          {p.freeShipping && <span className="free-shipping">Free Shipping</span>}
          {p.madeInIndia && <span className="made-in-india">Made in India</span>}
        </div>
        {p.tags.length > 0 && (
          <div className="product-tags">
            {p.tags.slice(0, 3).map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
        )}
      </div>
    </div>
  );
};

// Product List Component – accepts array of products and optional source name
const ProductList = ({ products, source, title }) => {
  if (!products || products.length === 0) {
    return <div className="no-products">No products found.</div>;
  }

  return (
    <div className="product-list-container">
      {title && <h2 className="list-title">{title}</h2>}
      <div className="product-grid">
        {products.map((product, idx) => (
          <ProductCard key={product.id || product.variant_id || idx} product={product} source={source} />
        ))}
      </div>
    </div>
  );
};

// Example usage component that demonstrates loading data from various sources
const ProductCatalog = () => {
  // Example: samnantools products (from your JSON)
  const samnantoolsProducts = [
    {
      id: 25092,
      name: "samnantools chainsaw crank case",
      price: 1100.00,
      original_price: 1650.00,
      discount_percent: 33,
      rating: 4.5,
      availability: "In Stock",
      images: ["https://samnantools.in/wp-content/uploads/2021/07/6122dA1Bv1L._SX466_-405x330.jpg"],
      product_url: "https://samnantools.in/samnantools-chainsaw-crank-case/",
      eta_days: "Jun 1"
    },
    // ... more products from the data
  ];

  // Example: aldahome products
  const aldahomeProducts = [
    {
      id: "4658",
      name: "Taparia Flat Screw Driver 936 (Blade 150x5mm | Tip 5.0x0.8mm) (Pack of 10)",
      brand: "Taparia",
      selling_price: 630,
      original_price: 670,
      discount: "6%",
      free_shipping: true,
      in_stock: true,
      product_url: "https://www.aldahome.com/taparia-flat-screw-driver-936.html",
      image_url: "https://www.aldahome.com/media/catalog/product/.../image.jpg"
    }
  ];

  // Example: makerbazar products (first few)
  const makerbazarProducts = [
    {
      id: "9427914719472",
      name: "Taparia: Heavy-Duty Long Nose Pliers - 1430-6 170mm",
      brand: "Taparia",
      selling_price: 252,
      original_price: 258,
      discount_percent: 2.3,
      rating: 0,
      in_stock: true,
      images: ["https://cdn.shopify.com/.../1430-61430-6N.jpg"],
      product_url: "/products/heavy-duty-long-round-flat-nose-pliers?variant=48251018805488"
    }
  ];

  // Example: toolsvilla products
  const toolsvillaProducts = [
    {
      id: "pahal-tool-bag-large",
      title: "Pahal 18x7x11 inch Large Water Proof Nylon Tool Bag",
      vendor: "PAHAL",
      made_in_india: true,
      price: { current: 1150, original: 1380, discount_percent: 17, currency: "₹" },
      images: { thumbnail: "https://cdnnew.toolsvilla.com/.../sm" },
      rating: { average: 5.0, count: 0 },
      in_stock: true,
      url: "/Pahal-Nylon-Large-Water-Proof-Tool-Bag"
    }
  ];

  return (
    <div className="catalog">
      <ProductList products={samnantoolsProducts} source="samnantools" title="Chainsaw Spare Parts" />
      <ProductList products={aldahomeProducts} source="aldahome" title="Screwdrivers & Tools" />
      <ProductList products={makerbazarProducts} source="makerbazar" title="Hand Tools" />
      <ProductList products={toolsvillaProducts} source="toolsvilla" title="Tool Storage" />
    </div>
  );
};

// Add some basic CSS (you can import this or put in a separate file)
const styles = `
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
}
.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.2s;
  background: white;
}
.product-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.product-info {
  padding: 12px;
}
.product-brand {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.product-title {
  font-size: 16px;
  margin: 8px 0;
  font-weight: 600;
}
.product-title a {
  text-decoration: none;
  color: #333;
}
.product-price {
  margin: 8px 0;
}
.current-price {
  font-size: 18px;
  font-weight: bold;
  color: #b12704;
}
.original-price {
  font-size: 14px;
  text-decoration: line-through;
  color: #666;
  margin-left: 8px;
}
.discount {
  background: #cc0c39;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
}
.product-rating {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #ffa41c;
}
.rating-value, .review-count {
  color: #666;
  font-size: 12px;
}
.product-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0;
  font-size: 12px;
}
.in-stock { color: #007600; }
.out-of-stock { color: #cc0c39; }
.eta { color: #555; }
.free-shipping { color: #0f7b3a; background: #e6f4ea; padding: 2px 6px; border-radius: 4px; }
.made-in-india { color: #f90; background: #fff2e0; padding: 2px 6px; border-radius: 4px; }
.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 8px;
}
.tag {
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  color: #555;
}
.list-title {
  padding: 0 20px;
  margin: 20px 0 0;
}
.no-products {
  padding: 40px;
  text-align: center;
  color: #666;
}
`;

// Inject CSS (for demo; in real project use CSS modules or styled-components)
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export { ProductList, ProductCard, normalizeProduct, ProductCatalog };
export default ProductCatalog;
